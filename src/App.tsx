import React, { useState, useRef, useEffect, useCallback } from "react";

const GOLD   = "#d4a847";
const GOLD2  = "#f0c870";
const GOLDDIM= "#8a6d22";
const PUR2   = "#7c3aed";
const PUR3   = "#4c1d95";
const BG     = "#070707";
const BG2    = "#0e0e0e";
const BG3    = "#161616";
const BG4    = "#1e1e1e";
const TEXT   = "#e8e4dc";
const TEXT2  = "#a09a8e";
const TEXT3  = "#666";
const BORDER = "#2a2a2a";

function Sparkles() {
  const stars = Array.from({length: 60}, (_, i) => ({
    id: i, x: Math.random()*100, y: Math.random()*100,
    size: Math.random()*4+1, delay: Math.random()*4, dur: Math.random()*3+2,
  }));
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
      {stars.map(s => (
        <div key={s.id} style={{ position:"absolute", left:s.x+"%", top:s.y+"%", width:s.size, height:s.size, borderRadius:"50%", background:GOLD2, opacity:0, animation:`twinkle ${s.dur}s ${s.delay}s infinite`, boxShadow:`0 0 ${s.size*3}px ${GOLD}` }} />
      ))}
      <style>{`
        @keyframes twinkle { 0%,100%{opacity:0;transform:scale(0.3);} 50%{opacity:1;transform:scale(1);} }
        @keyframes glowPulse { 0%,100%{text-shadow:0 0 30px #d4a847,0 0 60px #8a6d22,0 0 100px #5a4510;} 50%{text-shadow:0 0 60px #f0c870,0 0 120px #d4a847,0 0 180px #8a6d22;} }
        @keyframes studioGlow { 0%,100%{text-shadow:0 0 40px #f0c870,0 0 80px #d4a847,0 0 140px #d4a847,0 0 200px #8a6d22;} 50%{text-shadow:0 0 80px #fff8e0,0 0 160px #f0c870,0 0 240px #d4a847,0 0 320px #8a6d22;} }
        @keyframes shimmer { 0%{background-position:-200% center;} 100%{background-position:200% center;} }
        @keyframes float { 0%,100%{transform:translateY(0px);} 50%{transform:translateY(-8px);} }
        @keyframes ticker { 0%{transform:translateX(100vw);} 100%{transform:translateX(-100%);} }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
        * { box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin:0; }
        ::-webkit-scrollbar { width:6px; height:6px; }
        ::-webkit-scrollbar-track { background:#0a0a0a; }
        ::-webkit-scrollbar-thumb { background:#8a6d22; border-radius:3px; }
        input, textarea, select { font-size:16px !important; }
      `}</style>
    </div>
  );
}

function GoldBtn({ onClick, children, style }: { onClick?: () => void; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <button onClick={onClick} style={{ background:"linear-gradient(135deg,#6b5010,#d4a847,#f0c870,#d4a847,#6b5010)", backgroundSize:"300% auto", animation:"shimmer 3s linear infinite", color:"#000", fontWeight:900, borderRadius:50, padding:"16px 32px", border:"1.5px solid "+GOLD2, cursor:"pointer", fontSize:16, letterSpacing:2, textTransform:"uppercase" as const, boxShadow:"0 0 30px #d4a84788,0 4px 20px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.2)", width:"100%", ...style }}>
      {children}
    </button>
  );
}

function PurBtn({ onClick, children, style }: { onClick?: () => void; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <button onClick={onClick} style={{ background:"transparent", color:GOLD, fontWeight:700, borderRadius:50, padding:"16px 32px", border:"1.5px solid "+GOLD, cursor:"pointer", fontSize:16, letterSpacing:1, width:"100%", ...style }}>
      {children}
    </button>
  );
}

function Page({ children, sparkle, style }: { children: React.ReactNode; sparkle?: boolean; style?: React.CSSProperties }) {
  return (
    <div style={{ background:BG, color:TEXT, minHeight:"100vh", paddingTop:56, position:"relative", ...style }}>
      {sparkle && <Sparkles />}
      <div style={{ position:"relative", zIndex:1 }}>{children}</div>
    </div>
  );
}

function SH({ children }: { children: React.ReactNode }) {
  return <h2 style={{ color:GOLD, borderBottom:"1px solid "+GOLDDIM, fontSize:22, fontWeight:800, paddingBottom:10, marginBottom:20, letterSpacing:2, textTransform:"uppercase" as const }}>{children}</h2>;
}

