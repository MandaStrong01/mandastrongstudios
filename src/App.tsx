import { useState, useRef, useEffect } from "react";

const GOLD = "#d4a847";
const GOLDDIM = "#8a6d22";
const BG = "#0d0f12";
const BG2 = "#141820";
const BG3 = "#1c2333";
const WHITE = "#ffffff";
const TEXT2 = "#cccccc";
const TEXT3 = "#999999";
const TOTAL = 23;
const SPARKLE = () => (<div style={{ position:"fixed", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${GOLD},transparent)`, zIndex:300, animation:"sparkle 1.5s ease-in-out infinite", pointerEvents:"none" }}><style>{`@keyframes sparkle{0%,100%{opacity:.3}50%{opacity:1}}`}</style></div>);

const STRIPE = {
  basic:  "https://buy.stripe.com/test_basic",
  pro:    "https://buy.stripe.com/test_pro",
  studio: "https://buy.stripe.com/test_studio",
};

const Sbtn = (v, sm) => ({
  background: v==="gold" ? `linear-gradient(135deg,${GOLDDIM},${GOLD})` : "transparent",
  border: v==="gold" ? "none" : `1px solid ${GOLDDIM}`,
  color: v==="gold" ? "#000" : GOLD,
  borderRadius:4, fontWeight:800,
  padding: sm ? "5px 12px" : "10px 22px",
  fontSize: sm ? 11 : 13,
  cursor:"pointer", letterSpacing:1, textTransform:"uppercase",
});
const Spage = { minHeight:"100vh", background:BG, color:WHITE, fontFamily:"'Barlow Condensed','Rajdhani',sans-serif", paddingBottom:70 };
const Sh1 = { fontFamily:"'Cinzel',serif", color:GOLD, letterSpacing:4, textTransform:"uppercase", margin:0 };
const Scard = (extra) => ({ background:BG3, border:`2px solid ${GOLDDIM}66`, borderRadius:4, padding:20, ...(extra||{}) });

const WRITING = ["Script to Movie","Text to Script","Story to Script","Prompt to Story","Script to Screenplay","Feature Film Script","Short Film Script","TV Pilot Script","Documentary Script","Commercial Script","Explainer Script","YouTube Script","Podcast Script","Social Media Script","Plot Generator","Story Outline","Three Act Structure","Five Act Structure","Beat Sheet Builder","Character Bio Writer","Character Arc Builder","Subplot Generator","Plot Twist Generator","Opening Hook Creator","Climax Designer","Logline Generator","Synopsis Writer","Treatment Writer","Scene Writer","Text to Dialogue","Dialogue Generator","Narration Writer","Voiceover Script","Interview Script","Action Line Writer","Scene Heading Tool","Parenthetical Generator","Script Formatter","Dialogue Tightener","Script Timer","Word Counter","Page Counter","Reading Time Estimator","Format Checker","Grammar Polish","Spell Checker","Continuity Checker","Plot Hole Detector","Tone Checker","Genre Classifier"];
const VOICE = ["Upload Own Voice","Record My Voice","Clone My Voice","Text to Voice","Text to Speech","Text to Narration","Text to Audiobook","Text to Voiceover","Voice Cloning","Voice to Voice","AI Voice Actor","Neural Voice Generator","Emotion Voice Synth","Trailer Voice Generator","Documentary Voice","Commercial Voice","Character Voice Creator","Accent Generator","Multi Language Voice","Voice Translator","Lip Sync AI","Dialogue Synth","Audiobook Creator","Podcast Voice","Radio DJ Voice","Sports Commentary Voice","ASMR Creator","Whisper Generator","Meditation Voice","Alien Voice","Deep Voice Generator","Robot Voice","Monster Voice","Child Voice","Elderly Voice","Male to Female Voice","Female to Male Voice","Speed Controller","Tone Adjuster","Pitch Controller","Volume Normalizer","Clarity Booster","Voice Denoiser","Echo Remover","Reverb Remover","Background Noise Remover","Voice EQ Studio"];
const IMAGE_T = ["Text to Image","Prompt to Image","Image to Image","Image Upscaler","Image Generator","AI Art Generator","Photo to Painting","Sketch to Image","Wireframe to Image","Background Generator","Background Remover","Sky Replacer","Object Remover","Face Generator","Character Design","Portrait Generator","Avatar Creator","Product Image Generator","Architecture Visualizer","Interior Design Generator","Landscape Generator","Abstract Art Generator","Logo Generator","Icon Creator","Texture Generator","Pattern Maker","Color Palette Generator","Style Transfer","Photo Enhancer","Photo Restorer","Old Photo Colorizer","Black & White to Color","Image Denoiser","Sharpness Enhancer","Clarity Booster","Detail Enhancer","HDR Image Creator","Exposure Fixer","White Balance AI","Color Grading Studio","LUT Creator","Tone Mapper","Contrast Adjuster","Brightness Tool","Saturation Engine","Hue Shift","Temperature Control","Vignette Tool"];
const VIDEO_T = ["Text to Video","Image to Video","Video to Video","AI Video Creator","AI Film Generator","Video Upscaler","AI Video Generator 4K","Set to Video","Video Colorizer","Color Grading Pro","Fast Look Generator","Film Restoration","Time Lapse Creator","Video Trimmer","Background Remover","Digital Human Video","Rotoscope Video","Animation Creator","Puppet Animator","Motion Capture","Character Animator","Video Stabilizer","Video Compressor","Cinematic LUT","Black & White Film","Film Texture","VHS Effect","Glitch Effect","Quick Film Creator","Opening Slate","Time Freeze","Bullet Time Effect","Rain Simulation","Snow Simulation","Smoke Generator","Fire Simulation","Particle System","AI Progressive Video","4K Upscaling"];
const MOTION = ["AI 8K Upscaling","AI 4K Upscaling","Video Super Resolution","Frame Interpolation","Video Denoiser","Noise Reduction","Grain Remover","Artifact Remover","Scratch Remover","Video Sharpener","Clarity Booster","Detail Enhancer","Edge Enhancement","Texture Boost","White Balance AI","Color Correction","Auto Color Balance","Color Match Pro","Color Grading AI","Cinematic Color Grade","Film Stock Emulation","LUT Generator","Tone Mapping Pro","HDR Enhancement","Deep HDR Boost","Dynamic Range Expansion","Shadow Recovery","Highlight Recovery","Black Point Calibration","Gamma Correction","Contrast Enhancer","Brightness Optimizer","Saturation Booster","Smart Saturation","Face Enhancement","Face Retouch","Eye Enhancer","Teeth Whitener","Skin Tone Enhancer","Background Enhancer","Sky Enhancer","Landscape Enhancer","Night Video Enhancer","Low Light Clarity","Motion Stabilization","Shake Remover","Rolling Shutter Fix"];

const NAV_PAGES = [
  {p:1,l:"Home"},{p:2,l:"Platform"},{p:3,l:"Examples"},
  {p:4,l:"Login / Pricing"},{p:5,l:"Writing Tools"},{p:6,l:"Voice Tools"},
  {p:7,l:"Image Tools"},{p:8,l:"Video Tools"},{p:9,l:"Motion & VFX"},
  {p:10,l:"Enhancement"},{p:11,l:"Upload Media"},{p:12,l:"Editor Suite"},
  {p:13,l:"Timeline Editor"},{p:14,l:"Enhancement Studio"},{p:15,l:"Audio Mixer"},
  {p:16,l:"Render Engine"},{p:17,l:"Film Preview"},{p:18,l:"Export & Distribute"},
  {p:19,l:"Tutorials"},{p:20,l:"Terms & Disclaimer"},{p:21,l:"Agent Grok"},
  {p:22,l:"Community Hub"},{p:23,l:"That's All Folks"},
];

function QuickAccessMenu({ go, onClose, user }) {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, display:"flex" }}>
      <div style={{ width:260, background:BG2, borderRight:`2px solid ${GOLD}`, height:"100vh", overflowY:"auto", padding:20, boxShadow:`4px 0 40px ${GOLD}44` }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <span style={{ fontFamily:"'Cinzel',serif", color:GOLD, fontSize:14, fontWeight:900, letterSpacing:2 }}>QUICK ACCESS</span>
          <button onClick={onClose} style={{ background:"none", border:"none", color:GOLD, fontSize:22, cursor:"pointer" }}>✕</button>
        </div>
        <div style={{ background:`linear-gradient(135deg,${GOLDDIM},${GOLD})`, borderRadius:4, padding:"10px 14px", marginBottom:8, textAlign:"center" }}>
          <div style={{ color:"#000", fontWeight:900, fontSize:11, letterSpacing:2 }}>MANDA STRONG STUDIO</div>
          <div style={{ color:"#000", fontSize:10 }}>Cinema Intelligence Platform 2026</div>
        </div>
        {user && user.plan && (
          <div style={{ background:BG3, border:`1px solid ${GOLDDIM}`, borderRadius:4, padding:"8px 12px", marginBottom:12, textAlign:"center" }}>
            <div style={{ color:WHITE, fontSize:9, letterSpacing:1 }}>CURRENT PLAN</div>
            <div style={{ color:GOLD, fontWeight:800, fontSize:15 }}>{user.plan}</div>
          </div>
        )}
        {NAV_PAGES.map(i => (
          <button key={i.p} onClick={() => { go(i.p); onClose(); }}
            style={{ width:"100%", textAlign:"left", background:"none", border:"none", color:WHITE, padding:"9px 10px", borderRadius:4, cursor:"pointer", fontSize:13, fontWeight:700, display:"block", marginBottom:1 }}
            onMouseEnter={e => { e.currentTarget.style.background = BG3; e.currentTarget.style.color = GOLD; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = WHITE; }}>
            {i.p}. {i.l}
          </button>
        ))}
      </div>
      <div style={{ flex:1, background:"rgba(0,0,0,0.65)" }} onClick={onClose} />
    </div>
  );
}

function Header({ page, go, setMenuOpen, user }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  useEffect(() => {
    const handler = e => { e.preventDefault(); setDeferredPrompt(e); };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);
  const installApp = async () => {
    if (deferredPrompt) { deferredPrompt.prompt(); await deferredPrompt.userChoice; setDeferredPrompt(null); }
    else alert("To install:\n📱 Mobile: Share → Add to Home Screen\n💻 Desktop: Click ⊕ in address bar");
  };
  return (
    <header style={{ position:"sticky", top:0, zIndex:500, background:BG2, borderBottom:`2px solid ${GOLD}`, padding:"0 14px", height:56, display:"flex", alignItems:"center", gap:10, boxShadow:`0 2px 24px ${GOLDDIM}33` }}>
      <button onClick={() => setMenuOpen(true)} style={{ background:"none", border:`1px solid ${GOLDDIM}`, color:GOLD, borderRadius:4, width:36, height:36, cursor:"pointer", fontSize:18, flexShrink:0 }}>☰</button>
      <div onClick={() => go(1)} style={{ cursor:"pointer", flexShrink:0 }}>
        <div style={{ fontFamily:"'Cinzel',serif", color:GOLD, fontSize:14, fontWeight:900, letterSpacing:2, lineHeight:1 }}>MANDA STRONG</div>
        <div style={{ fontFamily:"'Cinzel',serif", color:GOLD, fontSize:10, letterSpacing:4 }}>STUDIO</div>
      </div>
      <div style={{ flex:1, overflow:"hidden", margin:"0 8px" }}>
        <div style={{ color:WHITE, fontSize:10, letterSpacing:1, whiteSpace:"nowrap", {animation:"ticker 22s linear infinite", color:"#999999" }}>
          ✦ Special Offer: New Studio Plan Subscribers Receive 7-Day Free Trial &nbsp;·&nbsp; 600+ AI TOOLS &nbsp;·&nbsp; 8K EXPORT &nbsp;·&nbsp; UP TO 3-HOUR FILMS &nbsp;·&nbsp; PROFESSIONAL CINEMA SYNTHESIS &nbsp;·&nbsp; ✦ Special Offer: New Studio Plan Subscribers Receive 7-Day Free Trial &nbsp;·&nbsp; 600+ AI TOOLS &nbsp;·&nbsp; 8K EXPORT &nbsp;·&nbsp;
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
        <div style={{ color:"#22c55e", fontSize:12, letterSpacing:2, fontWeight:800 }}>● SYSTEM ONLINE</div>
        <div onClick={() => go(21)} style={{ width:40, height:40, background:`linear-gradient(135deg,${GOLDDIM},${GOLD})`, borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontFamily:"'Cinzel',serif", fontSize:22, fontWeight:900, color:"#000", boxShadow:`0 0 12px ${GOLD}66` }}>G</div>
      </div>
      <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </header>
  );
}

function Footer({ page, go }) {
  return (
    <footer style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:400, background:BG2, borderTop:`1px solid ${GOLDDIM}44`, padding:"7px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <span style={{ color:GOLD, fontSize:11, letterSpacing:1, fontWeight:700 }}>MANDASTRONG STUDIO 2026 · PROFESSIONAL CINEMA SYNTHESIS · MandaStrong1.Etsy.com</span>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <button onClick={() => go(Math.max(1, page-1))} disabled={page===1} style={{ ...Sbtn("out", true), opacity:page===1?0.3:1 }}>◀ BACK</button>
        <span style={{ color:GOLD, fontSize:11, fontWeight:700 }}>PAGE {page} / {TOTAL}</span>
        <button onClick={() => go(Math.min(TOTAL, page+1))} disabled={page===TOTAL} style={{ ...Sbtn("gold", true), opacity:page===TOTAL?0.3:1 }}>NEXT ▶</button>
      </div>
      <span style={{ color:"#22c55e", fontSize:11, fontWeight:700 }}>● AUTOSAVE ON</span>
    </footer>
  );
}

function ToolCard({ name }) {
  const fileRef = useRef(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const doAI = async () => {
    setLoading(true); setResult("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json", "anthropic-dangerous-direct-browser-access":"true" },
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:400,
          messages:[{ role:"user", content:`MandaStrong Studio AI tool: "${name}". Generate a short professional cinematic result sample.` }] })
      });
      const d = await res.json();
      setResult(d.content && d.content[0] ? d.content[0].text : "Generated!");
    } catch(e) { setResult("AI ready — add API key to activate."); }
    setLoading(false);
  };
  return (
    <div style={{ background:BG2, border:`1px solid ${GOLDDIM}44`, borderRadius:4, padding:"11px 10px", display:"flex", flexDirection:"column", gap:7, transition:"border-color .2s" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = GOLDDIM}
      onMouseLeave={e => e.currentTarget.style.borderColor = `${GOLDDIM}22`}>
      <span style={{ color:WHITE, fontSize:12, fontWeight:800 }}>{name}</span>
      <div style={{ display:"flex", gap:4 }}>
        <button onClick={() => fileRef.current && fileRef.current.click()} style={{ fontSize:9, padding:"3px 7px", background:BG3, border:`2px solid ${GOLDDIM}66`, color:WHITE, borderRadius:4, cursor:"pointer", fontWeight:700, letterSpacing:1 }}>UPLOAD</button>
        <button style={{ fontSize:9, padding:"3px 7px", background:BG3, border:`2px solid ${GOLDDIM}66`, color:WHITE, borderRadius:4, cursor:"pointer", fontWeight:700, letterSpacing:1 }}>PASTE</button>
        <button onClick={doAI} style={{ fontSize:9, padding:"3px 8px", background:GOLDDIM, border:`1px solid ${GOLD}`, color:"#000", borderRadius:4, cursor:"pointer", fontWeight:900 }}>{loading ? "..." : "AI ✦"}</button>
      </div>
      {result && <div style={{ color:"#aed6f1", fontSize:10, lineHeight:1.5, borderLeft:`2px solid ${GOLDDIM}`, paddingLeft:6 }}>{result.slice(0,100)}...</div>}
      <input ref={fileRef} type="file" style={{ display:"none" }} />
    </div>
  );
}

function ToolPage({ title, subtitle, tools }) {
  const [search, setSearch] = useState("");
  const filtered = tools.filter(t => t.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{ ...Spage }}>
      <div style={{ padding:"16px 20px 10px", borderBottom:`1px solid ${GOLDDIM}22`, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
        <div>
          <div style={{ fontSize:10, color:GOLD, letterSpacing:3, fontWeight:700 }}>{subtitle}</div>
          <h1 style={{ ...Sh1, fontSize:26, margin:0 }}>{title}</h1>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ position:"relative" }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${tools.length} tools...`}
              style={{ background:BG3, border:`1px solid ${GOLDDIM}`, borderRadius:4, padding:"7px 12px 7px 30px", color:WHITE, fontSize:12, outline:"none", width:200 }} />
            <span style={{ position:"absolute", left:9, top:"50%", transform:"translateY(-50%)", color:GOLD, fontSize:13 }}>🔍</span>
            {search && <button onClick={() => setSearch("")} style={{ position:"absolute", right:7, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:GOLD, cursor:"pointer", padding:0 }}>✕</button>}
          </div>
          <span style={{ color:WHITE, fontSize:11, fontWeight:700 }}>{filtered.length} TOOLS</span>
        </div>
      </div>
      <div style={{ padding:14, display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:8 }}>
        {filtered.map(t => <ToolCard key={t} name={t} />)}
      </div>
    </div>
  );
}

function P1({ go }) {
  return (
    <div style={{ ...Spage }}>
      <div style={{ background:"linear-gradient(180deg,#000408 0%,#0d0f12 100%)", padding:"56px 40px 36px", textAlign:"center", borderBottom:`2px solid ${GOLD}`, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
          {[...Array(60)].map((_,i) => (
            <div key={i} style={{ position:"absolute", width:i%3===0?2:1, height:i%3===0?2:1, background:GOLD, borderRadius:"50%", opacity:0.3+i%3*0.2, left:`${(i*17+7)%100}%`, top:`${(i*13+11)%100}%`, animation:`twinkle ${1.5+i%3}s ease-in-out ${i%4*0.5}s infinite` }} />
          ))}
        </div>
        <style>{`@keyframes twinkle{0%,100%{opacity:.15}50%{opacity:.9}}`}</style>
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ fontSize:9, color:TEXT3, letterSpacing:5, marginBottom:10 }}>CINEMA INTELLIGENCE PLATFORM · COMPETITION EDITION 2026</div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:"clamp(32px,6vw,52px)", fontWeight:900, color:GOLD, letterSpacing:6, lineHeight:1.1, textShadow:`0 0 60px ${GOLD}cc, 0 0 120px ${GOLD}55` }}>MANDA STRONG</div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:"clamp(32px,6vw,52px)", fontWeight:900, color:GOLD, letterSpacing:6, lineHeight:1.1, textShadow:`0 0 60px ${GOLD}cc, 0 0 120px ${GOLD}55`, marginBottom:10 }}>STUDIO</div>
          <div style={{ color:WHITE, fontSize:12, letterSpacing:2, marginBottom:20, fontWeight:700 }}>600+ AI TOOLS · 8K EXPORT · UP TO 3-HOUR FILMS</div>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => go(4)} style={{ ...Sbtn("gold", false), fontSize:15, padding:"14px 36px" }}>▶ START CREATING</button>
            <button onClick={() => go(4)} style={{ ...Sbtn("out", false), fontSize:15, padding:"14px 36px" }}>LOGIN / REGISTER</button>
          </div>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, padding:"24px 32px", maxWidth:860, margin:"0 auto" }}>
        {[["600+","AI Tools Across 6 Categories"],["8K","Cinema-Grade Export"],["3 HOURS","Maximum Film Duration"],["1TB","Cloud Storage Studio Plan"]].map(([v,l]) => (
          <div key={v} style={{ ...Scard(), textAlign:"center" }}>
            <div style={{ color:GOLD, fontFamily:"'Cinzel',serif", fontSize:26, fontWeight:900 }}>{v}</div>
            <div style={{ color:WHITE, fontSize:11, marginTop:4, fontWeight:600 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign:"center", padding:"0 32px 20px" }}>
        <button onClick={() => alert("To install MandaStrong Studio:\n📱 Mobile: Tap Share → Add to Home Screen\n💻 Desktop: Click ⊕ in your browser address bar")} style={{ ...Sbtn("out", true), fontSize:11 }}>⬇ Download As App</button>
      </div>
      <div style={{ background:BG3, borderTop:`1px solid ${GOLDDIM}22`, borderBottom:`1px solid ${GOLDDIM}22`, padding:"7px 0", overflow:"hidden" }}>
        <div style={{ whiteSpace:"nowrap", animation:"ticker 28s linear infinite", color:WHITE, fontSize:10, letterSpacing:1 }}>
          &nbsp;&nbsp;🎬 Special Offer: New Studio Plan Subscribers Receive 7-Day Free Trial &nbsp;·&nbsp; Professional AI Movie Creation Platform &nbsp;·&nbsp; MandaStrong1.Etsy.com &nbsp;·&nbsp; 600+ Tools &nbsp;·&nbsp; 8K Cinema Export &nbsp;·&nbsp; 🎬 Special Offer: New Studio Plan Subscribers Receive 7-Day Free Trial &nbsp;·&nbsp; Professional AI Movie Creation Platform &nbsp;·&nbsp;
        </div>
      </div>
    </div>
  );
}

function P2({ go }) {
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <div style={{ fontSize:10, color:GOLD, letterSpacing:3, marginBottom:6, fontWeight:700 }}>AI CREATOR PLATFORM</div>
        <h1 style={{ ...Sh1, fontSize:32, marginBottom:12 }}>MAKE AWESOME FAMILY MOVIES<br/>OR TURN YOUR DREAMS INTO REALITY</h1>
        <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, maxWidth:700, marginBottom:28 }}>MandaStrong Studio combines the power of 600+ professional AI tools with an intuitive cinematic workspace — so anyone can create stunning short films, family videos, or feature-length productions up to 3 hours long. No film school required.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
          {[["600+","AI Tools"],["8K","Export Quality"],["3 HOURS","Max Duration"],["1TB","Cloud Storage"]].map(([v,l]) => (
            <div key={v} style={{ ...Scard(), textAlign:"center" }}>
              <div style={{ color:GOLD, fontFamily:"'Cinzel',serif", fontSize:24, fontWeight:900 }}>{v}</div>
              <div style={{ color:WHITE, fontSize:11, marginTop:4, fontWeight:600 }}>{l}</div>
            </div>
          ))}
        </div>
        <button onClick={() => go(4)} style={{ ...Sbtn("gold", false) }}>Start Creating</button>
      </div>
    </div>
  );
}

