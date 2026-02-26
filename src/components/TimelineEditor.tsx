import { useState, useCallback, DragEvent } from 'react';
import { Play, Pause, SkipBack, SkipForward, Trash2, Download, Eye, Plus, Film, Music, Type, Scissors, Loader2 } from 'lucide-react';
import VideoPreview from './VideoPreview';
import LoadingSpinner from './LoadingSpinner';

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
  const [isRendering, setIsRendering] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [showAddTrackModal, setShowAddTrackModal] = useState(false);

  const totalDuration = 120;
  const pixelsPerSecond = 10 * zoom;

  const handleDragStart = (e: DragEvent, asset: MediaAsset) => {
    e.dataTransfer.setData('application/json', JSON.stringify(asset));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDrop = useCallback((e: DragEvent, trackId: string, dropTime: number) => {
    e.preventDefault();
    e.stopPropagation();

    const data = e.dataTransfer.getData('application/json');

    if (!data) {
      setStatusMessage('❌ Drop failed - no data received');
      setTimeout(() => setStatusMessage(''), 3000);
      return;
    }

    try {
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

      setStatusMessage(`✅ Added "${asset.name}" to timeline at ${dropTime.toFixed(1)}s`);
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (error) {
      console.error('Drop error:', error);
      setStatusMessage('❌ Failed to add item to timeline');
      setTimeout(() => setStatusMessage(''), 3000);
    }
  }, []);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const removeItem = (trackId: string, itemId: string) => {
    const item = tracks.find(t => t.id === trackId)?.items.find(i => i.id === itemId);

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

    if (item) {
      setStatusMessage(`Removed "${item.asset.name}" from timeline`);
      setTimeout(() => setStatusMessage(''), 3000);
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

  const totalItems = tracks.reduce((sum, track) => sum + track.items.length, 0);

  const handleRender = () => {
    if (totalItems === 0) {
      setStatusMessage('Cannot render - timeline is empty. Drag files from Media Library to timeline.');
      setTimeout(() => setStatusMessage(''), 5000);
      return;
    }

    setIsRendering(true);
    setStatusMessage('Rendering your video...');

    setTimeout(() => {
      setIsRendering(false);
      setStatusMessage('Render complete! Video ready for export.');
      setTimeout(() => setStatusMessage(''), 3000);
      if (onRender) onRender();
    }, 3000);
  };

  const addTrack = (type: 'video' | 'audio' | 'text', name: string) => {
    const trackCount = tracks.filter(t => t.type === type).length + 1;
    const defaultName = name || `${type.charAt(0).toUpperCase() + type.slice(1)} Track ${trackCount}`;

    const newTrack: TimelineTrack = {
      id: `${type}-${Date.now()}`,
      type,
      name: defaultName,
      items: []
    };

    setTracks([...tracks, newTrack]);
    setStatusMessage(`Added ${defaultName}`);
    setTimeout(() => setStatusMessage(''), 3000);
    setShowAddTrackModal(false);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex-none border-b border-white/10 p-4 bg-slate-900/50 backdrop-blur-lg">
        {statusMessage && (
          <div className="mb-3 p-3 bg-blue-500/20 border border-blue-500/50 rounded-lg text-blue-200 text-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            {statusMessage}
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Timeline Editor
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {totalItems === 0 ? 'Drag files from Media Library to get started' : `${totalItems} item${totalItems !== 1 ? 's' : ''} on timeline`}
            </p>
          </div>
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
              onClick={handleRender}
              disabled={isRendering}
              className="px-4 py-1.5 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-lg transition font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRendering ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Rendering...
                </>
              ) : (
                <>
                  <Download size={16} />
                  Render
                </>
              )}
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
              <div className="text-slate-400 text-sm text-center py-8 bg-slate-800/30 rounded-lg border border-dashed border-slate-600">
                <Film className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="font-semibold">No media assets</p>
                <p className="text-xs mt-1">Upload files to get started</p>
              </div>
            ) : (
              <>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2 mb-2">
                  <p className="text-blue-200 text-xs font-medium">Drag files to timeline tracks below</p>
                </div>
                {mediaLibrary.map(asset => (
                  <div
                    key={asset.id}
                    draggable={true}
                    onDragStart={(e) => {
                      e.dataTransfer.effectAllowed = 'copy';
                      handleDragStart(e, asset);
                      setStatusMessage(`🎬 Dragging "${asset.name}"... Drop on a track below`);
                    }}
                    onDragEnd={(e) => {
                      e.currentTarget.classList.remove('opacity-50');
                      setTimeout(() => {
                        if (statusMessage.includes('Dragging')) {
                          setStatusMessage('');
                        }
                      }, 500);
                    }}
                    className="bg-slate-800 hover:bg-slate-700 p-3 rounded-lg cursor-grab active:cursor-grabbing transition group border-2 border-transparent hover:border-blue-500/50 select-none"
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
                ))}
              </>
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
                    <div className={`w-36 px-3 py-2 bg-gradient-to-r ${getTrackColor(track.type)} rounded-lg flex items-center gap-2 justify-between`}>
                      <div className="flex items-center gap-2 min-w-0">
                        {getTrackIcon(track.type)}
                        <span className="text-white text-sm font-semibold truncate">{track.name}</span>
                      </div>
                      <button
                        onClick={() => {
                          setTracks(tracks.filter(t => t.id !== track.id));
                          setStatusMessage(`Removed ${track.name}`);
                          setTimeout(() => setStatusMessage(''), 3000);
                        }}
                        className="text-white/70 hover:text-red-400 transition flex-shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div
                      className="flex-1 h-16 bg-slate-800/50 rounded-lg relative border-2 border-slate-700/50 hover:border-blue-500 hover:bg-slate-700/30 transition-all"
                      onDrop={(e) => {
                        const time = getTimeAtPosition(e, e.currentTarget);
                        handleDrop(e, track.id, time);
                      }}
                      onDragOver={handleDragOver}
                      onDragEnter={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.add('ring-2', 'ring-blue-400');
                      }}
                      onDragLeave={(e) => {
                        e.currentTarget.classList.remove('ring-2', 'ring-blue-400');
                      }}
                      style={{ width: `${totalDuration * pixelsPerSecond}px` }}
                    >
                      {track.items.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-xs pointer-events-none">
                          Drop files here
                        </div>
                      )}
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

              <button
                onClick={() => setShowAddTrackModal(true)}
                className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 hover:bg-slate-700/50 border-2 border-dashed border-slate-600 hover:border-blue-500/50 rounded-lg transition text-slate-400 hover:text-white w-full justify-center group"
              >
                <Plus size={20} className="group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Add Track</span>
              </button>
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

      {showAddTrackModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8">
          <div className="bg-slate-900 rounded-2xl border border-white/10 p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Add Track</h3>
              <button
                onClick={() => setShowAddTrackModal(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <p className="text-slate-400 text-sm mb-6">Select a track type to add to your timeline</p>

            <div className="space-y-3">
              <button
                onClick={() => addTrack('video', '')}
                className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 hover:border-blue-400 rounded-xl transition group"
              >
                <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg group-hover:scale-110 transition-transform">
                  <Film size={24} />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold text-lg">Video Track</p>
                  <p className="text-blue-200 text-sm">Add a new video track for clips</p>
                </div>
              </button>

              <button
                onClick={() => addTrack('audio', '')}
                className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/30 hover:border-green-400 rounded-xl transition group"
              >
                <div className="p-3 bg-gradient-to-r from-green-600 to-green-500 rounded-lg group-hover:scale-110 transition-transform">
                  <Music size={24} />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold text-lg">Audio Track</p>
                  <p className="text-green-200 text-sm">Add a new audio track for sound</p>
                </div>
              </button>

              <button
                onClick={() => addTrack('text', '')}
                className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-purple-600/20 to-purple-500/20 border border-purple-500/30 hover:border-purple-400 rounded-xl transition group"
              >
                <div className="p-3 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg group-hover:scale-110 transition-transform">
                  <Type size={24} />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold text-lg">Text Track</p>
                  <p className="text-purple-200 text-sm">Add a new text track for titles</p>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowAddTrackModal(false)}
              className="w-full mt-6 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