// =====================================================================
// PAGE 1 - WELCOME SPLASH — Cinema Intelligence Platform Design
// =====================================================================
function P1({ go }: { go: (n: number) => void }) {
  return (
    <div style={{ background:"radial-gradient(ellipse at 50% 30%, #1a1200 0%, #0d0900 50%, #000 100%)", minHeight:"100vh", position:"relative", overflow:"hidden", display:"flex", flexDirection:"column" }}>
      <Sparkles />

      {/* TOP THIN HEADER BAR */}
      <div style={{ position:"relative", zIndex:10, background:"rgba(0,0,0,0.7)", borderBottom:"1px solid "+GOLDDIM+"88", padding:"6px 20px", display:"flex", justifyContent:"center", alignItems:"center" }}>
        <span style={{ color:GOLDDIM, fontSize:11, letterSpacing:4, textTransform:"uppercase" }}>Cinema Intelligence Platform &mdash; Est. 2026</span>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ position:"relative", zIndex:1, flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"20px 24px", textAlign:"center" }}>

        {/* Glow orb */}
        <div style={{ position:"absolute", top:"20%", left:"50%", transform:"translateX(-50%)", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, #d4a84718 0%, transparent 70%)", pointerEvents:"none" }} />

        {/* MANDA STRONG STUDIO title */}
        <div style={{ marginBottom:6 }}>
          <div style={{ color:GOLD, fontSize:13, fontWeight:600, letterSpacing:8, textTransform:"uppercase", marginBottom:6, opacity:0.7 }}>M</div>
          <div style={{ position:"relative" }}>
            <h1 style={{ color:GOLD, fontSize:"clamp(32px,8vw,58px)", fontWeight:900, letterSpacing:"0.12em", textTransform:"uppercase", margin:0, lineHeight:1.0, animation:"glowPulse 3s ease-in-out infinite" }}>
              MANDA STRONG
            </h1>
            <h1 style={{ color:GOLD2, fontSize:"clamp(32px,8vw,58px)", fontWeight:900, letterSpacing:"0.12em", textTransform:"uppercase", margin:0, lineHeight:1.0, animation:"studioGlow 2s ease-in-out infinite" }}>
              STUDIO
            </h1>
          </div>
        </div>

        {/* Subtitle line */}
        <div style={{ color:GOLDDIM, fontSize:12, letterSpacing:5, textTransform:"uppercase", marginBottom:6, marginTop:8 }}>
          600+ AI Tools &nbsp;&bull;&nbsp; 8K Export &nbsp;&bull;&nbsp; Up to 3-Hour Films
        </div>

        {/* Tagline */}
        <p style={{ color:TEXT2, fontSize:15, marginBottom:12, letterSpacing:1, maxWidth:380 }}>
          The All-In-One Professional AI Movie Creation Platform
        </p>

        {/* 7-Day Trial Badge */}
        <div style={{ background:"rgba(124,58,237,0.2)", border:"1px solid "+PUR2, borderRadius:20, padding:"8px 20px", marginBottom:24, display:"inline-flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:16 }}>🎬</span>
          <span style={{ color:PUR2, fontWeight:700, fontSize:13, letterSpacing:1 }}>Special Offer: New Studio Plan Subscribers Receive 7-Day Free Trial</span>
        </div>

        {/* Buttons */}
        <div style={{ width:"100%", maxWidth:340, display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>
          <GoldBtn onClick={() => go(3)}>&#9654; Start Creating</GoldBtn>
          <PurBtn onClick={() => go(3)}>Login / Register</PurBtn>
        </div>

        {/* Agent Grok badge */}
        <button onClick={() => go(19)} style={{ background:"rgba(0,0,0,0.5)", border:"1px solid #333", borderRadius:20, padding:"7px 18px", color:TEXT3, fontSize:12, cursor:"pointer", letterSpacing:1, marginBottom:20 }}>
          🤖 Agent Grok &nbsp;<span style={{ color:"#2ecc71", animation:"blink 2s infinite" }}>●</span><span style={{ color:"#2ecc71" }}> SYSTEM ONLINE &nbsp; BUILD 2026.03.15</span>
        </button>

        {/* Stats row */}
        <div style={{ display:"flex", gap:16, marginBottom:8 }}>
          {[["600+","AI Tools"],["8K","Cinema Export"],["3hrs","Max Duration"]].map(([v,l]) => (
            <div key={l} style={{ background:"rgba(212,168,71,0.08)", border:"1px solid "+GOLDDIM, borderRadius:14, padding:"12px 18px", textAlign:"center", minWidth:80 }}>
              <div style={{ color:GOLD, fontWeight:900, fontSize:24 }}>{v}</div>
              <div style={{ color:TEXT3, fontSize:11, letterSpacing:1, marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER TICKER BAR */}
      <div style={{ position:"relative", zIndex:10, background:"rgba(0,0,0,0.85)", borderTop:"1px solid "+GOLDDIM+"66", padding:"6px 0", overflow:"hidden", height:28 }}>
        <div style={{ display:"flex", alignItems:"center", gap:40, animation:"ticker 30s linear infinite", whiteSpace:"nowrap", height:"100%" }}>
          {["MANDASTRONG STUDIO 2026","PROFESSIONAL CINEMA SYNTHESIS","MandaStrong1.Etsy.com","600+ AI TOOLS LIVE","8K CINEMA EXPORT","3-HOUR FILMS","AGENT GROK ONLINE","COMMUNITY HUB LIVE","MANDASTRONG STUDIO 2026","PROFESSIONAL CINEMA SYNTHESIS"].map((t,i) => (
            <span key={i} style={{ color:GOLDDIM, fontSize:11, letterSpacing:3, textTransform:"uppercase" }}>{t} &nbsp;&nbsp;&#9830;&nbsp;&nbsp;</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// PAGE 2 - OUR STORY
// =====================================================================
function P2({ go }: { go: (n: number) => void }) {
  return (
    <Page sparkle>
      <div style={{ padding:"28px 20px", maxWidth:560, margin:"0 auto" }}>
        <SH>Our Story</SH>
        <div style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:18, padding:24, marginBottom:20, boxShadow:"0 0 20px "+GOLDDIM+"22" }}>
          <p style={{ color:TEXT2, lineHeight:2.0, fontSize:16 }}>MandaStrong Studio was born from a vision to give every storyteller - regardless of budget or technical skill - the power to create meaningful, professional-quality films. We combine cutting-edge AI tools with an intuitive studio interface so your ideas can become cinema-grade reality.</p>
        </div>
        <div style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:18, padding:24, marginBottom:20 }}>
          <p style={{ color:GOLD, fontWeight:700, marginBottom:8, fontSize:17 }}>Our Mission</p>
          <p style={{ color:TEXT2, lineHeight:2.0, fontSize:16 }}>To educate, inspire, and bring awareness to critical issues like bullying prevention, social skills development, and humanity's collective growth - through the power of film and storytelling.</p>
        </div>
        <div style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:18, padding:24, marginBottom:24 }}>
          <p style={{ color:GOLD, fontWeight:700, marginBottom:8, fontSize:17 }}>Why MandaStrong?</p>
          <p style={{ color:TEXT2, lineHeight:2.0, fontSize:16 }}>Unlike basic video editors, MandaStrong Studio is built for longer-form storytelling - up to 3-hour films with full AI-assisted production, professional audio mixing, multi-track timeline editing, and direct export to all major platforms.</p>
        </div>
        <GoldBtn onClick={() => go(3)}>Begin Creating &rarr;</GoldBtn>
      </div>
    </Page>
  );
}

const ADMIN_EMAIL = "woolleya129@gmail.com";
const ADMIN_PASS  = "Mangler1970!!";
type User = { name:string; email:string; plan:string; isAdmin:boolean };

function LoginScreen({ onAuth }: { onAuth: (u: User) => void }) {
  const [mode, setMode] = useState<"login"|"register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [plan, setPlan] = useState("Pro");
  const [err, setErr] = useState("");
  const plans = ["Basic","Pro","Studio"];
  const submit = () => {
    if (!email.trim()||!pass.trim()) { setErr("Please fill in all fields."); return; }
    const isAdmin = email.trim().toLowerCase()===ADMIN_EMAIL.toLowerCase() && pass===ADMIN_PASS;
    if (mode==="login") { onAuth({ name:isAdmin?"Amanda Strong":(name||email.split("@")[0]), email:email.trim(), plan:isAdmin?"Studio":plan, isAdmin }); }
    else { if (!name.trim()) { setErr("Please enter your name."); return; } onAuth({ name:name.trim(), email:email.trim(), plan, isAdmin }); }
  };
  return (
    <div style={{ background:"radial-gradient(ellipse at center,#1a1200 0%,#0a0800 40%,#000 100%)", minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, position:"relative" }}>
      <Sparkles />
      <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:400, display:"flex", flexDirection:"column", alignItems:"center" }}>
        <div style={{ fontSize:52, marginBottom:10, filter:"drop-shadow(0 0 16px #d4a847)", animation:"float 4s ease-in-out infinite" }}>✦</div>
        <h1 style={{ color:GOLD, fontSize:34, fontWeight:900, letterSpacing:4, textTransform:"uppercase", textAlign:"center", marginBottom:4, animation:"glowPulse 3s ease-in-out infinite", lineHeight:1.1 }}>MandaStrong</h1>
        <h1 style={{ color:GOLD2, fontSize:34, fontWeight:900, letterSpacing:4, textTransform:"uppercase", textAlign:"center", marginBottom:6, animation:"studioGlow 2s ease-in-out infinite", lineHeight:1.1, marginTop:0 }}>Studio</h1>
        <div style={{ color:TEXT2, fontSize:14, marginBottom:32, letterSpacing:2, textAlign:"center" }}>AI-Powered Filmmaking Platform</div>
        <div style={{ background:BG3, border:"1.5px solid "+GOLDDIM, borderRadius:24, padding:28, width:"100%", boxShadow:"0 0 40px "+GOLDDIM+"44" }}>
          <div style={{ display:"flex", marginBottom:24, background:BG2, borderRadius:14, padding:4 }}>
            {(["login","register"] as const).map(m => (<button key={m} onClick={()=>{setMode(m);setErr("");}} style={{ flex:1, background:mode===m?GOLD:"transparent", color:mode===m?"#000":TEXT2, border:"none", borderRadius:10, padding:"10px 0", fontWeight:800, fontSize:15, cursor:"pointer", transition:"all 0.2s" }}>{m==="login"?"Sign In":"Register"}</button>))}
          </div>
          {mode==="register" && <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name" style={{ background:BG2, border:"1px solid "+GOLDDIM, color:TEXT, borderRadius:12, width:"100%", padding:"12px 16px", fontSize:16, outline:"none", marginBottom:12 }} />}
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" type="email" style={{ background:BG2, border:"1px solid "+BORDER, color:TEXT, borderRadius:12, width:"100%", padding:"12px 16px", fontSize:16, outline:"none", marginBottom:12 }} />
          <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" type="password" onKeyDown={e=>e.key==="Enter"&&submit()} style={{ background:BG2, border:"1px solid "+BORDER, color:TEXT, borderRadius:12, width:"100%", padding:"12px 16px", fontSize:16, outline:"none", marginBottom:mode==="register"?16:22 }} />
          {mode==="register" && (
            <div style={{ marginBottom:22 }}>
              <div style={{ color:GOLD, fontWeight:700, fontSize:14, marginBottom:10 }}>Select Your Plan</div>
              <div style={{ display:"flex", gap:8 }}>{plans.map(p=>(<button key={p} onClick={()=>setPlan(p)} style={{ flex:1, background:plan===p?GOLD:BG2, color:plan===p?"#000":TEXT2, border:"1px solid "+(plan===p?GOLD:BORDER), borderRadius:10, padding:"9px 0", fontSize:13, fontWeight:700, cursor:"pointer" }}>{p}</button>))}</div>
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}><span style={{ color:TEXT3, fontSize:12 }}>Basic $10/mo</span><span style={{ color:TEXT3, fontSize:12 }}>Pro $20/mo</span><span style={{ color:TEXT3, fontSize:12 }}>Studio $30/mo</span></div>
              {plan==="Studio" && (<div style={{ background:"rgba(124,58,237,0.15)", border:"1px solid "+PUR2, borderRadius:12, padding:"12px 16px", marginTop:14, textAlign:"center" }}><div style={{ color:PUR2, fontWeight:800, fontSize:15 }}>7-Day Free Trial Included!</div><div style={{ color:TEXT3, fontSize:13, marginTop:4 }}>No charge for the first 7 days. Cancel anytime.</div></div>)}
            </div>
          )}
          {err && <div style={{ color:"#ef4444", fontSize:14, marginBottom:12, padding:"10px 14px", background:"rgba(239,68,68,0.1)", borderRadius:10 }}>{err}</div>}
          <GoldBtn onClick={submit}>{mode==="login"?"Sign In to Studio":"Create Account"}</GoldBtn>
          {mode==="register" && (<div style={{ marginTop:16, background:BG2, borderRadius:14, padding:14, textAlign:"center" }}><div style={{ color:TEXT3, fontSize:13 }}>Secure checkout powered by Stripe</div><div style={{ color:GOLD, fontWeight:700, fontSize:13, marginTop:4 }}>Cancel anytime. No hidden fees.</div></div>)}
          {mode==="login" && (<div style={{ marginTop:14, textAlign:"center" }}><button onClick={()=>{setMode("register");setErr("");}} style={{ background:"none", border:"none", color:TEXT3, fontSize:13, cursor:"pointer" }}>Don't have an account? <span style={{ color:GOLD }}>Register here</span></button></div>)}
        </div>
        <div style={{ color:TEXT3, fontSize:12, marginTop:18, textAlign:"center" }}>By continuing you agree to our <span style={{ color:GOLDDIM, cursor:"pointer" }}>Terms of Service</span> and <span style={{ color:GOLDDIM, cursor:"pointer" }}>Privacy Policy</span></div>
      </div>
    </div>
  );
}

function P3({ go, onAuth }: { go: (n: number) => void; onAuth: (u: User) => void }) {
  const [mode, setMode] = useState<"plans"|"login"|"register">("plans");
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [pass, setPass] = useState(""); const [plan, setPlan] = useState("Pro"); const [err, setErr] = useState("");
  const plans = [
    { name:"Basic", price:"$10", period:"/mo", badge:"", features:["5 active projects","100 AI tool uses/mo","720p export","Community access","Basic tutorials"] },
    { name:"Pro", price:"$20", period:"/mo", badge:"MOST POPULAR", features:["Unlimited projects","500 AI uses/mo","1080p & 4K export","Priority support","Advanced timeline","Audio mixing suite","Analytics dashboard"] },
    { name:"Studio", price:"$30", period:"/mo", badge:"7-DAY FREE TRIAL", features:["Everything in Pro","Unlimited AI uses","8K cinema export","Admin dashboard","Custom branding","API access","White-label option","Dedicated support"] },
  ];
  const submit = () => {
    if (!email.trim()||!pass.trim()) { setErr("Please fill in all fields."); return; }
    const isAdmin = email.trim().toLowerCase()==="woolleya129@gmail.com" && pass==="Mangler1970!!";
    if (mode==="login") { onAuth({ name:isAdmin?"Amanda Strong":(name||email.split("@")[0]), email:email.trim(), plan:isAdmin?"Studio":plan, isAdmin }); }
    else { if (!name.trim()) { setErr("Please enter your name."); return; } onAuth({ name:name.trim(), email:email.trim(), plan, isAdmin }); }
  };
  if (mode==="login"||mode==="register") return (
    <div style={{ background:"radial-gradient(ellipse at center,#1a1200 0%,#0a0800 40%,#000 100%)", minHeight:"100vh", paddingTop:56, position:"relative" }}>
      <Sparkles />
      <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"calc(100vh - 56px)", padding:"0 20px" }}>
        <div style={{ fontSize:44, marginBottom:8, filter:"drop-shadow(0 0 16px #d4a847)", animation:"float 4s ease-in-out infinite" }}>✦</div>
        <h2 style={{ color:GOLD, fontSize:26, fontWeight:900, letterSpacing:4, textTransform:"uppercase", textAlign:"center", marginBottom:2, animation:"glowPulse 3s ease-in-out infinite" }}>MandaStrong</h2>
        <h2 style={{ color:GOLD2, fontSize:26, fontWeight:900, letterSpacing:4, textTransform:"uppercase", textAlign:"center", marginBottom:4, animation:"studioGlow 2s ease-in-out infinite", marginTop:0 }}>Studio</h2>
        <div style={{ color:TEXT2, fontSize:14, marginBottom:28, letterSpacing:1 }}>AI-Powered Filmmaking Platform</div>
        <div style={{ background:BG3, border:"1.5px solid "+GOLDDIM, borderRadius:24, padding:30, width:"100%", maxWidth:400, boxShadow:"0 0 40px "+GOLDDIM+"33" }}>
          <div style={{ display:"flex", marginBottom:24, background:BG2, borderRadius:14, padding:4 }}>
            {(["login","register"] as const).map(m=>(<button key={m} onClick={()=>{setMode(m);setErr("");}} style={{ flex:1, background:mode===m?GOLD:"transparent", color:mode===m?"#000":TEXT2, border:"none", borderRadius:10, padding:"10px 0", fontWeight:800, fontSize:15, cursor:"pointer" }}>{m==="login"?"Sign In":"Register"}</button>))}
          </div>
          {mode==="register" && <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name" style={{ background:BG2, border:"1px solid "+GOLDDIM, color:TEXT, borderRadius:12, width:"100%", padding:"12px 16px", fontSize:16, outline:"none", marginBottom:12 }} />}
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" type="email" style={{ background:BG2, border:"1px solid "+BORDER, color:TEXT, borderRadius:12, width:"100%", padding:"12px 16px", fontSize:16, outline:"none", marginBottom:12 }} />
          <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" type="password" onKeyDown={e=>e.key==="Enter"&&submit()} style={{ background:BG2, border:"1px solid "+BORDER, color:TEXT, borderRadius:12, width:"100%", padding:"12px 16px", fontSize:16, outline:"none", marginBottom:mode==="register"?16:22 }} />
          {mode==="register" && (<div style={{ marginBottom:22 }}><div style={{ color:GOLD, fontWeight:700, fontSize:14, marginBottom:10 }}>Select Your Plan</div><div style={{ display:"flex", gap:8 }}>{["Basic","Pro","Studio"].map(p=>(<button key={p} onClick={()=>setPlan(p)} style={{ flex:1, background:plan===p?GOLD:BG2, color:plan===p?"#000":TEXT2, border:"1px solid "+(plan===p?GOLD:BORDER), borderRadius:10, padding:"9px 0", fontSize:13, fontWeight:700, cursor:"pointer" }}>{p}</button>))}</div><div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}><span style={{ color:TEXT3, fontSize:12 }}>$10/mo</span><span style={{ color:TEXT3, fontSize:12 }}>$20/mo</span><span style={{ color:TEXT3, fontSize:12 }}>$30/mo</span></div>{plan==="Studio"&&(<div style={{ background:"rgba(124,58,237,0.15)", border:"1px solid "+PUR2, borderRadius:10, padding:"10px 14px", marginTop:12, textAlign:"center" }}><div style={{ color:PUR2, fontWeight:700, fontSize:14 }}>7-Day Free Trial included!</div><div style={{ color:TEXT3, fontSize:12, marginTop:4 }}>No charge for the first 7 days.</div></div>)}</div>)}
          {err && <div style={{ color:"#ef4444", fontSize:14, marginBottom:12 }}>{err}</div>}
          <GoldBtn onClick={submit}>{mode==="login"?"Sign In to Studio":"Create Account"}</GoldBtn>
        </div>
        <button onClick={()=>setMode("plans")} style={{ marginTop:20, color:TEXT3, background:"none", border:"none", cursor:"pointer", fontSize:14 }}>&larr; View Plans</button>
        <div style={{ color:TEXT3, fontSize:12, marginTop:12 }}>By continuing you agree to our <span style={{ color:GOLDDIM, cursor:"pointer" }} onClick={()=>go(18)}>Terms of Service</span></div>
      </div>
    </div>
  );
  return (
    <Page sparkle>
      <div style={{ padding:"28px 16px", maxWidth:600, margin:"0 auto" }}>
        <SH>Choose Your Plan</SH>
        <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
          {plans.map(p => (
            <div key={p.name} style={{ border:p.name==="Pro"?"2px solid "+GOLD:p.name==="Studio"?"2px solid "+PUR2:"1px solid "+BORDER, background:BG3, borderRadius:22, padding:24, position:"relative", boxShadow:p.name==="Pro"?"0 0 20px "+GOLDDIM+"44":"none" }}>
              {p.badge && <div style={{ position:"absolute", top:-13, right:20, background:p.name==="Studio"?PUR2:GOLD, color:p.name==="Studio"?"#fff":"#000", fontSize:11, fontWeight:800, letterSpacing:2, padding:"4px 14px", borderRadius:20 }}>{p.badge}</div>}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                <span style={{ color:p.name==="Studio"?PUR2:GOLD, fontWeight:800, fontSize:22 }}>{p.name}</span>
                <div style={{ textAlign:"right" }}><span style={{ color:GOLD2, fontWeight:900, fontSize:28 }}>{p.price}</span><span style={{ fontSize:14, color:TEXT2 }}>{p.period}</span></div>
              </div>
              <ul style={{ color:TEXT2, marginBottom:18, paddingLeft:0, listStyle:"none", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px 12px" }}>
                {p.features.map(f=><li key={f} style={{ fontSize:14, display:"flex", alignItems:"center", gap:6 }}><span style={{ color:GOLD }}>✓</span> {f}</li>)}
              </ul>
              <GoldBtn onClick={()=>{setPlan(p.name);setMode("register");}} style={{ padding:"12px 20px", fontSize:15 }}>{p.name==="Studio"?"Start Free Trial":"Select "+p.name}</GoldBtn>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:24 }}>
          <button onClick={()=>setMode("login")} style={{ background:"none", border:"1px solid "+GOLDDIM, borderRadius:20, padding:"10px 28px", color:GOLD, fontSize:15, cursor:"pointer", fontWeight:700 }}>Already have an account? Sign In</button>
        </div>
      </div>
    </Page>
  );
}

const AI_TOOLS = [
  { page:4, name:"Script To Movie", desc:"Full AI film generation from your script.", icon:"📝" },
  { page:4, name:"Text To Video", desc:"Type a description, AI creates the clip.", icon:"🎥" },
  { page:4, name:"Image To Video", desc:"Bring still images to life with animation.", icon:"🖼️" },
  { page:4, name:"Voice Generator", desc:"Natural AI voiceovers from any text.", icon:"🎙️" },
  { page:4, name:"Music Composer", desc:"Original AI background music for your film.", icon:"🎵" },
  { page:4, name:"Sound FX Maker", desc:"Custom sound effects on demand.", icon:"🔊" },
  { page:4, name:"Dialogue Writer", desc:"Realistic dialogue for any scene.", icon:"💬" },
  { page:4, name:"Storyboard Gen", desc:"Visual storyboards auto-generated.", icon:"🗂️" },
  { page:4, name:"Scene Planner", desc:"AI plans your full scene breakdown.", icon:"🎬" },
  { page:4, name:"Plot Architect", desc:"Build complex multi-act story structures.", icon:"🏗️" },
  { page:4, name:"Character Arc Builder", desc:"Develop deep, believable character arcs.", icon:"🧩" },
  { page:4, name:"Genre Mixer", desc:"Blend genres with AI story assistance.", icon:"🎭" },
  { page:4, name:"Conflict Generator", desc:"AI creates compelling dramatic conflict.", icon:"⚡" },
  { page:4, name:"Theme Analyser", desc:"Identify and strengthen your film's themes.", icon:"🔍" },
  { page:4, name:"Narration Writer", desc:"Powerful narration scripts for documentaries.", icon:"📖" },
  { page:4, name:"Climax Builder", desc:"AI crafts your film's perfect climax.", icon:"🚀" },
  { page:4, name:"Ending Generator", desc:"Multiple ending options for your story.", icon:"🎯" },
  { page:4, name:"Opening Hook", desc:"Captivating opening sequences.", icon:"🪝" },
  { page:4, name:"Act Break Creator", desc:"Perfect act transitions and breaks.", icon:"🎞️" },
  { page:4, name:"Story Consultant", desc:"AI reviews and improves your full script.", icon:"🤖" },
  { page:5, name:"Character Creator", desc:"Unique AI-generated film characters.", icon:"🧑‍🎨" },
  { page:5, name:"Background Gen", desc:"Cinematic backgrounds and settings.", icon:"🌅" },
  { page:5, name:"Prop Maker", desc:"Custom props and set objects.", icon:"🎭" },
  { page:5, name:"Costume Designer", desc:"AI wardrobe and costume design.", icon:"👗" },
  { page:5, name:"Logo Maker", desc:"Professional studio logos instantly.", icon:"🏷️" },
  { page:5, name:"Poster Designer", desc:"Cinema-quality movie posters.", icon:"🖼️" },
  { page:5, name:"Thumbnail Creator", desc:"Eye-catching video thumbnails.", icon:"🖥️" },
  { page:5, name:"Title Card Designer", desc:"Cinematic opening and closing titles.", icon:"🔤" },
  { page:5, name:"Credits Generator", desc:"Professional end credit sequences.", icon:"📋" },
  { page:5, name:"Color Palette AI", desc:"Cinematic colour palettes for your film.", icon:"🎨" },
  { page:5, name:"Set Designer", desc:"Full virtual set design and layout.", icon:"🏠" },
  { page:5, name:"Lighting Designer", desc:"Professional lighting setups.", icon:"💡" },
  { page:5, name:"Expression Animator", desc:"Facial expression animation for characters.", icon:"😊" },
  { page:5, name:"Body Language AI", desc:"Realistic character body movement.", icon:"🕺" },
  { page:5, name:"Age Progression", desc:"Age characters forward or backward.", icon:"⏰" },
  { page:5, name:"Style Transfer", desc:"Apply artistic styles to your footage.", icon:"🎨" },
  { page:5, name:"Brand Kit Builder", desc:"Complete brand assets for your studio.", icon:"📦" },
  { page:5, name:"Lower Third Gen", desc:"Professional broadcast lower thirds.", icon:"📺" },
  { page:5, name:"Overlay Designer", desc:"Animated overlays and graphics.", icon:"✨" },
  { page:5, name:"Watermark Studio", desc:"Custom watermarks for your content.", icon:"💧" },
  { page:6, name:"Motion Video Maker", desc:"Motion graphics and animated sequences.", icon:"🌀" },
  { page:6, name:"3D Scene Builder", desc:"3D environments for your films.", icon:"🏗️" },
  { page:6, name:"Animation Studio", desc:"Frame-by-frame AI animation.", icon:"✏️" },
  { page:6, name:"Color Grader", desc:"Professional cinema colour grading.", icon:"🎨" },
  { page:6, name:"VFX Generator", desc:"Stunning visual effects instantly.", icon:"✨" },
  { page:6, name:"Green Screen AI", desc:"Advanced background replacement.", icon:"🟩" },
  { page:6, name:"Face Swap", desc:"Seamless character face replacement.", icon:"😶" },
  { page:6, name:"Lip Sync AI", desc:"Sync lips to any audio perfectly.", icon:"👄" },
  { page:6, name:"Explosion FX", desc:"Cinematic explosion effects.", icon:"💥" },
  { page:6, name:"Weather FX", desc:"Rain, snow, fog, and atmosphere.", icon:"🌧️" },
  { page:6, name:"Slow Motion AI", desc:"High-quality slow motion from any clip.", icon:"🐌" },
  { page:6, name:"Time Lapse Creator", desc:"Stunning time lapse sequences.", icon:"⏩" },
  { page:6, name:"Freeze Frame FX", desc:"Dramatic freeze frame effects.", icon:"❄️" },
  { page:6, name:"Split Screen", desc:"Professional split screen compositions.", icon:"📱" },
  { page:6, name:"Picture in Picture", desc:"PiP video compositions.", icon:"🖼️" },
  { page:6, name:"Transition Pack", desc:"200+ cinematic transitions.", icon:"🔄" },
  { page:6, name:"Lens Flare Studio", desc:"Cinematic lens effects.", icon:"🌟" },
  { page:6, name:"Particle System", desc:"Dust, sparks, embers and more.", icon:"💫" },
  { page:6, name:"Sky Replacement", desc:"Replace any sky dramatically.", icon:"☁️" },
  { page:6, name:"Object Tracking", desc:"Track and attach VFX to moving objects.", icon:"🎯" },
  { page:7, name:"Script Analyser", desc:"AI improves your full screenplay.", icon:"🔍" },
  { page:7, name:"Plot Generator", desc:"Compelling plot ideas and twists.", icon:"🌀" },
  { page:7, name:"Scene Writer", desc:"Complete scenes from your brief.", icon:"✍️" },
  { page:7, name:"Title Generator", desc:"Powerful film and project titles.", icon:"🔤" },
  { page:7, name:"Tagline Creator", desc:"Memorable marketing taglines.", icon:"💡" },
  { page:7, name:"Press Kit Builder", desc:"Professional press kits automatically.", icon:"📰" },
  { page:7, name:"Social Media Pack", desc:"Full social media content campaigns.", icon:"📱" },
  { page:7, name:"Pitch Deck AI", desc:"Investor-ready pitch presentations.", icon:"📊" },
  { page:7, name:"Synopsis Writer", desc:"Short and long film synopses.", icon:"📄" },
  { page:7, name:"Logline Creator", desc:"One-line film descriptions that sell.", icon:"✏️" },
  { page:7, name:"Treatment Writer", desc:"Full film treatments for development.", icon:"📋" },
  { page:7, name:"Film Review AI", desc:"AI generates glowing film reviews.", icon:"⭐" },
  { page:7, name:"Award Submission", desc:"Festival submission materials.", icon:"🏆" },
  { page:7, name:"EPK Generator", desc:"Electronic press kits for festivals.", icon:"📁" },
  { page:7, name:"Newsletter Writer", desc:"Film production newsletter content.", icon:"📧" },
  { page:7, name:"Blog Post AI", desc:"Film production blog articles.", icon:"✍️" },
  { page:7, name:"Interview Prep", desc:"Q&A prep for film interviews.", icon:"🎤" },
  { page:7, name:"Hashtag Research", desc:"Optimal hashtags for your release.", icon:"#️⃣" },
  { page:7, name:"Ad Copy Writer", desc:"Paid advertising copy for your film.", icon:"📢" },
  { page:7, name:"IMDb Description", desc:"Perfect film database descriptions.", icon:"🎬" },
  { page:8, name:"Upload & Enhance", desc:"Upload footage - AI enhances instantly.", icon:"⬆️" },
  { page:8, name:"Noise Reducer", desc:"Remove audio and video noise.", icon:"🔇" },
  { page:8, name:"Upscaler 4K", desc:"Upscale any footage to 4K.", icon:"📺" },
  { page:8, name:"Upscaler 8K", desc:"Cinema-grade 8K upscaling.", icon:"🎬" },
  { page:8, name:"Stabiliser", desc:"Remove camera shake from footage.", icon:"📷" },
  { page:8, name:"Speed Controller", desc:"Slow-mo, time-ramp any clip.", icon:"⏱️" },
  { page:8, name:"Object Remover", desc:"Remove unwanted objects seamlessly.", icon:"🗑️" },
  { page:8, name:"Text Overlay", desc:"Dynamic animated text on video.", icon:"🔤" },
  { page:8, name:"Watermark Remover", desc:"Clean footage of watermarks.", icon:"🧹" },
  { page:8, name:"Colour Corrector", desc:"Automatic colour correction.", icon:"🎨" },
  { page:8, name:"Exposure Fixer", desc:"Fix over/under exposed footage.", icon:"☀️" },
  { page:8, name:"Sharpness Enhancer", desc:"Improve detail and sharpness.", icon:"🔎" },
  { page:8, name:"Frame Rate Converter", desc:"Convert between frame rates smoothly.", icon:"📽️" },
  { page:8, name:"Aspect Ratio Fixer", desc:"Reframe footage to any ratio.", icon:"📐" },
  { page:8, name:"Interlace Remover", desc:"Deinterlace old footage.", icon:"〰️" },
  { page:8, name:"Audio Sync Tool", desc:"Auto-sync drifted audio tracks.", icon:"🎵" },
  { page:8, name:"Crowd Remover", desc:"Remove crowds from locations.", icon:"👥" },
  { page:8, name:"Flicker Fixer", desc:"Remove lighting flicker from footage.", icon:"💫" },
  { page:8, name:"Codec Converter", desc:"Convert to any video format.", icon:"🔄" },
  { page:8, name:"Batch Processor", desc:"Process multiple clips at once.", icon:"⚡" },
  { page:9, name:"Auto Editor", desc:"AI edits raw footage into polished film.", icon:"🤖" },
  { page:9, name:"Beat Syncer", desc:"Auto-sync cuts to music beats.", icon:"🎶" },
  { page:9, name:"Highlight Reel", desc:"AI creates highlights from long footage.", icon:"⭐" },
  { page:9, name:"Podcast Converter", desc:"Turn any video into a podcast.", icon:"🎙️" },
  { page:9, name:"Shorts Creator", desc:"Auto-clip into viral short content.", icon:"📱" },
  { page:9, name:"SRT Generator", desc:"Auto-generate subtitle files.", icon:"💬" },
  { page:9, name:"Translate & Dub", desc:"Translate and dub in any language.", icon:"🌍" },
  { page:9, name:"Export Optimizer", desc:"Optimal export for any platform.", icon:"📤" },
  { page:9, name:"YouTube Packager", desc:"Full YouTube-ready package.", icon:"▶️" },
  { page:9, name:"Netflix Formatter", desc:"Netflix delivery specifications.", icon:"🎬" },
  { page:9, name:"Festival Package", desc:"Film festival delivery formats.", icon:"🏆" },
  { page:9, name:"Broadcast Master", desc:"Broadcast-ready master file.", icon:"📡" },
  { page:9, name:"Social Clips AI", desc:"Auto-create social media clips.", icon:"📲" },
  { page:9, name:"Chapter Marker AI", desc:"Auto-generate chapter markers.", icon:"📑" },
  { page:9, name:"Thumbnail Sequence", desc:"Thumbnails for every key moment.", icon:"🖼️" },
  { page:9, name:"Colour Space Convert", desc:"Convert between colour spaces.", icon:"🌈" },
  { page:9, name:"HDR Converter", desc:"SDR to HDR conversion.", icon:"💎" },
  { page:9, name:"Dolby Audio Export", desc:"Dolby Atmos audio mastering.", icon:"🔊" },
  { page:9, name:"DCP Creator", desc:"Digital cinema package creation.", icon:"🎥" },
  { page:9, name:"Archive Master", desc:"Long-term archive encoding.", icon:"💾" },
];

const PAGE_LABELS: Record<number,string> = { 4:"Script & Story", 5:"Design & Characters", 6:"Video & VFX", 7:"Writing & Marketing", 8:"Upload & Enhance", 9:"Edit & Export" };

function AIToolBoard({ pageNum, go, addAsset }: { pageNum:number; go:(n:number)=>void; addAsset:(name:string)=>void }) {
  const [search, setSearch] = useState("");
  const tools = AI_TOOLS.filter(t => t.page===pageNum && t.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <Page sparkle>
      <div style={{ padding:"16px", maxWidth:600, margin:"0 auto" }}>
        <SH>AI Tool Board - {PAGE_LABELS[pageNum]}</SH>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search tools..." style={{ background:BG3, border:"1px solid "+PUR2, color:TEXT, borderRadius:16, width:"100%", padding:"12px 16px", outline:"none", fontSize:16, marginBottom:18 }} />
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          {tools.map(t => (
            <div key={t.name} style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:18, padding:16, display:"flex", flexDirection:"column", gap:8, boxShadow:"0 0 12px "+GOLDDIM+"22" }}>
              <div style={{ fontSize:28 }}>{t.icon}</div>
              <div style={{ color:GOLD, fontWeight:800, fontSize:15 }}>{t.name}</div>
              <div style={{ color:TEXT2, fontSize:13, lineHeight:1.6, flexGrow:1 }}>{t.desc}</div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>{addAsset(t.name);go(11);}} style={{ background:PUR2, color:"#fff", fontSize:13, borderRadius:10, padding:"8px 0", border:"none", cursor:"pointer", fontWeight:700, flex:1 }}>Upload</button>
                <button onClick={()=>{addAsset(t.name);go(11);}} style={{ background:"linear-gradient(135deg,"+GOLDDIM+","+GOLD+")", color:"#000", fontSize:13, borderRadius:10, padding:"8px 0", border:"none", cursor:"pointer", fontWeight:700, flex:1 }}>AI Create</button>
              </div>
            </div>
          ))}
        </div>
        {search && tools.length===0 && <p style={{ color:TEXT3, textAlign:"center", marginTop:24, fontSize:16 }}>No tools found for "{search}"</p>}
        <div style={{ display:"flex", gap:8, marginTop:22, flexWrap:"wrap", justifyContent:"center" }}>
          {[4,5,6,7,8,9].map(n=>(<button key={n} onClick={()=>go(n)} style={{ background:n===pageNum?GOLD:BG3, color:n===pageNum?"#000":TEXT2, border:"1px solid "+(n===pageNum?GOLD:BORDER), borderRadius:12, padding:"8px 16px", fontSize:14, cursor:"pointer", fontWeight:700 }}>{PAGE_LABELS[n].split(" ")[0]}</button>))}
        </div>
      </div>
    </Page>
  );
}

function P10({ go }: { go: (n: number) => void }) {
  const [file, setFile] = useState<File|null>(null);
  const [dragging, setDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const handleFile = (f: File) => { setFile(f); setUploading(true); setUploadProgress(0); const iv=setInterval(()=>{setUploadProgress(p=>{if(p>=100){clearInterval(iv);setUploading(false);return 100;}return p+5;});},80); };
  return (
    <Page sparkle>
      <div style={{ padding:"24px 20px", maxWidth:560, margin:"0 auto" }}>
        <SH>Upload Your Movie</SH>
        <div onDragOver={e=>{e.preventDefault();setDragging(true);}} onDragLeave={()=>setDragging(false)} onDrop={e=>{e.preventDefault();setDragging(false);const f=e.dataTransfer.files[0];if(f)handleFile(f);}} onClick={()=>ref.current?.click()} style={{ border:"2px dashed "+(dragging?GOLD:PUR2), background:dragging?"#1a0d40":BG3, borderRadius:22, padding:48, textAlign:"center", cursor:"pointer", transition:"all 0.3s", boxShadow:dragging?"0 0 30px "+PUR2+"44":"none", marginBottom:20 }}>
          <div style={{ fontSize:60, marginBottom:14 }}>🎬</div>
          {file ? (<div><p style={{ color:GOLD, fontWeight:700, fontSize:18, marginBottom:6 }}>{file.name}</p><p style={{ color:TEXT2, fontSize:14 }}>{(file.size/1024/1024).toFixed(1)} MB &bull; {file.type||"video"}</p></div>) : (<><p style={{ color:TEXT, fontWeight:700, marginBottom:8, fontSize:18 }}>Drag & Drop Your Film Here</p><p style={{ color:TEXT3, fontSize:15 }}>or tap to browse your device</p><p style={{ color:TEXT3, fontSize:13, marginTop:10 }}>Supports: MP4, MOV, AVI, MKV, ProRes, DNxHD</p><p style={{ color:GOLDDIM, fontSize:13, marginTop:6 }}>Max size: 50GB &bull; Up to 3-hour films</p></>)}
          <input ref={ref} type="file" accept="video/*,.mov,.avi,.mkv,.mp4,.prores" style={{ display:"none" }} onChange={e=>{const f=e.target.files?.[0];if(f)handleFile(f);}} />
        </div>
        {uploading && (<div style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:16, padding:20, marginBottom:16 }}><div style={{ color:GOLD, fontWeight:700, marginBottom:10, fontSize:16 }}>Uploading... {uploadProgress}%</div><div style={{ background:BG4, borderRadius:8, height:10 }}><div style={{ background:"linear-gradient(90deg,"+PUR2+","+GOLD+")", width:uploadProgress+"%", height:"100%", borderRadius:8, transition:"width 0.1s" }} /></div></div>)}
        {file && uploadProgress===100 && (<div style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:18, padding:20, marginBottom:16 }}><div style={{ color:GOLD, fontWeight:800, fontSize:16, marginBottom:14 }}>File Details</div><div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>{[["File Name",file.name],["File Size",(file.size/1024/1024).toFixed(1)+" MB"],["Format",file.type||"video/mp4"],["Status","Ready for editing"]].map(([k,v])=>(<div key={k} style={{ background:BG4, borderRadius:12, padding:12 }}><div style={{ color:TEXT3, fontSize:12 }}>{k}</div><div style={{ color:GOLD, fontWeight:600, fontSize:14, marginTop:4, wordBreak:"break-all" }}>{v}</div></div>))}</div></div>)}
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {file && uploadProgress===100 && <GoldBtn onClick={()=>go(11)}>Continue to Media Library &rarr;</GoldBtn>}
          <PurBtn onClick={()=>go(11)} style={{ padding:"14px 20px" }}>Skip &mdash; Use Existing Media</PurBtn>
          <div style={{ background:BG3, border:"1px solid "+BORDER, borderRadius:14, padding:16, textAlign:"center" }}>
            <div style={{ color:TEXT3, fontSize:13, marginBottom:8 }}>Or record directly</div>
            <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>{["Record Screen","Record Camera","Import from Cloud","Import from URL"].map(opt=>(<button key={opt} onClick={()=>alert("Coming soon: "+opt)} style={{ background:BG4, border:"1px solid "+BORDER, color:TEXT2, borderRadius:10, padding:"8px 12px", fontSize:12, cursor:"pointer" }}>{opt}</button>))}</div>
          </div>
        </div>
      </div>
    </Page>
  );
}

function P11({ go, assets }: { go:(n:number)=>void; assets:string[] }) {
  const types = ["All","Video","Audio","Image","Generated","SRT"];
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState<"grid"|"list">("list");
  const library = [
    { name:"Opening Scene.mp4", type:"Video", icon:"🎬", size:"245 MB", duration:"2:34" },
    { name:"Background Music.mp3", type:"Audio", icon:"🎵", size:"8.2 MB", duration:"3:45" },
    { name:"Character Art.png", type:"Image", icon:"🖼️", size:"4.1 MB", duration:"-" },
    { name:"Voiceover Track.mp3", type:"Audio", icon:"🎙️", size:"12.4 MB", duration:"1:22" },
    { name:"Title Card.png", type:"Image", icon:"🏷️", size:"1.8 MB", duration:"-" },
    { name:"Ending Credits.mp4", type:"Video", icon:"🎥", size:"180 MB", duration:"1:45" },
    { name:"English Subtitles.srt", type:"SRT", icon:"💬", size:"12 KB", duration:"-" },
    ...assets.map(a=>({ name:a+" (Generated)", type:"Generated", icon:"✨", size:"AI", duration:"-" })),
  ];
  const shown = filter==="All" ? library : library.filter(i=>i.type===filter);
  return (
    <Page sparkle>
      <div style={{ padding:"16px", maxWidth:600, margin:"0 auto" }}>
        <SH>Media Library</SH>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>{types.map(t=>(<button key={t} onClick={()=>setFilter(t)} style={{ background:filter===t?GOLD:BG3, color:filter===t?"#000":TEXT2, border:"1px solid "+(filter===t?GOLD:BORDER), borderRadius:10, padding:"6px 14px", fontSize:14, cursor:"pointer", fontWeight:700 }}>{t}</button>))}</div>
          <div style={{ display:"flex", gap:6 }}>{(["list","grid"] as const).map(v=>(<button key={v} onClick={()=>setView(v)} style={{ background:view===v?GOLDDIM:BG3, color:view===v?GOLD:TEXT3, border:"none", borderRadius:8, padding:"6px 10px", cursor:"pointer", fontSize:14 }}>{v==="list"?"☰":"⊞"}</button>))}</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {shown.map(item=>(<div key={item.name} style={{ background:BG3, border:"1px solid "+BORDER, display:"flex", alignItems:"center", justifyContent:"space-between", borderRadius:14, padding:"14px 18px" }}><div style={{ display:"flex", alignItems:"center", gap:14 }}><span style={{ fontSize:26 }}>{item.icon}</span><div><div style={{ color:TEXT, fontWeight:600, fontSize:16 }}>{item.name}</div><div style={{ color:TEXT3, fontSize:13, marginTop:2 }}>{item.type} &bull; {item.size}</div></div></div><div style={{ display:"flex", gap:8 }}><button onClick={()=>go(13)} style={{ background:PUR2, color:"#fff", border:"none", borderRadius:10, padding:"7px 14px", fontSize:13, cursor:"pointer", fontWeight:700 }}>+ Timeline</button><button style={{ background:BG4, color:TEXT3, border:"1px solid "+BORDER, borderRadius:10, padding:"7px 12px", fontSize:13, cursor:"pointer" }}>&#8942;</button></div></div>))}
        </div>
        <div style={{ display:"flex", gap:12, marginTop:22 }}>
          <GoldBtn onClick={()=>go(13)} style={{ flex:2 }}>Open Timeline Editor &rarr;</GoldBtn>
          <button onClick={()=>go(10)} style={{ flex:1, background:BG3, color:TEXT2, border:"1px solid "+BORDER, borderRadius:14, padding:"14px 0", cursor:"pointer", fontSize:15, fontWeight:700 }}>+ Upload</button>
        </div>
      </div>
    </Page>
  );
}

function P12({ go }: { go: (n: number) => void }) {
  const tabs = ["Script","Storyboard","Notes","Characters","Locations","Research"];
  const [tab, setTab] = useState("Script");
  const [texts, setTexts] = useState<Record<string,string>>({});
  const durations = ["15 min","30 min","45 min","60 min","90 min","120 min","150 min","180 min"];
  const [dur, setDur] = useState("60 min");
  return (
    <Page sparkle>
      <div style={{ padding:"16px", maxWidth:600, margin:"0 auto" }}>
        <SH>Editor Suite</SH>
        <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:10, marginBottom:18 }}>{tabs.map(t=>(<button key={t} onClick={()=>setTab(t)} style={{ background:tab===t?GOLD:BG3, color:tab===t?"#000":TEXT2, border:"1px solid "+(tab===t?GOLD:BORDER), borderRadius:12, padding:"8px 18px", fontSize:15, cursor:"pointer", fontWeight:700, whiteSpace:"nowrap" }}>{t}</button>))}</div>
        <textarea value={texts[tab]||""} onChange={e=>setTexts(prev=>({...prev,[tab]:e.target.value}))} placeholder={"Write your "+tab.toLowerCase()+" here..."} style={{ background:BG3, border:"1px solid "+GOLDDIM, color:TEXT, borderRadius:16, width:"100%", padding:18, minHeight:220, fontSize:16, outline:"none", resize:"vertical", lineHeight:1.8 }} />
        <div style={{ marginTop:20 }}><div style={{ color:GOLD, fontWeight:700, marginBottom:12, fontSize:16 }}>Movie Duration</div><div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>{durations.map(d=>(<button key={d} onClick={()=>setDur(d)} style={{ background:dur===d?GOLD:BG3, color:dur===d?"#000":TEXT2, border:"1px solid "+(dur===d?GOLD:BORDER), borderRadius:10, padding:"8px 16px", fontSize:14, cursor:"pointer", fontWeight:700 }}>{d}</button>))}</div></div>
        <div style={{ display:"flex", gap:12, marginTop:22 }}>
          <GoldBtn onClick={()=>go(13)} style={{ flex:2 }}>Timeline Editor &rarr;</GoldBtn>
          <button style={{ flex:1, background:BG3, color:TEXT2, border:"1px solid "+BORDER, borderRadius:14, padding:"14px 0", cursor:"pointer", fontWeight:700, fontSize:15 }}>&#128190; Save</button>
        </div>
      </div>
    </Page>
  );
}

function P13({ go }: { go: (n: number) => void }) {
  const defaultTracks = [
    { id:1, label:"Video 1", color:"#7c3aed", clips:[{ name:"Opening Scene", w:160 },{ name:"Main Act", w:240 },{ name:"Climax", w:120 }] },
    { id:2, label:"Video 2", color:"#5b21b6", clips:[{ name:"B-Roll 1", w:100 },{ name:"B-Roll 2", w:140 }] },
    { id:3, label:"Audio", color:"#d4a847", clips:[{ name:"Background Music", w:400 },{ name:"Ambient", w:200 }] },
    { id:4, label:"Voiceover", color:"#0e7490", clips:[{ name:"VO Take 1", w:160 },{ name:"VO Take 2", w:120 }] },
    { id:5, label:"SFX", color:"#065f46", clips:[{ name:"Swoosh", w:60 },{ name:"Boom", w:80 },{ name:"Whoosh", w:70 }] },
    { id:6, label:"Music", color:"#92400e", clips:[{ name:"Theme - Full", w:360 }] },
    { id:7, label:"SRT / Subs", color:"#1e40af", clips:[{ name:"English Subs", w:500 }] },
  ];
  const [tracks, setTracks] = useState(defaultTracks);
  const [zoom, setZoom] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [playhead, setPlayhead] = useState(0);
  const [selectedClip, setSelectedClip] = useState<string|null>(null);
  const addTrack = () => { const opts=[{label:"Video",color:"#7c3aed"},{label:"Audio",color:"#d4a847"},{label:"SFX",color:"#065f46"},{label:"Title",color:"#b45309"},{label:"VFX Layer",color:"#7f1d1d"},{label:"Overlay",color:"#134e4a"}]; const o=opts[tracks.length%opts.length]; setTracks(prev=>[...prev,{id:Date.now(),label:o.label+" "+(prev.length+1),color:o.color,clips:[{name:"New Clip",w:100}]}]); };
  useEffect(()=>{ if(!playing)return; const iv=setInterval(()=>setPlayhead(p=>(p+2)%800),50); return ()=>clearInterval(iv); },[playing]);
  const rulerMarks = Array.from({length:20},(_,i)=>i*10);
  return (
    <Page sparkle>
      <div style={{ padding:"16px", maxWidth:700, margin:"0 auto" }}>
        <SH>Timeline Editor</SH>
        <div style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:16, padding:"14px 20px", marginBottom:16, display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={()=>setPlayhead(0)} style={{ background:BG4, border:"1px solid "+BORDER, color:TEXT2, borderRadius:10, padding:"8px 14px", cursor:"pointer", fontSize:16 }}>&#x23EE;</button>
            <button onClick={()=>setPlaying(p=>!p)} style={{ background:playing?GOLD:PUR2, border:"none", color:playing?"#000":"#fff", borderRadius:10, padding:"8px 20px", cursor:"pointer", fontSize:16, fontWeight:700, minWidth:70 }}>{playing?"⏸":"▶"}</button>
            <button onClick={()=>{setPlaying(false);setPlayhead(0);}} style={{ background:BG4, border:"1px solid "+BORDER, color:TEXT2, borderRadius:10, padding:"8px 14px", cursor:"pointer", fontSize:16 }}>&#x23F9;</button>
            <button style={{ background:BG4, border:"1px solid "+BORDER, color:"#ef4444", borderRadius:10, padding:"8px 14px", cursor:"pointer", fontSize:16 }}>&#9679;</button>
          </div>
          <div style={{ color:GOLD, fontWeight:700, fontSize:15, fontFamily:"monospace" }}>{String(Math.floor(playhead/60)).padStart(2,"0")}:{String(playhead%60).padStart(2,"0")}:00</div>
          <div style={{ display:"flex", gap:8, marginLeft:"auto" }}>
            <button onClick={addTrack} style={{ background:PUR2, color:"#fff", border:"none", borderRadius:10, padding:"8px 16px", fontSize:14, cursor:"pointer", fontWeight:700 }}>+ Track</button>
            <button onClick={()=>setZoom(z=>Math.min(z+0.25,3))} style={{ background:BG4, color:TEXT2, border:"1px solid "+BORDER, borderRadius:10, padding:"8px 12px", fontSize:14, cursor:"pointer" }}>🔍+</button>
            <button onClick={()=>setZoom(z=>Math.max(z-0.25,0.25))} style={{ background:BG4, color:TEXT2, border:"1px solid "+BORDER, borderRadius:10, padding:"8px 12px", fontSize:14, cursor:"pointer" }}>🔍-</button>
            <span style={{ color:TEXT3, fontSize:13, alignSelf:"center" }}>{(zoom*100).toFixed(0)}%</span>
          </div>
        </div>
        <div style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:16, overflow:"hidden", marginBottom:16 }}>
          <div style={{ display:"flex", background:"#0a0a0a", borderBottom:"1px solid "+BORDER, paddingLeft:100 }}>
            <div style={{ flex:1, minWidth:600*zoom, display:"flex", position:"relative" }}>
              {rulerMarks.map(m=>(<div key={m} style={{ flex:1, color:TEXT3, fontSize:10, padding:"4px 0", textAlign:"left", paddingLeft:2, borderLeft:"1px solid #222" }}>{m}s</div>))}
              <div style={{ position:"absolute", top:0, left:playhead*(600*zoom/800), width:2, height:"100%", background:GOLD, boxShadow:"0 0 4px "+GOLD }} />
            </div>
          </div>
          <div style={{ overflowX:"auto" }}>
            {tracks.map(track=>(
              <div key={track.id} style={{ display:"flex", borderBottom:"1px solid "+BORDER, minHeight:50, alignItems:"stretch" }}>
                <div style={{ width:100, minWidth:100, background:"#0d0d0d", display:"flex", alignItems:"center", padding:"0 12px", borderRight:"1px solid "+BORDER }}>
                  <div style={{ width:10, height:10, borderRadius:"50%", background:track.color, marginRight:8, flexShrink:0 }} />
                  <span style={{ color:TEXT2, fontSize:12, fontWeight:700, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{track.label}</span>
                </div>
                <div style={{ flex:1, minWidth:600*zoom, position:"relative", padding:"5px 4px", display:"flex", alignItems:"center", gap:4 }}>
                  {track.clips.map((c,i)=>(<div key={i} draggable onClick={()=>setSelectedClip(c.name===selectedClip?null:c.name)} style={{ background:track.color+(selectedClip===c.name?"cc":"55"), border:"1.5px solid "+(selectedClip===c.name?GOLD:track.color), borderRadius:8, padding:"6px 10px", color:"#fff", fontSize:12, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap", minWidth:c.w*zoom, textAlign:"center", height:38, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:selectedClip===c.name?"0 0 8px "+GOLD:"none" }}>{c.name}</div>))}
                  <div style={{ position:"absolute", left:playhead*(600*zoom/800), top:0, bottom:0, width:2, background:GOLD+"88", pointerEvents:"none" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedClip && (<div style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:14, padding:16, marginBottom:16 }}><div style={{ color:GOLD, fontWeight:700, fontSize:15, marginBottom:10 }}>Clip Inspector: {selectedClip}</div><div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>{[["In Point","00:00:00"],["Out Point","00:02:34"],["Duration","2:34"],["Speed","100%"],["Volume","100%"],["Opacity","100%"]].map(([k,v])=>(<div key={k} style={{ background:BG4, borderRadius:10, padding:10 }}><div style={{ color:TEXT3, fontSize:11 }}>{k}</div><div style={{ color:GOLD, fontWeight:600, fontSize:14 }}>{v}</div></div>))}</div></div>)}
        <div style={{ display:"flex", gap:12 }}>
          <GoldBtn onClick={()=>go(14)} style={{ flex:1 }}>Audio Mixer &rarr;</GoldBtn>
          <PurBtn onClick={()=>go(17)} style={{ flex:1 }}>Preview Film &rarr;</PurBtn>
        </div>
      </div>
    </Page>
  );
}

function P14({ go }: { go: (n: number) => void }) {
  const channels = [{ label:"Music", icon:"🎵", color:"#d4a847" },{ label:"Voice", icon:"🎙️", color:"#7c3aed" },{ label:"SFX", icon:"🔊", color:"#065f46" },{ label:"Ambient", icon:"🌊", color:"#0e7490" },{ label:"Master", icon:"🎚️", color:"#b45309" }];
  const [levels, setLevels] = useState([75,85,60,50,90]);
  const [muted, setMuted] = useState([false,false,false,false,false]);
  const [solo, setSolo] = useState([false,false,false,false,false]);
  const effects = ["Reverb","Echo","EQ","Compressor","Limiter","Noise Gate","De-Esser","Chorus"];
  const [fx, setFx] = useState<string[]>([]);
  const [masterVol, setMasterVol] = useState(80);
  return (
    <Page sparkle>
      <div style={{ padding:"16px", maxWidth:600, margin:"0 auto" }}>
        <SH>Audio Mixer</SH>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10, marginBottom:24 }}>
          {channels.map((ch,i)=>(
            <div key={ch.label} style={{ background:BG3, border:"1px solid "+(muted[i]?"#ef4444":ch.color+"66"), borderRadius:16, display:"flex", flexDirection:"column", alignItems:"center", padding:"16px 6px", gap:8 }}>
              <span style={{ fontSize:22 }}>{ch.icon}</span>
              <span style={{ color:ch.color, fontSize:11, fontWeight:800, textAlign:"center" }}>{ch.label}</span>
              <div style={{ height:110, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                <input type="range" min={0} max={100} value={levels[i]} onChange={e=>setLevels(prev=>{const n=[...prev];n[i]=+e.target.value;return n;})} style={{ height:90, writingMode:"vertical-lr" as any, direction:"rtl" as any }} />
                <span style={{ color:TEXT3, fontSize:11 }}>{levels[i]}</span>
              </div>
              <div style={{ width:"80%", height:6, background:BG4, borderRadius:3 }}><div style={{ width:(muted[i]?0:levels[i])+"%", height:"100%", background:"linear-gradient(90deg,#2ecc71,"+ch.color+")", borderRadius:3, transition:"width 0.1s" }} /></div>
              <div style={{ display:"flex", gap:4 }}>
                <button onClick={()=>setMuted(prev=>{const n=[...prev];n[i]=!n[i];return n;})} style={{ background:muted[i]?"#7f1d1d":BG4, color:muted[i]?"#ef4444":TEXT3, border:"1px solid "+(muted[i]?"#ef4444":BORDER), borderRadius:6, padding:"3px 6px", fontSize:10, cursor:"pointer", fontWeight:700 }}>M</button>
                <button onClick={()=>setSolo(prev=>{const n=[...prev];n[i]=!n[i];return n;})} style={{ background:solo[i]?"#713f12":BG4, color:solo[i]?GOLD:TEXT3, border:"1px solid "+(solo[i]?GOLD:BORDER), borderRadius:6, padding:"3px 6px", fontSize:10, cursor:"pointer", fontWeight:700 }}>S</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:14, padding:16, marginBottom:18 }}><div style={{ color:GOLD, fontWeight:700, marginBottom:10, fontSize:15 }}>Master Volume: {masterVol}%</div><input type="range" min={0} max={100} value={masterVol} onChange={e=>setMasterVol(+e.target.value)} style={{ width:"100%" }} /></div>
        <div style={{ color:GOLD, fontWeight:700, marginBottom:10, fontSize:15 }}>Audio Effects</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:20 }}>{effects.map(e=>(<button key={e} onClick={()=>setFx(prev=>prev.includes(e)?prev.filter(x=>x!==e):[...prev,e])} style={{ background:fx.includes(e)?PUR2:BG3, color:fx.includes(e)?"#fff":TEXT2, border:"1px solid "+(fx.includes(e)?PUR2:BORDER), borderRadius:10, padding:"8px 16px", fontSize:14, cursor:"pointer", fontWeight:700 }}>{e}</button>))}</div>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={()=>go(13)} style={{ flex:1, background:BG3, color:TEXT2, border:"1px solid "+BORDER, borderRadius:14, padding:"14px 0", cursor:"pointer", fontSize:15, fontWeight:700 }}>&#8592; Timeline</button>
          <GoldBtn onClick={()=>go(15)} style={{ flex:2 }}>Render Film &rarr;</GoldBtn>
        </div>
      </div>
    </Page>
  );
}

function P15({ go }: { go: (n: number) => void }) {
  const qualities = [{ label:"720p HD", sub:"Web & Streaming", icon:"📺" },{ label:"1080p FHD", sub:"Standard Cinema", icon:"🖥️" },{ label:"4K UHD", sub:"Premium Cinema", icon:"🎬" },{ label:"8K", sub:"Cinema Master", icon:"💎" }];
  const formats = ["MP4 (H.264)","MP4 (H.265)","MOV (ProRes)","MOV (DNxHD)","AVI","MKV","WebM"];
  const socialPlatforms = [{ name:"YouTube", icon:"▶️", spec:"Up to 8K, any length" },{ name:"Instagram", icon:"📸", spec:"1:1 or 16:9, 60s max" },{ name:"TikTok", icon:"🎵", spec:"9:16, 10min max" },{ name:"Facebook", icon:"📘", spec:"16:9, 4K" },{ name:"Twitter/X", icon:"🐦", spec:"720p, 2:20 max" },{ name:"Vimeo", icon:"🎞️", spec:"Up to 4K" },{ name:"Netflix", icon:"🎬", spec:"4K ProRes" },{ name:"Amazon", icon:"📦", spec:"4K HDR" },{ name:"Apple TV+", icon:"🍎", spec:"4K Dolby Vision" },{ name:"Film Festival", icon:"🏆", spec:"DCP format" }];
  const [quality, setQuality] = useState("1080p FHD");
  const [format, setFormat] = useState("MP4 (H.264)");
  const [duration, setDuration] = useState(60);
  const [rendering, setRendering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [renderStage, setRenderStage] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const stages = ["Analysing timeline...","Applying colour grade...","Encoding video...","Processing audio...","Muxing tracks...","Optimising output...","Finalising render..."];
  const startRender = () => { setRendering(true); setProgress(0); let si=0; setRenderStage(stages[0]); const iv=setInterval(()=>{setProgress(p=>{const np=p+1.5;if(np>=100){clearInterval(iv);setRendering(false);setRenderStage("Complete!");return 100;}const ns=Math.floor((np/100)*stages.length);if(ns!==si&&ns<stages.length){si=ns;setRenderStage(stages[ns]);}return np;});},80); };
  return (
    <Page sparkle>
      <div style={{ padding:"16px", maxWidth:600, margin:"0 auto" }}>
        <SH>Render & Export</SH>
        <div style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:18, padding:20, marginBottom:16 }}>
          <div style={{ color:GOLD, fontWeight:800, marginBottom:10, fontSize:16 }}>Film Duration: {duration} minutes {duration>=60?"("+Math.floor(duration/60)+"hr "+duration%60+"min)":""}</div>
          <input type="range" min={1} max={180} value={duration} onChange={e=>setDuration(+e.target.value)} style={{ width:"100%" }} />
          <div style={{ display:"flex", justifyContent:"space-between", color:TEXT3, fontSize:13, marginTop:6 }}><span>1 min</span><span>90 min</span><span>3 hrs max</span></div>
        </div>
        <div style={{ background:BG3, border:"1px solid "+BORDER, borderRadius:18, padding:20, marginBottom:16 }}>
          <div style={{ color:GOLD, fontWeight:800, marginBottom:12, fontSize:16 }}>Export Quality</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>{qualities.map(q=>(<button key={q.label} onClick={()=>setQuality(q.label)} style={{ background:quality===q.label?GOLDDIM:BG4, border:"2px solid "+(quality===q.label?GOLD:BORDER), borderRadius:12, padding:"12px 0", cursor:"pointer", textAlign:"center" }}><div style={{ fontSize:22 }}>{q.icon}</div><div style={{ color:quality===q.label?GOLD:TEXT, fontWeight:700, fontSize:15 }}>{q.label}</div><div style={{ color:TEXT3, fontSize:12 }}>{q.sub}</div></button>))}</div>
        </div>
        <div style={{ background:BG3, border:"1px solid "+BORDER, borderRadius:18, padding:20, marginBottom:16 }}>
          <div style={{ color:GOLD, fontWeight:800, marginBottom:12, fontSize:16 }}>File Format</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>{formats.map(f=>(<button key={f} onClick={()=>setFormat(f)} style={{ background:format===f?PUR2:BG4, color:format===f?"#fff":TEXT2, border:"1px solid "+(format===f?PUR2:BORDER), borderRadius:10, padding:"8px 14px", cursor:"pointer", fontWeight:700, fontSize:14 }}>{f}</button>))}</div>
        </div>
        <div style={{ background:BG3, border:"1px solid "+BORDER, borderRadius:18, padding:20, marginBottom:16 }}>
          <div style={{ color:GOLD, fontWeight:800, marginBottom:12, fontSize:16 }}>Export Destinations</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>{socialPlatforms.map(p=>(<button key={p.name} onClick={()=>setSelectedPlatforms(prev=>prev.includes(p.name)?prev.filter(x=>x!==p.name):[...prev,p.name])} style={{ background:selectedPlatforms.includes(p.name)?"rgba(212,168,71,0.15)":BG4, border:"1.5px solid "+(selectedPlatforms.includes(p.name)?GOLD:BORDER), borderRadius:12, padding:"10px 14px", cursor:"pointer", display:"flex", alignItems:"center", gap:10, textAlign:"left" }}><span style={{ fontSize:20 }}>{p.icon}</span><div><div style={{ color:selectedPlatforms.includes(p.name)?GOLD:TEXT, fontWeight:700, fontSize:14 }}>{p.name}</div><div style={{ color:TEXT3, fontSize:11 }}>{p.spec}</div></div>{selectedPlatforms.includes(p.name)&&<span style={{ marginLeft:"auto", color:GOLD }}>✓</span>}</button>))}</div>
        </div>
        {rendering && (<div style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:16, padding:20, marginBottom:16 }}><div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}><div style={{ color:GOLD, fontWeight:700, fontSize:16 }}>Rendering...</div><div style={{ color:GOLD2, fontWeight:900, fontSize:16 }}>{Math.round(progress)}%</div></div><div style={{ background:BG4, borderRadius:8, height:12, marginBottom:8 }}><div style={{ background:"linear-gradient(90deg,"+PUR2+","+GOLD+")", width:progress+"%", height:"100%", borderRadius:8, transition:"width 0.1s" }} /></div><div style={{ color:TEXT3, fontSize:14 }}>{renderStage}</div></div>)}
        {progress>=100 && (<div style={{ background:"rgba(212,168,71,0.1)", border:"1.5px solid "+GOLD, borderRadius:16, padding:20, marginBottom:16 }}><div style={{ color:GOLD, fontWeight:800, fontSize:18, marginBottom:8 }}>&#10003; Render Complete!</div><div style={{ color:TEXT2, fontSize:15, marginBottom:16 }}>Your film is ready in {quality} {format} &bull; {duration} minutes</div><div style={{ display:"flex", gap:10 }}><GoldBtn onClick={()=>{}} style={{ flex:1 }}>&#11015; Download Film</GoldBtn><button style={{ flex:1, background:PUR2, color:"#fff", border:"none", borderRadius:14, padding:"14px 0", cursor:"pointer", fontSize:15, fontWeight:700 }}>Share Now</button></div></div>)}
        {!rendering && progress<100 && (<GoldBtn onClick={startRender}>&#127916; Render Film ({quality} &bull; {duration} min)</GoldBtn>)}
      </div>
    </Page>
  );
}

function P16({ go }: { go: (n: number) => void }) {
  const tuts = [{ title:"Getting Started with MandaStrong", duration:"8 min", icon:"🚀", cat:"Beginner", views:"12.4K" },{ title:"Using the AI Tool Board", duration:"12 min", icon:"🤖", cat:"Beginner", views:"9.1K" },{ title:"Professional Timeline Editing", duration:"18 min", icon:"✂️", cat:"Intermediate", views:"7.3K" },{ title:"Audio Mixing Deep Dive", duration:"20 min", icon:"🎛️", cat:"Intermediate", views:"5.8K" },{ title:"Advanced VFX Techniques", duration:"25 min", icon:"✨", cat:"Advanced", views:"4.2K" },{ title:"Colour Grading Like a Pro", duration:"15 min", icon:"🎨", cat:"Advanced", views:"6.1K" },{ title:"Export & Distribution Guide", duration:"10 min", icon:"📤", cat:"Beginner", views:"8.7K" },{ title:"Working with AI Characters", duration:"14 min", icon:"🧑‍🎨", cat:"Intermediate", views:"3.9K" }];
  const [playing, setPlaying] = useState<string|null>(null);
  return (
    <Page sparkle>
      <div style={{ padding:"16px", maxWidth:600, margin:"0 auto" }}>
        <SH>Tutorials & Learning Centre</SH>
        {playing && (<div style={{ background:BG3, border:"1px solid "+PUR2, borderRadius:18, padding:20, marginBottom:20 }}><div style={{ color:GOLD, fontWeight:700, marginBottom:10, fontSize:16 }}>&#9654; Now Playing: {playing}</div><div style={{ background:"#000", borderRadius:14, height:180, display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ color:TEXT3, fontSize:16 }}>Video player &mdash; {playing}</span></div><button onClick={()=>setPlaying(null)} style={{ marginTop:10, color:TEXT3, background:"none", border:"none", cursor:"pointer", fontSize:15 }}>&#10005; Close</button></div>)}
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>{tuts.map(t=>(<div key={t.title} style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:16, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px" }}><div style={{ display:"flex", alignItems:"center", gap:14 }}><span style={{ fontSize:26 }}>{t.icon}</span><div><div style={{ color:TEXT, fontWeight:600, fontSize:16 }}>{t.title}</div><div style={{ color:TEXT3, fontSize:13, marginTop:4 }}>{t.cat} &bull; {t.duration} &bull; {t.views} views</div></div></div><button onClick={()=>setPlaying(t.title)} style={{ background:PUR2, color:"#fff", border:"none", borderRadius:12, padding:"8px 16px", fontSize:14, cursor:"pointer", fontWeight:700, flexShrink:0 }}>&#9654; Play</button></div>))}</div>
        <div style={{ marginTop:20, background:BG3, borderRadius:18, padding:20, border:"1px solid "+GOLDDIM }}>
          <div style={{ color:GOLD, fontWeight:800, marginBottom:12, fontSize:16 }}>Learning Paths</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>{[["📗 Beginner","Complete your first 30-minute film in one day"],["📘 Intermediate","Master multi-track editing and colour grading"],["📕 Advanced","Professional cinema production workflows"]].map(([t,d])=>(<div key={t} style={{ background:BG4, borderRadius:12, padding:"12px 16px" }}><div style={{ color:GOLD, fontWeight:700, fontSize:15 }}>{t}</div><div style={{ color:TEXT2, fontSize:14, marginTop:4 }}>{d}</div></div>))}</div>
        </div>
        <div style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:18, padding:20, marginTop:16 }}>
          <div style={{ color:GOLD, fontWeight:800, marginBottom:14, fontSize:16 }}>Pro Tips from the Studio</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>{[{ tip:"Always colour grade AFTER editing - never before.", icon:"🎨" },{ tip:"Use the Beat Syncer AI tool to auto-cut to your soundtrack.", icon:"🎵" },{ tip:"Export a proxy edit first to check timing before final render.", icon:"⚡" },{ tip:"Add SRT subtitles to increase film views by up to 40%.", icon:"💬" },{ tip:"Use the Audio Mixer Noise Gate to clean up location sound.", icon:"🔊" }].map((p,i)=>(<div key={i} style={{ background:BG4, borderRadius:12, padding:"11px 14px", display:"flex", gap:12, alignItems:"center" }}><span style={{ fontSize:22, flexShrink:0 }}>{p.icon}</span><span style={{ color:TEXT2, fontSize:14, lineHeight:1.6 }}>{p.tip}</span></div>))}</div>
        </div>
      </div>
    </Page>
  );
}

function P17({ go }: { go: (n: number) => void }) {
  const [playing, setPlaying] = useState(false);
  return (
    <Page sparkle>
      <div style={{ padding:"16px", maxWidth:600, margin:"0 auto" }}>
        <SH>Film Preview</SH>
        <div style={{ background:"#000", borderRadius:20, overflow:"hidden", marginBottom:18, border:"1px solid "+GOLDDIM, boxShadow:"0 0 30px "+GOLDDIM+"44" }}>
          {!playing ? (<div onClick={()=>setPlaying(true)} style={{ aspectRatio:"16/9", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:14, cursor:"pointer", background:"radial-gradient(circle,#1a1200,#000)", minHeight:200 }}><div style={{ width:70, height:70, borderRadius:"50%", background:GOLD+"22", border:"2px solid "+GOLDDIM, display:"flex", alignItems:"center", justifyContent:"center" }}><div style={{ fontSize:30, color:GOLD }}>&#9654;</div></div><div style={{ color:TEXT2, fontSize:16 }}>Tap to preview your film</div></div>) : (<div style={{ aspectRatio:"16/9", display:"flex", alignItems:"center", justifyContent:"center", background:"#111", minHeight:200 }}><div style={{ color:TEXT2, fontSize:16 }}>&#9654; Playing preview...</div></div>)}
        </div>
        <div style={{ background:BG3, border:"1px solid "+BORDER, borderRadius:14, padding:16, marginBottom:18 }}>
          <div style={{ color:GOLD, fontWeight:700, marginBottom:10, fontSize:15 }}>Film Info</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>{[["Duration","01:05:32"],["Resolution","1080p"],["Tracks","7"],["Audio","Stereo"],["Subtitles","EN"],["Format","MP4"]].map(([k,v])=>(<div key={k} style={{ background:BG4, borderRadius:10, padding:"10px 12px" }}><div style={{ color:TEXT3, fontSize:12 }}>{k}</div><div style={{ color:GOLD, fontWeight:700, fontSize:15, marginTop:4 }}>{v}</div></div>))}</div>
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <GoldBtn onClick={()=>go(15)} style={{ flex:2 }}>&#127916; Render Film</GoldBtn>
          <PurBtn onClick={()=>go(13)} style={{ flex:1 }}>&#8592; Edit</PurBtn>
        </div>
      </div>
    </Page>
  );
}

function P18({ go }: { go: (n: number) => void }) {
  return (
    <Page sparkle>
      <div style={{ padding:"28px 20px", maxWidth:580, margin:"0 auto" }}>
        <SH>Terms of Service & Disclaimer</SH>
        <div style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:20, padding:26, marginBottom:24, boxShadow:"0 0 16px "+GOLDDIM+"22" }}>
          <div style={{ color:GOLD, fontWeight:900, fontSize:19, marginBottom:16, letterSpacing:1 }}>Terms of Service</div>
          <p style={{ color:TEXT2, lineHeight:2.0, fontSize:15 }}>By accessing and using MandaStrong Studio ("the Platform"), you agree to be bound by these Terms of Service. You must be at least 18 years of age to use this Platform. You retain full copyright ownership of all original content you create using MandaStrong Studio. You grant MandaStrong Studio a limited, non-exclusive, royalty-free licence to host, store, and display your content solely for the purpose of providing the service. You must not upload content that infringes third-party intellectual property rights, contains explicit, illegal, or harmful material, or violates any applicable laws. MandaStrong Studio reserves the right to suspend or permanently terminate accounts that breach these terms without prior notice. All subscriptions are billed monthly or annually in advance. You may cancel your subscription at any time with cancellation taking effect at the end of your current billing period. Refunds are issued solely at our discretion within 7 days of initial purchase. Studio Plan subscribers receive a 7-day free trial during which no charge is applied; cancellation before the trial ends incurs no fee. We reserve the right to modify these terms at any time, with changes communicated via email or platform notification.</p>
        </div>
        <div style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:20, padding:26, marginBottom:24, boxShadow:"0 0 16px "+GOLDDIM+"22" }}>
          <div style={{ color:GOLD, fontWeight:900, fontSize:19, marginBottom:16, letterSpacing:1 }}>Disclaimer</div>
          <p style={{ color:TEXT2, lineHeight:2.0, fontSize:15 }}>MandaStrong Studio provides AI-powered creative tools, editing software, and filmmaking resources on an "as is" and "as available" basis. While we invest significantly in the reliability, accuracy, and quality of our services and AI-generated outputs, we make no express or implied warranties regarding the uninterrupted availability of the Platform, the suitability of AI-generated content for any specific purpose, or the fitness of exported films for broadcast, streaming, or commercial distribution. MandaStrong Studio, its directors, employees, affiliates, and technology partners shall not be held liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the Platform, including but not limited to data loss, rendering failures, or unsatisfactory AI outputs. The educational resources, tutorials, and informational content provided through MandaStrong Studio are intended for general creative guidance only and do not constitute professional legal, financial, psychological, or broadcast engineering advice. Users are solely responsible for ensuring their content complies with the laws and regulations of their jurisdiction, including copyright law, privacy law, and broadcasting standards. By using this Platform you acknowledge that you have read, understood, and agree to be bound by this disclaimer in its entirety.</p>
        </div>
        <GoldBtn onClick={()=>go(19)}>Continue to Help Desk &rarr;</GoldBtn>
      </div>
    </Page>
  );
}

function P19({ go }: { go: (n: number) => void }) {
  const [msgs, setMsgs] = useState<{ role:string; content:string }[]>([]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{ bottomRef.current?.scrollIntoView({ behavior:"smooth" }); },[msgs,loading]);
  const send = async () => {
    if (!inp.trim()||loading) return;
    const userMsg = inp.trim(); setInp("");
    const history = [...msgs,{ role:"user", content:userMsg }];
    setMsgs(history); setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{ method:"POST", headers:{ "Content-Type":"application/json","anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true" }, body:JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:1200, system:"You are Agent Grok, the elite 24/7 AI Production Assistant for MandaStrong Studio. Help users with uploading media, using 600+ AI tools, timeline editing, audio mixing, rendering, exporting to YouTube/Netflix/festivals, and all filmmaking questions. Plans: Basic $10/mo, Pro $20/mo, Studio $30/mo (7-day free trial). Be professional and genuinely helpful.", messages:history.map(m=>({ role:m.role, content:m.content })) }) });
      const data = await res.json();
      const reply = data.content?.map((c: any)=>c.text||"").join("")||"I am here to assist. Please try again.";
      setMsgs([...history,{ role:"assistant", content:reply }]);
    } catch { setMsgs([...history,{ role:"assistant", content:"Connection issue - please try again." }]); }
    setLoading(false);
  };
  const quickQ = ["How do I upload my footage?","What AI tools do you recommend?","How do I render in 4K?","How do I add subtitles?","Can I export to Netflix?","What is the Studio free trial?"];
  return (
    <Page sparkle>
      <div style={{ padding:"16px", maxWidth:600, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:20 }}>
          <div style={{ width:70, height:70, border:"2.5px solid "+GOLD, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, margin:"0 auto 10px", background:BG3, boxShadow:"0 0 25px "+GOLDDIM }}>🤖</div>
          <div style={{ color:GOLD2, fontWeight:900, fontSize:22, letterSpacing:3 }}>AGENT GROK</div>
          <div style={{ fontSize:13, color:TEXT3, marginTop:4, letterSpacing:1 }}>MandaStrong Studio &bull; 24/7 Production Intelligence &bull; <span style={{ color:"#2ecc71" }}>● LIVE</span></div>
        </div>
        <div style={{ display:"flex", gap:10, marginBottom:18, flexWrap:"wrap" }}>
          {[["System","Operational"],["AI Engine","Claude Sonnet"],["Response","under 2s"],["Uptime","99.9%"]].map(([k,v])=>(<div key={k} style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:10, padding:"6px 14px", display:"flex", gap:8, alignItems:"center" }}><div style={{ width:6, height:6, borderRadius:"50%", background:"#2ecc71" }} /><span style={{ color:TEXT3, fontSize:12 }}>{k}:</span><span style={{ color:GOLD, fontSize:12, fontWeight:700 }}>{v}</span></div>))}
        </div>
        <div style={{ background:BG2, border:"1px solid "+BORDER, borderRadius:18, padding:16, minHeight:300, maxHeight:420, overflowY:"auto", display:"flex", flexDirection:"column", gap:12, marginBottom:14 }}>
          {msgs.length===0 && (<div style={{ padding:"16px 18px", background:"rgba(26,82,118,0.2)", borderLeft:"3px solid #2980b9", color:"#aed6f1", fontSize:15, lineHeight:1.8, borderRadius:10 }}><strong>Agent Grok online.</strong> I am your AI production assistant for MandaStrong Studio, powered by Claude AI. What are you working on today?</div>)}
          {msgs.map((m,i)=>(<div key={i} style={{ padding:"14px 18px", borderRadius:12, fontSize:15, lineHeight:1.8, background:m.role==="user"?"rgba(212,168,71,0.1)":"rgba(26,82,118,0.2)", borderLeft:"3px solid "+(m.role==="user"?GOLDDIM:"#2980b9"), color:m.role==="user"?TEXT:"#aed6f1" }}><span style={{ fontSize:11, color:TEXT3, display:"block", marginBottom:6, fontWeight:700, letterSpacing:1 }}>{m.role==="user"?"YOU":"AGENT GROK"}</span>{m.content}</div>))}
          {loading && (<div style={{ padding:"14px 18px", background:"rgba(26,82,118,0.2)", borderLeft:"3px solid #2980b9", borderRadius:12, color:TEXT3, fontSize:14, fontStyle:"italic" }}>Agent Grok is thinking...</div>)}
          <div ref={bottomRef} />
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:12 }}>{quickQ.map(q=>(<button key={q} onClick={()=>setInp(q)} style={{ background:BG3, border:"1px solid "+GOLDDIM, color:TEXT3, borderRadius:10, padding:"6px 12px", fontSize:13, cursor:"pointer" }}>{q}</button>))}</div>
        <div style={{ display:"flex", gap:10 }}>
          <textarea value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Ask Agent Grok anything about your production..." style={{ flex:1, height:56, resize:"none", padding:"14px 16px", fontSize:15, background:BG3, border:"1px solid "+GOLDDIM, color:TEXT, borderRadius:14, outline:"none", lineHeight:1.5 }} />
          <button onClick={send} disabled={loading||!inp.trim()} style={{ height:56, padding:"0 22px", background:"linear-gradient(135deg,"+GOLDDIM+","+GOLD+")", color:"#000", fontWeight:900, border:"none", borderRadius:14, cursor:"pointer", opacity:loading||!inp.trim()?0.5:1, fontSize:15 }}>Ask</button>
        </div>
      </div>
    </Page>
  );
}

type CPost = { id:number; user:string; title:string; desc:string; likes:number; videoFile:File|null; comments:string[] };

function CommunityCard({ post, onLike, onComment }: { post:CPost; onLike:()=>void; onComment:(c:string)=>void }) {
  const [cmtOpen, setCmtOpen] = useState(false);
  const [cmtText, setCmtText] = useState("");
  const [reacted, setReacted] = useState("");
  const EMOJIS = ["❤️","👏","🔥","🙌","😍","🎬","⭐","💯"];
  const videoSrc = post.videoFile ? URL.createObjectURL(post.videoFile) : null;
  return (
    <div style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:22, overflow:"hidden", marginBottom:20, boxShadow:"0 0 12px "+GOLDDIM+"33" }}>
      <div style={{ background:"#000", minHeight:150 }}>
        {videoSrc ? (<video src={videoSrc} controls playsInline style={{ width:"100%", display:"block", maxHeight:200, objectFit:"cover" }} />) : (<div style={{ height:150, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:10 }}><div style={{ fontSize:50, opacity:0.35 }}>🎬</div><div style={{ color:TEXT3, fontSize:14 }}>No video uploaded</div></div>)}
      </div>
      <div style={{ padding:18 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
          <div style={{ color:GOLD, fontWeight:800, fontSize:17 }}>{post.title}</div>
          {post.likes>80 && <span style={{ background:GOLDDIM, color:GOLD2, borderRadius:10, padding:"3px 10px", fontSize:11, fontWeight:800 }}>🔥 TRENDING</span>}
        </div>
        <div style={{ color:TEXT3, fontSize:13, marginBottom:8 }}>by {post.user}</div>
        <div style={{ color:TEXT2, fontSize:15, marginBottom:14, lineHeight:1.6 }}>{post.desc}</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:12, alignItems:"center" }}>
          {EMOJIS.map(e=>(<button key={e} onClick={()=>{setReacted(e);onLike();}} style={{ background:reacted===e?"#2d1b69":BG4, border:"1.5px solid "+(reacted===e?PUR2:BORDER), borderRadius:10, padding:"6px 10px", fontSize:18, cursor:"pointer" }}>{e}</button>))}
          <span style={{ color:GOLDDIM, fontWeight:800, fontSize:15, marginLeft:6 }}>{post.likes}</span>
        </div>
        <button onClick={()=>setCmtOpen(!cmtOpen)} style={{ background:"none", border:"none", color:TEXT3, fontSize:15, cursor:"pointer", marginBottom:cmtOpen?12:0 }}>💬 {post.comments.length} comment{post.comments.length!==1?"s":""} {cmtOpen?"▾":"▸"}</button>
        {cmtOpen && (<div>{post.comments.map((c,i)=>(<div key={i} style={{ background:BG4, borderRadius:12, padding:"10px 14px", fontSize:15, color:TEXT2, marginBottom:8, lineHeight:1.6 }}>{c}</div>))}<div style={{ display:"flex", gap:8, marginTop:10 }}><input value={cmtText} onChange={e=>setCmtText(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&cmtText.trim()){onComment(cmtText.trim());setCmtText("");}}} placeholder="Write a comment..." style={{ flex:1, background:BG2, border:"1px solid "+BORDER, color:TEXT, borderRadius:12, padding:"10px 14px", fontSize:15, outline:"none" }} /><button onClick={()=>{if(cmtText.trim()){onComment(cmtText.trim());setCmtText("");}}} style={{ background:PUR2, color:"#fff", border:"none", borderRadius:12, padding:"10px 18px", fontSize:15, cursor:"pointer", fontWeight:700 }}>Post</button></div></div>)}
      </div>
    </div>
  );
}

