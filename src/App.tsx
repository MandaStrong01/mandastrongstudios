import { useState, useRef, useEffect } from "react";

const GOLD = "#e8c96d";
const GOLDDIM = "#a07820";
const BG = "#000000";
const BG4 = "#080808";
const WHITE = "#d4c9a8";
const DIM = "#aaaaaa";
const TOTAL = 23;

// THE AUTHENTICITY ENGINE: FORCING REAL-WORLD DOCUMENTARY QUALITY
const STRICT_DOC_LOOK = "STRICT PRODUCTION PROTOCOL: Generate content as Authentic 4K raw documentary footage, 24fps, cinematic gold and amber color grade, archival 16mm film grain, photorealistic textures, National Geographic style.";
const VISUALS_ONLY_MODIFIER = "VISUAL FOCUS ONLY: Ignore all requests for scripts, audio notes, or screen text. Output ONLY the cinematic visual description and technical camera settings.";
const NO_CARTOONS = "NEGATIVE PROMPT: No CGI, no 3D renders, no cartoons, no anime, no fake textures, no video game look, no digital art artifacts, no text on screen.";

const STRIPE = {
  basic: "https://buy.stripe.com/test_basic",
  pro: "https://buy.stripe.com/test_pro",
  studio: "https://buy.stripe.com/test_studio",
};

const G = (v, sm) => ({
  background: v === "gold" ? `linear-gradient(135deg,${GOLDDIM},${GOLD})` : "transparent",
  border: v === "gold" ? "none" : `1px solid ${GOLD}`,
  color: v === "gold" ? "#000" : GOLD,
  borderRadius: 0,
  fontWeight: 900,
  padding: sm ? "5px 14px" : "10px 26px",
  fontSize: sm ? 11 : 13,
  cursor: "pointer",
  letterSpacing: 2,
  textTransform: "uppercase",
  fontFamily: "'Rajdhani',sans-serif",
});
const Sp = { minHeight: "100vh", background: BG, color: WHITE, fontFamily: "'Rajdhani',sans-serif", paddingBottom: 100 };
const H1 = { fontFamily: "'Cinzel',serif", color: GOLD, letterSpacing: 5, textTransform: "uppercase", margin: 0 };
const Card = (x) => ({ background: "#0a0a0a", border: `1px solid ${GOLDDIM}`, borderRadius: 0, padding: 18, ...(x || {}) });

const STOCK_VOICES = [
  { id: "james", name: "James", emoji: "🎩", sex: "Male", accent: "British RP", category: "British", tone: "Sarcastic · Deadpan · Witty", pitch: 0.86, rate: 0.62, desc: "Dry as dust. Delivers the uncomfortable truth with a straight face and perfect timing. Built for satire and dark comedy." },
  { id: "aurora", name: "Aurora", emoji: "🌅", sex: "Female", accent: "British RP", category: "British", tone: "Warm · Measured · Documentary", pitch: 1.08, rate: 0.80, desc: "Calm, authoritative and quietly emotional. The voice you trust completely." },
];

const VOICE_TOOLS = ["Text to Voice", "Text to Speech", "Text to Narration", "Text to Audiobook", "Text to Voiceover", "AI Voice Actor", "Neural Voice Generator", "Emotion Voice Synth", "Documentary Voice", "Trailer Voice Generator", "Commercial Voice", "Character Voice Creator", "Audiobook Creator", "Podcast Voice"];

// --- SPEECH ENGINE LOGIC ---
let VOICE_ASSIGNMENTS = {};
try { VOICE_ASSIGNMENTS = JSON.parse(localStorage.getItem("ms_voice_assign") || "{}"); } catch { }
const VOICE_PARAMS = Object.fromEntries(STOCK_VOICES.map(v => [v.id, { pitch: v.pitch || 1.0, rate: v.rate || 0.9, volume: 1.0 }]));

function pickVoice(voiceId, allVoices) {
  const assignedName = VOICE_ASSIGNMENTS[voiceId];
  if (assignedName) return allVoices.find(v => v.name === assignedName) || null;
  return allVoices.find(x => x.lang.startsWith("en")) || allVoices[0];
}

function speakText(voiceId, txt, onStart, onEnd) {
  if (!txt) return;
  window.speechSynthesis.cancel();
  const doSpeak = () => {
    const allVoices = window.speechSynthesis.getVoices();
    const voice = pickVoice(voiceId, allVoices);
    const params = VOICE_PARAMS[voiceId] || { pitch: 1.0, rate: 0.9 };
    const utt = new SpeechSynthesisUtterance(txt);
    utt.pitch = params.pitch; utt.rate = params.rate;
    if (voice) utt.voice = voice;
    utt.onstart = onStart;
    utt.onend = onEnd;
    window.speechSynthesis.speak(utt);
  };
  if (window.speechSynthesis.getVoices().length > 0) doSpeak();
  else window.speechSynthesis.onvoiceschanged = doSpeak;
}

