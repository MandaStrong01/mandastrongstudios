import { useState, useRef } from 'react';
import { X, Film, Music, Type, FileText, ZoomIn, ZoomOut } from 'lucide-react';

function parseSRT(content) {
  const blocks = content.trim().split(/\n\s*\n/);
  return blocks.map(block => {
    const lines = block.trim().split('\n');
    if (lines.length < 3) return null;
    const text = lines.slice(2).join(' ').replace(/<[^>]+>/g, '').trim();
    const m = lines[1].match(/(\d{2}):(\d{2}):(\d{2})[,.](\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})[,.](\d{3})/);
    if (!m) return null;
    const toSec = (h, mn, s, ms) => parseInt(h)*3600 + parseInt(mn)*60 + parseInt(s) + parseInt(ms)/1000;
    return { index: parseInt(lines[0]), start: toSec(m[1],m[2],m[3],m[4]), end: toSec(m[5],m[6],m[7],m[8]), text };
  }).filter(Boolean);
}

function fmt(sec) {
  const m = Math.floor(sec/60), s = Math.floor(sec%60);
  return `${m}:${String(s).padStart(2,'0')}`;
}

const TRACKS = [
  { key:'video',    label:'VIDEO',    Icon:Film,     color:'#7c3aed', accept:['video','image'] },
  { key:'audio',    label:'AUDIO',    Icon:Music,    color:'#22d3ee', accept:['audio'] },
  { key:'text',     label:'TEXT',     Icon:Type,     color:'#4ade80', accept:['text'] },
  { key:'subtitle', label:'SUBTITLE', Icon:FileText, color:'#facc15', accept:['srt'] },
];

