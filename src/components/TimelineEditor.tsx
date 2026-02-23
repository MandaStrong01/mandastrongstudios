import { useState, useCallback, DragEvent } from 'react';
import { Play, Pause, SkipBack, SkipForward, Trash2, Download, Eye, Plus, Film, Music, Type, Scissors } from 'lucide-react';
import VideoPreview from './VideoPreview';

interface MediaAsset {
  id: number;
  name: string;
  type: string;
  url: string;
  size?: string;
  duration?: number;
}

interface TimelineItem {
  id: string;
  assetId: number;
  asset: MediaAsset;
  startTime: number;
  duration: number;
  trackIndex: number;
}

interface TimelineTrack {
  id: string;
  type: 'video' | 'audio' | 'text';
  name: string;
  items: TimelineItem[];
}

interface TimelineEditorProps {
  mediaLibrary: MediaAsset[];
  onRender?: () => void;
}

export default function TimelineEditor({ mediaLibrary, onRender }: TimelineEditorProps) {
  const [tracks, setTracks] = useState<TimelineTrack[]>([
    { id: 'video-1', type: 'video', name: 'Video Track 1', items: [] },
    { id: 'video-2', type: 'video', name: 'Video Track 2', items: [] },
    { id: 'audio-1', type: 'audio', name: 'Audio Track 1', items: [] },
    { id: 'audio-2', type: 'audio', name: 'Audio Track 2', items: [] },
    { id: 'text-1', type: 'text', name: 'Text Track', items: [] },
  ]);

  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);

  const totalDuration = 120;
  const pixelsPerSecond = 10 * zoom;

  const handleDragStart = (e: DragEvent, asset: MediaAsset) => {
    e.dataTransfer.setData('application/json', JSON.stringify(asset));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDrop = useCallback((e: DragEvent, trackId: string, dropTime: number) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('application/json');

    if (!data) return;

    const asset = JSON.parse(data) as MediaAsset;

    const newItem: TimelineItem = {
      id: `item-${Date.now()}-${Math.random()}`,
      assetId: asset.id,
      asset: asset,
      startTime: dropTime,
      duration: asset.duration || 5,
      trackIndex: 0
    };

    setTracks(prevTracks =>
      prevTracks.map(track =>
        track.id === trackId
          ? { ...track, items: [...track.items, newItem].sort((a, b) => a.startTime - b.startTime) }
          : track
      )
    );
  }, []);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const removeItem = (trackId: string, itemId: string) => {
    setTracks(prevTracks =>
      prevTracks.map(track =>
        track.id === trackId
          ? { ...track, items: track.items.filter(item => item.id !== itemId) }
          : track
      )
    );
    if (selectedItem === itemId) {
      setSelectedItem(null);
    }
  };

  const getTimeAtPosition = (e: DragEvent, trackElement: HTMLElement) => {
    const rect = trackElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const time = Math.max(0, (x / pixelsPerSecond));
    return Math.round(time * 2) / 2;
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTrackColor = (type: string) => {
    switch (type) {
      case 'video': return 'from-blue-600 to-blue-500';
      case 'audio': return 'from-green-600 to-green-500';
      case 'text': return 'from-purple-600 to-purple-500';
      default: return 'from-slate-600 to-slate-500';
    }
  };

  const getTrackIcon = (type: string) => {
    switch (type) {
      case 'video': return <Film size={16} />;
      case 'audio': return <Music size={16} />;
      case 'text': return <Type size={16} />;
      default: return null;
    }
  };

  const renderPreview = () => {
    const videoTracks = tracks.filter(t => t.type === 'video');
    const allVideoItems = videoTracks.flatMap(t => t.items);

    if (allVideoItems.length === 0) return null;

    const sortedItems = allVideoItems.sort((a, b) => a.startTime - b.startTime);
    const firstVideo = sortedItems[0];

    return firstVideo.asset.url;
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex-none border-b border-white/10 p-4 bg-slate-900/50 backdrop-blur-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Timeline Editor
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
              className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition text-sm"
            >
              Zoom Out
            </button>
            <button
              onClick={() => setZoom(Math.min(3, zoom + 0.25))}
              className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition text-sm"
            >
              Zoom In
            </button>
            <button
              onClick={() => {
                const videoUrl = renderPreview();
                if (videoUrl) setPreviewVideo(videoUrl);
              }}
              className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg transition font-semibold flex items-center gap-2"
            >
              <Eye size={16} />
              Preview
            </button>
            <button
              onClick={onRender}
              className="px-4 py-1.5 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-lg transition font-semibold flex items-center gap-2"
            >
              <Download size={16} />
              Render
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-xl">
          <button
            onClick={() => setCurrentTime(Math.max(0, currentTime - 5))}
            className="text-slate-300 hover:text-white transition"
          >
            <SkipBack size={20} />
          </button>
          <button
            onClick={togglePlayback}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 p-2 rounded-full transition"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
          </button>
          <button
            onClick={() => setCurrentTime(Math.min(totalDuration, currentTime + 5))}
            className="text-slate-300 hover:text-white transition"
          >
            <SkipForward size={20} />
          </button>
          <div className="flex-1 flex items-center gap-3">
            <span className="text-slate-300 font-mono text-sm">{formatTime(currentTime)}</span>
            <div className="flex-1 h-2 bg-slate-700 rounded-full relative">
              <div
                className="absolute h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                style={{ width: `${(currentTime / totalDuration) * 100}%` }}
              />
            </div>
            <span className="text-slate-300 font-mono text-sm">{formatTime(totalDuration)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 border-r border-white/10 bg-slate-900/30 p-4 overflow-y-auto">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <Film size={18} />
            Media Library
          </h3>
          <div className="space-y-2">
            {mediaLibrary.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-8">
                No media assets yet. Upload files to get started.
              </p>
            ) : (
              mediaLibrary.map(asset => (
                <div
                  key={asset.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, asset)}
                  className="bg-slate-800 hover:bg-slate-700 p-3 rounded-lg cursor-move transition group"
                >
                  <div className="flex items-start gap-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${
                      asset.type === 'video' ? 'from-blue-600 to-blue-500' :
                      asset.type === 'audio' ? 'from-green-600 to-green-500' :
                      'from-purple-600 to-purple-500'
                    }`}>
                      {asset.type === 'video' ? <Film size={16} /> :
                       asset.type === 'audio' ? <Music size={16} /> :
                       <Type size={16} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{asset.name}</p>
                      <p className="text-slate-400 text-xs">{asset.type}</p>
                      {asset.size && <p className="text-slate-500 text-xs">{asset.size}</p>}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="min-w-max">
            <div className="sticky top-0 z-10 bg-slate-800/90 backdrop-blur-lg border-b border-white/10 px-4 py-2">
              <div className="flex gap-2 text-xs text-slate-400 font-mono" style={{ paddingLeft: '150px' }}>
                {Array.from({ length: Math.ceil(totalDuration / 5) }).map((_, i) => (
                  <div key={i} style={{ width: `${5 * pixelsPerSecond}px` }} className="text-center">
                    {formatTime(i * 5)}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4">
              {tracks.map((track) => (
                <div key={track.id} className="mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-36 px-3 py-2 bg-gradient-to-r ${getTrackColor(track.type)} rounded-lg flex items-center gap-2`}>
                      {getTrackIcon(track.type)}
                      <span className="text-white text-sm font-semibold truncate">{track.name}</span>
                    </div>

                    <div
                      className="flex-1 h-16 bg-slate-800/50 rounded-lg relative border border-slate-700/50"
                      onDrop={(e) => {
                        const time = getTimeAtPosition(e, e.currentTarget);
                        handleDrop(e, track.id, time);
                      }}
                      onDragOver={handleDragOver}
                      style={{ width: `${totalDuration * pixelsPerSecond}px` }}
                    >
                      {track.items.map((item) => (
                        <div
                          key={item.id}
                          className={`absolute top-1 bottom-1 bg-gradient-to-r ${getTrackColor(track.type)} rounded-lg px-2 py-1 cursor-pointer group/item ${
                            selectedItem === item.id ? 'ring-2 ring-white' : ''
                          }`}
                          style={{
                            left: `${item.startTime * pixelsPerSecond}px`,
                            width: `${item.duration * pixelsPerSecond}px`,
                          }}
                          onClick={() => setSelectedItem(item.id)}
                        >
                          <div className="flex items-center justify-between h-full">
                            <span className="text-white text-xs font-medium truncate flex-1">
                              {item.asset.name}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeItem(track.id, item.id);
                              }}
                              className="opacity-0 group-hover/item:opacity-100 transition ml-1 text-white hover:text-red-400"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}

                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-blue-400 shadow-lg shadow-blue-400/50 z-10 pointer-events-none"
                        style={{ left: `${currentTime * pixelsPerSecond}px` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {previewVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8">
          <div className="w-full max-w-5xl relative">
            <button
              onClick={() => setPreviewVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-red-400 transition"
            >
              Close Preview
            </button>
            <VideoPreview
              videoUrl={previewVideo}
              title="Timeline Preview"
              onClose={() => setPreviewVideo(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