function P3({ go }) {
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <div style={{ fontSize:10, color:GOLD, letterSpacing:3, marginBottom:6, fontWeight:700 }}>SHOWCASE</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:6 }}>EXAMPLES MADE BY MANDASTRONG STUDIO</h1>
        <div style={{ background:"#7f1d1d", border:"1px solid #ef4444", display:"inline-block", borderRadius:4, padding:"3px 10px", color:"#ef4444", fontSize:10, fontWeight:700, marginBottom:24 }}>● ADMIN ACTIVE</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:28 }}>
          {[{s:1,d:"A documentary film — MandaStrong Studio x Doxy"},{s:2,d:"A plain-English guide to artificial intelligence"}].map(f => (
            <div key={f.s} style={{ ...Scard() }}>
              <div style={{ background:"#000", borderRadius:4, height:160, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12, fontSize:40, color:WHITE }}>🎬</div>
              <div style={{ fontSize:9, color:GOLD, letterSpacing:2, fontWeight:700 }}>VIEWER 0{f.s}</div>
              <div style={{ color:WHITE, fontSize:12, marginBottom:12, fontWeight:600 }}>{f.d}</div>
              <button style={{ ...Sbtn("out", true) }}>⬆ UPLOAD FILM</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function P4({ go, setUser }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const inp = { width:"100%", background:BG, border:`1px solid ${GOLDDIM}`, borderRadius:4, padding:"10px 12px", color:WHITE, fontSize:14, marginBottom:10, outline:"none", boxSizing:"border-box" };
  const login = () => {
    if (email === "woolleya129@gmail.com" && pass === "Mangler1970!!") {
      setUser({ name:"Amanda", plan:"Studio", isAdmin:true }); go(5);
    } else {
      setUser({ name: email.split("@")[0] || "Creator", plan:"Creator", isAdmin:false }); go(5);
    }
  };
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:20, marginBottom:40 }}>
          <div style={{ ...Scard() }}>
            <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:6, fontWeight:700 }}>EXISTING USER</div>
            <h2 style={{ ...Sh1, fontSize:20, marginBottom:18 }}>SIGN IN</h2>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" style={inp} />
            <input value={pass} onChange={e => setPass(e.target.value)} type="password" placeholder="Password" style={{ ...inp, marginBottom:16 }} />
            <button onClick={login} style={{ ...Sbtn("gold", false), width:"100%", padding:"13px" }}>SIGN IN TO STUDIO</button>
            <div style={{ textAlign:"center", marginTop:8, color:WHITE, fontSize:10 }}>Secured with 256-bit encryption</div>
          </div>
          <div style={{ ...Scard(), border:"2px solid #22c55e", position:"relative" }}>
            <div style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)", background:"#22c55e", color:"#000", borderRadius:4, padding:"3px 14px", fontSize:10, fontWeight:900, whiteSpace:"nowrap" }}>🎉 7-DAY FREE TRIAL</div>
            <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:6, marginTop:10, fontWeight:700 }}>NEW CREATOR</div>
            <h2 style={{ ...Sh1, fontSize:20, marginBottom:18 }}>CREATE ACCOUNT</h2>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" style={inp} />
            <input value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder="Email address" style={{ ...inp, marginBottom:16 }} />
            <button onClick={() => { setUser({ name: name||"Creator", plan:"Studio Trial", isAdmin:false }); window.open(STRIPE.studio, "_blank"); go(5); }}
              style={{ width:"100%", padding:"13px", background:"#22c55e", border:"none", color:"#000", borderRadius:4, fontWeight:900, fontSize:14, cursor:"pointer", letterSpacing:1 }}>START FREE TRIAL — $0</button>
            <div style={{ textAlign:"center", marginTop:8, color:WHITE, fontSize:10 }}>Studio Plan Free for 7 Days · No Credit Card</div>
          </div>
          <div style={{ ...Scard(), textAlign:"center" }}>
            <div style={{ fontSize:40, marginBottom:10 }}>👁</div>
            <h2 style={{ ...Sh1, fontSize:18, marginBottom:10 }}>EXPLORE FIRST</h2>
            <p style={{ color:WHITE, fontSize:13, lineHeight:1.7, marginBottom:20 }}>Browse all 600+ AI tools and see the full platform before committing. No account required.</p>
            <button onClick={() => { setUser({ name:"Guest", plan:"Guest", isAdmin:false }); go(5); }} style={{ ...Sbtn("out", false), width:"100%" }}>BROWSE AS GUEST</button>
          </div>
        </div>
        <h2 style={{ ...Sh1, fontSize:26, textAlign:"center", marginBottom:24 }}>SUBSCRIPTION PLANS</h2>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:18 }}>
          {[
            {t:"CREATOR PLAN", p:"20", link:STRIPE.basic, f:["HD Export 1080p","100 AI Tools","10GB Storage","Email Support","Basic Timeline"], pop:false, trial:false},
            {t:"PRO PLAN", p:"30", link:STRIPE.pro, f:["4K Export","300 AI Tools","100GB Storage","Priority Support","Full Timeline","Commercial License"], pop:true, trial:false},
            {t:"STUDIO PLAN", p:"50", link:STRIPE.studio, f:["8K Export","600+ AI Tools","1TB Storage","24/7 Support","Full Rights","API Access","Collaboration","7-Day Free Trial"], pop:false, trial:true},
          ].map((plan, i) => (
            <div key={plan.t} style={{ ...Scard(), border: plan.pop ? `2px solid ${GOLD}` : `1px solid ${GOLDDIM}33`, position:"relative" }}>
              {plan.pop && <div style={{ position:"absolute", top:-11, left:"50%", transform:"translateX(-50%)", background:GOLD, color:"#000", borderRadius:4, padding:"2px 12px", fontSize:10, fontWeight:900, whiteSpace:"nowrap" }}>MOST POPULAR</div>}
              {plan.trial && <div style={{ position:"absolute", top:-11, right:12, background:"#22c55e", color:"#000", borderRadius:4, padding:"2px 10px", fontSize:10, fontWeight:900, whiteSpace:"nowrap" }}>🎉 FREE TRIAL</div>}
              <div style={{ color:WHITE, fontSize:10, letterSpacing:2, fontWeight:700 }}>{plan.t}</div>
              <div style={{ color:GOLD, fontFamily:"'Cinzel',serif", fontSize:34, fontWeight:900, margin:"6px 0" }}>${plan.p}<span style={{ fontSize:13, color:WHITE }}>/mo</span></div>
              <div style={{ margin:"12px 0" }}>{plan.f.map(f => <div key={f} style={{ color:WHITE, fontSize:12, padding:"3px 0", borderBottom:`1px solid ${BG}` }}>✓ {f}</div>)}</div>
              <button onClick={() => window.open(plan.link, "_blank")} style={{ ...Sbtn(plan.trial ? "out" : "gold", false), width:"100%" }}>{plan.trial ? "START FREE TRIAL" : "SUBSCRIBE NOW"}</button>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", color:WHITE, fontSize:11, marginTop:14 }}>All plans include a 30-day money-back guarantee · Secure checkout via Stripe</div>
      </div>
    </div>
  );
}

function P11({ mediaLib, setMediaLib }) {
  const fileRef = useRef(null);
  const onFiles = files => {
    if (!files) return;
    const newA = Array.from(files).map(f => ({ id: Date.now()+Math.random(), name:f.name, type:f.type, file:f, url:URL.createObjectURL(f) }));
    setMediaLib(p => [...p, ...newA]);
  };
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div style={{ fontSize:10, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>ASSET INGESTION</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:4 }}>UPLOAD MEDIA</h1>
        <div style={{ color:WHITE, fontSize:14, marginBottom:22, fontWeight:700 }}>{mediaLib.length} ASSETS IN LIBRARY</div>
        <div onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = GOLD; }}
          onDragLeave={e => { e.currentTarget.style.borderColor = GOLDDIM; }}
          onDrop={e => { e.preventDefault(); onFiles(e.dataTransfer.files); e.currentTarget.style.borderColor = GOLDDIM; }}
          onClick={() => fileRef.current && fileRef.current.click()}
          style={{ border:`2px dashed ${GOLDDIM}`, borderRadius:4, padding:"56px 40px", textAlign:"center", cursor:"pointer", marginBottom:18, transition:"border-color .2s" }}>
          <div style={{ fontSize:40, marginBottom:10 }}>🎬</div>
          <div style={{ color:WHITE, fontWeight:800, fontSize:18, letterSpacing:2 }}>DRAG & DROP YOUR MEDIA HERE</div>
          <div style={{ color:WHITE, fontSize:13, marginTop:8 }}>Or click to browse · Video · Audio · Images</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:22 }}>
          {[["📁","BROWSE FILES"],["🖥","RECORD SCREEN"],["🔗","IMPORT FROM URL"]].map(([ic,lb]) => (
            <button key={lb} onClick={() => fileRef.current && fileRef.current.click()}
              style={{ ...Scard(), textAlign:"center", padding:18, cursor:"pointer", display:"block", border:`2px solid ${GOLDDIM}66` }}>
              <div style={{ fontSize:26, marginBottom:6 }}>{ic}</div>
              <div style={{ color:WHITE, fontSize:11, fontWeight:800, letterSpacing:1 }}>{lb}</div>
            </button>
          ))}
        </div>
        {mediaLib.length > 0 && (
          <div>
            <h3 style={{ color:GOLD, fontWeight:900, fontSize:14, letterSpacing:2, marginBottom:10 }}>MEDIA LIBRARY ({mediaLib.length})</h3>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:10 }}>
              {mediaLib.map(a => (
                <div key={a.id} style={{ ...Scard(), padding:10, position:"relative" }}>
                  {a.type.startsWith("video") ? <video src={a.url} style={{ width:"100%", borderRadius:4, marginBottom:6 }} /> :
                   a.type.startsWith("image") ? <img src={a.url} style={{ width:"100%", borderRadius:4, marginBottom:6 }} alt={a.name} /> :
                   <div style={{ height:70, background:BG, borderRadius:4, marginBottom:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>🎵</div>}
                  <div style={{ color:WHITE, fontSize:10, fontWeight:800, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.name}</div>
                  <button onClick={() => setMediaLib(p => p.filter(x => x.id !== a.id))}
                    style={{ position:"absolute", top:6, right:6, background:"#7f1d1d", border:"none", color:"#ef4444", borderRadius:4, width:18, height:18, cursor:"pointer", fontSize:10, padding:0 }}>✕</button>
                </div>
              ))}
            </div>
          </div>
        )}
        <input ref={fileRef} type="file" multiple accept="video/*,audio/*,image/*" onChange={e => onFiles(e.target.files)} style={{ display:"none" }} />
      </div>
    </div>
  );
}

function P12({ go, mediaLib }) {
  const [dur, setDur] = useState(90);
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <div style={{ fontSize:10, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>PRODUCTION HUB</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:4 }}>EDITOR SUITE</h1>
        <div style={{ color:WHITE, fontSize:14, marginBottom:24, fontWeight:600 }}>Your complete post-production workspace.</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:22 }}>
          {[
            {ic:"🗂", t:"MEDIA LIBRARY", d:`${mediaLib.length} assets uploaded`, p:11},
            {ic:"⏱", t:"TIMELINE EDITOR", d:"Multi-track video editing", p:13},
            {ic:"✨", t:"ENHANCEMENT STUDIO", d:"90+ AI enhancement tools", p:14},
            {ic:"🎵", t:"AUDIO MIXER", d:"4-channel professional mixing", p:15},
            {ic:"⚡", t:"RENDER ENGINE", d:"Up to 8K cinema output", p:16},
            {ic:"▶", t:"PREVIEW PLAYER", d:"Full-screen film playback", p:17},
          ].map(c => (
            <button key={c.t} onClick={() => go(c.p)}
              style={{ ...Scard(), textAlign:"left", cursor:"pointer", transition:"border-color .2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = GOLDDIM}
              onMouseLeave={e => e.currentTarget.style.borderColor = `${GOLDDIM}44`}>
              <div style={{ fontSize:30, marginBottom:8 }}>{c.ic}</div>
              <div style={{ color:GOLD, fontWeight:900, fontSize:13, letterSpacing:1 }}>{c.t}</div>
              <div style={{ color:WHITE, fontSize:11, marginTop:4, fontWeight:600 }}>{c.d}</div>
            </button>
          ))}
        </div>
        <div style={{ ...Scard() }}>
          <div style={{ color:GOLD, fontWeight:900, fontSize:12, letterSpacing:2, marginBottom:10 }}>MOVIE DURATION</div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            {[30,60,90,120,180].map(m => <button key={m} onClick={() => setDur(m)} style={{ ...Sbtn(dur===m?"gold":"out", true) }}>{m} MIN</button>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function P13({ go, mediaLib, timeline, setTimeline }) {
  const [tracks, setTracks] = useState(["VIDEO TRACK","AUDIO TRACK","TEXT / TITLES"]);
  const addTrack = () => setTracks(p => [...p, `TRACK ${p.length + 1}`]);
  const addToTrack = (idx, asset) => setTimeline(p => ({ ...p, [idx]: [...(p[idx]||[]), asset] }));
  return (
    <div style={{ ...Spage, padding:20 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14, flexWrap:"wrap", gap:10 }}>
        <div>
          <div style={{ fontSize:9, color:GOLD, letterSpacing:3, fontWeight:700 }}>EDITING WORKSPACE</div>
          <h1 style={{ ...Sh1, fontSize:26, margin:0 }}>TIMELINE EDITOR</h1>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={addTrack} style={{ ...Sbtn("out", true) }}>+ ADD TRACK</button>
          <button onClick={() => go(16)} style={{ ...Sbtn("gold", false) }}>→ RENDER</button>
          <button onClick={() => setTimeline({})} style={{ ...Sbtn("out", true) }}>CLEAR ALL</button>
        </div>
      </div>
      <div style={{ background:"#000", borderRadius:4, height:110, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14, border:`1px solid ${GOLDDIM}44` }}>
        {mediaLib[0] && mediaLib[0].type.startsWith("video") ?
          <video src={mediaLib[0].url} style={{ height:"100%", width:"100%", objectFit:"cover", opacity:.5 }} /> :
          <div style={{ textAlign:"center", color:WHITE }}>
            <div style={{ fontSize:12, letterSpacing:2, marginBottom:8 }}>ADD MEDIA TO SEE PREVIEW</div>
            <button onClick={() => go(11)} style={{ ...Sbtn("out", true) }}>⬆ UPLOAD MEDIA</button>
          </div>}
      </div>
      {tracks.map((tr, idx) => (
        <div key={idx} style={{ marginBottom:10 }}>
          <div style={{ color:GOLD, fontSize:10, letterSpacing:2, marginBottom:4, fontWeight:800 }}>{tr}</div>
          <div onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); const id = e.dataTransfer.getData("assetId"); const a = mediaLib.find(x => String(x.id) === id); if (a) addToTrack(idx, a); }}
            style={{ background:BG3, border:`1px dashed ${GOLDDIM}44`, borderRadius:4, minHeight:46, padding:8, display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
            {(timeline[idx]||[]).map((a, i) => (
              <div key={i} style={{ background:GOLDDIM, borderRadius:4, padding:"4px 10px", fontSize:11, color:"#000", fontWeight:700, display:"flex", alignItems:"center", gap:6 }}>
                {a.name.slice(0,12)}
                <button onClick={() => setTimeline(p => ({ ...p, [idx]: p[idx].filter((_,j) => j!==i) }))}
                  style={{ background:"none", border:"none", color:"#000", cursor:"pointer", fontSize:11, padding:0 }}>✕</button>
              </div>
            ))}
            {!(timeline[idx]||[]).length && <span style={{ color:WHITE, fontSize:11 }}>DROP {tr} CLIPS HERE</span>}
          </div>
        </div>
      ))}
      {mediaLib.length > 0 && (
        <div style={{ marginTop:14 }}>
          <div style={{ color:GOLD, fontSize:10, letterSpacing:2, marginBottom:8, fontWeight:800 }}>DRAG TO TIMELINE:</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {mediaLib.map(a => (
              <div key={a.id} draggable onDragStart={e => e.dataTransfer.setData("assetId", String(a.id))}
                style={{ background:BG3, border:`1px solid ${GOLDDIM}`, borderRadius:4, padding:"5px 12px", cursor:"grab", color:GOLD, fontSize:11, fontWeight:700 }}>
                📎 {a.name.slice(0,14)}
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{ ...Scard(), marginTop:14, display:"flex", alignItems:"center", gap:10 }}>
        {["⏮","⏪","▶","⏩","⏭"].map(c => <button key={c} style={{ ...Sbtn("out", true) }}>{c}</button>)}
        <div style={{ flex:1, height:4, background:BG, borderRadius:2 }}>
          <div style={{ width:"0%", height:"100%", background:GOLD, borderRadius:2 }} />
        </div>
        <span style={{ color:WHITE, fontSize:11, fontWeight:700 }}>00:00 / 90:00</span>
      </div>
    </div>
  );
}

function P14() {
  const tools14 = MOTION.slice(0, 14);
  const [active, setActive] = useState(tools14[0]);
  const [vals, setVals] = useState({ Intensity:75, Clarity:80, Color:70, Brightness:65 });
  return (
    <div style={{ ...Spage, display:"flex" }}>
      <div style={{ width:180, background:BG2, borderRight:`1px solid ${GOLDDIM}22`, overflowY:"auto", padding:10 }}>
        {tools14.map(t => (
          <button key={t} onClick={() => setActive(t)}
            style={{ width:"100%", textAlign:"left", background: t===active ? BG3 : "none", border:"none", color: t===active ? GOLD : WHITE, padding:"8px 10px", borderRadius:4, cursor:"pointer", fontSize:12, fontWeight: t===active ? 900 : 600, marginBottom:2 }}>
            {t}
          </button>
        ))}
      </div>
      <div style={{ flex:1, padding:30 }}>
        <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>ENHANCEMENT STUDIO</div>
        <h2 style={{ ...Sh1, fontSize:24, marginBottom:4 }}>{active.toUpperCase()}</h2>
        <div style={{ color:WHITE, fontSize:13, marginBottom:22, fontWeight:600 }}>Apply AI powered <strong style={{ color:GOLD }}>{active}</strong> to your footage.</div>
        {Object.entries(vals).map(([k,v]) => (
          <div key={k} style={{ marginBottom:18 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <span style={{ color:WHITE, fontSize:13, fontWeight:700 }}>{k}</span>
              <span style={{ color:GOLD, fontSize:13, fontWeight:700 }}>{v}%</span>
            </div>
            <input type="range" min={0} max={100} value={v} onChange={e => setVals(p => ({ ...p, [k]: +e.target.value }))} style={{ width:"100%", accentColor:GOLD }} />
          </div>
        ))}
        <div style={{ display:"flex", gap:12, marginTop:20 }}>
          <button style={{ ...Sbtn("gold", false) }}>APPLY ENHANCEMENT</button>
          <button onClick={() => setVals({ Intensity:75, Clarity:80, Color:70, Brightness:65 })} style={{ ...Sbtn("out", false) }}>RESET</button>
        </div>
      </div>
    </div>
  );
}

function P15() {
  const [lvl, setLvl] = useState({ MUSIC:75, VOICE:60, EFX:50, MASTER:85 });
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>MIXING CONSOLE</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:24 }}>AUDIO MIXER</h1>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:28 }}>
          {Object.entries(lvl).map(([ch, val]) => (
            <div key={ch} style={{ ...Scard(), textAlign:"center", padding:20 }}>
              <div style={{ color:GOLD, fontSize:10, letterSpacing:2, marginBottom:8, fontWeight:800 }}>{ch}</div>
              <div style={{ color:GOLD, fontFamily:"'Cinzel',serif", fontSize:34, fontWeight:900, marginBottom:14 }}>{val}</div>
              <input type="range" min={0} max={100} value={val} onChange={e => setLvl(p => ({ ...p, [ch]: +e.target.value }))} style={{ width:"100%", height:110, accentColor:GOLD }} />
              <div style={{ height:4, background:BG, borderRadius:2, marginTop:10 }}>
                <div style={{ width:`${val}%`, height:"100%", background:`linear-gradient(90deg,${GOLDDIM},${GOLD})`, borderRadius:2 }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={() => setLvl({ MUSIC:75, VOICE:60, EFX:50, MASTER:85 })} style={{ ...Sbtn("out", false) }}>RESET LEVELS</button>
          <button style={{ ...Sbtn("gold", false) }}>SAVE PRESET</button>
        </div>
      </div>
    </div>
  );
}

function P16({ go, timeline, setRendered }) {
  const [quality, setQuality] = useState("8K – 4320p");
  const [format, setFormat] = useState("MP4");
  const [progress, setProgress] = useState(0);
  const [rendering, setRendering] = useState(false);
  const [done, setDone] = useState(false);
  const clipCount = Object.values(timeline||{}).flat().length;
  const startRender = () => {
    if (clipCount === 0) { alert("Add clips to the timeline first!"); return; }
    setRendering(true); setDone(false); setProgress(0);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 7 + 2;
      if (p >= 100) { clearInterval(iv); setProgress(100); setRendering(false); setDone(true); setRendered({ url:"", quality, format, timestamp: new Date().toLocaleString() }); }
      else setProgress(Math.round(p));
    }, 200);
  };
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>FINAL OUTPUT</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:22 }}>RENDER FILM</h1>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:18 }}>
          <div style={{ ...Scard() }}>
            <div style={{ color:GOLD, fontWeight:900, fontSize:11, letterSpacing:2, marginBottom:10 }}>EXPORT QUALITY</div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {["8K – 4320p","4K – 2160p","HD – 1080p","SD – 720p"].map(q => <button key={q} onClick={() => setQuality(q)} style={{ ...Sbtn(quality===q?"gold":"out", true) }}>{q}</button>)}
            </div>
          </div>
          <div style={{ ...Scard() }}>
            <div style={{ color:GOLD, fontWeight:900, fontSize:11, letterSpacing:2, marginBottom:10 }}>FORMAT</div>
            <div style={{ display:"flex", gap:8 }}>
              {["MP4","MOV","AVI","WebM"].map(f => <button key={f} onClick={() => setFormat(f)} style={{ ...Sbtn(format===f?"gold":"out", true) }}>{f}</button>)}
            </div>
          </div>
        </div>
        <div style={{ ...Scard(), display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
          {["⏮","⏪","▶","⏩","⏭"].map(c => <button key={c} style={{ ...Sbtn("out", true) }}>{c}</button>)}
          <div style={{ flex:1, height:4, background:BG, borderRadius:2 }}>
            <div style={{ width:`${progress}%`, height:"100%", background:`linear-gradient(90deg,${GOLDDIM},${GOLD})`, borderRadius:2, transition:"width .3s" }} />
          </div>
          <span style={{ color:WHITE, fontSize:11, fontWeight:700 }}>00:00 / 90:00</span>
        </div>
        {rendering && (
          <div style={{ ...Scard(), marginBottom:14, textAlign:"center" }}>
            <div style={{ color:GOLD, fontWeight:900, fontSize:13, marginBottom:8 }}>RENDERING... {progress}%</div>
            <div style={{ height:8, background:BG, borderRadius:4 }}>
              <div style={{ width:`${progress}%`, height:"100%", background:`linear-gradient(90deg,${GOLDDIM},${GOLD})`, borderRadius:4, transition:"width .3s" }} />
            </div>
          </div>
        )}
        {done && (
          <div style={{ background:"#14532d", border:"1px solid #22c55e", borderRadius:4, padding:16, marginBottom:14, textAlign:"center" }}>
            <div style={{ color:"#22c55e", fontWeight:900, fontSize:14 }}>✓ RENDER COMPLETE — {quality} · {format}</div>
            <button onClick={() => go(17)} style={{ ...Sbtn("out", true), marginTop:10, color:"#22c55e", borderColor:"#22c55e" }}>▶ PREVIEW FILM</button>
          </div>
        )}
        <button onClick={startRender} disabled={rendering}
          style={{ ...Sbtn("gold", false), width:"100%", padding:"15px", fontSize:14, opacity: rendering ? 0.6 : 1 }}>
          {rendering ? `RENDERING... ${progress}%` : `START RENDER — ${quality} · ${format}`}
        </button>
      </div>
    </div>
  );
}

function P17({ go, rendered, mediaLib }) {
  const videoSrc = mediaLib.find(a => a.type.startsWith("video")) ? mediaLib.find(a => a.type.startsWith("video")).url : "";
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:14 }}>FILM PREVIEW</h1>
        <div style={{ background:"#000", borderRadius:4, overflow:"hidden", marginBottom:14, aspectRatio:"16/9", display:"flex", alignItems:"center", justifyContent:"center" }}>
          {videoSrc ?
            <video src={videoSrc} controls style={{ width:"100%", height:"100%" }} /> :
            <div style={{ textAlign:"center", color:WHITE }}>
              <div style={{ fontSize:40, marginBottom:10 }}>🎬</div>
              <div style={{ fontSize:12, letterSpacing:2 }}>NO RENDER AVAILABLE</div>
              <button onClick={() => go(16)} style={{ ...Sbtn("out", true), marginTop:12 }}>GO TO RENDER →</button>
            </div>}
        </div>
        {rendered && <div style={{ ...Scard(), color:WHITE, fontSize:12, fontWeight:700 }}>Rendered: {rendered.quality} · {rendered.format} · {rendered.timestamp}</div>}
        <div style={{ ...Scard(), marginTop:12, display:"flex", alignItems:"center", gap:10 }}>
          {["⏮","⏪","▶","⏩","⏭"].map(c => <button key={c} style={{ ...Sbtn("out", true) }}>{c}</button>)}
          <div style={{ flex:1, height:4, background:BG, borderRadius:2 }} />
          <span style={{ color:WHITE, fontSize:11, fontWeight:700 }}>00:00 / 90:00</span>
        </div>
      </div>
    </div>
  );
}

