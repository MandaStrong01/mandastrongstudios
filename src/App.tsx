import React, { useState } from 'react';
import { 
  Play, LogIn, ChevronLeft, ChevronRight, Film, Monitor, 
  Upload, Music, Type, Download, Save, Globe, X, Plus, 
  FolderOpen, Settings, MessageSquare, Star, ShieldCheck, Cpu,
  Sliders, Video, Trash2, Share2, CheckCircle2, Link as LinkIcon,
  Mic, Image as ImageIcon, Wand2, Zap, Layout, Info
} from 'lucide-react';

const GOLD = "#c5a059";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");

  // --- NAVIGATION ---
  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, 21));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  const handleAdminLogin = () => {
    if (email.toLowerCase().includes('manda')) {
      setCurrentPage(3); // Direct to Project Hub
    } else {
      nextPage();
    }
  };

  // --- TOOL DATA (EXACTLY AS PER YOUR DESIGN) ---
  const workstations = {
    writing: ["Script to Movie", "Text to Script", "Dialogue Generator", "Story Outline", "Scene Writer", "Character Bio", "Plot Twist Generator", "Treatment Writer", "Beat Sheet Builder", "Opening Hook Creator", "Climax Designer", "Subplot Generator", "Three Act Structure", "Feature Film Script", "TV Pilot Script", "Commercial Script", "Voiceover Script", "Interview Script", "Action Line Writer", "Dialogue Tightener"],
    voice: ["Clone My Voice", "Text to Speech", "AI Voice Actor", "Trailer Voice", "Character Voice", "Lip Sync AI", "Dialogue Synth", "Accent Generator", "Deep Voice", "Robot Voice", "Elderly Voice", "Child Voice", "Speed Controller", "Clarity Booster", "Voice Denoiser", "Reverb Remover", "Noise Gate", "Compression Tool", "Distortion FX", "Multilingual Sync"],
    image: ["Text to Image", "Prompt to Image", "Image to Image", "Image Upscaler", "AI Art Generator", "Background Generator", "Background Remover", "Sky Replacer", "Character Design", "Portrait Generator", "Landscape Generator", "Architecture Visualizer", "Interior Design", "Logo Generator", "Color Palette Gen", "Style Transfer", "Photo Restorer", "Old Photo Colorizer", "Detail Enhancer", "Color Grading Studio"],
    video: ["Text to Video", "Prompt to Video", "Image to Video", "Script to Video", "AI Movie Creator", "Shot Generator", "Video Upscaler 8K", "Slow Motion Gen", "Video Stabilizer", "Background Remover", "Watermark Remover", "Film Restorer", "Old Film Effect", "Drone Shot Gen", "Dolly Zoom", "Clone Effect", "De-Aging AI", "Avatar Creator", "AI News Anchor", "Mouth Animation"],
    motion: ["Prompt to Motion", "Image to Animation", "Face Animation", "Body Motion Capture", "Crowd Animation", "Particle Effects", "Explosion Generator", "Fire Animation", "Water Simulation", "Cloth Dynamics", "Hair Simulator", "Gravity Physics", "Rigid Body Physics", "Destruction Sim", "Motion Tracker", "Object Tracker", "3D Camera Move", "Stop Motion Style", "Puppet Rig", "1K Rig Builder"]
  };

  // --- UI FRAGMENTS ---
  const Header = () => (
    <nav className="flex justify-between items-start px-8 py-4 bg-black sticky top-0 z-50 border-b border-zinc-900/50">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => setCurrentPage(1)}>
        <div className="w-12 h-12 rounded-full border border-[#c5a059] flex items-center justify-center font-bold text-2xl text-[#c5a059]">G</div>
        <div className="flex flex-col">
          <span className="text-[9px] tracking-[0.5em] uppercase text-zinc-500 font-bold">Cinema Intelligence Platform — Est. 2026</span>
          <h1 className="text-xl font-bold tracking-[0.2em] uppercase text-[#c5a059]">Manda Strong Studio</h1>
          <span className="text-[8px] tracking-[0.3em] uppercase text-zinc-600 font-bold">600+ AI Tools • 8K Export • Up to 3-Hour Films</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]"></div>
          <span className="text-[9px] text-green-500 uppercase font-bold tracking-tighter">System Online</span>
          <span className="text-[9px] text-zinc-600 uppercase font-bold ml-2">Build 2026.03.18</span>
        </div>
        <div className="flex gap-2 mt-2">
          <button onClick={() => setCurrentPage(1)} className="bg-[#c5a059] text-black text-[9px] px-3 py-1 font-bold uppercase tracking-widest">Home</button>
          <button onClick={() => setCurrentPage(2)} className="border border-zinc-700 text-zinc-400 text-[9px] px-3 py-1 font-bold uppercase tracking-widest">Login</button>
        </div>
      </div>
    </nav>
  );

  const Footer = () => (
    <footer className="fixed bottom-0 w-full bg-black/95 py-3 px-8 flex justify-between items-center z-50 border-t border-zinc-900">
      <div className="text-[9px] tracking-widest text-zinc-600 uppercase font-bold">
        MANDASTRONG STUDIO 2026 • PROFESSIONAL CINEMA • <span className="text-[#c5a059]">MandaStrong1.Etsy.com</span>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={prevPage} className="bg-zinc-900 border border-zinc-800 px-4 py-1 text-[10px] uppercase font-bold text-[#c5a059] flex items-center gap-1">
          <ChevronLeft size={12} /> BACK
        </button>
        <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">PAGE {currentPage} / 21</div>
        <button onClick={nextPage} className="bg-zinc-900 border border-zinc-800 px-4 py-1 text-[10px] uppercase font-bold text-[#c5a059] flex items-center gap-1">
          NEXT <ChevronRight size={12} />
        </button>
      </div>
    </footer>
  );

  const ToolBoard = ({ title, num, tools }: { title: string, num: string, tools: string[] }) => (
    <div className="w-full max-w-7xl mx-auto pt-8 pb-32">
      <div className="flex justify-between items-end mb-8 border-b border-zinc-900 pb-4">
        <div>
          <p className="text-[9px] tracking-[0.5em] text-zinc-600 uppercase mb-1 italic font-bold underline">AI Workstation {num}</p>
          <h2 className="text-3xl font-bold tracking-widest uppercase text-[#c5a059]">{title}</h2>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
        {tools.map((t, i) => (
          <div key={i} onClick={() => setActiveTool(t)} className="bg-zinc-950 border border-zinc-900 p-6 hover:border-[#c5a059] cursor-pointer transition-all group">
            <span className="text-[8px] text-zinc-700 mb-2 uppercase tracking-widest block font-bold">TOOL {num}.{i+1}</span>
            <h4 className="text-white text-[10px] font-bold uppercase tracking-widest group-hover:text-[#c5a059]">{t}</h4>
          </div>
        ))}
      </div>
    </div>
  );

  // --- PAGE ROUTER ---
  const renderPage = () => {
    switch(currentPage) {
      case 1: // LANDING
        return (
          <div className="flex flex-col items-center pt-24 text-center">
             <h1 className="text-7xl font-bold tracking-[0.2em] text-[#c5a059] uppercase leading-tight mb-4">Manda Strong<br/>Studio</h1>
             <p className="text-zinc-500 tracking-[0.4em] uppercase text-xs font-bold mb-12 italic">600+ AI Tools • 8K Export • Up to 3-Hour Films</p>
             <div className="flex gap-4 mb-20">
               <button onClick={nextPage} className="bg-[#c5a059] text-black px-12 py-4 font-bold uppercase tracking-widest text-xs">START CREATING</button>
               <button onClick={() => setCurrentPage(2)} className="border border-zinc-700 text-zinc-400 px-12 py-4 font-bold uppercase tracking-widest text-xs">LOGIN / REGISTER</button>
             </div>
             <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
               {[["600+", "AI Tools"], ["8K", "Cinema Export"], ["3HRS", "Max Duration"]].map(([v, l]) => (
                 <div key={l} className="bg-zinc-950 border border-zinc-900 p-10">
                   <h4 className="text-5xl font-bold text-[#c5a059] mb-1">{v}</h4>
                   <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">{l}</p>
                 </div>
               ))}
             </div>
          </div>
        );
      case 2: // LOGIN
        return (
          <div className="max-w-6xl mx-auto pt-16 pb-40 grid grid-cols-2 gap-8">
            <div className="bg-zinc-950 border border-zinc-900 p-12">
              <h3 className="text-[#c5a059] text-xs uppercase font-bold tracking-widest mb-10 border-b border-zinc-900 pb-2">EXISTING USER — SIGN IN</h3>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full bg-black border border-zinc-800 p-4 mb-4 text-xs text-white outline-none" />
              <input type="password" placeholder="Password" className="w-full bg-black border border-zinc-800 p-4 mb-8 text-xs text-white outline-none" />
              <button onClick={handleAdminLogin} className="w-full py-4 font-bold uppercase tracking-widest border border-[#c5a059] text-[#c5a059] text-xs hover:bg-[#c5a059] hover:text-black">SIGN IN TO STUDIO</button>
            </div>
            <div className="bg-zinc-950 border border-zinc-900 p-12">
              <h3 className="text-[#c5a059] text-xs uppercase font-bold tracking-widest mb-10 border-b border-zinc-900 pb-2">NEW CREATOR — 7-DAY FREE TRIAL</h3>
              <div className="space-y-4 mb-8">
                {["$20 Monthly - Creator", "$30 Monthly - Pro", "$50 Monthly - Studio"].map(p => (
                  <button key={p} className="w-full py-3 border border-zinc-800 text-[10px] font-bold uppercase tracking-widest hover:border-[#c5a059]">{p}</button>
                ))}
              </div>
              <button className="w-full py-4 bg-[#c5a059] text-black font-bold uppercase tracking-widest text-xs">START FREE TRIAL</button>
            </div>
          </div>
        );
      case 3: // PROJECT HUB
        return (
          <div className="max-w-6xl mx-auto pt-10 pb-40">
            <div className="flex justify-between items-end mb-12 border-b border-zinc-900 pb-6">
              <h2 className="text-4xl font-bold tracking-widest uppercase text-[#c5a059]">PROJECT HUB</h2>
              <button onClick={() => setCurrentPage(11)} className="flex items-center gap-3 border border-[#c5a059] text-[#c5a059] px-8 py-3 text-[11px] font-bold uppercase hover:bg-[#c5a059] hover:text-black">
                <Plus size={16} /> NEW PRODUCTION
              </button>
            </div>
            <div className="grid grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-video bg-zinc-950 border border-zinc-900 flex flex-col items-center justify-center group hover:border-[#c5a059]/40 cursor-pointer">
                  <FolderOpen size={48} className="text-zinc-900 mb-4" />
                  <p className="text-[10px] text-zinc-700 uppercase tracking-widest font-bold">PRODUCTION SLOT {i}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 5: return <ToolBoard title="WRITING TOOLS" num="02" tools={workstations.writing} />;
      case 6: return <ToolBoard title="VOICE TOOLS" num="03" tools={workstations.voice} />;
      case 7: return <ToolBoard title="IMAGE TOOLS" num="04" tools={workstations.image} />;
      case 8: return <ToolBoard title="VIDEO TOOLS" num="05" tools={workstations.video} />;
      case 9: return <ToolBoard title="MOTION TOOLS" num="06" tools={workstations.motion} />;
      case 14: // MIXER
        return (
          <div className="max-w-5xl mx-auto pt-20">
            <h2 className="text-center text-4xl font-bold tracking-widest uppercase mb-16 text-[#c5a059]">AUDIO MIXER</h2>
            <div className="grid grid-cols-4 gap-10 h-96">
              {[["MUSIC", 75], ["VOICE", 60], ["SFX", 50], ["MASTER", 85]].map(([l, v], i) => (
                <div key={i} className="bg-zinc-950 border border-zinc-900 p-10 flex flex-col items-center">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold mb-6">{l}</span>
                  <span className="text-3xl font-bold mb-10 text-[#c5a059]">{v}</span>
                  <div className="flex-1 w-2 bg-zinc-900 relative rounded-full">
                    <div className="absolute bottom-0 w-full bg-blue-600 shadow-[0_0_10px_blue]" style={{ height: `${v}%` }}></div>
                  </div>
                  <div className="w-6 h-6 bg-white rounded-full mt-6 cursor-pointer"></div>
                </div>
              ))}
            </div>
          </div>
        );
      case 20: // GROK
        return (
          <div className="max-w-4xl mx-auto pt-20">
            <div className="bg-zinc-950 border border-zinc-800 p-16 text-center shadow-2xl">
              <div className="w-20 h-20 border-2 border-[#c5a059] rounded-full mx-auto flex items-center justify-center mb-8">
                <div className="w-10 h-10 bg-[#c5a059] rounded-sm animate-pulse"></div>
              </div>
              <h2 className="text-3xl font-bold tracking-[0.5em] mb-4 text-[#c5a059]">AGENT GROK</h2>
              <div className="bg-zinc-900 p-8 border-l-4 border-[#c5a059] text-sm text-zinc-400 italic mb-10 text-left leading-loose uppercase tracking-widest">
                "I am Agent Grok. Your production is synchronized. How may I assist?"
              </div>
              <div className="flex gap-4">
                <input type="text" placeholder="Consult Grok..." className="flex-1 bg-black border border-zinc-800 p-5 text-sm outline-none focus:border-[#c5a059]" />
                <button className="px-12 py-5 font-bold uppercase tracking-widest text-black bg-[#c5a059]">SEND</button>
              </div>
            </div>
          </div>
        );
      case 21: // END
        return (
          <div className="max-w-4xl mx-auto pt-10 text-center pb-40 uppercase tracking-widest">
            <h2 className="text-5xl font-bold mb-12 text-[#c5a059]">THAT'S ALL FOLKS</h2>
            <div className="bg-zinc-950 border border-zinc-900 p-12 text-left text-xs leading-loose text-zinc-500">
              <p className="mb-8 font-bold italic border-b border-zinc-900 pb-8">MandaStrong Studio supports veterans' mental health and anti-bullying initiatives. A portion of every dollar goes directly toward these causes.</p>
              <div className="pt-8">
                <p className="font-bold text-lg text-[#c5a059]">— AMANDA STRONG</p>
                <p>Founder, MandaStrong Studio</p>
                <p className="mt-4 text-white font-bold italic underline">MandaStrong1.Etsy.com</p>
              </div>
            </div>
            <button onClick={() => setCurrentPage(1)} className="mt-16 px-12 py-4 font-bold border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black">BACK TO TABLE</button>
          </div>
        );
      default:
        return <div className="pt-40 text-center text-zinc-800 uppercase tracking-widest font-bold">PHASE {currentPage} LIVE INTEGRATION...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#c5a059] selection:text-black font-sans">
      <Header />
      <main className="px-8 min-h-[85vh]">{renderPage()}</main>
      <Footer />

      {activeTool && (
        <div className="fixed inset-0 bg-black/98 z-[100] flex items-center justify-center p-8">
          <div className="bg-zinc-950 border-2 border-zinc-800 w-full max-w-6xl p-16 relative">
            <button onClick={() => setActiveTool(null)} className="absolute top-8 right-8 text-zinc-600 hover:text-white"><X size={40} /></button>
            <h2 className="text-5xl font-bold tracking-widest mb-12 uppercase text-[#c5a059]">{activeTool}</h2>
            <div className="grid grid-cols-2 gap-16">
              <div className="border-2 border-dashed border-zinc-900 p-20 flex flex-col items-center justify-center text-zinc-800">
                <Upload size={50} className="mb-6" />
                <span className="text-[11px] font-bold uppercase">IMPORT MEDIA</span>
              </div>
              <div className="flex flex-col">
                <textarea placeholder="Execute AI Render..." className="flex-1 bg-black border border-zinc-800 p-8 text-sm outline-none focus:border-[#c5a059] mb-8 uppercase tracking-widest font-bold" />
                <button className="py-5 font-bold uppercase text-black bg-[#c5a059]">GENERATE</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
