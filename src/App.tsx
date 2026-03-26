import { useState } from "react";

const GOLD = "#e8c96d", GOLDDIM = "#a07820", BG = "#000000", WHITE = "#d4c9a8", TOTAL = 23;
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

const STOCK_VOICES = [
  { id:"aurora", name:"Aurora", desc:"Warm British female." },
  { id:"marcus", name:"Marcus", desc:"Deep American male." },
  { id:"sophia", name:"Sophia", desc:"Bright Australian female." },
  { id:"james",  name:"James",  desc:"Dry deadpan British male." },
  { id:"nova",   name:"Nova",   desc:"Neutral AI female." },
  { id:"river",  name:"River",  desc:"Warm American male." }
];

const VOICE_PARAMS = {
  aurora: { pitch:1.05, rate:0.82 }, marcus: { pitch:0.80, rate:0.78 },
  sophia: { pitch:1.25, rate:1.08 }, james:  { pitch:0.90, rate:0.72 },
  nova:   { pitch:1.10, rate:0.95 }, river:  { pitch:0.95, rate:0.80 }
};

function speakText(voiceId, txt, onStart, onEnd, extras) {
  if (!txt||!txt.trim()) return;
  window.speechSynthesis.cancel();
  const clean = txt.replace(/\[pause\]/g,". . . ").replace(/[*\/]/g," ");
  const doSpeak = () => {
    const allVoices = window.speechSynthesis.getVoices();
    const utt = new SpeechSynthesisUtterance(clean);
    const base = VOICE_PARAMS[voiceId] || { pitch:1.0, rate:0.9 };
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

function P6Voice() {
  const [selVoice, setSelVoice] = useState("james");
  const [text, setText] = useState("");
  const [openExtras, setOpenExtras] = useState(false);
  const [sliders, setSliders] = useState({ deep: 0.8, whisper: 0.7, audio: 1.0, pitch: 1.0 });

  const speak = () => speakText(selVoice, text, null, null, sliders);

  const Slider = ({label, min, max, val, key}) => (
    <div style={{marginBottom:10}}>
      <div style={{display:"flex", justifyContent:"space-between", fontSize:11, color:GOLD, marginBottom:4}}><span>{label}</span><span>{val}</span></div>
      <input type="range" min={min} max={max} step="0.05" value={val} onChange={e=>setSliders(p=>({...p,[key]:parseFloat(e.target.value)}))} style={{width:"100%", accentColor:GOLD}} />
    </div>
  );

  return (
    <div style={{...Sp, padding:20}}>
      <h1 style={H1}>VOICE TOOLS</h1>
      <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, margin:"20px 0"}}>
        {STOCK_VOICES.map(v=>(
          <div key={v.id} onClick={()=>setSelVoice(v.id)} style={{...Card(), border: `2px solid ${selVoice===v.id?GOLD:GOLDDIM}`, cursor:"pointer"}}>
            <span style={{color:selVoice===v.id?GOLD:WHITE, fontWeight:900}}>{v.name}</span>
          </div>
        ))}
      </div>
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="PASTE YOUR DOCUMENTARY SCRIPT HERE..." style={{width:"100%", height:150, background:"#000", color:WHITE, border:`1px solid ${GOLDDIM}`, padding:15, boxSizing:"border-box"}} />
      <button onClick={speak} style={{...G("gold", false), width:"100%", marginTop:10, padding:15}}>▶ GENERATE NARRATION</button>

      <div style={{marginTop:20}}>
        <button onClick={()=>setOpenExtras(!openExtras)} style={{...G("out", true), width:"100%"}}>{openExtras ? "CLOSE EXTRAS" : "🎁 OPEN EXTRAS BOX (VOICE SLIDERS)"}</button>
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

export default function App() {
  const [page, setPage] = useState(1);
  const go = p => { setPage(p); window.scrollTo(0,0); };
  const pages = {
    1: <div style={{...Sp, textAlign:"center", paddingTop:100}}>
      <h1 style={{...H1, fontSize:60}}>MANDA STRONG STUDIO</h1>
      <button onClick={()=>go(4)} style={G("gold")}>START</button>
    </div>,
    4: <div style={{...Sp, display:"flex", alignItems:"center", justifyContent:"center"}}>
      <div style={Card()}>
        <h2 style={H1}>LOGIN</h2>
        <button onClick={()=>go(6)} style={{...G("gold"), marginTop:20}}>ENTER STUDIO</button>
      </div>
    </div>,
    6: <P6Voice />,
    17: <div style={{...Sp, padding:40, textAlign:"center"}}>
      <h1 style={H1}>FILM PREVIEW</h1>
      <div style={{width:"100%", aspectRatio:"16/9", background:"#111", border:`2px dashed ${GOLDDIM}`, display:"flex", alignItems:"center", justifyContent:"center", margin:"20px 0"}}>
        <span style={{color:GOLDDIM}}>UPLOAD MEDIA TO PREVIEW FILM</span>
      </div>
    </div>,
    23: <div style={{...Sp, padding:40, textAlign:"center"}}>
      <h1 style={H1}>THAT'S ALL FOLKS</h1>
      <div style={{...Card(), textAlign:"left", marginTop:20}}>
        <h3 style={{color:GOLD}}>📖 PRODUCTION GUIDE</h3>
        <p style={{fontSize:13, lineHeight:1.7}}>Use Page 6 to test your scripts. Adjust depth and pitch in the Extras Box for your Proof of Concept.</p>
      </div>
      <button onClick={()=>go(1)} style={{...G("gold"), marginTop:20}}>BACK TO START</button>
    </div>
  };
  return (
    <div style={{background:"#000", minHeight:"100vh"}}>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@900&family=Rajdhani:wght@600;900&display=swap" rel="stylesheet"/>
      {pages[page] || pages[1]}
      <footer style={{position:"fixed", bottom:0, width:"100%", background:"#000", borderTop:`1px solid ${GOLD}`, padding:10, display:"flex", justifyContent:"center", gap:30}}>
        <button onClick={()=>go(page-1)} style={G("out",true)}>BACK</button>
        <span style={{color:GOLD, marginTop:8}}>PAGE {page} / 23</span>
        <button onClick={()=>go(page+1)} style={G("gold",true)}>NEXT</button>
      </footer>
    </div>
  );
}