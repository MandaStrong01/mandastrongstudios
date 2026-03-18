import React, { useState } from 'react';
import { 
  Play, LogIn, ChevronLeft, ChevronRight, Film, Monitor, 
  Upload, Music, Type, Download, Save, Globe, X, Plus, 
  FolderOpen, Settings, MessageSquare, Star, ShieldCheck, Cpu,
  Sliders, Image as ImageIcon, Video, Trash2, Share2, CheckCircle2
} from 'lucide-react';

const GOLD = "#c5a059";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");

  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, 21));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  const handleAdminLogin = () => {
    if (email.toLowerCase().includes('manda')) {
      setCurrentPage(3);
    } else {
      nextPage();
    }
  };

  // --- DATA SETS FROM YOUR DESIGN ---
  const writingTools = ["Script to Movie", "Text to Script", "Dialogue Generator", "Story Outline", "Scene Writer", "Character Bio", "Plot Twist Generator", "Treatment Writer", "Beat Sheet Builder", "Opening Hook Creator", "Climax Designer", "Subplot Generator", "Three Act Structure", "Feature Film Script", "TV Pilot Script", "Commercial Script", "Voiceover Script", "Interview Script", "Action Line Writer", "Dialogue Tightener"];
  const voiceTools = ["Clone My Voice", "Text to Speech", "AI Voice Actor", "Trailer Voice", "Character Voice", "Lip Sync AI", "Dialogue Synth", "Accent Generator", "Deep Voice", "Robot Voice", "Elderly Voice", "Child Voice", "Speed Controller", "Clarity Booster", "Voice Denoiser", "Reverb Remover", "Noise Gate", "Compression Tool", "Distortion FX", "Multilingual Sync"];
  const videoTools = ["Text to Video", "Prompt to Video", "Image to Video", "Script to Video", "AI Movie Creator", "Shot Generator", "Video Upscaler 8K", "Slow Motion Gen", "Video Stabilizer", "Background Remover", "Watermark Remover", "Film Restorer", "Old Film Effect", "Drone Shot Gen", "Dolly Zoom", "Clone Effect", "De-Aging AI", "Avatar Creator", "AI News Anchor"];

  // --- REUSABLE COMPONENTS ---
  const Header = () => (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-zinc-900 bg-black sticky top-0 z-50">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage(1)}>
        <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-xl transition-transform hover:scale-105" style={{ borderColor: GOLD, color: GOLD }}>G</div>
        <div>
          <h2 className="text-[9px] tracking-[0.4em] uppercase opacity-50" style={{ color: GOLD }}>Cinema Intelligence — Est. 2026</h2>
          <h1 className="text-sm font-bold tracking-[0.2em] uppercase text-white">MANDA STRONG STUDIO</h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">System Online</span>
      </div>
    </nav>
  );

  const Footer = () => (
    <footer className="fixed bottom-0 w-full border-t border-zinc-900 bg-black/95 py-4 px-8 flex justify-between items-center z-50 backdrop-blur-md">
      <div className="text-[9px] tracking-widest text-zinc-600 uppercase font-bold">
        MANDASTRONG STUDIO 2026 • PROFESSIONAL CINEMA • <span style={{ color: GOLD }}>MandaStrong1.Etsy.com</span>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={prevPage} className="border border-zinc-800 px-6 py-1.5 text-[10px] uppercase font-bold hover:bg-zinc-900 transition-all" style={{ color: GOLD }}>Back</button>
        <div className="bg-zinc-900 px-4 py-1.5 border border-zinc-800 text-zinc-400 text-[10px] uppercase font-bold tracking-widest">
          Page {currentPage} / 21
        </div>
        <button onClick={nextPage} className="border border-zinc-800 px-6 py-1.5 text-[10px] uppercase font-bold hover:bg-zinc-900 transition-all" style={{ color: GOLD }}>Next</button>
      </div>
    </footer>
  );

  const ToolGrid = ({ title, tools, workstationNum }: { title: string, tools: string[], workstationNum: string }) => (
    <div className="w-full max-w-7xl mx-auto pt-8 pb-32">
      <div className="flex justify-between items-end mb-10 border-b border-zinc-900 pb-4">
        <div>
          <p className="text-[9px] tracking-[0.5em] text-zinc-600 uppercase mb-1">AI Workstation {workstationNum}</p>
          <h2 className="text-3xl font-serif tracking-widest uppercase" style={{ color: GOLD }}>{title}</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
        {tools.map((tool, i) => (
          <div key={i} onClick={() => setActiveTool(tool)} className="bg-zinc-900/10 border border-zinc-800 p-6 hover:border-[#c5a059] transition-all cursor-pointer group relative">
            <span className="text-[8px] text-zinc-600 mb-2 uppercase tracking-widest block font-bold">Tool {300 + i}</span>
            <h3 className="text-white text-[11px] font-bold uppercase tracking-widest group-hover:text-[#c5a059]">{tool}</h3>
          </div>
        ))}
      </div>
    </div>
  );

  // --- PAGE ROUTER ---
  const renderContent = () => {
    switch(currentPage) {
      case 1: // LANDING
        return (
          <div className="flex flex-col items-center justify-center min-h-[75vh] text-center pt-10">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 uppercase" style={{ color: GOLD }}>Manda Strong Studio</h1>
            <p className="text-zinc-400 tracking-[0.5em] uppercase text-xs mb-12 font-bold italic">The Professional AI Movie Creation Platform</p>
            <div className="flex gap-6 mb-20">
              <button onClick={nextPage} className="px-12 py-4 font-bold uppercase tracking-widest text-black hover:brightness-110 shadow-lg transition-transform hover:scale-105" style={{ backgroundColor: GOLD }}>Start Creating</button>
              <button onClick={() => setCurrentPage(2)} className="border border-zinc-700 px-12 py-4 font-bold uppercase tracking-widest text-zinc-400 hover:bg-zinc-900">Login / Register</button>
            </div>
            <div className="grid grid-cols-3 gap-10 w-full max-w-4xl pt-10 border-t border-zinc-900">
              {["600+ AI TOOLS", "8K EXPORT", "3HR DURATION"].map(stat => (
                <div key={stat} className="text-center">
                  <h4 className="font-bold text-xl" style={{ color: GOLD }}>{stat.split(' ')[0]}</h4>
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{stat.split(' ').slice(1).join(' ')}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 2: // LOGIN & PRICING
        return (
          <div className="max-w-6xl w-full mx-auto pt-10 pb-40">
            <div className="grid grid-cols-2 gap-10 mb-16">
              <div className="border border-zinc-900 p-12 bg-zinc-950/40">
                <h3 style={{ color: GOLD }} className="uppercase text-xs tracking-widest font-bold mb-8 italic underline">Existing User — Sign In</h3>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full bg-black border border-zinc-800 p-4 mb-4 text-xs text-white outline-none focus:border-[#c5a059]" />
                <button onClick={handleAdminLogin} className="w-full py-4 font-bold uppercase border hover:bg-[#c5a059] hover:text-black transition-all" style={{ borderColor: GOLD, color: GOLD }}>Sign In to Studio</button>
              </div>
              <div className="border border-zinc-900 p-12 bg-zinc-950/40">
                <h3 style={{ color: GOLD }} className="uppercase text-xs tracking-widest font-bold mb-8 italic underline">New Creator — 7-Day Trial</h3>
                <input type="text" placeholder="Your Email" className="w-full bg-black border border-zinc-800 p-4 mb-4 text-xs" />
                <button className="w-full py-4 font-bold uppercase tracking-widest text-black transition-all" style={{ backgroundColor: GOLD }}>Claim Free Trial</button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[["Creator", "$20"], ["Pro", "$30"], ["Studio", "$50"]].map(([p, v], i) => (
                <div key={i} className={`border p-10 text-center transition-all ${i === 2 ? 'border-[#c5a059] bg-[#c5a059]/5 shadow-[0_0_30px_rgba(197,160,89,0.1)]' : 'border-zinc-900'}`}>
                  <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-4 font-bold">{p} Plan</h4>
                  <h5 style={{ color: GOLD }} className="text-5xl font-bold mb-8">{v}<span className="text-xs text-zinc-800">/mo</span></h5>
                  <button className="w-full py-3 text-[10px] font-bold uppercase tracking-widest border border-zinc-800 hover:bg-[#c5a059] hover:text-black transition-all">Subscribe</button>
                </div>
              ))}
            </div>
          </div>
        );
      case 3: // PROJECT HUB
        return (
          <div className="max-w-6xl w-full mx-auto pt-10 pb-40">
            <div className="flex justify-between items-end mb-12 border-b border-zinc-900 pb-6">
              <h2 className="text-4xl font-serif tracking-widest uppercase" style={{ color: GOLD }}>Project Hub</h2>
              <button onClick={() => setCurrentPage(11)} className="flex items-center gap-3 border border-[#c5a059] text-[#c5a059] px-8 py-3 text-[11px] font-bold uppercase hover:bg-[#c5a059] hover:text-black transition-all">
                <Plus size={16} /> New Production
              </button>
            </div>
            <div className="grid grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-video bg-zinc-950/50 border border-zinc-900 flex flex-col items-center justify-center group hover:border-[#c5a059]/40 transition-all cursor-pointer shadow-2xl">
                  <FolderOpen size={48} className="text-zinc-900 group-hover:text-[#c5a059]/20 mb-4 transition-colors" />
                  <p className="text-[10px] text-zinc-700 uppercase tracking-widest font-bold">Production Slot {i}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 5: return <ToolGrid title="Writing Workstation" workstationNum="02" tools={writingTools} />;
      case 6: return <ToolGrid title="Voice Synthesis" workstationNum="03" tools={voiceTools} />;
      case 8: return <ToolGrid title="Video Production" workstationNum="05" tools={videoTools} />;
      
      case 14: // AUDIO MIXER
        return (
          <div className="w-full max-w-5xl mx-auto pt-20">
            <h2 className="text-center text-4xl font-serif tracking-widest uppercase mb-16" style={{ color: GOLD }}>Audio Mixing Console</h2>
            <div className="grid grid-cols-4 gap-10 h-96">
              {[["Music", 75], ["Voice", 60], ["SFX", 50], ["Master", 85]].map(([l, v], i) => (
                <div key={i} className="bg-zinc-950 border border-zinc-900 p-10 flex flex-col items-center group hover:border-[#c5a059]/30 transition-all">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-6">{l}</span>
                  <span className="text-3xl font-bold mb-10" style={{ color: GOLD }}>{v}</span>
                  