function P20({ go }: { go: (n: number) => void }) {
  const [posts, setPosts] = useState<CPost[]>([
    { id:1, user:"CineCreator", title:"The Bully's Redemption", desc:"A powerful short film about second chances and the courage to change.", likes:47, videoFile:null, comments:["Absolutely powerful message!","This moved me to tears."] },
    { id:2, user:"FilmMakerJ", title:"Social Skills 101", desc:"An animated educational film created for schools to teach communication skills.", likes:89, videoFile:null, comments:["Perfect for the classroom!","Teachers love this."] },
    { id:3, user:"StoryTeller_M", title:"Together We Rise", desc:"A community fundraiser documentary about unity and hope.", likes:134, videoFile:null, comments:["Shared this everywhere!","Inspiring work."] },
  ]);
  const uploadRef = useRef<HTMLInputElement>(null);
  const addPost = (file: File) => { const title=file.name.split(".").slice(0,-1).join(".")||file.name; setPosts(prev=>[{ id:Date.now(), user:"You", title, desc:"Just uploaded to MandaStrong Community.", likes:0, videoFile:file, comments:[] },...prev]); };
  return (
    <Page sparkle>
      <div style={{ padding:"16px", maxWidth:600, margin:"0 auto" }}>
        <SH>Community Hub</SH>
        <p style={{ color:TEXT2, fontSize:16, marginBottom:18, lineHeight:1.8 }}>Share your finished films. React with emojis, leave comments, and inspire fellow creators around the world.</p>
        <input ref={uploadRef} type="file" accept="video/*" style={{ display:"none" }} onChange={e=>{const f=e.target.files?.[0];if(f)addPost(f);}} />
        <button onClick={()=>uploadRef.current?.click()} style={{ background:"linear-gradient(135deg,"+PUR3+",#1e0a4a)", border:"2px dashed "+PUR2, borderRadius:18, width:"100%", padding:20, color:GOLD, cursor:"pointer", marginBottom:24, fontSize:16, fontWeight:800, letterSpacing:1 }}>🎬 Upload Your Film to the Community</button>
        {posts.map(p=>(<CommunityCard key={p.id} post={p} onLike={()=>setPosts(prev=>prev.map(x=>x.id===p.id?{...x,likes:x.likes+1}:x))} onComment={c=>setPosts(prev=>prev.map(x=>x.id===p.id?{...x,comments:[...x.comments,c]}:x))} />))}
      </div>
    </Page>
  );
}