function P18({ rendered, mediaLib }) {
  const videoSrc = mediaLib.find(a => a.type.startsWith("video")) ? mediaLib.find(a => a.type.startsWith("video")).url : "";
  const download = () => {
    if (!videoSrc) { alert("No film yet — render first!"); return; }
    const a = document.createElement("a"); a.href = videoSrc; a.download = "MandaStrong_Film.mp4"; a.click();
  };
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>DISTRIBUTION</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:14 }}>EXPORT & DISTRIBUTE</h1>
        <div style={{ ...Scard(), marginBottom:18, textAlign:"center", color: rendered ? WHITE : TEXT3, fontWeight:700 }}>
          {rendered ? `✓ Film ready: ${rendered.quality} · ${rendered.format}` : "No film rendered yet — go to Render Engine →"}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:22 }}>
          {[["💾","DOWNLOAD TO DEVICE",download],["💿","SAVE PROJECT FILE",() => {}],["🌐","SHARE TO COMMUNITY HUB",() => {}]].map(([ic,lb,fn]) => (
            <button key={lb} onClick={fn} style={{ ...Scard(), cursor:"pointer", textAlign:"center", padding:18, display:"block", border:`2px solid ${GOLDDIM}66` }}>
              <div style={{ fontSize:26, marginBottom:6 }}>{ic}</div>
              <div style={{ color:WHITE, fontSize:11, fontWeight:800, letterSpacing:1 }}>{lb}</div>
            </button>
          ))}
        </div>
        <div style={{ color:GOLD, fontWeight:900, fontSize:12, letterSpacing:2, marginBottom:12 }}>SHARE DIRECTLY TO SOCIAL MEDIA</div>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          {["YouTube","Instagram","TikTok","X / Twitter","Facebook","LinkedIn","Vimeo","Pinterest","WhatsApp"].map(s => (
            <button key={s} style={{ ...Scard(), padding:"10px 14px", cursor:"pointer" }}>
              <div style={{ color:WHITE, fontSize:11, fontWeight:700 }}>{s}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function P19() {
  const tuts = [
    {n:"01",t:"Getting Started — Platform Overview",d:"8:30",l:"Beginner"},
    {n:"02",t:"Importing & Managing Media Assets",d:"6:15",l:"Beginner"},
    {n:"03",t:"Multi-Track Timeline Editing",d:"12:45",l:"Intermediate"},
    {n:"04",t:"AI Tools — 600+ Features Explained",d:"18:20",l:"Intermediate"},
    {n:"05",t:"Professional Color Grading with AI",d:"22:00",l:"Advanced"},
    {n:"06",t:"Audio Mixing & Sound Design",d:"15:10",l:"Intermediate"},
    {n:"07",t:"AI Enhancement Studio Deep Dive",d:"20:30",l:"Advanced"},
    {n:"08",t:"Render Settings & Export Optimization",d:"8:15",l:"Beginner"},
  ];
  const lc = { Beginner:"#22c55e", Intermediate:"#f59e0b", Advanced:"#ef4444" };
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>LEARNING CENTER</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:22 }}>TUTORIALS</h1>
        {tuts.map(t => (
          <div key={t.n} onClick={() => window.open("https://youtube.com","_blank")}
            style={{ ...Scard(), marginBottom:10, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", transition:"border-color .2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = GOLDDIM}
            onMouseLeave={e => e.currentTarget.style.borderColor = `${GOLDDIM}44`}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <span style={{ fontFamily:"'Cinzel',serif", color:GOLD, fontSize:18, fontWeight:900, minWidth:30 }}>{t.n}</span>
              <div>
                <div style={{ color:WHITE, fontWeight:800, fontSize:14 }}>{t.t}</div>
                <div style={{ color:WHITE, fontSize:11, marginTop:2, fontWeight:600 }}>{t.d} · Opens on YouTube</div>
              </div>
            </div>
            <span style={{ background: lc[t.l]+"22", border:`1px solid ${lc[t.l]}`, color:lc[t.l], borderRadius:4, padding:"3px 10px", fontSize:10, fontWeight:700, flexShrink:0 }}>{t.l.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function P20() {
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>LEGAL</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:4 }}>TERMS OF SERVICE & DISCLAIMER</h1>
        <div style={{ color:WHITE, fontSize:11, marginBottom:22, fontWeight:600 }}>Effective: March 2026 · MandaStrong Studio LLC</div>
        <div style={{ ...Scard(), marginBottom:18 }}>
          <h2 style={{ color:GOLD, fontWeight:900, fontSize:18, marginBottom:12 }}>TERMS OF SERVICE</h2>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, margin:0 }}>By accessing or using MandaStrong Studio, you agree to be legally bound by these Terms of Service. These Terms constitute a binding agreement between you and MandaStrong Studio LLC. Subscriptions bill monthly and auto-renew unless cancelled. All payments processed via Stripe. Studio Plan subscribers receive full commercial rights. You retain ownership of all media you upload. For support contact MandaStrong1.Etsy.com or Agent Grok on Page 21.</p>
        </div>
        <div style={{ ...Scard() }}>
          <h2 style={{ color:GOLD, fontWeight:900, fontSize:18, marginBottom:12 }}>DISCLAIMER</h2>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, margin:0 }}>MandaStrong Studio is provided "as is" without warranties of any kind. To the fullest extent permitted by law, MandaStrong Studio LLC shall not be liable for any indirect or consequential damages. AI-generated content is produced algorithmically — users are solely responsible for reviewing all outputs. A portion of revenue supports veterans' mental health and anti-bullying education.</p>
        </div>
      </div>
    </div>
  );
}

function P21() {
  const [msgs, setMsgs] = useState([{ role:"assistant", content:"Ask me anything about your production." }]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const quickQ = ["How do I export in 8K?","What AI tools do you have?","How does the timeline work?","Tell me about pricing"];
  useEffect(() => { bottomRef.current && bottomRef.current.scrollIntoView({ behavior:"smooth" }); }, [msgs]);
  const send = async () => {
    if (!inp.trim()) return;
    const q = inp.trim(); setInp(""); setLoading(true);
    setMsgs(p => [...p, { role:"user", content:q }]);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json", "anthropic-dangerous-direct-browser-access":"true" },
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:800,
          system:"You are Agent Grok, 24/7 assistant for MandaStrong Studio — a professional cinema AI platform with 600+ tools, 8K export, 3-hour films, plans $20/$30/$50/mo with 7-day free trial. Be helpful and concise.",
          messages: [...msgs.filter(m => m.role !== "system"), { role:"user", content:q }] })
      });
      const d = await r.json();
      setMsgs(p => [...p, { role:"assistant", content: d.content && d.content[0] ? d.content[0].text : "Let me help!" }]);
    } catch(e) { setMsgs(p => [...p, { role:"assistant", content:"Connect API key to activate Agent Grok." }]); }
    setLoading(false);
  };
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:22 }}>
          <div style={{ width:56, height:56, background:`linear-gradient(135deg,${GOLDDIM},${GOLD})`, borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", fontFamily:"'Cinzel',serif", fontSize:28, fontWeight:900, color:"#000" }}>G</div>
          <h1 style={{ ...Sh1, fontSize:26 }}>AGENT GROK</h1>
          <div style={{ color:WHITE, fontSize:10, letterSpacing:2, fontWeight:700 }}>24/7 PRODUCTION SUPPORT</div>
          <div style={{ color:"#22c55e", fontSize:10, letterSpacing:2, marginTop:4 }}>● ONLINE · BUILD 2026.03.15</div>
        </div>
        <div style={{ ...Scard(), height:300, overflowY:"auto", marginBottom:12, display:"flex", flexDirection:"column", gap:10, padding:14 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ padding:"11px 14px", borderRadius:4, background: m.role==="user" ? "rgba(212,168,71,0.1)" : "rgba(26,82,118,0.2)", borderLeft:`3px solid ${m.role==="user" ? GOLDDIM : "#2980b9"}` }}>
              <span style={{ fontSize:9, color:GOLD, display:"block", marginBottom:4, fontWeight:800, letterSpacing:1 }}>{m.role==="user" ? "YOU" : "AGENT GROK"}</span>
              <span style={{ color:WHITE, fontSize:14, lineHeight:1.7 }}>{m.content}</span>
            </div>
          ))}
          {loading && <div style={{ padding:"11px 14px", background:"rgba(26,82,118,0.2)", borderLeft:"3px solid #2980b9", borderRadius:4, color:WHITE, fontSize:13 }}>Agent Grok is thinking...</div>}
          <div ref={bottomRef} />
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:10 }}>
          {quickQ.map(q => <button key={q} onClick={() => setInp(q)} style={{ ...Sbtn("out", true), fontSize:11 }}>{q}</button>)}
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <textarea value={inp} onChange={e => setInp(e.target.value)}
            onKeyDown={e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Ask Agent Grok anything about your production..."
            style={{ flex:1, height:52, resize:"none", padding:"12px 14px", fontSize:14, background:BG3, border:`1px solid ${GOLDDIM}`, color:WHITE, borderRadius:4, outline:"none", lineHeight:1.5 }} />
          <button onClick={send} disabled={loading||!inp.trim()} style={{ ...Sbtn("gold", false), height:52, padding:"0 20px", opacity: loading||!inp.trim() ? 0.5 : 1 }}>▶ SEND</button>
        </div>
      </div>
    </div>
  );
}

function P22({ go }) {
  const [posts, setPosts] = useState([
    {id:1, user:"Sarah J.", title:"Epic Action Feature", icon:"🎬", views:2847, likes:1522},
    {id:2, user:"Mike Chen", title:"Family Documentary", icon:"📽", views:1256, likes:812},
    {id:3, user:"Emily R.", title:"Short Film Entry", icon:"🏆", views:3421, likes:2156},
    {id:4, user:"Alex T.", title:"Music Video Cut", icon:"🎵", views:5234, likes:4012},
  ]);
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>CREATOR NETWORK</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
          <h1 style={{ ...Sh1, fontSize:30, margin:0 }}>COMMUNITY HUB</h1>
          <button style={{ ...Sbtn("gold", false) }}>⬆ UPLOAD YOUR MOVIE</button>
        </div>
        {posts.map(p => (
          <div key={p.id} style={{ ...Scard(), marginBottom:10, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <span style={{ fontSize:26 }}>{p.icon}</span>
              <div>
                <div style={{ color:GOLD, fontWeight:900, fontSize:15 }}>{p.title}</div>
                <div style={{ color:WHITE, fontSize:11, fontWeight:600 }}>by {p.user}</div>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <span style={{ color:WHITE, fontSize:12, fontWeight:700 }}>👁 {p.views.toLocaleString()}</span>
              <span style={{ color:WHITE, fontSize:12, fontWeight:700 }}>❤️ {p.likes.toLocaleString()}</span>
              <button onClick={() => setPosts(ps => ps.map(x => x.id===p.id ? { ...x, likes:x.likes+1 } : x))} style={{ ...Sbtn("out", true) }}>POST</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function P23({ go }) {
  return (
    <div style={{ ...Spage, padding:"30px 40px 80px" }}>
      <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}>
        <h1 style={{ fontFamily:"'Cinzel',serif", color:GOLD, fontSize:"clamp(22px,3.5vw,32px)", fontWeight:900, letterSpacing:4, textShadow:`0 0 40px ${GOLD}99`, marginBottom:16 }}>THAT'S ALL FOLKS</h1>
        <div style={{ height:2, background:`linear-gradient(90deg,transparent,${GOLD},transparent)`, marginBottom:20 }} />
        <div style={{ background:"#000", borderRadius:4, overflow:"hidden", marginBottom:24, aspectRatio:"16/9", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ textAlign:"center", color:WHITE }}>
            <div style={{ fontSize:40, marginBottom:8 }}>🎬</div>
            <div style={{ fontSize:12, color:WHITE, fontWeight:700 }}>thatsallfolks.mp4</div>
          </div>
        </div>
        <div style={{ ...Scard(), textAlign:"left", marginBottom:20 }}>
          <h2 style={{ color:GOLD, fontWeight:900, fontSize:17, textAlign:"center", marginBottom:14 }}>✦ A SPECIAL THANK YOU ✦</h2>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, marginBottom:12 }}>Dear Creator,</p>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, marginBottom:12 }}>From the bottom of my heart — <strong style={{ color:GOLD }}>thank you.</strong> Whether you're here to capture precious family memories, tell a story that's lived rent-free in your head for years, or simply explore what's possible when creativity meets technology, you chose to do it with MandaStrong Studio. That means everything.</p>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, marginBottom:12 }}>I built this platform because I believe that <strong style={{ color:GOLD }}>storytelling should have no gatekeepers.</strong> You don't need a film school degree or a Hollywood budget. You just need a story worth telling — and now you have 600+ professional tools to help you tell it.</p>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, marginBottom:12 }}>Every subscription supports <strong style={{ color:GOLD }}>veterans' mental health initiatives</strong> and <strong style={{ color:GOLD }}>school anti-bullying programs</strong> — causes deeply personal to me as the author of <em>Doxy the School Bully.</em> When you create here, you're helping build a kinder world.</p>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, marginBottom:12 }}>Together, we are building a community of creators who use their talents to spread kindness, understanding, and hope. Your creativity and passion inspire positive change in the world. Through your films and stories, you have the power to educate, inspire, and bring awareness to critical issues like bullying prevention, social skills development, and humanity's collective growth.</p>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, marginBottom:4 }}>With gratitude and cinematic love,</p>
          <p style={{ color:GOLD, fontWeight:900, fontSize:15, marginBottom:4 }}>— AMANDA STRONG</p>
          <p style={{ color:WHITE, fontSize:12 }}>Founder, MandaStrong Studio &nbsp;·&nbsp; Author of <em>Doxy the School Bully</em><br/>MandaStrong1.Etsy.com</p>
        </div>
        <div style={{ ...Scard(), textAlign:"left", marginBottom:20 }}>
          <h2 style={{ color:GOLD, fontWeight:900, fontSize:15, letterSpacing:2, marginBottom:14 }}>OUR MISSION</h2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {[
              {ic:"🎬",t:"EMPOWER CREATORS",d:"600+ AI tools making professional filmmaking accessible to everyone."},
              {ic:"🛡",t:"PROTECT THE YOUNG",d:"Revenue funds school anti-bullying programs, inspired by Doxy the School Bully."},
              {ic:"🏅",t:"SUPPORT VETERANS",d:"We fund mental health services for veterans — because they deserve the best."},
              {ic:"🌐",t:"BUILD COMMUNITY",d:"The Creator Network connects filmmakers worldwide to share and grow."},
            ].map(m => (
              <div key={m.t} style={{ background:BG2, border:`2px solid ${GOLDDIM}66`, borderRadius:4, padding:14 }}>
                <div style={{ fontSize:22, marginBottom:6 }}>{m.ic}</div>
                <div style={{ color:GOLD, fontWeight:900, fontSize:12, letterSpacing:1, marginBottom:5 }}>{m.t}</div>
                <div style={{ color:WHITE, fontSize:12, lineHeight:1.7 }}>{m.d}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={() => window.open("https://MandaStrong1.Etsy.com","_blank")} style={{ ...Sbtn("out", false) }}>VISIT ETSY STORE</button>
          <button onClick={() => window.close()} style={{ ...Sbtn("gold", false) }}>EXIT APP</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState({ name:"Guest", plan:"Guest", isAdmin:false });
  const [mediaLib, setMediaLib] = useState([]);
  const [timeline, setTimeline] = useState({});
  const [rendered, setRendered] = useState(null);
  const go = p => { setPage(p); window.scrollTo(0,0); };

  const pages = {
    1:  <P1 go={go} />,
    2:  <P2 go={go} />,
    3:  <P3 go={go} />,
    4:  <P4 go={go} setUser={setUser} />,
    5:  <ToolPage title="WRITING TOOLS" subtitle="AI WORKSTATION 01 — WRITING" tools={WRITING} />,
    6:  <ToolPage title="VOICE TOOLS" subtitle="AI WORKSTATION 02 — VOICE" tools={VOICE} />,
    7:  <ToolPage title="IMAGE TOOLS" subtitle="AI WORKSTATION 03 — IMAGE" tools={IMAGE_T} />,
    8:  <ToolPage title="VIDEO TOOLS" subtitle="AI WORKSTATION 04 — VIDEO" tools={VIDEO_T} />,
    9:  <ToolPage title="MOTION & VFX" subtitle="AI WORKSTATION 05 — MOTION" tools={MOTION} />,
    10: <ToolPage title="ENHANCEMENT STUDIO" subtitle="AI WORKSTATION 06 — ENHANCE" tools={MOTION} />,
    11: <P11 mediaLib={mediaLib} setMediaLib={setMediaLib} />,
    12: <P12 go={go} mediaLib={mediaLib} />,
    13: <P13 go={go} mediaLib={mediaLib} timeline={timeline} setTimeline={setTimeline} />,
    14: <P14 />,
    15: <P15 />,
    16: <P16 go={go} timeline={timeline} setRendered={setRendered} />,
    17: <P17 go={go} rendered={rendered} mediaLib={mediaLib} />,
    18: <P18 rendered={rendered} mediaLib={mediaLib} />,
    19: <P19 />,
    20: <P20 />,
    21: <P21 />,
    22: <P22 go={go} />,
    23: <P23 go={go} />,
  };

  return (
    <div style={{ background:BG, minHeight:"100vh", fontFamily:"'Barlow Condensed','Rajdhani',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Rajdhani:wght@400;600;700;800;900&family=Barlow+Condensed:wght@400;600;700;800;900&family=Rajdhani:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      <SPARKLE />
      <Header page={page} go={go} setMenuOpen={setMenuOpen} user={user} />
      {menuOpen && <QuickAccessMenu go={go} onClose={() => setMenuOpen(false)} user={user} />}
      <div style={{ minHeight:"calc(100vh - 116px)" }}>{pages[page] || <P1 go={go} />}</div>
      <Footer page={page} go={go} />
    </div>
  );
}
import { useState, useRef, useEffect } from "react";

const GOLD = "#d4a847";
const GOLDDIM = "#8a6d22";
const BG = "#0d0f12";
const BG2 = "#141820";
const BG3 = "#1c2333";
const WHITE = "#ffffff";
const TEXT2 = "#cccccc";
const TEXT3 = "#999999";
const TOTAL = 23;
const SPARKLE = () => (<div style={{ position:"fixed", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${GOLD},transparent)`, zIndex:300, animation:"sparkle 1.5s ease-in-out infinite", pointerEvents:"none" }}><style>{`@keyframes sparkle{0%,100%{opacity:.3}50%{opacity:1}}`}</style></div>);

const STRIPE = {
  basic:  "https://buy.stripe.com/test_basic",
  pro:    "https://buy.stripe.com/test_pro",
  studio: "https://buy.stripe.com/test_studio",
};

const Sbtn = (v, sm) => ({
  background: v==="gold" ? `linear-gradient(135deg,${GOLDDIM},${GOLD})` : "transparent",
  border: v==="gold" ? "none" : `1px solid ${GOLDDIM}`,
  color: v==="gold" ? "#000" : GOLD,
  borderRadius:4, fontWeight:800,
  padding: sm ? "5px 12px" : "10px 22px",
  fontSize: sm ? 11 : 13,
  cursor:"pointer", letterSpacing:1, textTransform:"uppercase",
});
const Spage = { minHeight:"100vh", background:BG, color:WHITE, fontFamily:"'Barlow Condensed','Rajdhani',sans-serif", paddingBottom:70 };
const Sh1 = { fontFamily:"'Cinzel',serif", color:GOLD, letterSpacing:4, textTransform:"uppercase", margin:0 };
const Scard = (extra) => ({ background:BG3, border:`2px solid ${GOLDDIM}66`, borderRadius:4, padding:20, ...(extra||{}) });

const WRITING = ["Script to Movie","Text to Script","Story to Script","Prompt to Story","Script to Screenplay","Feature Film Script","Short Film Script","TV Pilot Script","Documentary Script","Commercial Script","Explainer Script","YouTube Script","Podcast Script","Social Media Script","Plot Generator","Story Outline","Three Act Structure","Five Act Structure","Beat Sheet Builder","Character Bio Writer","Character Arc Builder","Subplot Generator","Plot Twist Generator","Opening Hook Creator","Climax Designer","Logline Generator","Synopsis Writer","Treatment Writer","Scene Writer","Text to Dialogue","Dialogue Generator","Narration Writer","Voiceover Script","Interview Script","Action Line Writer","Scene Heading Tool","Parenthetical Generator","Script Formatter","Dialogue Tightener","Script Timer","Word Counter","Page Counter","Reading Time Estimator","Format Checker","Grammar Polish","Spell Checker","Continuity Checker","Plot Hole Detector","Tone Checker","Genre Classifier"];
const VOICE = ["Upload Own Voice","Record My Voice","Clone My Voice","Text to Voice","Text to Speech","Text to Narration","Text to Audiobook","Text to Voiceover","Voice Cloning","Voice to Voice","AI Voice Actor","Neural Voice Generator","Emotion Voice Synth","Trailer Voice Generator","Documentary Voice","Commercial Voice","Character Voice Creator","Accent Generator","Multi Language Voice","Voice Translator","Lip Sync AI","Dialogue Synth","Audiobook Creator","Podcast Voice","Radio DJ Voice","Sports Commentary Voice","ASMR Creator","Whisper Generator","Meditation Voice","Alien Voice","Deep Voice Generator","Robot Voice","Monster Voice","Child Voice","Elderly Voice","Male to Female Voice","Female to Male Voice","Speed Controller","Tone Adjuster","Pitch Controller","Volume Normalizer","Clarity Booster","Voice Denoiser","Echo Remover","Reverb Remover","Background Noise Remover","Voice EQ Studio"];
const IMAGE_T = ["Text to Image","Prompt to Image","Image to Image","Image Upscaler","Image Generator","AI Art Generator","Photo to Painting","Sketch to Image","Wireframe to Image","Background Generator","Background Remover","Sky Replacer","Object Remover","Face Generator","Character Design","Portrait Generator","Avatar Creator","Product Image Generator","Architecture Visualizer","Interior Design Generator","Landscape Generator","Abstract Art Generator","Logo Generator","Icon Creator","Texture Generator","Pattern Maker","Color Palette Generator","Style Transfer","Photo Enhancer","Photo Restorer","Old Photo Colorizer","Black & White to Color","Image Denoiser","Sharpness Enhancer","Clarity Booster","Detail Enhancer","HDR Image Creator","Exposure Fixer","White Balance AI","Color Grading Studio","LUT Creator","Tone Mapper","Contrast Adjuster","Brightness Tool","Saturation Engine","Hue Shift","Temperature Control","Vignette Tool"];
const VIDEO_T = ["Text to Video","Image to Video","Video to Video","AI Video Creator","AI Film Generator","Video Upscaler","AI Video Generator 4K","Set to Video","Video Colorizer","Color Grading Pro","Fast Look Generator","Film Restoration","Time Lapse Creator","Video Trimmer","Background Remover","Digital Human Video","Rotoscope Video","Animation Creator","Puppet Animator","Motion Capture","Character Animator","Video Stabilizer","Video Compressor","Cinematic LUT","Black & White Film","Film Texture","VHS Effect","Glitch Effect","Quick Film Creator","Opening Slate","Time Freeze","Bullet Time Effect","Rain Simulation","Snow Simulation","Smoke Generator","Fire Simulation","Particle System","AI Progressive Video","4K Upscaling"];
const MOTION = ["AI 8K Upscaling","AI 4K Upscaling","Video Super Resolution","Frame Interpolation","Video Denoiser","Noise Reduction","Grain Remover","Artifact Remover","Scratch Remover","Video Sharpener","Clarity Booster","Detail Enhancer","Edge Enhancement","Texture Boost","White Balance AI","Color Correction","Auto Color Balance","Color Match Pro","Color Grading AI","Cinematic Color Grade","Film Stock Emulation","LUT Generator","Tone Mapping Pro","HDR Enhancement","Deep HDR Boost","Dynamic Range Expansion","Shadow Recovery","Highlight Recovery","Black Point Calibration","Gamma Correction","Contrast Enhancer","Brightness Optimizer","Saturation Booster","Smart Saturation","Face Enhancement","Face Retouch","Eye Enhancer","Teeth Whitener","Skin Tone Enhancer","Background Enhancer","Sky Enhancer","Landscape Enhancer","Night Video Enhancer","Low Light Clarity","Motion Stabilization","Shake Remover","Rolling Shutter Fix"];

const NAV_PAGES = [
  {p:1,l:"Home"},{p:2,l:"Platform"},{p:3,l:"Examples"},
  {p:4,l:"Login / Pricing"},{p:5,l:"Writing Tools"},{p:6,l:"Voice Tools"},
  {p:7,l:"Image Tools"},{p:8,l:"Video Tools"},{p:9,l:"Motion & VFX"},
  {p:10,l:"Enhancement"},{p:11,l:"Upload Media"},{p:12,l:"Editor Suite"},
  {p:13,l:"Timeline Editor"},{p:14,l:"Enhancement Studio"},{p:15,l:"Audio Mixer"},
  {p:16,l:"Render Engine"},{p:17,l:"Film Preview"},{p:18,l:"Export & Distribute"},
  {p:19,l:"Tutorials"},{p:20,l:"Terms & Disclaimer"},{p:21,l:"Agent Grok"},
  {p:22,l:"Community Hub"},{p:23,l:"That's All Folks"},
];

function QuickAccessMenu({ go, onClose, user }) {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, display:"flex" }}>
      <div style={{ width:260, background:BG2, borderRight:`2px solid ${GOLD}`, height:"100vh", overflowY:"auto", padding:20, boxShadow:`4px 0 40px ${GOLD}44` }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <span style={{ fontFamily:"'Cinzel',serif", color:GOLD, fontSize:14, fontWeight:900, letterSpacing:2 }}>QUICK ACCESS</span>
          <button onClick={onClose} style={{ background:"none", border:"none", color:GOLD, fontSize:22, cursor:"pointer" }}>✕</button>
        </div>
        <div style={{ background:`linear-gradient(135deg,${GOLDDIM},${GOLD})`, borderRadius:4, padding:"10px 14px", marginBottom:8, textAlign:"center" }}>
          <div style={{ color:"#000", fontWeight:900, fontSize:11, letterSpacing:2 }}>MANDA STRONG STUDIO</div>
          <div style={{ color:"#000", fontSize:10 }}>Cinema Intelligence Platform 2026</div>
        </div>
        {user && user.plan && (
          <div style={{ background:BG3, border:`1px solid ${GOLDDIM}`, borderRadius:4, padding:"8px 12px", marginBottom:12, textAlign:"center" }}>
            <div style={{ color:WHITE, fontSize:9, letterSpacing:1 }}>CURRENT PLAN</div>
            <div style={{ color:GOLD, fontWeight:800, fontSize:15 }}>{user.plan}</div>
          </div>
        )}
        {NAV_PAGES.map(i => (
          <button key={i.p} onClick={() => { go(i.p); onClose(); }}
            style={{ width:"100%", textAlign:"left", background:"none", border:"none", color:WHITE, padding:"9px 10px", borderRadius:4, cursor:"pointer", fontSize:13, fontWeight:700, display:"block", marginBottom:1 }}
            onMouseEnter={e => { e.currentTarget.style.background = BG3; e.currentTarget.style.color = GOLD; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = WHITE; }}>
            {i.p}. {i.l}
          </button>
        ))}
      </div>
      <div style={{ flex:1, background:"rgba(0,0,0,0.65)" }} onClick={onClose} />
    </div>
  );
}

function Header({ page, go, setMenuOpen, user }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  useEffect(() => {
    const handler = e => { e.preventDefault(); setDeferredPrompt(e); };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);
  const installApp = async () => {
    if (deferredPrompt) { deferredPrompt.prompt(); await deferredPrompt.userChoice; setDeferredPrompt(null); }
    else alert("To install:\n📱 Mobile: Share → Add to Home Screen\n💻 Desktop: Click ⊕ in address bar");
  };
  return (
    <header style={{ position:"sticky", top:0, zIndex:500, background:BG2, borderBottom:`2px solid ${GOLD}`, padding:"0 14px", height:56, display:"flex", alignItems:"center", gap:10, boxShadow:`0 2px 24px ${GOLDDIM}33` }}>
      <button onClick={() => setMenuOpen(true)} style={{ background:"none", border:`1px solid ${GOLDDIM}`, color:GOLD, borderRadius:4, width:36, height:36, cursor:"pointer", fontSize:18, flexShrink:0 }}>☰</button>
      <div onClick={() => go(1)} style={{ cursor:"pointer", flexShrink:0 }}>
        <div style={{ fontFamily:"'Cinzel',serif", color:GOLD, fontSize:14, fontWeight:900, letterSpacing:2, lineHeight:1 }}>MANDA STRONG</div>
        <div style={{ fontFamily:"'Cinzel',serif", color:GOLD, fontSize:10, letterSpacing:4 }}>STUDIO</div>
      </div>
      <div style={{ flex:1, overflow:"hidden", margin:"0 8px" }}>
        <div style={{ color:WHITE, fontSize:10, letterSpacing:1, whiteSpace:"nowrap", {animation:"ticker 22s linear infinite", color:"#999999" }}>
          ✦ Special Offer: New Studio Plan Subscribers Receive 7-Day Free Trial &nbsp;·&nbsp; 600+ AI TOOLS &nbsp;·&nbsp; 8K EXPORT &nbsp;·&nbsp; UP TO 3-HOUR FILMS &nbsp;·&nbsp; PROFESSIONAL CINEMA SYNTHESIS &nbsp;·&nbsp; ✦ Special Offer: New Studio Plan Subscribers Receive 7-Day Free Trial &nbsp;·&nbsp; 600+ AI TOOLS &nbsp;·&nbsp; 8K EXPORT &nbsp;·&nbsp;
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
        <div style={{ color:"#22c55e", fontSize:12, letterSpacing:2, fontWeight:800 }}>● SYSTEM ONLINE</div>
        <div onClick={() => go(21)} style={{ width:40, height:40, background:`linear-gradient(135deg,${GOLDDIM},${GOLD})`, borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontFamily:"'Cinzel',serif", fontSize:22, fontWeight:900, color:"#000", boxShadow:`0 0 12px ${GOLD}66` }}>G</div>
      </div>
      <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </header>
  );
}

function Footer({ page, go }) {
  return (
    <footer style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:400, background:BG2, borderTop:`1px solid ${GOLDDIM}44`, padding:"7px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <span style={{ color:GOLD, fontSize:11, letterSpacing:1, fontWeight:700 }}>MANDASTRONG STUDIO 2026 · PROFESSIONAL CINEMA SYNTHESIS · MandaStrong1.Etsy.com</span>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <button onClick={() => go(Math.max(1, page-1))} disabled={page===1} style={{ ...Sbtn("out", true), opacity:page===1?0.3:1 }}>◀ BACK</button>
        <span style={{ color:GOLD, fontSize:11, fontWeight:700 }}>PAGE {page} / {TOTAL}</span>
        <button onClick={() => go(Math.min(TOTAL, page+1))} disabled={page===TOTAL} style={{ ...Sbtn("gold", true), opacity:page===TOTAL?0.3:1 }}>NEXT ▶</button>
      </div>
      <span style={{ color:"#22c55e", fontSize:11, fontWeight:700 }}>● AUTOSAVE ON</span>
    </footer>
  );
}

function ToolCard({ name }) {
  const fileRef = useRef(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const doAI = async () => {
    setLoading(true); setResult("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json", "anthropic-dangerous-direct-browser-access":"true" },
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:400,
          messages:[{ role:"user", content:`MandaStrong Studio AI tool: "${name}". Generate a short professional cinematic result sample.` }] })
      });
      const d = await res.json();
      setResult(d.content && d.content[0] ? d.content[0].text : "Generated!");
    } catch(e) { setResult("AI ready — add API key to activate."); }
    setLoading(false);
  };
  return (
    <div style={{ background:BG2, border:`1px solid ${GOLDDIM}44`, borderRadius:4, padding:"11px 10px", display:"flex", flexDirection:"column", gap:7, transition:"border-color .2s" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = GOLDDIM}
      onMouseLeave={e => e.currentTarget.style.borderColor = `${GOLDDIM}22`}>
      <span style={{ color:WHITE, fontSize:12, fontWeight:800 }}>{name}</span>
      <div style={{ display:"flex", gap:4 }}>
        <button onClick={() => fileRef.current && fileRef.current.click()} style={{ fontSize:9, padding:"3px 7px", background:BG3, border:`2px solid ${GOLDDIM}66`, color:WHITE, borderRadius:4, cursor:"pointer", fontWeight:700, letterSpacing:1 }}>UPLOAD</button>
        <button style={{ fontSize:9, padding:"3px 7px", background:BG3, border:`2px solid ${GOLDDIM}66`, color:WHITE, borderRadius:4, cursor:"pointer", fontWeight:700, letterSpacing:1 }}>PASTE</button>
        <button onClick={doAI} style={{ fontSize:9, padding:"3px 8px", background:GOLDDIM, border:`1px solid ${GOLD}`, color:"#000", borderRadius:4, cursor:"pointer", fontWeight:900 }}>{loading ? "..." : "AI ✦"}</button>
      </div>
      {result && <div style={{ color:"#aed6f1", fontSize:10, lineHeight:1.5, borderLeft:`2px solid ${GOLDDIM}`, paddingLeft:6 }}>{result.slice(0,100)}...</div>}
      <input ref={fileRef} type="file" style={{ display:"none" }} />
    </div>
  );
}

function ToolPage({ title, subtitle, tools }) {
  const [search, setSearch] = useState("");
  const filtered = tools.filter(t => t.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{ ...Spage }}>
      <div style={{ padding:"16px 20px 10px", borderBottom:`1px solid ${GOLDDIM}22`, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
        <div>
          <div style={{ fontSize:10, color:GOLD, letterSpacing:3, fontWeight:700 }}>{subtitle}</div>
          <h1 style={{ ...Sh1, fontSize:26, margin:0 }}>{title}</h1>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ position:"relative" }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${tools.length} tools...`}
              style={{ background:BG3, border:`1px solid ${GOLDDIM}`, borderRadius:4, padding:"7px 12px 7px 30px", color:WHITE, fontSize:12, outline:"none", width:200 }} />
            <span style={{ position:"absolute", left:9, top:"50%", transform:"translateY(-50%)", color:GOLD, fontSize:13 }}>🔍</span>
            {search && <button onClick={() => setSearch("")} style={{ position:"absolute", right:7, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:GOLD, cursor:"pointer", padding:0 }}>✕</button>}
          </div>
          <span style={{ color:WHITE, fontSize:11, fontWeight:700 }}>{filtered.length} TOOLS</span>
        </div>
      </div>
      <div style={{ padding:14, display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:8 }}>
        {filtered.map(t => <ToolCard key={t} name={t} />)}
      </div>
    </div>
  );
}

function P1({ go }) {
  return (
    <div style={{ ...Spage }}>
      <div style={{ background:"linear-gradient(180deg,#000408 0%,#0d0f12 100%)", padding:"56px 40px 36px", textAlign:"center", borderBottom:`2px solid ${GOLD}`, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
          {[...Array(60)].map((_,i) => (
            <div key={i} style={{ position:"absolute", width:i%3===0?2:1, height:i%3===0?2:1, background:GOLD, borderRadius:"50%", opacity:0.3+i%3*0.2, left:`${(i*17+7)%100}%`, top:`${(i*13+11)%100}%`, animation:`twinkle ${1.5+i%3}s ease-in-out ${i%4*0.5}s infinite` }} />
          ))}
        </div>
        <style>{`@keyframes twinkle{0%,100%{opacity:.15}50%{opacity:.9}}`}</style>
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ fontSize:9, color:TEXT3, letterSpacing:5, marginBottom:10 }}>CINEMA INTELLIGENCE PLATFORM · COMPETITION EDITION 2026</div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:"clamp(32px,6vw,52px)", fontWeight:900, color:GOLD, letterSpacing:6, lineHeight:1.1, textShadow:`0 0 60px ${GOLD}cc, 0 0 120px ${GOLD}55` }}>MANDA STRONG</div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:"clamp(32px,6vw,52px)", fontWeight:900, color:GOLD, letterSpacing:6, lineHeight:1.1, textShadow:`0 0 60px ${GOLD}cc, 0 0 120px ${GOLD}55`, marginBottom:10 }}>STUDIO</div>
          <div style={{ color:WHITE, fontSize:12, letterSpacing:2, marginBottom:20, fontWeight:700 }}>600+ AI TOOLS · 8K EXPORT · UP TO 3-HOUR FILMS</div>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => go(4)} style={{ ...Sbtn("gold", false), fontSize:15, padding:"14px 36px" }}>▶ START CREATING</button>
            <button onClick={() => go(4)} style={{ ...Sbtn("out", false), fontSize:15, padding:"14px 36px" }}>LOGIN / REGISTER</button>
          </div>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, padding:"24px 32px", maxWidth:860, margin:"0 auto" }}>
        {[["600+","AI Tools Across 6 Categories"],["8K","Cinema-Grade Export"],["3 HOURS","Maximum Film Duration"],["1TB","Cloud Storage Studio Plan"]].map(([v,l]) => (
          <div key={v} style={{ ...Scard(), textAlign:"center" }}>
            <div style={{ color:GOLD, fontFamily:"'Cinzel',serif", fontSize:26, fontWeight:900 }}>{v}</div>
            <div style={{ color:WHITE, fontSize:11, marginTop:4, fontWeight:600 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign:"center", padding:"0 32px 20px" }}>
        <button onClick={() => alert("To install MandaStrong Studio:\n📱 Mobile: Tap Share → Add to Home Screen\n💻 Desktop: Click ⊕ in your browser address bar")} style={{ ...Sbtn("out", true), fontSize:11 }}>⬇ Download As App</button>
      </div>
      <div style={{ background:BG3, borderTop:`1px solid ${GOLDDIM}22`, borderBottom:`1px solid ${GOLDDIM}22`, padding:"7px 0", overflow:"hidden" }}>
        <div style={{ whiteSpace:"nowrap", animation:"ticker 28s linear infinite", color:WHITE, fontSize:10, letterSpacing:1 }}>
          &nbsp;&nbsp;🎬 Special Offer: New Studio Plan Subscribers Receive 7-Day Free Trial &nbsp;·&nbsp; Professional AI Movie Creation Platform &nbsp;·&nbsp; MandaStrong1.Etsy.com &nbsp;·&nbsp; 600+ Tools &nbsp;·&nbsp; 8K Cinema Export &nbsp;·&nbsp; 🎬 Special Offer: New Studio Plan Subscribers Receive 7-Day Free Trial &nbsp;·&nbsp; Professional AI Movie Creation Platform &nbsp;·&nbsp;
        </div>
      </div>
    </div>
  );
}

function P2({ go }) {
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <div style={{ fontSize:10, color:GOLD, letterSpacing:3, marginBottom:6, fontWeight:700 }}>AI CREATOR PLATFORM</div>
        <h1 style={{ ...Sh1, fontSize:32, marginBottom:12 }}>MAKE AWESOME FAMILY MOVIES<br/>OR TURN YOUR DREAMS INTO REALITY</h1>
        <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, maxWidth:700, marginBottom:28 }}>MandaStrong Studio combines the power of 600+ professional AI tools with an intuitive cinematic workspace — so anyone can create stunning short films, family videos, or feature-length productions up to 3 hours long. No film school required.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
          {[["600+","AI Tools"],["8K","Export Quality"],["3 HOURS","Max Duration"],["1TB","Cloud Storage"]].map(([v,l]) => (
            <div key={v} style={{ ...Scard(), textAlign:"center" }}>
              <div style={{ color:GOLD, fontFamily:"'Cinzel',serif", fontSize:24, fontWeight:900 }}>{v}</div>
              <div style={{ color:WHITE, fontSize:11, marginTop:4, fontWeight:600 }}>{l}</div>
            </div>
          ))}
        </div>
        <button onClick={() => go(4)} style={{ ...Sbtn("gold", false) }}>Start Creating</button>
      </div>
    </div>
  );
}

