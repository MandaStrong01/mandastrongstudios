import React, { useState } from 'react';
import { Play, Video, Heart, HelpCircle } from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, 21));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-black text-[#D4AF37] flex flex-col font-serif">
      {/* Header - Per Image 1 */}
      <header className="border-b border-[#D4AF37] p-6 text-center">
        <h1 className="text-4xl font-bold tracking-widest uppercase mb-2">Manda Strong Studio</h1>
        <p className="text-[10px] tracking-[0.2em] uppercase">600+ AI TOOLS • 8K EXPORT • UP TO 3-HOUR FILMS</p>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {currentPage === 1 && (
          <div className="text-center">
            <h2 className="text-6xl font-bold mb-12 tracking-tighter uppercase">Manda Strong Studio</h2>
            <div className="border-[3px] border-[#D4AF37] w-48 h-48 flex items-center justify-center mx-auto mb-10">
              <span className="text-8xl">G</span>
            </div>
            <button onClick={nextPage} className="bg-[#D4AF37] text-black px-10 py-3 font-bold uppercase flex items-center gap-2 mx-auto">
              Start Creating <Play size={18} fill="black" />
            </button>
          </div>
        )}

        {currentPage === 2 && (
          <div className="grid grid-cols-3 gap-6 w-full max-w-5xl">
            {[ {n: 'Creator', p: 20}, {n: 'Pro', p: 30}, {n: 'Studio', p: 50} ].map((plan, i) => (
              <div key={i} className={`border ${i === 2 ? 'border-4' : 'border'} border-[#D4AF37] p-8 text-center bg-black`}>
                <h3 className="text-xl font-bold uppercase mb-4">{plan.n} Plan</h3>
                <p className="text-4xl font-bold mb-6">${plan.p} <span className="text-sm">Monthly</span></p>
                <button className={`w-full py-3 font-bold uppercase border border-[#D4AF37] ${i >= 1 ? 'bg-[#D4AF37] text-black' : ''}`}>
                  {i === 2 ? 'Start Free Trial' : 'Subscribe Now'}
                </button>
              </div>
            ))}
          </div>
        )}

        {currentPage === 3 && (
          <div className="w-full max-w-6xl text-center">
            <h2 className="text-xl font-bold mb-8 uppercase tracking-widest">Examples Made By MandaStrong Studio</h2>
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map((v) => (
                <div key={v} className="border border-[#D4AF37] aspect-video bg-[#0a0a0a] flex flex-col items-center justify-center p-6">
                  <Video size={40} className="mb-4 opacity-50" />
                  <div className="border border-dashed border-[#D4AF37] w-full py-2 text-[10px] uppercase">Upload Film</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Workstations 4-17 map to your grid images */}
        {currentPage >= 4 && currentPage <= 17 && (
           <div className="grid grid-cols-4 gap-3 w-full max-w-6xl">
             {[...Array(24)].map((_, i) => (
               <div key={i} className="border border-[#D4AF37] p-3 text-[9px] uppercase flex justify-between items-center bg-[#0a0a0a]">
                 <span>AI Tool Module</span>
                 <div className="flex gap-1">
                   <span className="border border-[#D4AF37] px-1">UP</span>
                   <span className="border border-[#D4AF37] px-1">AI+</span>
                 </div>
               </div>
             ))}
           </div>
        )}

        {currentPage === 21 && (
          <div className="w-full max-w-4xl text-center">
            <video className="w-full border border-[#D4AF37] mb-6" autoPlay muted loop>
              <source src="/thatsallfolks.mp4" type="video/mp4" />
            </button>
            <h2 className="text-4xl font-bold mb-4 italic">That's All Folks!</h2>
            <p className="text-xs uppercase leading-loose border border-[#D4AF37] p-6">
              Supporting Our Heroes: All Etsy Store proceeds benefit Veterans Mental Health Services.
            </p>
          </div>
        )}
      </main>

      <footer className="border-t border-[#D4AF37] p-6 text-center bg-black">
        <div className="flex justify-center items-center gap-8 mb-4">
          <button onClick={prevPage} className="border border-[#D4AF37] px-6 py-1 uppercase text-xs">Back</button>
          <span className="text-[10px] uppercase tracking-widest">Page {currentPage} / 21</span>
          <button onClick={nextPage} className="border border-[#D4AF37] px-6 py-1 uppercase text-xs">Next</button>
        </div>
        <p className="text-[10px] uppercase tracking-widest">Author Of Doxy The School Bully | MandaStrong1.Etsy.com</p>
      </footer>
    </div>
  );
};

export default App;