function P21({ go }: { go: (n: number) => void }) {
  const [guideOpen, setGuideOpen] = useState(false);
  return (
    <div style={{ background:"radial-gradient(ellipse at 50% 20%, #1a1200 0%, #0d0900 50%, #000 100%)", minHeight:"100vh", paddingTop:56, position:"relative", overflow:"hidden" }}>
      <Sparkles />
      <div style={{ position:"relative", zIndex:1, padding:"24px 20px", maxWidth:560, margin:"0 auto" }}>
        <div style={{ borderRadius:20, overflow:"hidden", marginBottom:26, background:"#000", border:"2px solid "+GOLDDIM, boxShadow:"0 0 40px "+GOLDDIM+"66" }}>
          <video src="/video3.mp4" controls autoPlay muted loop playsInline style={{ width:"100%", display:"block", maxHeight:240, objectFit:"cover" }} />
        </div>
        <h1 style={{ color:GOLD2, fontWeight:900, fontSize:38, textAlign:"center", textTransform:"uppercase", letterSpacing:4, marginBottom:6, animation:"studioGlow 2s ease-in-out infinite" }}>That's All Folks!</h1>
        <div style={{ color:GOLDDIM, textAlign:"center", fontSize:15, letterSpacing:2, marginBottom:28 }}>MANDASTRONG STUDIO &bull; EST. 2026</div>
        <div style={{ background:"linear-gradient(135deg,#1c1200,#2a1a00)", border:"2px solid "+GOLDDIM, borderRadius:22, padding:28, marginBottom:20, textAlign:"center", boxShadow:"0 0 30px "+GOLDDIM+"33" }}>
          <div style={{ color:GOLD2, fontWeight:900, fontSize:20, marginBottom:16, letterSpacing:1 }}>A Special Thank You</div>
          <p style={{ color:GOLD, fontSize:15, lineHeight:1.9, fontStyle:"italic", marginBottom:14 }}>To all current and future creators, dreamers, and storytellers who believe in the power of their voice...</p>
          <p style={{ color:TEXT, fontSize:15, lineHeight:2.0, marginBottom:14 }}>Your creativity and passion inspire positive change in the world. Through your films and stories, you have the power to educate, inspire, and bring awareness to critical issues like bullying prevention, social skills development, and humanity's collective growth.</p>
          <p style={{ color:TEXT, fontSize:15, lineHeight:2.0, marginBottom:14 }}>Every piece of content you create has the potential to touch hearts, change minds, and make our world a better place. Thank you for being part of this mission to combine creative expression with meaningful impact.</p>
          <p style={{ color:TEXT, fontSize:15, lineHeight:2.0 }}>Together, we are building a community of creators who use their talents to spread kindness, understanding, and hope. Your impact matters more than you will ever know.</p>
        </div>
        <button onClick={()=>setGuideOpen(!guideOpen)} style={{ background:"linear-gradient(135deg,#1c1200,#2a1a00)", border:"2px solid "+GOLD, borderRadius:16, width:"100%", padding:18, cursor:"pointer", marginBottom:20, textAlign:"center", boxShadow:"0 0 16px "+GOLDDIM+"44" }}>
          <div style={{ color:GOLD, fontWeight:900, fontSize:17, letterSpacing:1 }}>📖 Full User Guide To MandaStrong Studio</div>
          <div style={{ color:GOLDDIM, fontSize:13, marginTop:6 }}>Tap to open the complete guide {guideOpen?"▾":"▸"}</div>
        </button>
        {guideOpen && (<div style={{ background:"linear-gradient(135deg,#1c1200,#2a1a00)", border:"2px solid "+GOLD, borderRadius:18, padding:24, marginBottom:20 }}><div style={{ color:GOLD, fontWeight:900, fontSize:17, marginBottom:18, textAlign:"center", letterSpacing:1 }}>📖 MandaStrong Studio - Complete User Guide</div><div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>{[["Getting Started","Page 1: Welcome. Page 2: Our Story. Page 3: Plans and sign in."],["AI Tool Board","Pages 4-9: 120 AI tools for scripts, design, VFX, writing, enhancement, and editing."],["Upload & Edit","Page 10: Upload footage. Page 11: Media library. Page 12: Editor suite."],["Timeline & Audio","Page 13: Multi-track timeline editor. Page 14: Full audio mixer with effects."],["Render & Export","Page 15: Render to 4K/8K. Export to YouTube, Netflix, TikTok, festivals."],["Community","Page 19: Agent Grok AI help. Page 20: Community Hub to share your films."]].map(([t,d])=>(<div key={t} style={{ background:"rgba(0,0,0,0.4)", borderRadius:14, padding:14 }}><div style={{ color:GOLD2, fontWeight:800, fontSize:14, marginBottom:8 }}>{t}</div><div style={{ color:TEXT2, fontSize:13, lineHeight:1.7 }}>{d}</div></div>))}</div></div>)}
        <div style={{ background:"linear-gradient(135deg,#120d00,#1e1500)", border:"2px solid "+GOLDDIM, borderRadius:22, padding:26, marginBottom:20 }}>
          <div style={{ color:GOLD2, fontWeight:900, fontSize:18, marginBottom:16, textAlign:"center" }}>About Our Mission</div>
          <p style={{ color:TEXT, fontSize:15, lineHeight:2.0, marginBottom:16, textAlign:"center" }}><strong style={{ color:GOLD }}>MandaStrong Studio</strong> is more than a filmmaking platform. It is part of a comprehensive educational initiative designed to bring awareness and real action to schools regarding bullying prevention, social skills development, and the cultivation of humanity and empathy in our communities.</p>
          <div style={{ background:"rgba(0,0,0,0.4)", border:"1px solid "+GOLDDIM, borderRadius:16, padding:18, marginBottom:14 }}><p style={{ color:TEXT, fontSize:15, lineHeight:1.9, textAlign:"center" }}><strong style={{ color:GOLD }}>Fundraiser: Educational Program on Bullying Prevention &amp; Social Skills</strong> &mdash; Through this comprehensive program, we provide educational resources and movie-based content to help schools address these critical issues. Our goal is to create safe, supportive environments where every student can thrive and feel truly seen.</p></div>
          <div style={{ background:"rgba(5,26,10,0.6)", border:"1px solid #166534", borderRadius:16, padding:18 }}><div style={{ color:"#4ade80", fontWeight:900, fontSize:16, marginBottom:10, textAlign:"center" }}>Supporting Our Heroes</div><p style={{ color:TEXT, fontSize:15, lineHeight:1.9, textAlign:"center" }}><strong style={{ color:"#4ade80" }}>All Etsy Store Proceeds Benefit Veterans Mental Health Services</strong> &mdash; 100% of all proceeds from our Etsy Store fundraiser are donated directly to Veterans Mental Health Services, in heartfelt support of those who have sacrificed everything for our freedom and deserve every resource available to heal.</p></div>
        </div>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <a href="https://www.etsy.com/shop/MandaStrong1" target="_blank" rel="noopener noreferrer" style={{ color:GOLD, fontWeight:800, fontSize:16, textDecoration:"underline", letterSpacing:1 }}>Visit MandaStrong1.Etsy.com &rarr;</a>
        </div>
        <GoldBtn onClick={()=>go(1)}>🎬 Start Creating Again</GoldBtn>
      </div>
    </div>
  );
}

