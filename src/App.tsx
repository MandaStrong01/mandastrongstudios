import { useState, useEffect } from "react";
import SubscriptionPricing from './components/SubscriptionPricing';
import SubscriptionDashboard from './components/SubscriptionDashboard';

const GOLD = "#d4a847";
const GOLD2 = "#f0c870";
const GOLDDIM = "#8a6d22";
const BG = "#070707";
const BG2 = "#101010";
const BG3 = "#181818";
const BG4 = "#222222";
const TEXT = "#e8e4dc";
const TEXT2 = "#a09a8e";
const TEXT3 = "#666666";
const BORDER = "#2a2a2a";
const BORDER2 = "#333333";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Courier+Prime&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
html,body,#root{height:100%;background:${BG};color:${TEXT};font-family:'Rajdhani',sans-serif;}
body::before{content:'';position:fixed;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.05) 2px,rgba(0,0,0,.05) 4px);pointer-events:none;z-index:9999;}
::-webkit-scrollbar{width:4px;height:4px;}
::-webkit-scrollbar-track{background:${BG};}
::-webkit-scrollbar-thumb{background:${GOLDDIM};border-radius:2px;}
input,textarea{font-family:'Rajdhani',sans-serif;background:${BG3};border:1px solid ${BORDER};color:${TEXT};padding:8px 12px;font-size:13px;width:100%;}
input:focus,textarea:focus{outline:none;border-color:${GOLDDIM};}
input::placeholder,textarea::placeholder{color:${TEXT3};}
`;

// ── TOOL DATA ──────────────────────────────────────────────────────────────
const WRI = ["Script to Movie","Text to Script","Script to Screenplay","Prompt to Story","Story to Script","Text to Dialogue","Dialogue Generator","Scene Writer","Plot Generator","Story Outline","Script Formatter","Logline Generator","Synopsis Writer","Treatment Writer","Beat Sheet Builder","Character Bio Writer","Character Arc Builder","Subplot Generator","Plot Twist Generator","Opening Hook Creator","Climax Designer","Three Act Structure","Five Act Structure","Documentary Script","Short Film Script","Feature Film Script","TV Pilot Script","Commercial Script","Explainer Script","Narration Writer","Voiceover Script","Interview Script","Podcast Script","YouTube Script","Social Media Script","Action Line Writer","Scene Heading Tool","Parenthetical Generator","Dialogue Tightener","Script Timer","Word Counter","Page Counter","Reading Time Estimator","Format Checker","Grammar Polish","Spell Checker","Continuity Checker","Plot Hole Detector","Tone Checker","Genre Analyzer","Pacing Analyzer","Readability Meter","Engagement Scorer","Originality Scorer","Theme Generator","Conflict Builder","Backstory Generator","World Builder","Name Generator","Location Finder","Prop List Generator","Costume Designer","Research Helper","Fact Checker","Pitch Deck Builder","Coverage Writer","Version Control","Revision Tracker","Collab Hub","Story Outliner","Character Mapper","Emotional Arc Map","Story Arc Map","Flashback Creator","Foreshadowing Tool","MacGuffin Creator","Trope Finder","Cliche Detector","POV Analyzer","Tense Checker","Scene Analyzer","Mythology Builder","Quest Designer","Story Consultant","Inciting Incident Finder","Midpoint Architect","Character Interview","Scene Setting Engine","Prophecy Creator","History Timeline","Geography Mapper","Economy Builder","Culture Creator","Plot Tension Engine","Character Voice Lab","Sprint Timer","Pitch Writer","Tagline Generator"];
const VOI = ["Upload Own Voice","Record My Voice","Clone My Voice","Text to Speech","Text to Voice","Text to Narration","Text to Audiobook","Text to Voiceover","Voice Cloning","Voice to Voice","AI Voice Actor","Neural Voice Generator","Emotion Voice Synth","Trailer Voice Generator","Documentary Voice","Commercial Voice","News Anchor Voice","Character Voice Creator","Accent Generator","Multi Language Voice","Voice Translator","Lip Sync AI","Dialogue Synth","Audiobook Creator","Podcast Voice","Radio DJ Voice","Sports Commentary Voice","Meditation Voice","ASMR Creator","Whisper Generator","Deep Voice Generator","Robot Voice","Alien Voice","Monster Voice","Child Voice","Elderly Voice","Male to Female Voice","Female to Male Voice","Speed Controller","Pitch Controller","Tone Adjuster","Volume Normalizer","Clarity Booster","Voice Denoiser","Echo Remover","Reverb Remover","Background Noise Remover","Voice EQ Studio","De-Esser","Pop Filter Sim","Noise Gate","Compression Tool","Reverb Voice FX","Echo Voice FX","Chorus FX","Phone Effect","Radio Effect","Megaphone Effect","Lo-Fi Voice","Distortion FX","Warmth Adder","Brightness Mixer","Richness Amplifier","Resonance Tuner","Dynamic Range Engine","Vocal Enhancer","Voice Consistency Checker","Narrator Optimizer","Breathing Remover","Room Tone Match","Studio Grade Clarity","Voice Recorder","Voice Timer","Voice Health Monitor","Multi Voice Generator","Voice Mixer","Voice Layering","Choir Generator","Crowd Voice","Baby Voice","Singing Voice","Rap Voice Generator","Spoken Word Generator","Voice to Text","Voice Transcriber","Subtitle from Voice","Caption Generator","Voice Style Transfer","Celebrity Voice Match","Smooth Voice Filter","Texture Designer","Projection Booster","Volume Expander","Timbre Modifier","Voice Warm-up","Posture Guide"];
const IMA = ["Text to Image","Prompt to Image","Image to Image","Image Upscaler","Image Generator","AI Art Generator","Photo to Painting","Sketch to Image","Wireframe to Image","Background Generator","Background Remover","Sky Replacer","Object Remover","Face Generator","Character Design","Portrait Generator","Avatar Creator","Product Image Generator","Architecture Visualizer","Interior Design Generator","Landscape Generator","Abstract Art Generator","Logo Generator","Icon Creator","Texture Generator","Pattern Maker","Color Palette Generator","Style Transfer","Photo Enhancer","Photo Restorer","Old Photo Colorizer","Black & White to Color","Image Denoiser","Sharpness Enhancer","Clarity Booster","Detail Enhancer","HDR Image Creator","Exposure Fixer","White Balance AI","Color Grading Studio","LUT Creator","Tone Mapper","Contrast Adjuster","Brightness Tool","Saturation Engine","Hue Shift","Temperature Control","Vignette Tool","Bokeh Generator","Depth of Field","Film Grain Synth","Light Leaks","Lens Flare","God Rays","Volumetric Light","Golden Hour FX","Blue Hour FX","Sunset FX","Sunrise FX","Moonlight FX","Neon Light","Fire Light","Candle Light","Studio Light","3 Point Light","Rim Light","Shadow Generator","Highlight Creator","Ambient Occlusion","Global Illumination","Panorama Stitcher","360 Image Creator","Fisheye Corrector","Lens Distorter","Chromatic Aberration","Motion Blur","Radial Blur","Zoom Blur","Gaussian Blur","Weather FX","Rain Effect","Snow Effect","Fog Generator","Smoke FX","Fire Creator","Explosion FX","Lightning FX","Aurora Effect","Rainbow Creator","Caustics Engine","Prop Creator","Scene Compositor","Lighting Designer","Cloud Generator","Dehaze Engine"];
const VID = ["Text to Video","Prompt to Video","Image to Video","Script to Video","Story to Video","AI Movie Creator","AI Film Maker","AI Video Generator","Scene Generator","Shot Generator","Video Upscaler 4K","Video Upscaler 8K","Frame Rate Booster","60FPS Converter","Slow Motion Generator","Time Lapse Creator","Speed Ramp Engine","Video Extender","Video Stabilizer","Background Remover","Green Screen Replacer","Sky Replacer Video","Object Remover Video","Watermark Remover","Video Denoiser","Video Sharpener","Color Grading Pro","Film Look Generator","Cinematic LUT","Black & White Film","Film Restorer","Old Film Effect","VHS Effect","Glitch Effect","Hologram Effect","Drone Shot Generator","Aerial View Creator","Tracking Shot","Dolly Zoom","Whip Pan","Time Freeze","Bullet Time Effect","Matrix Effect","Clone Effect","Face Swap Video","Deepfake Detector","Age Progression Video","De-Aging Video","Talking Head Generator","Avatar Video Creator","Virtual Presenter","AI News Anchor","Lip Sync Video","Mouth Animation","Eye Contact Correction","Head Pose Correction","Video Translator","Subtitle Generator","Caption Burner","Auto Subtitles","Video Loop Creator","Boomerang Effect","Reverse Video","Mirror Effect","Split Screen Creator","Picture in Picture","Video Collage","Slideshow Maker","Transition Generator","Intro Maker","Outro Maker","Lower Third Generator","Title Card Creator","End Screen Maker","Thumbnail Generator","Cover Frame Selector","Video Compressor","Format Converter","Resolution Changer","Crop & Resize","Video Trimmer","Scene Cutter","Auto Edit","Jump Cut Generator","Beat Sync Editor","Highlight Reel Maker","Recap Generator","Trailer Maker","Teaser Creator","Sizzle Reel"];
const MOT = ["Text to Animation","Prompt to Motion","Image to Animation","2D to 3D Animation","Character Animation","Facial Animation","Body Motion Capture","Hand Animation","Lip Sync Animation","Eye Blink Animation","Crowd Animation","Animal Animation","VFX Generator","Particle Effect Generator","Explosion Generator","Fire Animation","Smoke Animation","Water Simulation","Rain Animation","Snow Animation","Lightning FX","Magic Effect","Energy Beam","Portal Effect","Teleportation FX","Force Field","Shockwave Creator","Laser Effect","Plasma Effect","Hologram Animation","Glitch FX","Invisibility Effect","Morphing Effect","Liquid Metal","Shape Shifting","Disintegration FX","Physics Simulator","Gravity Simulator","Cloth Dynamics","Hair Simulator","Fur Dynamics","Rigid Body Physics","Soft Body Physics","Fluid Dynamics","Rope Physics","Chain Dynamic","Destruction Simulator","Fracture System","Debris Generator","Dust Effect","Spark Generator","Motion Tracker","Camera Tracker","Object Tracker","Face Tracker","Stabilizer","Speed Lines","Zoom Blur Motion","Motion Trail","Echo Effect","Ghost Effect","Freeze Frame","Slow Motion FX","Hyperspeed Effect","Time Warp","Strobe Effect","Keyframe Animator","Ease In / Ease Out","Bounce Effect","Elastic Motion","Spring System","Path Animator","Orbit Animation","Rotation Loop","Float Animation","Pendulum Motion","Screen Shake","Camera Shake","Handheld Camera FX","Cinematic Push In","Ken Burns Effect","Parallax Effect","3D Camera Move","Dolly In Animation","Crane Move","Tilt Shift Animation","Cartoon Animation","Stop Motion Style","Claymation Effect","Puppet Rig","IK Rig Builder","Skeleton Animator","Mocap Solver","Facial Rigging","Muscle System","Skin Deformer"];
const ENH = ["AI 8K Upscaling","AI 4K Upscaling","Video Super Resolution","Frame Interpolation","Video Denoiser","Noise Reduction","Grain Remover","Artifact Remover","Scratch Remover","Video Sharpener","Clarity Booster","Detail Enhancer","Edge Enhancement","Texture Boost","Color Correction","Auto Color Balance","White Balance AI","Color Match Pro","Color Grading AI","Cinematic Color Grade","Film Stock Emulation","LUT Generator","Tone Mapping Pro","HDR Enhancement","Deep HDR Boost","Dynamic Range Expansion","Shadow Recovery","Highlight Recovery","Highlight Rolloff","Black Point Calibration","Gamma Correction","Contrast Enhancer","Brightness Optimizer","Saturation Booster","Smart Saturation","Skin Tone Enhancer","Face Enhancement","Face Retouch","Eye Enhancer","Teeth Whitener","Background Enhancer","Sky Enhancer","Landscape Enhancer","Night Video Enhancer","Low Light Clarity","Motion Stabilization","Shake Remover","Rolling Shutter Fix","Flicker Reduction","Flicker Fixer","Lens Distortion Fix","Vignette Remover","Chromatic Aberration Fix","Moire Remover","De-Banding Pro","Anamorphic Correction","Audio Enhancer","Voice Clarity Booster","Dialogue Enhancer","Background Noise Remover","Echo Remover","Reverb Remover","Hum Remover","Wind Noise Remover","Breath Remover","Click & Pop Remover","Room Tone Match","Audio Normalization","Loudness Optimizer","Cinematic Grain","Film Grain Advanced","Halation Effect","Glow Synthesis","Bloom Control","Lens Flare Enhancer","Atmospheric Haze","Light Wrap","Depth of Field Enhancement","Bokeh Enhancer","Focus Puller","Optical Flow Smooth","Temporal Denoise","Motion Blur Add","Sky Replacement","Background Replacement","Object Removal","Watermark Remover","Subtitles Enhancer","Burned Caption Fix","Frame Rate Fix","Sync Fix","Audio Drift Fix","Quality Optimizer","File Size Optimizer","Codec Converter","Format Enhancer","Master Exporter"];

const WS_TABS = [
  {l:"WRI",p:4},{l:"VOI",p:5},{l:"IMA",p:6},{l:"VID",p:7},{l:"MOT",p:8},{l:"ENH",p:9}
];

// ── SHARED STYLES ─────────────────────────────────────────────────────────
const S = {
  btn: (variant:"gold"|"out"|"ghost") => ({
    display:"inline-flex" as const, alignItems:"center" as const, gap:6,
    fontFamily:"'Rajdhani',sans-serif", fontSize:11, fontWeight:700,
    letterSpacing:3, textTransform:"uppercase" as const,
    padding:"8px 20px", cursor:"pointer", border:"none", transition:"all .2s",
    ...(variant==="gold" ? {background:GOLD,color:"#000"} :
        variant==="out"  ? {background:"transparent",color:GOLD,border:`1px solid ${GOLDDIM}`} :
                           {background:"transparent",color:TEXT2,border:`1px solid ${BORDER2}`})
  }),
  cinzel: (size:number, color=GOLD2, weight=700) => ({
    fontFamily:"'Cinzel',serif", fontSize:size, fontWeight:weight, color, letterSpacing:3
  }),
  card: {background:BG3, border:`1px solid ${BORDER}`, padding:20},
};

// ── COMPONENTS ────────────────────────────────────────────────────────────
function Btn({children,onClick,variant="out",style={}}:{children:any,onClick?:()=>void,variant?:"gold"|"out"|"ghost",style?:any}) {
  return <button style={{...S.btn(variant),...style}} onClick={onClick}>{children}</button>;
}

function WsTabs({active,goTo}:{active:number,goTo:(n:number)=>void}) {
  return (
    <div style={{display:"flex",gap:2}}>
      {WS_TABS.map(t=>(
        <button key={t.l} onClick={()=>goTo(t.p)} style={{
          fontFamily:"'Rajdhani',sans-serif",fontSize:10,letterSpacing:2,fontWeight:700,
          padding:"5px 10px",cursor:"pointer",background:t.p===active?BG:BG3,
          color:t.p===active?GOLD:TEXT3,border:`1px solid ${t.p===active?GOLDDIM:BORDER}`,
          borderBottom:"none",transition:"all .2s"
        }}>{t.l}</button>
      ))}
    </div>
  );
}

function ToolGrid({tools,onAI}:{tools:string[],onAI:(t:string)=>void}) {
  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:2,padding:2,background:BORDER}}>
      {tools.map(t=>(
        <div key={t} style={{background:BG2,padding:"10px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",border:`1px solid transparent`,transition:"all .2s"}}
          onMouseEnter={e=>(e.currentTarget.style.borderColor=GOLDDIM)}
          onMouseLeave={e=>(e.currentTarget.style.borderColor="transparent")}>
          <span style={{fontSize:13,letterSpacing:.5,color:TEXT,fontWeight:500}}>{t}</span>
          <div style={{display:"flex",gap:3,flexShrink:0}}>
            {["UPLOAD","PASTE"].map(lbl=>(
              <button key={lbl} style={{fontSize:8,letterSpacing:1,padding:"3px 7px",cursor:"pointer",background:BG3,border:`1px solid ${BORDER}`,color:TEXT3,fontFamily:"'Rajdhani',sans-serif",fontWeight:600}}>{lbl}</button>
            ))}
            <button onClick={()=>onAI(t)} style={{fontSize:8,letterSpacing:1,padding:"3px 7px",cursor:"pointer",background:"transparent",border:`1px solid ${GOLDDIM}`,color:GOLD,fontFamily:"'Rajdhani',sans-serif",fontWeight:600}}>AI ✦</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function WsHeader({page,title,count,goTo}:{page:number,title:string,count:number,goTo:(n:number)=>void}) {
  return (
    <div style={{background:BG2,borderBottom:`1px solid ${BORDER}`,padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
      <WsTabs active={page} goTo={goTo}/>
      <div style={{textAlign:"right"}}>
        <div style={S.cinzel(13)}>{title}</div>
        <div style={{fontSize:10,letterSpacing:2,color:TEXT3}}>{count} TOOLS</div>
      </div>
    </div>
  );
}

function PlayControls({onPlay}:{onPlay:()=>void}) {
  const pbtn = (icon:string, onClick:()=>void, primary=false) => (
    <button onClick={onClick} style={{width:40,height:40,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:primary?20:16,cursor:"pointer",border:primary?"none":`1px solid ${BORDER}`,background:primary?GOLD:BG4,color:primary?"#000":TEXT2,transition:"all .2s"}}>{icon}</button>
  );
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,background:BG3,border:`1px solid ${BORDER}`,padding:16,margin:"16px 0"}}>
      {pbtn("⏮",()=>{})}
      {pbtn("⏪",()=>{})}
      {pbtn("▶",onPlay,true)}
      {pbtn("⏸",()=>{})}
      {pbtn("⏹",()=>{})}
      <div style={{flex:1,height:3,background:BORDER,borderRadius:2}}><div style={{height:"100%",background:GOLD,borderRadius:2,width:"0%"}}/></div>
      <span style={{fontSize:11,letterSpacing:2,color:TEXT2,fontFamily:"'Courier Prime',monospace"}}>00:00 / 90:00</span>
      {pbtn("⏩",()=>{})}
    </div>
  );
}

// ── AI PANEL ──────────────────────────────────────────────────────────────
function AIPanel({tool,onClose}:{tool:string,onClose:()=>void}) {
  const [msgs, setMsgs] = useState<{role:string,text:string}[]>([
    {role:"think", text:`Ready to help with ${tool}. Describe what you need.`}
  ]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!inp.trim()) return;
    const msg = inp.trim();
    setInp("");
    setMsgs(m=>[...m,{role:"user",text:msg}]);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,
          system:`You are an expert AI film production assistant inside MandaStrong Studio helping with the "${tool}" tool. Be concise and practical.`,
          messages:[{role:"user",content:msg}]})
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "No response.";
      setMsgs(m=>[...m,{role:"asst",text:reply}]);
    } catch { setMsgs(m=>[...m,{role:"think",text:"Connection error."}]); }
    setLoading(false);
  }

  return (
    <div style={{position:"fixed",right:0,top:0,bottom:0,width:380,background:BG2,borderLeft:`1px solid ${GOLDDIM}`,display:"flex",flexDirection:"column",zIndex:200}}>
      <div style={{padding:"12px 16px",borderBottom:`1px solid ${BORDER}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <span style={S.cinzel(12)}>✦ {tool.toUpperCase()}</span>
        <button onClick={onClose} style={{background:"none",border:`1px solid ${BORDER}`,color:TEXT2,padding:"3px 8px",cursor:"pointer",fontFamily:"'Rajdhani',sans-serif",fontSize:10}}>✕ CLOSE</button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:14,display:"flex",flexDirection:"column",gap:10}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{padding:"10px 12px",fontSize:12,lineHeight:1.6,
            background:m.role==="user"?BG3:m.role==="asst"?"rgba(26,82,118,.2)":"transparent",
            borderLeft:m.role==="user"?`2px solid ${GOLDDIM}`:m.role==="asst"?"2px solid #2980b9":"none",
            color:m.role==="asst"?"#aed6f1":m.role==="think"?TEXT3:TEXT,
            fontStyle:m.role==="think"?"italic":"normal"
          }}>{m.text}</div>
        ))}
        {loading && <div style={{fontSize:11,color:TEXT3,fontStyle:"italic",padding:8}}>Processing…</div>}
      </div>
      <div style={{padding:"10px 14px",borderTop:`1px solid ${BORDER}`}}>
        <div style={{display:"flex",gap:6}}>
          <textarea value={inp} onChange={e=>setInp(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}
            placeholder="Describe what you need…"
            style={{flex:1,height:54,resize:"none",padding:"8px 10px",fontSize:12}}/>
          <button onClick={send} style={{...S.btn("gold"),height:54,padding:"0 16px"}}>✦ GO</button>
        </div>
      </div>
    </div>
  );
}

