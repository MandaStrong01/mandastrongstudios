import { useState, useRef, useCallback, useEffect } from 'react';
import {
  Menu, Sparkles, MessageCircle, ChevronLeft, ChevronRight,
  CheckCircle, Play, Upload, Mic, Zap, Shield, Music, Sliders,
  Database, FileVideo, BookOpen, Clock, ThumbsUp, Heart, HelpCircle,
  Eye, X, Download, Save, Wand2, Share2, Search, AlertCircle, Loader, Clipboard
} from 'lucide-react';
import PasteImporter from './components/PasteImporter';
import Page21 from './components/Page21';
import TimelineEditor from './components/TimelineEditor';

const DEMO_VIDEOS = [
  "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-ocean-waves-loop-1196-large.mp4",
];

const AI_TOOLS: Record<string, string[]> = {
  Writing: ["Text to Video - Cinematic","Text to Video - Realistic","Script to Movie","Dialogue Writer","Plot Generator","Scene Writer","Story Outliner","Character Developer","Script Formatter","Beat Sheet","Logline Generator","Synopsis Writer"],
  Voice: ["Text to Speech - Natural","Voice Cloning - Instant","AI Voice Generator","Voice Narrator","Voice Actor Generator","Lip Sync AI","Voice Coach","Accent Generator","Pitch Controller","Tone Adjuster"],
  Image: ["Image to Video - Motion","Photo to Animation","AI Image Animator","Image Generator","Asset Architect","Texture Mapper","VFX Synthesis","Matte Logic","Color Palette","Background Generator"],
  Video: ["Video Upscaler to 8K","Frame Rate Booster","60FPS Converter","Slow Motion Generator","Video Extender","Scene Generator","Motion Video Maker","Video Creator","Avatar Generator","Video Synthesizer"],
  Motion: ["Particle Effect Generator","VFX Generator - All Types","Style Transfer - Any Style","Motion Tracker","Mocap Logic","Physics Engine","Cloth Dynamics","Skeleton Animator","Facial Rigging"],
  Enhancement: ["AI 8K Upscaling","Video Denoiser","Audio Enhancer","Noise Cancellation","Face Enhancement","Cinematic Grain","Motion Stabilization","Deep HDR Boost","Face Retouch Pro"]
};

const ENHANCEMENT_TOOLS = ["AI 8K Upscaling","Cinematic Grain","Motion Stabilization","Deep HDR Boost","Face Retouch Pro","Neural Noise Reduction","Auto Color Balance","Dynamic Range Expansion","Lens Flare Synth","Shadow Recovery"];

type Comment = { id: number; text: string; user: string; timestamp: string };
type CommunityPost = { id: number; title: string; user: string; emoji: string; likes: number; loves: number; comments: Comment[] };

const INITIAL_POSTS: CommunityPost[] = [
  { id: 1, title: 'Epic Action Movie', user: 'Sarah J.', emoji: '🎬', likes: 2847, loves: 1923, comments: [] },
  { id: 2, title: 'Family Vacation', user: 'Mike Chen', emoji: '✈️', likes: 1256, loves: 892, comments: [] },
];