function P3({ go }) {
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <div style={{ fontSize:10, color:GOLD, letterSpacing:3, marginBottom:6, fontWeight:700 }}>SHOWCASE</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:6 }}>EXAMPLES MADE BY MANDASTRONG STUDIO</h1>
        <div style={{ background:"#7f1d1d", border:"1px solid #ef4444", display:"inline-block", borderRadius:4, padding:"3px 10px", color:"#ef4444", fontSize:10, fontWeight:700, marginBottom:24 }}>● ADMIN ACTIVE</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:28 }}>
          {[{s:1,d:"A documentary film — MandaStrong Studio x Doxy"},{s:2,d:"A plain-English guide to artificial intelligence"}].map(f => (
            <div key={f.s} style={{ ...Scard() }}>
              <div style={{ background:"#000", borderRadius:4, height:160, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12, fontSize:40, color:WHITE }}>🎬</div>
              <div style={{ fontSize:9, color:GOLD, letterSpacing:2, fontWeight:700 }}>VIEWER 0{f.s}</div>
              <div style={{ color:WHITE, fontSize:12, marginBottom:12, fontWeight:600 }}>{f.d}</div>
              <button style={{ ...Sbtn("out", true) }}>⬆ UPLOAD FILM</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function P4({ go, setUser }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const inp = { width:"100%", background:BG, border:`1px solid ${GOLDDIM}`, borderRadius:4, padding:"10px 12px", color:WHITE, fontSize:14, marginBottom:10, outline:"none", boxSizing:"border-box" };
  const login = () => {
    if (email === "woolleya129@gmail.com" && pass === "Mangler1970!!") {
      setUser({ name:"Amanda", plan:"Studio", isAdmin:true }); go(5);
    } else {
      setUser({ name: email.split("@")[0] || "Creator", plan:"Creator", isAdmin:false }); go(5);
    }
  };
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:20, marginBottom:40 }}>
          <div style={{ ...Scard() }}>
            <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:6, fontWeight:700 }}>EXISTING USER</div>
            <h2 style={{ ...Sh1, fontSize:20, marginBottom:18 }}>SIGN IN</h2>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" style={inp} />
            <input value={pass} onChange={e => setPass(e.target.value)} type="password" placeholder="Password" style={{ ...inp, marginBottom:16 }} />
            <button onClick={login} style={{ ...Sbtn("gold", false), width:"100%", padding:"13px" }}>SIGN IN TO STUDIO</button>
            <div style={{ textAlign:"center", marginTop:8, color:WHITE, fontSize:10 }}>Secured with 256-bit encryption</div>
          </div>
          <div style={{ ...Scard(), border:"2px solid #22c55e", position:"relative" }}>
            <div style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)", background:"#22c55e", color:"#000", borderRadius:4, padding:"3px 14px", fontSize:10, fontWeight:900, whiteSpace:"nowrap" }}>🎉 7-DAY FREE TRIAL</div>
            <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:6, marginTop:10, fontWeight:700 }}>NEW CREATOR</div>
            <h2 style={{ ...Sh1, fontSize:20, marginBottom:18 }}>CREATE ACCOUNT</h2>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" style={inp} />
            <input value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder="Email address" style={{ ...inp, marginBottom:16 }} />
            <button onClick={() => { setUser({ name: name||"Creator", plan:"Studio Trial", isAdmin:false }); window.open(STRIPE.studio, "_blank"); go(5); }}
              style={{ width:"100%", padding:"13px", background:"#22c55e", border:"none", color:"#000", borderRadius:4, fontWeight:900, fontSize:14, cursor:"pointer", letterSpacing:1 }}>START FREE TRIAL — $0</button>
            <div style={{ textAlign:"center", marginTop:8, color:WHITE, fontSize:10 }}>Studio Plan Free for 7 Days · No Credit Card</div>
          </div>
          <div style={{ ...Scard(), textAlign:"center" }}>
            <div style={{ fontSize:40, marginBottom:10 }}>👁</div>
            <h2 style={{ ...Sh1, fontSize:18, marginBottom:10 }}>EXPLORE FIRST</h2>
            <p style={{ color:WHITE, fontSize:13, lineHeight:1.7, marginBottom:20 }}>Browse all 600+ AI tools and see the full platform before committing. No account required.</p>
            <button onClick={() => { setUser({ name:"Guest", plan:"Guest", isAdmin:false }); go(5); }} style={{ ...Sbtn("out", false), width:"100%" }}>BROWSE AS GUEST</button>
          </div>
        </div>
        <h2 style={{ ...Sh1, fontSize:26, textAlign:"center", marginBottom:24 }}>SUBSCRIPTION PLANS</h2>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:18 }}>
          {[
            {t:"CREATOR PLAN", p:"20", link:STRIPE.basic, f:["HD Export 1080p","100 AI Tools","10GB Storage","Email Support","Basic Timeline"], pop:false, trial:false},
            {t:"PRO PLAN", p:"30", link:STRIPE.pro, f:["4K Export","300 AI Tools","100GB Storage","Priority Support","Full Timeline","Commercial License"], pop:true, trial:false},
            {t:"STUDIO PLAN", p:"50", link:STRIPE.studio, f:["8K Export","600+ AI Tools","1TB Storage","24/7 Support","Full Rights","API Access","Collaboration","7-Day Free Trial"], pop:false, trial:true},
          ].map((plan, i) => (
            <div key={plan.t} style={{ ...Scard(), border: plan.pop ? `2px solid ${GOLD}` : `1px solid ${GOLDDIM}33`, position:"relative" }}>
              {plan.pop && <div style={{ position:"absolute", top:-11, left:"50%", transform:"translateX(-50%)", background:GOLD, color:"#000", borderRadius:4, padding:"2px 12px", fontSize:10, fontWeight:900, whiteSpace:"nowrap" }}>MOST POPULAR</div>}
              {plan.trial && <div style={{ position:"absolute", top:-11, right:12, background:"#22c55e", color:"#000", borderRadius:4, padding:"2px 10px", fontSize:10, fontWeight:900, whiteSpace:"nowrap" }}>🎉 FREE TRIAL</div>}
              <div style={{ color:WHITE, fontSize:10, letterSpacing:2, fontWeight:700 }}>{plan.t}</div>
              <div style={{ color:GOLD, fontFamily:"'Cinzel',serif", fontSize:34, fontWeight:900, margin:"6px 0" }}>${plan.p}<span style={{ fontSize:13, color:WHITE }}>/mo</span></div>
              <div style={{ margin:"12px 0" }}>{plan.f.map(f => <div key={f} style={{ color:WHITE, fontSize:12, padding:"3px 0", borderBottom:`1px solid ${BG}` }}>✓ {f}</div>)}</div>
              <button onClick={() => window.open(plan.link, "_blank")} style={{ ...Sbtn(plan.trial ? "out" : "gold", false), width:"100%" }}>{plan.trial ? "START FREE TRIAL" : "SUBSCRIBE NOW"}</button>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", color:WHITE, fontSize:11, marginTop:14 }}>All plans include a 30-day money-back guarantee · Secure checkout via Stripe</div>
      </div>
    </div>
  );
}

function P11({ mediaLib, setMediaLib }) {
  const fileRef = useRef(null);
  const onFiles = files => {
    if (!files) return;
    const newA = Array.from(files).map(f => ({ id: Date.now()+Math.random(), name:f.name, type:f.type, file:f, url:URL.createObjectURL(f) }));
    setMediaLib(p => [...p, ...newA]);
  };
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div style={{ fontSize:10, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>ASSET INGESTION</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:4 }}>UPLOAD MEDIA</h1>
        <div style={{ color:WHITE, fontSize:14, marginBottom:22, fontWeight:700 }}>{mediaLib.length} ASSETS IN LIBRARY</div>
        <div onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = GOLD; }}
          onDragLeave={e => { e.currentTarget.style.borderColor = GOLDDIM; }}
          onDrop={e => { e.preventDefault(); onFiles(e.dataTransfer.files); e.currentTarget.style.borderColor = GOLDDIM; }}
          onClick={() => fileRef.current && fileRef.current.click()}
          style={{ border:`2px dashed ${GOLDDIM}`, borderRadius:4, padding:"56px 40px", textAlign:"center", cursor:"pointer", marginBottom:18, transition:"border-color .2s" }}>
          <div style={{ fontSize:40, marginBottom:10 }}>🎬</div>
          <div style={{ color:WHITE, fontWeight:800, fontSize:18, letterSpacing:2 }}>DRAG & DROP YOUR MEDIA HERE</div>
          <div style={{ color:WHITE, fontSize:13, marginTop:8 }}>Or click to browse · Video · Audio · Images</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:22 }}>
          {[["📁","BROWSE FILES"],["🖥","RECORD SCREEN"],["🔗","IMPORT FROM URL"]].map(([ic,lb]) => (
            <button key={lb} onClick={() => fileRef.current && fileRef.current.click()}
              style={{ ...Scard(), textAlign:"center", padding:18, cursor:"pointer", display:"block", border:`2px solid ${GOLDDIM}66` }}>
              <div style={{ fontSize:26, marginBottom:6 }}>{ic}</div>
              <div style={{ color:WHITE, fontSize:11, fontWeight:800, letterSpacing:1 }}>{lb}</div>
            </button>
          ))}
        </div>
        {mediaLib.length > 0 && (
          <div>
            <h3 style={{ color:GOLD, fontWeight:900, fontSize:14, letterSpacing:2, marginBottom:10 }}>MEDIA LIBRARY ({mediaLib.length})</h3>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:10 }}>
              {mediaLib.map(a => (
                <div key={a.id} style={{ ...Scard(), padding:10, position:"relative" }}>
                  {a.type.startsWith("video") ? <video src={a.url} style={{ width:"100%", borderRadius:4, marginBottom:6 }} /> :
                   a.type.startsWith("image") ? <img src={a.url} style={{ width:"100%", borderRadius:4, marginBottom:6 }} alt={a.name} /> :
                   <div style={{ height:70, background:BG, borderRadius:4, marginBottom:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>🎵</div>}
                  <div style={{ color:WHITE, fontSize:10, fontWeight:800, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.name}</div>
                  <button onClick={() => setMediaLib(p => p.filter(x => x.id !== a.id))}
                    style={{ position:"absolute", top:6, right:6, background:"#7f1d1d", border:"none", color:"#ef4444", borderRadius:4, width:18, height:18, cursor:"pointer", fontSize:10, padding:0 }}>✕</button>
                </div>
              ))}
            </div>
          </div>
        )}
        <input ref={fileRef} type="file" multiple accept="video/*,audio/*,image/*" onChange={e => onFiles(e.target.files)} style={{ display:"none" }} />
      </div>
    </div>
  );
}