// ── AGENT GROK ────────────────────────────────────────────────────────────
function AgentGrok() {
  const [msgs, setMsgs] = useState<{role:string,content:string}[]>([]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!inp.trim()) return;
    const msg = inp.trim();
    setInp("");
    const history = [...msgs, {role:"user",content:msg}];
    setMsgs(history);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,
          system:"You are Agent Grok, 24/7 production assistant for MandaStrong Studio. Help with uploads, AI tools, timeline, enhancement, mixing, rendering, exports. Be practical and concise.",
          messages:history.map(m=>({role:m.role,content:m.content}))})
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, try again.";
      setMsgs([...history,{role:"assistant",content:reply}]);
    } catch { setMsgs([...history,{role:"assistant",content:"Connection error — please try again."}]); }
    setLoading(false);
  }

  return (
    <div style={{maxWidth:640,margin:"0 auto",padding:"28px 20px"}}>
      <div style={{textAlign:"center",paddingBottom:16}}>
        <div style={{width:60,height:60,border:`2px solid ${GOLD}`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,margin:"0 auto 10px",background:BG3}}>🤖</div>
        <div style={S.cinzel(18,GOLD2)}>AGENT GROK</div>
        <div style={{fontSize:10,letterSpacing:3,color:TEXT3,marginTop:4}}>24/7 PRODUCTION SUPPORT</div>
      </div>
      <div style={{background:BG2,border:`1px solid ${BORDER}`,padding:14,minHeight:240,maxHeight:360,overflowY:"auto",display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>
        {msgs.length===0 && (
          <div style={{padding:"10px 14px",background:"rgba(26,82,118,.2)",borderLeft:"2px solid #2980b9",color:"#aed6f1",fontSize:13,lineHeight:1.7}}>
            I'm Agent Grok — your 24/7 production assistant. Ask me anything about uploads, AI generation, timeline editing, enhancements, audio mixing, rendering, or exports.
          </div>
        )}
        {msgs.map((m,i)=>(
          <div key={i} style={{padding:"10px 14px",fontSize:13,lineHeight:1.7,maxWidth:"92%",
            background:m.role==="user"?BG3:"rgba(26,82,118,.2)",
            borderLeft:m.role==="user"?`2px solid ${GOLDDIM}`:"2px solid #2980b9",
            color:m.role==="user"?TEXT:"#aed6f1",
            alignSelf:m.role==="user"?"flex-end":"flex-start"
          }}>{m.content}</div>
        ))}
        {loading && <div style={{fontSize:11,color:TEXT3,fontStyle:"italic",alignSelf:"center"}}>Agent Grok is thinking…</div>}
      </div>
      <div style={{display:"flex",gap:8}}>
        <input value={inp} onChange={e=>setInp(e.target.value)}
          onKeyDown={e=>{if(e.key==="Enter")send();}}
          placeholder="Ask Agent Grok anything…"
          style={{flex:1,padding:"10px 14px",fontSize:13}}/>
        <button onClick={send} style={S.btn("gold")}>SEND</button>
      </div>
    </div>
  );
}

// ── PAGES ─────────────────────────────────────────────────────────────────
function PageHome({goTo}:{goTo:(n:number)=>void}) {
  return (
    <div style={{maxWidth:900,margin:"0 auto",padding:"60px 20px",textAlign:"center"}}>
      <div style={{fontSize:9,letterSpacing:5,color:GOLDDIM,marginBottom:8,fontFamily:"'Cinzel',serif",textTransform:"uppercase"}}>Cinema Intelligence Platform — Est. 2026</div>
      <div style={{...S.cinzel(44,GOLD2,900),letterSpacing:8,lineHeight:1.1,marginBottom:12}}>MANDA STRONG<br/>STUDIO</div>
      <div style={{fontSize:12,letterSpacing:4,color:TEXT2,marginBottom:24}}>600+ AI TOOLS &nbsp;•&nbsp; 8K EXPORT &nbsp;•&nbsp; UP TO 3-HOUR FILMS</div>
      <div style={{fontSize:14,color:TEXT,marginBottom:32,maxWidth:500,margin:"0 auto 32px",lineHeight:1.8}}>The All-In-One Professional AI Movie Creation Platform</div>
      <div style={{background:`linear-gradient(90deg,transparent,rgba(212,168,71,.15),transparent)`,borderTop:`1px solid ${GOLDDIM}`,borderBottom:`1px solid ${GOLDDIM}`,padding:12,marginBottom:32,fontSize:12,letterSpacing:2,color:GOLD2}}>
        🎬 Special Offer: New Studio Plan Subscribers Receive 7-Day Free Trial
      </div>
      <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:48}}>
        <Btn variant="gold" onClick={()=>goTo(4)}>▶ START CREATING</Btn>
        <Btn variant="out" onClick={()=>goTo(3)}>LOGIN / REGISTER</Btn>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,maxWidth:560,margin:"0 auto"}}>
        {[["600+","AI Tools"],["8K","Cinema Export"],["3hrs","Max Duration"]].map(([n,l])=>(
          <div key={n} style={{background:BG3,border:`1px solid ${BORDER}`,padding:20,borderTop:`2px solid ${GOLDDIM}`}}>
            <div style={S.cinzel(30,GOLD2,900)}>{n}</div>
            <div style={{fontSize:10,letterSpacing:2,color:TEXT2,marginTop:4}}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PageAbout() {
  return (
    <div style={{maxWidth:1000,margin:"0 auto",padding:"28px 20px 60px"}}>
      <div style={{fontSize:9,letterSpacing:5,color:GOLDDIM,marginBottom:6,fontFamily:"'Cinzel',serif",textTransform:"uppercase"}}>About the Platform</div>
      <div style={S.cinzel(24,GOLD2)}>MAKE AWESOME FAMILY MOVIES OR TURN YOUR DREAMS INTO REALITY</div>
      <div style={{fontSize:13,color:TEXT2,letterSpacing:1,margin:"8px 0 32px",lineHeight:1.7}}>MandaStrong Studio combines the power of 600+ professional AI tools with an intuitive cinematic workspace — so anyone can create stunning short films, family videos, or feature-length productions up to 3 hours long. No film school required.</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,margin:"24px 0"}}>
        {[["600+","AI Tools Across 6 Categories"],["8K","Cinema-Grade Export Quality"],["3 Hours","Maximum Film Duration"],["1TB","Cloud Storage on Studio Plan"]].map(([n,l])=>(
          <div key={n} style={{background:BG3,border:`1px solid ${BORDER}`,padding:20,textAlign:"center",borderTop:`2px solid ${GOLDDIM}`}}>
            <div style={S.cinzel(30,GOLD2,900)}>{n}</div>
            <div style={{fontSize:10,letterSpacing:2,color:TEXT2,marginTop:4}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{height:1,background:`linear-gradient(90deg,transparent,${GOLDDIM},transparent)`,margin:"24px 0"}}/>
      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
        {["Writing & Script AI","Voice Synthesis","Image Generation","Video Production","Motion & VFX","AI Enhancement"].map(f=>(
          <span key={f} style={{background:BG3,border:`1px solid ${BORDER}`,padding:"5px 12px",fontSize:10,letterSpacing:2,color:GOLD}}>✦ {f}</span>
        ))}
      </div>
    </div>
  );
}

function PageShowcase({goTo}:{goTo:(n:number)=>void}) {
  return (
    <div style={{maxWidth:1000,margin:"0 auto",padding:"28px 20px 60px"}}>
      <div style={{fontSize:9,letterSpacing:5,color:GOLDDIM,marginBottom:6,fontFamily:"'Cinzel',serif",textTransform:"uppercase"}}>Showcase</div>
      <div style={S.cinzel(24,GOLD2)}>EXAMPLES MADE BY MANDASTRONG STUDIO</div>
      <div style={{display:"inline-block",background:"#c0392b",color:"#fff",fontSize:8,letterSpacing:2,padding:"2px 8px",margin:"10px 0"}}>ADMIN ACTIVE</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,margin:"16px 0"}}>
        {[
          {n:"VIEWER 01",t:"HUMANITY OF AI",s:"A documentary film — MandaStrong Studio x Doxy",icon:"🎬"},
          {n:"VIEWER 02",t:"AI FOR DUMMIES",s:"A plain-English guide to artificial intelligence",icon:"🎥"},
        ].map(v=>(
          <div key={v.n} style={{background:BG3,border:`1px solid ${BORDER}`,overflow:"hidden"}}>
            <div style={{background:"#000",aspectRatio:"16/9",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,borderBottom:`1px solid ${BORDER}`,cursor:"pointer"}}>{v.icon}</div>
            <div style={{padding:12}}>
              <div style={{fontSize:8,letterSpacing:3,color:TEXT3,marginBottom:3}}>{v.n}</div>
              <div style={{fontSize:13,fontWeight:700,letterSpacing:2,color:TEXT,marginBottom:3}}>{v.t}</div>
              <div style={{fontSize:10,color:TEXT3,marginBottom:8}}>{v.s}</div>
              <div style={{border:`1px dashed ${GOLDDIM}`,padding:"8px 14px",fontSize:9,letterSpacing:3,color:GOLDDIM,textAlign:"center",cursor:"pointer"}}>▲ UPLOAD FILM</div>
            </div>
          </div>
        ))}
        <div style={{background:BG3,border:`1px solid ${BORDER}`,gridColumn:"1/-1",overflow:"hidden"}}>
          <div style={{background:"#000",aspectRatio:"21/9",display:"flex",alignItems:"center",justifyContent:"center",fontSize:40,borderBottom:`1px solid ${BORDER}`,cursor:"pointer"}}>🏆</div>
          <div style={{padding:12}}>
            <div style={{fontSize:8,letterSpacing:3,color:TEXT3,marginBottom:3}}>VIEWER 03 — FEATURE SHOWCASE</div>
            <div style={{fontSize:13,fontWeight:700,letterSpacing:2,color:TEXT,marginBottom:8}}>HUMANITY OF AI — FEATURE CUT</div>
            <div style={{border:`1px dashed ${GOLDDIM}`,padding:"8px 14px",fontSize:9,letterSpacing:3,color:GOLDDIM,textAlign:"center",cursor:"pointer"}}>▲ UPLOAD FEATURE FILM</div>
          </div>
        </div>
      </div>
      <div style={{height:1,background:`linear-gradient(90deg,transparent,${GOLDDIM},transparent)`,margin:"24px 0"}}/>
      <div style={{textAlign:"center",padding:"16px 0"}}>
        <div style={S.cinzel(14,GOLD)}>READY TO CREATE YOUR OWN?</div>
        <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:14}}>
          <Btn variant="gold" onClick={()=>goTo(3)}>LOGIN / REGISTER</Btn>
          <Btn variant="out" onClick={()=>goTo(4)}>BROWSE TOOLS →</Btn>
        </div>
      </div>
    </div>
  );
}