function QuickAccess({ go, onClose }: { go:(n:number)=>void; onClose:()=>void }) {
  const links = [
    { label:"Welcome", icon:"🏠", page:1 }, { label:"Our Story", icon:"📖", page:2 }, { label:"Plans & Login", icon:"💳", page:3 },
    { label:"Script & Story", icon:"📝", page:4 }, { label:"Design & Chars", icon:"🎨", page:5 }, { label:"Video & VFX", icon:"🎬", page:6 },
    { label:"Writing & Mktg", icon:"✍️", page:7 }, { label:"Upload & Enhance", icon:"⬆️", page:8 }, { label:"Edit & Export", icon:"✂️", page:9 },
    { label:"Upload Movie", icon:"🎞️", page:10 }, { label:"Media Library", icon:"🗂️", page:11 }, { label:"Editor Suite", icon:"🖥️", page:12 },
    { label:"Timeline Editor", icon:"⏱️", page:13 }, { label:"Audio Mixer", icon:"🎛️", page:14 }, { label:"Render Film", icon:"📤", page:15 },
    { label:"Tutorials", icon:"🎓", page:16 }, { label:"Film Preview", icon:"▶️", page:17 }, { label:"Terms & Disc.", icon:"📄", page:18 },
    { label:"Agent Grok", icon:"🤖", page:19 }, { label:"Community Hub", icon:"👥", page:20 }, { label:"That's All Folks", icon:"🎉", page:21 },
  ];
  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.92)", display:"flex", alignItems:"flex-end" }} onClick={onClose}>
      <div style={{ background:BG2, borderTop:"2px solid "+GOLD, width:"100%", maxHeight:"82vh", overflowY:"auto", borderRadius:"24px 24px 0 0", padding:22, boxShadow:"0 -10px 50px "+GOLDDIM+"55" }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div style={{ color:GOLD, fontWeight:900, fontSize:18, letterSpacing:2 }}>&#9889; QUICK ACCESS</div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:TEXT3, fontSize:26, cursor:"pointer" }}>&times;</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {links.map(l=>(<button key={l.page} onClick={()=>{go(l.page);onClose();}} style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:14, padding:"12px 14px", cursor:"pointer", display:"flex", alignItems:"center", gap:10, textAlign:"left" }}><span style={{ fontSize:20 }}>{l.icon}</span><span style={{ color:TEXT, fontSize:15, fontWeight:600 }}>{l.label}</span><span style={{ color:TEXT3, fontSize:11, marginLeft:"auto" }}>p{l.page}</span></button>))}
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ onClose }: { onClose:()=>void }) {
  const stats = [
    { label:"Total Users", value:"1,284", icon:"👥" }, { label:"Active Subs", value:"847", icon:"💳" },
    { label:"Films Created", value:"3,921", icon:"🎬" }, { label:"Revenue MRR", value:"$16,940", icon:"💰" },
    { label:"Basic Plans", value:"312", icon:"📗" }, { label:"Pro Plans", value:"428", icon:"📘" },
    { label:"Studio Plans", value:"107", icon:"📕" }, { label:"Community Films", value:"659", icon:"📣" },
  ];
  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.95)", overflowY:"auto" }} onClick={onClose}>
      <div style={{ background:BG2, margin:"18px 12px", borderRadius:24, border:"2px solid "+GOLD, padding:22, boxShadow:"0 0 50px "+GOLDDIM+"66" }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <div style={{ color:GOLD, fontWeight:900, fontSize:20, letterSpacing:2 }}>🛡️ ADMIN DASHBOARD</div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:TEXT3, fontSize:26, cursor:"pointer" }}>&times;</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:22 }}>
          {stats.map(s=>(<div key={s.label} style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:16, padding:16 }}><div style={{ fontSize:24, marginBottom:6 }}>{s.icon}</div><div style={{ color:GOLD2, fontWeight:900, fontSize:22 }}>{s.value}</div><div style={{ color:TEXT3, fontSize:13 }}>{s.label}</div></div>))}
        </div>
        <div style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:16, padding:18, marginBottom:20 }}>
          <div style={{ color:GOLD, fontWeight:700, marginBottom:12, fontSize:16 }}>Stripe Revenue &mdash; This Month</div>
          <div style={{ display:"flex", gap:6, alignItems:"flex-end", height:70 }}>
            {[40,55,45,70,60,80,75,90,85,95,88,100].map((h,i)=>(<div key={i} style={{ flex:1, background:"linear-gradient(to top,"+PUR2+","+GOLD+")", borderRadius:4, height:h+"%", opacity:0.8 }} />))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:8, color:TEXT3, fontSize:12 }}><span>Jan</span><span>Dec</span></div>
        </div>
        <GoldBtn onClick={onClose}>Close Dashboard</GoldBtn>
      </div>
    </div>
  );
}

