import { useRef, useEffect, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface VideoAsset {
  id: number;
  url: string;
  name: string;
  type: string;
}

interface LiveVideoEditorProps {
  assets: VideoAsset[];
  onClose?: () => void;
}

export default function LiveVideoEditor({ assets, onClose }: LiveVideoEditorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentAssetIndex, setCurrentAssetIndex] = useState(0);

  const currentAsset = assets[currentAssetIndex];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handleEnded = () => {
      if (currentAssetIndex < assets.length - 1) {
        setCurrentAssetIndex(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', handleEnded);

    video.play().catch(() => {});
    setIsPlaying(true);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', handleEnded);
    };
  }, [currentAssetIndex, assets.length]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentAsset || assets.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white text-xl">No video assets to preview</p>
      </div>
    );
  }

  return (
    <div className="bg-black rounded-2xl overflow-hidden">
      <video
        ref={videoRef}
        src={currentAsset.url}
        className="w-full aspect-video bg-black"
        onClick={togglePlay}
        autoPlay
        playsInline
      />

      <div className="p-6 bg-zinc-900">
        <div className="mb-4">
          <div className="flex justify-between text-xs text-zinc-400 mb-2">
            <span>{formatTime(currentTime)}</span>
            <span>{currentAsset.name}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-zinc-700 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: '#7c3aed' }}
          />
        </div>

        <div className="flex items-center justify-center gap-6 mb-4">
          <button
            onClick={skipBackward}
            className="text-white hover:text-[#7c3aed] transition"
          >
            <SkipBack size={28} />
          </button>

          <button
            onClick={togglePlay}
            className="bg-[#7c3aed] p-4 rounded-full hover:bg-[#6d28d9] transition"
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>

          <button
            onClick={skipForward}
            className="text-white hover:text-[#7c3aed] transition"
          >
            <SkipForward size={28} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Volume2 size={20} className="text-white" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1 h-2 bg-zinc-700 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: '#7c3aed' }}
          />
          <span className="text-white text-sm w-12">{Math.round(volume * 100)}%</span>
        </div>

        {assets.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto">
            {assets.map((asset, idx) => (
              <button
                key={asset.id}
                onClick={() => setCurrentAssetIndex(idx)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                  idx === currentAssetIndex
                    ? 'bg-[#7c3aed] text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }`}
              >
                {idx + 1}. {asset.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