function P12({ go, mediaLib }) {
  const [dur, setDur] = useState(90);
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <div style={{ fontSize:10, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>PRODUCTION HUB</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:4 }}>EDITOR SUITE</h1>
        <div style={{ color:WHITE, fontSize:14, marginBottom:24, fontWeight:600 }}>Your complete post-production workspace.</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:22 }}>
          {[
            {ic:"🗂", t:"MEDIA LIBRARY", d:`${mediaLib.length} assets uploaded`, p:11},
            {ic:"⏱", t:"TIMELINE EDITOR", d:"Multi-track video editing", p:13},
            {ic:"✨", t:"ENHANCEMENT STUDIO", d:"90+ AI enhancement tools", p:14},
            {ic:"🎵", t:"AUDIO MIXER", d:"4-channel professional mixing", p:15},
            {ic:"⚡", t:"RENDER ENGINE", d:"Up to 8K cinema output", p:16},
            {ic:"▶", t:"PREVIEW PLAYER", d:"Full-screen film playback", p:17},
          ].map(c => (
            <button key={c.t} onClick={() => go(c.p)}
              style={{ ...Scard(), textAlign:"left", cursor:"pointer", transition:"border-color .2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = GOLDDIM}
              onMouseLeave={e => e.currentTarget.style.borderColor = `${GOLDDIM}44`}>
              <div style={{ fontSize:30, marginBottom:8 }}>{c.ic}</div>
              <div style={{ color:GOLD, fontWeight:900, fontSize:13, letterSpacing:1 }}>{c.t}</div>
              <div style={{ color:WHITE, fontSize:11, marginTop:4, fontWeight:600 }}>{c.d}</div>
            </button>
          ))}
        </div>
        <div style={{ ...Scard() }}>
          <div style={{ color:GOLD, fontWeight:900, fontSize:12, letterSpacing:2, marginBottom:10 }}>MOVIE DURATION</div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            {[30,60,90,120,180].map(m => <button key={m} onClick={() => setDur(m)} style={{ ...Sbtn(dur===m?"gold":"out", true) }}>{m} MIN</button>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function P13({ go, mediaLib, timeline, setTimeline }) {
  const [tracks, setTracks] = useState(["VIDEO TRACK","AUDIO TRACK","TEXT / TITLES"]);
  const addTrack = () => setTracks(p => [...p, `TRACK ${p.length + 1}`]);
  const addToTrack = (idx, asset) => setTimeline(p => ({ ...p, [idx]: [...(p[idx]||[]), asset] }));
  return (
    <div style={{ ...Spage, padding:20 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14, flexWrap:"wrap", gap:10 }}>
        <div>
          <div style={{ fontSize:9, color:GOLD, letterSpacing:3, fontWeight:700 }}>EDITING WORKSPACE</div>
          <h1 style={{ ...Sh1, fontSize:26, margin:0 }}>TIMELINE EDITOR</h1>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={addTrack} style={{ ...Sbtn("out", true) }}>+ ADD TRACK</button>
          <button onClick={() => go(16)} style={{ ...Sbtn("gold", false) }}>→ RENDER</button>
          <button onClick={() => setTimeline({})} style={{ ...Sbtn("out", true) }}>CLEAR ALL</button>
        </div>
      </div>
      <div style={{ background:"#000", borderRadius:4, height:110, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14, border:`1px solid ${GOLDDIM}44` }}>
        {mediaLib[0] && mediaLib[0].type.startsWith("video") ?
          <video src={mediaLib[0].url} style={{ height:"100%", width:"100%", objectFit:"cover", opacity:.5 }} /> :
          <div style={{ textAlign:"center", color:WHITE }}>
            <div style={{ fontSize:12, letterSpacing:2, marginBottom:8 }}>ADD MEDIA TO SEE PREVIEW</div>
            <button onClick={() => go(11)} style={{ ...Sbtn("out", true) }}>⬆ UPLOAD MEDIA</button>
          </div>}
      </div>
      {tracks.map((tr, idx) => (
        <div key={idx} style={{ marginBottom:10 }}>
          <div style={{ color:GOLD, fontSize:10, letterSpacing:2, marginBottom:4, fontWeight:800 }}>{tr}</div>
          <div onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); const id = e.dataTransfer.getData("assetId"); const a = mediaLib.find(x => String(x.id) === id); if (a) addToTrack(idx, a); }}
            style={{ background:BG3, border:`1px dashed ${GOLDDIM}44`, borderRadius:4, minHeight:46, padding:8, display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
            {(timeline[idx]||[]).map((a, i) => (
              <div key={i} style={{ background:GOLDDIM, borderRadius:4, padding:"4px 10px", fontSize:11, color:"#000", fontWeight:700, display:"flex", alignItems:"center", gap:6 }}>
                {a.name.slice(0,12)}
                <button onClick={() => setTimeline(p => ({ ...p, [idx]: p[idx].filter((_,j) => j!==i) }))}
                  style={{ background:"none", border:"none", color:"#000", cursor:"pointer", fontSize:11, padding:0 }}>✕</button>
              </div>
            ))}
            {!(timeline[idx]||[]).length && <span style={{ color:WHITE, fontSize:11 }}>DROP {tr} CLIPS HERE</span>}
          </div>
        </div>
      ))}
      {mediaLib.length > 0 && (
        <div style={{ marginTop:14 }}>
          <div style={{ color:GOLD, fontSize:10, letterSpacing:2, marginBottom:8, fontWeight:800 }}>DRAG TO TIMELINE:</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {mediaLib.map(a => (
              <div key={a.id} draggable onDragStart={e => e.dataTransfer.setData("assetId", String(a.id))}
                style={{ background:BG3, border:`1px solid ${GOLDDIM}`, borderRadius:4, padding:"5px 12px", cursor:"grab", color:GOLD, fontSize:11, fontWeight:700 }}>
                📎 {a.name.slice(0,14)}
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{ ...Scard(), marginTop:14, display:"flex", alignItems:"center", gap:10 }}>
        {["⏮","⏪","▶","⏩","⏭"].map(c => <button key={c} style={{ ...Sbtn("out", true) }}>{c}</button>)}
        <div style={{ flex:1, height:4, background:BG, borderRadius:2 }}>
          <div style={{ width:"0%", height:"100%", background:GOLD, borderRadius:2 }} />
        </div>
        <span style={{ color:WHITE, fontSize:11, fontWeight:700 }}>00:00 / 90:00</span>
      </div>
    </div>
  );
}

function P14() {
  const tools14 = MOTION.slice(0, 14);
  const [active, setActive] = useState(tools14[0]);
  const [vals, setVals] = useState({ Intensity:75, Clarity:80, Color:70, Brightness:65 });
  return (
    <div style={{ ...Spage, display:"flex" }}>
      <div style={{ width:180, background:BG2, borderRight:`1px solid ${GOLDDIM}22`, overflowY:"auto", padding:10 }}>
        {tools14.map(t => (
          <button key={t} onClick={() => setActive(t)}
            style={{ width:"100%", textAlign:"left", background: t===active ? BG3 : "none", border:"none", color: t===active ? GOLD : WHITE, padding:"8px 10px", borderRadius:4, cursor:"pointer", fontSize:12, fontWeight: t===active ? 900 : 600, marginBottom:2 }}>
            {t}
          </button>
        ))}
      </div>
      <div style={{ flex:1, padding:30 }}>
        <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>ENHANCEMENT STUDIO</div>
        <h2 style={{ ...Sh1, fontSize:24, marginBottom:4 }}>{active.toUpperCase()}</h2>
        <div style={{ color:WHITE, fontSize:13, marginBottom:22, fontWeight:600 }}>Apply AI powered <strong style={{ color:GOLD }}>{active}</strong> to your footage.</div>
        {Object.entries(vals).map(([k,v]) => (
          <div key={k} style={{ marginBottom:18 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <span style={{ color:WHITE, fontSize:13, fontWeight:700 }}>{k}</span>
              <span style={{ color:GOLD, fontSize:13, fontWeight:700 }}>{v}%</span>
            </div>
            <input type="range" min={0} max={100} value={v} onChange={e => setVals(p => ({ ...p, [k]: +e.target.value }))} style={{ width:"100%", accentColor:GOLD }} />
          </div>
        ))}
        <div style={{ display:"flex", gap:12, marginTop:20 }}>
          <button style={{ ...Sbtn("gold", false) }}>APPLY ENHANCEMENT</button>
          <button onClick={() => setVals({ Intensity:75, Clarity:80, Color:70, Brightness:65 })} style={{ ...Sbtn("out", false) }}>RESET</button>
        </div>
      </div>
    </div>
  );
}

function P15() {
  const [lvl, setLvl] = useState({ MUSIC:75, VOICE:60, EFX:50, MASTER:85 });
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>MIXING CONSOLE</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:24 }}>AUDIO MIXER</h1>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:28 }}>
          {Object.entries(lvl).map(([ch, val]) => (
            <div key={ch} style={{ ...Scard(), textAlign:"center", padding:20 }}>
              <div style={{ color:GOLD, fontSize:10, letterSpacing:2, marginBottom:8, fontWeight:800 }}>{ch}</div>
              <div style={{ color:GOLD, fontFamily:"'Cinzel',serif", fontSize:34, fontWeight:900, marginBottom:14 }}>{val}</div>
              <input type="range" min={0} max={100} value={val} onChange={e => setLvl(p => ({ ...p, [ch]: +e.target.value }))} style={{ width:"100%", height:110, accentColor:GOLD }} />
              <div style={{ height:4, background:BG, borderRadius:2, marginTop:10 }}>
                <div style={{ width:`${val}%`, height:"100%", background:`linear-gradient(90deg,${GOLDDIM},${GOLD})`, borderRadius:2 }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={() => setLvl({ MUSIC:75, VOICE:60, EFX:50, MASTER:85 })} style={{ ...Sbtn("out", false) }}>RESET LEVELS</button>
          <button style={{ ...Sbtn("gold", false) }}>SAVE PRESET</button>
        </div>
      </div>
    </div>
  );
}

function P16({ go, timeline, setRendered }) {
  const [quality, setQuality] = useState("8K – 4320p");
  const [format, setFormat] = useState("MP4");
  const [progress, setProgress] = useState(0);
  const [rendering, setRendering] = useState(false);
  const [done, setDone] = useState(false);
  const clipCount = Object.values(timeline||{}).flat().length;
  const startRender = () => {
    if (clipCount === 0) { alert("Add clips to the timeline first!"); return; }
    setRendering(true); setDone(false); setProgress(0);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 7 + 2;
      if (p >= 100) { clearInterval(iv); setProgress(100); setRendering(false); setDone(true); setRendered({ url:"", quality, format, timestamp: new Date().toLocaleString() }); }
      else setProgress(Math.round(p));
    }, 200);
  };
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>FINAL OUTPUT</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:22 }}>RENDER FILM</h1>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:18 }}>
          <div style={{ ...Scard() }}>
            <div style={{ color:GOLD, fontWeight:900, fontSize:11, letterSpacing:2, marginBottom:10 }}>EXPORT QUALITY</div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {["8K – 4320p","4K – 2160p","HD – 1080p","SD – 720p"].map(q => <button key={q} onClick={() => setQuality(q)} style={{ ...Sbtn(quality===q?"gold":"out", true) }}>{q}</button>)}
            </div>
          </div>
          <div style={{ ...Scard() }}>
            <div style={{ color:GOLD, fontWeight:900, fontSize:11, letterSpacing:2, marginBottom:10 }}>FORMAT</div>
            <div style={{ display:"flex", gap:8 }}>
              {["MP4","MOV","AVI","WebM"].map(f => <button key={f} onClick={() => setFormat(f)} style={{ ...Sbtn(format===f?"gold":"out", true) }}>{f}</button>)}
            </div>
          </div>
        </div>
        <div style={{ ...Scard(), display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
          {["⏮","⏪","▶","⏩","⏭"].map(c => <button key={c} style={{ ...Sbtn("out", true) }}>{c}</button>)}
          <div style={{ flex:1, height:4, background:BG, borderRadius:2 }}>
            <div style={{ width:`${progress}%`, height:"100%", background:`linear-gradient(90deg,${GOLDDIM},${GOLD})`, borderRadius:2, transition:"width .3s" }} />
          </div>
          <span style={{ color:WHITE, fontSize:11, fontWeight:700 }}>00:00 / 90:00</span>
        </div>
        {rendering && (
          <div style={{ ...Scard(), marginBottom:14, textAlign:"center" }}>
            <div style={{ color:GOLD, fontWeight:900, fontSize:13, marginBottom:8 }}>RENDERING... {progress}%</div>
            <div style={{ height:8, background:BG, borderRadius:4 }}>
              <div style={{ width:`${progress}%`, height:"100%", background:`linear-gradient(90deg,${GOLDDIM},${GOLD})`, borderRadius:4, transition:"width .3s" }} />
            </div>
          </div>
        )}
        {done && (
          <div style={{ background:"#14532d", border:"1px solid #22c55e", borderRadius:4, padding:16, marginBottom:14, textAlign:"center" }}>
            <div style={{ color:"#22c55e", fontWeight:900, fontSize:14 }}>✓ RENDER COMPLETE — {quality} · {format}</div>
            <button onClick={() => go(17)} style={{ ...Sbtn("out", true), marginTop:10, color:"#22c55e", borderColor:"#22c55e" }}>▶ PREVIEW FILM</button>
          </div>
        )}
        <button onClick={startRender} disabled={rendering}
          style={{ ...Sbtn("gold", false), width:"100%", padding:"15px", fontSize:14, opacity: rendering ? 0.6 : 1 }}>
          {rendering ? `RENDERING... ${progress}%` : `START RENDER — ${quality} · ${format}`}
        </button>
      </div>
    </div>
  );
}

function P17({ go, rendered, mediaLib }) {
  const videoSrc = mediaLib.find(a => a.type.startsWith("video")) ? mediaLib.find(a => a.type.startsWith("video")).url : "";
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:14 }}>FILM PREVIEW</h1>
        <div style={{ background:"#000", borderRadius:4, overflow:"hidden", marginBottom:14, aspectRatio:"16/9", display:"flex", alignItems:"center", justifyContent:"center" }}>
          {videoSrc ?
            <video src={videoSrc} controls style={{ width:"100%", height:"100%" }} /> :
            <div style={{ textAlign:"center", color:WHITE }}>
              <div style={{ fontSize:40, marginBottom:10 }}>🎬</div>
              <div style={{ fontSize:12, letterSpacing:2 }}>NO RENDER AVAILABLE</div>
              <button onClick={() => go(16)} style={{ ...Sbtn("out", true), marginTop:12 }}>GO TO RENDER →</button>
            </div>}
        </div>
        {rendered && <div style={{ ...Scard(), color:WHITE, fontSize:12, fontWeight:700 }}>Rendered: {rendered.quality} · {rendered.format} · {rendered.timestamp}</div>}
        <div style={{ ...Scard(), marginTop:12, display:"flex", alignItems:"center", gap:10 }}>
          {["⏮","⏪","▶","⏩","⏭"].map(c => <button key={c} style={{ ...Sbtn("out", true) }}>{c}</button>)}
          <div style={{ flex:1, height:4, background:BG, borderRadius:2 }} />
          <span style={{ color:WHITE, fontSize:11, fontWeight:700 }}>00:00 / 90:00</span>
        </div>
      </div>
    </div>
  );
}

function P18({ rendered, mediaLib }) {
  const videoSrc = mediaLib.find(a => a.type.startsWith("video")) ? mediaLib.find(a => a.type.startsWith("video")).url : "";
  const download = () => {
    if (!videoSrc) { alert("No film yet — render first!"); return; }
    const a = document.createElement("a"); a.href = videoSrc; a.download = "MandaStrong_Film.mp4"; a.click();
  };
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>DISTRIBUTION</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:14 }}>EXPORT & DISTRIBUTE</h1>
        <div style={{ ...Scard(), marginBottom:18, textAlign:"center", color: rendered ? WHITE : TEXT3, fontWeight:700 }}>
          {rendered ? `✓ Film ready: ${rendered.quality} · ${rendered.format}` : "No film rendered yet — go to Render Engine →"}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:22 }}>
          {[["💾","DOWNLOAD TO DEVICE",download],["💿","SAVE PROJECT FILE",() => {}],["🌐","SHARE TO COMMUNITY HUB",() => {}]].map(([ic,lb,fn]) => (
            <button key={lb} onClick={fn} style={{ ...Scard(), cursor:"pointer", textAlign:"center", padding:18, display:"block", border:`2px solid ${GOLDDIM}66` }}>
              <div style={{ fontSize:26, marginBottom:6 }}>{ic}</div>
              <div style={{ color:WHITE, fontSize:11, fontWeight:800, letterSpacing:1 }}>{lb}</div>
            </button>
          ))}
        </div>
        <div style={{ color:GOLD, fontWeight:900, fontSize:12, letterSpacing:2, marginBottom:12 }}>SHARE DIRECTLY TO SOCIAL MEDIA</div>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          {["YouTube","Instagram","TikTok","X / Twitter","Facebook","LinkedIn","Vimeo","Pinterest","WhatsApp"].map(s => (
            <button key={s} style={{ ...Scard(), padding:"10px 14px", cursor:"pointer" }}>
              <div style={{ color:WHITE, fontSize:11, fontWeight:700 }}>{s}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function P19() {
  const tuts = [
    {n:"01",t:"Getting Started — Platform Overview",d:"8:30",l:"Beginner"},
    {n:"02",t:"Importing & Managing Media Assets",d:"6:15",l:"Beginner"},
    {n:"03",t:"Multi-Track Timeline Editing",d:"12:45",l:"Intermediate"},
    {n:"04",t:"AI Tools — 600+ Features Explained",d:"18:20",l:"Intermediate"},
    {n:"05",t:"Professional Color Grading with AI",d:"22:00",l:"Advanced"},
    {n:"06",t:"Audio Mixing & Sound Design",d:"15:10",l:"Intermediate"},
    {n:"07",t:"AI Enhancement Studio Deep Dive",d:"20:30",l:"Advanced"},
    {n:"08",t:"Render Settings & Export Optimization",d:"8:15",l:"Beginner"},
  ];
  const lc = { Beginner:"#22c55e", Intermediate:"#f59e0b", Advanced:"#ef4444" };
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>LEARNING CENTER</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:22 }}>TUTORIALS</h1>
        {tuts.map(t => (
          <div key={t.n} onClick={() => window.open("https://youtube.com","_blank")}
            style={{ ...Scard(), marginBottom:10, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", transition:"border-color .2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = GOLDDIM}
            onMouseLeave={e => e.currentTarget.style.borderColor = `${GOLDDIM}44`}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <span style={{ fontFamily:"'Cinzel',serif", color:GOLD, fontSize:18, fontWeight:900, minWidth:30 }}>{t.n}</span>
              <div>
                <div style={{ color:WHITE, fontWeight:800, fontSize:14 }}>{t.t}</div>
                <div style={{ color:WHITE, fontSize:11, marginTop:2, fontWeight:600 }}>{t.d} · Opens on YouTube</div>
              </div>
            </div>
            <span style={{ background: lc[t.l]+"22", border:`1px solid ${lc[t.l]}`, color:lc[t.l], borderRadius:4, padding:"3px 10px", fontSize:10, fontWeight:700, flexShrink:0 }}>{t.l.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function P20() {
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>LEGAL</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:4 }}>TERMS OF SERVICE & DISCLAIMER</h1>
        <div style={{ color:WHITE, fontSize:11, marginBottom:22, fontWeight:600 }}>Effective: March 2026 · MandaStrong Studio LLC</div>
        <div style={{ ...Scard(), marginBottom:18 }}>
          <h2 style={{ color:GOLD, fontWeight:900, fontSize:18, marginBottom:12 }}>TERMS OF SERVICE</h2>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, margin:0 }}>By accessing or using MandaStrong Studio, you agree to be legally bound by these Terms of Service. These Terms constitute a binding agreement between you and MandaStrong Studio LLC. Subscriptions bill monthly and auto-renew unless cancelled. All payments processed via Stripe. Studio Plan subscribers receive full commercial rights. You retain ownership of all media you upload. For support contact MandaStrong1.Etsy.com or Agent Grok on Page 21.</p>
        </div>
        <div style={{ ...Scard() }}>
          <h2 style={{ color:GOLD, fontWeight:900, fontSize:18, marginBottom:12 }}>DISCLAIMER</h2>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, margin:0 }}>MandaStrong Studio is provided "as is" without warranties of any kind. To the fullest extent permitted by law, MandaStrong Studio LLC shall not be liable for any indirect or consequential damages. AI-generated content is produced algorithmically — users are solely responsible for reviewing all outputs. A portion of revenue supports veterans' mental health and anti-bullying education.</p>
        </div>
      </div>
    </div>
  );
}

function P21() {
  const [msgs, setMsgs] = useState([{ role:"assistant", content:"Ask me anything about your production." }]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const quickQ = ["How do I export in 8K?","What AI tools do you have?","How does the timeline work?","Tell me about pricing"];
  useEffect(() => { bottomRef.current && bottomRef.current.scrollIntoView({ behavior:"smooth" }); }, [msgs]);
  const send = async () => {
    if (!inp.trim()) return;
    const q = inp.trim(); setInp(""); setLoading(true);
    setMsgs(p => [...p, { role:"user", content:q }]);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json", "anthropic-dangerous-direct-browser-access":"true" },
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:800,
          system:"You are Agent Grok, 24/7 assistant for MandaStrong Studio — a professional cinema AI platform with 600+ tools, 8K export, 3-hour films, plans $20/$30/$50/mo with 7-day free trial. Be helpful and concise.",
          messages: [...msgs.filter(m => m.role !== "system"), { role:"user", content:q }] })
      });
      const d = await r.json();
      setMsgs(p => [...p, { role:"assistant", content: d.content && d.content[0] ? d.content[0].text : "Let me help!" }]);
    } catch(e) { setMsgs(p => [...p, { role:"assistant", content:"Connect API key to activate Agent Grok." }]); }
    setLoading(false);
  };
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:22 }}>
          <div style={{ width:56, height:56, background:`linear-gradient(135deg,${GOLDDIM},${GOLD})`, borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", fontFamily:"'Cinzel',serif", fontSize:28, fontWeight:900, color:"#000" }}>G</div>
          <h1 style={{ ...Sh1, fontSize:26 }}>AGENT GROK</h1>
          <div style={{ color:WHITE, fontSize:10, letterSpacing:2, fontWeight:700 }}>24/7 PRODUCTION SUPPORT</div>
          <div style={{ color:"#22c55e", fontSize:10, letterSpacing:2, marginTop:4 }}>● ONLINE · BUILD 2026.03.15</div>
        </div>
        <div style={{ ...Scard(), height:300, overflowY:"auto", marginBottom:12, display:"flex", flexDirection:"column", gap:10, padding:14 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ padding:"11px 14px", borderRadius:4, background: m.role==="user" ? "rgba(212,168,71,0.1)" : "rgba(26,82,118,0.2)", borderLeft:`3px solid ${m.role==="user" ? GOLDDIM : "#2980b9"}` }}>
              <span style={{ fontSize:9, color:GOLD, display:"block", marginBottom:4, fontWeight:800, letterSpacing:1 }}>{m.role==="user" ? "YOU" : "AGENT GROK"}</span>
              <span style={{ color:WHITE, fontSize:14, lineHeight:1.7 }}>{m.content}</span>
            </div>
          ))}
          {loading && <div style={{ padding:"11px 14px", background:"rgba(26,82,118,0.2)", borderLeft:"3px solid #2980b9", borderRadius:4, color:WHITE, fontSize:13 }}>Agent Grok is thinking...</div>}
          <div ref={bottomRef} />
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:10 }}>
          {quickQ.map(q => <button key={q} onClick={() => setInp(q)} style={{ ...Sbtn("out", true), fontSize:11 }}>{q}</button>)}
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <textarea value={inp} onChange={e => setInp(e.target.value)}
            onKeyDown={e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Ask Agent Grok anything about your production..."
            style={{ flex:1, height:52, resize:"none", padding:"12px 14px", fontSize:14, background:BG3, border:`1px solid ${GOLDDIM}`, color:WHITE, borderRadius:4, outline:"none", lineHeight:1.5 }} />
          <button onClick={send} disabled={loading||!inp.trim()} style={{ ...Sbtn("gold", false), height:52, padding:"0 20px", opacity: loading||!inp.trim() ? 0.5 : 1 }}>▶ SEND</button>
        </div>
      </div>
    </div>
  );
}