const TOTAL = 21;

export default function App() {
  const [user, setUser]           = useState<User|null>(null);
  const [page, setPage]           = useState(1);
  const [assets, setAssets]       = useState<string[]>([]);
  const [showQA, setShowQA]       = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const go = useCallback((n:number) => {
    const c = Math.max(1,Math.min(TOTAL,n));
    setPage(c);
    window.scrollTo({ top:0, behavior:"smooth" });
  },[]);

  const addAsset = useCallback((name:string) => {
    setAssets(prev=>prev.includes(name)?prev:[...prev,name]);
  },[]);

  const handleAuth = useCallback((u:User) => { setUser(u); setPage(1); },[]);

  if (!user) return <LoginScreen onAuth={handleAuth} />;

  const pages: Record<number,React.ReactNode> = {
    1: <P1 go={go} />,
    2: <P2 go={go} />,
    3: <P3 go={go} onAuth={handleAuth} />,
    4: <AIToolBoard pageNum={4} go={go} addAsset={addAsset} />,
    5: <AIToolBoard pageNum={5} go={go} addAsset={addAsset} />,
    6: <AIToolBoard pageNum={6} go={go} addAsset={addAsset} />,
    7: <AIToolBoard pageNum={7} go={go} addAsset={addAsset} />,
    8: <AIToolBoard pageNum={8} go={go} addAsset={addAsset} />,
    9: <AIToolBoard pageNum={9} go={go} addAsset={addAsset} />,
    10: <P10 go={go} />,
    11: <P11 go={go} assets={assets} />,
    12: <P12 go={go} />,
    13: <P13 go={go} />,
    14: <P14 go={go} />,
    15: <P15 go={go} />,
    16: <P16 go={go} />,
    17: <P17 go={go} />,
    18: <P18 go={go} />,
    19: <P19 go={go} />,
    20: <P20 go={go} />,
    21: <P21 go={go} />,
  };

  return (
    <>
      <div style={{ background:BG2, borderBottom:"1px solid "+GOLDDIM, position:"fixed", top:0, left:0, right:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 14px", gap:8, boxShadow:"0 2px 24px "+GOLDDIM+"44" }}>
        <button onClick={()=>go(Math.max(1,page-1))} disabled={page===1} style={{ color:GOLD, background:"none", border:"none", fontSize:28, fontWeight:900, cursor:"pointer", opacity:page===1?0.3:1, padding:"0 4px" }}>&#8249;</button>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flex:1 }}>
          <span style={{ color:GOLD, fontWeight:900, fontSize:13, letterSpacing:3, textTransform:"uppercase" }}>MandaStrong</span>
          <span style={{ color:TEXT3, fontSize:11 }}>{page} / {TOTAL}</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <button onClick={()=>setShowQA(true)} style={{ background:BG3, border:"1px solid "+GOLDDIM, color:GOLD, borderRadius:10, padding:"6px 12px", fontSize:13, fontWeight:800, cursor:"pointer" }}>&#9889; Quick</button>
          {user?.isAdmin && (<button onClick={()=>setShowAdmin(true)} style={{ background:"#7f1d1d", border:"1px solid #ef4444", color:"#ef4444", borderRadius:10, padding:"6px 12px", fontSize:13, fontWeight:800, cursor:"pointer" }}>&#128737; Admin</button>)}
          <div style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:10, padding:"5px 12px", display:"flex", flexDirection:"column", alignItems:"flex-end" }}>
            <span style={{ color:GOLD, fontSize:13, fontWeight:800 }}>{user.name.split(" ")[0]}</span>
            <span style={{ color:GOLDDIM, fontSize:10 }}>{user.plan}</span>
          </div>
          <button onClick={()=>go(Math.min(TOTAL,page+1))} disabled={page===TOTAL} style={{ color:GOLD, background:"none", border:"none", fontSize:28, fontWeight:900, cursor:"pointer", opacity:page===TOTAL?0.3:1, padding:"0 4px" }}>&#8250;</button>
        </div>
      </div>

      {pages[page] ?? <P1 go={go} />}
      {showQA    && <QuickAccess go={go} onClose={()=>setShowQA(false)} />}
      {showAdmin && <AdminDashboard onClose={()=>setShowAdmin(false)} />}
    </>
  );
}Store fundraiser are donated directly to Veterans Mental Health Services, in heartfelt support of those who have sacrificed everything for our freedom and deserve every resource available to heal.</p></div>
        </div>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <a href="https://www.etsy.com/shop/MandaStrong1" target="_blank" rel="noopener noreferrer" style={{ color:GOLD, fontWeight:800, fontSize:16, textDecoration:"underline", letterSpacing:1 }}>Visit MandaStrong1.Etsy.com &rarr;</a>
        </div>
        <GoldBtn onClick={()=>go(1)}>🎬 Start Creating Again</GoldBtn>
      </div>
    </div>
  );
}

