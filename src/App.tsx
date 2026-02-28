import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, Sparkles, ChevronRight, ChevronLeft, 
  CheckCircle, Play, Upload, MessageCircle, 
  Send, Video as VideoIcon, 
  Zap, Camera, Shield, Heart, Share2, 
  ImageIcon, Download, Sliders, Eye,
  FileVideo, Lock, UserPlus, CreditCard, Mail, Key, User, Wand2,
  Monitor, Volume2, Layers, Scissors, Palette, BookOpen, Search, Activity,
  Film, Target, Maximize, Wind, Sun, Database, HardDrive
} from 'lucide-react';

/**
 * MANDASTRONG STUDIO 2026 - Master Realism Build (TypeScript Version)
 * Focus: Photorealistic Cinema Synthesis (Anti-Animation)
 */

type Category = "Writing" | "Voice" | "Image" | "Video" | "Motion";

const generateTools = (category: Category): string[] => {
  const baseTools: Record<Category, string[]> = {
    Writing: ["Photorealistic Scene Logic", "Cinematic Beat Architect", "Natural Dialogue Synth", "Character Depth Matrix", "World-Building Physics", "Narrative Reality Solver", "Human-Emotion Mapper", "Documentary Arc Engine", "Script-to-Reality Link", "Subtext Neural Weaver"],
    Voice: ["Neural Vocal Clone (Human)", "Atmospheric Room Tone", "Dynamic Timbre Synth", "Natural Breathing Logic", "Linguistic Micro-Fluency", "Subsurface Vocal Resonance", "Human-Scale Dialect AI", "Studio-Grade Clarity Boost"],
    Image: ["Photoreal Texture Mapper", "8K Raw Asset Architect", "Global Illumination AI", "Subsurface Scattering Pro", "Optical Displacement Lab", "Physical Material Shader", "Cinematic Plate Synthesis", "Environment Reality Synth"],
    Video: ["Temporal Motion Physics", "Cinematic Camera Tracking", "Optical Flow Master", "Dynamic Exposure Link", "Photorealistic Frame Synth", "Dolly Zoom Physics Lab", "Lens Distortion Logic", "Natural Light Interaction"],
    Motion: ["Skeleton Physics Tracker", "Neural Muscle Dynamics", "Fluid Sim Realism", "Cloth Physics Engine", "Facial Micro-Expression AI", "Anatomic Accuracy Lab", "Gravity-Linked Movement", "Biometric Logic Sync"]
  };
  const list: string[] = [];
  const source = baseTools[category] || baseTools["Writing"];
  for (let i = 0; i < 120; i++) {
    const base = source[i % source.length];
    const version = i >= source.length ? ` MK-${Math.floor(i / source.length) + 1}` : "";
    list.push(`${base}${version}`.toUpperCase());
  }
  return list;
};

const BOARD_DATA = {
  Writing: generateTools("Writing"),
  Voice: generateTools("Voice"),
  Image: generateTools("Image"),
  Video: generateTools("Video"),
  Motion: generateTools("Motion")
};

// TITLED ENHANCEMENT TOOLS - FOCUS ON PHOTOREALISM
const ENHANCEMENT_TOOLS: string[] = [
  "Photoreal Upscale 8K", "HDR Luma Mapping", "Optical Lens Flare", "Atmospheric Volume", "Physical Grain Synth",
  "Chromatic Accuracy", "Raw Film Stock Pro", "Color Space Conform", "Luma/Chroma Balance", "Deep Black Stability",
  "Depth of Field Solve", "Dynamic Range V4", "Edge Detail Recovery", "Anamorphic Correction", "Gamma Curve Reality",
  "Global Illumination", "Neural Skin Shader", "Lens Blur Synthesis", "Light Wrap Realism", "Motion Path Physics",
  "Temporal De-Noise", "Ray-Traced Shadows", "Surface Reflection", "Saturation Depth", "Human Skin Neural",
  "Soft Focus Physics", "Frame Stability AI", "Tone Mapping Real", "Vignette Optics", "White Balance Logic"
];

interface SplashProps {
  onContinue: () => void;
}

