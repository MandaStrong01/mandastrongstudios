import React, { useState, useEffect } from 'react';
import { Play, Video, Heart, HelpCircle, Shield, CreditCard, Users } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);

  // Stripe Success Redirect Logic
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('session_id')) {
      setCurrentPage(3); // Land on Dashboard after payment
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const next = () => setCurrentPage((p) => Math.min(p + 1, 21));
  const back = () => setCurrentPage((p) => Math.max(p - 1, 1));

  return (
    <div className="min-h-screen bg-black text-[#D4AF37] flex flex-col font-serif selection:bg-[#D4AF37] selection:text-black">
      {/* 100% Match Header */}
      <header className="border-b border-[#D4AF37] p-6 text-center bg-black sticky top-0 z-50">
        <h1 className="text-3xl md:text-5xl font-bold tracking-[0.2em] uppercase mb-2">Manda Strong Studio</h1>
        <p className="text-[10px] tracking-[0.3em] uppercase opacity-80">600+ AI TOOLS • 8K EXPORT • 3-HOUR FILMS</p>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-8">
        {currentPage === 1 && (
          <div className="text-center animate-in fade-in duration-700">
            <div className="border-[4px] border-[#D4AF37] w-40 h-40 md:w-56 md:h-56 flex items-center justify-center mx-auto mb-12 bg-black">
              <span className="text-8xl md:text-9xl font-bold">G</span>
            </div>
            <button onClick={next} className="bg-[#D4AF37] text-black px-12 py-4 text-xl font-bold uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-3 mx-auto">
              Start Creating <Play size={24} fill="black" />
            </button>
          </div>
        )}

        {currentPage === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
            {[ {name: 'Creator', price: 20}, {name: 'Pro', price: 30}, {name: 'Studio', price: 50} ].map((plan, i) => (
              <div key={i} className={`border ${i === 2 ? 'border-[5px]' : 'border'} border-[#D4AF37] p-10 text-center bg-black transition-all hover:bg-[#0a0a0a]`}>
                <h3 className="text-2xl font-bold uppercase mb-6">{plan.name} Plan</h3>
                <p className="text-5xl font-bold mb-8">${plan.price} <span className="text-sm block opacity-70">Monthly</span></p>
                <button className={`w-full py-4 font-bold uppercase border-2 border-[#D4AF37] tracking-widest ${i >= 1 ? 'bg-[#D4AF37] text-black' : 'hover:bg-[#D4AF37] hover:text-black'}`}>
                  {i === 2 ? 'Start Free Trial' : 'Subscribe Now'}
                </button>
              </div>
            ))}
          </div>
        )}

        {currentPage === 3 && (
          <div className="w-full max-w-6xl text-center">
            <h2 className="text-2xl font-bold mb-12 uppercase tracking-[0.4em]">Examples Made By MandaStrong Studio</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((v) => (
                <div key={v} className="border-2 border-[#D4AF37] aspect-video bg-[#050505] flex flex-col items-center justify-center p-8 group cursor-pointer hover:border-white transition-colors">
                  <Video size={56} className="mb-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                  <div className="border border-dashed border-[#D4AF37] w-full py-3 text-xs uppercase tracking-widest">Upload Film</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 21 && (
          <div className="w-full max-w-4xl text-center animate-in zoom-in duration-500">
            <div className="border-2 border-[#D4AF37] mb-8 bg-black aspect-video flex items-center justify-center relative overflow-hidden">
               <video className="absolute inset-0 w-full h-full object-cover opacity-80" autoPlay muted loop>
                 <source src="/thatsallfolks.mp4" type="video/mp4" />
               </video>
               <div className="relative z-10 bg-black/60 p-4 border border-[#D4AF37] uppercase tracking-[0.5em] font-bold">Playing: thatsallfolks.mp4</div>
            </div>
            <h2 className="text-5xl font-bold mb-6 italic tracking-tight">That's All Folks!</h2>
            <div className="border-2 border-[#D4AF37] p-10 bg-black space-y-6">
              <p className="text-sm uppercase leading-relaxed tracking-wider">
                Storytelling should have no gatekeepers. Thank you for being part of this mission.
              </p>
              <div className="h-[1px] bg-[#D4AF37] w-1/2 mx-auto"></div>
              <p className="font-bold text-lg tracking-widest uppercase">Supporting Our Heroes</p>
              <p className="text-[11px] uppercase opacity-80">All Etsy Store proceeds benefit Veterans Mental Health Services.</p>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-[#D4AF37] p-8 text-center bg-black">
        <div className="flex justify-center items-center gap-12 mb-6">
          <button onClick={back} className="border-2 border-[#D4AF37] px-8 py-2 uppercase text-xs font-bold hover:bg-[#D4AF37] hover:text-black transition-colors">Back</button>
          <span className="text-xs uppercase tracking-[0.3em] font-bold">Page {currentPage} / 21</span>
          <button onClick={next} className="border-2 border-[#D4AF37] px-8 py-2 uppercase text-xs font-bold hover:bg-[#D4AF37] hover:text-black transition-colors">Next</button>
        </div>
        <div className="space-y-2 opacity-90">
          <p className="text-xs uppercase tracking-widest font-bold text-white">Author Of Doxy The School Bully</p>
          <p className="text-[10px] uppercase tracking-[0.2em] italic text-[#D4AF37]">MandaStrong1.Etsy.com</p>
        </div>
      </footer>
    </div>
  );
}
