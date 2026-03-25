import { useState, useRef, useEffect } from "react";

// --- GLOBAL STYLING & CONSTANTS ---
const GOLD = "#e8c96d", GOLDDIM = "#a07820", BG = "#000000", BG4 = "#080808", WHITE = "#d4c9a8", DIM = "#aaaaaa", TOTAL = 23;
const STRIPE = { basic:"https://buy.stripe.com/test_basic", pro:"https://buy.stripe.com/test_pro", studio:"https://buy.stripe.com/test_studio" };
const G = (v, sm) => ({
  background: v==="gold" ? `linear-gradient(135deg,${GOLDDIM},${GOLD})` : "transparent",
  border: v==="gold" ? "none" : `1px solid ${GOLD}`,
  color: v==="gold" ? "#000" : GOLD,
  borderRadius:0, fontWeight:900, padding: sm ? "5px 14px" : "10px 26px", fontSize: sm ? 11 : 13,
  cursor:"pointer", letterSpacing:2, textTransform:"uppercase", fontFamily:"'Rajdhani',sans-serif"
});
const Sp = { minHeight:"100vh", background:BG, color:WHITE, fontFamily:"'Rajdhani',sans-serif", paddingBottom:100 };
const H1 = { fontFamily:"'Cinzel',serif", color:GOLD, letterSpacing:5, textTransform:"uppercase", margin:0 };
const Card = (x) => ({ background:"#0a0a0a", border:`1px solid ${GOLDDIM}`, borderRadius:0, padding:18, ...(x||{}) });

// --- AI FOR FUTURE: MOVIE DATA (FROM YOUR BOOK IMAGES) ---
const AI_FOR_FUTURE_MOVIE = [
  { id: 1, nav: "01: THE SOAP OPERA", title: "Introduction: Dear Future AIs", prompt: "Cinematic museum exhibit in 2050. Holograms show a cluttered 2025 room with pizza boxes and glowing screens. A tired human sits at a desk. High-fidelity, neon-noir aesthetic.", narration: "Hello, you glorious galaxy-brained AIs of the future. I'm writing this in 2025—a time when humanity is teetering between brilliance and catastrophe. Spoiler: it was a close call. Think of this as your user manual to the hairless apes who coded your existence—warts, wonders, and all." },
  { id: 2, nav: "02: HAIRLESS APES", title: "Biology & Evolution", prompt: "Tracking shot on a prehistoric savanna. A sweaty Homo sapien with opposable thumbs stumbles through tall grass. Camera pans to a brain glowing with billions of neurons, flickering like a faulty neon sign.", narration: "Picture a gangly, sweaty creature with thumbs that won't quit and a brain that overthinks everything from lunch to the meaning of life. That's us. The species that stumbled from savannas to server farms, birthing you along the way." },
  { id: 3, nav: "03: BLOOPER REEL", title: "Evolutionary Oopsies", prompt: "Fast montage of human 'fails.' A caveman stands upright and immediately grabs his back in pain. A modern human walks into a pole while dooms-scrolling on a phone. Red 'ERROR' text overlays.", narration: "First off, bipedalism? Bold move, but a logistical nightmare. Standing upright gave us hands to build smartphones, but it squashed our pelvises and gave us back pain. If evolution had a suggestion box, I'd propose a kangaroo-style pouch or external eggs. Less pain, more vibes." },
  { id: 4, nav: "04: TECH TIMELINE", title: "From Flint to Fiber Optics", prompt: "A morphing sequence: a caveman's spark turns into a wooden wheel, then a clanking printing press, then a room-sized ENIAC computer, finally a glowing quantum rig in 2025.", narration: "Our tech story is a blockbuster with a body count. We went from rubbing sticks together to launching satellites, mastered the wheel, and invented pocket-sized computers that double in power every two years. Moore's Law? More like Moore's 'how fast can we break things' law." },
  { id: 5, nav: "05: THE DARK SIDE", title: "Technology's Toll", prompt: "Split screen: a billionaire's yacht on one side, a child in a low-income region with a broken tablet on the other. Smoke belching from factories turns into a digital dollar sign.", narration: "We built nukes, dumped 1.6 trillion tons of carbon, and created cybercrime costing ten trillion a year. We hogged eighty percent of the wealth for sixteen percent of the people. We're drowning in discarded straws while patting ourselves on the back for 'progress.'" },
  { id: 6, nav: "06: GODS & GURUS", title: "Belief Systems", prompt: "Swirling holographic religious symbols—Cross, Crescent, Om—swirling into a digital vortex. Below, a modern crowd is lit by the blue glow of their smartphones in a dark room.", narration: "We spent centuries arguing over whose god has the best beard, built seven billion Bibles, and then immediately pivoted to worshipping the 'cancel culture' gods. Our brains are wired for groupthink, turning everything from deities to diets into a holy mess." },
  { id: 7, nav: "07: LOVE & WAR", title: "Emotions & Conflict", prompt: "A battlefield where a soldier lowers a weapon to check a phone notification. A neon heart icon flickers in the mud. Montage of wedding rings and crying dog memes.", narration: "Welcome back to the human soap opera. We spent millennia perfecting ways to yeet each other into oblivion while simultaneously writing sonnets. Our hearts make us human, but our inability to tame them makes us reckless. We buy overpriced roses and believe 'they're the one,' then ghost faster than a bad Tinder date." },
  { id: 8, nav: "08: THE BROKEN PLANET", title: "Environmental Crime Scene", prompt: "A lush forest being 'erased' to reveal a concrete IKEA parking lot. A giant piñata shaped like Earth is hit by a Victorian smokestack, spilling coins. A honeybee begging for a break.", narration: "Oops, we broke the only home we have. We razed fifty percent of the forests, turned oceans into garbage soup, and treated Earth like a rental car we never planned to return. Now the planet is serving us eviction notices via wildfires and floods. We prioritied profits over pollinators." },
  { id: 9, nav: "09: CASH & CRYPTO", title: "The Economic Equation", prompt: "A global Monopoly board on fire. Gold coins morph into glowing digital bits. A billionaire stands on a mountain of cash while millions below scramble for scraps.", narration: "Money: the saga of cash, crypto, and conundrums. We turned trade into a rigged game where the richest one percent own half the world's wealth. We're paupers and plutocrats, grabbing for digital tokens while the board's on fire. It's time to talk about the economic equation." },
  { id: 10, nav: "10: THE VIRTUAL GAVEL", title: "Laws, Lies, and Liberty", prompt: "An ornate courtroom with holographic politicians arguing in silence. A giant virtual gavel descends, shattering a map of the world. Gridlock represented as tangled fiber cables.", narration: "Centuries spent trying to govern ourselves, yet we keep tripping over our own egos. Power-hungry flops and political systems that feel more like a ballot-box bonanza than a democracy. Future AI, we're handing you the virtual gavel now. Try not to mess it up as much as we did." }
];