export default function TimelineEditor({ mediaLibrary = [] }) {
  const [tracks, setTracks] = useState({ video:[], audio:[], text:[], subtitle:[] });
  const [zoom, setZoom] = useState(60);
  const [dragging, setDragging] = useState(null);
  const [overTrack, setOverTrack] = useState(null);
  const [toast, setToast] = useState(null);
  const srtRef = useRef(null);

  const showToast = (msg, type='success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDrop = (trackKey, e) => {
    e.preventDefault();
    setOverTrack(null);
    if (!dragging) return;
    const cfg = TRACKS.find(t => t.key === trackKey);
    if (!cfg.accept.includes(dragging.type)) {
      showToast(`⚠️ ${dragging.type} clips belong on the ${dragging.type.toUpperCase()} track`, 'error');
      setDragging(null);
      return;
    }
    const offset = tracks[trackKey].reduce((max, c) => Math.max(max, (c.offset||0)+(c.duration||8)), 0);
    setTracks(prev => ({ ...prev, [trackKey]: [...prev[trackKey], { ...dragging, offset, id: Date.now() }] }));
    showToast(`✅ Added to ${cfg.label} track`);
    setDragging(null);
  };

  const removeClip = (trackKey, id) => {
    setTracks(prev => ({ ...prev, [trackKey]: prev[trackKey].filter(c => c.id !== id) }));
    showToast('Clip removed', 'warning');
  };

  const handleSRTFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.srt')) { showToast('❌ Must be a .srt file', 'error'); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const subtitles = parseSRT(ev.target.result);
      if (!subtitles.length) { showToast('❌ Could not parse SRT file', 'error'); return; }
      const duration = subtitles[subtitles.length-1].end;
      const offset = tracks.subtitle.reduce((max,c) => Math.max(max,(c.offset||0)+(c.duration||10)), 0);
      setTracks(prev => ({
        ...prev,
        subtitle: [...prev.subtitle, { id:Date.now(), name:file.name, type:'srt', subtitles, duration, offset, size:`${subtitles.length} cues` }]
      }));
      showToast(`✅ ${subtitles.length} subtitle cues imported`);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const totalDuration = Math.max(30, ...Object.values(tracks).flat().map(c => (c.offset||0)+(c.duration||8)));
  const tlWidth = totalDuration * zoom + 120;

  return (
    <div className="flex flex-col h-full bg-black text-white select-none">
      {toast && (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-[999] px-6 py-3 rounded-full font-bold text-sm shadow-2xl border-2 ${
          toast.type==='error' ? 'bg-zinc-950 border-red-500 text-red-400' :
          toast.type==='warning' ? 'bg-zinc-950 border-yellow-500 text-yellow-400' :
          'bg-zinc-950 border-green-500 text-green-400'}`}>{toast.msg}</div>
      )}
      <input ref={srtRef} type="file" accept=".srt" onChange={handleSRTFile} className="hidden" />

      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-zinc-800 bg-zinc-950 flex-shrink-0">
        <h2 className="text-sm font-black uppercase text-[#7c3aed] tracking-widest">Timeline Editor</h2>
        <div className="flex-1" />
        <button onClick={() => srtRef.current?.click()}
          className="flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/60 text-yellow-400 px-3 py-1.5 rounded-lg text-xs font-black hover:bg-yellow-400/25 transition">
          <FileText size={13} /> IMPORT .SRT
        </button>
        <button onClick={() => setZoom(z => Math.max(20,z-10))} className="bg-zinc-800 p-2 rounded-lg hover:bg-zinc-700 transition"><ZoomOut size={15}/></button>
        <span className="text-xs text-zinc-400 font-bold w-14 text-center">{zoom}px/s</span>
        <button onClick={() => setZoom(z => Math.min(180,z+10))} className="bg-zinc-800 p-2 rounded-lg hover:bg-zinc-700 transition"><ZoomIn size={15}/></button>
      </div>

      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Media Library panel */}
        <div className="w-52 flex-shrink-0 border-r border-zinc-800 bg-zinc-950 overflow-y-auto p-3">
          <p className="text-[10px] font-black uppercase text-zinc-500 mb-3 tracking-widest">Media Library</p>
          {mediaLibrary.length === 0 && (
            <p className="text-zinc-600 text-xs text-center py-10 leading-relaxed">No assets yet.<br/><span className="text-zinc-500">Upload on page 10.</span></p>
          )}
          {mediaLibrary.map(asset => {
            const cfg = TRACKS.find(t => t.accept.includes(asset.type));
            const color = cfg?.color || '#9ca3af';
            return (
              <div key={asset.id} draggable
                onDragStart={() => setDragging(asset)}
                onDragEnd={() => setDragging(null)}
                className="bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 mb-2 cursor-grab active:cursor-grabbing hover:border-[#7c3aed] transition">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                  <span className="text-xs font-bold text-white truncate">{asset.name}</span>
                </div>
                <div className="flex gap-2 mt-1">
                  <span className="text-[10px] text-zinc-500 uppercase">{asset.type}</span>
                  {asset.size && <span className="text-[10px] text-zinc-600">{asset.size}</span>}
                </div>
              </div>
            );
          })}
          <div onClick={() => srtRef.current?.click()}
            className="mt-3 bg-yellow-400/10 border-2 border-dashed border-yellow-400/40 rounded-lg p-3 cursor-pointer hover:bg-yellow-400/20 transition text-center">
            <FileText size={18} className="text-yellow-400 mx-auto mb-1" />
            <span className="text-[10px] font-black text-yellow-400 uppercase">Add .SRT File</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex-1 overflow-auto bg-zinc-900">
          {/* Ruler */}
          <div className="sticky top-0 z-10 bg-zinc-950 border-b border-zinc-800 h-7" style={{ width: tlWidth }}>
            {Array.from({ length: Math.ceil(totalDuration / 5) + 1 }).map((_, i) => (
              <div key={i} className="absolute bottom-1 text-[10px] text-zinc-500 font-bold" style={{ left: i * 5 * zoom }}>
                {fmt(i * 5)}
                <div className="absolute top-0 w-px h-2 bg-zinc-700" />
              </div>
            ))}
          </div>

          {/* Track rows */}
          <div className="p-3 space-y-2" style={{ minWidth: tlWidth }}>
            {TRACKS.map(cfg => (
              <div key={cfg.key} className="flex">
                <div className="w-24 flex-shrink-0 flex flex-col items-center justify-center rounded-l-xl py-3 gap-1 border-y-2 border-l-2"
                  style={{ borderColor: cfg.color + '50', background: cfg.color + '12' }}>
                  <cfg.Icon size={16} style={{ color: cfg.color }} />
                  <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: cfg.color }}>{cfg.label}</span>
                </div>
                <div className="relative h-16 rounded-r-xl border-y-2 border-r-2 transition-colors"
                  style={{ width: tlWidth, borderColor: overTrack === cfg.key ? cfg.color : cfg.color + '30', background: overTrack === cfg.key ? cfg.color + '10' : cfg.color + '05' }}
                  onDragOver={e => { e.preventDefault(); setOverTrack(cfg.key); }}
                  onDragLeave={() => setOverTrack(null)}
                  onDrop={e => handleDrop(cfg.key, e)}>
                  {tracks[cfg.key].length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-[11px] font-bold opacity-30" style={{ color: cfg.color }}>
                        {cfg.key === 'subtitle' ? 'Drag .srt files here or use Import button' : `Drag ${cfg.label.toLowerCase()} clips here`}
                      </span>
                    </div>
                  )}
                  {tracks[cfg.key].map(clip => {
                    const width = Math.max((clip.duration || 8) * zoom, 72);
                    return (
                      <div key={clip.id}
                        className="absolute top-1.5 bottom-1.5 rounded-lg border-2 flex flex-col justify-between px-2 py-1 group overflow-hidden"
                        style={{ left: (clip.offset||0)*zoom, width, borderColor: cfg.color, background: cfg.color+'22' }}
                        title={clip.name}>
                        <div className="flex items-center gap-1 min-w-0">
                          <cfg.Icon size={9} style={{ color: cfg.color }} className="flex-shrink-0" />
                          <span className="text-white text-[10px] font-bold truncate flex-1">{clip.name}</span>
                          <button onClick={() => removeClip(cfg.key, clip.id)} className="text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition flex-shrink-0">
                            <X size={10} />
                          </button>
                        </div>
                        <div className="text-zinc-500 text-[9px] truncate">
                          {clip.type === 'srt' ? `${clip.subtitles?.length||0} cues` : (clip.size || fmt(clip.duration||8))}
                        </div>
                        {clip.type === 'srt' && (
                          <div className="flex gap-px h-1">
                            {clip.subtitles?.slice(0,24).map((_,i) => (
                              <div key={i} className="flex-1 rounded-full" style={{ background: cfg.color+'80' }} />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* SRT cue preview */}
          {tracks.subtitle.length > 0 && (
            <div className="mx-3 mb-3 bg-zinc-950 border border-yellow-400/30 rounded-xl p-4">
              <p className="text-xs font-black text-yellow-400 mb-3 uppercase tracking-widest">Subtitle Cue Preview</p>
              <div className="space-y-1 max-h-36 overflow-y-auto">
                {tracks.subtitle.flatMap(clip =>
                  (clip.subtitles||[]).slice(0,15).map(cue => (
                    <div key={`${clip.id}-${cue.index}`} className="flex gap-3 text-xs">
                      <span className="text-yellow-500 font-bold w-16 flex-shrink-0 font-mono">{fmt(cue.start)}</span>
                      <span className="text-zinc-300">{cue.text}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