// --- TOOL DEFINITIONS ---
const WRITING = ["Script to Movie", "Text to Script", "Script to Screenplay", "Prompt to Story", "Feature Film Script", "Documentary Script", "Plot Generator", "Dialogue Generator", "Narration Writer"];
const IMAGE_T = ["Text to Image", "Prompt to Image", "Image Generator", "AI Art Generator", "Face Generator", "Character Design", "Portrait Generator"];
const VIDEO_T = ["Text to Video", "Image to Video", "AI Video Creator", "AI Film Generator", "Video Upscaler", "Animation Creator"];
const MOTION = ["AI 8K Upscaling", "Video Super Resolution", "Frame Interpolation", "Video Denoiser", "Color Grading AI"];
const NAV = [{ p: 1, l: "Home" }, { p: 4, l: "Login" }, { p: 5, l: "Writing" }, { p: 6, l: "Voice" }, { p: 7, l: "Image" }, { p: 8, l: "Video" }, { p: 11, l: "Upload" }, { p: 13, l: "Timeline" }, { p: 21, l: "Agent Grok" }, { p: 23, l: "Finale" }];

function QAMenu({ go, onClose, user }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex" }}>
      <div style={{ width: 256, background: "#050505", borderRight: `1px solid ${GOLD}`, height: "100vh", padding: 18, overflowY: "auto" }}>
        <h3 style={{ color: GOLD, fontFamily: "'Cinzel',serif" }}>QUICK ACCESS</h3>
        {NAV.map(i => (
          <button key={i.p} onClick={() => { go(i.p); onClose(); }} style={{ width: "100%", textAlign: "left", background: "none", border: "none", color: WHITE, padding: 10, cursor: "pointer" }}>
            {i.l.toUpperCase()}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, background: "rgba(0,0,0,0.7)" }} onClick={onClose} />
    </div>
  );
}

function Header({ go, setMenu }) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 500, background: "#000", borderBottom: `1px solid ${GOLD}`, padding: "0 16px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <button onClick={() => setMenu(true)} style={{ background: "none", border: `1px solid ${GOLD}`, color: GOLD, width: 34, height: 34 }}>☰</button>
      <div onClick={() => go(1)} style={{ cursor: "pointer", textAlign: "center" }}>
        <div style={{ fontFamily: "'Cinzel',serif", color: GOLD, fontSize: 13, fontWeight: 900 }}>MANDA STRONG STUDIO</div>
      </div>
      <div onClick={() => go(21)} style={{ width: 36, height: 36, background: GOLD, color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, cursor: "pointer" }}>G</div>
    </header>
  );
}

function Footer({ page, go, onSave }) {
  return (
    <footer style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#000", borderTop: `1px solid ${GOLD}`, padding: 10, textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
        <button onClick={() => go(Math.max(1, page - 1))} style={G("out", true)}>BACK</button>
        <span style={{ color: GOLD }}>PAGE {page} / {TOTAL}</span>
        <button onClick={() => go(Math.min(TOTAL, page + 1))} style={G("gold", true)}>NEXT</button>
        <button onClick={onSave} style={G("out", true)}>SAVE</button>
      </div>
    </footer>
  );
}

