import { useRef, useEffect, useState, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Upload, Trash2, Film, Plus, GripVertical, Video, Download, Loader2 } from 'lucide-react';
import VideoRecorder from './VideoRecorder';
import FullscreenMovieViewer from './FullscreenMovieViewer';

interface VideoAsset {
  id: number;
  url: string;
  name: string;
  type: string;
  duration?: number;
}

interface LiveVideoEditorProps {
  assets?: VideoAsset[];
  onClose?: () => void;
}

export default function LiveVideoEditor({ assets: initialAssets = [], onClose }: LiveVideoEditorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [assets, setAssets] = useState<VideoAsset[]>(initialAssets);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentAssetIndex, setCurrentAssetIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [showRecorder, setShowRecorder] = useState(false);
  const [showMovieViewer, setShowMovieViewer] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');

  const currentAsset = assets[currentAssetIndex];

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentAsset) return;

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

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', handleEnded);
    };
  }, [currentAssetIndex, assets.length, currentAsset]);

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files) return;
    setIsProcessing(true);
    setProcessingMessage('Loading clips...');

    setTimeout(() => {
      const newAssets: VideoAsset[] = Array.from(files)
        .filter(f => f.type.startsWith('video/') || f.type.startsWith('image/') || f.type.startsWith('audio/'))
        .map((file, i) => ({
          id: Date.now() + i,
          url: URL.createObjectURL(file),
          name: file.name.replace(/\.[^/.]+$/, ''),
          type: file.type,
        }));
      setAssets(prev => [...prev, ...newAssets]);
      if (assets.length === 0 && newAssets.length > 0) {
        setCurrentAssetIndex(0);
      }
      setIsProcessing(false);
    }, 500);
  }, [assets.length]);

  const handleRecordingComplete = useCallback((blob: Blob) => {
    setIsProcessing(true);
    setProcessingMessage('Processing recording...');

    setTimeout(() => {
      const url = URL.createObjectURL(blob);
      const newAsset: VideoAsset = {
        id: Date.now(),
        url,
        name: `Recording ${new Date().toLocaleTimeString()}`,
        type: blob.type,
      };
      setAssets(prev => [...prev, newAsset]);
      if (assets.length === 0) {
        setCurrentAssetIndex(0);
      }
      setShowRecorder(false);
      setIsProcessing(false);
    }, 800);
  }, [assets.length]);

  const handleDropZone = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleTimelineDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('clipIndex', String(index));
  };

  const handleTimelineDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData('clipIndex'));
    if (fromIndex === targetIndex) return;
    const updated = [...assets];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(targetIndex, 0, moved);
    setAssets(updated);
    setDragOverIndex(null);
    if (currentAssetIndex === fromIndex) setCurrentAssetIndex(targetIndex);
  };

  const removeAsset = (id: number) => {
    setAssets(prev => {
      const updated = prev.filter(a => a.id !== id);
      if (currentAssetIndex >= updated.length) setCurrentAssetIndex(Math.max(0, updated.length - 1));
      return updated;
    });
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) { video.pause(); } else { video.play(); }
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
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showRecorder) {
    return <VideoRecorder onClose={() => setShowRecorder(false)} onRecordingComplete={handleRecordingComplete} />;
  }

  if (showMovieViewer) {
    return <FullscreenMovieViewer onClose={() => setShowMovieViewer(false)} />;
  }

  if (assets.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8">
        {isProcessing && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-xl p-8 flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
              <p className="text-white text-lg font-semibold">{processingMessage}</p>
            </div>
          </div>
        )}

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setShowRecorder(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            <Video size={20} /> Record Screen
          </button>
          <button
            onClick={() => setShowMovieViewer(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            <Film size={20} /> Watch Movies
          </button>
        </div>

        <div
          className={`w-full max-w-2xl border-2 border-dashed rounded-2xl p-16 text-center transition-all cursor-pointer
            ${isDragging ? 'border-purple-400 bg-purple-900/20' : 'border-slate-600 hover:border-purple-500 hover:bg-slate-800/50'}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDropZone}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Upload Your Clips</h2>
          <p className="text-slate-400 mb-6">Drag and drop video files here, or click to browse</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition">
            Choose Files
          </button>
          <p className="text-slate-500 text-sm mt-4">Supports MP4, MOV, WebM, AVI</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="video/*,audio/*,image/*"
          className="hidden"
          onChange={(e) => handleFileUpload(e.target.files)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {isProcessing && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl p-8 flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
            <p className="text-white text-lg font-semibold">{processingMessage}</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between px-6 py-4 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <Film className="text-purple-400 w-6 h-6" />
          <span className="font-bold text-lg">MandaStrong Studio</span>
          <span className="text-slate-400 text-sm">— {assets.length} clip{assets.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRecorder(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            <Video size={16} /> Record
          </button>
          <button
            onClick={() => setShowMovieViewer(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            <Film size={16} /> Movies
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            <Plus size={16} /> Add Clips
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="video/*,audio/*,image/*"
          className="hidden"
          onChange={(e) => handleFileUpload(e.target.files)}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col bg-black">
          <video
            ref={videoRef}
            src={currentAsset?.url}
            className="w-full flex-1 object-contain bg-black cursor-pointer"
            onClick={togglePlay}
            playsInline
          />

          <div className="p-5 bg-zinc-900 border-t border-zinc-800">
            <div className="flex justify-between text-xs text-zinc-400 mb-2">
              <span>{formatTime(currentTime)}</span>
              <span className="font-semibold text-white truncate max-w-xs">{currentAsset?.name}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-zinc-700 rounded-full appearance-none cursor-pointer mb-4"
              style={{ accentColor: '#7c3aed' }}
            />

            <div className="flex items-center justify-center gap-6 mb-4">
              <button onClick={skipBackward} className="text-white hover:text-purple-400 transition">
                <SkipBack size={28} />
              </button>
              <button
                onClick={togglePlay}
                className="bg-purple-600 p-4 rounded-full hover:bg-purple-700 transition"
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
              </button>
              <button onClick={skipForward} className="text-white hover:text-purple-400 transition">
                <SkipForward size={28} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <Volume2 size={18} className="text-white" />
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
              <span className="text-white text-sm w-10 text-right">{Math.round(volume * 100)}%</span>
            </div>
          </div>
        </div>

        <div className="w-72 bg-slate-800 border-l border-slate-700 flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-700 text-sm font-semibold text-slate-300">
            CLIPS — drag to reorder
          </div>
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
            {assets.map((asset, idx) => (
              <div
                key={asset.id}
                draggable
                onDragStart={(e) => handleTimelineDragStart(e, idx)}
                onDragOver={(e) => { e.preventDefault(); setDragOverIndex(idx); }}
                onDragLeave={() => setDragOverIndex(null)}
                onDrop={(e) => handleTimelineDrop(e, idx)}
                onClick={() => setCurrentAssetIndex(idx)}
                className={`flex items-center gap-2 p-3 rounded-xl cursor-pointer transition group
                  ${idx === currentAssetIndex ? 'bg-purple-700/60 border border-purple-500' : 'bg-slate-700/60 hover:bg-slate-700 border border-transparent'}
                  ${dragOverIndex === idx ? 'border-purple-400 scale-95' : ''}`}
              >
                <GripVertical size={14} className="text-slate-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-white">{asset.name}</p>
                  <p className="text-xs text-slate-400">Clip {idx + 1}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeAsset(asset.id); }}
                  className="text-slate-500 hover:text-red-400 transition opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          <div
            className={`m-3 border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition
              ${isDragging ? 'border-purple-400 bg-purple-900/20' : 'border-slate-600 hover:border-purple-500'}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDropZone}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={16} className="text-slate-400 mx-auto mb-1" />
            <p className="text-xs text-slate-400">Drop clips here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