export default function App() {
  const [page, setPage] = useState(0); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [duration, setDuration] = useState(90);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedEnhancement, setSelectedEnhancement] = useState<string | null>(null);
  const [mediaLibrary, setMediaLibrary] = useState<any[]>([]);
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [audioLevels, setAudioLevels] = useState({ music: 75, voice: 50, sfx: 65, master: 80 });
  const [enhancementSettings, setEnhancementSettings] = useState({ intensity: 75, clarity: 75, color: 75, brightness: 75 });
  const [exportSettings, setExportSettings] = useState({ quality: '8K', format: 'MP4' });
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(INITIAL_POSTS);
  const [newComment, setNewComment] = useState<Record<number, string>>({});
  const [toolSearch, setToolSearch] = useState('');
  const [userPlan] = useState('Studio • Admin');
  const [toasts, setToasts] = useState<any[]>([]);
  const [modal, setModal] = useState<any>(null);
  const [applyingEnhancement, setApplyingEnhancement] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [showPasteImporter, setShowPasteImporter] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setPage(1), 1500);
    return () => clearTimeout(timer);
  }, []);

  const goTo = useCallback((p: number) => { 
    setPage(p); 
    setMenuOpen(false); 
    window.scrollTo(0,0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 font-sans">
      <style>{`
        .scrollbar::-webkit-scrollbar{width:6px;}
        .scrollbar::-webkit-scrollbar-track{background:#000;}
        .scrollbar::-webkit-scrollbar-thumb{background:#7c3aed;border-radius:10px;}
        @keyframes fadeUp{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
        .fade-up{animation:fadeUp 0.5s ease forwards;}
      `}</style>

      {page > 1 && (
        <div className="fixed top-6 left-6 z-[100]">
          <button onClick={() => setMenuOpen(!menuOpen)} className="bg-[#7c3aed] p-4 rounded-full shadow-2xl hover:scale-110 transition">
            <Menu size={24} />
          </button>
          {menuOpen && (
            <div className="absolute top-20 left-0 bg-zinc-950 border-2 border-[#7c3aed] p-6 rounded-2xl w-72 shadow-2xl max-h-[80vh] overflow-y-auto scrollbar">
              <div className="space-y-2">
                {[{label:'🏠 Home',p:1},{label:'🔐 Plans',p:3},{label:'✍️ Writing',p:4},{label:'🎙 Voice',p:5},{label:'🖼 Image',p:6},{label:'🎬 Video',p:7},{label:'🌀 Motion',p:8},{label:'✨ Enhancement',p:9},{label:'📂 Upload',p:10},{label:'🎛 Editor',p:11},{label:'👥 Community',p:21}].map(item => (
                  <button key={item.p} onClick={() => goTo(item.p)} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm ${page === item.p ? 'bg-[#7c3aed]' : 'hover:bg-white/10'}`}>{item.label}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <main className="min-h-screen">
        
        {page === 0 && (
          <div className="h-screen flex items-center justify-center bg-black">
            <div className="text-center">
              <Sparkles size={48} className="text-purple-500 animate-pulse mx-auto mb-4" />
              <h2 className="tracking-[1em] text-white/40 uppercase text-[10px]">Initializing Studio...</h2>
            </div>
          </div>
        )}

        {page === 1 && (
          <div className="h-screen flex flex-col items-center justify-center relative fade-up">
            <header className="absolute top-8 w-full px-10 flex justify-between items-center text-[10px] tracking-[0.4em] uppercase opacity-60">
              <div>CINEMA INTELLIGENCE PLATFORM – EST. 2026</div>
              <div className="flex items-center gap-2 text-purple-400">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]"></span>
                SYSTEM ONLINE
              </div>
            </header>
            <h1 className="text-[100px] md:text-[180px] font-black leading-[0.85] tracking-tighter text-center uppercase select-none">
              MANDA<br />STRONG<br />STUDIO
            </h1>
            <footer className="absolute bottom-24 w-full flex flex-col items-center gap-6">
              <div className="flex gap-8 text-[10px] tracking-[0.3em] uppercase opacity-70">
                <span>600+ AI TOOLS</span><span>•</span><span>8K EXPORT</span><span>•</span><span>UP TO 3-HOUR FILMS</span>
              </div>
              <button onClick={() => goTo(2)} className="bg-purple-600 px-16 py-4 rounded-full font-black uppercase text-sm hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                Start Creating
              </button>
            </footer>
          </div>
        )}

        {page === 3 && (
          <div className="p-20 max-w-7xl mx-auto fade-up">
            <h2 className="text-6xl font-black text-center mb-16 uppercase text-white">Choose Your Plan</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {t:'Basic', p:'20', f:['HD Export','100 AI Tools','10GB Cloud']},
                {t:'Pro', p:'30', f:['4K Export','300 AI Tools','100GB Cloud','Priority Support']},
                {t:'Studio', p:'50', f:['8K Export','600 AI Tools','1TB Cloud','Full Commercial Rights']}
              ].map((plan) => (
                <div key={plan.t} className="bg-zinc-950 border-2 border-zinc-800 p-10 rounded-3xl hover:border-purple-500 transition-all">
                  <h3 className="text-2xl font-black uppercase mb-2">{plan.t}</h3>
                  <div className="text-5xl font-black text-purple-500 mb-8">${plan.p}<span className="text-sm opacity-50">/mo</span></div>
                  <ul className="space-y-4 mb-10">
                    {plan.f.map(f => <li key={f} className="text-sm flex items-center gap-2 font-bold"><CheckCircle size={16} className="text-purple-500"/> {f}</li>)}
                  </ul>
                  <button className="w-full py-4 bg-purple-600 rounded-xl font-black uppercase hover:bg-purple-500">Subscribe</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {page > 3 && page <= 21 && (
           <div className="p-20 text-center fade-up">
              <h2 className="text-4xl font-black uppercase text-purple-500 mb-4">Module {page} Active</h2>
              <p className="opacity-40 tracking-widest text-xs uppercase text-white">Rendering Engine Stable • Data Secured</p>
           </div>
        )}

        {page > 1 && page < 22 && (