import { useState, Dispatch, SetStateAction } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Scissors, Copy, Trash2, Lock, Unlock } from 'lucide-react';

interface TimelineTrack {
  id: string;
  type: 'video' | 'audio' | 'text' | 'image';
  name: string;
  duration: number;
  startTime: number;
  locked: boolean;
  thumbnail?: string;
}

interface TimelineClip {
  id: string;
  type: 'video' | 'audio' | 'image' | 'text';
  src?: string;
  text?: string;
  start: number;
  duration: number;
  track: number;
  thumbnail?: string;
  volume?: number;
  effects?: string[];
}

interface DaVinciTimelineProps {
  clips?: TimelineClip[];
  currentTime?: number;
  duration?: number;
  onSeek?: (time: number) => void;
  onClipSelect?: Dispatch<SetStateAction<TimelineClip | null>>;
  onClipUpdate?: (clip: TimelineClip) => void;
  onClipRemove?: (id: string) => void;
  selectedClip?: TimelineClip | null;
  zoom?: number;
  onZoomChange?: Dispatch<SetStateAction<number>>;
}

export default function DaVinciTimeline(props: DaVinciTimelineProps = {}) {
  const {
    clips: propClips,
    currentTime: propCurrentTime,
    duration: propDuration,
    onSeek,
    zoom: propZoom,
    onZoomChange
  } = props;
  const [tracks, setTracks] = useState<TimelineTrack[]>([
    { id: '1', type: 'video', name: 'Main Video', duration: 10, startTime: 0, locked: false },
    { id: '2', type: 'audio', name: 'Background Music', duration: 15, startTime: 0, locked: false },
  ]);
  const [currentTime] = useState(propCurrentTime || 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoom] = useState(propZoom || 1);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  const totalDuration = Math.max(...tracks.map(t => t.startTime + t.duration), 20);
  const pixelsPerSecond = 40 * zoom;

  const toggleLock = (id: string) => {
    setTracks(tracks.map(t => t.id === id ? { ...t, locked: !t.locked } : t));
  };

  const deleteTrack = (id: string) => {
    setTracks(tracks.filter(t => t.id !== id));
  };

  const getTrackColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-blue-600';
      case 'audio': return 'bg-green-600';
      case 'text': return 'bg-yellow-600';
      case 'image': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const getTrackIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎬';
      case 'audio': return '🎵';
      case 'text': return '📝';
      case 'image': return '🖼️';
      default: return '📄';
    }
  };

  return (
    <div className="h-full flex flex-col bg-zinc-900">
      <div className="bg-black border-b border-zinc-700 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full bg-[#7c3aed] hover:bg-[#6d28d9] flex items-center justify-center transition"
          >
            {isPlaying ? <Pause className="text-white" size={20} /> : <Play className="text-white ml-0.5" size={20} />}
          </button>
          <button className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition">
            <SkipBack className="text-white" size={18} />
          </button>
          <button className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition">
            <SkipForward className="text-white" size={18} />
          </button>
          <div className="ml-4 font-mono text-white text-lg">
            {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')} / {Math.floor(totalDuration / 60)}:{(totalDuration % 60).toString().padStart(2, '0')}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Volume2 className="text-white" size={20} />
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="80"
            className="w-24"
          />
          <div className="ml-6 flex items-center gap-2">
            <span className="text-white text-sm">Zoom:</span>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-32"
            />
            <span className="text-white text-sm font-mono">{zoom.toFixed(1)}x</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-48 bg-zinc-950 border-r border-zinc-700 overflow-y-auto">
          <div className="p-2 space-y-1">
            {tracks.map((track) => (
              <div
                key={track.id}
                className={`p-3 rounded-lg cursor-pointer transition ${
                  selectedTrack === track.id
                    ? 'bg-[#7c3aed] text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
                onClick={() => setSelectedTrack(track.id)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase">{track.type}</span>
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLock(track.id);
                      }}
                      className="hover:text-[#7c3aed] transition"
                    >
                      {track.locked ? <Lock size={14} /> : <Unlock size={14} />}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTrack(track.id);
                      }}
                      className="hover:text-red-500 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="text-sm font-semibold truncate">{track.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto relative bg-zinc-900">
          <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-950 border-b border-zinc-700 flex items-center px-4">
            {Array.from({ length: Math.ceil(totalDuration) + 1 }).map((_, i) => (
              <div
                key={i}
                style={{ left: `${i * pixelsPerSecond}px` }}
                className="absolute text-xs text-zinc-500 font-mono"
              >
                {i}s
              </div>
            ))}
          </div>

          <div className="pt-10 pb-4">
            {tracks.map((track, index) => (
              <div
                key={track.id}
                className="h-16 border-b border-zinc-800 relative"
                style={{ marginLeft: '16px' }}
              >
                <div
                  className={`absolute h-14 rounded ${getTrackColor(track.type)} ${
                    track.locked ? 'opacity-50' : 'opacity-90 hover:opacity-100'
                  } cursor-move flex items-center px-3 text-white text-sm font-bold border-2 border-transparent hover:border-white transition`}
                  style={{
                    left: `${track.startTime * pixelsPerSecond}px`,
                    width: `${track.duration * pixelsPerSecond}px`,
                  }}
                >
                  <span className="mr-2">{getTrackIcon(track.type)}</span>
                  <span className="truncate">{track.name}</span>
                </div>
              </div>
            ))}
          </div>

          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 pointer-events-none z-10"
            style={{ left: `${currentTime * pixelsPerSecond + 16}px` }}
          >
            <div className="w-3 h-3 bg-red-500 rounded-full -ml-1.5 -mt-1" />
          </div>
        </div>
      </div>

      <div className="bg-black border-t border-zinc-700 p-3 flex items-center justify-between">
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white text-sm font-bold flex items-center gap-2 transition">
            <Scissors size={16} />
            Split
          </button>
          <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white text-sm font-bold flex items-center gap-2 transition">
            <Copy size={16} />
            Duplicate
          </button>
          <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white text-sm font-bold flex items-center gap-2 transition">
            <Trash2 size={16} />
            Delete
          </button>
        </div>
        <div className="text-zinc-400 text-sm">
          {tracks.length} track{tracks.length !== 1 ? 's' : ''} • {selectedTrack ? 'Track selected' : 'No selection'}
        </div>
      </div>
    </div>
  );
}