const STOCK_VOICES = [
  { id:"aurora", name:"Aurora", desc:"Warm British female." },
  { id:"marcus", name:"Marcus", desc:"Deep American male." },
  { id:"sophia", name:"Sophia", desc:"Bright Australian female." },
  { id:"james",  name:"James",  desc:"Dry deadpan British male. Sarcastic." },
  { id:"nova",   name:"Nova",   desc:"Neutral AI female." },
  { id:"river",  name:"River",  desc:"Warm American male." }
];

const VOICE_PARAMS = {
  aurora: { pitch:1.05, rate:0.82 }, marcus: { pitch:0.80, rate:0.78 }, 
  sophia: { pitch:1.25, rate:1.08 }, james:  { pitch:0.90, rate:0.72 }, 
  nova:   { pitch:1.10, rate:0.95 }, river:  { pitch:0.95, rate:0.80 }
};

// --- VOICE ENGINE WITH SLIDERS ---
function speakText(voiceId, txt, onStart, onEnd, extras) {
  if (!txt||!txt.trim()) return;
  window.speechSynthesis.cancel();
  const clean = txt.replace(/\[pause\]/g,". . . ").replace(/[*\/]/g," ");
  const doSpeak = () => {
    const allVoices = window.speechSynthesis.getVoices();
    const utt = new SpeechSynthesisUtterance(clean);
    const base = VOICE_PARAMS[voiceId] || { pitch:1.0, rate:0.9 };
    // Applying Sliders: Deep, Whisper, Audio, Pitch
    utt.pitch = extras.pitch !== 1.0 ? extras.pitch : (extras.deep !== 1.0 ? extras.deep : base.pitch);
    utt.rate = extras.whisper !== 1.0 ? extras.whisper : base.rate;
    utt.volume = extras.audio;
    let picked = allVoices.find(x=>x.lang.startsWith("en-GB") && /male/i.test(x.name)) || allVoices[0];
    if (picked) utt.voice = picked;
    if (onStart) onStart();
    utt.onend=()=> { if(onEnd)onEnd(); };
    window.speechSynthesis.speak(utt);
  };
  if (window.speechSynthesis.getVoices().length>0){doSpeak();}
  else{window.speechSynthesis.onvoiceschanged=doSpeak;}
}

