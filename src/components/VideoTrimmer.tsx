import { useState, useRef, useEffect } from 'react';
import { Scissors, Play, Pause, X } from 'lucide-react';
import { createVideoProcessor } from '../lib/videoProcessor';

interface VideoTrimmerProps {
  videoUrl: string;
  videoName: string;
  onTrimComplete: (blob: Blob, name: string) => void;
  onClose: () => void;
}

export default function VideoTrimmer({ videoUrl, videoName, onTrimComplete, onClose }: VideoTrimmerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trimming, setTrimming] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setEndTime(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.currentTime >= endTime) {
        video.pause();
        setIsPlaying(false);
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [endTime]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      if (video.currentTime >= endTime) {
        video.currentTime = startTime;
      }
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleStartTimeChange = (value: number) => {
    setStartTime(value);
    if (videoRef.current) {
      videoRef.current.currentTime = value;
    }
  };

  const handleEndTimeChange = (value: number) => {
    setEndTime(value);
  };

  const handleTrim = async () => {
    setTrimming(true);
    try {
      const processor = createVideoProcessor(1920, 1080);
      const trimmedBlob = await processor.trimVideo(videoUrl, startTime, endTime);
      const trimmedName = `trimmed-${Date.now()}-${videoName}`;
      onTrimComplete(trimmedBlob, trimmedName);
    } catch (error) {
      console.error('Trimming error:', error);
      alert('Failed to trim video. Please try again.');
    }
    setTrimming(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-8">
      <div className="bg-zinc-950 border-4 border-[#7c3aed] rounded-3xl p-8 max-w-5xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black uppercase text-white flex items-center gap-3">
            <Scissors className="text-[#7c3aed]"/>
            TRIM VIDEO
          </h2>
          <button onClick={onClose} className="text-white hover:text-red-500 text-2xl font-bold">
            <X size={32}/>
          </button>
        </div>

        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full aspect-video bg-black rounded-xl mb-6"
          onClick={togglePlay}
        />

        <div className="bg-zinc-900 p-6 rounded-xl mb-6">
          <div className="flex justify-between text-sm text-zinc-400 mb-2">
            <span>Start: {formatTime(startTime)}</span>
            <span>Current: {formatTime(currentTime)}</span>
            <span>End: {formatTime(endTime)}</span>
          </div>

          <div className="relative h-20 bg-zinc-800 rounded-lg mb-4">
            <div
              className="absolute top-0 h-full bg-[#7c3aed]/30 border-l-4 border-r-4 border-[#7c3aed]"
              style={{
                left: `${(startTime / duration) * 100}%`,
                width: `${((endTime - startTime) / duration) * 100}%`
              }}
            />
            <div
              className="absolute top-0 w-1 h-full bg-white"
              style={{
                left: `${(currentTime / duration) * 100}%`
              }}
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-white font-bold mb-2 block">Start Time</label>
              <input
                type="range"
                min="0"
                max={duration}
                step="0.1"
                value={startTime}
                onChange={(e) => handleStartTimeChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-zinc-700 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: '#7c3aed' }}
              />
            </div>

            <div>
              <label className="text-white font-bold mb-2 block">End Time</label>
              <input
                type="range"
                min={startTime}
                max={duration}
                step="0.1"
                value={endTime}
                onChange={(e) => handleEndTimeChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-zinc-700 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: '#7c3aed' }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={togglePlay}
            className="bg-zinc-800 px-8 py-4 rounded-xl font-black uppercase flex items-center gap-3 hover:bg-zinc-700 transition"
          >
            {isPlaying ? <Pause size={24}/> : <Play size={24}/>}
            {isPlaying ? 'PAUSE' : 'PLAY'}
          </button>

          <button
            onClick={handleTrim}
            disabled={trimming}
            className="bg-[#7c3aed] px-8 py-4 rounded-xl font-black uppercase flex items-center gap-3 hover:bg-[#6d28d9] transition disabled:opacity-50"
          >
            <Scissors size={24}/>
            {trimming ? 'TRIMMING...' : 'TRIM & SAVE'}
          </button>
        </div>

        <p className="text-center text-zinc-500 text-sm mt-4">
          Duration: {formatTime(endTime - startTime)}
        </p>
      </div>
    </div>
  );
}