function P22({ go }) {
  const [posts, setPosts] = useState([
    {id:1, user:"Sarah J.", title:"Epic Action Feature", icon:"🎬", views:2847, likes:1522},
    {id:2, user:"Mike Chen", title:"Family Documentary", icon:"📽", views:1256, likes:812},
    {id:3, user:"Emily R.", title:"Short Film Entry", icon:"🏆", views:3421, likes:2156},
    {id:4, user:"Alex T.", title:"Music Video Cut", icon:"🎵", views:5234, likes:4012},
  ]);
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>CREATOR NETWORK</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
          <h1 style={{ ...Sh1, fontSize:30, margin:0 }}>COMMUNITY HUB</h1>
          <button style={{ ...Sbtn("gold", false) }}>⬆ UPLOAD YOUR MOVIE</button>
        </div>
        {posts.map(p => (
          <div key={p.id} style={{ ...Scard(), marginBottom:10, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <span style={{ fontSize:26 }}>{p.icon}</span>
              <div>
                <div style={{ color:GOLD, fontWeight:900, fontSize:15 }}>{p.title}</div>
                <div style={{ color:WHITE, fontSize:11, fontWeight:600 }}>by {p.user}</div>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <span style={{ color:WHITE, fontSize:12, fontWeight:700 }}>👁 {p.views.toLocaleString()}</span>
              <span style={{ color:WHITE, fontSize:12, fontWeight:700 }}>❤️ {p.likes.toLocaleString()}</span>
              <button onClick={() => setPosts(ps => ps.map(x => x.id===p.id ? { ...x, likes:x.likes+1 } : x))} style={{ ...Sbtn("out", true) }}>POST</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function P23({ go }) {
  return (
    <div style={{ ...Spage, padding:"30px 40px 80px" }}>
      <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}>
        <h1 style={{ fontFamily:"'Cinzel',serif", color:GOLD, fontSize:"clamp(22px,3.5vw,32px)", fontWeight:900, letterSpacing:4, textShadow:`0 0 40px ${GOLD}99`, marginBottom:16 }}>THAT'S ALL FOLKS</h1>
        <div style={{ height:2, background:`linear-gradient(90deg,transparent,${GOLD},transparent)`, marginBottom:20 }} />
        <div style={{ background:"#000", borderRadius:4, overflow:"hidden", marginBottom:24, aspectRatio:"16/9", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ textAlign:"center", color:WHITE }}>
            <div style={{ fontSize:40, marginBottom:8 }}>🎬</div>
            <div style={{ fontSize:12, color:WHITE, fontWeight:700 }}>thatsallfolks.mp4</div>
          </div>
        </div>
        <div style={{ ...Scard(), textAlign:"left", marginBottom:20 }}>
          <h2 style={{ color:GOLD, fontWeight:900, fontSize:17, textAlign:"center", marginBottom:14 }}>✦ A SPECIAL THANK YOU ✦</h2>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, marginBottom:12 }}>Dear Creator,</p>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, marginBottom:12 }}>From the bottom of my heart — <strong style={{ color:GOLD }}>thank you.</strong> Whether you're here to capture precious family memories, tell a story that's lived rent-free in your head for years, or simply explore what's possible when creativity meets technology, you chose to do it with MandaStrong Studio. That means everything.</p>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, marginBottom:12 }}>I built this platform because I believe that <strong style={{ color:GOLD }}>storytelling should have no gatekeepers.</strong> You don't need a film school degree or a Hollywood budget. You just need a story worth telling — and now you have 600+ professional tools to help you tell it.</p>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, marginBottom:12 }}>Every subscription supports <strong style={{ color:GOLD }}>veterans' mental health initiatives</strong> and <strong style={{ color:GOLD }}>school anti-bullying programs</strong> — causes deeply personal to me as the author of <em>Doxy the School Bully.</em> When you create here, you're helping build a kinder world.</p>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, marginBottom:12 }}>Together, we are building a community of creators who use their talents to spread kindness, understanding, and hope. Your creativity and passion inspire positive change in the world. Through your films and stories, you have the power to educate, inspire, and bring awareness to critical issues like bullying prevention, social skills development, and humanity's collective growth.</p>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, marginBottom:4 }}>With gratitude and cinematic love,</p>
          <p style={{ color:GOLD, fontWeight:900, fontSize:15, marginBottom:4 }}>— AMANDA STRONG</p>
          <p style={{ color:WHITE, fontSize:12 }}>Founder, MandaStrong Studio &nbsp;·&nbsp; Author of <em>Doxy the School Bully</em><br/>MandaStrong1.Etsy.com</p>
        </div>
        <div style={{ ...Scard(), textAlign:"left", marginBottom:20 }}>
          <h2 style={{ color:GOLD, fontWeight:900, fontSize:15, letterSpacing:2, marginBottom:14 }}>OUR MISSION</h2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {[
              {ic:"🎬",t:"EMPOWER CREATORS",d:"600+ AI tools making professional filmmaking accessible to everyone."},
              {ic:"🛡",t:"PROTECT THE YOUNG",d:"Revenue funds school anti-bullying programs, inspired by Doxy the School Bully."},
              {ic:"🏅",t:"SUPPORT VETERANS",d:"We fund mental health services for veterans — because they deserve the best."},
              {ic:"🌐",t:"BUILD COMMUNITY",d:"The Creator Network connects filmmakers worldwide to share and grow."},
            ].map(m => (
              <div key={m.t} style={{ background:BG2, border:`2px solid ${GOLDDIM}66`, borderRadius:4, padding:14 }}>
                <div style={{ fontSize:22, marginBottom:6 }}>{m.ic}</div>
                <div style={{ color:GOLD, fontWeight:900, fontSize:12, letterSpacing:1, marginBottom:5 }}>{m.t}</div>
                <div style={{ color:WHITE, fontSize:12, lineHeight:1.7 }}>{m.d}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={() => window.open("https://MandaStrong1.Etsy.com","_blank")} style={{ ...Sbtn("out", false) }}>VISIT ETSY STORE</button>
          <button onClick={() => window.close()} style={{ ...Sbtn("gold", false) }}>EXIT APP</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState({ name:"Guest", plan:"Guest", isAdmin:false });
  const [mediaLib, setMediaLib] = useState([]);
  const [timeline, setTimeline] = useState({});
  const [rendered, setRendered] = useState(null);
  const go = p => { setPage(p); window.scrollTo(0,0); };

  const pages = {
    1:  <P1 go={go} />,
    2:  <P2 go={go} />,
    3:  <P3 go={go} />,
    4:  <P4 go={go} setUser={setUser} />,
    5:  <ToolPage title="WRITING TOOLS" subtitle="AI WORKSTATION 01 — WRITING" tools={WRITING} />,
    6:  <ToolPage title="VOICE TOOLS" subtitle="AI WORKSTATION 02 — VOICE" tools={VOICE} />,
    7:  <ToolPage title="IMAGE TOOLS" subtitle="AI WORKSTATION 03 — IMAGE" tools={IMAGE_T} />,
    8:  <ToolPage title="VIDEO TOOLS" subtitle="AI WORKSTATION 04 — VIDEO" tools={VIDEO_T} />,
    9:  <ToolPage title="MOTION & VFX" subtitle="AI WORKSTATION 05 — MOTION" tools={MOTION} />,
    10: <ToolPage title="ENHANCEMENT STUDIO" subtitle="AI WORKSTATION 06 — ENHANCE" tools={MOTION} />,
    11: <P11 mediaLib={mediaLib} setMediaLib={setMediaLib} />,
    12: <P12 go={go} mediaLib={mediaLib} />,
    13: <P13 go={go} mediaLib={mediaLib} timeline={timeline} setTimeline={setTimeline} />,
    14: <P14 />,
    15: <P15 />,
    16: <P16 go={go} timeline={timeline} setRendered={setRendered} />,
    17: <P17 go={go} rendered={rendered} mediaLib={mediaLib} />,
    18: <P18 rendered={rendered} mediaLib={mediaLib} />,
    19: <P19 />,
    20: <P20 />,
    21: <P21 />,
    22: <P22 go={go} />,
    23: <P23 go={go} />,
  };

  return (
    <div style={{ background:BG, minHeight:"100vh", fontFamily:"'Barlow Condensed','Rajdhani',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Rajdhani:wght@400;600;700;800;900&family=Barlow+Condensed:wght@400;600;700;800;900&family=Rajdhani:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      <SPARKLE />
      <Header page={page} go={go} setMenuOpen={setMenuOpen} user={user} />
      {menuOpen && <QuickAccessMenu go={go} onClose={() => setMenuOpen(false)} user={user} />}
      <div style={{ minHeight:"calc(100vh - 116px)" }}>{pages[page] || <P1 go={go} />}</div>
      <Footer page={page} go={go} />
    </div>
  );
}
import { useState, useRef, useEffect } from "react";

const GOLD = "#d4a847";
const GOLDDIM = "#8a6d22";
const BG = "#0d0f12";
const BG2 = "#141820";
const BG3 = "#1c2333";
const WHITE = "#ffffff";
const TEXT2 = "#cccccc";
const TEXT3 = "#999999";
const TOTAL = 23;
const SPARKLE = () => (<div style={{ position:"fixed", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${GOLD},transparent)`, zIndex:300, animation:"sparkle 1.5s ease-in-out infinite", pointerEvents:"none" }}><style>{`@keyframes sparkle{0%,100%{opacity:.3}50%{opacity:1}}`}</style></div>);

const STRIPE = {
  basic:  "https://buy.stripe.com/test_basic",
  pro:    "https://buy.stripe.com/test_pro",
  studio: "https://buy.stripe.com/test_studio",
};

const Sbtn = (v, sm) => ({
  background: v==="gold" ? `linear-gradient(135deg,${GOLDDIM},${GOLD})` : "transparent",
  border: v==="gold" ? "none" : `1px solid ${GOLDDIM}`,
  color: v==="gold" ? "#000" : GOLD,
  borderRadius:4, fontWeight:800,
  padding: sm ? "5px 12px" : "10px 22px",
  fontSize: sm ? 11 : 13,
  cursor:"pointer", letterSpacing:1, textTransform:"uppercase",
});
const Spage = { minHeight:"100vh", background:BG, color:WHITE, fontFamily:"'Barlow Condensed','Rajdhani',sans-serif", paddingBottom:70 };
const Sh1 = { fontFamily:"'Cinzel',serif", color:GOLD, letterSpacing:4, textTransform:"uppercase", margin:0 };
const Scard = (extra) => ({ background:BG3, border:`2px solid ${GOLDDIM}66`, borderRadius:4, padding:20, ...(extra||{}) });

const WRITING = ["Script to Movie","Text to Script","Story to Script","Prompt to Story","Script to Screenplay","Feature Film Script","Short Film Script","TV Pilot Script","Documentary Script","Commercial Script","Explainer Script","YouTube Script","Podcast Script","Social Media Script","Plot Generator","Story Outline","Three Act Structure","Five Act Structure","Beat Sheet Builder","Character Bio Writer","Character Arc Builder","Subplot Generator","Plot Twist Generator","Opening Hook Creator","Climax Designer","Logline Generator","Synopsis Writer","Treatment Writer","Scene Writer","Text to Dialogue","Dialogue Generator","Narration Writer","Voiceover Script","Interview Script","Action Line Writer","Scene Heading Tool","Parenthetical Generator","Script Formatter","Dialogue Tightener","Script Timer","Word Counter","Page Counter","Reading Time Estimator","Format Checker","Grammar Polish","Spell Checker","Continuity Checker","Plot Hole Detector","Tone Checker","Genre Classifier"];
const VOICE = ["Upload Own Voice","Record My Voice","Clone My Voice","Text to Voice","Text to Speech","Text to Narration","Text to Audiobook","Text to Voiceover","Voice Cloning","Voice to Voice","AI Voice Actor","Neural Voice Generator","Emotion Voice Synth","Trailer Voice Generator","Documentary Voice","Commercial Voice","Character Voice Creator","Accent Generator","Multi Language Voice","Voice Translator","Lip Sync AI","Dialogue Synth","Audiobook Creator","Podcast Voice","Radio DJ Voice","Sports Commentary Voice","ASMR Creator","Whisper Generator","Meditation Voice","Alien Voice","Deep Voice Generator","Robot Voice","Monster Voice","Child Voice","Elderly Voice","Male to Female Voice","Female to Male Voice","Speed Controller","Tone Adjuster","Pitch Controller","Volume Normalizer","Clarity Booster","Voice Denoiser","Echo Remover","Reverb Remover","Background Noise Remover","Voice EQ Studio"];
const IMAGE_T = ["Text to Image","Prompt to Image","Image to Image","Image Upscaler","Image Generator","AI Art Generator","Photo to Painting","Sketch to Image","Wireframe to Image","Background Generator","Background Remover","Sky Replacer","Object Remover","Face Generator","Character Design","Portrait Generator","Avatar Creator","Product Image Generator","Architecture Visualizer","Interior Design Generator","Landscape Generator","Abstract Art Generator","Logo Generator","Icon Creator","Texture Generator","Pattern Maker","Color Palette Generator","Style Transfer","Photo Enhancer","Photo Restorer","Old Photo Colorizer","Black & White to Color","Image Denoiser","Sharpness Enhancer","Clarity Booster","Detail Enhancer","HDR Image Creator","Exposure Fixer","White Balance AI","Color Grading Studio","LUT Creator","Tone Mapper","Contrast Adjuster","Brightness Tool","Saturation Engine","Hue Shift","Temperature Control","Vignette Tool"];
const VIDEO_T = ["Text to Video","Image to Video","Video to Video","AI Video Creator","AI Film Generator","Video Upscaler","AI Video Generator 4K","Set to Video","Video Colorizer","Color Grading Pro","Fast Look Generator","Film Restoration","Time Lapse Creator","Video Trimmer","Background Remover","Digital Human Video","Rotoscope Video","Animation Creator","Puppet Animator","Motion Capture","Character Animator","Video Stabilizer","Video Compressor","Cinematic LUT","Black & White Film","Film Texture","VHS Effect","Glitch Effect","Quick Film Creator","Opening Slate","Time Freeze","Bullet Time Effect","Rain Simulation","Snow Simulation","Smoke Generator","Fire Simulation","Particle System","AI Progressive Video","4K Upscaling"];
const MOTION = ["AI 8K Upscaling","AI 4K Upscaling","Video Super Resolution","Frame Interpolation","Video Denoiser","Noise Reduction","Grain Remover","Artifact Remover","Scratch Remover","Video Sharpener","Clarity Booster","Detail Enhancer","Edge Enhancement","Texture Boost","White Balance AI","Color Correction","Auto Color Balance","Color Match Pro","Color Grading AI","Cinematic Color Grade","Film Stock Emulation","LUT Generator","Tone Mapping Pro","HDR Enhancement","Deep HDR Boost","Dynamic Range Expansion","Shadow Recovery","Highlight Recovery","Black Point Calibration","Gamma Correction","Contrast Enhancer","Brightness Optimizer","Saturation Booster","Smart Saturation","Face Enhancement","Face Retouch","Eye Enhancer","Teeth Whitener","Skin Tone Enhancer","Background Enhancer","Sky Enhancer","Landscape Enhancer","Night Video Enhancer","Low Light Clarity","Motion Stabilization","Shake Remover","Rolling Shutter Fix"];

const NAV_PAGES = [
  {p:1,l:"Home"},{p:2,l:"Platform"},{p:3,l:"Examples"},
  {p:4,l:"Login / Pricing"},{p:5,l:"Writing Tools"},{p:6,l:"Voice Tools"},
  {p:7,l:"Image Tools"},{p:8,l:"Video Tools"},{p:9,l:"Motion & VFX"},
  {p:10,l:"Enhancement"},{p:11,l:"Upload Media"},{p:12,l:"Editor Suite"},
  {p:13,l:"Timeline Editor"},{p:14,l:"Enhancement Studio"},{p:15,l:"Audio Mixer"},
  {p:16,l:"Render Engine"},{p:17,l:"Film Preview"},{p:18,l:"Export & Distribute"},
  {p:19,l:"Tutorials"},{p:20,l:"Terms & Disclaimer"},{p:21,l:"Agent Grok"},
  {p:22,l:"Community Hub"},{p:23,l:"That's All Folks"},
];

function QuickAccessMenu({ go, onClose, user }) {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, display:"flex" }}>
      <div style={{ width:260, background:BG2, borderRight:`2px solid ${GOLD}`, height:"100vh", overflowY:"auto", padding:20, boxShadow:`4px 0 40px ${GOLD}44` }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <span style={{ fontFamily:"'Cinzel',serif", color:GOLD, fontSize:14, fontWeight:900, letterSpacing:2 }}>QUICK ACCESS</span>
          <button onClick={onClose} style={{ background:"none", border:"none", color:GOLD, fontSize:22, cursor:"pointer" }}>✕</button>
        </div>
        <div style={{ background:`linear-gradient(135deg,${GOLDDIM},${GOLD})`, borderRadius:4, padding:"10px 14px", marginBottom:8, textAlign:"center" }}>
          <div style={{ color:"#000", fontWeight:900, fontSize:11, letterSpacing:2 }}>MANDA STRONG STUDIO</div>
          <div style={{ color:"#000", fontSize:10 }}>Cinema Intelligence Platform 2026</div>
        </div>
        {user && user.plan && (
          <div style={{ background:BG3, border:`1px solid ${GOLDDIM}`, borderRadius:4, padding:"8px 12px", marginBottom:12, textAlign:"center" }}>
            <div style={{ color:WHITE, fontSize:9, letterSpacing:1 }}>CURRENT PLAN</div>
            <div style={{ color:GOLD, fontWeight:800, fontSize:15 }}>{user.plan}</div>
          </div>
        )}
        {NAV_PAGES.map(i => (
          <button key={i.p} onClick={() => { go(i.p); onClose(); }}
            style={{ width:"100%", textAlign:"left", background:"none", border:"none", color:WHITE, padding:"9px 10px", borderRadius:4, cursor:"pointer", fontSize:13, fontWeight:700, display:"block", marginBottom:1 }}
            onMouseEnter={e => { e.currentTarget.style.background = BG3; e.currentTarget.style.color = GOLD; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = WHITE; }}>
            {i.p}. {i.l}
          </button>
        ))}
      </div>
      <div style={{ flex:1, background:"rgba(0,0,0,0.65)" }} onClick={onClose} />
    </div>
  );
}

function Header({ page, go, setMenuOpen, user }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  useEffect(() => {
    const handler = e => { e.preventDefault(); setDeferredPrompt(e); };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);
  const installApp = async () => {
    if (deferredPrompt) { deferredPrompt.prompt(); await deferredPrompt.userChoice; setDeferredPrompt(null); }
    else alert("To install:\n📱 Mobile: Share → Add to Home Screen\n💻 Desktop: Click ⊕ in address bar");
  };
  return (
    <header style={{ position:"sticky", top:0, zIndex:500, background:BG2, borderBottom:`2px solid ${GOLD}`, padding:"0 14px", height:56, display:"flex", alignItems:"center", gap:10, boxShadow:`0 2px 24px ${GOLDDIM}33` }}>
      <button onClick={() => setMenuOpen(true)} style={{ background:"none", border:`1px solid ${GOLDDIM}`, color:GOLD, borderRadius:4, width:36, height:36, cursor:"pointer", fontSize:18, flexShrink:0 }}>☰</button>
      <div onClick={() => go(1)} style={{ cursor:"pointer", flexShrink:0 }}>
        <div style={{ fontFamily:"'Cinzel',serif", color:GOLD, fontSize:14, fontWeight:900, letterSpacing:2, lineHeight:1 }}>MANDA STRONG</div>
        <div style={{ fontFamily:"'Cinzel',serif", color:GOLD, fontSize:10, letterSpacing:4 }}>STUDIO</div>
      </div>
      <div style={{ flex:1, overflow:"hidden", margin:"0 8px" }}>
        <div style={{ color:WHITE, fontSize:10, letterSpacing:1, whiteSpace:"nowrap", {animation:"ticker 22s linear infinite", color:"#999999" }}>
          ✦ Special Offer: New Studio Plan Subscribers Receive 7-Day Free Trial &nbsp;·&nbsp; 600+ AI TOOLS &nbsp;·&nbsp; 8K EXPORT &nbsp;·&nbsp; UP TO 3-HOUR FILMS &nbsp;·&nbsp; PROFESSIONAL CINEMA SYNTHESIS &nbsp;·&nbsp; ✦ Special Offer: New Studio Plan Subscribers Receive 7-Day Free Trial &nbsp;·&nbsp; 600+ AI TOOLS &nbsp;·&nbsp; 8K EXPORT &nbsp;·&nbsp;
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
        <div style={{ color:"#22c55e", fontSize:12, letterSpacing:2, fontWeight:800 }}>● SYSTEM ONLINE</div>
        <div onClick={() => go(21)} style={{ width:40, height:40, background:`linear-gradient(135deg,${GOLDDIM},${GOLD})`, borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontFamily:"'Cinzel',serif", fontSize:22, fontWeight:900, color:"#000", boxShadow:`0 0 12px ${GOLD}66` }}>G</div>
      </div>
      <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </header>
  );
}

function Footer({ page, go }) {
  return (
    <footer style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:400, background:BG2, borderTop:`1px solid ${GOLDDIM}44`, padding:"7px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <span style={{ color:GOLD, fontSize:11, letterSpacing:1, fontWeight:700 }}>MANDASTRONG STUDIO 2026 · PROFESSIONAL CINEMA SYNTHESIS · MandaStrong1.Etsy.com</span>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <button onClick={() => go(Math.max(1, page-1))} disabled={page===1} style={{ ...Sbtn("out", true), opacity:page===1?0.3:1 }}>◀ BACK</button>
        <span style={{ color:GOLD, fontSize:11, fontWeight:700 }}>PAGE {page} / {TOTAL}</span>
        <button onClick={() => go(Math.min(TOTAL, page+1))} disabled={page===TOTAL} style={{ ...Sbtn("gold", true), opacity:page===TOTAL?0.3:1 }}>NEXT ▶</button>
      </div>
      <span style={{ color:"#22c55e", fontSize:11, fontWeight:700 }}>● AUTOSAVE ON</span>
    </footer>
  );
}

function ToolCard({ name }) {
  const fileRef = useRef(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const doAI = async () => {
    setLoading(true); setResult("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json", "anthropic-dangerous-direct-browser-access":"true" },
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:400,
          messages:[{ role:"user", content:`MandaStrong Studio AI tool: "${name}". Generate a short professional cinematic result sample.` }] })
      });
      const d = await res.json();
      setResult(d.content && d.content[0] ? d.content[0].text : "Generated!");
    } catch(e) { setResult("AI ready — add API key to activate."); }
    setLoading(false);
  };
  return (
    <div style={{ background:BG2, border:`1px solid ${GOLDDIM}44`, borderRadius:4, padding:"11px 10px", display:"flex", flexDirection:"column", gap:7, transition:"border-color .2s" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = GOLDDIM}
      onMouseLeave={e => e.currentTarget.style.borderColor = `${GOLDDIM}22`}>
      <span style={{ color:WHITE, fontSize:12, fontWeight:800 }}>{name}</span>
      <div style={{ display:"flex", gap:4 }}>
        <button onClick={() => fileRef.current && fileRef.current.click()} style={{ fontSize:9, padding:"3px 7px", background:BG3, border:`2px solid ${GOLDDIM}66`, color:WHITE, borderRadius:4, cursor:"pointer", fontWeight:700, letterSpacing:1 }}>UPLOAD</button>
        <button style={{ fontSize:9, padding:"3px 7px", background:BG3, border:`2px solid ${GOLDDIM}66`, color:WHITE, borderRadius:4, cursor:"pointer", fontWeight:700, letterSpacing:1 }}>PASTE</button>
        <button onClick={doAI} style={{ fontSize:9, padding:"3px 8px", background:GOLDDIM, border:`1px solid ${GOLD}`, color:"#000", borderRadius:4, cursor:"pointer", fontWeight:900 }}>{loading ? "..." : "AI ✦"}</button>
      </div>
      {result && <div style={{ color:"#aed6f1", fontSize:10, lineHeight:1.5, borderLeft:`2px solid ${GOLDDIM}`, paddingLeft:6 }}>{result.slice(0,100)}...</div>}
      <input ref={fileRef} type="file" style={{ display:"none" }} />
    </div>
  );
}

function ToolPage({ title, subtitle, tools }) {
  const [search, setSearch] = useState("");
  const filtered = tools.filter(t => t.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{ ...Spage }}>
      <div style={{ padding:"16px 20px 10px", borderBottom:`1px solid ${GOLDDIM}22`, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
        <div>
          <div style={{ fontSize:10, color:GOLD, letterSpacing:3, fontWeight:700 }}>{subtitle}</div>
          <h1 style={{ ...Sh1, fontSize:26, margin:0 }}>{title}</h1>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ position:"relative" }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${tools.length} tools...`}
              style={{ background:BG3, border:`1px solid ${GOLDDIM}`, borderRadius:4, padding:"7px 12px 7px 30px", color:WHITE, fontSize:12, outline:"none", width:200 }} />
            <span style={{ position:"absolute", left:9, top:"50%", transform:"translateY(-50%)", color:GOLD, fontSize:13 }}>🔍</span>
            {search && <button onClick={() => setSearch("")} style={{ position:"absolute", right:7, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:GOLD, cursor:"pointer", padding:0 }}>✕</button>}
          </div>
          <span style={{ color:WHITE, fontSize:11, fontWeight:700 }}>{filtered.length} TOOLS</span>
        </div>
      </div>
      <div style={{ padding:14, display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:8 }}>
        {filtered.map(t => <ToolCard key={t} name={t} />)}
      </div>
    </div>
  );
}

function P1({ go }) {
  return (
    <div style={{ ...Spage }}>
      <div style={{ background:"linear-gradient(180deg,#000408 0%,#0d0f12 100%)", padding:"56px 40px 36px", textAlign:"center", borderBottom:`2px solid ${GOLD}`, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
          {[...Array(60)].map((_,i) => (
            <div key={i} style={{ position:"absolute", width:i%3===0?2:1, height:i%3===0?2:1, background:GOLD, borderRadius:"50%", opacity:0.3+i%3*0.2, left:`${(i*17+7)%100}%`, top:`${(i*13+11)%100}%`, animation:`twinkle ${1.5+i%3}s ease-in-out ${i%4*0.5}s infinite` }} />
          ))}
        </div>
        <style>{`@keyframes twinkle{0%,100%{opacity:.15}50%{opacity:.9}}`}</style>
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ fontSize:9, color:TEXT3, letterSpacing:5, marginBottom:10 }}>CINEMA INTELLIGENCE PLATFORM · COMPETITION EDITION 2026</div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:"clamp(32px,6vw,52px)", fontWeight:900, color:GOLD, letterSpacing:6, lineHeight:1.1, textShadow:`0 0 60px ${GOLD}cc, 0 0 120px ${GOLD}55` }}>MANDA STRONG</div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:"clamp(32px,6vw,52px)", fontWeight:900, color:GOLD, letterSpacing:6, lineHeight:1.1, textShadow:`0 0 60px ${GOLD}cc, 0 0 120px ${GOLD}55`, marginBottom:10 }}>STUDIO</div>
          <div style={{ color:WHITE, fontSize:12, letterSpacing:2, marginBottom:20, fontWeight:700 }}>600+ AI TOOLS · 8K EXPORT · UP TO 3-HOUR FILMS</div>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => go(4)} style={{ ...Sbtn("gold", false), fontSize:15, padding:"14px 36px" }}>▶ START CREATING</button>
            <button onClick={() => go(4)} style={{ ...Sbtn("out", false), fontSize:15, padding:"14px 36px" }}>LOGIN / REGISTER</button>
          </div>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, padding:"24px 32px", maxWidth:860, margin:"0 auto" }}>
        {[["600+","AI Tools Across 6 Categories"],["8K","Cinema-Grade Export"],["3 HOURS","Maximum Film Duration"],["1TB","Cloud Storage Studio Plan"]].map(([v,l]) => (
          <div key={v} style={{ ...Scard(), textAlign:"center" }}>
            <div style={{ color:GOLD, fontFamily:"'Cinzel',serif", fontSize:26, fontWeight:900 }}>{v}</div>
            <div style={{ color:WHITE, fontSize:11, marginTop:4, fontWeight:600 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign:"center", padding:"0 32px 20px" }}>
        <button onClick={() => alert("To install MandaStrong Studio:\n📱 Mobile: Tap Share → Add to Home Screen\n💻 Desktop: Click ⊕ in your browser address bar")} style={{ ...Sbtn("out", true), fontSize:11 }}>⬇ Download As App</button>
      </div>
      <div style={{ background:BG3, borderTop:`1px solid ${GOLDDIM}22`, borderBottom:`1px solid ${GOLDDIM}22`, padding:"7px 0", overflow:"hidden" }}>
        <div style={{ whiteSpace:"nowrap", animation:"ticker 28s linear infinite", color:WHITE, fontSize:10, letterSpacing:1 }}>
          &nbsp;&nbsp;🎬 Special Offer: New Studio Plan Subscribers Receive 7-Day Free Trial &nbsp;·&nbsp; Professional AI Movie Creation Platform &nbsp;·&nbsp; MandaStrong1.Etsy.com &nbsp;·&nbsp; 600+ Tools &nbsp;·&nbsp; 8K Cinema Export &nbsp;·&nbsp; 🎬 Special Offer: New Studio Plan Subscribers Receive 7-Day Free Trial &nbsp;·&nbsp; Professional AI Movie Creation Platform &nbsp;·&nbsp;
        </div>
      </div>
    </div>
  );
}

function P2({ go }) {
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <div style={{ fontSize:10, color:GOLD, letterSpacing:3, marginBottom:6, fontWeight:700 }}>AI CREATOR PLATFORM</div>
        <h1 style={{ ...Sh1, fontSize:32, marginBottom:12 }}>MAKE AWESOME FAMILY MOVIES<br/>OR TURN YOUR DREAMS INTO REALITY</h1>
        <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, maxWidth:700, marginBottom:28 }}>MandaStrong Studio combines the power of 600+ professional AI tools with an intuitive cinematic workspace — so anyone can create stunning short films, family videos, or feature-length productions up to 3 hours long. No film school required.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
          {[["600+","AI Tools"],["8K","Export Quality"],["3 HOURS","Max Duration"],["1TB","Cloud Storage"]].map(([v,l]) => (
            <div key={v} style={{ ...Scard(), textAlign:"center" }}>
              <div style={{ color:GOLD, fontFamily:"'Cinzel',serif", fontSize:24, fontWeight:900 }}>{v}</div>
              <div style={{ color:WHITE, fontSize:11, marginTop:4, fontWeight:600 }}>{l}</div>
            </div>
          ))}
        </div>
        <button onClick={() => go(4)} style={{ ...Sbtn("gold", false) }}>Start Creating</button>
      </div>
    </div>
  );
}