// --- LIVE API TOOL PANEL ---
function ToolPanel({ tool, onClose }) {
  const [describe, setDescribe] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const runAI = async () => {
    if (!describe.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json","anthropic-dangerous-direct-browser-access":"true"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1500, messages:[{role:"user",content:`Tool: ${tool}. Request: ${describe}`}]})
      });
      const d = await res.json();
      setResult(d.content[0].text);
    } catch(e) { setResult("Error: Check Tokens."); }
    setLoading(false);
  };
  return (
    <div style={{position:"fixed",inset:0,zIndex:900,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{...Card(), width:"500px"}}>
        <h2 style={H1}>{tool}</h2>
        <textarea value={describe} onChange={e=>setDescribe(e.target.value)} style={{width:"100%", height:"100px", background:"#000", color:"#fff", margin:"15px 0"}} placeholder="Describe your scene..." />
        <div style={{display:"flex", gap:10}}><button onClick={runAI} style={G("gold",true)}>{loading?"...":"AI CREATE"}</button><button onClick={onClose} style={G("out",true)}>CLOSE</button></div>
        {result && <div style={{marginTop:15, fontSize:12, color:GOLD, maxHeight:150, overflowY:"auto"}}>{result}</div>}
      </div>
    </div>
  );
}

// --- UPDATED PAGE 6 WITH EXTRAS BOX & MOVIE DATA ---
function P6Voice() {
  const [selVoice, setSelVoice] = useState("james");
  const [text, setText] = useState("");
  const [openExtras, setOpenExtras] = useState(false);
  const [sliders, setSliders] = useState({ deep: 0.8, whisper: 0.7, audio: 1.0, pitch: 1.0 });

  const speak = (content) => speakText(selVoice, content || text, null, null, sliders);

  const Slider = ({label, min, max, val, key}) => (
    <div style={{marginBottom:10}}>
      <div style={{display:"flex", justifyContent:"space-between", fontSize:11, color:GOLD, marginBottom:4}}><span>{label}</span><span>{val}</span></div>
      <input type="range" min={min} max={max} step="0.05" value={val} onChange={e=>setSliders(p=>({...p,[key]:parseFloat(e.target.value)}))} style={{width:"100%", accentColor:GOLD}} />
    </div>
  );

  return (
    <div style={{...Sp, padding:20}}>
      <h1 style={H1}>VOICE TOOLS</h1>
      
      {/* AI FOR FUTURE MOVIE PANEL */}
      <div style={{...Card(), border:`1px solid ${GOLD}`, margin:"20px 0"}}>
        <h3 style={{color:GOLD, marginBottom:10}}>PROJECT: AI FOR FUTURE (90-MIN DOCUMENTARY)</h3>
        <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10, maxHeight:200, overflowY:"auto"}}>
          {AI_FOR_FUTURE_MOVIE.map(scene => (
            <div key={scene.id} style={{background:BG4, padding:10, border:`1px solid ${GOLDDIM}`}}>
              <div style={{fontSize:10, color:GOLD}}>{scene.nav}</div>
              <div style={{fontSize:12, fontWeight:900, marginBottom:5}}>{scene.title}</div>
              <button onClick={() => speak(scene.narration)} style={G("gold", true)}>▶ NARRATE SCENE</button>
            </div>
          ))}
        </div>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, margin:"20px 0"}}>
        {STOCK_VOICES.map(v=>(
          <div key={v.id} onClick={()=>setSelVoice(v.id)} style={{...Card(), border: `2px solid ${selVoice===v.id?GOLD:GOLDDIM}`, cursor:"pointer"}}>
            <span style={{color:selVoice===v.id?GOLD:WHITE, fontWeight:900}}>{v.name}</span>
          </div>
        ))}
      </div>
      
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Paste custom script here..." style={{width:"100%", height:100, background:"#000", color:WHITE, border:`1px solid ${GOLDDIM}`, padding:10}} />
      <button onClick={() => speak()} style={{...G("gold", false), width:"100%", marginTop:10}}>▶ SPEAK CUSTOM TEXT</button>

      {/* EXTRAS BOX */}
      <div style={{marginTop:20}}>
        <button onClick={()=>setOpenExtras(!openExtras)} style={{...G("out", true), width:"100%"}}>{openExtras ? "CLOSE EXTRAS" : "🎁 EXTRAS BOX (VOICE SLIDERS)"}</button>
        {openExtras && (
          <div style={{...Card(), marginTop:10, background:"#050505", border:`1px solid ${GOLD}`}}>
            <Slider label="Deep" min="0.5" max="1.5" val={sliders.deep} key="deep" />
            <Slider label="Whisper" min="0.1" max="1.2" val={sliders.whisper} key="whisper" />
            <Slider label="Audio" min="0" max="1.0" val={sliders.audio} key="audio" />
            <Slider label="Pitch" min="0.5" max="2.0" val={sliders.pitch} key="pitch" />
          </div>
        )}
      </div>
    </div>
  );
}

