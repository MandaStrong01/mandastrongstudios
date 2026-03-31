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
const NO_CARTOONS = "NEGATIVE PROMPT: No CGI, no 3D renders, no cartoons, no anime, no fake textures, no video game look, no digital art artifacts.";

const STRIPE = {
  basic:"https://buy.stripe.com/test_basic",
  pro:"https://buy.stripe.com/test_pro",
  studio:"https://buy.stripe.com/test_studio",
};

const G = (v, sm) => ({
  background: v==="gold" ? `linear-gradient(135deg,${GOLDDIM},${GOLD})` : "transparent",
  border: v==="gold" ? "none" : `1px solid ${GOLD}`,
  color: v==="gold" ? "#000" : GOLD,
  borderRadius:0, fontWeight:900,
  padding: sm ? "5px 14px" : "10px 26px",
  fontSize: sm ? 11 : 13,
  cursor:"pointer", letterSpacing:2, textTransform:"uppercase",
  fontFamily:"'Rajdhani',sans-serif",
});
const Sp = { minHeight:"100vh", background:BG, color:WHITE, fontFamily:"'Rajdhani',sans-serif", paddingBottom:100 };
const H1 = { fontFamily:"'Cinzel',serif", color:GOLD, letterSpacing:5, textTransform:"uppercase", margin:0 };
const Card = (x) => ({ background:"#0a0a0a", border:`1px solid ${GOLDDIM}`, borderRadius:0, padding:18, ...(x||{}) });

const STOCK_VOICES = [
  { id:"james",   name:"James",   emoji:"🎩", sex:"Male",   accent:"British RP",       category:"British",   tone:"Sarcastic · Deadpan · Witty",           pitch:0.86, rate:0.62, desc:"Dry as dust. Delivers the uncomfortable truth with a straight face and perfect timing. Every pause is intentional. Every word lands like a verdict. Built for satire." },
  { id:"aurora",  name:"Aurora",  emoji:"🌅", sex:"Female", accent:"British RP",       category:"British",   tone:"Warm · Measured · Documentary",         pitch:1.08, rate:0.80, desc:"Calm, authoritative and quietly emotional. The voice you trust completely." },
  { id:"marcus",  name:"Marcus",  emoji:"⚡", sex:"Male",   accent:"American",         category:"American",  tone:"Deep · Cinematic · Commanding",         pitch:0.72, rate:0.74, desc:"Big voice. Big presence. Built for trailers, action and statements." },
  { id:"sophia",  name:"Sophia",  emoji:"☀️", sex:"Female", accent:"Australian",       category:"World",     tone:"Upbeat · Bright · Energetic",           pitch:1.35, rate:1.12, desc:"Forward energy and natural warmth. Perfect for social content." },
  { id:"nova",    name:"Nova",    emoji:"🤖", sex:"Female", accent:"Neutral",          category:"Specialist",tone:"Clean · Professional · Neutral",         pitch:1.12, rate:0.95, desc:"No accent, no emotion. Pure information delivered with clinical clarity." },
  { id:"river",   name:"River",   emoji:"🌊", sex:"Male",   accent:"American South",   category:"American",  tone:"Warm · Intimate · Storyteller",         pitch:0.98, rate:0.76, desc:"Unhurried Southern charm. Feels like someone telling you a story at dusk." },
];

const VOICE_TOOLS = ["Text to Voice","Text to Speech","Text to Narration","Text to Audiobook","Text to Voiceover","AI Voice Actor","Neural Voice Generator","Emotion Voice Synth","Documentary Voice","Trailer Voice Generator","Commercial Voice","Character Voice Creator","Audiobook Creator","Podcast Voice"];

// Speech synthesis logic
let currentUtterance = null;
const VOICE_PARAMS = Object.fromEntries(STOCK_VOICES.map(v => [v.id, { pitch: v.pitch || 1.0, rate: v.rate || 0.9, volume: 1.0 }]));

function speakText(voiceId, txt, onStart, onEnd) {
  if (!txt) return;
  window.speechSynthesis.cancel();
  const allVoices = window.speechSynthesis.getVoices();
  const params = VOICE_PARAMS[voiceId] || { pitch:1.0, rate:0.9 };
  const utt = new SpeechSynthesisUtterance(txt);
  utt.pitch = params.pitch; utt.rate = params.rate;
  utt.onstart = onStart; utt.onend = onEnd;
  window.speechSynthesis.speak(utt);
}