function ToolPanel({ tool, onClose, onSave }) {
  const isVideoTool = VIDEO_T.includes(tool);
  const isImageTool = IMAGE_T.includes(tool);
  const [describe, setDescribe] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [visualsOnly, setVisualsOnly] = useState(false);

  const runAI = async () => {
    if (!describe.trim()) return;
    setLoading(true);
    try {
      let finalPrompt = describe;
      let systemRules = "You are a professional cinema expert at MandaStrong Studio.";
      
      if (isVideoTool || isImageTool) {
        // Apply Visuals Only logic if checked
        const protocol = visualsOnly ? `${STRICT_DOC_LOOK} ${VISUALS_ONLY_MODIFIER}` : STRICT_DOC_LOOK;
        finalPrompt = `${protocol} USER REQUEST: ${describe}`;
        systemRules = `${systemRules} ${NO_CARTOONS} Ensure documentary quality.`;
      }

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "anthropic-dangerous-direct-browser-access": "true", "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY || "" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1500,
          system: systemRules,
          messages: [{ role: "user", content: finalPrompt }]
        })
      });
      const d = await res.json();
      setResult(d.content[0].text);
    } catch (e) { setResult("Error generating content."); }
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 900, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "min(600px,95vw)", background: "#050505", border: `1px solid ${GOLD}`, padding: 26, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h2 style={H1}>{tool}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: GOLD, fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>
        
        <textarea value={describe} onChange={e => setDescribe(e.target.value)} style={{ width: "100%", height: 100, background: "#000", color: "#fff", border: `1px solid ${GOLDDIM}`, marginTop: 10, padding: 10, boxSizing: "border-box" }} placeholder="Describe your vision..." />
        
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <button onClick={runAI} style={{ ...G("gold", false), flex: 2 }}>
            {loading ? "GENERATING REAL STUFF..." : isVideoTool ? "GENERATE VIDEO CLIP" : "AI CREATE"}
          </button>
          
          {isVideoTool && (
            <button 
              onClick={() => { setVisualsOnly(!visualsOnly); }} 
              style={{ 
                ...G(visualsOnly ? "gold" : "out", true), 
                flex: 1, 
                border: visualsOnly ? `2px solid ${GOLD}` : `1px solid ${GOLDDIM}`,
                background: visualsOnly ? GOLD : "transparent",
                color: visualsOnly ? "#000" : GOLD
              }}
            >
              {visualsOnly ? "✓ VISUALS ONLY" : "VISUALS ONLY"}
            </button>
          )}
        </div>

        {result && (
          <div style={{ marginTop: 15 }}>
            <div style={{ color: GOLD, fontSize: 11, marginBottom: 5, fontWeight: 900 }}>PRODUCTION PACKAGE:</div>
            <textarea value={result} readOnly style={{ width: "100%", height: 200, background: "#111", color: WHITE, border: `1px solid ${GOLDDIM}`, padding: 10, boxSizing: "border-box", fontSize: 13, lineHeight: 1.5 }} />
          </div>
        )}
        
        <button onClick={onClose} style={{ ...G("out", true), width: "100%", marginTop: 15 }}>CLOSE WORKSTATION</button>
      </div>
    </div>
  );
}

function ToolPage({ title, tools, onSave }) {
  const [open, setOpen] = useState(null);
  return (
    <div style={Sp}>
      <h1 style={{ ...H1, padding: 20 }}>{title}</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10, padding: 20 }}>
        {tools.map(t => <button key={t} onClick={() => setOpen(t)} style={G("out", true)}>{t}</button>)}
      </div>
      {open && <ToolPanel tool={open} onClose={() => setOpen(null)} onSave={onSave} />}
    </div>
  );
}

function P1({ go }) {
  return (
    <div style={{ ...Sp, textAlign: "center", paddingTop: 100 }}>
      <h1 style={{ ...H1, fontSize: 50 }}>MANDA STRONG STUDIO</h1>
      <button onClick={() => go(4)} style={{ ...G("gold", false), marginTop: 40 }}>START PRODUCTION</button>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState(1);
  const [menu, setMenu] = useState(false);
  const [user, setUser] = useState({ name: "Guest", plan: "Guest" });
  const [mediaLib, setMediaLib] = useState([]);
  const [savedNotice, setSavedNotice] = useState(false);

  const go = p => { setPage(p); window.scrollTo(0, 0); };
  const saveProject = () => { setSavedNotice(true); setTimeout(() => setSavedNotice(false), 2000); };

  const pages = {
    1: <P1 go={go} />,
    4: <div style={Sp}><h1>Login</h1><button onClick={() => go(5)} style={G("gold", false)}>LOGIN</button></div>,
    5: <ToolPage title="WRITING TOOLS" tools={WRITING} onSave={a => setMediaLib(p => [...p, a])} />,
    6: <div style={Sp}><h1>Voice Tools</h1></div>,
    7: <ToolPage title="IMAGE TOOLS" tools={IMAGE_T} onSave={a => setMediaLib(p => [...p, a])} />,
    8: <ToolPage title="VIDEO TOOLS" tools={VIDEO_T} onSave={a => setMediaLib(p => [...p, a])} />,
    11: <div style={Sp}><h1>Upload Media</h1></div>,
    13: <div style={Sp}><h1>Timeline Editor</h1></div>,
    21: <div style={Sp}><h1>Agent Grok</h1></div>,
    23: <div style={Sp}><h1>That's All Folks</h1></div>,
  };

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;900&family=Rajdhani:wght@400;700;900&display=swap" rel="stylesheet" />
      <Header go={go} setMenu={() => setMenu(!menu)} />
      {menu && <QAMenu go={go} onClose={() => setMenu(false)} user={user} />}
      {savedNotice && <div style={{ position: "fixed", top: 60, left: "50%", transform: "translateX(-50%)", background: GOLD, color: "#000", padding: "10px 24px", fontWeight: 900 }}>✓ PROJECT SAVED</div>}
      <div style={{ minHeight: "calc(100vh - 116px)" }}>{pages[page] || <P1 go={go} />}</div>
      <Footer page={page} go={go} onSave={saveProject} />
    </div>
  );
}