import React, { useState, useRef } from "react";
import { Music, Mic, Zap, Sliders, Clock, Loader, Save, Download, Share2, Play, BookOpen, Shield, MessageCircle, HelpCircle, CheckCircle, ThumbsUp, Heart } from "lucide-react";
import { addToast } from "./utils";

const DEMO_VIDEOS = [
  { url: "/videos/demo.mp4", name: "Demo Video", size: "50MB", quality: "1080p", format: "MP4" },
];

export default function App() {
  const [page, setPage] = useState(1);
  const [audioLevels, setAudioLevels] = useState({ music: 75, voice: 50, sfx: 65, master: 80 });
  const [savingPreset, setSavingPreset] = useState(false);
  const [duration, setDuration] = useState(90);
  const [exportSettings, setExportSettings] = useState({ quality: "1080p", format: "MP4" });
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [communityPosts, setCommunityPosts] = useState<any[]>([]);
  const [newComment, setNewComment] = useState<any>({});
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const goTo = (p: number) => setPage(p);

  const handleSavePreset = () => {
    setSavingPreset(true);
    setTimeout(() => {
      setSavingPreset(false);
      addToast("Preset saved!", "success");
    }, 1000);
  };

  const handleRender = () => {
    const renderedVideo = {
      url: "/videos/final.mp4",
      name: "Your Masterpiece",
      size: "150MB",
      quality: exportSettings.quality,
      format: exportSettings.format,
    };
    setCurrentVideo(renderedVideo);
    addToast("🎬 Video rendered successfully!", "success");
    setPage(16); // Navigate to the public video player page
  };

  const handleShare = () => addToast("🔗 Link copied to clipboard!", "success");

  const handleLike = (id: number) => {
    setCommunityPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleLove = (id: number) => {
    setCommunityPosts(prev => prev.map(p => p.id === id ? { ...p, loves: p.loves + 1 } : p));
  };

  const handleComment = (id: number) => {
    if (newComment[id]?.trim()) {
      const comment = { id: Date.now(), user: "You", text: newComment[id] };
      setCommunityPosts(prev => prev.map(p => p.id === id ? { ...p, comments: [...(p.comments||[]), comment] } : p));
      setNewComment(prev => ({ ...prev, [id]: "" }));
    }
  };

  const handleDownload = (video: any) => {
    // Disabled: we now show public player instead
    addToast("This video is now public! 🎬", "info");
  };

  return (
    <div className="App bg-black text-white">
      <main>
        {page === 14 && (
          <div className="min-h-screen p-8 pt-20 pb-40 fade-up">
            <h1 className="text-5xl font-black text-[#7c3aed] mb-12 text-center uppercase">PROFESSIONAL AUDIO MIXER</h1>
            <div className="grid grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[{ key: 'music', label: 'MUSIC', icon: Music }, { key: 'voice', label: 'VOICE', icon: Mic },
              { key: 'sfx', label: 'SFX', icon: Zap }, { key: 'master', label: 'MASTER', icon: Sliders, master: true }].map(ch => (
                <div key={ch.key} className={`bg-zinc-950 border-4 rounded-3xl p-6 flex flex-col items-center ${ch.master ? 'border-[#7c3aed]' : 'border-zinc-800'}`}>
                  <ch.icon size={36} className="text-[#7c3aed] mb-3" />
                  <div className="font-black text-base mb-6 text-white">{ch.label}</div>
                  <div className="relative h-64 w-24 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-3xl mb-6 overflow-hidden">
                    <div className="absolute bottom-0 w-full rounded-3xl bg-gradient-to-b from-[#a78bfa] to-[#7c3aed] transition-all duration-150"
                      style={{ height: `${audioLevels[ch.key as keyof typeof audioLevels]}%` }} />
                  </div>
                  <input type="range" min="0" max="100" value={audioLevels[ch.key as keyof typeof audioLevels]}
                    onChange={e => setAudioLevels(prev => ({ ...prev, [ch.key]: Number(e.target.value) }))}
                    className="w-full mb-4 cursor-pointer" />
                  <div className="text-3xl font-black text-[#7c3aed]">{audioLevels[ch.key as keyof typeof audioLevels]}%</div>
                </div>
              ))}
            </div>
            <div className="max-w-6xl mx-auto mt-12 flex gap-4 justify-center">
              <button onClick={() => { setAudioLevels({ music: 75, voice: 50, sfx: 65, master: 80 }); addToast('Audio reset', 'info'); }}
                className="px-12 py-4 bg-zinc-800 text-white rounded-xl font-black uppercase hover:bg-zinc-700 transition">RESET LEVELS</button>
              <button onClick={handleSavePreset} disabled={savingPreset}
                className="px-12 py-4 bg-[#7c3aed] text-white rounded-xl font-black uppercase hover:bg-[#6d28d9] transition flex items-center gap-3 disabled:opacity-50">
                {savingPreset ? <><Loader size={18} className="animate-spin" />SAVING...</> : <><Save size={18} />SAVE PRESET</>}
              </button>
            </div>
          </div>
        )}

        {/* ... pages 15–15b remain unchanged ... */}

        {page === 16 && (
          <div className="h-screen flex flex-col items-center justify-center bg-black p-6 fade-up">
            <h1 className="text-4xl font-black uppercase text-[#7c3aed] mb-6 text-center">🎬 YOUR MASTERPIECE IS PUBLIC</h1>
            <div className="w-full max-w-5xl rounded-3xl overflow-hidden border-4 border-[#7c3aed] shadow-2xl mb-6 bg-black">
              <video
                ref={previewVideoRef}
                key={currentVideo?.url ?? DEMO_VIDEOS[0].url}
                src={currentVideo?.url ?? DEMO_VIDEOS[0].url}
                autoPlay
                controls
                loop
                playsInline
                className="w-full"
                style={{ minHeight: '360px', background: '#000' }}
                onCanPlay={() => {
                  if (previewVideoRef.current) {
                    previewVideoRef.current.play().catch(() => {
                      if (previewVideoRef.current) {
                        previewVideoRef.current.muted = true;
                        previewVideoRef.current.play();
                      }
                    });
                  }
                }}
              />
            </div>
            <p className="text-zinc-400 text-sm mb-6 font-bold text-center">
              {currentVideo ? `${currentVideo.name} • ${currentVideo.size} • ${currentVideo.quality} ${currentVideo.format}` : "Demo Preview — Your film is now public!"}
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <button onClick={handleShare} className="bg-blue-600 px-12 py-4 rounded-xl font-black uppercase hover:bg-blue-700 transition flex items-center gap-2">
                <Share2 size={20} /> SHARE PUBLIC LINK
              </button>
              <button onClick={() => goTo(15)} className="bg-zinc-800 px-12 py-4 rounded-xl font-black uppercase hover:bg-zinc-700 transition">
                🔄 RE-RENDER
              </button>
            </div>
          </div>
        )}

        {/* pages 17–22 remain unchanged, except download now becomes public info */}
      </main>
    </div>
  );
}