function P3({ go }) {
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <div style={{ fontSize:10, color:GOLD, letterSpacing:3, marginBottom:6, fontWeight:700 }}>SHOWCASE</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:6 }}>EXAMPLES MADE BY MANDASTRONG STUDIO</h1>
        <div style={{ background:"#7f1d1d", border:"1px solid #ef4444", display:"inline-block", borderRadius:4, padding:"3px 10px", color:"#ef4444", fontSize:10, fontWeight:700, marginBottom:24 }}>● ADMIN ACTIVE</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:28 }}>
          {[{s:1,d:"A documentary film — MandaStrong Studio x Doxy"},{s:2,d:"A plain-English guide to artificial intelligence"}].map(f => (
            <div key={f.s} style={{ ...Scard() }}>
              <div style={{ background:"#000", borderRadius:4, height:160, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12, fontSize:40, color:WHITE }}>🎬</div>
              <div style={{ fontSize:9, color:GOLD, letterSpacing:2, fontWeight:700 }}>VIEWER 0{f.s}</div>
              <div style={{ color:WHITE, fontSize:12, marginBottom:12, fontWeight:600 }}>{f.d}</div>
              <button style={{ ...Sbtn("out", true) }}>⬆ UPLOAD FILM</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function P4({ go, setUser }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const inp = { width:"100%", background:BG, border:`1px solid ${GOLDDIM}`, borderRadius:4, padding:"10px 12px", color:WHITE, fontSize:14, marginBottom:10, outline:"none", boxSizing:"border-box" };
  const login = () => {
    if (email === "woolleya129@gmail.com" && pass === "Mangler1970!!") {
      setUser({ name:"Amanda", plan:"Studio", isAdmin:true }); go(5);
    } else {
      setUser({ name: email.split("@")[0] || "Creator", plan:"Creator", isAdmin:false }); go(5);
    }
  };
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:20, marginBottom:40 }}>
          <div style={{ ...Scard() }}>
            <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:6, fontWeight:700 }}>EXISTING USER</div>
            <h2 style={{ ...Sh1, fontSize:20, marginBottom:18 }}>SIGN IN</h2>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" style={inp} />
            <input value={pass} onChange={e => setPass(e.target.value)} type="password" placeholder="Password" style={{ ...inp, marginBottom:16 }} />
            <button onClick={login} style={{ ...Sbtn("gold", false), width:"100%", padding:"13px" }}>SIGN IN TO STUDIO</button>
            <div style={{ textAlign:"center", marginTop:8, color:WHITE, fontSize:10 }}>Secured with 256-bit encryption</div>
          </div>
          <div style={{ ...Scard(), border:"2px solid #22c55e", position:"relative" }}>
            <div style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)", background:"#22c55e", color:"#000", borderRadius:4, padding:"3px 14px", fontSize:10, fontWeight:900, whiteSpace:"nowrap" }}>🎉 7-DAY FREE TRIAL</div>
            <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:6, marginTop:10, fontWeight:700 }}>NEW CREATOR</div>
            <h2 style={{ ...Sh1, fontSize:20, marginBottom:18 }}>CREATE ACCOUNT</h2>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" style={inp} />
            <input value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder="Email address" style={{ ...inp, marginBottom:16 }} />
            <button onClick={() => { setUser({ name: name||"Creator", plan:"Studio Trial", isAdmin:false }); window.open(STRIPE.studio, "_blank"); go(5); }}
              style={{ width:"100%", padding:"13px", background:"#22c55e", border:"none", color:"#000", borderRadius:4, fontWeight:900, fontSize:14, cursor:"pointer", letterSpacing:1 }}>START FREE TRIAL — $0</button>
            <div style={{ textAlign:"center", marginTop:8, color:WHITE, fontSize:10 }}>Studio Plan Free for 7 Days · No Credit Card</div>
          </div>
          <div style={{ ...Scard(), textAlign:"center" }}>
            <div style={{ fontSize:40, marginBottom:10 }}>👁</div>
            <h2 style={{ ...Sh1, fontSize:18, marginBottom:10 }}>EXPLORE FIRST</h2>
            <p style={{ color:WHITE, fontSize:13, lineHeight:1.7, marginBottom:20 }}>Browse all 600+ AI tools and see the full platform before committing. No account required.</p>
            <button onClick={() => { setUser({ name:"Guest", plan:"Guest", isAdmin:false }); go(5); }} style={{ ...Sbtn("out", false), width:"100%" }}>BROWSE AS GUEST</button>
          </div>
        </div>
        <h2 style={{ ...Sh1, fontSize:26, textAlign:"center", marginBottom:24 }}>SUBSCRIPTION PLANS</h2>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:18 }}>
          {[
            {t:"CREATOR PLAN", p:"20", link:STRIPE.basic, f:["HD Export 1080p","100 AI Tools","10GB Storage","Email Support","Basic Timeline"], pop:false, trial:false},
            {t:"PRO PLAN", p:"30", link:STRIPE.pro, f:["4K Export","300 AI Tools","100GB Storage","Priority Support","Full Timeline","Commercial License"], pop:true, trial:false},
            {t:"STUDIO PLAN", p:"50", link:STRIPE.studio, f:["8K Export","600+ AI Tools","1TB Storage","24/7 Support","Full Rights","API Access","Collaboration","7-Day Free Trial"], pop:false, trial:true},
          ].map((plan, i) => (
            <div key={plan.t} style={{ ...Scard(), border: plan.pop ? `2px solid ${GOLD}` : `1px solid ${GOLDDIM}33`, position:"relative" }}>
              {plan.pop && <div style={{ position:"absolute", top:-11, left:"50%", transform:"translateX(-50%)", background:GOLD, color:"#000", borderRadius:4, padding:"2px 12px", fontSize:10, fontWeight:900, whiteSpace:"nowrap" }}>MOST POPULAR</div>}
              {plan.trial && <div style={{ position:"absolute", top:-11, right:12, background:"#22c55e", color:"#000", borderRadius:4, padding:"2px 10px", fontSize:10, fontWeight:900, whiteSpace:"nowrap" }}>🎉 FREE TRIAL</div>}
              <div style={{ color:WHITE, fontSize:10, letterSpacing:2, fontWeight:700 }}>{plan.t}</div>
              <div style={{ color:GOLD, fontFamily:"'Cinzel',serif", fontSize:34, fontWeight:900, margin:"6px 0" }}>${plan.p}<span style={{ fontSize:13, color:WHITE }}>/mo</span></div>
              <div style={{ margin:"12px 0" }}>{plan.f.map(f => <div key={f} style={{ color:WHITE, fontSize:12, padding:"3px 0", borderBottom:`1px solid ${BG}` }}>✓ {f}</div>)}</div>
              <button onClick={() => window.open(plan.link, "_blank")} style={{ ...Sbtn(plan.trial ? "out" : "gold", false), width:"100%" }}>{plan.trial ? "START FREE TRIAL" : "SUBSCRIBE NOW"}</button>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", color:WHITE, fontSize:11, marginTop:14 }}>All plans include a 30-day money-back guarantee · Secure checkout via Stripe</div>
      </div>
    </div>
  );
}

function P11({ mediaLib, setMediaLib }) {
  const fileRef = useRef(null);
  const onFiles = files => {
    if (!files) return;
    const newA = Array.from(files).map(f => ({ id: Date.now()+Math.random(), name:f.name, type:f.type, file:f, url:URL.createObjectURL(f) }));
    setMediaLib(p => [...p, ...newA]);
  };
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div style={{ fontSize:10, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>ASSET INGESTION</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:4 }}>UPLOAD MEDIA</h1>
        <div style={{ color:WHITE, fontSize:14, marginBottom:22, fontWeight:700 }}>{mediaLib.length} ASSETS IN LIBRARY</div>
        <div onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = GOLD; }}
          onDragLeave={e => { e.currentTarget.style.borderColor = GOLDDIM; }}
          onDrop={e => { e.preventDefault(); onFiles(e.dataTransfer.files); e.currentTarget.style.borderColor = GOLDDIM; }}
          onClick={() => fileRef.current && fileRef.current.click()}
          style={{ border:`2px dashed ${GOLDDIM}`, borderRadius:4, padding:"56px 40px", textAlign:"center", cursor:"pointer", marginBottom:18, transition:"border-color .2s" }}>
          <div style={{ fontSize:40, marginBottom:10 }}>🎬</div>
          <div style={{ color:WHITE, fontWeight:800, fontSize:18, letterSpacing:2 }}>DRAG & DROP YOUR MEDIA HERE</div>
          <div style={{ color:WHITE, fontSize:13, marginTop:8 }}>Or click to browse · Video · Audio · Images</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:22 }}>
          {[["📁","BROWSE FILES"],["🖥","RECORD SCREEN"],["🔗","IMPORT FROM URL"]].map(([ic,lb]) => (
            <button key={lb} onClick={() => fileRef.current && fileRef.current.click()}
              style={{ ...Scard(), textAlign:"center", padding:18, cursor:"pointer", display:"block", border:`2px solid ${GOLDDIM}66` }}>
              <div style={{ fontSize:26, marginBottom:6 }}>{ic}</div>
              <div style={{ color:WHITE, fontSize:11, fontWeight:800, letterSpacing:1 }}>{lb}</div>
            </button>
          ))}
        </div>
        {mediaLib.length > 0 && (
          <div>
            <h3 style={{ color:GOLD, fontWeight:900, fontSize:14, letterSpacing:2, marginBottom:10 }}>MEDIA LIBRARY ({mediaLib.length})</h3>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:10 }}>
              {mediaLib.map(a => (
                <div key={a.id} style={{ ...Scard(), padding:10, position:"relative" }}>
                  {a.type.startsWith("video") ? <video src={a.url} style={{ width:"100%", borderRadius:4, marginBottom:6 }} /> :
                   a.type.startsWith("image") ? <img src={a.url} style={{ width:"100%", borderRadius:4, marginBottom:6 }} alt={a.name} /> :
                   <div style={{ height:70, background:BG, borderRadius:4, marginBottom:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>🎵</div>}
                  <div style={{ color:WHITE, fontSize:10, fontWeight:800, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.name}</div>
                  <button onClick={() => setMediaLib(p => p.filter(x => x.id !== a.id))}
                    style={{ position:"absolute", top:6, right:6, background:"#7f1d1d", border:"none", color:"#ef4444", borderRadius:4, width:18, height:18, cursor:"pointer", fontSize:10, padding:0 }}>✕</button>
                </div>
              ))}
            </div>
          </div>
        )}
        <input ref={fileRef} type="file" multiple accept="video/*,audio/*,image/*" onChange={e => onFiles(e.target.files)} style={{ display:"none" }} />
      </div>
    </div>
  );
}

function P12({ go, mediaLib }) {
  const [dur, setDur] = useState(90);
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <div style={{ fontSize:10, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>PRODUCTION HUB</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:4 }}>EDITOR SUITE</h1>
        <div style={{ color:WHITE, fontSize:14, marginBottom:24, fontWeight:600 }}>Your complete post-production workspace.</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:22 }}>
          {[
            {ic:"🗂", t:"MEDIA LIBRARY", d:`${mediaLib.length} assets uploaded`, p:11},
            {ic:"⏱", t:"TIMELINE EDITOR", d:"Multi-track video editing", p:13},
            {ic:"✨", t:"ENHANCEMENT STUDIO", d:"90+ AI enhancement tools", p:14},
            {ic:"🎵", t:"AUDIO MIXER", d:"4-channel professional mixing", p:15},
            {ic:"⚡", t:"RENDER ENGINE", d:"Up to 8K cinema output", p:16},
            {ic:"▶", t:"PREVIEW PLAYER", d:"Full-screen film playback", p:17},
          ].map(c => (
            <button key={c.t} onClick={() => go(c.p)}
              style={{ ...Scard(), textAlign:"left", cursor:"pointer", transition:"border-color .2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = GOLDDIM}
              onMouseLeave={e => e.currentTarget.style.borderColor = `${GOLDDIM}44`}>
              <div style={{ fontSize:30, marginBottom:8 }}>{c.ic}</div>
              <div style={{ color:GOLD, fontWeight:900, fontSize:13, letterSpacing:1 }}>{c.t}</div>
              <div style={{ color:WHITE, fontSize:11, marginTop:4, fontWeight:600 }}>{c.d}</div>
            </button>
          ))}
        </div>
        <div style={{ ...Scard() }}>
          <div style={{ color:GOLD, fontWeight:900, fontSize:12, letterSpacing:2, marginBottom:10 }}>MOVIE DURATION</div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            {[30,60,90,120,180].map(m => <button key={m} onClick={() => setDur(m)} style={{ ...Sbtn(dur===m?"gold":"out", true) }}>{m} MIN</button>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function P13({ go, mediaLib, timeline, setTimeline }) {
  const [tracks, setTracks] = useState(["VIDEO TRACK","AUDIO TRACK","TEXT / TITLES"]);
  const addTrack = () => setTracks(p => [...p, `TRACK ${p.length + 1}`]);
  const addToTrack = (idx, asset) => setTimeline(p => ({ ...p, [idx]: [...(p[idx]||[]), asset] }));
  return (
    <div style={{ ...Spage, padding:20 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14, flexWrap:"wrap", gap:10 }}>
        <div>
          <div style={{ fontSize:9, color:GOLD, letterSpacing:3, fontWeight:700 }}>EDITING WORKSPACE</div>
          <h1 style={{ ...Sh1, fontSize:26, margin:0 }}>TIMELINE EDITOR</h1>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={addTrack} style={{ ...Sbtn("out", true) }}>+ ADD TRACK</button>
          <button onClick={() => go(16)} style={{ ...Sbtn("gold", false) }}>→ RENDER</button>
          <button onClick={() => setTimeline({})} style={{ ...Sbtn("out", true) }}>CLEAR ALL</button>
        </div>
      </div>
      <div style={{ background:"#000", borderRadius:4, height:110, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14, border:`1px solid ${GOLDDIM}44` }}>
        {mediaLib[0] && mediaLib[0].type.startsWith("video") ?
          <video src={mediaLib[0].url} style={{ height:"100%", width:"100%", objectFit:"cover", opacity:.5 }} /> :
          <div style={{ textAlign:"center", color:WHITE }}>
            <div style={{ fontSize:12, letterSpacing:2, marginBottom:8 }}>ADD MEDIA TO SEE PREVIEW</div>
            <button onClick={() => go(11)} style={{ ...Sbtn("out", true) }}>⬆ UPLOAD MEDIA</button>
          </div>}
      </div>
      {tracks.map((tr, idx) => (
        <div key={idx} style={{ marginBottom:10 }}>
          <div style={{ color:GOLD, fontSize:10, letterSpacing:2, marginBottom:4, fontWeight:800 }}>{tr}</div>
          <div onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); const id = e.dataTransfer.getData("assetId"); const a = mediaLib.find(x => String(x.id) === id); if (a) addToTrack(idx, a); }}
            style={{ background:BG3, border:`1px dashed ${GOLDDIM}44`, borderRadius:4, minHeight:46, padding:8, display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
            {(timeline[idx]||[]).map((a, i) => (
              <div key={i} style={{ background:GOLDDIM, borderRadius:4, padding:"4px 10px", fontSize:11, color:"#000", fontWeight:700, display:"flex", alignItems:"center", gap:6 }}>
                {a.name.slice(0,12)}
                <button onClick={() => setTimeline(p => ({ ...p, [idx]: p[idx].filter((_,j) => j!==i) }))}
                  style={{ background:"none", border:"none", color:"#000", cursor:"pointer", fontSize:11, padding:0 }}>✕</button>
              </div>
            ))}
            {!(timeline[idx]||[]).length && <span style={{ color:WHITE, fontSize:11 }}>DROP {tr} CLIPS HERE</span>}
          </div>
        </div>
      ))}
      {mediaLib.length > 0 && (
        <div style={{ marginTop:14 }}>
          <div style={{ color:GOLD, fontSize:10, letterSpacing:2, marginBottom:8, fontWeight:800 }}>DRAG TO TIMELINE:</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {mediaLib.map(a => (
              <div key={a.id} draggable onDragStart={e => e.dataTransfer.setData("assetId", String(a.id))}
                style={{ background:BG3, border:`1px solid ${GOLDDIM}`, borderRadius:4, padding:"5px 12px", cursor:"grab", color:GOLD, fontSize:11, fontWeight:700 }}>
                📎 {a.name.slice(0,14)}
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{ ...Scard(), marginTop:14, display:"flex", alignItems:"center", gap:10 }}>
        {["⏮","⏪","▶","⏩","⏭"].map(c => <button key={c} style={{ ...Sbtn("out", true) }}>{c}</button>)}
        <div style={{ flex:1, height:4, background:BG, borderRadius:2 }}>
          <div style={{ width:"0%", height:"100%", background:GOLD, borderRadius:2 }} />
        </div>
        <span style={{ color:WHITE, fontSize:11, fontWeight:700 }}>00:00 / 90:00</span>
      </div>
    </div>
  );
}

function P14() {
  const tools14 = MOTION.slice(0, 14);
  const [active, setActive] = useState(tools14[0]);
  const [vals, setVals] = useState({ Intensity:75, Clarity:80, Color:70, Brightness:65 });
  return (
    <div style={{ ...Spage, display:"flex" }}>
      <div style={{ width:180, background:BG2, borderRight:`1px solid ${GOLDDIM}22`, overflowY:"auto", padding:10 }}>
        {tools14.map(t => (
          <button key={t} onClick={() => setActive(t)}
            style={{ width:"100%", textAlign:"left", background: t===active ? BG3 : "none", border:"none", color: t===active ? GOLD : WHITE, padding:"8px 10px", borderRadius:4, cursor:"pointer", fontSize:12, fontWeight: t===active ? 900 : 600, marginBottom:2 }}>
            {t}
          </button>
        ))}
      </div>
      <div style={{ flex:1, padding:30 }}>
        <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>ENHANCEMENT STUDIO</div>
        <h2 style={{ ...Sh1, fontSize:24, marginBottom:4 }}>{active.toUpperCase()}</h2>
        <div style={{ color:WHITE, fontSize:13, marginBottom:22, fontWeight:600 }}>Apply AI powered <strong style={{ color:GOLD }}>{active}</strong> to your footage.</div>
        {Object.entries(vals).map(([k,v]) => (
          <div key={k} style={{ marginBottom:18 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <span style={{ color:WHITE, fontSize:13, fontWeight:700 }}>{k}</span>
              <span style={{ color:GOLD, fontSize:13, fontWeight:700 }}>{v}%</span>
            </div>
            <input type="range" min={0} max={100} value={v} onChange={e => setVals(p => ({ ...p, [k]: +e.target.value }))} style={{ width:"100%", accentColor:GOLD }} />
          </div>
        ))}
        <div style={{ display:"flex", gap:12, marginTop:20 }}>
          <button style={{ ...Sbtn("gold", false) }}>APPLY ENHANCEMENT</button>
          <button onClick={() => setVals({ Intensity:75, Clarity:80, Color:70, Brightness:65 })} style={{ ...Sbtn("out", false) }}>RESET</button>
        </div>
      </div>
    </div>
  );
}

function P15() {
  const [lvl, setLvl] = useState({ MUSIC:75, VOICE:60, EFX:50, MASTER:85 });
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>MIXING CONSOLE</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:24 }}>AUDIO MIXER</h1>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:28 }}>
          {Object.entries(lvl).map(([ch, val]) => (
            <div key={ch} style={{ ...Scard(), textAlign:"center", padding:20 }}>
              <div style={{ color:GOLD, fontSize:10, letterSpacing:2, marginBottom:8, fontWeight:800 }}>{ch}</div>
              <div style={{ color:GOLD, fontFamily:"'Cinzel',serif", fontSize:34, fontWeight:900, marginBottom:14 }}>{val}</div>
              <input type="range" min={0} max={100} value={val} onChange={e => setLvl(p => ({ ...p, [ch]: +e.target.value }))} style={{ width:"100%", height:110, accentColor:GOLD }} />
              <div style={{ height:4, background:BG, borderRadius:2, marginTop:10 }}>
                <div style={{ width:`${val}%`, height:"100%", background:`linear-gradient(90deg,${GOLDDIM},${GOLD})`, borderRadius:2 }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={() => setLvl({ MUSIC:75, VOICE:60, EFX:50, MASTER:85 })} style={{ ...Sbtn("out", false) }}>RESET LEVELS</button>
          <button style={{ ...Sbtn("gold", false) }}>SAVE PRESET</button>
        </div>
      </div>
    </div>
  );
}

function P16({ go, timeline, setRendered }) {
  const [quality, setQuality] = useState("8K – 4320p");
  const [format, setFormat] = useState("MP4");
  const [progress, setProgress] = useState(0);
  const [rendering, setRendering] = useState(false);
  const [done, setDone] = useState(false);
  const clipCount = Object.values(timeline||{}).flat().length;
  const startRender = () => {
    if (clipCount === 0) { alert("Add clips to the timeline first!"); return; }
    setRendering(true); setDone(false); setProgress(0);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 7 + 2;
      if (p >= 100) { clearInterval(iv); setProgress(100); setRendering(false); setDone(true); setRendered({ url:"", quality, format, timestamp: new Date().toLocaleString() }); }
      else setProgress(Math.round(p));
    }, 200);
  };
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>FINAL OUTPUT</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:22 }}>RENDER FILM</h1>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:18 }}>
          <div style={{ ...Scard() }}>
            <div style={{ color:GOLD, fontWeight:900, fontSize:11, letterSpacing:2, marginBottom:10 }}>EXPORT QUALITY</div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {["8K – 4320p","4K – 2160p","HD – 1080p","SD – 720p"].map(q => <button key={q} onClick={() => setQuality(q)} style={{ ...Sbtn(quality===q?"gold":"out", true) }}>{q}</button>)}
            </div>
          </div>
          <div style={{ ...Scard() }}>
            <div style={{ color:GOLD, fontWeight:900, fontSize:11, letterSpacing:2, marginBottom:10 }}>FORMAT</div>
            <div style={{ display:"flex", gap:8 }}>
              {["MP4","MOV","AVI","WebM"].map(f => <button key={f} onClick={() => setFormat(f)} style={{ ...Sbtn(format===f?"gold":"out", true) }}>{f}</button>)}
            </div>
          </div>
        </div>
        <div style={{ ...Scard(), display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
          {["⏮","⏪","▶","⏩","⏭"].map(c => <button key={c} style={{ ...Sbtn("out", true) }}>{c}</button>)}
          <div style={{ flex:1, height:4, background:BG, borderRadius:2 }}>
            <div style={{ width:`${progress}%`, height:"100%", background:`linear-gradient(90deg,${GOLDDIM},${GOLD})`, borderRadius:2, transition:"width .3s" }} />
          </div>
          <span style={{ color:WHITE, fontSize:11, fontWeight:700 }}>00:00 / 90:00</span>
        </div>
        {rendering && (
          <div style={{ ...Scard(), marginBottom:14, textAlign:"center" }}>
            <div style={{ color:GOLD, fontWeight:900, fontSize:13, marginBottom:8 }}>RENDERING... {progress}%</div>
            <div style={{ height:8, background:BG, borderRadius:4 }}>
              <div style={{ width:`${progress}%`, height:"100%", background:`linear-gradient(90deg,${GOLDDIM},${GOLD})`, borderRadius:4, transition:"width .3s" }} />
            </div>
          </div>
        )}
        {done && (
          <div style={{ background:"#14532d", border:"1px solid #22c55e", borderRadius:4, padding:16, marginBottom:14, textAlign:"center" }}>
            <div style={{ color:"#22c55e", fontWeight:900, fontSize:14 }}>✓ RENDER COMPLETE — {quality} · {format}</div>
            <button onClick={() => go(17)} style={{ ...Sbtn("out", true), marginTop:10, color:"#22c55e", borderColor:"#22c55e" }}>▶ PREVIEW FILM</button>
          </div>
        )}
        <button onClick={startRender} disabled={rendering}
          style={{ ...Sbtn("gold", false), width:"100%", padding:"15px", fontSize:14, opacity: rendering ? 0.6 : 1 }}>
          {rendering ? `RENDERING... ${progress}%` : `START RENDER — ${quality} · ${format}`}
        </button>
      </div>
    </div>
  );
}

function P17({ go, rendered, mediaLib }) {
  const videoSrc = mediaLib.find(a => a.type.startsWith("video")) ? mediaLib.find(a => a.type.startsWith("video")).url : "";
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:14 }}>FILM PREVIEW</h1>
        <div style={{ background:"#000", borderRadius:4, overflow:"hidden", marginBottom:14, aspectRatio:"16/9", display:"flex", alignItems:"center", justifyContent:"center" }}>
          {videoSrc ?
            <video src={videoSrc} controls style={{ width:"100%", height:"100%" }} /> :
            <div style={{ textAlign:"center", color:WHITE }}>
              <div style={{ fontSize:40, marginBottom:10 }}>🎬</div>
              <div style={{ fontSize:12, letterSpacing:2 }}>NO RENDER AVAILABLE</div>
              <button onClick={() => go(16)} style={{ ...Sbtn("out", true), marginTop:12 }}>GO TO RENDER →</button>
            </div>}
        </div>
        {rendered && <div style={{ ...Scard(), color:WHITE, fontSize:12, fontWeight:700 }}>Rendered: {rendered.quality} · {rendered.format} · {rendered.timestamp}</div>}
        <div style={{ ...Scard(), marginTop:12, display:"flex", alignItems:"center", gap:10 }}>
          {["⏮","⏪","▶","⏩","⏭"].map(c => <button key={c} style={{ ...Sbtn("out", true) }}>{c}</button>)}
          <div style={{ flex:1, height:4, background:BG, borderRadius:2 }} />
          <span style={{ color:WHITE, fontSize:11, fontWeight:700 }}>00:00 / 90:00</span>
        </div>
      </div>
    </div>
  );
}

