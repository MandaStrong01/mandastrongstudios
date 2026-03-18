<div className="max-w-4xl mx-auto pt-20 text-center">
            <h2 className="text-4xl font-serif tracking-widest uppercase mb-6" style={{ color: GOLD }}>8K Render Engine</h2>
            <p className="text-zinc-500 text-xs tracking-widest uppercase mb-12 italic">Final Cinema Output Optimization</p>
            <div className="bg-zinc-950 border border-zinc-900 p-20 flex flex-col items-center shadow-2xl relative overflow-hidden">
               {isRendering ? (
                 <div className="space-y-6 w-full max-w-sm">
                   <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                     <div className="h-full bg-[#c5a059] animate-progress shadow-[0_0_10px_#c5a059]"></div>
                   </div>
                   <p className="text-[10px] text-[#c5a059] uppercase tracking-widest font-bold">Rendering 8K Master Sequence...</p>
                 </div>
               ) : (
                 <button onClick={() => setIsRendering(true)} className="px-12 py-5 font-bold uppercase tracking-widest text-black shadow-[0_0_30px_rgba(197,160,89,0.2)]" style={{ backgroundColor: GOLD }}>Start 8K Render</button>
               )}
            </div>
          </div>
        );

      case 20: // AGENT GROK
        return (
          <div className="max-w-4xl mx-auto pt-20">
            <div className="bg-zinc-950 border border-zinc-900 p-14 text-center shadow-2xl">
              <div className="w-20 h-20 border-2 border-[#c5a059] rounded-full mx-auto flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(197,160,89,0.2)]">
                <div className="