const WRITING = ["Script to Movie","Text to Script","Script to Screenplay","Prompt to Story","Feature Film Script","Short Film Script","Documentary Script","Plot Generator","Character Bio Writer","Logline Generator","Synopsis Writer","Scene Writer","Dialogue Generator","Narration Writer"];
const IMAGE_T = ["Text to Image","Prompt to Image","Image Upscaler","Image Generator","AI Art Generator","Photo to Painting","Sketch to Image","Background Generator","Face Generator","Character Design","Portrait Generator","Logo Generator"];
const VIDEO_T = ["Text to Video","Image to Video","Video to Video","AI Video Creator","AI Film Generator","Video Upscaler","Animation Creator","Quick Film Creator","Bullet Time Effect","Particle System"];
const MOTION = ["AI 8K Upscaling","AI 4K Upscaling","Video Super Resolution","Frame Interpolation","Video Denoiser","Noise Reduction","Color Correction","Color Grading AI","Cinematic Color Grade"];
const NAV = [{p:1,l:"Home"},{p:2,l:"Platform"},{p:3,l:"Examples"},{p:4,l:"Login / Pricing"},{p:5,l:"Writing Tools"},{p:6,l:"Voice Tools"},{p:7,l:"Image Tools"},{p:8,l:"Video Tools"},{p:9,l:"Motion & VFX"},{p:10,l:"Enhancement"},{p:11,l:"Upload Media"},{p:12,l:"Editor Suite"},{p:13,l:"Timeline Editor"},{p:14,l:"Enhancement Studio"},{p:15,l:"Audio Mixer"},{p:16,l:"Render Engine"},{p:17,l:"Film Preview"},{p:18,l:"Export & Distribute"},{p:19,l:"Tutorials"},{p:20,l:"Terms & Disclaimer"},{p:21,l:"Agent Grok"},{p:22,l:"Community Hub"},{p:23,l:"That's All Folks"}];

function Header({ go, setMenu }) {
  return (
    <header style={{position:"sticky",top:0,zIndex:500,background:"#000",borderBottom:`1px solid ${GOLD}`,padding:"0 16px",height:52,display:"flex",alignItems:"center",gap:12}}>
      <button onClick={()=>setMenu(true)} style={{background:"none",border:`1px solid ${GOLD}`,color:GOLD,width:34,height:34,cursor:"pointer",fontSize:16}}>☰</button>
      <div onClick={()=>go(1)} style={{cursor:"pointer",flexShrink:0}}>
        <div style={{fontFamily:"'Cinzel',serif",color:GOLD,fontSize:13,fontWeight:900,letterSpacing:3}}>MANDA STRONG STUDIO</div>
      </div>
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{color:GOLD,fontSize:11,letterSpacing:2,whiteSpace:"nowrap",overflow:"hidden",fontWeight:700}}>✦ CINEMA INTELLIGENCE PLATFORM &nbsp;·&nbsp; 600+ AI TOOLS</div>
      </div>
      <div onClick={()=>go(21)} style={{width:36,height:36,background:`linear-gradient(135deg,${GOLDDIM},${GOLD})`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontFamily:"'Cinzel',serif",fontSize:19,fontWeight:900,color:"#000"}}>G</div>
    </header>
  );
}

function Footer({ page, go, onSave }) {
  return (
    <footer style={{position:"fixed",bottom:0,left:0,right:0,zIndex:400,background:"#000",borderTop:`1px solid ${GOLD}`,padding:"6px 20px 8px",display:"flex",flexDirection:"column",gap:4}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14}}>
        <button onClick={()=>go(Math.max(1,page-1))} style={{...G("out",true)}}>◀ BACK</button>
        <span style={{color:GOLD,fontSize:11,fontWeight:900,fontFamily:"'Cinzel',serif"}}>PAGE {page} / {TOTAL}</span>
        <button onClick={()=>go(Math.min(TOTAL,page+1))} style={{...G("gold",true)}}>NEXT ▶</button>
        <button onClick={onSave} style={{...G("out",true)}}>💾 SAVE</button>
      </div>
    </footer>
  );
}

