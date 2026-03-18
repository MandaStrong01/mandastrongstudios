import React, { useState } from 'react';
import { 
  Play, LogIn, ChevronLeft, ChevronRight, Film, Monitor, 
  Upload, Music, Type, Download, Save, Globe, X, Plus, 
  FolderOpen, Settings, MessageSquare, Star, ShieldCheck, Cpu 
} from 'lucide-react';

/**
 * MANDA STRONG STUDIO - FINAL PRODUCTION BUILD
 * Fixes: Resolved Unexpected Token (17:8) and Switch/Case syntax.
 * Build: 2026.03.18
 */

const GOLD = "#c5a059";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");

  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, 21));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  const handleLogin = () => {
    if (email.toLowerCase().includes('manda')) {
      setCurrentPage(3);
    } else {
      nextPage();
    }
  };

  const writingTools = ["Script to Movie", "Text to Script", "Dialogue Generator", "Story Outline", "Scene Writer", "Character Bio", "Plot Twist Generator", "Treatment Writer", "Beat Sheet Builder", "Opening Hook Creator", "Climax Designer", "Subplot Generator", "Three Act Structure", "Feature Film Script", "TV Pilot Script", "Commercial Script", "Voiceover Script", "Interview Script", "Action Line Writer", "Dialogue Tightener"];

  // --- REUSABLE UI ---
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
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">System Live</span>
      </div>
    </nav>
  );

  const Footer = () => (
    <footer className="fixed bottom-0 w-full border-t border-zinc-900 bg-black/95 py-4 px-8 flex justify-between items-center z-50">
      <div className="text-[9px] tracking-widest text-zinc-600 uppercase font-bold">
        MANDASTRONG STUDIO 2026 • <span style={{ color: GOLD }}>MandaStrong1.Etsy.com</span>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={prevPage} className="border border-zinc-800 px-6 py-1.5 text-[10px] uppercase font-bold hover:bg-zinc-900 transition-all" style={{ color: GOLD }}>Back</button>
        <span className="text-[10px] text-zinc-500 uppercase font-bold pt-1.5 tracking-widest">Page {currentPage} / 21</span>
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
              <button onClick={() => setCurrentPage(2)} className="border border-zinc-700 px-12 py-4 font-bold uppercase tracking-widest text-zinc-400 hover:bg-zinc-900">Login</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="max-w-4xl mx-auto pt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-950 border border-zinc-900 p-10">
              <h3 className="uppercase font-bold tracking-widest mb-8 italic" style={{ color: GOLD }}>Existing User — Sign In</h3>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full bg-black border border-zinc-800 p-4 mb-4 text-white text-xs outline-none focus:border-[#c5a059]" />
              <button onClick={handleLogin} className="w-full py-4 font-bold uppercase border hover:bg-[#c5a059] hover:text-black transition-all" style={{ borderColor: GOLD, color: GOLD }}>Enter Studio</button>
            </div>
            <div className="bg-zinc-950 border border-zinc-900 p-10">
              <h3 className="uppercase font-bold tracking-widest mb-8 italic" style={{ color: GOLD }}>Subscription Plans</h3>
              <div className="space-y-4">
                {["$20 Monthly", "$30 Monthly", "$50 Monthly"].map(plan => (
                  <button key={plan} className="w-full py-3 text-[10px] font-bold uppercase border border-zinc-800 hover:border-[#c5a059]">{plan}</button>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="max-w-6xl mx-auto pt-10 pb-40">
            <h2 className="text-3xl font-bold uppercase tracking-[0.3em] mb-10 text-[#c5a059]">Project Hub</h2>
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-video bg-zinc-950 border border-zinc-900 flex flex-col items-center justify-center group hover:border-[#c5a059] cursor-pointer transition-all">
                  <FolderOpen size={32} className="text-zinc-800 mb-4 group-hover:text-[#c5a059]" />
                  <p className="text-zinc-800 font-bold uppercase text-[10px] tracking-widest group-hover:text-[#c5a059]">Film Slot {i}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="max-w-7xl mx-auto pt-10 pb-40">
            <h2 className="text-2xl font-bold uppercase tracking-[0.4em] mb-10 text-center text-[#c5a059]">Writing Workstation</h2>
            <div className="grid grid-cols-4 gap-4 h-[65vh] overflow-y-auto pr-4 custom-scrollbar">
              {writingTools.map(t => (
                <div key={t} onClick={() => setActiveTool(t)} className="bg-zinc-900/20 border border-zinc-800 p-6 hover:border-[#c5a059] cursor-pointer transition-all group">
                  <h4 className="text-white text-[10px] font-bold uppercase tracking-widest group-hover:text-[#c5a059]">{t}</h4>
                </div>
              ))}
            </div>
          </div>
        );
      case 20:
        return (
          <div className="max-w-4xl mx-auto pt-20">
            <div className="bg-zinc-950 border border-zinc-900 p-12 text-center shadow-2xl">
              <h2 className="text-2xl font-bold tracking-[0.5em] mb-4 uppercase" style={{ color: GOLD }}>AGENT GROK</h2>
              <div className="bg-zinc-900/50 p-8 border-l-4 border-[#c5a059] text-[13px] text-zinc-300 italic mb-10 text-left leading-relaxed">
                "I am Agent Grok. Your cinema environment is stabilized. How shall we direct your vision today?"
              </div>
              <div className="flex gap-4">
                <input type="text" placeholder="Consult Grok..." className="flex-1 bg-black border border-zinc-800 p-5 text-sm outline-none focus:border-[#c5a059]" />
                <button className="px-12 py-5 font-bold uppercase tracking-widest text-black" style={{ backgroundColor: GOLD }}>Send</button>
              </div>
            </div>
          </div>
        );
      case 21:
        return (
          <div className="max-w-4xl mx-auto pt-10 text-center pb-40">
            <h2 className="text-5xl font-serif tracking-[0.4em] mb-12 uppercase" style={{ color: GOLD }}>That's All Folks</h2>
            <div className="bg-zinc-950 border border-zinc-900 p-12 text-left text-xs leading-loose text-zinc-500 uppercase tracking-widest">
              <p className="mb-8">MandaStrong Studio supports veterans' mental health and anti-bullying initiatives. A portion of every dollar goes directly toward these causes.</p>
              <div className="pt-8 border-t border-zinc-900">
                <p className="font-bold text-lg" style={{ color: GOLD }}>— Amanda Strong</p>
                <p>Founder, MandaStrong Studio</p>
                <p className="mt-4 text-white">MandaStrong1.Etsy.com</p>
              </div>
            </div>
            <button onClick={() => setCurrentPage(1)} className="mt-12 px-10 py-4 font-bold border hover:bg-[#c5a059] hover:text-black transition-all" style={{ borderColor: GOLD, color: GOLD }}>Return Home</button>
          </div>
        );
      default:
        return <div className="pt-40 text-center text-zinc-800 uppercase tracking-[0.5em] font-bold italic">Phase {currentPage} Live Integration...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#c5a059] selection:text-black">
      <Header />
      <main className="px-8">{renderContent()}</main>
      <Footer />

      {activeTool && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-8 backdrop-blur-sm">
          <div className="bg-zinc-950 border-2 border-zinc-800 w-full max-w-5xl p-16 relative">
            <button onClick={() => setActiveTool(null)} className="absolute top-8 right-8 text-zinc-500 hover:text-white"><X size={32} /></button>
            <h2 className="text-4xl font-serif tracking-widest mb-10 uppercase" style={{ color: GOLD }}>{activeTool}</h2>
            <div className="grid grid-cols-2 gap-10">
              <div className="border-2 border-dashed border-zinc-900 p-20 text-center font-bold uppercase text-zinc-700 text-xs">Import Source Asset</div>
              <div className="flex flex-col">
                <textarea placeholder="Direct AI Prompting..." className="flex-1 bg-black border border-zinc-800 p-6 text-xs text-white outline-none focus:border-[#c5a059] mb-6 resize-none" />
                <button className="py-4 font-bold bg-[#c5a059] text-black uppercase tracking-widest hover:brightness-110">Execute AI Render</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
