import React, { useState } from 'react';
import { 
  Play, LogIn, ChevronLeft, ChevronRight, Film, Monitor, 
  Upload, Music, Type, Download, Save, Globe, X, Plus, 
  FolderOpen, Settings, MessageSquare, Star, ShieldCheck, Cpu,
  Sliders, Video, Trash2, Share2, CheckCircle2
} from 'lucide-react';

/**
 * MANDA STRONG STUDIO - STABLE PRODUCTION BUILD
 * Version: 4.0.0
 * Fixed: Deployment Error / Switch Statement Integrity
 */

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

  const writingTools = ["Script to Movie", "Text to Script", "Dialogue Generator", "Story Outline", "Scene Writer", "Character Bio", "Plot Twist Generator", "Treatment Writer", "Beat Sheet Builder", "Opening Hook Creator", "Climax Designer", "Subplot Generator", "Three Act Structure", "Feature Film Script", "TV Pilot Script", "Commercial Script", "Voiceover Script", "Interview Script", "Action Line Writer", "Dialogue Tightener"];

  // --- UI COMPONENTS ---
  const Header = () => (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-zinc-900 bg-black sticky top-0 z-50">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage(1)}>
        <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-xl" style={{ borderColor: GOLD, color: GOLD }}>G</div>
        <div>
          <h2 className="text-[9px] tracking-[0.4em] uppercase opacity-50" style={{ color: GOLD }}>Cinema Intelligence — Est. 2026</h2>
          <h1 className="text-sm font-bold tracking-[0.2em] uppercase text-white">Manda Strong Studio</h1>
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
        MANDASTRONG STUDIO 2026 • <span style={{ color: GOLD }}>MandaStrong1.Etsy.com</span>
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

  const renderContent = () => {
    switch(currentPage) {
      case 1:
        return (
          <div className="flex flex-col items-center justify-center min-h-[75vh] text-center pt-10">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 uppercase" style={{ color: GOLD }}>Manda Strong Studio</h1>
            <p className="text-zinc-400 tracking-[0.5em] uppercase text-xs mb-12 font-bold italic">The Professional AI Movie Creation Platform</p>
            <div className="flex gap-6 mb-20">
              <button onClick={nextPage} className="px-12 py-4 font-bold uppercase tracking-widest text-black hover:brightness-110 shadow-lg" style={{ backgroundColor: GOLD }}>Start Creating</button>
              <button onClick={() => setCurrentPage(2)} className="border border-zinc-700 px-12 py-4 font-bold uppercase tracking-widest text-zinc-400 hover:bg-zinc-900">Login / Register</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="max-w-6xl w-full mx-auto pt-10 pb-40">
            <div className="grid grid-cols-2 gap-10 mb-16">
              <div className="border border-zinc-900 p-12 bg-zinc-950/40">
                <h3 style={{ color: GOLD }} className="uppercase text-xs tracking-widest font-bold mb-8 italic underline">Existing User — Sign In</h3>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full bg-black border border-zinc-800 p-4 mb-4 text-xs text-white outline-none focus:border-[#c5a059]" />
                <button onClick={handleAdminLogin} className="w-full py-4 font-bold uppercase border hover:bg-[#c5a059] hover:text-black transition-all" style={{ borderColor: GOLD, color: GOLD }}>Sign In</button>
              </div>
              <div className="border border-zinc-900 p-12 bg-zinc-950/40">
                <h3 style={{ color: GOLD }} className="uppercase text-xs tracking-widest font-bold mb-8 italic underline">New Creator — 7-Day Trial</h3>
                <button className="w-full py-4 font-bold uppercase tracking-widest text-black" style={{ backgroundColor: GOLD }}>Claim Free Trial</button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {["$20", "$30", "$50"].map((v, i) => (
                <div key={i} className="border border-zinc-900 p-10 text-center bg-zinc-950/20 hover:border-[#c5a059]">
                  <h4 style={{ color: GOLD }} className="text-4xl font-bold mb-8">{v}</h4>
                  <button className="w-full py-2 text-[10px] font-bold uppercase tracking-widest border border-zinc-800 hover:bg-[#c5a059] hover:text-black transition-all">Subscribe</button>
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="max-w-6xl w-full mx-auto pt-10 pb-40">
            <h2 className="text-4xl font-serif tracking-widest uppercase mb-12" style={{ color: GOLD }}>Project Hub</h2>
            <div className="grid grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-video bg-zinc-950 border border-zinc-900 flex flex-col items-center justify-center group hover:border-[#c5a059]/40 cursor-pointer shadow-2xl">
                  <FolderOpen size={48} className="text-zinc-900 mb-4" />
                  <p className="text-[10px] text-zinc-700 uppercase tracking-widest font-bold">Slot {i}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="w-full max-w-7xl mx-auto pt-8 pb-32">
            <h2 className="text-3xl font-serif tracking-widest uppercase mb-10 text-center" style={{ color: GOLD }}>Writing Workstation</h2>
            <div className="grid grid-cols-4 gap-4 h-[60vh] overflow-y-auto pr-4">
              {writingTools.map((t, i) => (
                <div key={i} onClick={() => setActiveTool(t)} className="bg-zinc-900/10 border border-zinc-800 p-6 hover:border-[#c5a059] cursor-pointer transition-all group">
                  <h4 className="text-white text-[11px] font-bold uppercase tracking-widest group-hover:text-[#c5a059]">{t}</h4>
                </div>
              ))}
            </div>
          </div>
        );
      case 21:
        return (
          <div className="max-w-4xl mx-auto pt-10 pb-40 text-center uppercase tracking-widest">
            <h2 className="text-5xl font-serif mb-12" style={{ color: GOLD }}>That's All Folks</h2>
            <div className="bg-zinc-950 border border-zinc-900 p-12 text-left text-xs leading-loose text-zinc-500">
              <p className="mb-8 font-medium">MandaStrong Studio supports veterans' mental health and anti-bullying initiatives. A portion of every dollar goes directly toward these causes. I am the author of 'Doxy the School Bully'.</p>
              <div className="pt-10 border-t border-zinc-900">
                <h3 className="font-bold text-lg" style={{ color: GOLD }}>— Amanda Strong</h3>
                <p className="mb-2">Founder, MandaStrong Studio</p>
                <p className="mt-4 text-white">MandaStrong1.Etsy.com</p>
              </div>
            </div>
            <button onClick={() => setCurrentPage(1)} className="mt-16 px-12 py-4 font-bold border hover:bg-[#c5a059] hover:text-black transition-all" style={{ borderColor: GOLD, color: GOLD }}>Return Home</button>
          </div>
        );
      default:
        return <div className="pt-40 text-center text-zinc-800 uppercase tracking-[0.5em] font-bold">Phase {currentPage} Live Integration...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#c5a059] selection:text-black font-sans">
      <Header />
      <main className="px-8 min-h-[85vh]">{renderContent()}</main>
      <Footer />

      {activeTool && (
        <div className="fixed inset-0 bg-black/98 z-[100] flex items-center justify-center p-8 backdrop-blur-md">
          <div className="bg-zinc-950 border-2 border-zinc-800 w-full max-w-6xl p-16 relative shadow-2xl">
            <button onClick={() => setActiveTool(null)} className="absolute top-8 right-8 text-zinc-600 hover:text-white transition-colors">
              <X size={40} />
            </button>
            <h2 className="text-5xl font-serif tracking-widest mb-12 uppercase" style={{ color: GOLD }}>{activeTool}</h2>
            <div className="grid grid-cols-2 gap-16">
              <div className="border-2 border-dashed border-zinc-900 p-20 flex flex-col items-center justify-center text-zinc-800">
                <Upload size={50} className="mb-6" />
                <span className="text-[11px] font-bold uppercase">Import Media</span>
              </div>
              <div className="flex flex-col">
                <textarea placeholder="Execute AI Render..." className="flex-1 bg-black border border-zinc-900 p-8 text-sm outline-none focus:border-[#c5a059] mb-8" />
                <button className="py-5 font-bold uppercase text-black" style={{ backgroundColor: GOLD }}>Generate</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