function PagePlans({goTo}:{goTo:(n:number)=>void}) {
  const [view, setView] = useState<'pricing' | 'dashboard'>('pricing');

  return (
    <div>
      {view === 'pricing' ? (
        <SubscriptionPricing onClose={() => goTo(0)} />
      ) : (
        <SubscriptionDashboard />
      )}
    </div>
  );
}

function PageRender({assets}:{assets:any[]}) {
  const [quality, setQuality] = useState("8K — 4320p");
  const [format, setFormat] = useState("MP4");
  return (
    <div style={{maxWidth:1000,margin:"0 auto",padding:"28px 20px 60px"}}>
      <div style={{fontSize:9,letterSpacing:5,color:GOLDDIM,marginBottom:6,fontFamily:"'Cinzel',serif",textTransform:"uppercase"}}>Final Output</div>
      <div style={S.cinzel(24,GOLD2)}>RENDER FILM</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,margin:"16px 0"}}>
        {[{title:"EXPORT QUALITY",opts:["8K — 4320p","4K — 2160p","HD — 1080p","SD — 720p"],val:quality,set:setQuality},
          {title:"FORMAT",opts:["MP4","MOV","AVI","WebM"],val:format,set:setFormat}].map(card=>(
          <div key={card.title} style={{background:BG3,border:`1px solid ${BORDER}`,padding:20}}>
            <div style={S.cinzel(11,GOLD)}>{card.title}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:12}}>
              {card.opts.map(o=>(
                <div key={o} onClick={()=>card.set(o)} style={{padding:"7px 14px",border:`1px solid ${o===card.val?GOLD:BORDER}`,cursor:"pointer",fontSize:11,letterSpacing:2,color:o===card.val?GOLD:TEXT2,background:o===card.val?"rgba(212,168,71,.08)":"transparent",transition:"all .2s"}}>{o}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,margin:"14px 0"}}>
        {[["90 MIN","Duration"],[String(assets.length),"Video Clips"],["0","Audio Tracks"]].map(([n,l])=>(
          <div key={l} style={{background:BG3,border:`1px solid ${BORDER}`,padding:16,textAlign:"center",borderTop:`2px solid ${GOLDDIM}`}}>
            <div style={S.cinzel(22,GOLD2,900)}>{n}</div>
            <div style={{fontSize:10,letterSpacing:2,color:TEXT3}}>{l}</div>
          </div>
        ))}
      </div>
      <PlayControls onPlay={()=>{}}/>
      <div style={{textAlign:"center",fontSize:11,letterSpacing:2,color:TEXT3}}>Selected: <span style={{color:GOLD}}>{quality} · {format}</span></div>
    </div>
  );
}

