import { useState, useEffect, useRef } from "react";

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
const ADMIN_EMAIL = "woolleya129@gmail.com";
const ADMIN_PASS = "Mangler1970!!";
const API_KEY = "YOUR_ANTHROPIC_API_KEY_HERE"; // ← PASTE YOUR KEY HERE

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Courier+Prime&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
html,body,#root{height:100%;background:#070707;color:#e8e4dc;font-family:'Rajdhani',sans-serif;}
::-webkit-scrollbar{width:4px;height:4px;}
::-webkit-scrollbar-track{background:#070707;}
::-webkit-scrollbar-thumb{background:#8a6d22;border-radius:2px;}
input,textarea,select{font-family:'Rajdhani',sans-serif;background:#181818;border:1px solid #2a2a2a;color:#e8e4dc;padding:8px 12px;font-size:13px;width:100%;}
input:focus,textarea:focus,select:focus{outline:none;border-color:#8a6d22;}
input::placeholder,textarea::placeholder{color:#666666;}
.drag-over{background:rgba(212,168,71,.15)!important;border-color:#d4a847!important;}
`;

const WRI = ["Script to Movie","Text to Script","Script to Screenplay","Prompt to Story","Story to Script","Text to Dialogue","Dialogue Generator","Scene Writer","Plot Generator","Story Outline","Script Formatter","Logline Generator","Synopsis Writer","Treatment Writer","Beat Sheet Builder","Character Bio Writer","Character Arc Builder","Subplot Generator","Plot Twist Generator","Opening Hook Creator","Climax Designer","Three Act Structure","Five Act Structure","Documentary Script","Short Film Script","Feature Film Script","TV Pilot Script","Commercial Script","Explainer Script","Narration Writer","Voiceover Script","Interview Script","Podcast Script","YouTube Script","Social Media Script","Action Line Writer","Scene Heading Tool","Parenthetical Generator","Dialogue Tightener","Script Timer","Word Counter","Page Counter","Reading Time Estimator","Format Checker","Grammar Polish","Spell Checker","Continuity Checker","Plot Hole Detector","Tone Checker","Genre Analyzer","Pacing Analyzer","Readability Meter","Engagement Scorer","Originality Scorer","Theme Generator","Conflict Builder","Backstory Generator","World Builder","Name Generator","Location Finder","Prop List Generator","Costume Designer","Research Helper","Fact Checker","Pitch Deck Builder","Coverage Writer","Version Control","Revision Tracker","Collab Hub","Story Outliner","Character Mapper","Emotional Arc Map","Story Arc Map","Flashback Creator","Foreshadowing Tool","MacGuffin Creator","Trope Finder","Cliche Detector","POV Analyzer","Tense Checker","Scene Analyzer","Mythology Builder","Quest Designer","Story Consultant","Inciting Incident Finder","Midpoint Architect","Character Interview","Scene Setting Engine","Prophecy Creator","History Timeline","Geography Mapper","Economy Builder","Culture Creator","Plot Tension Engine","Character Voice Lab","Sprint Timer","Pitch Writer","Tagline Generator"];
const VOI = ["Upload Own Voice","Record My Voice","Clone My Voice","Text to Speech","Text to Voice","Text to Narration","Text to Audiobook","Text to Voiceover","Voice Cloning","Voice to Voice","AI Voice Actor","Neural Voice Generator","Emotion Voice Synth","Trailer Voice Generator","Documentary Voice","Commercial Voice","News Anchor Voice","Character Voice Creator","Accent Generator","Multi Language Voice","Voice Translator","Lip Sync AI","Dialogue Synth","Audiobook Creator","Podcast Voice","Radio DJ Voice","Sports Commentary Voice","Meditation Voice","ASMR Creator","Whisper Generator","Deep Voice Generator","Robot Voice","Alien Voice","Monster Voice","Child Voice","Elderly Voice","Male to Female Voice","Female to Male Voice","Speed Controller","Pitch Controller","Tone Adjuster","Volume Normalizer","Clarity Booster","Voice Denoiser","Echo Remover","Reverb Remover","Background Noise Remover","Voice EQ Studio","De-Esser","Pop Filter Sim","Noise Gate","Compression Tool","Reverb Voice FX","Echo Voice FX","Chorus FX","Phone Effect","Radio Effect","Megaphone Effect","Lo-Fi Voice","Distortion FX","Warmth Adder","Brightness Mixer","Richness Amplifier","Resonance Tuner","Dynamic Range Engine","Vocal Enhancer","Voice Consistency Checker","Narrator Optimizer","Breathing Remover","Room Tone Match","Studio Grade Clarity","Voice Recorder","Voice Timer","Voice Health Monitor","Multi Voice Generator","Voice Mixer","Voice Layering","Choir Generator","Crowd Voice","Baby Voice","Singing Voice","Rap Voice Generator","Spoken Word Generator","Voice to Text","Voice Transcriber","Subtitle from Voice","Caption Generator","Voice Style Transfer","Celebrity Voice Match","Smooth Voice Filter","Texture Designer","Projection Booster","Volume Expander","Timbre Modifier","Voice Warm-up","Posture Guide"];
const IMA = ["Text to Image","Prompt to Image","Image to Image","Image Upscaler","Image Generator","AI Art Generator","Photo to Painting","Sketch to Image","Wireframe to Image","Background Generator","Background Remover","Sky Replacer","Object Remover","Face Generator","Character Design","Portrait Generator","Avatar Creator","Product Image Generator","Architecture Visualizer","Interior Design Generator","Landscape Generator","Abstract Art Generator","Logo Generator","Icon Creator","Texture Generator","Pattern Maker","Color Palette Generator","Style Transfer","Photo Enhancer","Photo Restorer","Old Photo Colorizer","Black & White to Color","Image Denoiser","Sharpness Enhancer","Clarity Booster","Detail Enhancer","HDR Image Creator","Exposure Fixer","White Balance AI","Color Grading Studio","LUT Creator","Tone Mapper","Contrast Adjuster","Brightness Tool","Saturation Engine","Hue Shift","Temperature Control","Vignette Tool","Bokeh Generator","Depth of Field","Film Grain Synth","Light Leaks","Lens Flare","God Rays","Volumetric Light","Golden Hour FX","Blue Hour FX","Sunset FX","Sunrise FX","Moonlight FX","Neon Light","Fire Light","Candle Light","Studio Light","3 Point Light","Rim Light","Shadow Generator","Highlight Creator","Ambient Occlusion","Global Illumination","Panorama Stitcher","360 Image Creator","Fisheye Corrector","Lens Distorter","Chromatic Aberration","Motion Blur","Radial Blur","Zoom Blur","Gaussian Blur","Weather FX","Rain Effect","Snow Effect","Fog Generator","Smoke FX","Fire Creator","Explosion FX","Lightning FX","Aurora Effect","Rainbow Creator","Caustics Engine","Prop Creator","Scene Compositor","Lighting Designer","Cloud Generator","Dehaze Engine"];
const VID = ["Text to Video","Prompt to Video","Image to Video","Script to Video","Story to Video","AI Movie Creator","AI Film Maker","AI Video Generator","Scene Generator","Shot Generator","Video Upscaler 4K","Video Upscaler 8K","Frame Rate Booster","60FPS Converter","Slow Motion Generator","Time Lapse Creator","Speed Ramp Engine","Video Extender","Video Stabilizer","Background Remover","Green Screen Replacer","Sky Replacer Video","Object Remover Video","Watermark Remover","Video Denoiser","Video Sharpener","Color Grading Pro","Film Look Generator","Cinematic LUT","Black & White Film","Film Restorer","Old Film Effect","VHS Effect","Glitch Effect","Hologram Effect","Drone Shot Generator","Aerial View Creator","Tracking Shot","Dolly Zoom","Whip Pan","Time Freeze","Bullet Time Effect","Matrix Effect","Clone Effect","Face Swap Video","Deepfake Detector","Age Progression Video","De-Aging Video","Talking Head Generator","Avatar Video Creator","Virtual Presenter","AI News Anchor","Lip Sync Video","Mouth Animation","Eye Contact Correction","Head Pose Correction","Video Translator","Subtitle Generator","Caption Burner","Auto Subtitles","Video Loop Creator","Boomerang Effect","Reverse Video","Mirror Effect","Split Screen Creator","Picture in Picture","Video Collage","Slideshow Maker","Transition Generator","Intro Maker","Outro Maker","Lower Third Generator","Title Card Creator","End Screen Maker","Thumbnail Generator","Cover Frame Selector","Video Compressor","Format Converter","Resolution Changer","Crop & Resize","Video Trimmer","Scene Cutter","Auto Edit","Jump Cut Generator","Beat Sync Editor","Highlight Reel Maker","Recap Generator","Trailer Maker","Teaser Creator","Sizzle Reel"];
const MOT = ["Text to Animation","Prompt to Motion","Image to Animation","2D to 3D Animation","Character Animation","Facial Animation","Body Motion Capture","Hand Animation","Lip Sync Animation","Eye Blink Animation","Crowd Animation","Animal Animation","VFX Generator","Particle Effect Generator","Explosion Generator","Fire Animation","Smoke Animation","Water Simulation","Rain Animation","Snow Animation","Lightning FX","Magic Effect","Energy Beam","Portal Effect","Teleportation FX","Force Field","Shockwave Creator","Laser Effect","Plasma Effect","Hologram Animation","Glitch FX","Invisibility Effect","Morphing Effect","Liquid Metal","Shape Shifting","Disintegration FX","Physics Simulator","Gravity Simulator","Cloth Dynamics","Hair Simulator","Fur Dynamics","Rigid Body Physics","Soft Body Physics","Fluid Dynamics","Rope Physics","Chain Dynamic","Destruction Simulator","Fracture System","Debris Generator","Dust Effect","Spark Generator","Motion Tracker","Camera Tracker","Object Tracker","Face Tracker","Stabilizer","Speed Lines","Zoom Blur Motion","Motion Trail","Echo Effect","Ghost Effect","Freeze Frame","Slow Motion FX","Hyperspeed Effect","Time Warp","Strobe Effect","Keyframe Animator","Ease In / Ease Out","Bounce Effect","Elastic Motion","Spring System","Path Animator","Orbit Animation","Rotation Loop","Float Animation","Pendulum Motion","Screen Shake","Camera Shake","Handheld Camera FX","Cinematic Push In","Ken Burns Effect","Parallax Effect","3D Camera Move","Dolly In Animation","Crane Move","Tilt Shift Animation","Cartoon Animation","Stop Motion Style","Claymation Effect","Puppet Rig","IK Rig Builder","Skeleton Animator","Mocap Solver","Facial Rigging","Muscle System","Skin Deformer"];
const ENH = ["AI 8K Upscaling","AI 4K Upscaling","Video Super Resolution","Frame Interpolation","Video Denoiser","Noise Reduction","Grain Remover","Artifact Remover","Scratch Remover","Video Sharpener","Clarity Booster","Detail Enhancer","Edge Enhancement","Texture Boost","Color Correction","Auto Color Balance","White Balance AI","Color Match Pro","Color Grading AI","Cinematic Color Grade","Film Stock Emulation","LUT Generator","Tone Mapping Pro","HDR Enhancement","Deep HDR Boost","Dynamic Range Expansion","Shadow Recovery","Highlight Recovery","Highlight Rolloff","Black Point Calibration","Gamma Correction","Contrast Enhancer","Brightness Optimizer","Saturation Booster","Smart Saturation","Skin Tone Enhancer","Face Enhancement","Face Retouch","Eye Enhancer","Teeth Whitener","Background Enhancer","Sky Enhancer","Landscape Enhancer","Night Video Enhancer","Low Light Clarity","Motion Stabilization","Shake Remover","Rolling Shutter Fix","Flicker Reduction","Flicker Fixer","Lens Distortion Fix","Vignette Remover","Chromatic Aberration Fix","Moire Remover","De-Banding Pro","Anamorphic Correction","Audio Enhancer","Voice Clarity Booster","Dialogue Enhancer","Background Noise Remover","Echo Remover","Reverb Remover","Hum Remover","Wind Noise Remover","Breath Remover","Click & Pop Remover","Room Tone Match","Audio Normalization","Loudness Optimizer","Cinematic Grain","Film Grain Advanced","Halation Effect","Glow Synthesis","Bloom Control","Lens Flare Enhancer","Atmospheric Haze","Light Wrap","Depth of Field Enhancement","Bokeh Enhancer","Focus Puller","Optical Flow Smooth","Temporal Denoise","Motion Blur Add","Sky Replacement","Background Replacement","Object Removal","Watermark Remover","Subtitles Enhancer","Burned Caption Fix","Frame Rate Fix","Sync Fix","Audio Drift Fix","Quality Optimizer","File Size Optimizer","Codec Converter","Format Enhancer","Master Exporter"];

const WS_TABS = [{l:"WRI",p:4},{l:"VOI",p:5},{l:"IMA",p:6},{l:"VID",p:7},{l:"MOT",p:8},{l:"ENH",p:9}];
const PLANS = [
  {name:"CREATOR",price:"$20",features:["HD Export 1080p","100 AI Tools","10GB Storage","Email Support","Basic Timeline"],stripe:"https://buy.stripe.com/4gM5kFaVYfjN7EX0vMafS00",popular:false},
  {name:"PRO",price:"$30",features:["4K Export","300 AI Tools","100GB Storage","Priority Support","Full Timeline","Commercial License"],stripe:"https://buy.stripe.com/14A00l8NQ0oTbVd3HYafS01",popular:true},
  {name:"STUDIO",price:"$50",features:["8K Export","600+ AI Tools","1TB Storage","24/7 Support","Full Rights","API Access","7-Day Free Trial ✦"],stripe:"https://buy.stripe.com/fZubJ35BE3B53oHdiyafS02",popular:false}
];

const S = {
  btn:(v:"gold"|"out"|"ghost")=>({display:"inline-flex" as const,alignItems:"center" as const,gap:6,fontFamily:"'Rajdhani',sans-serif",fontSize:11,fontWeight:700,letterSpacing:3,textTransform:"uppercase" as const,padding:"8px 20px",cursor:"pointer",border:"none",transition:"all .2s",...(v==="gold"?{background:GOLD,color:"#000"}:v==="out"?{background:"transparent",color:GOLD,border:`1px solid ${GOLDDIM}`}:{background:"transparent",color:TEXT2,border:`1px solid ${BORDER2}`})}),
  cinzel:(size:number,color=GOLD2,weight=700)=>({fontFamily:"'Cinzel',serif",fontSize:size,fontWeight:weight,color,letterSpacing:3}),
};

function Btn({children,onClick,variant="out",style={}}:{children:any,onClick?:()=>void,variant?:"gold"|"out"|"ghost",style?:any}){return <button style={{...S.btn(variant),...style}} onClick={onClick}>{children}</button>;}

function WsTabs({active,goTo}:{active:number,goTo:(n:number)=>void}){return(<div style={{display:"flex",gap:2}}>{WS_TABS.map(t=>(<button key={t.l} onClick={()=>goTo(t.p)} style={{fontFamily:"'Rajdhani',sans-serif",fontSize:10,letterSpacing:2,fontWeight:700,padding:"5px 10px",cursor:"pointer",background:t.p===active?BG:BG3,color:t.p===active?GOLD:TEXT3,border:`1px solid ${t.p===active?GOLDDIM:BORDER}`,borderBottom:"none",transition:"all .2s"}}>{t.l}</button>))}</div>);}

function PlayControls(){const pb=(icon:string,primary=false)=>(<button style={{width:40,height:40,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:primary?20:16,cursor:"pointer",border:primary?"none":`1px solid ${BORDER}`,background:primary?GOLD:BG4,color:primary?"#000":TEXT2}}>{icon}</button>);return(<div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,background:BG3,border:`1px solid ${BORDER}`,padding:16,margin:"16px 0"}}>{pb("⏮")}{pb("⏪")}{pb("▶",true)}{pb("⏸")}{pb("⏹")}<div style={{flex:1,height:3,background:BORDER,borderRadius:2}}><div style={{height:"100%",background:GOLD,borderRadius:2,width:"0%"}}/></div><span style={{fontSize:11,letterSpacing:2,color:TEXT2,fontFamily:"'Courier Prime',monospace"}}>00:00 / 90:00</span>{pb("⏩")}</div>);}

// AI PANEL
function AIPanel({tool,onClose,onAssetCreated}:{tool:string,onClose:()=>void,onAssetCreated:(a:any)=>void}){
  const [msgs,setMsgs]=useState<{role:string,text:string}[]>([{role:"think",text:`Ready to generate with ${tool}. Describe what you need and I will create it and save it to your Media Library.`}]);
  const [inp,setInp]=useState("");const [loading,setLoading]=useState(false);
  async function send(){
    if(!inp.trim())return;const msg=inp.trim();setInp("");
    setMsgs(m=>[...m,{role:"user",text:msg}]);setLoading(true);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":API_KEY,"anthropic-dangerous-direct-browser-access":"true"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,
          system:`You are an expert AI film production assistant inside MandaStrong Studio helping with the "${tool}" tool. Give practical, specific, professional guidance. When the user describes what they want to generate, confirm it will be created and saved to their Media Library.`,
          messages:[{role:"user",content:msg}]})});
      const data=await res.json();
      const reply=data.content?.[0]?.text||"No response.";
      setMsgs(m=>[...m,{role:"asst",text:reply}]);
      // Auto-save generated asset to Media Library
      const asset={id:Date.now()+Math.random(),name:`${tool.replace(/\s+/g,"_")}_${Date.now()}.mp4`,type:"video",size:"AI Generated",url:"",tool,prompt:msg,timestamp:new Date().toISOString(),aiGenerated:true};
      onAssetCreated(asset);
    }catch{setMsgs(m=>[...m,{role:"think",text:"Connection error. Please try again."}]);}
    setLoading(false);
  }
  return(
    <div style={{position:"fixed",right:0,top:0,bottom:0,width:420,background:BG2,borderLeft:`2px solid ${GOLDDIM}`,display:"flex",flexDirection:"column",zIndex:300}}>
      <div style={{padding:"14px 18px",borderBottom:`1px solid ${BORDER}`,display:"flex",alignItems:"center",justifyContent:"space-between",background:BG3}}>
        <div><div style={{fontSize:8,letterSpacing:3,color:GOLDDIM,fontFamily:"'Cinzel',serif"}}>AI GENERATION PANEL</div><span style={{...S.cinzel(13)}}>✦ {tool.toUpperCase()}</span></div>
        <button onClick={onClose} style={{background:"none",border:`1px solid ${BORDER}`,color:TEXT2,padding:"4px 10px",cursor:"pointer",fontFamily:"'Rajdhani',sans-serif",fontSize:10,letterSpacing:2}}>✕ CLOSE</button>
      </div>
      <div style={{background:"rgba(212,168,71,.06)",borderBottom:`1px solid ${BORDER}`,padding:"8px 16px"}}>
        <div style={{fontSize:10,letterSpacing:2,color:GOLDDIM}}>✓ Generated assets auto-save to your Media Library</div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:10}}>
        {msgs.map((m,i)=>(<div key={i} style={{padding:"10px 14px",fontSize:12,lineHeight:1.7,background:m.role==="user"?BG3:m.role==="asst"?"rgba(26,82,118,.2)":"transparent",borderLeft:m.role==="user"?`2px solid ${GOLDDIM}`:m.role==="asst"?"2px solid #2980b9":"none",color:m.role==="asst"?"#aed6f1":m.role==="think"?TEXT3:TEXT,fontStyle:m.role==="think"?"italic":"normal"}}>{m.text}</div>))}
        {loading&&<div style={{fontSize:11,color:GOLDDIM,fontStyle:"italic",padding:8,display:"flex",alignItems:"center",gap:6}}><span>◉</span> Processing and saving to Media Library…</div>}
      </div>
      <div style={{padding:"12px 16px",borderTop:`1px solid ${BORDER}`,background:BG3}}>
        <div style={{display:"flex",gap:6}}>
          <textarea value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Describe what you want to generate… (Enter to send)" style={{flex:1,height:56,resize:"none" as const,padding:"8px 10px",fontSize:12}}/>
          <button onClick={send} style={{...S.btn("gold"),height:56,padding:"0 18px",fontSize:12}}>✦ GENERATE</button>
        </div>
      </div>
    </div>
  );
}

// AGENT GROK
function AgentGrok(){
  const [msgs,setMsgs]=useState<{role:string,content:string}[]>([]);
  const [inp,setInp]=useState("");const [loading,setLoading]=useState(false);
  async function send(){
    if(!inp.trim())return;const msg=inp.trim();setInp("");
    const history=[...msgs,{role:"user",content:msg}];setMsgs(history);setLoading(true);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":API_KEY,"anthropic-dangerous-direct-browser-access":"true"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,
          system:"You are Agent Grok, the professional 24/7 AI production assistant for MandaStrong Studio — a premium cinematic AI platform. Respond with authority, precision and professionalism. Help creators with: media uploads (Page 10), AI tool generation (Pages 4–9), timeline editing (Page 12), enhancement studio (Page 13), audio mixing (Page 14), render engine (Page 15), preview (Page 16), export and distribution (Page 17), subscription plans and billing (Page 3), and community features (Page 21). Always reference specific page numbers. Be concise, expert-level, and encouraging.",
          messages:history.map(m=>({role:m.role,content:m.content}))})});
      const data=await res.json();
      setMsgs([...history,{role:"assistant",content:data.content?.[0]?.text||"I apologize — please try again."}]);
    }catch{setMsgs([...history,{role:"assistant",content:"Connection issue detected. Please check your network and try again."}]);}
    setLoading(false);
  }
  return(
    <div style={{maxWidth:700,margin:"0 auto",padding:"28px 20px"}}>
      <div style={{textAlign:"center",paddingBottom:20}}>
        <div style={{width:64,height:64,border:`2px solid ${GOLD}`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,margin:"0 auto 12px",background:BG3}}>🤖</div>
        <div style={S.cinzel(20,GOLD2)}>AGENT GROK</div>
        <div style={{fontSize:10,letterSpacing:3,color:TEXT3,marginTop:4}}>MANDASTRONG STUDIO &nbsp;•&nbsp; PROFESSIONAL PRODUCTION SUPPORT &nbsp;•&nbsp; <span style={{color:"#2ecc71"}}>● ONLINE</span></div>
        <div style={{fontSize:11,color:TEXT2,marginTop:6,letterSpacing:1}}>AI-Powered by Claude &nbsp;•&nbsp; Available 24 hours, 7 days a week</div>
      </div>
      <div style={{background:BG2,border:`1px solid ${BORDER}`,padding:14,minHeight:320,maxHeight:420,overflowY:"auto",display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>
        {msgs.length===0&&(
          <div style={{padding:"14px 16px",background:"rgba(26,82,118,.15)",borderLeft:"3px solid #2980b9",color:"#aed6f1",fontSize:13,lineHeight:1.8}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:2,color:"#2980b9",marginBottom:6}}>AGENT GROK — READY TO ASSIST</div>
            Good day, Creator. I am Agent Grok, your dedicated MandaStrong Studio production assistant. I have full knowledge of every platform feature, tool, and workflow. How may I assist your production today?
          </div>
        )}
        {msgs.map((m,i)=>(<div key={i} style={{padding:"12px 16px",fontSize:13,lineHeight:1.8,maxWidth:"94%",background:m.role==="user"?BG3:"rgba(26,82,118,.15)",borderLeft:m.role==="user"?`3px solid ${GOLDDIM}`:"3px solid #2980b9",color:m.role==="user"?TEXT:"#aed6f1",alignSelf:m.role==="user"?"flex-end":"flex-start"}}>
          {m.role==="assistant"&&<div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:2,color:"#2980b9",marginBottom:4}}>AGENT GROK</div>}
          {m.content}
        </div>))}
        {loading&&<div style={{fontSize:11,color:TEXT3,fontStyle:"italic",alignSelf:"center",letterSpacing:1}}>Agent Grok is processing your request…</div>}
      </div>
      <div style={{display:"flex",gap:8}}>
        <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")send();}} placeholder="Ask Agent Grok anything about MandaStrong Studio…" style={{flex:1,padding:"10px 14px",fontSize:13}}/>
        <button onClick={send} style={{...S.btn("gold"),padding:"10px 20px"}}>SEND ▶</button>
      </div>
    </div>
  );
}

// MAIN APP
export default function App() {
  const [page,setPage]=useState(0);
  const [aiTool,setAiTool]=useState("");
  const [isAdmin,setIsAdmin]=useState(true); // Amanda — permanent admin access
  const [mediaLibrary,setMediaLibrary]=useState<any[]>([]);
  const [timeline,setTimeline]=useState<{id:string,label:string,type:string,clips:any[]}[]>([
    {id:"vid1",label:"VIDEO TRACK 1",type:"video",clips:[]},
    {id:"aud1",label:"AUDIO TRACK 1",type:"audio",clips:[]},
    {id:"srt1",label:"SUBTITLE TRACK",type:"srt",clips:[]},
  ]);
  const [dragAsset,setDragAsset]=useState<any>(null);
  const [duration,setDuration]=useState(90);
  const [quality,setQuality]=useState("8K — 4320p");
  const [format,setFormat]=useState("MP4");
  const [renderedVideo,setRenderedVideo]=useState<any>(null);
  const [communityPosts,setCommunityPosts]=useState([
    {id:1,title:"Epic Action Feature",user:"Sarah J.",emoji:"🎬",likes:2847,comments:["Amazing work!","Loved the soundtrack"]},
    {id:2,title:"Family Documentary",user:"Mike Chen",emoji:"📹",likes:1256,comments:["So touching","Beautiful editing"]},
    {id:3,title:"Short Film Entry",user:"Emily R.",emoji:"🏆",likes:3421,comments:["Festival-worthy!"]},
    {id:4,title:"Music Video Cut",user:"Alex T.",emoji:"🎵",likes:5234,comments:["Fire 🔥","The cuts are perfect"]},
  ]);
  const [newComment,setNewComment]=useState<Record<number,string>>({});
  const fileInputRef=useRef<HTMLInputElement>(null);
  const communityFileRef=useRef<HTMLInputElement>(null);
  const TOTAL=23;

  useEffect(()=>{const s=document.createElement("style");s.textContent=css;document.head.appendChild(s);return()=>document.head.removeChild(s);},[]);
  function goTo(n:number){setPage(Math.max(0,Math.min(TOTAL-1,n)));setAiTool("");}

  function addAssetToLibrary(asset:any){
    setMediaLibrary(prev=>{
      const exists=prev.find(a=>a.id===asset.id);
      if(exists)return prev;
      return [...prev,asset];
    });
  }

  function handleFileUpload(e:React.ChangeEvent<HTMLInputElement>){
    const files=Array.from(e.target.files||[]);
    files.forEach(file=>{
      const url=URL.createObjectURL(file);
      addAssetToLibrary({id:Date.now()+Math.random(),name:file.name,type:file.type.startsWith("video")?"video":file.type.startsWith("audio")?"audio":"image",size:(file.size/1024/1024).toFixed(2)+"MB",url,timestamp:new Date().toISOString()});
    });
    if(fileInputRef.current)fileInputRef.current.value="";
  }

  function addTrack(type:"video"|"audio"|"srt"){
    const id=`${type}${Date.now()}`;
    const label=type==="video"?`VIDEO TRACK ${timeline.filter(t=>t.type==="video").length+1}`:type==="audio"?`AUDIO TRACK ${timeline.filter(t=>t.type==="audio").length+1}`:`SUBTITLE TRACK ${timeline.filter(t=>t.type==="srt").length+1}`;
    setTimeline(prev=>[...prev,{id,label,type,clips:[]}]);
  }

  function dropOnTrack(trackId:string){
    if(!dragAsset)return;
    setTimeline(prev=>prev.map(t=>t.id===trackId?{...t,clips:[...t.clips,{...dragAsset,clipId:Date.now()}]}:t));
    setDragAsset(null);
  }

  const NAV=["Home","About","Showcase","Plans","Writing","Voice","Image","Video","Motion","Enhancement","Upload Media","Editor Suite","Timeline","Enhance Studio","Mixer","Render","Preview","Export","Tutorials","Terms","Agent Grok","Community","That's All Folks"];
  const wsMap:Record<number,[string[],string]>={4:[WRI,"WRITING TOOLS"],5:[VOI,"VOICE TOOLS"],6:[IMA,"IMAGE TOOLS"],7:[VID,"VIDEO TOOLS"],8:[MOT,"MOTION TOOLS"],9:[ENH,"ENHANCEMENT TOOLS"]};

  const trackColors:Record<string,string>={video:GOLDDIM,audio:"#2980b9",srt:"#27ae60"};

  function renderPage(){
    // WORKSTATIONS 4-9
    if(wsMap[page]){
      const[tools,title]=wsMap[page];
      return <WorkstationPage key={page} tools={tools} title={title} page={page} goTo={goTo} onAI={setAiTool} addAsset={addAssetToLibrary} fileInputRef={fileInputRef}/>;
    }
    switch(page){
      case 0: return(
        <div style={{maxWidth:900,margin:"0 auto",padding:"60px 20px",textAlign:"center"}}>
          <div style={{fontSize:9,letterSpacing:5,color:GOLDDIM,marginBottom:8,fontFamily:"'Cinzel',serif"}}>Cinema Intelligence Platform — Est. 2026</div>
          <div style={{...S.cinzel(44,GOLD2,900),letterSpacing:8,lineHeight:1.1,marginBottom:12}}>MANDA STRONG<br/>STUDIO</div>
          <div style={{fontSize:12,letterSpacing:4,color:TEXT2,marginBottom:16}}>600+ AI TOOLS &nbsp;•&nbsp; 8K EXPORT &nbsp;•&nbsp; UP TO 3-HOUR FILMS</div>
          <div style={{background:`linear-gradient(90deg,transparent,rgba(212,168,71,.15),transparent)`,borderTop:`1px solid ${GOLDDIM}`,borderBottom:`1px solid ${GOLDDIM}`,padding:12,marginBottom:28,fontSize:12,letterSpacing:2,color:GOLD2}}>🎬 Special Offer: New Studio Plan Subscribers Receive 7-Day Free Trial</div>
          {/* QUICK ACCESS */}
          <div style={{background:BG3,border:`1px solid ${GOLDDIM}`,padding:20,marginBottom:32,textAlign:"left"}}>
            <div style={{...S.cinzel(11,GOLD),marginBottom:14,textAlign:"center"}}>⚡ QUICK ACCESS</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:8}}>
              {[{label:"AI TOOLS",icon:"🎬",p:4},{label:"UPLOAD MEDIA",icon:"📁",p:10},{label:"TIMELINE",icon:"⏱️",p:12},{label:"RENDER",icon:"⚡",p:15},{label:"EXPORT",icon:"🚀",p:17},{label:"AGENT GROK",icon:"🤖",p:20},{label:"COMMUNITY",icon:"🌍",p:21},{label:"SUBSCRIBE",icon:"💎",p:3}].map(q=>(
                <div key={q.label} onClick={()=>goTo(q.p)} style={{background:BG2,border:`1px solid ${BORDER}`,padding:"10px 8px",textAlign:"center",cursor:"pointer",transition:"all .2s"}} onMouseEnter={e=>(e.currentTarget.style.borderColor=GOLDDIM)} onMouseLeave={e=>(e.currentTarget.style.borderColor=BORDER)}>
                  <div style={{fontSize:18,marginBottom:4}}>{q.icon}</div>
                  <div style={{fontSize:9,letterSpacing:2,color:TEXT2,fontWeight:700}}>{q.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:32}}>
            <Btn variant="gold" onClick={()=>goTo(4)}>▶ START CREATING</Btn>
            <Btn variant="out" onClick={()=>goTo(3)}>LOGIN / SUBSCRIBE</Btn>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,maxWidth:500,margin:"0 auto"}}>
            {[["600+","AI Tools"],["8K","Cinema Export"],["3hrs","Max Duration"]].map(([n,l])=>(<div key={n} style={{background:BG3,border:`1px solid ${BORDER}`,padding:20,borderTop:`2px solid ${GOLDDIM}`}}><div style={S.cinzel(30,GOLD2,900)}>{n}</div><div style={{fontSize:10,letterSpacing:2,color:TEXT2,marginTop:4}}>{l}</div></div>))}
          </div>
        </div>
      );
      case 1: return(
        <div style={{maxWidth:1000,margin:"0 auto",padding:"28px 20px 60px"}}>
          <div style={{fontSize:9,letterSpacing:5,color:GOLDDIM,marginBottom:6,fontFamily:"'Cinzel',serif"}}>ABOUT THE PLATFORM</div>
          <div style={S.cinzel(24,GOLD2)}>MAKE AWESOME FAMILY MOVIES OR TURN YOUR DREAMS INTO REALITY</div>
          <div style={{fontSize:13,color:TEXT2,margin:"8px 0 32px",lineHeight:1.8}}>MandaStrong Studio combines the power of 600+ professional AI tools with an intuitive cinematic workspace — so anyone can create stunning short films, family videos, or feature-length productions up to 3 hours long. No film school required.</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,margin:"24px 0"}}>
            {[["600+","AI Tools"],["8K","Cinema Export"],["3 Hours","Max Duration"],["1TB","Storage"]].map(([n,l])=>(<div key={n} style={{background:BG3,border:`1px solid ${BORDER}`,padding:20,textAlign:"center",borderTop:`2px solid ${GOLDDIM}`}}><div style={S.cinzel(28,GOLD2,900)}>{n}</div><div style={{fontSize:10,letterSpacing:2,color:TEXT2,marginTop:4}}>{l}</div></div>))}
          </div>
        </div>
      );
      case 2: return(
        <div style={{maxWidth:1000,margin:"0 auto",padding:"28px 20px 60px"}}>
          <div style={{fontSize:9,letterSpacing:5,color:GOLDDIM,marginBottom:6,fontFamily:"'Cinzel',serif"}}>SHOWCASE</div>
          <div style={S.cinzel(24,GOLD2)}>EXAMPLES MADE BY MANDASTRONG STUDIO</div>
          {isAdmin&&<div style={{display:"inline-block",background:"#c0392b",color:"#fff",fontSize:8,letterSpacing:2,padding:"2px 8px",margin:"10px 0"}}>● ADMIN ACTIVE — UPLOAD ENABLED</div>}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,margin:"16px 0"}}>
            {[{n:"VIEWER 01",t:"HUMANITY OF AI",s:"A documentary film — MandaStrong Studio x Doxy"},{n:"VIEWER 02",t:"AI FOR DUMMIES",s:"A plain-English guide to artificial intelligence"}].map(v=>(
              <div key={v.n} style={{background:BG3,border:`1px solid ${BORDER}`,overflow:"hidden"}}>
                <div style={{background:"#000",aspectRatio:"16/9",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,borderBottom:`1px solid ${BORDER}`,cursor:"pointer"}}>🎬</div>
                <div style={{padding:12}}><div style={{fontSize:8,letterSpacing:3,color:TEXT3,marginBottom:3}}>{v.n}</div><div style={{fontSize:13,fontWeight:700,color:TEXT,marginBottom:3}}>{v.t}</div><div style={{fontSize:10,color:TEXT3,marginBottom:8}}>{v.s}</div>{isAdmin&&<div style={{border:`1px dashed ${GOLDDIM}`,padding:"8px 14px",fontSize:9,letterSpacing:3,color:GOLDDIM,textAlign:"center",cursor:"pointer"}}>▲ UPLOAD FILM</div>}</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:20}}><Btn variant="gold" onClick={()=>goTo(3)}>LOGIN / REGISTER</Btn></div>
        </div>
      );
      case 3: return(
        <div style={{maxWidth:1100,margin:"0 auto",padding:"28px 20px 60px"}}>
          <div style={{background:`linear-gradient(90deg,transparent,rgba(212,168,71,.12),transparent)`,border:`1px solid ${GOLDDIM}`,padding:"12px 20px",marginBottom:28,textAlign:"center",fontSize:12,letterSpacing:2,color:GOLD2}}>🎬 SPECIAL OFFER — All New Studio Plan Subscribers Receive a 7-Day Free Trial &nbsp;•&nbsp; NO CREDIT CARD REQUIRED</div>
          <div style={S.cinzel(24,GOLD2)}>LOGIN & SUBSCRIBE</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14,margin:"24px 0 36px"}}>
            <div style={{background:BG3,border:`1px solid ${BORDER}`,padding:24}}>
              <div style={S.cinzel(16,GOLD2)}>SIGN IN</div>
              <div style={{marginTop:16,display:"flex",flexDirection:"column",gap:10}}>
                <input id="login-email" placeholder="Email address" type="email"/>
                <input id="login-pass" placeholder="Password" type="password"/>
                <button onClick={()=>{
                  const e=(document.getElementById("login-email")as HTMLInputElement)?.value;
                  const p=(document.getElementById("login-pass")as HTMLInputElement)?.value;
                  if(e===ADMIN_EMAIL&&p===ADMIN_PASS){setIsAdmin(true);try{localStorage.setItem("ms_admin","1");}catch{}alert("Welcome back Amanda — Admin access granted!");}
                  else{alert("Welcome back!");}
                  goTo(4);
                }} style={{...S.btn("gold"),width:"100%",justifyContent:"center",marginTop:4}}>SIGN IN TO STUDIO</button>
              </div>
            </div>
            <div style={{background:BG3,border:`1px solid ${GOLDDIM}`,padding:24,position:"relative"}}>
              <div style={{position:"absolute",top:-10,left:20,background:GOLDDIM,padding:"2px 10px",fontSize:9,letterSpacing:2,color:"#000",fontWeight:700}}>7-DAY FREE TRIAL</div>
              <div style={S.cinzel(16,GOLD2)}>CREATE ACCOUNT</div>
              <div style={{marginTop:16,display:"flex",flexDirection:"column",gap:10}}>
                <input placeholder="Your name"/><input placeholder="Email address" type="email"/><input placeholder="Password" type="password"/>
                <button onClick={()=>goTo(4)} style={{...S.btn("gold"),width:"100%",justifyContent:"center",marginTop:4}}>START FREE TRIAL</button>
              </div>
            </div>
            <div style={{background:BG3,border:`1px solid ${BORDER}`,padding:24,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",gap:12}}>
              <div style={{fontSize:32}}>👁</div><div style={S.cinzel(14,GOLD2)}>EXPLORE FIRST</div>
              <div style={{fontSize:12,color:TEXT2,lineHeight:1.7}}>Browse all 600+ AI tools before committing.</div>
              <button onClick={()=>goTo(4)} style={{...S.btn("ghost"),marginTop:8}}>BROWSE AS GUEST</button>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
            {PLANS.map(p=>(<div key={p.name} style={{background:BG3,border:`1px solid ${p.popular?GOLDDIM:BORDER}`,padding:24,position:"relative",borderTop:`2px solid ${p.popular?GOLD:GOLDDIM}`}}>
              {p.popular&&<div style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:GOLDDIM,padding:"2px 10px",fontSize:9,letterSpacing:2,color:"#000",fontWeight:700,whiteSpace:"nowrap"}}>MOST POPULAR</div>}
              <div style={{fontSize:9,letterSpacing:4,color:TEXT3,marginBottom:4}}>{p.name} PLAN</div>
              <div style={{...S.cinzel(32,GOLD2,900),lineHeight:1}}>{p.price}<span style={{fontSize:14,color:TEXT3}}>/mo</span></div>
              <div style={{marginTop:16,marginBottom:20,display:"flex",flexDirection:"column",gap:6}}>{p.features.map(f=><div key={f} style={{fontSize:11,color:TEXT2}}>✓ {f}</div>)}</div>
              <a href={p.stripe} target="_blank" rel="noopener noreferrer" style={{...S.btn("out"),display:"block",textAlign:"center",textDecoration:"none",fontSize:10,padding:"8px 0",width:"100%",boxSizing:"border-box"as const}}>{p.name==="STUDIO"?"START FREE TRIAL":"SUBSCRIBE NOW"}</a>
            </div>))}
          </div>
        </div>
      );
      case 10: return(
        <div style={{maxWidth:1000,margin:"0 auto",padding:"28px 20px 60px"}}>
          <div style={{fontSize:9,letterSpacing:5,color:GOLDDIM,marginBottom:6,fontFamily:"'Cinzel',serif"}}>ASSET INGESTION</div>
          <div style={S.cinzel(24,GOLD2)}>UPLOAD MEDIA</div>
          <div style={{fontSize:13,color:TEXT2,margin:"4px 0 24px"}}>{mediaLibrary.length} ASSETS IN LIBRARY</div>
          <label style={{display:"block",border:`2px dashed ${GOLDDIM}`,padding:"48px 32px",textAlign:"center",cursor:"pointer",background:BG3}}>
            <input ref={fileInputRef} type="file" multiple accept="video/*,audio/*,image/*,.srt" style={{display:"none"}} onChange={handleFileUpload}/>
            <div style={{fontSize:40,marginBottom:12}}>🎬</div>
            <div style={S.cinzel(16,GOLD2)}>DRAG & DROP OR CLICK TO BROWSE</div>
            <div style={{fontSize:11,letterSpacing:2,color:TEXT2,marginTop:6}}>Video • Audio • Images • SRT Subtitles</div>
          </label>
          {mediaLibrary.length>0&&(
            <div style={{marginTop:24}}>
              <div style={{...S.cinzel(11,GOLD),marginBottom:12}}>MEDIA LIBRARY — CLICK TO ADD TO TIMELINE</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:8}}>
                {mediaLibrary.map((a,i)=>(
                  <div key={i} draggable onDragStart={()=>setDragAsset(a)} onClick={()=>{setTimeline(prev=>prev.map(t=>t.id==="vid1"?{...t,clips:[...t.clips,{...a,clipId:Date.now()}]}:t));alert(`${a.name} added to Video Track 1`);}} style={{background:BG3,border:`1px solid ${BORDER}`,padding:10,cursor:"pointer",transition:"all .2s"}} onMouseEnter={e=>(e.currentTarget.style.borderColor=GOLDDIM)} onMouseLeave={e=>(e.currentTarget.style.borderColor=BORDER)}>
                    <div style={{fontSize:22,marginBottom:4,textAlign:"center"}}>{a.type==="video"?"🎬":a.type==="audio"?"🎵":a.aiGenerated?"✨":"🖼️"}</div>
                    <div style={{fontSize:10,color:TEXT,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.name}</div>
                    <div style={{fontSize:9,color:TEXT3,marginTop:2}}>{a.size||"AI Asset"}</div>
                    {a.aiGenerated&&<div style={{fontSize:8,color:GOLDDIM,marginTop:2,letterSpacing:1}}>✦ AI GENERATED</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
      case 11: return(
        <div style={{maxWidth:1000,margin:"0 auto",padding:"28px 20px 60px"}}>
          <div style={S.cinzel(24,GOLD2)}>EDITOR SUITE</div>
          <div style={{fontSize:13,color:TEXT2,margin:"4px 0 24px"}}>Your complete post-production workspace.</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
            {[{icon:"🎞️",label:"MEDIA LIBRARY",sub:`${mediaLibrary.length} assets`,p:10},{icon:"⏱️",label:"TIMELINE",sub:"Multi-track editing",p:12},{icon:"✨",label:"ENHANCEMENT",sub:"90+ AI tools",p:13},{icon:"🎚️",label:"AUDIO MIXER",sub:"4-channel mixing",p:14},{icon:"⚡",label:"RENDER ENGINE",sub:"Up to 8K",p:15},{icon:"▶️",label:"PREVIEW",sub:"Full-screen playback",p:16}].map(t=>(
              <div key={t.label} onClick={()=>goTo(t.p)} style={{background:BG3,border:`1px solid ${BORDER}`,padding:24,cursor:"pointer",transition:"all .2s",borderTop:`2px solid ${GOLDDIM}`}} onMouseEnter={e=>(e.currentTarget.style.borderColor=GOLD)} onMouseLeave={e=>(e.currentTarget.style.borderColor=BORDER)}>
                <div style={{fontSize:28,marginBottom:10}}>{t.icon}</div>
                <div style={{fontSize:12,letterSpacing:3,fontWeight:700,color:GOLD,marginBottom:4}}>{t.label}</div>
                <div style={{fontSize:11,color:TEXT3}}>{t.sub}</div>
              </div>
            ))}
          </div>
        </div>
      );
      case 12: return(
        <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 96px)"}}>
          <div style={{background:BG2,borderBottom:`1px solid ${BORDER}`,padding:"10px 20px",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
            <div style={S.cinzel(16,GOLD2)}>TIMELINE EDITOR</div>
            <div style={{fontSize:11,letterSpacing:2,color:TEXT3}}>{duration} MIN PROJECT</div>
            <div style={{marginLeft:"auto",display:"flex",gap:6}}>
              <button onClick={()=>addTrack("video")} style={{...S.btn("ghost"),fontSize:9,padding:"4px 10px"}}>+ VIDEO</button>
              <button onClick={()=>addTrack("audio")} style={{...S.btn("ghost"),fontSize:9,padding:"4px 10px"}}>+ AUDIO</button>
              <button onClick={()=>addTrack("srt")} style={{...S.btn("ghost"),fontSize:9,padding:"4px 10px"}}>+ SRT</button>
              <Btn variant="gold" style={{fontSize:9,padding:"4px 14px"}} onClick={()=>goTo(15)}>→ RENDER</Btn>
            </div>
          </div>
          <div style={{display:"flex",flex:1,overflow:"hidden"}}>
            {/* MEDIA POOL */}
            <div style={{width:200,background:BG2,borderRight:`1px solid ${BORDER}`,overflowY:"auto",padding:10,flexShrink:0}}>
              <div style={{fontSize:9,letterSpacing:2,color:GOLDDIM,marginBottom:8,fontFamily:"'Cinzel',serif"}}>MEDIA POOL</div>
              {mediaLibrary.length===0?(
                <div style={{textAlign:"center",padding:16}}>
                  <div style={{fontSize:11,color:TEXT3,marginBottom:8}}>No media yet</div>
                  <Btn variant="out" onClick={()=>goTo(10)} style={{fontSize:9,padding:"4px 10px"}}>UPLOAD</Btn>
                </div>
              ):mediaLibrary.map((a,i)=>(
                <div key={i} draggable onDragStart={()=>setDragAsset(a)} style={{background:BG3,border:`1px solid ${BORDER}`,padding:"6px 8px",marginBottom:4,cursor:"grab",display:"flex",alignItems:"center",gap:6}} onMouseEnter={e=>(e.currentTarget.style.borderColor=GOLDDIM)} onMouseLeave={e=>(e.currentTarget.style.borderColor=BORDER)}>
                  <span style={{fontSize:14}}>{a.type==="video"?"🎬":a.type==="audio"?"🎵":"✨"}</span>
                  <div style={{fontSize:9,color:TEXT,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1}}>{a.name}</div>
                </div>
              ))}
            </div>
            {/* TRACKS */}
            <div style={{flex:1,overflowX:"auto",overflowY:"auto",padding:"10px 16px"}}>
              {timeline.map(track=>(
                <div key={track.id} style={{marginBottom:10}}>
                  <div style={{fontSize:9,fontWeight:700,letterSpacing:2,color:trackColors[track.type]||GOLDDIM,marginBottom:3}}>{track.label} — {track.clips.length} CLIPS</div>
                  <div onDragOver={e=>e.preventDefault()} onDrop={()=>dropOnTrack(track.id)} style={{background:BG3,border:`1px solid ${trackColors[track.type]||BORDER}`,borderLeft:`3px solid ${trackColors[track.type]||GOLDDIM}`,minHeight:48,padding:"6px 8px",display:"flex",alignItems:"center",gap:4,flexWrap:"wrap",minWidth:600}}>
                    {track.clips.length===0?(
                      <span style={{fontSize:10,color:TEXT3,letterSpacing:2}}>DRAG CLIPS HERE FROM MEDIA POOL</span>
                    ):track.clips.map((c,i)=>(
                      <div key={i} style={{background:trackColors[track.type]||GOLDDIM,padding:"4px 8px",fontSize:9,color:"#000",fontWeight:700,maxWidth:100,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",borderRadius:2}}>{c.name?.slice(0,12)||"Asset"}</div>
                    ))}
                  </div>
                </div>
              ))}
              <div style={{marginTop:12,fontSize:10,color:TEXT3,letterSpacing:1}}>Tip: Drag assets from Media Pool onto tracks. Click + VIDEO / + AUDIO / + SRT to add tracks.</div>
            </div>
          </div>
        </div>
      );
      case 13: return(
        <div style={{display:"grid",gridTemplateColumns:"240px 1fr",height:"calc(100vh - 96px)"}}>
          <div style={{background:BG2,borderRight:`1px solid ${BORDER}`,overflowY:"auto"}}>
            <div style={{padding:"10px 14px",borderBottom:`1px solid ${BORDER}`,fontSize:9,letterSpacing:4,color:GOLDDIM,fontFamily:"'Cinzel',serif"}}>ENHANCEMENT STUDIO</div>
            {ENH.map(t=>(<div key={t} style={{padding:"8px 14px",borderBottom:`1px solid ${BORDER}`,fontSize:12,color:TEXT2,cursor:"pointer",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.color=GOLD;e.currentTarget.style.background=BG3;}} onMouseLeave={e=>{e.currentTarget.style.color=TEXT2;e.currentTarget.style.background="transparent";}}>{t}</div>))}
          </div>
          <div style={{padding:24,overflowY:"auto"}}>
            <div style={S.cinzel(20,GOLD2)}>ENHANCEMENT STUDIO</div>
            <div style={{fontSize:12,color:TEXT2,margin:"8px 0 24px"}}>Select a tool from the left panel, adjust parameters, and apply to your footage.</div>
            {["Intensity","Clarity","Color","Brightness"].map(k=>(<div key={k} style={{marginBottom:16}}><div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:TEXT2,marginBottom:6}}><span>{k}</span><span style={{color:GOLD,fontWeight:700}}>75%</span></div><input type="range" min={0} max={100} defaultValue={75} style={{width:"100%"}}/></div>))}
            <Btn variant="gold" style={{marginTop:8}}>APPLY ENHANCEMENT</Btn>
          </div>
        </div>
      );
      case 14: return(
        <div style={{maxWidth:1000,margin:"0 auto",padding:"28px 20px 60px"}}>
          <div style={S.cinzel(24,GOLD2)}>AUDIO MIXER</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,margin:"24px 0"}}>
            {[{ch:"MUSIC",col:"#8B5CF6",val:75},{ch:"VOICE",col:GOLD,val:60},{ch:"SFX",col:"#F59E0B",val:50},{ch:"MASTER",col:"#EF4444",val:85}].map(c=>(
              <div key={c.ch} style={{background:BG3,border:`1px solid ${BORDER}`,padding:"20px 14px",display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
                <div style={{fontSize:10,letterSpacing:3,color:TEXT2}}>{c.ch}</div>
                <div style={{...S.cinzel(26,GOLD2,700)}}>{c.val}</div>
                <input type="range" min={0} max={100} defaultValue={c.val} style={{writingMode:"vertical-lr" as const,direction:"rtl" as const,width:6,height:120}}/>
                <div style={{width:"100%",height:4,background:BORDER,borderRadius:2}}><div style={{height:"100%",background:c.col,borderRadius:2,width:`${c.val}%`}}/></div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:10,justifyContent:"center"}}><Btn variant="ghost">RESET LEVELS</Btn><Btn variant="out">SAVE PRESET</Btn></div>
        </div>
      );
      case 15: return(
        <div style={{maxWidth:800,margin:"0 auto",padding:"28px 20px 60px"}}>
          <div style={S.cinzel(24,GOLD2)}>RENDER FILM</div>
          {/* DURATION SLIDER */}
          <div style={{background:BG3,border:`1px solid ${BORDER}`,padding:20,margin:"20px 0"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <div style={{fontSize:11,letterSpacing:2,color:TEXT2}}>FILM DURATION</div>
              <div style={{...S.cinzel(18,GOLD)}}>{duration} MIN</div>
            </div>
            <input type="range" min={0} max={180} value={duration} onChange={e=>setDuration(+e.target.value)} style={{width:"100%",marginBottom:8}}/>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:TEXT3,letterSpacing:1}}><span>0 MIN</span><span>30</span><span>60</span><span>90</span><span>120</span><span>150</span><span>180 MIN</span></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
            {[{title:"EXPORT QUALITY",opts:["8K — 4320p","4K — 2160p","HD — 1080p","SD — 720p"],val:quality,set:setQuality},{title:"FORMAT",opts:["MP4","MOV","AVI","WebM"],val:format,set:setFormat}].map(card=>(
              <div key={card.title} style={{background:BG3,border:`1px solid ${BORDER}`,padding:20}}>
                <div style={S.cinzel(11,GOLD)}>{card.title}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:12}}>
                  {card.opts.map(o=>(<div key={o} onClick={()=>card.set(o)} style={{padding:"6px 12px",border:`1px solid ${o===card.val?GOLD:BORDER}`,cursor:"pointer",fontSize:11,letterSpacing:2,color:o===card.val?GOLD:TEXT2,background:o===card.val?"rgba(212,168,71,.08)":"transparent",transition:"all .2s"}}>{o}</div>))}
                </div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
            {[[`${duration} MIN`,"Duration"],[String(timeline.reduce((a,t)=>a+t.clips.length,0)),"Total Clips"],["3","Audio Tracks"]].map(([n,l])=>(<div key={l} style={{background:BG3,border:`1px solid ${BORDER}`,padding:14,textAlign:"center",borderTop:`2px solid ${GOLDDIM}`}}><div style={S.cinzel(20,GOLD2,900)}>{n}</div><div style={{fontSize:10,letterSpacing:2,color:TEXT3}}>{l}</div></div>))}
          </div>
          <Btn variant="gold" style={{width:"100%",justifyContent:"center",padding:"14px",fontSize:13}} onClick={()=>{const rv={id:Date.now(),name:`MandaStrong_${Date.now()}.${format.toLowerCase()}`,type:"video",size:`${quality} ${format}`,url:"",quality,format,duration,timestamp:new Date().toISOString()};setRenderedVideo(rv);addAsset(rv);alert(`Rendering ${quality} ${format} — ${duration} min film…`);setTimeout(()=>goTo(16),1000);}}>⚡ START RENDER — {quality} · {format}</Btn>
        </div>
      );
      case 16: return(
        <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 96px)"}}>
          <div style={{background:BG2,borderBottom:`1px solid ${BORDER}`,padding:"10px 20px",display:"flex",alignItems:"center",gap:12}}>
            <div style={S.cinzel(16,GOLD2)}>PREVIEW PLAYER</div>
            <div style={{marginLeft:"auto",display:"flex",gap:8}}>
              <Btn variant="ghost" onClick={()=>goTo(15)} style={{fontSize:9,padding:"4px 12px"}}>← RENDER AGAIN</Btn>
              <Btn variant="out" onClick={()=>goTo(17)} style={{fontSize:9,padding:"4px 12px"}}>EXPORT →</Btn>
            </div>
          </div>
          <div style={{flex:1,background:"#000",display:"flex",alignItems:"center",justifyContent:"center"}}>
            {renderedVideo?(
              <div style={{width:"100%",maxWidth:720,aspectRatio:"16/9",background:"#000",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column" as const,gap:16}}>
                <div style={{fontSize:32}}>✅</div>
                <div style={S.cinzel(18,GOLD2)}>RENDER COMPLETE</div>
                <div style={{fontSize:11,color:TEXT2,letterSpacing:2}}>{renderedVideo.quality} · {renderedVideo.format} · {renderedVideo.duration} MIN</div>
                <div style={{fontSize:11,color:TEXT2,letterSpacing:1,marginTop:4}}>{renderedVideo.name}</div>
                <div style={{display:"flex",gap:10,marginTop:8}}>
                  <Btn variant="gold" onClick={()=>goTo(17)}>EXPORT FILM →</Btn>
                  <Btn variant="ghost" onClick={()=>goTo(15)}>RENDER AGAIN</Btn>
                </div>
              </div>
            ):(
              <div style={{width:"100%",maxWidth:720,aspectRatio:"16/9",background:"#000",display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${BORDER}`}}>
                <div style={{textAlign:"center" as const}}>
                  <div style={{fontSize:64,marginBottom:16}}>🎬</div>
                  <div style={{fontSize:13,color:TEXT2,marginBottom:20,letterSpacing:2}}>RENDER YOUR FILM FIRST TO PREVIEW</div>
                  <Btn variant="gold" onClick={()=>goTo(15)}>⚡ GO TO RENDER ENGINE</Btn>
                </div>
              </div>
            )}
          </div>
          <PlayControls/>
        </div>
      );
      case 17: return(
        <div style={{maxWidth:900,margin:"0 auto",padding:"28px 20px 60px"}}>
          <div style={S.cinzel(24,GOLD2)}>EXPORT & DISTRIBUTE</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,margin:"20px 0"}}>
            {[["⬇️","DOWNLOAD TO DEVICE"],["💾","SAVE PROJECT FILE"],["🌍","SHARE TO COMMUNITY"]].map(([ic,lbl])=>(<div key={lbl} style={{background:BG3,border:`1px solid ${BORDER}`,padding:20,textAlign:"center",cursor:"pointer"}} onMouseEnter={e=>(e.currentTarget.style.borderColor=GOLDDIM)} onMouseLeave={e=>(e.currentTarget.style.borderColor=BORDER)}><div style={{fontSize:28,marginBottom:8}}>{ic}</div><div style={{fontSize:10,letterSpacing:2,color:TEXT2}}>{lbl}</div></div>))}
          </div>
          <div style={{height:1,background:`linear-gradient(90deg,transparent,${GOLDDIM},transparent)`,margin:"20px 0"}}/>
          <div style={S.cinzel(12,GOLD,400)}>SHARE DIRECTLY TO SOCIAL MEDIA</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))",gap:10,marginTop:14}}>
            {[["📺","YouTube","https://www.youtube.com/upload"],["📸","Instagram","https://www.instagram.com"],["🎵","TikTok","https://www.tiktok.com/upload"],["𝕏","X / Twitter","https://twitter.com"],["📘","Facebook","https://www.facebook.com"],["💼","LinkedIn","https://www.linkedin.com"],["🌐","Vimeo","https://vimeo.com/upload"],["📌","Pinterest","https://www.pinterest.com"],["☁️","WhatsApp","https://web.whatsapp.com"]].map(([ic,nm,url])=>(
              <a key={nm} href={url} target="_blank" rel="noopener noreferrer" style={{background:BG3,border:`1px solid ${BORDER}`,padding:12,textAlign:"center",textDecoration:"none",display:"block"}} onMouseEnter={e=>(e.currentTarget.style.borderColor=GOLDDIM)} onMouseLeave={e=>(e.currentTarget.style.borderColor=BORDER)}>
                <div style={{fontSize:20,marginBottom:5}}>{ic}</div><div style={{fontSize:9,letterSpacing:2,color:TEXT2,textTransform:"uppercase"}}>{nm}</div>
              </a>
            ))}
          </div>
        </div>
      );
      case 18: return(
        <div style={{maxWidth:1000,margin:"0 auto",padding:"28px 20px 60px"}}>
          <div style={S.cinzel(24,GOLD2)}>TUTORIALS</div>
          <div style={{marginTop:20}}>
            {[["Getting Started — Platform Overview","5:30","BEGINNER","#27ae60"],["Importing & Managing Media Assets","8:15","BEGINNER","#27ae60"],["Multi-Track Timeline Editing","12:45","INTERMEDIATE","#e67e22"],["AI Tools — 600+ Features Explained","18:20","INTERMEDIATE","#e67e22"],["Professional Color Grading with AI","22:00","ADVANCED","#c0392b"],["Audio Mixing & Sound Design","15:10","INTERMEDIATE","#e67e22"],["AI Enhancement Studio Deep Dive","20:30","ADVANCED","#c0392b"],["Render Settings & Export Optimization","8:15","BEGINNER","#27ae60"]].map(([title,dur,lvl,col],i)=>(
              <div key={title} style={{background:BG3,border:`1px solid ${BORDER}`,padding:"16px 20px",display:"flex",alignItems:"center",gap:16,cursor:"pointer",marginBottom:10}}>
                <div style={{...S.cinzel(20,GOLDDIM),minWidth:40}}>0{i+1}</div>
                <div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:TEXT,marginBottom:3}}>{title}</div><div style={{fontSize:10,letterSpacing:2,color:TEXT3}}>{dur} &nbsp;•&nbsp; Opens on YouTube</div></div>
                <div style={{fontSize:8,letterSpacing:2,padding:"3px 8px",fontWeight:700,border:`1px solid ${col}`,color:col}}>{lvl}</div>
              </div>
            ))}
          </div>
        </div>
      );
      case 19: return(
        <div style={{maxWidth:820,margin:"0 auto",padding:"28px 20px 60px"}}>
          <div style={S.cinzel(24,GOLD2)}>TERMS OF SERVICE & DISCLAIMER</div>
          <div style={{fontSize:9,letterSpacing:3,color:TEXT3,margin:"8px 0 32px"}}>EFFECTIVE: MARCH 2026 &nbsp;•&nbsp; MANDASTRONG STUDIO LLC</div>
          <div style={{background:BG3,border:`1px solid ${BORDER}`,borderTop:`3px solid ${GOLD}`,padding:"40px 40px",marginBottom:24,minHeight:"45vh",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:GOLD2,letterSpacing:3,marginBottom:24}}>TERMS OF SERVICE</div>
            <p style={{fontSize:15,lineHeight:2.2,color:TEXT2}}>By accessing or using MandaStrong Studio ("the Platform"), you agree to be legally bound by these Terms of Service. These Terms constitute a binding agreement between you and MandaStrong Studio LLC. The Platform provides AI-powered video editing, voice synthesis, image generation, and cinematic production tools on an "as-is" basis. You are solely responsible for safeguarding your account. Subscriptions bill monthly and auto-renew unless cancelled. All payments processed via Stripe. Studio Plan subscribers receive full commercial rights. Creator and Pro plans receive personal use licenses. You retain ownership of all original content you upload. You agree not to create or distribute unlawful or harmful content. For support contact us via MandaStrong1.Etsy.com or Agent Grok on Page 20.</p>
          </div>
          <div style={{background:BG3,border:`1px solid ${BORDER}`,borderTop:`3px solid ${GOLDDIM}`,padding:"40px 40px",marginBottom:32,minHeight:"45vh",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:20,fontWeight:700,color:GOLD2,letterSpacing:3,marginBottom:24}}>DISCLAIMER</div>
            <p style={{fontSize:15,lineHeight:2.2,color:TEXT2}}>MandaStrong Studio is provided "as is" without warranties of any kind. We do not warrant the service will be error-free or uninterrupted. To the fullest extent permitted by applicable law, MandaStrong Studio LLC shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Platform. Content generated by AI tools is produced algorithmically — users are solely responsible for reviewing all AI-generated outputs prior to use or distribution. The Platform integrates with third-party services including Stripe, YouTube, TikTok, Instagram, and others — MandaStrong Studio is not responsible for their policies. A portion of Platform revenue supports veterans' mental health initiatives and anti-bullying education programs, reflecting the personal values of our founder.</p>
          </div>
          <Btn variant="gold" onClick={()=>goTo(4)}>I ACCEPT — ENTER STUDIO</Btn>
        </div>
      );
      case 20: return <AgentGrok/>;
      case 21: return(
        <div style={{maxWidth:900,margin:"0 auto",padding:"28px 20px 60px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:24,flexWrap:"wrap",gap:12}}>
            <div>
              <div style={{fontSize:9,letterSpacing:5,color:GOLDDIM,marginBottom:6,fontFamily:"'Cinzel',serif"}}>CREATOR NETWORK</div>
              <div style={S.cinzel(24,GOLD2)}>COMMUNITY HUB</div>
            </div>
            <div>
              <input ref={communityFileRef} type="file" accept="video/*" style={{display:"none"}} onChange={e=>{const f=e.target.files?.[0];if(f){const newPost={id:Date.now(),title:f.name.replace(/\.[^/.]+$/,""),user:"You",emoji:"🎬",likes:0,comments:[]};setCommunityPosts(prev=>[newPost,...prev]);}}}/>
              <Btn variant="gold" onClick={()=>communityFileRef.current?.click()}>▲ UPLOAD YOUR MOVIE</Btn>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {communityPosts.map(post=>(
              <div key={post.id} style={{background:BG3,border:`1px solid ${BORDER}`,padding:20}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                  <span style={{fontSize:28}}>{post.emoji}</span>
                  <div>
                    <div style={{fontSize:14,fontWeight:600,color:TEXT}}>{post.title}</div>
                    <div style={{fontSize:10,letterSpacing:2,color:TEXT3}}>BY {post.user.toUpperCase()}</div>
                  </div>
                  <div style={{marginLeft:"auto",display:"flex",gap:12,alignItems:"center"}}>
                    <button onClick={()=>setCommunityPosts(prev=>prev.map(p=>p.id===post.id?{...p,likes:p.likes+1}:p))} style={{background:"none",border:"none",cursor:"pointer",fontSize:18}}>❤️</button>
                    <button onClick={()=>setCommunityPosts(prev=>prev.map(p=>p.id===post.id?{...p,likes:p.likes+1}:p))} style={{background:"none",border:"none",cursor:"pointer",fontSize:18}}>😍</button>
                    <span style={{fontSize:11,color:TEXT2,letterSpacing:1}}>{post.likes.toLocaleString()}</span>
                  </div>
                </div>
                <div style={{borderTop:`1px solid ${BORDER}`,paddingTop:10,marginTop:4}}>
                  {post.comments.map((c,i)=>(<div key={i} style={{fontSize:12,color:TEXT2,padding:"4px 0",borderBottom:`1px solid ${BORDER}`}}>{c}</div>))}
                  <div style={{display:"flex",gap:8,marginTop:8}}>
                    <input value={newComment[post.id]||""} onChange={e=>setNewComment(p=>({...p,[post.id]:e.target.value}))} placeholder="Leave a comment…" style={{flex:1,padding:"6px 10px",fontSize:12}} onKeyDown={e=>{if(e.key==="Enter"&&newComment[post.id]?.trim()){setCommunityPosts(prev=>prev.map(p=>p.id===post.id?{...p,comments:[...p.comments,newComment[post.id]]}:p));setNewComment(p=>({...p,[post.id]:""}));}}}/>
                    <button onClick={()=>{if(newComment[post.id]?.trim()){setCommunityPosts(prev=>prev.map(p=>p.id===post.id?{...p,comments:[...p.comments,newComment[post.id]]}:p));setNewComment(p=>({...p,[post.id]:""}));}}} style={{...S.btn("out"),fontSize:9,padding:"6px 14px"}}>POST</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      case 22: return(
        <div style={{maxWidth:900,margin:"0 auto",padding:"0 0 80px"}}>
          {/* VIDEO AT TOP */}
          <div style={{width:"100%",background:"#000",aspectRatio:"16/9",maxHeight:500,overflow:"hidden",borderBottom:`2px solid ${GOLDDIM}`}}>
            <video autoPlay loop muted playsInline style={{width:"100%",height:"100%",objectFit:"cover" as const}} src="/thatsallfolks.mp4">
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",background:"#000"}}>
                <div style={{...S.cinzel(32,GOLD2,900),textAlign:"center",letterSpacing:8}}>THAT'S ALL FOLKS</div>
              </div>
            </video>
          </div>
          <div style={{padding:"40px 24px"}}>
            <div style={{textAlign:"center",marginBottom:32}}>
              <div style={{...S.cinzel(36,GOLD2,900),letterSpacing:8,lineHeight:1.1}}>THAT'S ALL<br/>FOLKS</div>
              <div style={{height:1,background:`linear-gradient(90deg,transparent,${GOLDDIM},transparent)`,margin:"20px auto",maxWidth:400}}/>
            </div>
            <div style={{background:BG3,border:`1px solid ${GOLDDIM}`,padding:36,maxWidth:720,margin:"0 auto 28px",position:"relative"}}>
              <div style={{position:"absolute" as const,top:10,left:10,right:10,bottom:10,border:`1px solid ${BORDER}`,pointerEvents:"none" as const}}/>
              <div style={{...S.cinzel(18,GOLD2),textAlign:"center",marginBottom:20}}>✦ A SPECIAL THANK YOU ✦</div>
              <div style={{fontSize:13,lineHeight:2.1,color:TEXT2}}>
                <p style={{marginBottom:14}}>Dear Creator,</p>
                <p style={{marginBottom:14}}>From the bottom of my heart — <strong style={{color:TEXT}}>thank you</strong>. Whether you're here to capture precious family memories, tell a story that's lived rent-free in your head for years, or simply explore what's possible when creativity meets technology, you chose to do it with MandaStrong Studio. That means everything.</p>
                <p style={{marginBottom:14}}>I built this platform because I believe that <strong style={{color:TEXT}}>storytelling should have no gatekeepers</strong>. You don't need a film school degree or a Hollywood budget. You just need a story worth telling — and now you have 600+ professional tools to help you tell it.</p>
                <p style={{marginBottom:14}}>Every subscription supports <strong style={{color:TEXT}}>veterans' mental health initiatives</strong> and <strong style={{color:TEXT}}>school anti-bullying programs</strong> — causes deeply personal to me as the author of <em>Doxy the School Bully</em>.</p>
                <p>With gratitude and cinematic love,</p>
                <div style={{marginTop:20,fontFamily:"'Cinzel',serif",fontSize:12,color:GOLD,lineHeight:1.9}}>— Amanda Strong<br/>Founder, MandaStrong Studio<br/>Author, <em>Doxy the School Bully</em><br/><a href="https://MandaStrong1.Etsy.com" target="_blank" rel="noopener noreferrer" style={{color:GOLDDIM,textDecoration:"none"}}>MandaStrong1.Etsy.com</a></div>
              </div>
            </div>
            <div style={{background:`linear-gradient(135deg,${BG2},${BG3})`,border:`1px solid ${GOLDDIM}`,padding:"24px 28px",margin:"20px 0"}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:5,color:GOLD,marginBottom:12}}>OUR MISSION</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
                {[["🎬","EMPOWER CREATORS","600+ AI tools making professional filmmaking accessible to everyone."],["🛡️","PROTECT THE YOUNG","Revenue funds school anti-bullying programs, inspired by Doxy the School Bully."],["🎖️","SUPPORT VETERANS","We fund mental health services for veterans — because they deserve the best."],["🌍","BUILD COMMUNITY","The Creator Network connects filmmakers worldwide to share and grow."]].map(([ic,t,tx])=>(
                  <div key={t} style={{background:BG,border:`1px solid ${BORDER}`,padding:14}}><div style={{fontSize:18,marginBottom:6}}>{ic}</div><div style={{fontSize:10,letterSpacing:3,color:GOLD,marginBottom:4,fontWeight:700}}>{t}</div><div style={{fontSize:11,color:TEXT3,lineHeight:1.6}}>{tx}</div></div>
                ))}
              </div>
            </div>
            <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:28,flexWrap:"wrap"}}>
              <a href="https://MandaStrong1.Etsy.com" target="_blank" rel="noopener noreferrer" style={{...S.btn("out"),textDecoration:"none"}}>VISIT ETSY STORE</a>
              <Btn variant="ghost" onClick={()=>goTo(0)}>← BACK TO HOME</Btn>
              <Btn variant="gold" onClick={()=>goTo(4)}>BROWSE AI TOOLS →</Btn>
            </div>
          </div>
        </div>
      );
      default: return null;
    }
  }

  return(
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:BG,color:TEXT,fontFamily:"'Rajdhani',sans-serif",position:"relative"}}>
      <div style={{position:"fixed" as const,inset:0,background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.05) 2px,rgba(0,0,0,.05) 4px)",pointerEvents:"none" as const,zIndex:9999}}/>
      <input ref={fileInputRef} type="file" multiple accept="video/*,audio/*,image/*,.srt" style={{display:"none"}} onChange={handleFileUpload}/>

      <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 16px",background:BG2,borderBottom:`1px solid ${GOLDDIM}`,flexShrink:0,position:"relative",zIndex:10,flexWrap:"wrap",gap:6}}>
        <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>goTo(0)}>
          <div style={{width:34,height:34,border:`2px solid ${GOLD}`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Cinzel',serif",fontSize:16,fontWeight:900,color:GOLD,flexShrink:0}}>M</div>
          <div style={{fontFamily:"'Cinzel',serif",lineHeight:1.4}}>
            <div style={{fontSize:9,letterSpacing:3,color:GOLDDIM}}>Cinema Intelligence Platform — Est. 2026</div>
            <div style={{fontSize:16,fontWeight:900,letterSpacing:5,color:GOLD2}}>MANDA STRONG STUDIO</div>
            <div style={{fontSize:9,letterSpacing:2,color:TEXT2}}>600+ AI Tools &nbsp;•&nbsp; 8K Export &nbsp;•&nbsp; Up to 3-Hour Films</div>
          </div>
        </div>
        <div style={{textAlign:"right",fontSize:9,letterSpacing:2,color:TEXT2,lineHeight:1.8}}>
          <div style={{display:"flex",gap:6,justifyContent:"flex-end",marginBottom:2,flexWrap:"wrap"}}>
            <button onClick={()=>goTo(4)} style={{...S.btn("out"),fontSize:9,padding:"3px 10px"}}>AI TOOLS</button>
            <button onClick={()=>goTo(10)} style={{...S.btn("out"),fontSize:9,padding:"3px 10px"}}>UPLOAD</button>
            <button onClick={()=>goTo(12)} style={{...S.btn("out"),fontSize:9,padding:"3px 10px"}}>TIMELINE</button>
            <button onClick={()=>goTo(3)} style={{...S.btn("out"),fontSize:9,padding:"3px 10px"}}>LOGIN</button>
            <button onClick={()=>goTo(20)} style={{...S.btn("gold"),fontSize:9,padding:"3px 10px"}}>🤖 GROK</button>
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end",alignItems:"center"}}>
            <span style={{color:"#2ecc71",fontWeight:700}}>● SYSTEM ONLINE</span>
            {isAdmin&&<span style={{background:"#c0392b",color:"#fff",padding:"1px 6px",fontSize:8,letterSpacing:1}}>ADMIN</span>}
            <span>BUILD 2026.03.15</span>
          </div>
        </div>
      </header>

      <div style={{flex:1,overflowY:"auto",overflowX:"hidden",position:"relative"}}>
        {renderPage()}
      </div>

      <footer style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"7px 16px",background:BG2,borderTop:`1px solid ${GOLDDIM}`,flexShrink:0,fontSize:9,letterSpacing:2,color:TEXT3,position:"relative",zIndex:10,flexWrap:"wrap",gap:6}}>
        <div>MANDASTRONG STUDIO 2026 &nbsp;•&nbsp; MandaStrong1.Etsy.com</div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <button onClick={()=>goTo(page-1)} disabled={page===0} style={{...S.btn("out"),fontSize:11,padding:"5px 14px",opacity:page===0?.3:1}}>◀ BACK</button>
          <span style={{fontSize:10,letterSpacing:2,color:TEXT3,minWidth:90,textAlign:"center"}}>PAGE {page+1} / {TOTAL} — {NAV[page]}</span>
          <button onClick={()=>goTo(page+1)} disabled={page===TOTAL-1} style={{...S.btn("out"),fontSize:11,padding:"5px 14px",opacity:page===TOTAL-1?.3:1}}>NEXT ▶</button>
        </div>
        <div style={{color:"#2ecc71"}}>⬤ AUTOSAVE ON &nbsp;•&nbsp; {mediaLibrary.length} ASSETS</div>
      </footer>

      {aiTool&&<AIPanel tool={aiTool} onClose={()=>setAiTool("")} onAssetCreated={(a)=>{addAssetToLibrary(a);}}/>}
    </div>
  );
}

