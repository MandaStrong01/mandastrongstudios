import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward, Settings } from 'lucide-react';

interface FullScreenViewerProps {
  videoUrl?: string;
  title?: string;
}

export default function FullScreenViewer({ videoUrl, title = "Your Film" }: FullScreenViewerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
    }
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    const container = videoRef.current?.parentElement;
    if (!container) return;

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="bg-zinc-900 border-b border-zinc-700 px-6 py-4">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-zinc-400 text-sm">Full Screen Preview</p>
      </div>

      <div
        className="flex-1 flex items-center justify-center relative group bg-black"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(isPlaying ? false : true)}
      >
        <video
          ref={videoRef}
          className="max-w-full max-h-full"
          src={videoUrl || '/background.mp4'}
          onClick={togglePlay}
        />

        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-[#7c3aed] hover:bg-[#6d28d9] flex items-center justify-center transition-all hover:scale-110 shadow-2xl"
          >
            <Play className="text-white ml-2" size={40} />
          </button>
        )}

        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer mb-4"
            style={{
              background: `linear-gradient(to right, #7c3aed 0%, #7c3aed ${(currentTime / duration) * 100}%, #3f3f46 ${(currentTime / duration) * 100}%, #3f3f46 100%)`
            }}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => skip(-10)}
                className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition"
              >
                <SkipBack className="text-white" size={20} />
              </button>

              <button
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-[#7c3aed] hover:bg-[#6d28d9] flex items-center justify-center transition"
              >
                {isPlaying ? (
                  <Pause className="text-white" size={24} />
                ) : (
                  <Play className="text-white ml-1" size={24} />
                )}
              </button>

              <button
                onClick={() => skip(10)}
                className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition"
              >
                <SkipForward className="text-white" size={20} />
              </button>

              <div className="text-white font-mono text-sm ml-4">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button onClick={toggleMute} className="text-white hover:text-[#7c3aed] transition">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-24"
                />
              </div>

              <button className="text-white hover:text-[#7c3aed] transition">
                <Settings size={20} />
              </button>

              <button onClick={toggleFullscreen} className="text-white hover:text-[#7c3aed] transition">
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 border-t border-zinc-700 px-6 py-4 flex items-center justify-between">
        <div className="text-zinc-400 text-sm">
          Ready to export or make adjustments
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white font-bold transition">
            Edit More
          </button>
          <button className="px-6 py-2 bg-[#7c3aed] hover:bg-[#6d28d9] rounded-lg text-white font-bold transition">
            Export Film
          </button>
        </div>
      </div>
    </div>
  );
}