function P18({ rendered, mediaLib }) {
  const videoSrc = mediaLib.find(a => a.type.startsWith("video")) ? mediaLib.find(a => a.type.startsWith("video")).url : "";
  const download = () => {
    if (!videoSrc) { alert("No film yet — render first!"); return; }
    const a = document.createElement("a"); a.href = videoSrc; a.download = "MandaStrong_Film.mp4"; a.click();
  };
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>DISTRIBUTION</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:14 }}>EXPORT & DISTRIBUTE</h1>
        <div style={{ ...Scard(), marginBottom:18, textAlign:"center", color: rendered ? WHITE : TEXT3, fontWeight:700 }}>
          {rendered ? `✓ Film ready: ${rendered.quality} · ${rendered.format}` : "No film rendered yet — go to Render Engine →"}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:22 }}>
          {[["💾","DOWNLOAD TO DEVICE",download],["💿","SAVE PROJECT FILE",() => {}],["🌐","SHARE TO COMMUNITY HUB",() => {}]].map(([ic,lb,fn]) => (
            <button key={lb} onClick={fn} style={{ ...Scard(), cursor:"pointer", textAlign:"center", padding:18, display:"block", border:`2px solid ${GOLDDIM}66` }}>
              <div style={{ fontSize:26, marginBottom:6 }}>{ic}</div>
              <div style={{ color:WHITE, fontSize:11, fontWeight:800, letterSpacing:1 }}>{lb}</div>
            </button>
          ))}
        </div>
        <div style={{ color:GOLD, fontWeight:900, fontSize:12, letterSpacing:2, marginBottom:12 }}>SHARE DIRECTLY TO SOCIAL MEDIA</div>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          {["YouTube","Instagram","TikTok","X / Twitter","Facebook","LinkedIn","Vimeo","Pinterest","WhatsApp"].map(s => (
            <button key={s} style={{ ...Scard(), padding:"10px 14px", cursor:"pointer" }}>
              <div style={{ color:WHITE, fontSize:11, fontWeight:700 }}>{s}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function P19() {
  const tuts = [
    {n:"01",t:"Getting Started — Platform Overview",d:"8:30",l:"Beginner"},
    {n:"02",t:"Importing & Managing Media Assets",d:"6:15",l:"Beginner"},
    {n:"03",t:"Multi-Track Timeline Editing",d:"12:45",l:"Intermediate"},
    {n:"04",t:"AI Tools — 600+ Features Explained",d:"18:20",l:"Intermediate"},
    {n:"05",t:"Professional Color Grading with AI",d:"22:00",l:"Advanced"},
    {n:"06",t:"Audio Mixing & Sound Design",d:"15:10",l:"Intermediate"},
    {n:"07",t:"AI Enhancement Studio Deep Dive",d:"20:30",l:"Advanced"},
    {n:"08",t:"Render Settings & Export Optimization",d:"8:15",l:"Beginner"},
  ];
  const lc = { Beginner:"#22c55e", Intermediate:"#f59e0b", Advanced:"#ef4444" };
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>LEARNING CENTER</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:22 }}>TUTORIALS</h1>
        {tuts.map(t => (
          <div key={t.n} onClick={() => window.open("https://youtube.com","_blank")}
            style={{ ...Scard(), marginBottom:10, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", transition:"border-color .2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = GOLDDIM}
            onMouseLeave={e => e.currentTarget.style.borderColor = `${GOLDDIM}44`}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <span style={{ fontFamily:"'Cinzel',serif", color:GOLD, fontSize:18, fontWeight:900, minWidth:30 }}>{t.n}</span>
              <div>
                <div style={{ color:WHITE, fontWeight:800, fontSize:14 }}>{t.t}</div>
                <div style={{ color:WHITE, fontSize:11, marginTop:2, fontWeight:600 }}>{t.d} · Opens on YouTube</div>
              </div>
            </div>
            <span style={{ background: lc[t.l]+"22", border:`1px solid ${lc[t.l]}`, color:lc[t.l], borderRadius:4, padding:"3px 10px", fontSize:10, fontWeight:700, flexShrink:0 }}>{t.l.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function P20() {
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>LEGAL</div>
        <h1 style={{ ...Sh1, fontSize:30, marginBottom:4 }}>TERMS OF SERVICE & DISCLAIMER</h1>
        <div style={{ color:WHITE, fontSize:11, marginBottom:22, fontWeight:600 }}>Effective: March 2026 · MandaStrong Studio LLC</div>
        <div style={{ ...Scard(), marginBottom:18 }}>
          <h2 style={{ color:GOLD, fontWeight:900, fontSize:18, marginBottom:12 }}>TERMS OF SERVICE</h2>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, margin:0 }}>By accessing or using MandaStrong Studio, you agree to be legally bound by these Terms of Service. These Terms constitute a binding agreement between you and MandaStrong Studio LLC. Subscriptions bill monthly and auto-renew unless cancelled. All payments processed via Stripe. Studio Plan subscribers receive full commercial rights. You retain ownership of all media you upload. For support contact MandaStrong1.Etsy.com or Agent Grok on Page 21.</p>
        </div>
        <div style={{ ...Scard() }}>
          <h2 style={{ color:GOLD, fontWeight:900, fontSize:18, marginBottom:12 }}>DISCLAIMER</h2>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, margin:0 }}>MandaStrong Studio is provided "as is" without warranties of any kind. To the fullest extent permitted by law, MandaStrong Studio LLC shall not be liable for any indirect or consequential damages. AI-generated content is produced algorithmically — users are solely responsible for reviewing all outputs. A portion of revenue supports veterans' mental health and anti-bullying education.</p>
        </div>
      </div>
    </div>
  );
}

function P21() {
  const [msgs, setMsgs] = useState([{ role:"assistant", content:"Ask me anything about your production." }]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const quickQ = ["How do I export in 8K?","What AI tools do you have?","How does the timeline work?","Tell me about pricing"];
  useEffect(() => { bottomRef.current && bottomRef.current.scrollIntoView({ behavior:"smooth" }); }, [msgs]);
  const send = async () => {
    if (!inp.trim()) return;
    const q = inp.trim(); setInp(""); setLoading(true);
    setMsgs(p => [...p, { role:"user", content:q }]);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json", "anthropic-dangerous-direct-browser-access":"true" },
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:800,
          system:"You are Agent Grok, 24/7 assistant for MandaStrong Studio — a professional cinema AI platform with 600+ tools, 8K export, 3-hour films, plans $20/$30/$50/mo with 7-day free trial. Be helpful and concise.",
          messages: [...msgs.filter(m => m.role !== "system"), { role:"user", content:q }] })
      });
      const d = await r.json();
      setMsgs(p => [...p, { role:"assistant", content: d.content && d.content[0] ? d.content[0].text : "Let me help!" }]);
    } catch(e) { setMsgs(p => [...p, { role:"assistant", content:"Connect API key to activate Agent Grok." }]); }
    setLoading(false);
  };
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:22 }}>
          <div style={{ width:56, height:56, background:`linear-gradient(135deg,${GOLDDIM},${GOLD})`, borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", fontFamily:"'Cinzel',serif", fontSize:28, fontWeight:900, color:"#000" }}>G</div>
          <h1 style={{ ...Sh1, fontSize:26 }}>AGENT GROK</h1>
          <div style={{ color:WHITE, fontSize:10, letterSpacing:2, fontWeight:700 }}>24/7 PRODUCTION SUPPORT</div>
          <div style={{ color:"#22c55e", fontSize:10, letterSpacing:2, marginTop:4 }}>● ONLINE · BUILD 2026.03.15</div>
        </div>
        <div style={{ ...Scard(), height:300, overflowY:"auto", marginBottom:12, display:"flex", flexDirection:"column", gap:10, padding:14 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ padding:"11px 14px", borderRadius:4, background: m.role==="user" ? "rgba(212,168,71,0.1)" : "rgba(26,82,118,0.2)", borderLeft:`3px solid ${m.role==="user" ? GOLDDIM : "#2980b9"}` }}>
              <span style={{ fontSize:9, color:GOLD, display:"block", marginBottom:4, fontWeight:800, letterSpacing:1 }}>{m.role==="user" ? "YOU" : "AGENT GROK"}</span>
              <span style={{ color:WHITE, fontSize:14, lineHeight:1.7 }}>{m.content}</span>
            </div>
          ))}
          {loading && <div style={{ padding:"11px 14px", background:"rgba(26,82,118,0.2)", borderLeft:"3px solid #2980b9", borderRadius:4, color:WHITE, fontSize:13 }}>Agent Grok is thinking...</div>}
          <div ref={bottomRef} />
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:10 }}>
          {quickQ.map(q => <button key={q} onClick={() => setInp(q)} style={{ ...Sbtn("out", true), fontSize:11 }}>{q}</button>)}
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <textarea value={inp} onChange={e => setInp(e.target.value)}
            onKeyDown={e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Ask Agent Grok anything about your production..."
            style={{ flex:1, height:52, resize:"none", padding:"12px 14px", fontSize:14, background:BG3, border:`1px solid ${GOLDDIM}`, color:WHITE, borderRadius:4, outline:"none", lineHeight:1.5 }} />
          <button onClick={send} disabled={loading||!inp.trim()} style={{ ...Sbtn("gold", false), height:52, padding:"0 20px", opacity: loading||!inp.trim() ? 0.5 : 1 }}>▶ SEND</button>
        </div>
      </div>
    </div>
  );
}

function P22({ go }) {
  const [posts, setPosts] = useState([
    {id:1, user:"Sarah J.", title:"Epic Action Feature", icon:"🎬", views:2847, likes:1522},
    {id:2, user:"Mike Chen", title:"Family Documentary", icon:"📽", views:1256, likes:812},
    {id:3, user:"Emily R.", title:"Short Film Entry", icon:"🏆", views:3421, likes:2156},
    {id:4, user:"Alex T.", title:"Music Video Cut", icon:"🎵", views:5234, likes:4012},
  ]);
  return (
    <div style={{ ...Spage, padding:40 }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div style={{ fontSize:9, color:GOLD, letterSpacing:3, marginBottom:4, fontWeight:700 }}>CREATOR NETWORK</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
          <h1 style={{ ...Sh1, fontSize:30, margin:0 }}>COMMUNITY HUB</h1>
          <button style={{ ...Sbtn("gold", false) }}>⬆ UPLOAD YOUR MOVIE</button>
        </div>
        {posts.map(p => (
          <div key={p.id} style={{ ...Scard(), marginBottom:10, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <span style={{ fontSize:26 }}>{p.icon}</span>
              <div>
                <div style={{ color:GOLD, fontWeight:900, fontSize:15 }}>{p.title}</div>
                <div style={{ color:WHITE, fontSize:11, fontWeight:600 }}>by {p.user}</div>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <span style={{ color:WHITE, fontSize:12, fontWeight:700 }}>👁 {p.views.toLocaleString()}</span>
              <span style={{ color:WHITE, fontSize:12, fontWeight:700 }}>❤️ {p.likes.toLocaleString()}</span>
              <button onClick={() => setPosts(ps => ps.map(x => x.id===p.id ? { ...x, likes:x.likes+1 } : x))} style={{ ...Sbtn("out", true) }}>POST</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function P23({ go }) {
  return (
    <div style={{ ...Spage, padding:"30px 40px 80px" }}>
      <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}>
        <h1 style={{ fontFamily:"'Cinzel',serif", color:GOLD, fontSize:"clamp(22px,3.5vw,32px)", fontWeight:900, letterSpacing:4, textShadow:`0 0 40px ${GOLD}99`, marginBottom:16 }}>THAT'S ALL FOLKS</h1>
        <div style={{ height:2, background:`linear-gradient(90deg,transparent,${GOLD},transparent)`, marginBottom:20 }} />
        <div style={{ background:"#000", borderRadius:4, overflow:"hidden", marginBottom:24, aspectRatio:"16/9", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ textAlign:"center", color:WHITE }}>
            <div style={{ fontSize:40, marginBottom:8 }}>🎬</div>
            <div style={{ fontSize:12, color:WHITE, fontWeight:700 }}>thatsallfolks.mp4</div>
          </div>
        </div>
        <div style={{ ...Scard(), textAlign:"left", marginBottom:20 }}>
          <h2 style={{ color:GOLD, fontWeight:900, fontSize:17, textAlign:"center", marginBottom:14 }}>✦ A SPECIAL THANK YOU ✦</h2>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, marginBottom:12 }}>Dear Creator,</p>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, marginBottom:12 }}>From the bottom of my heart — <strong style={{ color:GOLD }}>thank you.</strong> Whether you're here to capture precious family memories, tell a story that's lived rent-free in your head for years, or simply explore what's possible when creativity meets technology, you chose to do it with MandaStrong Studio. That means everything.</p>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, marginBottom:12 }}>I built this platform because I believe that <strong style={{ color:GOLD }}>storytelling should have no gatekeepers.</strong> You don't need a film school degree or a Hollywood budget. You just need a story worth telling — and now you have 600+ professional tools to help you tell it.</p>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, marginBottom:12 }}>Every subscription supports <strong style={{ color:GOLD }}>veterans' mental health initiatives</strong> and <strong style={{ color:GOLD }}>school anti-bullying programs</strong> — causes deeply personal to me as the author of <em>Doxy the School Bully.</em> When you create here, you're helping build a kinder world.</p>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, marginBottom:12 }}>Together, we are building a community of creators who use their talents to spread kindness, understanding, and hope. Your creativity and passion inspire positive change in the world. Through your films and stories, you have the power to educate, inspire, and bring awareness to critical issues like bullying prevention, social skills development, and humanity's collective growth.</p>
          <p style={{ color:WHITE, fontSize:14, lineHeight:1.9, marginBottom:4 }}>With gratitude and cinematic love,</p>
          <p style={{ color:GOLD, fontWeight:900, fontSize:15, marginBottom:4 }}>— AMANDA STRONG</p>
          <p style={{ color:WHITE, fontSize:12 }}>Founder, MandaStrong Studio &nbsp;·&nbsp; Author of <em>Doxy the School Bully</em><br/>MandaStrong1.Etsy.com</p>
        </div>
        <div style={{ ...Scard(), textAlign:"left", marginBottom:20 }}>
          <h2 style={{ color:GOLD, fontWeight:900, fontSize:15, letterSpacing:2, marginBottom:14 }}>OUR MISSION</h2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {[
              {ic:"🎬",t:"EMPOWER CREATORS",d:"600+ AI tools making professional filmmaking accessible to everyone."},
              {ic:"🛡",t:"PROTECT THE YOUNG",d:"Revenue funds school anti-bullying programs, inspired by Doxy the School Bully."},
              {ic:"🏅",t:"SUPPORT VETERANS",d:"We fund mental health services for veterans — because they deserve the best."},
              {ic:"🌐",t:"BUILD COMMUNITY",d:"The Creator Network connects filmmakers worldwide to share and grow."},
            ].map(m => (
              <div key={m.t} style={{ background:BG2, border:`2px solid ${GOLDDIM}66`, borderRadius:4, padding:14 }}>
                <div style={{ fontSize:22, marginBottom:6 }}>{m.ic}</div>
                <div style={{ color:GOLD, fontWeight:900, fontSize:12, letterSpacing:1, marginBottom:5 }}>{m.t}</div>
                <div style={{ color:WHITE, fontSize:12, lineHeight:1.7 }}>{m.d}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={() => window.open("https://MandaStrong1.Etsy.com","_blank")} style={{ ...Sbtn("out", false) }}>VISIT ETSY STORE</button>
          <button onClick={() => window.close()} style={{ ...Sbtn("gold", false) }}>EXIT APP</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState({ name:"Guest", plan:"Guest", isAdmin:false });
  const [mediaLib, setMediaLib] = useState([]);
  const [timeline, setTimeline] = useState({});
  const [rendered, setRendered] = useState(null);
  const go = p => { setPage(p); window.scrollTo(0,0); };

  const pages = {
    1:  <P1 go={go} />,
    2:  <P2 go={go} />,
    3:  <P3 go={go} />,
    4:  <P4 go={go} setUser={setUser} />,
    5:  <ToolPage title="WRITING TOOLS" subtitle="AI WORKSTATION 01 — WRITING" tools={WRITING} />,
    6:  <ToolPage title="VOICE TOOLS" subtitle="AI WORKSTATION 02 — VOICE" tools={VOICE} />,
    7:  <ToolPage title="IMAGE TOOLS" subtitle="AI WORKSTATION 03 — IMAGE" tools={IMAGE_T} />,
    8:  <ToolPage title="VIDEO TOOLS" subtitle="AI WORKSTATION 04 — VIDEO" tools={VIDEO_T} />,
    9:  <ToolPage title="MOTION & VFX" subtitle="AI WORKSTATION 05 — MOTION" tools={MOTION} />,
    10: <ToolPage title="ENHANCEMENT STUDIO" subtitle="AI WORKSTATION 06 — ENHANCE" tools={MOTION} />,
    11: <P11 mediaLib={mediaLib} setMediaLib={setMediaLib} />,
    12: <P12 go={go} mediaLib={mediaLib} />,
    13: <P13 go={go} mediaLib={mediaLib} timeline={timeline} setTimeline={setTimeline} />,
    14: <P14 />,
    15: <P15 />,
    16: <P16 go={go} timeline={timeline} setRendered={setRendered} />,
    17: <P17 go={go} rendered={rendered} mediaLib={mediaLib} />,
    18: <P18 rendered={rendered} mediaLib={mediaLib} />,
    19: <P19 />,
    20: <P20 />,
    21: <P21 />,
    22: <P22 go={go} />,
    23: <P23 go={go} />,
  };

  return (
    <div style={{ background:BG, minHeight:"100vh", fontFamily:"'Barlow Condensed','Rajdhani',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Rajdhani:wght@400;600;700;800;900&family=Barlow+Condensed:wght@400;600;700;800;900&family=Rajdhani:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      <SPARKLE />
      <Header page={page} go={go} setMenuOpen={setMenuOpen} user={user} />
      {menuOpen && <QuickAccessMenu go={go} onClose={() => setMenuOpen(false)} user={user} />}
      <div style={{ minHeight:"calc(100vh - 116px)" }}>{pages[page] || <P1 go={go} />}</div>
      <Footer page={page} go={go} />
    </div>
  );
}