function QuickAccess({ go, onClose }: { go:(n:number)=>void; onClose:()=>void }) {
  const links = [
    { label:"Welcome", icon:"🏠", page:1 }, { label:"Our Story", icon:"📖", page:2 }, { label:"Plans & Login", icon:"💳", page:3 },
    { label:"Script & Story", icon:"📝", page:4 }, { label:"Design & Chars", icon:"🎨", page:5 }, { label:"Video & VFX", icon:"🎬", page:6 },
    { label:"Writing & Mktg", icon:"✍️", page:7 }, { label:"Upload & Enhance", icon:"⬆️", page:8 }, { label:"Edit & Export", icon:"✂️", page:9 },
    { label:"Upload Movie", icon:"🎞️", page:10 }, { label:"Media Library", icon:"🗂️", page:11 }, { label:"Editor Suite", icon:"🖥️", page:12 },
    { label:"Timeline Editor", icon:"⏱️", page:13 }, { label:"Audio Mixer", icon:"🎛️", page:14 }, { label:"Render Film", icon:"📤", page:15 },
    { label:"Tutorials", icon:"🎓", page:16 }, { label:"Film Preview", icon:"▶️", page:17 }, { label:"Terms & Disc.", icon:"📄", page:18 },
    { label:"Agent Grok", icon:"🤖", page:19 }, { label:"Community Hub", icon:"👥", page:20 }, { label:"That's All Folks", icon:"🎉", page:21 },
  ];
  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.92)", display:"flex", alignItems:"flex-end" }} onClick={onClose}>
      <div style={{ background:BG2, borderTop:"2px solid "+GOLD, width:"100%", maxHeight:"82vh", overflowY:"auto", borderRadius:"24px 24px 0 0", padding:22, boxShadow:"0 -10px 50px "+GOLDDIM+"55" }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div style={{ color:GOLD, fontWeight:900, fontSize:18, letterSpacing:2 }}>&#9889; QUICK ACCESS</div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:TEXT3, fontSize:26, cursor:"pointer" }}>&times;</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {links.map(l=>(<button key={l.page} onClick={()=>{go(l.page);onClose();}} style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:14, padding:"12px 14px", cursor:"pointer", display:"flex", alignItems:"center", gap:10, textAlign:"left" }}><span style={{ fontSize:20 }}>{l.icon}</span><span style={{ color:TEXT, fontSize:15, fontWeight:600 }}>{l.label}</span><span style={{ color:TEXT3, fontSize:11, marginLeft:"auto" }}>p{l.page}</span></button>))}
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ onClose }: { onClose:()=>void }) {
  const stats = [
    { label:"Total Users", value:"1,284", icon:"👥" }, { label:"Active Subs", value:"847", icon:"💳" },
    { label:"Films Created", value:"3,921", icon:"🎬" }, { label:"Revenue MRR", value:"$16,940", icon:"💰" },
    { label:"Basic Plans", value:"312", icon:"📗" }, { label:"Pro Plans", value:"428", icon:"📘" },
    { label:"Studio Plans", value:"107", icon:"📕" }, { label:"Community Films", value:"659", icon:"📣" },
  ];
  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.95)", overflowY:"auto" }} onClick={onClose}>
      <div style={{ background:BG2, margin:"18px 12px", borderRadius:24, border:"2px solid "+GOLD, padding:22, boxShadow:"0 0 50px "+GOLDDIM+"66" }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <div style={{ color:GOLD, fontWeight:900, fontSize:20, letterSpacing:2 }}>🛡️ ADMIN DASHBOARD</div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:TEXT3, fontSize:26, cursor:"pointer" }}>&times;</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:22 }}>
          {stats.map(s=>(<div key={s.label} style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:16, padding:16 }}><div style={{ fontSize:24, marginBottom:6 }}>{s.icon}</div><div style={{ color:GOLD2, fontWeight:900, fontSize:22 }}>{s.value}</div><div style={{ color:TEXT3, fontSize:13 }}>{s.label}</div></div>))}
        </div>
        <div style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:16, padding:18, marginBottom:20 }}>
          <div style={{ color:GOLD, fontWeight:700, marginBottom:12, fontSize:16 }}>Stripe Revenue &mdash; This Month</div>
          <div style={{ display:"flex", gap:6, alignItems:"flex-end", height:70 }}>
            {[40,55,45,70,60,80,75,90,85,95,88,100].map((h,i)=>(<div key={i} style={{ flex:1, background:"linear-gradient(to top,"+PUR2+","+GOLD+")", borderRadius:4, height:h+"%", opacity:0.8 }} />))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:8, color:TEXT3, fontSize:12 }}><span>Jan</span><span>Dec</span></div>
        </div>
        <GoldBtn onClick={onClose}>Close Dashboard</GoldBtn>
      </div>
    </div>
  );
}

