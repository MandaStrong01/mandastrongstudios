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

  async exportVideo(format: string = 'webm'): Promise<Blob> {
    if (this.recordedChunks.length === 0) {
      throw new Error('No recorded video to export');
    }

    const mimeTypes: Record<string, string> = {
      webm: 'video/webm',
      mp4: 'video/mp4',
      mov: 'video/quicktime',
      avi: 'video/x-msvideo'
    };

    const mimeType = mimeTypes[format] || 'video/webm';
    return new Blob(this.recordedChunks, { type: mimeType });
  }

  async convertFormat(blob: Blob, targetFormat: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(blob);

      video.onloadedmetadata = async () => {
        this.canvas.width = video.videoWidth;
        this.canvas.height = video.videoHeight;

        const stream = this.canvas.captureStream(30);
        const mimeType = `video/${targetFormat}`;

        if (!MediaRecorder.isTypeSupported(mimeType)) {
          reject(new Error(`Format ${targetFormat} not supported`));
          return;
        }

        const mediaRecorder = new MediaRecorder(stream, { mimeType });
        const chunks: Blob[] = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
          resolve(new Blob(chunks, { type: mimeType }));
          URL.revokeObjectURL(video.src);
        };

        mediaRecorder.start();
        video.currentTime = 0;
        await video.play();

        const drawFrame = () => {
          if (!video.ended && !video.paused) {
            this.ctx.drawImage(video, 0, 0, this.canvas.width, this.canvas.height);
            requestAnimationFrame(drawFrame);
          } else {
            mediaRecorder.stop();
          }
        };

        drawFrame();
      };

      video.onerror = () => reject(new Error('Failed to load video'));
    });
  }

  async applyFilter(videoUrl: string, filterType: string): Promise<Blob> {
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
    video.currentTime = 0;
    await video.play();

    const applyVideoFilter = () => {
      if (!video.ended && !video.paused) {
        this.ctx.drawImage(video, 0, 0, this.canvas.width, this.canvas.height);

        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const data = imageData.data;

        switch (filterType) {
          case 'grayscale':
            for (let i = 0; i < data.length; i += 4) {
              const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
              data[i] = data[i + 1] = data[i + 2] = avg;
            }
            break;
          case 'sepia':
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i], g = data[i + 1], b = data[i + 2];
              data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
              data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
              data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
            }
            break;
          case 'invert':
            for (let i = 0; i < data.length; i += 4) {
              data[i] = 255 - data[i];
              data[i + 1] = 255 - data[i + 1];
              data[i + 2] = 255 - data[i + 2];
            }
            break;
          case 'brightness':
            for (let i = 0; i < data.length; i += 4) {
              data[i] = Math.min(255, data[i] * 1.5);
              data[i + 1] = Math.min(255, data[i + 1] * 1.5);
              data[i + 2] = Math.min(255, data[i + 2] * 1.5);
            }
            break;
        }

        this.ctx.putImageData(imageData, 0, 0);
        requestAnimationFrame(applyVideoFilter);
      } else {
        this.mediaRecorder?.stop();
      }
    };

    applyVideoFilter();
    return recordingPromise;
  }

  clearRecording() {
    this.recordedChunks = [];
  }

  getRecordingDuration(): number {
    return this.recordedChunks.reduce((total, chunk) => total + chunk.size, 0);
  }
}

export const createVideoProcessor = (width?: number, height?: number) => {
  return new VideoProcessor(width, height);
};
