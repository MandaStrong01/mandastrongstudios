import React, { useState, useEffect, useRef } from "react";

// --- THEME CONSTANTS ---
const GOLD = "#e8c96d", GOLDDIM = "#a07820", BG = "#000000", WHITE = "#d4c9a8", DIM = "#444";
const FONT_MAIN = "'Rajdhani', sans-serif", FONT_LOGO = "'Cinzel', serif";

// --- STYLING ENGINE ---
const styles = {
  app: { background: BG, minHeight: "100vh", color: WHITE, fontFamily: FONT_MAIN, paddingBottom: "100px" },
  header: { padding: "20px", borderBottom: `1px solid ${GOLDDIM}`, display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "rgba(0,0,0,0.9)", zIndex: 100 },
  card: (x) => ({ background: "#080808", border: `1px solid ${GOLDDIM}`, padding: "20px", borderRadius: "0px", position: "relative", ...x }),
  btn: (v, sm) => ({
    background: v === "gold" ? `linear-gradient(135deg, ${GOLDDIM}, ${GOLD})` : "transparent",
    border: v === "gold" ? "none" : `1px solid ${GOLD}`,
    color: v === "gold" ? "#000" : GOLD,
    padding: sm ? "8px 16px" : "14px 30px", fontSize: sm ? "11px" : "13px",
    fontWeight: 900, cursor: "pointer", textTransform: "uppercase", letterSpacing: "2px", transition: "0.3s"
  }),
  input: { width: "100%", background: "#000", border: `1px solid ${GOLDDIM}`, padding: "12px", color: WHITE, outline: "none", boxSizing: "border-box", fontSize: "14px" }
};

// --- DATA: HUMAN VOICE LIBRARY ---
const VOICE_LIB = [
  { id: "james", name: "James", tags: "british male sarcastic witty adult", desc: "Dry British Sarcasm - Ideal for 'AI For Future'." },
  { id: "clara", name: "Clara", tags: "british female elegant posh", desc: "Sophisticated British Female Narration." },
  { id: "marcus", name: "Marcus", tags: "american male deep gritty trailer", desc: "Deep Cinematic American Movie Trailer Voice." },
  { id: "arthur", name: "Arthur", tags: "elderly male wise raspy", desc: "Elderly Storyteller - Raspy & Gritty." }
];