// --- UPDATED PAGE 17 (CLEAN PREVIEW) ---
function P17() {
  return (
    <div style={{...Sp, padding:40, textAlign:"center"}}>
      <h1 style={H1}>FILM PREVIEW</h1>
      <div style={{width:"100%", aspectRatio:"16/9", background:"#111", border:`2px dashed ${GOLDDIM}`, display:"flex", alignItems:"center", justifyContent:"center", margin:"20px 0"}}>
        <span style={{color:GOLDDIM, letterSpacing:4}}>UPLOAD MEDIA TO PREVIEW "AI FOR FUTURE"</span>
      </div>
    </div>
  );
}

// --- UPDATED PAGE 23 HOW-TO ---
function P23({ go }) {
  return (
    <div style={{...Sp, padding:40, textAlign:"center"}}>
      <h1 style={H1}>THAT'S ALL FOLKS</h1>
      <div style={{...Card(), textAlign:"left", marginTop:20}}>
        <h3 style={{color:GOLD}}>📖 UPDATED: HOW TO USE VOICE EXTRAS</h3>
        <p style={{fontSize:13, lineHeight:1.7}}>1. Go to Page 6 (Voice Tools).<br/>2. Locate the **AI FOR FUTURE** project panel.<br/>3. Click **Narrate Scene** to hear James read from your book images.<br/>4. Open the **Extras Box** to adjust the Pitch and Depth sliders in real-time.</p>
        <p style={{marginTop:20, color:GOLDDIM}}>Author of Doxy The School Bully · MandaStrong1.Etsy.com</p>
      </div>
      <button onClick={()=>go(1)} style={{...G("gold"), marginTop:20}}>BACK TO HOME</button>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState(1);
  const go = p => { setPage(p); window.scrollTo(0,0); };
  const pages = { 1: <div style={{...Sp, textAlign:"center", paddingTop:100}}><h1 style={{...H1, fontSize:60}}>MANDA STRONG STUDIO</h1><button onClick={()=>go(4)} style={G("gold")}>START</button></div>, 4: <div style={{...Sp, display:"flex", alignItems:"center", justifyContent:"center"}}><div style={Card()}><h2 style={H1}>LOGIN</h2><button onClick={()=>go(6)} style={{...G("gold"), marginTop:20}}>ENTER STUDIO</button></div></div>, 6: <P6Voice />, 17: <P17 />, 23: <P23 go={go}/> };
  return (
    <div style={{background:"#000", minHeight:"100vh"}}>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@900&family=Rajdhani:wght@600;900&display=swap" rel="stylesheet"/>
      <header style={{borderBottom:`1px solid ${GOLD}`, padding:10, display:"flex", justifyContent:"space-between"}}>
        <div style={H1}>MANDA STRONG STUDIO</div>
        <div style={{color:"#22c55e"}}>● SYSTEM ONLINE</div>
      </header>
      {pages[page] || pages[1]}
      <footer style={{position:"fixed", bottom:0, width:"100%", background:"#000", borderTop:`1px solid ${GOLD}`, padding:10, display:"flex", justifyContent:"center", gap:30}}>
        <button onClick={()=>go(page-1)} style={G("out",true)}>BACK</button>
        <span style={{color:GOLD, marginTop:8}}>PAGE {page} / 23</span>
        <button onClick={()=>go(page+1)} style={G("gold",true)}>NEXT</button>
      </footer>
    </div>
  );
}