const TOTAL = 21;

export default function App() {
  const [user, setUser]           = useState<User|null>(null);
  const [page, setPage]           = useState(1);
  const [assets, setAssets]       = useState<string[]>([]);
  const [showQA, setShowQA]       = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const go = useCallback((n:number) => {
    const c = Math.max(1,Math.min(TOTAL,n));
    setPage(c);
    window.scrollTo({ top:0, behavior:"smooth" });
  },[]);

  const addAsset = useCallback((name:string) => {
    setAssets(prev=>prev.includes(name)?prev:[...prev,name]);
  },[]);

  const handleAuth = useCallback((u:User) => { setUser(u); setPage(1); },[]);

  if (!user) return <LoginScreen onAuth={handleAuth} />;

  const pages: Record<number,React.ReactNode> = {
    1: <P1 go={go} />,
    2: <P2 go={go} />,
    3: <P3 go={go} onAuth={handleAuth} />,
    4: <AIToolBoard pageNum={4} go={go} addAsset={addAsset} />,
    5: <AIToolBoard pageNum={5} go={go} addAsset={addAsset} />,
    6: <AIToolBoard pageNum={6} go={go} addAsset={addAsset} />,
    7: <AIToolBoard pageNum={7} go={go} addAsset={addAsset} />,
    8: <AIToolBoard pageNum={8} go={go} addAsset={addAsset} />,
    9: <AIToolBoard pageNum={9} go={go} addAsset={addAsset} />,
    10: <P10 go={go} />,
    11: <P11 go={go} assets={assets} />,
    12: <P12 go={go} />,
    13: <P13 go={go} />,
    14: <P14 go={go} />,
    15: <P15 go={go} />,
    16: <P16 go={go} />,
    17: <P17 go={go} />,
    18: <P18 go={go} />,
    19: <P19 go={go} />,
    20: <P20 go={go} />,
    21: <P21 go={go} />,
  };

  return (
    <>
      <div style={{ background:BG2, borderBottom:"1px solid "+GOLDDIM, position:"fixed", top:0, left:0, right:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 14px", gap:8, boxShadow:"0 2px 24px "+GOLDDIM+"44" }}>
        <button onClick={()=>go(Math.max(1,page-1))} disabled={page===1} style={{ color:GOLD, background:"none", border:"none", fontSize:28, fontWeight:900, cursor:"pointer", opacity:page===1?0.3:1, padding:"0 4px" }}>&#8249;</button>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flex:1 }}>
          <span style={{ color:GOLD, fontWeight:900, fontSize:13, letterSpacing:3, textTransform:"uppercase" }}>MandaStrong</span>
          <span style={{ color:TEXT3, fontSize:11 }}>{page} / {TOTAL}</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <button onClick={()=>setShowQA(true)} style={{ background:BG3, border:"1px solid "+GOLDDIM, color:GOLD, borderRadius:10, padding:"6px 12px", fontSize:13, fontWeight:800, cursor:"pointer" }}>&#9889; Quick</button>
          {user?.isAdmin && (<button onClick={()=>setShowAdmin(true)} style={{ background:"#7f1d1d", border:"1px solid #ef4444", color:"#ef4444", borderRadius:10, padding:"6px 12px", fontSize:13, fontWeight:800, cursor:"pointer" }}>&#128737; Admin</button>)}
          <div style={{ background:BG3, border:"1px solid "+GOLDDIM, borderRadius:10, padding:"5px 12px", display:"flex", flexDirection:"column", alignItems:"flex-end" }}>
            <span style={{ color:GOLD, fontSize:13, fontWeight:800 }}>{user.name.split(" ")[0]}</span>
            <span style={{ color:GOLDDIM, fontSize:10 }}>{user.plan}</span>
          </div>
          <button onClick={()=>go(Math.min(TOTAL,page+1))} disabled={page===TOTAL} style={{ color:GOLD, background:"none", border:"none", fontSize:28, fontWeight:900, cursor:"pointer", opacity:page===TOTAL?0.3:1, padding:"0 4px" }}>&#8250;</button>
        </div>
      </div>

      {pages[page] ?? <P1 go={go} />}
      {showQA    && <QuickAccess go={go} onClose={()=>setShowQA(false)} />}
      {showAdmin && <AdminDashboard onClose={()=>setShowAdmin(false)} />}
    </>
  );
}