function ToolPanel({ tool, onClose, onSave }) {
  const isVideoTool = VIDEO_T.includes(tool);
  const isVoice = VOICE_TOOLS.includes(tool);
  const [describe, setDescribe] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [visualsOnly, setVisualsOnly] = useState(false); // ADDED AS REQUESTED
  const [selVoice, setSelVoice] = useState("james");
  const [playing, setPlaying] = useState(null);
  const inp = {width:"100%",background:"#000",border:`1px solid ${GOLDDIM}`,padding:"9px 12px",color:WHITE,fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"'Rajdhani',sans-serif"};

  const runAI = async () => {
    if (!describe.trim()) return;
    setLoading(true);
    try {
      let prompt = describe;
      let sys = "You are a cinema expert.";
      if (isVideoTool) {
        // THE FIX: Strips text when Visuals Only is toggled
        const visualFocus = visualsOnly ? "STRICT VISUALS ONLY. No dialogue, no script, no screen text. Output ONLY camera, lighting, and textures." : "";
        prompt = `${STRICT_DOC_LOOK} ${visualFocus} ${describe}`;
        sys = `${sys} ${NO_CARTOONS} Force photorealistic documentary look.`;
      }
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json","anthropic-dangerous-direct-browser-access":"true","x-api-key":import.meta.env.VITE_ANTHROPIC_API_KEY||""},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1500,system:sys,messages:[{role:"user",content:prompt}]})
      });
      const d = await res.json();
      setResult(d.content[0].text);
      if (isVoice) speakText(selVoice, d.content[0].text, ()=>setPlaying(selVoice), ()=>setPlaying(null));
    } catch(e) { setResult("Error — Check API Key."); }
    setLoading(false);
  };

  return (
    <div style={{position:"fixed",inset:0,zIndex:900,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{width:"min(600px,95vw)",background:"#050505",border:`1px solid ${GOLD}`,padding:26,maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}><h2 style={H1}>{tool}</h2><button onClick={onClose} style={{background:"none",border:"none",color:GOLD,fontSize:20,cursor:"pointer"}}>✕</button></div>
        <textarea value={describe} onChange={e=>setDescribe(e.target.value)} placeholder="Describe your vision..." style={{...inp,height:100,marginBottom:10}}/>
        <div style={{display:"flex",gap:10}}>
           <button onClick={runAI} style={{...G("gold",false),flex:2}}>{loading?"GENERATING...":isVideoTool?"GENERATE VIDEO CLIP":"AI CREATE"}</button>
           {isVideoTool && (
             <button onClick={()=>setVisualsOnly(!visualsOnly)} style={{...G(visualsOnly?"gold":"out",true),flex:1}}>
               {visualsOnly ? "✓ VISUALS ONLY" : "VISUALS ONLY"}
             </button>
           )}
        </div>
        {result && <textarea value={result} readOnly style={{...inp,height:150,marginTop:10,background:"#111",color:GOLD}}/>}
        <button onClick={onClose} style={{...G("out",true),width:"100%",marginTop:10}}>CLOSE</button>
      </div>
    </div>
  );
}

function ToolPage({ title, tools, onSave }) {
  const [open, setOpen] = useState(null);
  return (
    <div style={Sp}>
      <h1 style={{...H1,padding:20}}>{title}</h1>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10,padding:20}}>
        {tools.map(t=><button key={t} onClick={()=>setOpen(t)} style={G("out",true)}>{t}</button>)}
      </div>
      {open&&<ToolPanel tool={open} onClose={()=>setOpen(null)} onSave={onSave}/>}
    </div>
  );
}

function P1({ go }) {
  return (
    <div style={{...Sp,textAlign:"center",paddingTop:100}}>
      <div style={{fontSize:11,color:DIM,letterSpacing:6}}>CINEMA INTELLIGENCE PLATFORM — EST. 2026</div>
      <h1 style={{...H1,fontSize:50}}>MANDA STRONG STUDIO</h1>
      <button onClick={()=>go(4)} style={{...G("gold",false),marginTop:40}}>START PRODUCTION</button>
    </div>
  );
}

export default function App() {
  const [page,setPage]=useState(1);
  const [user,setUser]=useState({name:"Guest",plan:"Guest"});
  const [menu,setMenu]=useState(false);
  const [mediaLib,setMediaLib]=useState([]);
  const [timeline,setTimeline]=useState({});
  
  const go=p=>{setPage(p);window.scrollTo(0,0);};
  const saveAsset=a=>setMediaLib(p=>[...p,a]);

  const pages={
    1:<P1 go={go}/>,
    4:<div style={Sp}><h1 style={H1}>LOGIN</h1><button onClick={()=>go(5)} style={G("gold",false)}>ENTER STUDIO</button></div>,
    5:<ToolPage title="WRITING TOOLS" tools={WRITING} onSave={saveAsset}/>,
    6:<div style={Sp}><h1 style={H1}>VOICE TOOLS</h1></div>,
    7:<ToolPage title="IMAGE TOOLS" tools={IMAGE_T} onSave={saveAsset}/>,
    8:<ToolPage title="VIDEO TOOLS" tools={VIDEO_T} onSave={saveAsset}/>,
    9:<ToolPage title="MOTION & VFX" tools={MOTION} onSave={saveAsset}/>,
    11:<div style={Sp}><h1 style={H1}>UPLOAD MEDIA</h1></div>,
    13:<div style={Sp}><h1 style={H1}>TIMELINE EDITOR</h1></div>,
    21:<div style={Sp}><h1 style={H1}>AGENT GROK</h1></div>,
    23:<div style={Sp}><h1 style={H1}>THAT'S ALL FOLKS</h1><a href="https://MandaStrong1.Etsy.com" style={{color:GOLD}}>VISIT STORE</a></div>,
  };

  return (
    <div style={{background:"#000",minHeight:"100vh"}}>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;900&family=Rajdhani:wght@400;700;900&display=swap" rel="stylesheet"/>
      <Header go={go} setMenu={()=>setMenu(!menu)}/>
      <div style={{minHeight:"calc(100vh - 116px)"}}>{pages[page]||<P1 go={go}/>}</div>
      <Footer page={page} go={go} onSave={()=>alert("Project Saved!")}/>
    </div>
  );
}