// WORKSTATION COMPONENT
function WorkstationPage({tools,title,page,goTo,onAI,addAsset,fileInputRef}:{tools:string[],title:string,page:number,goTo:(n:number)=>void,onAI:(t:string)=>void,addAsset:(a:any)=>void,fileInputRef:any}){
  const [search,setSearch]=useState("");
  const filtered=search?tools.filter(t=>t.toLowerCase().includes(search.toLowerCase())):tools;
  const WS_TABS=[{l:"WRI",p:4},{l:"VOI",p:5},{l:"IMA",p:6},{l:"VID",p:7},{l:"MOT",p:8},{l:"ENH",p:9}];
  return(
    <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 96px)"}}>
      <div style={{background:"#101010",borderBottom:"1px solid #2a2a2a",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,flexWrap:"wrap",gap:8}}>
        <div style={{display:"flex",gap:2}}>
          {WS_TABS.map(t=>(<button key={t.l} onClick={()=>goTo(t.p)} style={{fontFamily:"'Rajdhani',sans-serif",fontSize:10,letterSpacing:2,fontWeight:700,padding:"5px 10px",cursor:"pointer",background:t.p===page?"#070707":"#181818",color:t.p===page?"#d4a847":"#666666",border:`1px solid ${t.p===page?"#8a6d22":"#2a2a2a"}`,borderBottom:"none",transition:"all .2s"}}>{t.l}</button>))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={`Search ${tools.length} tools…`} style={{maxWidth:220,fontSize:12,padding:"5px 10px"}}/>
          {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",color:"#666",cursor:"pointer"}}>✕</button>}
          <div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:700,color:"#f0c870",letterSpacing:3}}>{title}</div>
          <div style={{fontSize:10,letterSpacing:2,color:"#666"}}>{filtered.length} TOOLS</div>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:2,padding:2,background:"#2a2a2a"}}>
          {filtered.map(t=>(
            <div key={t} style={{background:"#101010",padding:"14px 12px",display:"flex",flexDirection:"column",gap:10,border:"1px solid transparent",transition:"all .2s",cursor:"pointer"}} onMouseEnter={e=>(e.currentTarget.style.borderColor="#8a6d22")} onMouseLeave={e=>(e.currentTarget.style.borderColor="transparent")}>
              <span style={{fontSize:13,letterSpacing:.5,color:"#e8e4dc",fontWeight:600,lineHeight:1.3}}>{t}</span>
              <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                <button onClick={()=>fileInputRef.current?.click()} style={{fontSize:8,letterSpacing:1,padding:"3px 8px",cursor:"pointer",background:"#181818",border:"1px solid #2a2a2a",color:"#a09a8e",fontFamily:"'Rajdhani',sans-serif",fontWeight:600}}>UPLOAD</button>
                <button style={{fontSize:8,letterSpacing:1,padding:"3px 8px",cursor:"pointer",background:"#181818",border:"1px solid #2a2a2a",color:"#a09a8e",fontFamily:"'Rajdhani',sans-serif",fontWeight:600}}>PASTE</button>
                <button onClick={()=>onAI(t)} style={{fontSize:8,letterSpacing:1,padding:"3px 9px",cursor:"pointer",background:"#8a6d22",border:"1px solid #d4a847",color:"#000",fontFamily:"'Rajdhani',sans-serif",fontWeight:700}}>AI CREATE ✦</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}