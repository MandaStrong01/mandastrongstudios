import { useState, useRef, useEffect } from "react";

const GOLD = "#e8c96d";
const GOLDDIM = "#a07820";
const BG = "#000000";
const BG4 = "#080808";
const WHITE = "#d4c9a8";
const DIM = "#aaaaaa";
const TOTAL = 23;

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
  { id:"aurora", name:"Aurora", desc:"Warm, measured British female. Calm authority with quiet emotion. Perfect for documentaries, nature films and serious narration. Never rushes. Never shouts.", style:"Documentary · Narrator", accent:"British RP" },
  { id:"marcus", name:"Marcus", desc:"Deep, commanding American male. Powerful and cinematic. Built for trailers, action films and stories that need weight behind every word.", style:"Cinematic · Authoritative", accent:"American" },
  { id:"sophia", name:"Sophia", desc:"Bright, energetic Australian female. Upbeat and engaging with natural warmth. Great for social content, uplifting stories and anything that needs forward momentum.", style:"Upbeat · Engaging", accent:"Australian" },
  { id:"james",  name:"James",  desc:"Dry, deadpan British male. Blunt, sarcastic and witty with perfect comic timing. Says the uncomfortable truth with a straight face. Ideal for satire, dark comedy and narration that should make you laugh before it makes you think.", style:"Sarcastic · Deadpan · Witty", accent:"British" },
  { id:"nova",   name:"Nova",   desc:"Neutral, precise AI-style female. Clear, clean and professional. No accent, no emotion, no opinion — just pure information delivered calmly. Perfect for tech content, instructions and corporate narration.", style:"Clean · Professional · Neutral", accent:"Neutral" },
  { id:"river",  name:"River",  desc:"Warm, unhurried American male. Southern charm with genuine intimacy. Feels like someone telling you a story on a porch at dusk. Built for personal films, heartfelt content and anything that needs feel human.", style:"Friendly · Intimate · Storyteller", accent:"American South" },
];

const VOICE_TOOLS = ["Text to Voice","Text to Speech","Text to Narration","Text to Audiobook","Text to Voiceover","AI Voice Actor","Neural Voice Generator","Emotion Voice Synth","Documentary Voice","Trailer Voice Generator","Commercial Voice","Character Voice Creator","Audiobook Creator","Podcast Voice"];

let VOICE_ASSIGNMENTS = {};
try { VOICE_ASSIGNMENTS = JSON.parse(localStorage.getItem("ms_voice_assign")||"{}"); } catch{}

let currentUtterance = null;

const VOICE_PARAMS = {
  aurora: { pitch:1.05, rate:0.82 }, 
  marcus: { pitch:0.80, rate:0.78 }, 
  sophia: { pitch:1.25, rate:1.08 }, 
  james:  { pitch:0.90, rate:0.72 }, 
  nova:   { pitch:1.10, rate:0.95 }, 
  river:  { pitch:0.95, rate:0.80 }, 
};

// UPDATED: Added pitchOverride to support the new deepening slider
function speakText(voiceId, txt, onStart, onEnd, pitchOverride) {
  if (!txt||!txt.trim()) return;
  window.speechSynthesis.cancel();
  currentUtterance = null;
  const clean = txt.replace(/\[pause\]/g,". . . ").replace(/[*\/]/g," ").slice(0,5000);
  const doSpeak = () => {
    const allVoices = window.speechSynthesis.getVoices();
    const utt = new SpeechSynthesisUtterance(clean);
    const params = VOICE_PARAMS[voiceId] || { pitch:1.0, rate:0.9 };
    
    // Apply pitch from the slider if used
    utt.pitch = pitchOverride !== undefined ? pitchOverride : params.pitch;
    utt.rate  = params.rate;

    const assignedName = VOICE_ASSIGNMENTS[voiceId];
    let picked = assignedName ? allVoices.find(v=>v.name===assignedName) : null;
    if (!picked) {
      const femalePat = /samantha|zira|victoria|moira|karen|susan|lisa|fiona|serena|tessa|heather|hazel|allison|ava|nora|siri|female/i;
      const malePat   = /david|daniel|oliver|arthur|george|harry|lee|ryan|eric|reed|liam|aaron|rishi|wayne|brian|derek|steven|alan|albert|andy|tom|bruce|fred|mark|paul|peter|john|james|gordon|alex|eddy|bobby|ralph|male/i;
      if (voiceId==="aurora") {
        picked = allVoices.find(x=>/kate|serena|emily/i.test(x.name)) || allVoices.find(x=>x.lang==="en-GB"&&femalePat.test(x.name)) || allVoices.find(x=>x.lang==="en-GB") || allVoices.find(x=>x.lang.startsWith("en")&&femalePat.test(x.name));
      } else if (voiceId==="marcus") {
        picked = allVoices.find(x=>/daniel|david|alex/i.test(x.name)&&x.lang.startsWith("en-US")) || allVoices.find(x=>x.lang==="en-US"&&malePat.test(x.name)) || allVoices.find(x=>x.lang.startsWith("en")&&malePat.test(x.name));
      } else if (voiceId==="sophia") {
        picked = allVoices.find(x=>/karen/i.test(x.name)) || allVoices.find(x=>x.lang==="en-AU") || allVoices.find(x=>x.lang.startsWith("en")&&femalePat.test(x.name));
      } else if (voiceId==="james") {
        picked = allVoices.find(x=>/daniel|oliver|arthur/i.test(x.name)&&x.lang==="en-GB") || allVoices.find(x=>x.lang==="en-GB"&&malePat.test(x.name)) || allVoices.find(x=>x.lang==="en-GB"&&!femalePat.test(x.name)) || allVoices.find(x=>x.lang.startsWith("en")&&malePat.test(x.name));
      } else if (voiceId==="nova") {
        picked = allVoices.find(x=>/samantha|victoria|zira/i.test(x.name)) || allVoices.find(x=>x.lang==="en-US"&&femalePat.test(x.name)) || allVoices.find(x=>x.lang.startsWith("en")&&femalePat.test(x.name));
      } else if (voiceId==="river") {
        picked = allVoices.find(x=>/ryan|eric|reed|liam/i.test(x.name)) || allVoices.find(x=>x.lang==="en-US"&&malePat.test(x.name)) || allVoices.find(x=>x.lang.startsWith("en")&&malePat.test(x.name));
      }
      picked = picked || allVoices.find(x=>x.lang.startsWith("en")) || allVoices[0];
    }
    if (picked) utt.voice = picked;
    currentUtterance = utt;
    if (onStart) onStart();
    utt.onend=()=>{ currentUtterance=null; if(onEnd)onEnd(); };
    utt.onerror=()=>{ currentUtterance=null; if(onEnd)onEnd(); };
    window.speechSynthesis.speak(utt);
  };
  if (window.speechSynthesis.getVoices().length>0){doSpeak();}
  else{window.speechSynthesis.onvoiceschanged=()=>{doSpeak();};}
}

function stopSpeaking() {
  window.speechSynthesis.cancel();
  currentUtterance = null;
}

export default function App() {
  return (
    <div style={Sp}>
      <h1 style={{...H1, padding:"40px 20px 20px", textAlign:"center", fontSize:28}}>
        MandaStrong Studio
      </h1>
      <p style={{textAlign:"center", color:DIM, marginBottom:40}}>
        Professional video editing platform
      </p>
    </div>
  );
}