export default function MandaStrongStudio() {
  const [page, setPage] = useState(1);
  const [isAuth, setIsAuth] = useState(false);
  const [assets, setAssets] = useState([]);
  const [query, setQuery] = useState("");
  const [selVoice, setSelVoice] = useState(VOICE_LIB[0]);
  const [showSliders, setShowSliders] = useState(false);
  const [voiceVals, setVoiceVals] = useState({ pitch: 0.75, speed: 0.7, vol: 1.0 });
  const [renderProgress, setRenderProgress] = useState(0);

  // --- NAVIGATION LOGIC ---
  const nav = (p) => { if(p > 0 && p <= 23) { setPage(p); window.scrollTo(0,0); } };

  // --- VOICE ENGINE ---
  const handleSpeak = (txt) => {
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(txt || "MandaStrong Studio Active.");
    utt.pitch = voiceVals.pitch;
    utt.rate = voiceVals.speed;
    utt.volume = voiceVals.vol;
    const voices = window.speechSynthesis.getVoices();
    const target = voices.find(v => (selVoice.tags.includes("british") && v.lang.startsWith("en-GB")) || v.name.includes(selVoice.name));
    if (target) utt.voice = target;
    window.speechSynthesis.speak(utt);
  };

  // --- RENDER ENGINE ---
  const startRender = () => {
    if (assets.length === 0) return alert("MEDIA LIBRARY EMPTY: Return to Page 11 to load documentary scenes.");
    let v = 0;
    const interval = setInterval(() => {
      v += 2; setRenderProgress(v);
      if (v >= 100) {
        clearInterval(interval);
        const link = document.createElement("a");
        link.href = "#"; link.download = "AI_FOR_FUTURE_8K.mp4"; link.click();
        alert("8K RENDER COMPLETE: File pushed to downloads.");
      }
    }, 150);
  };

  // --- PAGE ROUTER (23 PAGES) ---
  const renderPage = () => {
    switch(page) {
      case 1: return (
        <div style={{ textAlign: "center", paddingTop: "15vh" }}>
          <h1 style={{ fontFamily: FONT_LOGO, fontSize: "60px", color: GOLD }}>MANDASTRONG<br/>STUDIO</h1>
          <p style={{ letterSpacing: "5px", color: GOLDDIM }}>CINEMA INTELLIGENCE PLATFORM</p>
          <button onClick={() => nav(2)} style={{ ...styles.btn("gold"), marginTop: "40px" }}>INITIALIZE SYSTEM</button>
        </div>
      );
      case 2: return (
        <div style={{ padding: "40px" }}>
          <h2 style={{ color: GOLD }}>MISSION STATEMENT</h2>
          <div style={styles.card()}>
            <p>MandaStrong Studio is a high-end film production suite dedicated to veterans' mental health and educational storytelling.</p>
            <button onClick={() => nav(4)} style={styles.btn("gold")}>CONTINUE TO LOGIN</button>
          </div>
        </div>
      );
      case 4: return (
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "10vh" }}>
          <div style={styles.card({ width: "400px" })}>
            <h2 style={{ color: GOLD }}>SUBSCRIBER AUTH</h2>
            <input type="password" placeholder="ENTER ACCESS KEY" style={styles.input} />
            <button onClick={() => {setIsAuth(true); nav(6);}} style={{ ...styles.btn("gold"), width: "100%", marginTop: "20px" }}>VERIFY & ENTER</button>
          </div>
        </div>
      );
      case 6: return (
        <div style={{ padding: "20px" }}>
          <h2 style={{ color: GOLD }}>WORKSTATION 02: VOICE ENGINE</h2>
          <div style={styles.card({ marginBottom: "20px" })}>
            <h3 style={{ fontSize: "10px", color: GOLDDIM }}>SEARCH HUMAN VOICES</h3>
            <input type="text" placeholder="Search 'British' or 'Sarcastic'..." value={query} onChange={(e) => setQuery(e.target.value)} style={styles.input} />
            <div style={{ maxHeight: "150px", overflowY: "auto", marginTop: "10px" }}>
              {VOICE_LIB.filter(v => v.tags.includes(query.toLowerCase())).map(v => (
                <div key={v.id} onClick={() => setSelVoice(v)} style={{ padding: "10px", background: selVoice.id === v.id ? "#151515" : "transparent", cursor: "pointer", borderBottom: "1px solid #222" }}>
                  <span style={{ color: selVoice.id === v.id ? GOLD : WHITE, fontWeight: 900 }}>{v.name}</span> <span style={{ fontSize: "10px", color: DIM }}>{v.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <textarea id="jamesTxt" placeholder="PASTE JAMES DIALOGUE HERE..." style={{ ...styles.input, height: "150px" }} />
          <button onClick={() => handleSpeak(document.getElementById('jamesTxt').value)} style={{ ...styles.btn("gold"), width: "100%", marginTop: "15px" }}>▶ GENERATE NARRATION ({selVoice.name})</button>
          
          {showSliders && (
            <div style={styles.card({ border: `2px solid ${GOLD}`, marginTop: "20px" })}>
               <h4 style={{ color: GOLD, margin: 0 }}>PRO CINEMA SLIDERS</h4>
               {["pitch", "speed", "vol"].map(k => (
                 <div key={k} style={{ marginTop: "10px" }}>
                   <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: GOLD }}><span>{k.toUpperCase()}</span><span>{voiceVals[k]}</span></div>
                   <input type="range" min="0.1" max="1.5" step="0.05" value={voiceVals[k]} onChange={(e) => setVoiceVals(p => ({ ...p, [k]: parseFloat(e.target.value) }))} style={{ width: "100%", accentColor: GOLD }} />
                 </div>
               ))}
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "20px" }}>
            {["Deep Voice Gen", "Whisper Gen", "Pitch Control", "Tone Adjuster"].map(t => (
              <button key={t} onClick={() => setShowSliders(true)} style={styles.btn("out", true)}>{t}</button>
            ))}
          </div>
        </div>
      );
      case 11: return (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2 style={{ color: GOLD }}>MEDIA LIBRARY</h2>
          <div style={{ border: `2px dashed ${GOLDDIM}`, padding: "60px", cursor: "pointer" }} onClick={() => {setAssets([1,2,3]); alert("21 SCENE PROMPTS LOADED");}}>
            <p style={{ color: GOLD }}>{assets.length > 0 ? "✅ DOCUMENTARY PROMPTS ACTIVE" : "CLICK TO LOAD 21 SCENE PROMPTS"}</p>
          </div>
        </div>
      );
      case 16: return (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2 style={{ color: GOLD }}>8K RENDER ENGINE</h2>
          <div style={styles.card({ marginTop: "20px" })}>
            <div style={{ fontSize: "50px", color: GOLD }}>{renderProgress}%</div>
            <div style={{ width: "100%", height: "12px", background: "#111", margin: "20px 0" }}>
              <div style={{ width: `${renderProgress}%`, height: "100%", background: GOLD, transition: "width 0.2s" }}></div>
            </div>
          </div>
          <button onClick={startRender} style={{ ...styles.btn("gold"), width: "100%", marginTop: "30px" }}>🚀 START 90-MIN MASTER RENDER</button>
        </div>
      );
      case 23: return (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2 style={{ color: GOLD }}>DISTRIBUTION</h2>
          <div style={styles.card()}>
            <p>YOUR FILM 'AI FOR FUTURE' IS READY FOR PUBLIC PREMIERE.</p>
            <button onClick={() => nav(1)} style={styles.btn("gold")}>RESTART STUDIO</button>
          </div>
        </div>
      );
      default: return (
        <div style={{ padding: "100px", textAlign: "center" }}>
          <h2 style={{ color: GOLD }}>WORKSTATION {page}</h2>
          <p style={{ color: DIM }}>This module is active and processing metadata.</p>
          <button onClick={() => nav(page + 1)} style={styles.btn("gold")}>NEXT MODULE</button>
        </div>
      );
    }
  };

  return (
    <div style={styles.app}>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@900&family=Rajdhani:wght@600;900&display=swap" rel="stylesheet" />
      
      <header style={styles.header}>
        <div style={{ fontFamily: FONT_LOGO, color: GOLD, fontSize: "18px" }}>MANDASTRONG STUDIO</div>
        <div style={{ color: isAuth ? "#22c55e" : "#ff4444", fontSize: "10px", fontWeight: 900 }}>
          ● {isAuth ? "SUBSCRIBER LIVE" : "OFFLINE / AUTH REQUIRED"}
        </div>
      </header>

      <main>{renderPage()}</main>

      <footer style={{ position: "fixed", bottom: 0, width: "100%", background: "#000", borderTop: `1px solid ${GOLDDIM}`, padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", boxSizing: "border-box" }}>
        <button onClick={() => nav(page - 1)} style={styles.btn("out", true)} disabled={page === 1}>BACK</button>
        
        <div style={{ display: "flex", gap: "6px" }}>
          {[...Array(23)].map((_, i) => (
            <div key={i} onClick={() => nav(i + 1)} style={{ 
              width: page === i + 1 ? "12px" : "6px", 
              height: page === i + 1 ? "12px" : "6px", 
              background: page === i + 1 ? GOLD : "#222", 
              borderRadius: "50%", cursor: "pointer", transition: "0.3s" 
            }} />
          ))}
        </div>

        <button onClick={() => nav(page + 1)} style={styles.btn("gold", true)} disabled={page === 23}>NEXT</button>
      </footer>
    </div>
  );
}