export interface VideoAsset {
  id: number;
  url: string;
  name: string;
  type: string;
  duration?: number;
  startTime?: number;
  endTime?: number;
}

export class VideoProcessor {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];

  constructor(width: number = 1920, height: number = 1080) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d')!;
  }

  async loadVideo(url: string): Promise<HTMLVideoElement> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.src = url;
      video.onloadedmetadata = () => resolve(video);
      video.onerror = () => reject(new Error('Failed to load video'));
      video.load();
    });
  }

  async trimVideo(videoUrl: string, startTime: number, endTime: number): Promise<Blob> {
    const video = await this.loadVideo(videoUrl);
    this.recordedChunks = [];

    const stream = this.canvas.captureStream(30);
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
      videoBitsPerSecond: 8000000
    });

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    };

    const recordingPromise = new Promise<Blob>((resolve) => {
      this.mediaRecorder!.onstop = () => {
        const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
        resolve(blob);
      };
    });

    this.mediaRecorder.start();
    video.currentTime = startTime;
    video.muted = true;

    await new Promise(resolve => {
      video.onseeked = resolve;
    });

    await this.playVideoSegment(video, endTime);

    this.mediaRecorder.stop();
    return recordingPromise;
  }

  private async playVideoSegment(video: HTMLVideoElement, endTime: number): Promise<void> {
    return new Promise((resolve) => {
      video.play();

      const drawFrame = () => {
        if (!video.paused && !video.ended && video.currentTime < endTime) {
          this.ctx.drawImage(video, 0, 0, this.canvas.width, this.canvas.height);
          requestAnimationFrame(drawFrame);
        } else {
          video.pause();
          resolve();
        }
      };

      drawFrame();
    });
  }
}

export const createVideoProcessor = (width?: number, height?: number) => {
  return new VideoProcessor(width, height);
};
