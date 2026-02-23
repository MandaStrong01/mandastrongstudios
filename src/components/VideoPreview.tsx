import { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

interface VideoPreviewProps {
  videoUrl: string;
  title?: string;
  onClose?: () => void;
}

export default function VideoPreview({ videoUrl, title = 'Video Preview', onClose }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = parseFloat(e.target.value);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !isMuted;
    video.muted = newMuted;
    setIsMuted(newMuted);
  };

  const skipForward = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(video.currentTime + 10, duration);
  };

  const skipBackward = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(video.currentTime - 10, 0);
  };

  const restart = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      video.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    if (!isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>

      <div className="relative bg-black group">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full aspect-video bg-black"
          onClick={togglePlay}
          playsInline
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <button
          onClick={togglePlay}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600/90 hover:bg-blue-500 p-6 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
        >
          {isPlaying ? <Pause size={40} className="text-white" /> : <Play size={40} className="text-white ml-1" />}
        </button>
      </div>

      <div className="p-6 bg-slate-900/50 backdrop-blur-lg">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-slate-300 mb-3">
            <span className="font-mono">{formatTime(currentTime)}</span>
            <span className="font-mono">{formatTime(duration)}</span>
          </div>

          <div className="relative h-2 bg-slate-700 rounded-full cursor-pointer group" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = x / rect.width;
            const newTime = percentage * duration;
            if (videoRef.current) {
              videoRef.current.currentTime = newTime;
            }
          }}>
            <div
              className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all"
              style={{ width: `${progressPercentage}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `${progressPercentage}%`, transform: 'translate(-50%, -50%)' }}
            />
          </div>

          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 opacity-0 absolute cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={restart}
              className="text-slate-300 hover:text-white transition-colors"
              title="Restart"
            >
              <RotateCcw size={20} />
            </button>

            <button
              onClick={skipBackward}
              className="text-slate-300 hover:text-white transition-colors"
              title="Skip back 10s"
            >
              <SkipBack size={24} />
            </button>

            <button
              onClick={togglePlay}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 p-3 rounded-full transition-all hover:scale-110 shadow-lg"
            >
              {isPlaying ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white ml-0.5" />}
            </button>

            <button
              onClick={skipForward}
              className="text-slate-300 hover:text-white transition-colors"
              title="Skip forward 10s"
            >
              <SkipForward size={24} />
            </button>
          </div>

          <div className="flex items-center gap-3 flex-1 max-w-xs">
            <button
              onClick={toggleMute}
              className="text-slate-300 hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="flex-1 h-2 bg-slate-700 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(isMuted ? 0 : volume) * 100}%, #334155 ${(isMuted ? 0 : volume) * 100}%, #334155 100%)`
              }}
            />
            <span className="text-slate-300 text-sm w-12 text-right font-mono">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>

          <button
            onClick={toggleFullscreen}
            className="text-slate-300 hover:text-white transition-colors"
            title="Fullscreen"
          >
            <Maximize2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
