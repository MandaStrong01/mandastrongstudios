import React, { useState } from "react";

// --- THE CINEMATIC PROTOCOLS ---
const GOLD = "#e8c96d";
const GOLDDIM = "#a07820";
const BG = "#000000";
const WHITE = "#d4c9a8";

const STRICT_DOC_LOOK = "STRICT PRODUCTION PROTOCOL: Authentic 4K raw documentary footage, 24fps, cinematic gold and amber color grade, archival 16mm film grain, photorealistic textures.";
const VISUALS_ONLY_MODIFIER = "VISUAL FOCUS ONLY: No dialogue, no script, no screen text. Output ONLY camera, lighting, and visual description.";
const NO_CARTOONS = "NEGATIVE PROMPT: No CGI, no 3D renders, no cartoons, no anime, no fake textures, no video game look.";

// --- STYLING UTILS ---
const G = (v, sm) => ({
  background: v === "gold" ? `linear-gradient(135deg,${GOLDDIM},${GOLD})` : "transparent",
  border: v === "gold" ? "none" : `1px solid ${GOLD}`,
  color: v === "gold" ? "#000" : GOLD,
  borderRadius: 0, fontWeight: 900, padding: sm ? "5px 14px" : "10px 26px", fontSize: sm ? 11 : 13,
  cursor: "pointer", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Rajdhani',sans-serif",
});

const Sp = { minHeight: "100vh", background: BG, color: WHITE, fontFamily: "'Rajdhani',sans-serif", paddingBottom: 100 };
const H1 = { fontFamily: "'Cinzel',serif", color: GOLD, letterSpacing: 5, textTransform: "uppercase", margin: 0 };

export default function App() {
  const [page, setPage] = useState(1);
  const [describe, setDescribe] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [visualsOnly, setVisualsOnly] = useState(false); // THE TOGGLE STATE

  const go = p => { setPage(p); window.scrollTo(0, 0); setResult(""); setDescribe(""); };

  const runAI = async () => {
    if (!describe.trim()) return;
    setLoading(true);
    try {
      // Logic: If on Page 8 and Toggle is ON, apply the Visuals Only Protocol
      const finalPrompt = (page === 8 && visualsOnly) 
        ? `${STRICT_DOC_LOOK} ${VISUALS_ONLY_MODIFIER} USER REQUEST: ${describe}` 
        : describe;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "anthropic-dangerous-direct-browser-access": "true", 
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY || "" 
        },
        body: JSON.stringify({ 
          model: "claude-sonnet-4-20250514", 
          max_tokens: 1500, 
          system: NO_CARTOONS, 
          messages: [{ role: "user", content: finalPrompt }] 
        })
      });
      const d = await res.json();
      setResult(d.content[0].text);
    } catch (e) { 
      setResult("Error — Please check your API Key."); 
    }
    setLoading(false);
  };

  const renderPage = () => {
    switch(page) {
      case 1:
        return (
          <div style={{ ...Sp, textAlign: "center", paddingTop: "20vh" }}>
            <h1 style={{ ...H1, fontSize: 50 }}>MANDA STRONG STUDIO</h1>
            <button onClick={() => go(8)} style={{ ...G("gold", false), marginTop: 40 }}>ENTER VIDEO GENERATION</button>
          </div>
        );
      case 8:
        return (
          <div style={Sp}>
            <h1 style={{ ...H1, padding: 25 }}>VIDEO GENERATION</h1>
            <div style={{ padding: "0 25px" }}>
              <textarea 
                value={describe} 
                onChange={e => setDescribe(e.target.value)} 
                placeholder="Paste your 90-minute script segment here for cinematic processing..." 
                style={{ width: "100%", height: 260, background: "#000", color: WHITE, border: `1px solid ${GOLDDIM}`, padding: 15, outline: "none", fontFamily: "'Rajdhani',sans-serif", fontSize: 16 }} 
              />
              
              {/* THE TOGGLE ROW */}
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 20 }}>
                <button 
                  onClick={runAI} 
                  style={{ ...G("gold", false), flex: "none", width: 280 }} 
                  disabled={loading}
                >
                  {loading ? "PRODUCING..." : "GENERATE VIDEO CLIP"}
                </button>

                <label style={{ display: "flex", alignItems: "center", gap: 10, color: GOLD, cursor: "pointer", fontFamily: "'Rajdhani',sans-serif", fontWeight: 900, textTransform: "uppercase" }}>
                  <input 
                    type="checkbox" 
                    checked={visualsOnly} 
                    onChange={() => setVisualsOnly(!visualsOnly)} 
                    style={{ width: 22, height: 22, accentColor: GOLD, cursor: "pointer" }} 
                  />
                  Visuals Only
                </label>
              </div>

              {result && (
                <textarea 
                  value={result} 
                  readOnly 
                  style={{ width: "100%", height: 300, marginTop: 25, background: "#0a0a0a", color: GOLD, border: `1px solid ${GOLDDIM}`, padding: 15, fontFamily: "'Rajdhani',sans-serif" }} 
                />
              )}
            </div>
          </div>
        );
      default:
        return <div style={Sp}><button onClick={() => go(1)} style={G("out", true)}>Return Home</button></div>;
    }
  };

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      {renderPage()}
      
      {/* NAVIGATION FOOTER */}
      <footer style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#000", borderTop: `1px solid ${GOLD}`, padding: 15, textAlign: "center", display: "flex", justifyContent: "center", gap: 20 }}>
        <button onClick={() => go(1)} style={G("out", true)}>HOME</button>
        <button onClick={() => go(8)} style={G(page === 8 ? "gold" : "out", true)}>VIDEO GENERATION</button>
      </footer>
    </div>
  );
}