function PagePreview() {
  const socials = [["📺","YouTube"],["📸","Instagram"],["🎵","TikTok"],["𝕏","X / Twitter"],["📘","Facebook"],["💼","LinkedIn"],["🌐","Vimeo"],["📌","Pinterest"],["☁️","Community Hub"],["⬇️","Download"],["🔗","Copy Link"],["📱","WhatsApp"]];
  return (
    <div style={{maxWidth:1000,margin:"0 auto",padding:"28px 20px 60px"}}>
      <div style={{fontSize:9,letterSpacing:5,color:GOLDDIM,marginBottom:6,fontFamily:"'Cinzel',serif",textTransform:"uppercase"}}>Preview Player</div>
      <div style={S.cinzel(24,GOLD2)}>FILM PREVIEW</div>
      <div style={{background:"#000",aspectRatio:"16/9",display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${BORDER}`,marginBottom:12,maxWidth:720}}>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:40,marginBottom:10}}>🎬</div>
          <div style={{fontSize:11,letterSpacing:2,color:TEXT3,marginBottom:12}}>NO RENDER AVAILABLE</div>
          <Btn variant="out" style={{fontSize:10,padding:"5px 14px"}}>GO TO RENDER →</Btn>
        </div>
      </div>
      <PlayControls onPlay={()=>{}}/>
      <div style={{height:1,background:`linear-gradient(90deg,transparent,${GOLDDIM},transparent)`,margin:"24px 0"}}/>
      <div style={S.cinzel(12,GOLD,400)}>SHARE YOUR FILM</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))",gap:10,marginTop:14}}>
        {socials.map(([ic,nm])=>(
          <div key={nm} style={{background:BG3,border:`1px solid ${BORDER}`,padding:12,textAlign:"center",cursor:"pointer"}}>
            <div style={{fontSize:20,marginBottom:5}}>{ic}</div>
            <div style={{fontSize:9,letterSpacing:2,color:TEXT2,textTransform:"uppercase"}}>{nm}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PageCommunity({goTo}:{goTo:(n:number)=>void}) {
  const posts = [["🎬","Epic Action Feature","BY SARAH J.","2,847","1,923"],["📹","Family Documentary","BY MIKE CHEN","1,256","892"],["🏆","Short Film Entry","BY EMILY R.","3,421","2,156"],["🎵","Music Video Cut","BY ALEX T.","5,234","4,012"]];
  return (
    <div style={{maxWidth:1000,margin:"0 auto",padding:"28px 20px 60px"}}>
      <div style={{background:"#000",aspectRatio:"16/9",display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${GOLDDIM}`,marginBottom:24,maxWidth:720,cursor:"pointer"}}>
        <div style={{width:64,height:64,borderRadius:"50%",background:"rgba(212,168,71,.9)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>▶</div>
      </div>
      <div style={{fontSize:9,letterSpacing:5,color:GOLDDIM,marginBottom:6,fontFamily:"'Cinzel',serif",textTransform:"uppercase"}}>Creator Network</div>
      <div style={S.cinzel(24,GOLD2)}>COMMUNITY HUB</div>
      <div style={{marginBottom:24,marginTop:16}}>
        {posts.map(([ic,title,auth,views,likes])=>(
          <div key={title} style={{background:BG3,border:`1px solid ${BORDER}`,padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:26}}>{ic}</span>
              <div>
                <div style={{fontSize:14,fontWeight:600,color:TEXT,marginBottom:2}}>{title}</div>
                <div style={{fontSize:10,letterSpacing:2,color:TEXT3}}>{auth}</div>
              </div>
            </div>
            <div style={{display:"flex",gap:14,fontSize:12,color:TEXT3,alignItems:"center"}}>
              <span>👁 {views}</span><span>❤️ {likes}</span>
              <Btn variant="ghost" style={{fontSize:10,padding:"4px 12px"}}>POST</Btn>
            </div>
          </div>
        ))}
      </div>
      <div style={{height:1,background:`linear-gradient(90deg,transparent,${GOLDDIM},transparent)`,margin:"24px 0"}}/>
      <div style={{background:BG3,border:`1px solid ${GOLDDIM}`,padding:32,maxWidth:640,margin:"24px auto",position:"relative"}}>
        <div style={{position:"absolute",top:10,left:10,right:10,bottom:10,border:`1px solid ${BORDER}`,pointerEvents:"none"}}/>
        <div style={{...S.cinzel(20,GOLD2),textAlign:"center",marginBottom:20}}>✦ THAT'S ALL FOLKS ✦</div>
        <div style={{fontSize:13,lineHeight:2,color:TEXT2}}>
          <p style={{marginBottom:14}}>Dear Creator,</p>
          <p style={{marginBottom:14}}>From the bottom of my heart — <strong style={{color:TEXT}}>thank you</strong>. Whether you're here to capture precious family memories, tell a story that's lived rent-free in your head for years, or simply explore what's possible when creativity meets technology, you chose to do it with MandaStrong Studio. That means everything.</p>
          <p style={{marginBottom:14}}>I built this platform because I believe that <strong style={{color:TEXT}}>storytelling should have no gatekeepers</strong>. You don't need a film school degree, an expensive camera rig, or a Hollywood budget to make something extraordinary. You just need a story worth telling — and now, you have 600+ professional tools to help you tell it.</p>
          <p style={{marginBottom:14}}>Every subscription supports something much bigger than software. A portion of every dollar goes directly toward <strong style={{color:TEXT}}>veterans' mental health initiatives</strong> and <strong style={{color:TEXT}}>school anti-bullying programs</strong> — causes that are deeply personal to me as the author of <em>Doxy the School Bully</em>. When you create here, you're not just making films. You're helping build a kinder, more supported world.</p>
          <p style={{marginBottom:14}}>This is only the beginning. There is so much more to come. Thank you for believing in this from day one.</p>
          <p>With gratitude and cinematic love,</p>
          <div style={{marginTop:20,fontFamily:"'Cinzel',serif",fontSize:12,color:GOLD,lineHeight:1.8}}>
            — Amanda Strong<br/>Founder, MandaStrong Studio<br/>Author, <em>Doxy the School Bully</em><br/>
            <span style={{fontSize:10,color:GOLDDIM}}>MandaStrong1.Etsy.com</span>
          </div>
        </div>
      </div>
      <div style={{background:`linear-gradient(135deg,${BG2},${BG3})`,border:`1px solid ${GOLDDIM}`,padding:"28px 32px",margin:"20px 0"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:5,color:GOLD,marginBottom:12,textTransform:"uppercase"}}>OUR MISSION</div>
        <div style={{fontSize:13,lineHeight:1.9,color:TEXT2,marginBottom:20}}>MandaStrong Studio exists to democratize cinematic storytelling — to place the full power of professional film production in the hands of every creator, regardless of background, budget, or experience. We believe every story deserves to be told, every voice deserves to be heard, and every dream deserves a canvas.</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12}}>
          {[["🎬","EMPOWER CREATORS","600+ AI tools that make professional filmmaking accessible to everyone."],
            ["🛡️","PROTECT THE YOUNG","Revenue funds school anti-bullying programs, inspired by Doxy the School Bully."],
            ["🎖️","SUPPORT VETERANS","We fund mental health services for veterans — because they deserve the best."],
            ["🌍","BUILD COMMUNITY","The Creator Network connects filmmakers worldwide to share and grow together."]
          ].map(([ic,t,tx])=>(
            <div key={t} style={{background:BG,border:`1px solid ${BORDER}`,padding:14}}>
              <div style={{fontSize:18,marginBottom:6}}>{ic}</div>
              <div style={{fontSize:10,letterSpacing:3,color:GOLD,marginBottom:4,fontWeight:700}}>{t}</div>
              <div style={{fontSize:11,color:TEXT3,lineHeight:1.6}}>{tx}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:24,flexWrap:"wrap"}}>
        <Btn variant="out">VISIT ETSY STORE</Btn>
        <Btn variant="gold" onClick={()=>goTo(0)}>RETURN HOME</Btn>
      </div>
    </div>
  );
}

function PageMixer() {
  const [vals, setVals] = useState({MUSIC:75,VOICE:60,SFX:50,MASTER:85});
  return (
    <div style={{maxWidth:1000,margin:"0 auto",padding:"28px 20px 60px"}}>
      <div style={{fontSize:9,letterSpacing:5,color:GOLDDIM,marginBottom:6,fontFamily:"'Cinzel',serif",textTransform:"uppercase"}}>Mixing Console</div>
      <div style={S.cinzel(24,GOLD2)}>AUDIO MIXER</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,margin:"24px 0"}}>
        {(["MUSIC","VOICE","SFX","MASTER"] as const).map(ch=>(
          <div key={ch} style={{background:BG3,border:`1px solid ${BORDER}`,padding:"20px 14px",display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
            <div style={{fontSize:10,letterSpacing:3,color:TEXT2,textTransform:"uppercase"}}>{ch}</div>
            <div style={S.cinzel(26,GOLD2,700)}>{vals[ch]}</div>
            <div style={{fontSize:9,letterSpacing:1,color:TEXT3}}>%</div>
            <input type="range" min={0} max={100} value={vals[ch]}
              onChange={e=>setVals(v=>({...v,[ch]:+e.target.value}))}
              style={{writingMode:"vertical-lr",direction:"rtl",width:6,height:140}}/>
            <div style={{width:"100%",height:4,background:BORDER,borderRadius:2,marginTop:4}}>
              <div style={{height:"100%",background:GOLD,borderRadius:2,width:`${vals[ch]}%`,transition:"width .1s"}}/>
            </div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:16}}>
        <Btn variant="ghost" onClick={()=>setVals({MUSIC:75,VOICE:60,SFX:50,MASTER:85})}>RESET LEVELS</Btn>
        <Btn variant="out">SAVE PRESET</Btn>
      </div>
    </div>
  );
}

function PageLegal({goTo}:{goTo:(n:number)=>void}) {
  const secs = [
    ["ACCEPTANCE OF TERMS","By accessing MandaStrong Studio, you agree to be bound by these Terms of Service. These constitute a legally binding agreement between you and MandaStrong Studio. If you do not agree, you must discontinue use immediately."],
    ["SERVICE DESCRIPTION","MandaStrong Studio provides cloud-based AI video editing and content creation tools including writing, voice, image, video, motion, and enhancement workstations. The service is provided as-is and we reserve the right to modify any aspect with reasonable notice."],
    ["USER ACCOUNTS & SUBSCRIPTIONS","You are responsible for maintaining confidentiality of your account credentials. Subscriptions bill monthly and auto-renew unless cancelled prior to the renewal date. Refunds are available within 30 days of initial purchase only."],
    ["INTELLECTUAL PROPERTY & CONTENT RIGHTS","Studio Plan subscribers receive full commercial rights. Basic and Pro plan subscribers receive personal use licenses. You retain full ownership of all original content you upload to the platform."],
    ["ACCEPTABLE USE POLICY","You agree not to create content that violates applicable laws, infringes IP rights, contains malicious code, promotes hate speech, or endangers minors."],
    ["PRIVACY & DATA PROTECTION","We collect and process data per our Privacy Policy. All content is encrypted at rest and in transit using industry-standard protocols. We do not sell personal data to third parties."],
    ["LIMITATION OF LIABILITY","TO THE MAXIMUM EXTENT PERMITTED BY LAW, MANDASTRONG STUDIO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES."],
    ["SOCIAL MISSION","MandaStrong Studio supports anti-bullying education and veterans mental health services. A portion of all revenue is donated to these causes."],
    ["CONTACT & SUPPORT","Contact us via MandaStrong1.Etsy.com or use Agent Grok available 24/7 within the application. For billing, reference your Stripe receipt directly."],
    ["DISCLAIMER — NO WARRANTIES","MandaStrong Studio is provided 'as is' without warranties of any kind. We do not warrant the service will be error-free or uninterrupted. Use of AI-generated content is at your sole discretion."],
    ["AI-GENERATED CONTENT","Content produced using our AI tools is generated algorithmically. Users are solely responsible for reviewing all AI-generated content prior to use or distribution."],
    ["THIRD-PARTY SERVICES","The platform integrates with third-party services including Stripe, YouTube, and others. MandaStrong Studio is not responsible for third-party policies or actions."],
  ];
  return (
    <div style={{maxWidth:1000,margin:"0 auto",padding:"28px 20px 60px"}}>
      <div style={{fontSize:9,letterSpacing:5,color:GOLDDIM,marginBottom:6,fontFamily:"'Cinzel',serif",textTransform:"uppercase"}}>Legal</div>
      <div style={S.cinzel(24,GOLD2)}>TERMS OF SERVICE & DISCLAIMER</div>
      <div style={{fontSize:9,letterSpacing:3,color:TEXT3,margin:"8px 0 24px"}}>LAST UPDATED: FEBRUARY 2026</div>
      {secs.map(([t,tx])=>(
        <div key={t} style={{marginBottom:22}}>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:3,color:GOLD,marginBottom:8,paddingBottom:4,borderBottom:`1px solid ${BORDER}`,textTransform:"uppercase"}}>{t}</div>
          <div style={{fontSize:12,lineHeight:1.8,color:TEXT2}}>{tx}</div>
        </div>
      ))}
      <div style={{height:1,background:`linear-gradient(90deg,transparent,${GOLDDIM},transparent)`,margin:"24px 0"}}/>
      <div style={{textAlign:"center",padding:"12px 0"}}>
        <Btn variant="gold" onClick={()=>goTo(4)}>ACCEPT TERMS & ENTER</Btn>
      </div>
    </div>
  );
}

