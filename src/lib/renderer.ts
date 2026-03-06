import { MediaAsset, createRenderJob } from './storage';
import { supabase } from './supabase';

export interface RenderOptions {
  quality: 'hd' | '4k' | '8k';
  format: 'mp4' | 'mov' | 'webm';
  onProgress?: (progress: number) => void;
}

export interface TimelineClip {
  asset: MediaAsset;
  startTime: number;
  duration: number;
  trimStart?: number;
  trimEnd?: number;
}

export interface RenderTimeline {
  video: TimelineClip[];
  audio: TimelineClip[];
}

async function loadVideoElement(url: string): Promise<HTMLVideoElement> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.preload = 'auto';

    video.onloadeddata = () => resolve(video);
    video.onerror = () => reject(new Error('Failed to load video'));

    video.src = url;
  });
}

async function loadAudioElement(url: string): Promise<HTMLAudioElement> {
  return new Promise((resolve, reject) => {
    const audio = document.createElement('audio');
    audio.crossOrigin = 'anonymous';
    audio.preload = 'auto';

    audio.onloadeddata = () => resolve(audio);
    audio.onerror = () => reject(new Error('Failed to load audio'));

    audio.src = url;
  });
}

function getQualitySettings(quality: 'hd' | '4k' | '8k') {
  switch (quality) {
    case 'hd':
      return { width: 1920, height: 1080, bitrate: 5000000 };
    case '4k':
      return { width: 3840, height: 2160, bitrate: 20000000 };
    case '8k':
      return { width: 7680, height: 4320, bitrate: 80000000 };
  }
}

export async function renderTimeline(
  timeline: RenderTimeline,
  options: RenderOptions,
  projectId: string
): Promise<Blob> {
  const { quality, format, onProgress } = options;
  const settings = getQualitySettings(quality);

  const canvas = document.createElement('canvas');
  canvas.width = settings.width;
  canvas.height = settings.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');

  const totalDuration = Math.max(
    ...timeline.video.map(clip => clip.startTime + clip.duration),
    ...timeline.audio.map(clip => clip.startTime + clip.duration)
  );

  const fps = 30;
  const totalFrames = Math.floor(totalDuration * fps);

  const stream = canvas.captureStream(fps);

  const mimeType = format === 'webm' ? 'video/webm;codecs=vp9' :
                   format === 'mov' ? 'video/mp4' : 'video/mp4';

  const mediaRecorder = new MediaRecorder(stream, {
    mimeType: mimeType.includes('webm') ? 'video/webm;codecs=vp9' : 'video/webm',
    videoBitsPerSecond: settings.bitrate
  });

  const chunks: Blob[] = [];

  return new Promise(async (resolve, reject) => {
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType });
      resolve(blob);
    };

    mediaRecorder.onerror = (e) => {
      reject(new Error('MediaRecorder error'));
    };

    mediaRecorder.start();

    try {
      const videoElements = await Promise.all(
        timeline.video.map(async (clip) => {
          const bucket = 'videos';
          const { data } = await supabase.storage
            .from(bucket)
            .createSignedUrl(clip.asset.file_path, 3600);

          if (!data) throw new Error('Failed to get video URL');
          const video = await loadVideoElement(data.signedUrl);
          return { clip, video };
        })
      );

      for (let frame = 0; frame < totalFrames; frame++) {
        const currentTime = frame / fps;

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (const { clip, video } of videoElements) {
          if (currentTime >= clip.startTime && currentTime < clip.startTime + clip.duration) {
            const clipTime = currentTime - clip.startTime + (clip.trimStart || 0);
            video.currentTime = clipTime;

            await new Promise(resolve => {
              if (video.readyState >= 2) {
                resolve(null);
              } else {
                video.onseeked = () => resolve(null);
              }
            });

            const scale = Math.min(
              canvas.width / video.videoWidth,
              canvas.height / video.videoHeight
            );

            const scaledWidth = video.videoWidth * scale;
            const scaledHeight = video.videoHeight * scale;
            const x = (canvas.width - scaledWidth) / 2;
            const y = (canvas.height - scaledHeight) / 2;

            ctx.drawImage(video, x, y, scaledWidth, scaledHeight);
          }
        }

        if (frame % 30 === 0) {
          const progress = Math.floor((frame / totalFrames) * 100);
          onProgress?.(progress);
        }

        await new Promise(resolve => setTimeout(resolve, 1000 / fps));
      }

      mediaRecorder.stop();
      onProgress?.(100);
    } catch (error) {
      mediaRecorder.stop();
      reject(error);
    }
  });
}

export async function exportVideo(
  projectId: string,
  timeline: RenderTimeline,
  options: RenderOptions
): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const job = await createRenderJob(projectId, options.quality, options.format);

  await supabase
    .from('render_jobs')
    .update({ status: 'processing', started_at: new Date().toISOString() })
    .eq('id', job.id);

  try {
    const blob = await renderTimeline(timeline, {
      ...options,
      onProgress: async (progress) => {
        await supabase
          .from('render_jobs')
          .update({ progress })
          .eq('id', job.id);
        options.onProgress?.(progress);
      }
    });

    const timestamp = Date.now();
    const fileName = `render-${timestamp}.${options.format}`;
    const filePath = `${user.id}/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('renders')
      .upload(filePath, blob);

    if (uploadError) throw uploadError;

    const { data: urlData } = await supabase.storage
      .from('renders')
      .createSignedUrl(uploadData.path, 604800);

    await supabase
      .from('render_jobs')
      .update({
        status: 'completed',
        output_path: uploadData.path,
        progress: 100,
        completed_at: new Date().toISOString()
      })
      .eq('id', job.id);

    return urlData?.signedUrl || '';
  } catch (error: any) {
    await supabase
      .from('render_jobs')
      .update({
        status: 'failed',
        error_message: error.message
      })
      .eq('id', job.id);

    throw error;
  }
}

export async function quickPreview(videoUrl: string, startTime: number, duration: number): Promise<Blob> {
  const video = await loadVideoElement(videoUrl);

  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');

  const fps = 30;
  const totalFrames = Math.floor(duration * fps);
  const stream = canvas.captureStream(fps);

  const mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'video/webm',
    videoBitsPerSecond: 2500000
  });

  const chunks: Blob[] = [];

  return new Promise((resolve, reject) => {
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      resolve(new Blob(chunks, { type: 'video/webm' }));
    };

    mediaRecorder.start();

    (async () => {
      try {
        for (let frame = 0; frame < totalFrames; frame++) {
          const currentTime = startTime + (frame / fps);
          video.currentTime = currentTime;

          await new Promise(resolve => {
            if (video.readyState >= 2) {
              resolve(null);
            } else {
              video.onseeked = () => resolve(null);
            }
          });

          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          await new Promise(resolve => setTimeout(resolve, 1000 / fps));
        }

        mediaRecorder.stop();
      } catch (error) {
        mediaRecorder.stop();
        reject(error);
      }
    })();
  });
}
