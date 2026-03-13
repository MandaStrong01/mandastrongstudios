import React, { useState, useEffect } from 'react';

const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  purple: '#4B0082'
};

export default function App() {
  const [page, setPage] = useState(0);
  const [isLive, setIsLive] = useState(false);

  // Fixed Render Activation
  useEffect(() => {
    setIsLive(true);
    const timer = setTimeout(() => setPage(1), 800);
    return () => clearTimeout(timer);
  }, []);

  const goTo = (p: number) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  if (!isLive) return <div className="bg-black h-screen" />;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30">
      <style>{`
        @keyframes fadeUp { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
      `}</style>

      <main className="min-h-screen">
        {/* Initialization */}
        {page === 0 && (
          <div className="h-screen flex items-center justify-center">
            <h2 className="tracking-[1em] text-purple-500 uppercase text-[10px] animate-pulse">
              SYSTEM ONLINE
            </h2>
          </div>
        )}

        {/* Page 1: Main Studio Hub (Matches Image) */}
        {page === 1 && (
          <div className="h-screen flex flex-col items-center justify-center relative fade-up">
            <header className="absolute top-8 w-full px-10 flex justify-between items-center text-[10px] tracking-[0.4em] uppercase opacity-60">
              <div>CINEMA INTELLIGENCE PLATFORM – EST. 2026</div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]"></span>
                ONLINE
              </div>
            </header>
            
            <h1 className="text-[100px] md:text-[180px] font-black leading-[0.85] tracking-tighter text-center uppercase select-none">
              MANDA<br />STRONG<br />STUDIO
            </h1>

            <footer className="absolute bottom-24 w-full flex flex-col items-center gap-6">
              <div className="flex gap-8 text-[10px] tracking-[0.3em] uppercase opacity-70">
                <span>600+ AI TOOLS</span><span>•</span><span>8K EXPORT</span><span>•</span><span>UP TO 3-HOUR FILMS</span>
              </div>
              <button 
                onClick={() => goTo(2)} 
                className="bg-purple-600 px-16 py-4 rounded-full font-black uppercase text-sm hover:bg-purple-500 transition-all"
              >
                Start Creating
              </button>
            </footer>
          </div>
        )}

        {/* Page 3: Subscription Plans */}
        {page === 3 && (
          <div className="p-20 max-w-7xl mx-auto fade-up text-center">
            <h2 className="text-6xl font-black mb-16 uppercase">PLANS</h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              {[
                {t:'Basic', p:'20', f:['HD Export','100 AI Tools']},
                {t:'Pro', p:'30', f:['4K Export','300 AI Tools']},
                {t:'Studio', p:'50', f:['8K Export','600 AI Tools','Free Trial']}
              ].map((plan) => (
                <div key={plan.t} className="bg-zinc-950 border border-zinc-800 p-10 rounded-3xl hover:border-purple-500 transition-all">
                  <h3 className="text-2xl font-black uppercase mb-2">{plan.t}</h3>
                  <div className="text-5xl font-black text-purple-500 mb-8">${plan.p}</div>
                  <ul className="space-y-4 mb-10 opacity-70">
                    {plan.f.map(f => <li key={f} className="text-sm font-bold">• {f}</li>)}
                  </ul>
                  <button className="w-full py-4 bg-purple-600 rounded-xl font-black uppercase">Select</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Page 21: Finale */}
        {page === 21 && (
          <div className="h-screen flex flex-col items-center justify-center p-10 fade-up">
            <p className="text-purple-400 tracking-[0.5em] uppercase text-xs mb-8">Final Build Complete</p>
            <a href="https://MandaStrong1.Etsy.com" className="text-white border-b border-white/20 pb-2 uppercase font-black text-xl">
              Visit MandaStrong1 on Etsy
            </a>
          </div>
        )}

        {/* Dynamic Navigation */}
        {page > 1 && (
          <div className="fixed bottom-10 left-0 w-full flex justify-center gap-10 z-[100]">
            <button onClick={() => setPage(page - 1)} className="px-10 py-3 border border-white/20 hover:bg-white/5 uppercase tracking-widest text-[10px] font-black">Back</button>
            <button onClick={() => setPage(page + 1)} className="px-10 py-3 bg-purple-600 hover:bg-purple-500 uppercase tracking-widest text-[10px] font-black">Next</button>
          </div>
        )}
      </main>
    </div>
  );
}