const SplashPage: React.FC<SplashProps> = ({ onContinue }) => (
  <div onClick={onContinue} className="h-screen bg-black flex flex-col justify-center items-center text-center cursor-pointer animate-in fade-in duration-1000 overflow-hidden">
    <div className="absolute inset-0 splash-gradient"></div>
    <div className="relative z-10">
      <div className="w-56 h-56 mx-auto rounded-full border-4 border-studio-purple flex items-center justify-center mb-12 shadow-glow-large">
        <Film className="w-32 h-32 text-studio-purple-light" strokeWidth={1} />
      </div>
      <h1 className="text-9xl font-black text-white mb-4 uppercase tracking-tighter italic">MANDASTRONG</h1>
      <h2 className="text-6xl font-bold text-studio-purple mb-16 uppercase tracking-widest-ultra">STUDIO</h2>
      <div className="w-36 h-1 rounded-full mx-auto mb-14 bg-studio-purple animate-pulse"></div>
      <p className="text-white/40 text-2xl font-black uppercase italic tracking-widest">Cinema Intelligence Portal</p>
    </div>
  </div>
);

export default function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(90);
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, [page, showSplash]);

  if (showSplash) return <SplashPage onContinue={() => setShowSplash(false)} />;

  const goTo = (p: number) => { setPage(p); setMenuOpen(false); };

  const Navigation: React.FC = () => {
    if (page === 1 || page === 21) return null;
    return (
      <div className="fixed bottom-14 left-0 w-full flex justify-center gap-6 z-[400] px-4 pointer-events-none pb-2">
        <button 
          onClick={() => setPage(page - 1)}
          className="pointer-events-auto bg-zinc-950/90 border border-studio-purple-dim px-12 py-3 rounded-xl font-black uppercase text-studio-purple hover:bg-studio-purple hover:text-white transition-all shadow-xl active:scale-95 text-xs tracking-widest backdrop-blur-md"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <button 
          onClick={() => setPage(page + 1)}
          className="pointer-events-auto bg-studio-purple border border-studio-purple-dim px-12 py-3 rounded-xl font-black uppercase text-white hover:bg-purple-800 transition-all shadow-glow active:scale-95 text-xs tracking-widest"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans selection:bg-studio-purple selection:text-white">
      
      {/* QUICK MENU */}
      <div className="fixed top-6 right-6 z-[500]">
        <button onClick={() => setMenuOpen(!menuOpen)} className="bg-studio-purple p-3 rounded-full shadow-glow text-white hover:scale-110 transition-transform">
          <Menu size={22} />
        </button>
        {menuOpen && (
          <div className="absolute top-16 right-0 bg-zinc-950 border border-studio-purple-dim p-5 rounded-3xl w-64 shadow-3xl animate-in slide-in-from-right-4 duration-300">
            <div className="flex flex-col gap-2">
              {[{p:1, l:"Home"}, {p:4, l:"AI Workstations"}, {p:11, l:"Reality Editor"}, {p:13, l:"Enhancement Studio"}, {p:19, l:"Agent Grok Support"}, {p:21, l:"Finish"}].map((item) => (
                <button key={item.p} onClick={() => goTo(item.p)} className="text-right text-mini font-black uppercase text-studio-purple p-3 hover:bg-studio-purple hover:text-white rounded-xl transition-all border border-studio-purple-dim/10 leading-none">
                  {item.l}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button onClick={() => setPage(19)} className="fixed bottom-6 right-6 z-[500] bg-studio-purple p-3.5 rounded-full shadow-glow border border-white/10 hover:scale-110 transition-transform">
        <MessageCircle size={22} className="text-white" />
      </button>

      {page >= 3 && (
        <div className="fixed bottom-0 left-0 w-full bg-black/95 py-2.5 text-center z-[350] border-t border-studio-purple-dim backdrop-blur-md">
          <p className="text-tiny uppercase font-black text-white/60 tracking-widest-plus px-4 leading-none italic">
            MandaStrong Studio 2026 • Professional Cinema Synthesis • MandaStrong1.Etsy.com
          </p>
        </div>
      )}

      <Navigation />

      {[1, 2, 10, 21].includes(page) && (
        <div className="absolute inset-0 z-0 bg-black">
          <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40 grayscale-[0.5]">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-ocean-waves-loop-1196-large.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      <main className="relative z-10 min-h-screen">
        
        {/* PAGE 1: LANDING */}
        {page === 1 && (
          <div className="h-screen flex flex-col items-center text-center px-6">
            <div className="mt-12">
               <h1 className="text-studio-landing font-black text-white uppercase italic tracking-tighter leading-none mb-2 drop-shadow-2xl">
                 MANDASTRONG'S STUDIO
               </h1>
               <p className="text-xl md:text-2xl font-black italic text-studio-purple uppercase tracking-tight leading-tight opacity-90">
                 All-In-One Professional Movie Synthesis App ~ Photorealistic 8K Quality
               </p>
            </div>
            
            <div className="mt-auto mb-24 flex flex-wrap justify-center gap-6">
              <button onClick={() => setPage(2)} className="bg-white text-black px-16 py-4 rounded-2xl font-black uppercase text-2xl hover:scale-105 transition-all shadow-xl active:scale-95">Next</button>
              <button onClick={() => setPage(3)} className="bg-studio-purple text-white px-16 py-4 rounded-2xl font-black uppercase text-2xl hover:scale-105 transition-all shadow-xl active:scale-95 border-2 border-white/20">Login</button>
              <button onClick={() => setPage(3)} className="bg-studio-purple text-white px-16 py-4 rounded-2xl font-black uppercase text-2xl hover:scale-105 transition-all shadow-xl active:scale-95 border-2 border-white/20">Register</button>
            </div>
          </div>
        )}

        {/* PAGE 2: VISION */}
        {page === 2 && (
          <div className="h-screen flex flex-col justify-center items-center text-center px-4 bg-studio-purple-overlay">
            <Sparkles size={60} className="text-studio-purple mb-6 animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-4 leading-none">REALITY SYNTHESIS</h1>
            <p className="text-2xl md:text-4xl font-black text-studio-purple italic uppercase max-w-4xl mb-12 leading-tight">Bring Realistic Cinematic Dreams To Life!</p>
          </div>
        )}

        {/* PAGE 3: MASTER ACCESS */}
        {page === 3 && (
          <div className="p-4 pt-12 pb-40 max-w-7xl mx-auto overflow-y-auto custom-scrollbar">
            <div className="bg-gradient-to-br from-zinc-950 to-black p-10 rounded-3xl border-2 border-studio-purple mb-12 text-center shadow-xl max-w-2xl mx-auto backdrop-blur-xl">
              <h2 className="text-5xl font-black mb-2 text-studio-purple uppercase italic tracking-tighter leading-none">AMANDA STRONG</h2>
              <p className="text-xl text-white font-bold uppercase tracking-widest">Studio Master Tier Active</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
               <div className="bg-zinc-950/50 border border-studio-purple-dim p-10 rounded-[40px] text-left backdrop-blur-sm shadow-xl">
                  <h3 className="text-xl font-black uppercase italic mb-8 border-b border-studio-purple-dim pb-2 text-white">PRO STUDIO LOGIN</h3>
                  <div className="space-y-4">
                     <input type="email" placeholder="Production Email" className="w-full bg-black/40 border border-zinc-800 p-4 rounded-xl text-mini font-bold focus:border-studio-purple outline-none transition-all text-white" />
                     <input type="password" placeholder="Master Key" className="w-full bg-black/40 border border-zinc-800 p-4 rounded-xl text-mini font-bold focus:border-studio-purple outline-none transition-all text-white" />
                     <button className="w-full bg-studio-purple py-4 rounded-xl font-black uppercase text-sm tracking-widest shadow-md">Enter Studio</button>
                  </div>
               </div>
               <div className="bg-zinc-950/50 border border-studio-purple-dim p-10 rounded-[40px] text-left backdrop-blur-sm shadow-xl">
                  <h3 className="text-xl font-black uppercase italic mb-8 border-b border-studio-purple-dim pb-2 text-white">REGISTER STUDIO</h3>
                  <div className="space-y-4">
                     <input type="text" placeholder="Director Name" className="w-full bg-black/40 border border-zinc-800 p-4 rounded-xl text-mini font-bold focus:border-studio-purple outline-none transition-all text-white" />
                     <input type="email" placeholder="Contact Email" className="w-full bg-black/40 border border-zinc-800 p-4 rounded-xl text-mini font-bold focus:border-studio-purple outline-none transition-all text-white" />
                     <button className="w-full bg-zinc-900 border border-studio-purple-dim py-4 rounded-xl font-black uppercase text-sm tracking-widest text-white/40">Request Access</button>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* PAGE 4-9: REALITY WORKSTATIONS */}
        {(page >= 4 && page <= 9) && (
          <div className="flex h-screen bg-black pt-20 overflow-hidden">
             <div className="w-1/4 border-r border-studio-purple-dim p-10 overflow-y-auto custom-scrollbar bg-black/40">
                <h2 className="text-4xl font-black uppercase italic text-studio-purple tracking-widest mb-6 border-b border-studio-purple-dim pb-4 leading-none">{["Visuals", "Human Vocal", "Optical Plate", "Reality Video", "Physical Motion", "Director Hub"][page-4]}</h2>
                <div className="grid grid-cols-1 gap-3 pb-48">
                   {BOARD_DATA[Object.keys(BOARD_DATA)[(page-4) % 5] as Category].map((tool, i) => (
                     <button key={i} className="bg-zinc-950/30 border-2 border-zinc-900 p-5 rounded-2xl text-left hover:border-studio-purple hover:bg-studio-purple-overlay transition-all group active:scale-95 shadow-lg relative overflow-hidden">
                        <span className="text-micro font-black uppercase text-white/60 tracking-tighter italic block group-hover:text-white transition-colors leading-none">{tool}</span>
                     </button>
                   ))}
                </div>
             </div>
             <div className="flex-grow flex flex-col items-center justify-center relative bg-zinc-950/50 overflow-hidden text-center">
                <div className="z-10 opacity-30">
                   <Sparkles size={120} className="mx-auto mb-6 text-studio-purple animate-pulse" />
                   <h3 className="text-5xl font-black uppercase italic tracking-[0.3em] text-white/60 leading-none">Neural Reality Engine Active</h3>
                   <p className="text-studio-purple font-mono text-xl mt-8 tracking-widest-ultra animate-pulse uppercase">Cinema Grade Photorealism</p>
                </div>
             </div>
          </div>
        )}

        {/* PAGE 10: REALITY PREVIEW */}
        {page === 10 && (
          <div className="h-screen flex flex-col justify-center items-center text-center p-8 bg-black/40">
             <h1 className="text-studio-title font-black uppercase italic text-studio-purple mb-8 tracking-tighter drop-shadow-2xl leading-none">REALITY PREVIEW</h1>
             <div className="w-full max-w-5xl aspect-video bg-zinc-950 border-4 border-studio-purple-dim rounded-[40px] shadow-3xl flex flex-col items-center justify-center relative group hover:border-studio-purple transition-all overflow-hidden">
                <button onClick={() => setPage(11)} className="bg-studio-purple text-white px-20 py-5 rounded-2xl font-black uppercase text-2xl shadow-lg hover:scale-105 active:scale-95 transition-transform">Import Raw Cinematic Clips</button>
             </div>
          </div>
        )}

        {/* PAGE 11: PRECISION EDITOR */}
        {page === 11 && (
          <div className="p-8 pt-20 pb-32 h-screen overflow-hidden flex flex-col">
            <h1 className="text-4xl font-black uppercase italic text-white/90 mb-10 tracking-widest leading-none">Professional Multi-Track Suite</h1>
            <div className="flex-grow grid grid-cols-4 gap-8">
               <div className="col-span-3 aspect-video bg-zinc-900/50 border-2 border-studio-purple-dim rounded-[40px] shadow-3xl flex items-center justify-center relative group overflow-hidden cursor-pointer">
                  <Play size={100} className="text-studio-purple opacity-20 group-hover:opacity-60 transition-all shadow-glow" />
               </div>
               <div className="bg-zinc-950/40 border border-zinc-900 rounded-[30px] p-8 shadow-2xl overflow-y-auto custom-scrollbar">
                  <h3 className="text-mini font-black uppercase mb-8 text-studio-purple tracking-widest opacity-70 border-b border-studio-purple-dim pb-2 leading-none uppercase tracking-widest">Master Media Pool</h3>
                  <div className="space-y-4">
                    {[1,2,3,4,5,6].map(i => (
                       <div key={i} className="bg-black/40 p-5 rounded-xl border border-zinc-800 flex items-center gap-4 group hover:border-studio-purple transition-all cursor-move shadow-md">
                          <FileVideo size={20} className="text-zinc-700" />
                          <span className="text-mini font-black uppercase text-zinc-500 group-hover:text-white italic leading-none tracking-tighter">RAW_CINEMA_00{i}.R3D</span>
                       </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* PAGE 12: ASSET MANAGER */}
        {page === 12 && (
          <div className="p-10 pt-20 pb-40 max-w-7xl mx-auto text-center relative">
             <div className="absolute top-24 right-10">
                <button className="bg-studio-purple text-white px-8 py-3 rounded-2xl font-black uppercase text-mini shadow-glow hover:scale-105 transition-all flex items-center gap-2">
                   <Upload size={18} /> Upload Media
                </button>
             </div>
             <h1 className="text-5xl font-black uppercase italic text-studio-purple mb-16 tracking-widest leading-none">Reality Asset Manager</h1>
             <div className="grid grid-cols-4 md:grid-cols-6 gap-8">
                {Array.from({length: 24}).map((_, i) => (
                  <div key={i} className="aspect-square bg-zinc-900 border-2 border-zinc-800 rounded-3xl flex items-center justify-center group hover:border-studio-purple transition-all cursor-pointer relative overflow-hidden shadow-xl active:scale-90">
                     <ImageIcon size={40} className="text-zinc-700 group-hover:text-studio-purple" />
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* PAGE 13: ENHANCER GRID */}
        {page === 13 && (
          <div className="p-10 pt-20 text-center pb-80 max-w-7xl mx-auto overflow-y-auto custom-scrollbar">
            <h1 className="text-[7rem] font-black uppercase italic text-studio-purple mb-4 tracking-tighter drop-shadow-2xl leading-none">CINEMA ENHANCER</h1>
            <p className="text-white/40 font-black uppercase text-tiny tracking-widest-ultra mb-12 italic opacity-60 leading-none">Photorealistic Neural Optimization Pass</p>
            
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-3 mb-16 max-w-7xl mx-auto">
               {ENHANCEMENT_TOOLS.map((tool, i) => (
                  <button 
                    key={i} 
                    className="bg-zinc-950/50 border-2 border-zinc-900 p-4 rounded-2xl hover:border-studio-purple hover:bg-studio-purple-overlay transition-all group active:scale-95 text-center flex flex-col items-center justify-center min-h-28 shadow-lg"
                  >
                     <Zap size={24} className="glyph-icon transition-all mb-3 opacity-60" />
                     <span className="text-micro font-black text-zinc-600 group-hover:text-white uppercase tracking-tighter leading-tight block">{tool}</span>
                  </button>
               ))}
            </div>

            <div className="max-w-4xl mx-auto bg-zinc-900/50 p-12 rounded-[60px] border-2 border-studio-purple-dim shadow-3xl backdrop-blur-3xl">
               <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-black uppercase tracking-widest text-white/70 italic leading-none">Master Project Duration</h3>
                  <span className="text-studio-purple font-black text-7xl italic drop-shadow-lg tracking-tighter leading-none">{duration} <span className="text-2xl opacity-30 font-mono uppercase">Min</span></span>
               </div>
               <input 
                 type="range" min="0" max="180" value={duration} 
                 onChange={(e) => setDuration(parseInt(e.target.value))}
                 className="w-full h-3 bg-black rounded-full appearance-none cursor-pointer accent-studio-purple border border-white/10 shadow-inner" 
               />
               <p className="text-mini font-black uppercase text-zinc-700 mt-10 tracking-widest italic opacity-60">8K Cinema Master Export Lock: 180 Minutes Max</p>
            </div>
          </div>
        )}

        {/* PAGE 14-20: PRODUCTION CONTINUITY */}
        {(page >= 14 && page <= 20) && (
           <div className="h-screen flex flex-col items-center justify-center p-20 text-center">
              <h1 className="text-6xl font-black uppercase italic text-studio-purple mb-10 tracking-widest">
                 {["Composite", "Audio Realism", "Optical Grading", "Masterclass", "Social Hub", "Director Profile", "Final Rendering"][page-14]} Hub
              </h1>
              <div className="w-full max-w-5xl h-96 border-2 border-studio-purple-dim rounded-[60px] flex flex-col items-center justify-center shadow-3xl backdrop-blur-md">
                 <Activity size={100} className="text-studio-purple opacity-20 animate-pulse mb-8" />
                 {page === 19 && (
                    <div className="w-full max-w-3xl px-10">
                       <p className="text-2xl font-black uppercase italic text-white mb-10 italic">Agent Grok 24/7 Professional Production Support</p>
                       <div className="flex gap-4">
                          <input type="text" placeholder="Explain your cinematic issue..." className="flex-grow bg-black/60 border-2 border-zinc-800 p-5 rounded-2xl font-black text-studio-purple uppercase italic outline-none focus:border-studio-purple" />
                          <button className="bg-studio-purple p-5 rounded-2xl text-white shadow-xl"><Send size={24}/></button>
                       </div>
                    </div>
                 )}
              </div>
           </div>
        )}

        {/* PAGE 21: FINALE */}
        {page === 21 && (
          <div className="h-screen flex flex-col justify-center items-center text-center p-10 bg-black relative overflow-hidden">
            <div className="absolute inset-0 z-0">
               <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90 grayscale">
                  <source src="thatsallfolks.mp4" type="video/mp4" />
               </video>
            </div>
            <div className="relative z-10 space-y-10 max-w-7xl p-16 bg-black/50 backdrop-blur-3xl rounded-[80px] border-2 border-studio-purple-dim shadow-3xl">
               <h1 className="text-studio-finale font-black text-studio-purple uppercase italic mb-2 leading-none tracking-tighter drop-shadow-custom uppercase">THAT'S ALL FOLKS!</h1>
               <p className="text-4xl md:text-6xl font-black uppercase italic text-white tracking-tight leading-none drop-shadow-lg text-center italic">
                 "Amanda’s Thank you to creators now in future. Supporting cinematic innovation through our Veteran Fundraiser mission."
               </p>
               <div className="pt-12 leading-none">
                  <a href="https://MandaStrong1.Etsy.com" target="_blank" className="inline-block text-7xl md:text-[9rem] font-black text-studio-purple hover:text-white transition-all underline underline-offset-[30px] decoration-8 decoration-studio-purple-dim tracking-tighter leading-none italic">MandaStrong1.Etsy.com</a>
               </div>
            </div>
            <div className="flex gap-10 mt-16 relative z-20">
               <button onClick={() => setPage(1)} className="bg-studio-purple text-white px-24 py-6 rounded-3xl font-black uppercase text-4xl shadow-glow-large hover:scale-105 transition-transform active:scale-95 leading-none italic">HOME</button>
               <button className="bg-zinc-900 border-2 border-zinc-800 text-white/30 px-24 py-6 rounded-3xl font-black uppercase text-4xl hover:bg-zinc-900 transition-all leading-none active:scale-95 italic">CLOSE</button>
            </div>
          </div>
        )}

      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --studio-purple: #7e22ce;
          --studio-purple-dim: rgba(126, 34, 206, 0.2);
          --studio-purple-light: rgba(126, 34, 206, 0.7);
          --studio-purple-glow: rgba(126, 34, 206, 0.5);
        }
        .text-studio-purple { color: var(--studio-purple); }
        .bg-studio-purple { background-color: var(--studio-purple); }
        .bg-studio-purple-overlay { background-color: var(--studio-purple-dim); }
        .bg-studio-purple-dim { background-color: var(--studio-purple-dim); }
        .border-studio-purple { border-color: var(--studio-purple); }
        .border-studio-purple-dim { border-color: var(--studio-purple-dim); }
        .border-studio-purple-light { border-color: var(--studio-purple-light); }
        .shadow-glow { box-shadow: 0 0 25px var(--studio-purple-glow); }
        .shadow-glow-large { box-shadow: 0 0 70px var(--studio-purple-glow); }
        .splash-gradient { background: radial-gradient(circle at center, rgba(126, 34, 206, 0.5) 0%, #000 70%); }
        .glyph-icon { color: #52525b; }
        .group:hover .glyph-icon { color: var(--studio-purple); }
        
        .text-micro { font-size: 8px; }
        .text-tiny { font-size: 9px; }
        .text-mini { font-size: 11px; }
        .tracking-widest-plus { letter-spacing: 0.25em; }
        .tracking-widest-ultra { letter-spacing: 0.6em; }
        .h-px-2 { height: 2px; }
        
        .text-studio-landing { font-size: 8.5rem; }
        .text-studio-title { font-size: 11.5rem; }
        .text-studio-title-large { font-size: 11rem; }
        .text-studio-finale { font-size: 16.5rem; }
        .drop-shadow-custom { filter: drop-shadow(0 0 60px rgba(126, 34, 206, 1)); }

        @keyframes loading-bar { 0% { width: 0%; } 50% { width: 75%; } 100% { width: 100%; } }
        .animate-loading-bar { animation: loading-bar 2.5s infinite ease-in-out; }
        .custom-scrollbar::-webkit-scrollbar { width: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--studio-purple); border-radius: 20px; }
        
        input[type=range] { -webkit-appearance: none; background: #111; border-radius: 30px; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 38px; width: 38px; border-radius: 50%; background: var(--studio-purple); cursor: pointer; border: 4px solid white; box-shadow: 0 0 25px var(--studio-purple-glow); }
        
        .shadow-3xl { box-shadow: 0 0 80px rgba(0,0,0,1); }
        .animate-in { animation-duration: 0.7s; animation-fill-mode: both; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .fade-in { animation-name: fade-in; }
      `}} />
    </div>
  );
}