function PageDistribution({goTo}:{goTo:(n:number)=>void}) {
  const socials = [["📺","YouTube"],["📸","Instagram"],["🎵","TikTok"],["𝕏","Twitter"],["📘","Facebook"],["💼","LinkedIn"],["🌐","Vimeo"],["🎬","Dailymotion"]];
  return (
    <div style={{maxWidth:1000,margin:"0 auto",padding:"28px 20px 60px"}}>
      <div style={{fontSize:9,letterSpacing:5,color:GOLDDIM,marginBottom:6,fontFamily:"'Cinzel',serif",textTransform:"uppercase"}}>Distribution</div>
      <div style={S.cinzel(24,GOLD2)}>EXPORT & DISTRIBUTE</div>
      <div style={{background:BG3,border:`1px solid ${BORDER}`,padding:16,margin:"16px 0",textAlign:"center",fontSize:12,color:TEXT2}}>
        No film rendered yet — <span style={{color:GOLD,cursor:"pointer"}} onClick={()=>goTo(14)}>go to Render Engine →</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,margin:"20px 0"}}>
        {[["⬇️","Download to Device"],["💾","Save Project File"],["🌐","Share to Community Hub"]].map(([ic,lbl])=>(
          <div key={lbl} onClick={()=>lbl.includes("Community")&&goTo(20)} style={{background:BG3,border:`1px solid ${BORDER}`,padding:20,textAlign:"center",cursor:"pointer"}}>
            <div style={{fontSize:28,marginBottom:8}}>{ic}</div>
            <div style={{fontSize:10,letterSpacing:2,color:TEXT2,textTransform:"uppercase"}}>{lbl}</div>
          </div>
        ))}
      </div>
      <div style={{height:1,background:`linear-gradient(90deg,transparent,${GOLDDIM},transparent)`,margin:"24px 0"}}/>
      <div style={S.cinzel(12,GOLD,400)}>DIRECT PLATFORM UPLOAD</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))",gap:10,marginTop:14}}>
        {socials.map(([ic,nm])=>(
          <div key={nm} style={{background:BG3,border:`1px solid ${BORDER}`,padding:12,textAlign:"center",cursor:"pointer"}}>
            <div style={{fontSize:20,marginBottom:5}}>{ic}</div>
            <div style={{fontSize:9,letterSpacing:2,color:TEXT2,textTransform:"uppercase"}}>{nm}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PageTutorials() {
  const tuts = [
    ["Getting Started — Platform Overview","5:30","b"],
    ["Importing & Managing Media Assets","8:15","b"],
    ["Multi-Track Timeline Editing","12:45","i"],
    ["AI Tools — 600+ Features Explained","18:20","i"],
    ["Professional Color Grading with AI","22:00","a"],
    ["Audio Mixing & Sound Design","15:10","i"],
    ["AI Enhancement Studio Deep Dive","20:30","a"],
    ["Render Settings & Export Optimization","8:15","b"],
  ];
  const colors:any = {b:{c:"#27ae60",label:"BEGINNER"},i:{c:"#e67e22",label:"INTERMEDIATE"},a:{c:"#c0392b",label:"ADVANCED"}};
  return (
    <div style={{maxWidth:1000,margin:"0 auto",padding:"28px 20px 60px"}}>
      <div style={{fontSize:9,letterSpacing:5,color:GOLDDIM,marginBottom:6,fontFamily:"'Cinzel',serif",textTransform:"uppercase"}}>Learning Center</div>
      <div style={S.cinzel(24,GOLD2)}>TUTORIALS</div>
      <div style={{marginTop:20}}>
        {tuts.map(([title,dur,lvl],i)=>(
          <div key={title} style={{background:BG3,border:`1px solid ${BORDER}`,padding:"16px 20px",display:"flex",alignItems:"center",gap:16,cursor:"pointer",marginBottom:10}}>
            <div style={{...S.cinzel(22,GOLDDIM),minWidth:44}}>0{i+1}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:600,letterSpacing:1,color:TEXT,marginBottom:3}}>{title}</div>
              <div style={{fontSize:10,letterSpacing:2,color:TEXT3}}>{dur} &nbsp;•&nbsp; Opens on YouTube</div>
            </div>
            <div style={{fontSize:8,letterSpacing:2,padding:"3px 8px",fontWeight:700,border:`1px solid ${colors[lvl].c}`,color:colors[lvl].c,textTransform:"uppercase"}}>{colors[lvl].label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PageUpload({assets,setAssets}:{assets:any[],setAssets:(a:any[])=>void}) {
  function handleFiles(files:FileList|null) {
    if(!files) return;
    const newAssets = [...assets, ...Array.from(files).map(f=>({name:f.name,type:f.type,icon:f.type.startsWith("video")?"🎬":f.type.startsWith("audio")?"🎵":"🖼️",size:Math.round(f.size/1024)+"KB"}))];
    setAssets(newAssets);
  }
  return (
    <div style={{maxWidth:1000,margin:"0 auto",padding:"28px 20px 60px"}}>
      <div style={{fontSize:9,letterSpacing:5,color:GOLDDIM,marginBottom:6,fontFamily:"'Cinzel',serif",textTransform:"uppercase"}}>Asset Ingestion</div>
      <div style={S.cinzel(24,GOLD2)}>UPLOAD MEDIA</div>
      <div style={{fontSize:13,color:TEXT2,letterSpacing:1,margin:"4px 0 24px"}}>{assets.length} ASSETS IN LIBRARY</div>
      <label style={{display:"block",border:`2px dashed ${GOLDDIM}`,padding:"48px 32px",textAlign:"center",cursor:"pointer",background:BG3}}>
        <input type="file" multiple accept="video/*,audio/*,image/*" style={{display:"none"}} onChange={e=>handleFiles(e.target.files)}/>
        <div style={{fontSize:40,marginBottom:12}}>🎬</div>
        <div style={S.cinzel(16,GOLD2)}>DRAG & DROP YOUR MEDIA HERE</div>
        <div style={{fontSize:11,letterSpacing:2,color:TEXT2,marginTop:6}}>Or click to browse · Video • Audio • Images</div>
      </label>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginTop:16}}>
        {[["📁","Browse Files"],["🖥️","Record Screen"],["🔗","Import from URL"]].map(([ic,lbl])=>(
          <div key={lbl} style={{background:BG3,border:`1px solid ${BORDER}`,padding:16,textAlign:"center",cursor:"pointer"}}>
            <div style={{fontSize:20,marginBottom:8}}>{ic}</div>
            <div style={{fontSize:10,letterSpacing:2,color:TEXT2,textTransform:"uppercase"}}>{lbl}</div>
          </div>
        ))}
      </div>
      {assets.length>0 && (
        <div style={{marginTop:24}}>
          <div style={{height:1,background:`linear-gradient(90deg,transparent,${GOLDDIM},transparent)`,margin:"16px 0"}}/>
          <div style={{...S.cinzel(11,GOLD),marginBottom:12}}>{assets.length} ASSETS IN LIBRARY</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(90px,1fr))",gap:8}}>
            {assets.map((a:any,i:number)=>(
              <div key={i} style={{background:BG3,border:`1px solid ${BORDER}`,aspectRatio:"1",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,fontSize:24,position:"relative"}}>
                {a.icon}
                <div style={{fontSize:9,color:TEXT3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",width:"80%",textAlign:"center"}}>{a.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PageTimeline({assets,goTo}:{assets:any[],goTo:(n:number)=>void}) {
  return (
    <div>
      <div style={{background:BG2,borderBottom:`1px solid ${BORDER}`,padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={S.cinzel(18,GOLD2)}>TIMELINE EDITOR</div>
        <div style={{fontSize:14,letterSpacing:3,color:TEXT2}}>90 MIN PROJECT</div>
      </div>
      <div style={{padding:20}}>
        {assets.length===0 ? (
          <div style={{background:BG3,border:`1px solid ${BORDER}`,padding:20,textAlign:"center",marginBottom:16}}>
            <div style={{fontSize:14,letterSpacing:2,color:TEXT3,marginBottom:10}}>No media uploaded yet</div>
            <Btn variant="out" onClick={()=>goTo(10)} style={{fontSize:11}}>▲ UPLOAD MEDIA</Btn>
          </div>
        ) : (
          <div style={{background:BG3,border:`1px solid ${BORDER}`,padding:16,marginBottom:16}}>
            <div style={{...S.cinzel(16,GOLD),marginBottom:10}}>MEDIA POOL</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(80px,1fr))",gap:8}}>
              {assets.map((a:any,i:number)=>(
                <div key={i} style={{background:BG,border:`1px solid ${BORDER}`,aspectRatio:"1",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontSize:24,gap:4}}>
                  {a.icon}
                  <div style={{fontSize:8,color:TEXT3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",width:"90%",textAlign:"center"}}>{a.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {[["VIDEO TRACK","DROP VIDEO CLIPS HERE"],["AUDIO TRACK","DROP AUDIO CLIPS HERE"],["TEXT / TITLES","DROP TEXT CLIPS HERE"]].map(([lbl,hint])=>(
          <div key={lbl}>
            <div style={{fontSize:18,fontWeight:700,letterSpacing:3,color:TEXT2,textTransform:"uppercase",marginBottom:6}}>{lbl}</div>
            <div style={{background:BG3,border:`1px solid ${BORDER}`,minHeight:64,padding:12,display:"flex",alignItems:"center",marginBottom:10}}>
              <span style={{fontSize:15,letterSpacing:2,color:TEXT3}}>{hint}</span>
            </div>
          </div>
        ))}
        <div style={{display:"flex",gap:10,marginTop:16}}>
          <Btn variant="gold">→ RENDER</Btn>
          <Btn variant="ghost">CLEAR ALL</Btn>
        </div>
      </div>
    </div>
  );
}

function PageNeural({goTo}:{goTo:(n:number)=>void}) {
  const [active, setActive] = useState(ENH[0]);
  const [vals, setVals] = useState({intensity:75,clarity:80,color:70,brightness:65});
  return (
    <div style={{display:"grid",gridTemplateColumns:"260px 1fr"}}>
      <div style={{background:BG2,borderRight:`1px solid ${BORDER}`,overflowY:"auto",maxHeight:"calc(100vh - 140px)"}}>
        {ENH.map(t=>(
          <div key={t} onClick={()=>setActive(t)} style={{padding:"9px 14px",borderBottom:`1px solid ${BORDER}`,fontSize:12,color:t===active?GOLD:TEXT2,cursor:"pointer",background:t===active?BG3:"transparent",borderLeft:t===active?`2px solid ${GOLD}`:"2px solid transparent",paddingLeft:t===active?12:14,transition:"all .2s"}}>{t}</div>
        ))}
      </div>
      <div style={{padding:24}}>
        <div style={S.cinzel(18,GOLD2)}>{active}</div>
        <div style={{fontSize:12,color:TEXT2,margin:"8px 0 20px",lineHeight:1.7}}>Apply AI-powered <strong>{active}</strong> to your footage. Adjust parameters below and click Apply Enhancement.</div>
        {(["intensity","clarity","color","brightness"] as const).map(k=>(
          <div key={k} style={{marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,letterSpacing:2,color:TEXT2,marginBottom:6}}>
              <span style={{textTransform:"capitalize"}}>{k}</span>
              <span style={{color:GOLD,fontWeight:700}}>{vals[k]}%</span>
            </div>
            <input type="range" min={0} max={100} value={vals[k]} onChange={e=>setVals(v=>({...v,[k]:+e.target.value}))}/>
          </div>
        ))}
        <div style={{display:"flex",gap:10,marginTop:24}}>
          <Btn variant="gold">APPLY ENHANCEMENT</Btn>
          <Btn variant="ghost" onClick={()=>setVals({intensity:75,clarity:80,color:70,brightness:65})}>RESET</Btn>
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState(0);
  const [aiTool, setAiTool] = useState("");
  const [assets, setAssets] = useState<any[]>([]);
  const TOTAL = 21;

  useEffect(()=>{
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    return ()=>document.head.removeChild(style);
  },[]);

  function goTo(n:number){setPage(Math.max(0,Math.min(TOTAL-1,n)));setAiTool("");}

  function wsPage(tools:string[], title:string, pg:number) {
    return (
      <div>
        <WsHeader page={pg} title={title} count={tools.length} goTo={goTo}/>
        <ToolGrid tools={tools} onAI={setAiTool}/>
      </div>
    );
  }

  const PAGES = [
    <PageHome goTo={goTo}/>,
    <PageAbout/>,
    <PageShowcase goTo={goTo}/>,
    <PagePlans goTo={goTo}/>,
    wsPage(WRI,"AI WORKSTATION 02 — WRITING TOOLS",4),
    wsPage(VOI,"AI WORKSTATION 03 — VOICE TOOLS",5),
    wsPage(IMA,"AI WORKSTATION 04 — IMAGE TOOLS",6),
    wsPage(VID,"AI WORKSTATION 05 — VIDEO TOOLS",7),
    wsPage(MOT,"AI WORKSTATION 06 — MOTION TOOLS",8),
    wsPage(ENH,"AI WORKSTATION 07 — ENHANCEMENT TOOLS",9),
    <PageUpload assets={assets} setAssets={setAssets}/>,
    <PageTimeline assets={assets} goTo={goTo}/>,
    <PageNeural goTo={goTo}/>,
    <PageMixer/>,
    <PageRender assets={assets}/>,
    <PagePreview/>,
    <PageDistribution goTo={goTo}/>,
    <PageTutorials/>,
    <PageLegal goTo={goTo}/>,
    <AgentGrok/>,
    <PageCommunity goTo={goTo}/>,
  ];

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:BG,color:TEXT,fontFamily:"'Rajdhani',sans-serif",position:"relative"}}>
      {/* SCANLINE */}
      <div style={{position:"fixed",inset:0,background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.05) 2px,rgba(0,0,0,.05) 4px)",pointerEvents:"none",zIndex:9999}}/>

      {/* HEADER */}
      <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 16px",background:BG2,borderBottom:`1px solid ${GOLDDIM}`,flexShrink:0,position:"relative",zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:34,height:34,border:`2px solid ${GOLD}`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Cinzel',serif",fontSize:16,fontWeight:900,color:GOLD,flexShrink:0}}>G</div>
          <div style={{fontFamily:"'Cinzel',serif",lineHeight:1.4}}>
            <div style={{fontSize:9,letterSpacing:3,color:GOLDDIM}}>Cinema Intelligence Platform — Est. 2026</div>
            <div style={{fontSize:16,fontWeight:900,letterSpacing:5,color:GOLD2}}>MANDA STRONG STUDIO</div>
            <div style={{fontSize:9,letterSpacing:2,color:TEXT2}}>600+ AI Tools &nbsp;•&nbsp; 8K Export &nbsp;•&nbsp; Up to 3-Hour Films</div>
          </div>
        </div>
        <div style={{textAlign:"right",fontSize:9,letterSpacing:2,color:TEXT2,lineHeight:1.8}}>
          <div>The All-In-One Professional AI Movie Creation Platform</div>
          <div>🎬 Special Offer: New Studio Plan Subscribers Receive 7-Day Free Trial</div>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:2}}>
            <button onClick={()=>goTo(4)} style={{...S.btn("out"),fontSize:9,padding:"3px 10px"}}>START CREATING</button>
            <button onClick={()=>goTo(3)} style={{...S.btn("out"),fontSize:9,padding:"3px 10px"}}>LOGIN / REGISTER</button>
          </div>
          <div><span style={{color:"#2ecc71",fontWeight:700}}>● SYSTEM ONLINE</span> &nbsp; BUILD 2026.03.05</div>
        </div>
      </header>

      {/* PAGE */}
      <div style={{flex:1,overflowY:"auto",overflowX:"hidden",position:"relative"}}>
        {PAGES[page]}
      </div>

      {/* FOOTER */}
      <footer style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"7px 16px",background:BG2,borderTop:`1px solid ${GOLDDIM}`,flexShrink:0,fontSize:9,letterSpacing:2,color:TEXT3,position:"relative",zIndex:10}}>
        <div>MANDASTRONG STUDIO 2026 &nbsp;•&nbsp; PROFESSIONAL CINEMA SYNTHESIS &nbsp;•&nbsp; MandaStrong1.Etsy.com</div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <button onClick={()=>goTo(page-1)} style={{...S.btn("out"),fontSize:11,padding:"5px 14px"}}>◀ BACK</button>
          <span style={{fontSize:10,letterSpacing:2,color:TEXT3}}>PAGE {page+1} / {TOTAL}</span>
          <button onClick={()=>goTo(page+1)} style={{...S.btn("out"),fontSize:11,padding:"5px 14px"}}>NEXT ▶</button>
        </div>
        <div style={{color:"#2ecc71"}}>⬤ AUTOSAVE ON</div>
      </footer>

      {/* AI PANEL */}
      {aiTool && <AIPanel tool={aiTool} onClose={()=>setAiTool("")}/>}
    </div>
  );
}