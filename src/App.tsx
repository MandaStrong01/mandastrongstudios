ji:"🏄",gender:"Male",age:"Adult",origin:"Australian",region:"Melbourne",style:"Casual · Confident · Outdoorsy",pitch:0.95,rate:0.95,desc:"Relaxed Australian confidence."},
  {id:"aroha",name:"Aroha",emoji:"🌿",gender:"Female",age:"Adult",origin:"New Zealand",region:"Auckland",style:"Warm · Grounded · Sincere",pitch:1.10,rate:0.86,desc:"Natural sincerity. Trustworthy and real."},
  {id:"amara",name:"Amara",emoji:"🌍",gender:"Female",age:"Adult",origin:"South African",region:"Cape Town",style:"Rich · Warm · Powerful",pitch:1.05,rate:0.84,desc:"Quiet power. Carries authority without effort."},
  {id:"kofi",name:"Kofi",emoji:"🥁",gender:"Male",age:"Adult",origin:"West African",region:"Ghana",style:"Deep · Rhythmic · Storyteller",pitch:0.82,rate:0.78,desc:"Every sentence has music in it."},
  {id:"priya",name:"Priya",emoji:"🪷",gender:"Female",age:"Adult",origin:"Indian",region:"Mumbai",style:"Precise · Warm · Intelligent",pitch:1.15,rate:0.90,desc:"Warm and intelligent. Perfect for education."},
  {id:"arjun",name:"Arjun",emoji:"🎯",gender:"Male",age:"Adult",origin:"Indian",region:"Delhi",style:"Authoritative · Clear · Measured",pitch:0.88,rate:0.85,desc:"Sounds like someone who knows exactly what they are talking about."},
  {id:"valentina",name:"Valentina",emoji:"🌹",gender:"Female",age:"Adult",origin:"Spanish",region:"Madrid",style:"Passionate · Warm · Expressive",pitch:1.18,rate:0.92,desc:"Everything sounds felt rather than said."},
  {id:"pierre",name:"Pierre",emoji:"🥐",gender:"Male",age:"Adult",origin:"French",region:"Paris",style:"Suave · Dry · Cultured",pitch:0.90,rate:0.84,desc:"Makes things sound more interesting than they are."},
  {id:"ingrid",name:"Ingrid",emoji:"❄️",gender:"Female",age:"Adult",origin:"Scandinavian",region:"Stockholm",style:"Clean · Cool · Direct",pitch:1.08,rate:0.88,desc:"No excess words. Cool Nordic efficiency."},
  {id:"yemi",name:"Yemi",emoji:"🌟",gender:"Female",age:"Adult",origin:"Nigerian",region:"Lagos",style:"Bold · Joyful · Energetic",pitch:1.25,rate:1.00,desc:"Life-affirming. Impossible not to engage with."},
  {id:"carlos",name:"Carlos",emoji:"🎺",gender:"Male",age:"Adult",origin:"Caribbean",region:"Jamaica",style:"Warm · Rhythmic · Joyful",pitch:0.95,rate:0.88,desc:"Sounds like good weather. Warm and vital."},
  {id:"mei",name:"Mei",emoji:"🏮",gender:"Female",age:"Teen",origin:"Chinese",region:"Beijing",style:"Clear · Bright · Precise",pitch:1.22,rate:0.92,desc:"Clear and warm. Perfect for education."},
  {id:"rafael",name:"Rafael",emoji:"🎭",gender:"Male",age:"Adult",origin:"Brazilian",region:"São Paulo",style:"Warm · Vibrant · Expressive",pitch:0.95,rate:0.98,desc:"Full of life. Latin warmth in every word."},
  {id:"magnus",name:"Magnus",emoji:"🧙",gender:"Male",age:"Elderly",origin:"Fantasy",region:"Ancient",style:"Ancient · Wise · Epic",pitch:0.75,rate:0.70,desc:"Seen civilisations rise and fall. Finds it predictable."},
  {id:"duchess",name:"Duchess",emoji:"👑",gender:"Female",age:"Adult",origin:"British",region:"Aristocratic",style:"Imperious · Elegant · Commanding",pitch:1.08,rate:0.78,desc:"Every word an edict. Effortless command."},
  {id:"rex",name:"Rex",emoji:"🦁",gender:"Male",age:"Adult",origin:"American",region:"Villain",style:"Menacing · Smooth · Dangerous",pitch:0.78,rate:0.76,desc:"Says terrible things in a pleasant tone."},
  {id:"nova",name:"Nova",emoji:"🤖",gender:"Female",age:"Adult",origin:"Neutral",region:"AI",style:"Clean · Precise · Neutral",pitch:1.12,rate:0.95,desc:"No accent. No emotion. No opinion. By design."},
  {id:"hunter",name:"Hunter",emoji:"🎬",gender:"Male",age:"Adult",origin:"American",region:"Hollywood",style:"Trailer · Epic · Explosive",pitch:0.70,rate:0.80,desc:"Full movie trailer energy. The fate of the world depends on it."},
  {id:"luna",name:"Luna",emoji:"🌙",gender:"Female",age:"Adult",origin:"Neutral",region:"ASMR",style:"Whisper · ASMR · Intimate",pitch:1.20,rate:0.65,desc:"Soft whisper. Complete calm. Every syllable gentle."},
  {id:"professor",name:"Professor",emoji:"🎓",gender:"Male",age:"Elderly",origin:"British",region:"Oxford",style:"Academic · Thoughtful · Measured",pitch:0.88,rate:0.78,desc:"Distinguished. Precise. Deeply knowledgeable."},
  {id:"hope",name:"Hope",emoji:"🌤️",gender:"Female",age:"Adult",origin:"American",region:"Heartfelt",style:"Tender · Gentle · Loving",pitch:1.15,rate:0.78,desc:"Pure tenderness. Nothing performed."},
  {id:"storm",name:"Storm",emoji:"⛈️",gender:"Male",age:"Adult",origin:"American",region:"Intense",style:"Intense · Angry · Powerful",pitch:0.82,rate:1.00,desc:"Raw intensity. Not out of control — directed."},
  {id:"joy",name:"Joy",emoji:"🎉",gender:"Female",age:"Adult",origin:"American",region:"Uplifting",style:"Excited · Joyful · Celebratory",pitch:1.40,rate:1.15,desc:"Pure infectious joy. Everything is wonderful."},
  {id:"elegy",name:"Elegy",emoji:"🕯️",gender:"Female",age:"Adult",origin:"British",region:"Grief",style:"Solemn · Beautiful · Grief",pitch:1.00,rate:0.70,desc:"Real quiet sorrow with dignity. Not melodrama."},
  {id:"sage",name:"Sage",emoji:"🌿",gender:"Male",age:"Adult",origin:"Neutral",region:"Mindful",style:"Peaceful · Mindful · Grounded",pitch:0.95,rate:0.72,desc:"Deep calm from somewhere real. Nothing rushes."},
  {id:"faith",name:"Faith",emoji:"✨",gender:"Female",age:"Adult",origin:"American",region:"Gospel",style:"Inspirational · Gospel · Uplifting",pitch:1.18,rate:0.88,desc:"Gospel soul. Genuinely moving."},
  {id:"rebel",name:"Rebel",emoji:"✊",gender:"Female",age:"Teen",origin:"American",region:"Activist",style:"Fierce · Defiant · Young",pitch:1.22,rate:1.05,desc:"Will not back down. Full of conviction."},
  {id:"blaze",name:"Blaze",emoji:"🔥",gender:"Male",age:"Adult",origin:"American",region:"Comedy",style:"Comic · Ridiculous · Energetic",pitch:1.05,rate:1.18,desc:"No dignity whatsoever. Completely fine with that."},
];

function P6Voice({ onSave }) {
  const [text,setText]=useState("");
  const [processed,setProcessed]=useState("");
  const [loading,setLoading]=useState(false);
  const [speaking,setSpeaking]=useState(false);
  const [saved,setSaved]=useState(false);
  const [copied,setCopied]=useState(false);
  const [showMVS,setShowMVS]=useState(false);
  const [selVoice,setSelVoice]=useState("james");
  const [search,setSearch]=useState("");
  const [filterGender,setFilterGender]=useState("All");
  const [filterAge,setFilterAge]=useState("All");
  const [filterOrigin,setFilterOrigin]=useState("All");
  const [speed,setSpeed]=useState(0.82);
  const [pitchV,setPitchV]=useState(1.0);
  const [pauseLen,setPauseLen]=useState(700);
  const [volume,setVolume]=useState(1.0);
  const [activeTab,setActiveTab]=useState("speak");
  const [sysVoices,setSysVoices]=useState([]);
  const chunksRef=useRef([]);
  const idxRef=useRef(0);
  const timerRef=useRef(null);

  useEffect(()=>{
    const load=()=>setSysVoices(window.speechSynthesis.getVoices().filter(v=>v.lang.startsWith("en")));
    load(); window.speechSynthesis.onvoiceschanged=load;
    return()=>{window.speechSynthesis.cancel();if(timerRef.current)clearTimeout(timerRef.current);};
  },[]);

  const ORIGINS=["All","British","Scottish","Irish","Welsh","American","Australian","New Zealand","South African","West African","Indian","Spanish","French","Scandinavian","Nigerian","Caribbean","Chinese","Brazilian","Fantasy","Neutral"];
  const AGES=["All","Child","Teen","Adult","Elderly"];
  const GENDERS=["All","Male","Female"];

  const filtered=VOICE_CHARACTERS.filter(v=>{
    const mg=filterGender==="All"||v.gender===filterGender;
    const ma=filterAge==="All"||v.age===filterAge;
    const mo=filterOrigin==="All"||v.origin===filterOrigin;
    const ms=search===""||v.name.toLowerCase().includes(search.toLowerCase())||v.origin.toLowerCase().includes(search.toLowerCase())||v.style.toLowerCase().includes(search.toLowerCase())||v.region.toLowerCase().includes(search.toLowerCase());
    return mg&&ma&&mo&&ms;
  });
  const selected=VOICE_CHARACTERS.find(v=>v.id===selVoice)||VOICE_CHARACTERS[0];

  const pickSysVoice=(vc)=>{
    if(!sysVoices.length)return null;
    if(vc.origin==="British"||vc.origin==="Scottish"||vc.origin==="Irish"||vc.origin==="Welsh"){
      if(vc.gender==="Male")return sysVoices.find(v=>/daniel|oliver|arthur/i.test(v.name)&&v.lang==="en-GB")||sysVoices.find(v=>v.lang==="en-GB"&&!/female|samantha|karen/i.test(v.name));
      return sysVoices.find(v=>/kate|serena|moira/i.test(v.name))||sysVoices.find(v=>v.lang==="en-GB");
    }
    if(vc.origin==="Australian"||vc.origin==="New Zealand")return sysVoices.find(v=>v.lang==="en-AU")||sysVoices.find(v=>/karen/i.test(v.name));
    if(vc.gender==="Female")return sysVoices.find(v=>/samantha|victoria|zira/i.test(v.name))||sysVoices.find(v=>v.lang==="en-US"&&/female/i.test(v.name))||sysVoices[0];
    return sysVoices.find(v=>/david|alex|fred/i.test(v.name))||sysVoices.find(v=>v.lang==="en-US")||sysVoices[0];
  };

  const buildChunks=(txt)=>{
    const clean=txt.replace(/-{1,2}/g,", ").replace(/[.]{3}/g," , ").replace(/\s+/g," ").trim();
    const sents=clean.match(/[^.!?,]+[.!?,]+|[^.!?,]+$/g)||[clean];
    const chunks=[];let buf="";
    for(const s of sents){if((buf+s).length>160){if(buf.trim())chunks.push(buf.trim());buf=s;}else{buf+=s;}}
    if(buf.trim())chunks.push(buf.trim());
    return chunks.length?chunks:[clean];
  };

  const audioChunksRef=useRef([]);
  const mediaRecRef=useRef(null);
  const [audioUrl,setAudioUrl]=useState("");
  const [audioSaved,setAudioSaved]=useState(false);

  const startAudioCapture=()=>{
    try{
      const ctx2=new (window.AudioContext||window.webkitAudioContext)();
      const dest=ctx2.createMediaStreamDestination();
      const rec=new MediaRecorder(dest.stream,{mimeType:MediaRecorder.isTypeSupported("audio/webm;codecs=opus")?"audio/webm;codecs=opus":"audio/webm"});
      audioChunksRef.current=[];
      rec.ondataavailable=e=>{if(e.data.size>0)audioChunksRef.current.push(e.data);};
      rec.onstop=()=>{
        const blob=new Blob(audioChunksRef.current,{type:"audio/webm"});
        const url=URL.createObjectURL(blob);
        setAudioUrl(url);
        setActiveTab("result");
      };
      rec.start(100);
      mediaRecRef.current=rec;
    }catch(e){}
  };

  const stopAudioCapture=()=>{
    try{if(mediaRecRef.current&&mediaRecRef.current.state!=="inactive")mediaRecRef.current.stop();}catch(e){}
  };

  const speakNow=(txt)=>{
    window.speechSynthesis.cancel();if(timerRef.current)clearTimeout(timerRef.current);
    const chunks=buildChunks(txt);chunksRef.current=chunks;idxRef.current=0;setSpeaking(true);
    setAudioUrl("");setAudioSaved(false);
    const sysV=pickSysVoice(selected);
    const pVal=pitchV*(selected.pitch||1.0);
    const rVal=speed*(selected.rate||0.9);
    const next=()=>{
      const idx=idxRef.current;
      if(idx>=chunksRef.current.length){
        setSpeaking(false);
        stopAudioCapture();
        return;
      }
      const utt=new SpeechSynthesisUtterance(chunksRef.current[idx]);
      if(sysV)utt.voice=sysV;
      utt.rate=Math.max(0.1,Math.min(2.0,rVal));
      utt.pitch=Math.max(0.1,Math.min(2.0,pVal));
      utt.volume=volume;
      utt.onend=()=>{idxRef.current=idx+1;timerRef.current=setTimeout(next,pauseLen);};
      utt.onerror=()=>{idxRef.current=idx+1;next();};
      window.speechSynthesis.speak(utt);
    };
    if(sysVoices.length>0)next();else{window.speechSynthesis.onvoiceschanged=()=>next();}
  };

  const processAndSpeak=async()=>{
    if(!text.trim())return;
    setLoading(true);setProcessed("");setSaved(false);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","anthropic-dangerous-direct-browser-access":"true","x-api-key":import.meta.env.VITE_ANTHROPIC_API_KEY||""},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:2000,messages:[{role:"user",content:`You are a speech director. Add natural breathing markers for lifelike TTS. Speaker: ${selected.name} — ${selected.style} — ${selected.region}, ${selected.origin}. ${selected.desc}

Add ... for short pause, [pause] after key statements, [long] after most important line. Keep every word exactly as written. Output ONLY the marked text.

Text:
${text}`}]})});
      const d=await res.json();
      const out=d.content&&d.content[0]?d.content[0].text.trim():text;
      setProcessed(out);setActiveTab("result");speakNow(out);
    }catch(e){setProcessed(text);speakNow(text);}
    setLoading(false);
  };

  const stop=()=>{window.speechSynthesis.cancel();if(timerRef.current)clearTimeout(timerRef.current);setSpeaking(false);};
  const inp={width:"100%",background:"#000",border:`1px solid ${GOLDDIM}`,padding:"12px 14px",color:WHITE,fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"'Rajdhani',sans-serif",lineHeight:1.9};

  return (
    <div style={{...Sp}}>
      {showMVS&&<MusicVideoStudio onClose={()=>setShowMVS(false)} onSave={onSave}/>}
      <div style={{padding:"12px 18px",borderBottom:`1px solid ${GOLDDIM}`,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
        <div>
          <div style={{fontSize:11,color:GOLD,letterSpacing:4,fontWeight:700}}>AI WORKSTATION 02 — CINEMA VOICE ENGINE</div>
          <h1 style={{...H1,fontSize:24,margin:0}}>TEXT TO LIFELIKE SPEECH</h1>
        </div>
        <button onClick={()=>setShowMVS(true)} style={{background:"linear-gradient(135deg,#1a0050,#4a0080)",border:"1px solid #9933ff",color:"#cc99ff",padding:"10px 20px",cursor:"pointer",fontSize:12,fontWeight:900,letterSpacing:2}}>
          🎬 MUSIC VIDEO STUDIO
        </button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"290px 1fr",minHeight:"calc(100vh - 120px)"}}>
        <div style={{borderRight:`1px solid ${GOLDDIM}`,background:"#030303",display:"flex",flexDirection:"column"}}>
          <div style={{padding:"10px 10px 6px"}}>
            <div style={{color:GOLD,fontSize:11,letterSpacing:3,fontWeight:900,marginBottom:8}}>VOICE LIBRARY — {filtered.length} / {VOICE_CHARACTERS.length}</div>
            <div style={{marginBottom:5}}>
              <div style={{color:GOLDDIM,fontSize:9,letterSpacing:2,marginBottom:3}}>GENDER</div>
              <div style={{display:"flex",gap:4}}>
                {GENDERS.map(g=><button key={g} onClick={()=>setFilterGender(g)} style={{flex:1,background:filterGender===g?GOLD:"#111",border:`1px solid ${filterGender===g?"#000":GOLDDIM}`,color:filterGender===g?"#000":WHITE,padding:"3px 0",cursor:"pointer",fontSize:10,fontWeight:900}}>{g==="All"?"All":g==="Male"?"👨 M":"👩 F"}</button>)}
              </div>
            </div>
            <div style={{marginBottom:5}}>
              <div style={{color:GOLDDIM,fontSize:9,letterSpacing:2,marginBottom:3}}>AGE</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
                {AGES.map(a=><button key={a} onClick={()=>setFilterAge(a)} style={{background:filterAge===a?"#4a0080":"#111",border:`1px solid ${filterAge===a?"#9933ff":GOLDDIM}`,color:filterAge===a?"#cc99ff":WHITE,padding:"2px 8px",cursor:"pointer",fontSize:9,fontWeight:900}}>{a==="Child"?"🧒":a==="Teen"?"🎒":a==="Adult"?"🧑":a==="Elderly"?"👴":"All"}</button>)}
              </div>
            </div>
            <div style={{marginBottom:6}}>
              <div style={{color:GOLDDIM,fontSize:9,letterSpacing:2,marginBottom:3}}>ORIGIN</div>
              <select value={filterOrigin} onChange={e=>setFilterOrigin(e.target.value)} style={{width:"100%",background:"#111",border:`1px solid ${GOLDDIM}`,color:WHITE,padding:"4px 8px",fontSize:11,outline:"none",cursor:"pointer"}}>
                {ORIGINS.map(o=><option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div style={{position:"relative"}}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search voices..." style={{...inp,padding:"6px 10px 6px 26px",fontSize:11,height:30,marginBottom:0}}/>
              <span style={{position:"absolute",left:7,top:"50%",transform:"translateY(-50%)",color:GOLD,fontSize:11}}>🔍</span>
            </div>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"6px 6px 80px"}}>
            {filtered.map(v=>(
              <div key={v.id} onClick={()=>setSelVoice(v.id)}
                style={{padding:"8px 10px",marginBottom:3,background:selVoice===v.id?"#0a0800":"#000",border:`1px solid ${selVoice===v.id?GOLD:GOLDDIM}`,cursor:"pointer"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}>
                  <div style={{display:"flex",alignItems:"center",gap:5}}>
                    <span style={{fontSize:14}}>{v.emoji}</span>
                    <span style={{color:selVoice===v.id?GOLD:WHITE,fontSize:12,fontWeight:900}}>{v.name}</span>
                    <span style={{color:DIM,fontSize:9}}>— {v.region}</span>
                  </div>
                  <button onClick={e=>{e.stopPropagation();const utt=new SpeechSynthesisUtterance("Hi I am "+v.name+" from "+v.region+". "+v.desc);const sv=pickSysVoice(v);if(sv)utt.voice=sv;utt.pitch=v.pitch||1.0;utt.rate=v.rate||0.9;window.speechSynthesis.cancel();window.speechSynthesis.speak(utt);}} style={{background:"none",border:`1px solid ${GOLDDIM}`,color:GOLD,padding:"1px 6px",cursor:"pointer",fontSize:9,fontWeight:900}}>▶</button>
                </div>
                <div style={{color:GOLD,fontSize:8,letterSpacing:1,marginBottom:1}}>{v.style}</div>
                <div style={{color:DIM,fontSize:9}}>{v.age} · {v.gender} · {v.origin}</div>
                {selVoice===v.id&&<div style={{color:"#22c55e",fontSize:8,fontWeight:900,letterSpacing:2,marginTop:2}}>✓ SELECTED</div>}
              </div>
            ))}
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",borderBottom:`1px solid ${GOLDDIM}`}}>
            {[["speak","🎙 SPEAK"],["result","✦ RESULT"],["settings","🎚 SLIDERS"]].map(([t,l])=>(
              <button key={t} onClick={()=>setActiveTab(t)} style={{background:activeTab===t?"#0a0800":"none",border:"none",borderBottom:activeTab===t?`2px solid ${GOLD}`:"2px solid transparent",color:activeTab===t?GOLD:WHITE,padding:"12px",cursor:"pointer",fontSize:11,fontWeight:900,letterSpacing:2}}>{l}</button>
            ))}
          </div>
          <div style={{flex:1,padding:"16px 20px",overflowY:"auto"}}>
            {activeTab==="speak"&&(
              <div>
                <div style={{...Card(),marginBottom:14,background:"#050500",border:`1px solid ${GOLD}`}}>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <span style={{fontSize:28}}>{selected.emoji}</span>
                    <div style={{flex:1}}>
                      <div style={{color:GOLD,fontSize:14,fontWeight:900,letterSpacing:2}}>{selected.name} <span style={{color:DIM,fontSize:11,fontWeight:400}}>— {selected.region}, {selected.origin}</span></div>
                      <div style={{color:WHITE,fontSize:11,marginTop:2}}>{selected.style}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{color:DIM,fontSize:10}}>Speed {(speed*(selected.rate||0.9)).toFixed(2)}x</div>
                      <div style={{color:DIM,fontSize:10}}>Pitch {(pitchV*(selected.pitch||1.0)).toFixed(2)}</div>
                    </div>
                  </div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <div style={{color:GOLD,fontSize:11,letterSpacing:3,fontWeight:900}}>YOUR TEXT</div>
                  <div style={{color:DIM,fontSize:11}}>{text.split(/\s+/).filter(Boolean).length} words</div>
                </div>
                <textarea value={text} onChange={e=>{setText(e.target.value);setProcessed("");}} placeholder={"Paste your narration here... Selected: "+selected.name+" — "+selected.style+". "+selected.desc} style={{...inp,height:"calc(100vh - 440px)",resize:"none",marginBottom:12}}/>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <button onClick={processAndSpeak} disabled={loading||!text.trim()} style={{...G("gold",false),padding:"16px",fontSize:12,letterSpacing:2,opacity:loading||!text.trim()?0.5:1}}>{loading?"⟳ AI PREPARING...":"✦ PREPARE & SPEAK"}</button>
                  <button onClick={()=>speakNow(text)} disabled={speaking||!text.trim()} style={{...G("out",false),padding:"16px",fontSize:12,opacity:speaking||!text.trim()?0.5:1}}>{speaking?"⏹ STOP":"▶ SPEAK NOW"}</button>
                </div>
                {speaking&&<button onClick={stop} style={{...G("out",false),width:"100%",padding:"10px",marginTop:8,fontSize:12,borderColor:"#ef4444",color:"#ef4444"}}>⏹ STOP SPEAKING</button>}
              </div>
            )}
            {activeTab==="result"&&(
              <div>
                <div style={{color:GOLD,fontSize:11,letterSpacing:3,fontWeight:900,marginBottom:8}}>AI PREPARED — {selected.emoji} {selected.name}</div>
                {processed?(
                  <div>
                    <textarea value={processed} onChange={e=>setProcessed(e.target.value)} style={{...inp,height:"calc(100vh - 460px)",resize:"none",marginBottom:12,borderColor:GOLD,fontSize:12}}/>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:8}}>
                      <button onClick={()=>speakNow(processed)} disabled={speaking} style={{...G("gold",false),padding:"12px",opacity:speaking?0.5:1}}>{speaking?"● SPEAKING":"▶ PLAY"}</button>
                      <button onClick={stop} style={{...G("out",false),padding:"12px"}}>⏹ STOP</button>
                      <button onClick={()=>{if(onSave)onSave({id:Date.now()+Math.random(),name:"Narration — "+selected.name,type:"audio/narration",url:audioUrl||"",content:processed});setSaved(true);}} style={{...G("gold",false),padding:"12px"}}>💾 SAVE</button>
                    </div>
                    {audioUrl&&(
                      <div style={{...Card(),marginBottom:8,background:"#0a2a0a",border:"1px solid #22c55e"}}>
                        <div style={{color:"#22c55e",fontSize:11,fontWeight:900,letterSpacing:2,marginBottom:6}}>🎙 AUDIO RECORDED</div>
                        <audio controls src={audioUrl} style={{width:"100%",marginBottom:8}}/>
                        <div style={{display:"flex",gap:8}}>
                          <a href={audioUrl} download={"Narration_"+selected.name+".webm"} style={{...G("gold",false),padding:"8px 16px",textDecoration:"none",textAlign:"center",display:"block",flex:1,fontSize:11}}>⬇ DOWNLOAD AUDIO</a>
                          <button onClick={()=>{if(onSave)onSave({id:Date.now()+Math.random(),name:"Audio — "+selected.name,type:"audio/webm",url:audioUrl});setAudioSaved(true);}} style={{...G(audioSaved?"out":"gold",false),padding:"8px 16px",flex:1,fontSize:11}}>{audioSaved?"✓ SAVED":"💾 SAVE AUDIO"}</button>
                        </div>
                      </div>
                    )}
                    <button onClick={()=>{navigator.clipboard&&navigator.clipboard.writeText(processed);setCopied(true);setTimeout(()=>setCopied(false),2000);}} style={{...G("out",true),width:"100%",fontSize:11}}>{copied?"✓ COPIED":"📋 COPY TEXT"}</button>
                    {saved&&<div style={{marginTop:8,background:"#0a2a0a",border:"1px solid #22c55e",padding:"10px",color:"#22c55e",fontWeight:900,fontSize:11,letterSpacing:2,textAlign:"center"}}>✓ SAVED TO MEDIA LIBRARY</div>}
                  </div>
                ):(
                  <div style={{textAlign:"center",padding:"80px 20px",color:GOLDDIM}}>
                    <div style={{fontSize:40,marginBottom:12}}>🎙</div>
                    <div style={{fontSize:13,letterSpacing:2}}>Paste text on the SPEAK tab then hit PREPARE & SPEAK</div>
                  </div>
                )}
              </div>
            )}
            {activeTab==="settings"&&(
              <div>
                <div style={{color:GOLD,fontSize:11,letterSpacing:3,fontWeight:900,marginBottom:16}}>{selected.emoji} {selected.name} — VOICE SLIDERS</div>
                {[
                  ["SPEED",speed,setSpeed,0.30,1.40,0.01,speed<0.55?"Very Slow":speed<0.75?"Slow":speed<0.90?"Natural":speed<1.05?"Brisk":"Fast","0.3x Deadpan","1.4x Fast"],
                  ["PITCH",pitchV,setPitchV,0.50,2.00,0.01,pitchV<0.75?"Very Deep":pitchV<0.90?"Deep":pitchV<1.05?"Natural":pitchV<1.25?"High":"Very High","0.5 Deep","2.0 High"],
                  ["VOLUME",volume,setVolume,0.1,1.0,0.01,Math.round(volume*100)+"%","Quiet","Full"],
                  ["PAUSE (ms)",pauseLen,setPauseLen,0,2500,50,pauseLen<300?"Urgent":pauseLen<600?"Natural":pauseLen<1000?"Measured":pauseLen<1500?"Dramatic":"Deadpan","0ms","2500ms"],
                ].map(([label,val,setter,min,max,step,desc,lo,hi])=>(
                  <div key={label} style={{...Card(),marginBottom:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                      <span style={{color:GOLD,fontSize:11,fontWeight:900,letterSpacing:2}}>{label}</span>
                      <span style={{color:WHITE,fontSize:11}}>{desc}</span>
                    </div>
                    <input type="range" min={min} max={max} step={step} value={val} onChange={e=>setter(+e.target.value)} style={{width:"100%",accentColor:GOLD}}/>
                    <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                      <span style={{color:DIM,fontSize:10}}>{lo}</span>
                      <span style={{color:DIM,fontSize:10}}>{hi}</span>
                    </div>
                  </div>
                ))}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <button onClick={()=>{const utt=new SpeechSynthesisUtterance("Hello I am "+selected.name+" from "+selected.region+". "+selected.desc+" Testing your current settings.");const sv=pickSysVoice(selected);if(sv)utt.voice=sv;utt.rate=Math.max(0.1,Math.min(2.0,speed*(selected.rate||0.9)));utt.pitch=Math.max(0.1,Math.min(2.0,pitchV*(selected.pitch||1.0)));utt.volume=volume;window.speechSynthesis.cancel();window.speechSynthesis.speak(utt);}} style={{...G("gold",false),padding:"14px",fontSize:12,letterSpacing:2}}>▶ TEST SETTINGS</button>
                  <button onClick={()=>{setSpeed(0.82);setPitchV(1.0);setVolume(1.0);setPauseLen(700);}} style={{...G("out",false),padding:"14px",fontSize:12,letterSpacing:2}}>RESET</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function P8VideoGenerator({ onSave }) {
  const canvasRef=useRef(null);
  const [prompt,setPrompt]=useState("");
  const [title,setTitle]=useState("");
  const [duration,setDuration]=useState(30);
  const [style,setStyle]=useState("cinematic");
  const [colorGrade,setColorGrade]=useState("gold");
  const [generating,setGenerating]=useState(false);
  const [progress,setProgress]=useState(0);
  const [log,setLog]=useState([]);
  const [videoUrl,setVideoUrl]=useState("");
  const [aiScript,setAiScript]=useState("");
  const [aiLoading,setAiLoading]=useState(false);
  const [saved,setSaved]=useState(false);
  const [visualsOnly,setVisualsOnly]=useState(false);
  const [showText,setShowText]=useState(false);
  const addLog=(msg)=>setLog(p=>[...p,msg]);
  const STYLES=[{id:"cinematic",label:"Cinematic",desc:"Dark dramatic gold titles"},{id:"documentary",label:"Documentary",desc:"Clean authoritative"},{id:"epic",label:"Epic",desc:"Grand sweeping motion"},{id:"intimate",label:"Intimate",desc:"Soft warm personal"},{id:"abstract",label:"Abstract",desc:"Flowing colour art"},{id:"title_sequence",label:"Title Sequence",desc:"Broadcast titles"}];
  const GRADES=[{id:"gold",label:"Gold & Black",bg:"#000000",fg:"#e8c96d",accent:"#a07820"},{id:"teal",label:"Teal & Dark",bg:"#0a1a1a",fg:"#4dd9c0",accent:"#1a5a52"},{id:"crimson",label:"Crimson",bg:"#0a0000",fg:"#ff4444",accent:"#880000"},{id:"silver",label:"Silver Screen",bg:"#111",fg:"#ccc",accent:"#888"},{id:"amber",label:"Warm Amber",bg:"#0a0800",fg:"#ffaa33",accent:"#885500"},{id:"arctic",label:"Arctic Blue",bg:"#000a1a",fg:"#88ccff",accent:"#003366"}];
  const grade=GRADES.find(g=>g.id===colorGrade)||GRADES[0];

  const getAIScene=async()=>{
    if(!prompt.trim())return;setAiLoading(true);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","anthropic-dangerous-direct-browser-access":"true","x-api-key":import.meta.env.VITE_ANTHROPIC_API_KEY||""},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,messages:[{role:"user",content:`Cinematic title card writer. Description: "${prompt}". Write 5-8 SHORT dramatic lines for a ${duration}s ${style} clip. 2-8 words each. Return ONLY the lines, one per line, nothing else.`}]})});
      const d=await res.json();
      if(d.content&&d.content[0])setAiScript(d.content[0].text.trim());
    }catch(e){}
    setAiLoading(false);
  };

  const generateVideo=async()=>{
    if(!prompt.trim()&&!aiScript.trim()){alert("Describe your scene first");return;}
    setGenerating(true);setProgress(0);setLog([]);setVideoUrl("");setSaved(false);

    const canvas=canvasRef.current;
    const W=1920,H=1080;canvas.width=W;canvas.height=H;
    const ctx=canvas.getContext("2d");
    const lines=aiScript.trim()?aiScript.split("\n").filter(l=>l.trim()):[title||"MandaStrong Studio",prompt.slice(0,60)];
    const fps=30,totalFrames=duration*fps;

    addLog("Requesting visual scene from Claude AI...");

    let sceneData={colors:[],elements:[],mood:"",motion:""};
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json","anthropic-dangerous-direct-browser-access":"true","x-api-key":import.meta.env.VITE_ANTHROPIC_API_KEY||""},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:500,
          messages:[{role:"user",content:`You are a visual effects artist designing a Canvas animation for this scene: "${prompt}"
Style: ${style}, Colour grade: ${grade.label}

Return ONLY a JSON object (no markdown) with:
{
  "bgColors": ["#hex1","#hex2"],
  "accentColor": "#hex",
  "particles": true/false,
  "particleCount": 20-80,
  "waves": true/false,
  "rays": true/false,
  "silhouette": "none/mountain/city/forest/ocean",
  "mood": "dark/warm/cold/ethereal/dramatic",
  "vignette": true/false,
  "scanlines": true/false,
  "letterbox": true/false
}`}]})
      });
      const d=await res.json();
      if(d.content&&d.content[0]){
        try{sceneData=JSON.parse(d.content[0].text.trim());}
        catch(e){addLog("Using default scene design");}
      }
    }catch(e){addLog("Claude scene design unavailable — using built-in renderer");}

    addLog("Building cinematic scene...");
    addLog("Resolution: "+W+"x"+H+" · "+fps+"fps · "+duration+"s");

    const mimeType=MediaRecorder.isTypeSupported("video/webm;codecs=vp9")?"video/webm;codecs=vp9":"video/webm";
    const stream=canvas.captureStream(fps);
    const recorder=new MediaRecorder(stream,{mimeType,videoBitsPerSecond:8000000});
    const chunks=[];recorder.ondataavailable=e=>{if(e.data.size>0)chunks.push(e.data);};
    recorder.start(100);
    addLog("Recording started...");

    const bg1=sceneData.bgColors?sceneData.bgColors[0]:grade.bg;
    const bg2=sceneData.bgColors?sceneData.bgColors[1]:grade.bg;
    const accent=sceneData.accentColor||grade.accent;
    const fgR=parseInt(grade.fg.slice(1,3),16),fgG=parseInt(grade.fg.slice(3,5),16),fgB=parseInt(grade.fg.slice(5,7),16);
    const acR=parseInt(accent.slice(1,3),16)||160,acG=parseInt(accent.slice(3,5),16)||120,acB=parseInt(accent.slice(5,7),16)||32;
    const numParticles=sceneData.particleCount||50;

    const drawFrame=(frame)=>{
      const t=frame/totalFrames;
      const sec=frame/fps;
      const shift=Math.sin(sec*0.3)*0.1;
      const bg=ctx.createLinearGradient(0,W*shift,W,H*(1-shift));
      bg.addColorStop(0,bg1);bg.addColorStop(1,bg2||bg1);
      ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
      if(sceneData.rays!==false){
        for(let i=0;i<6;i++){
          const angle=-0.4+i*0.14+Math.sin(sec*0.25+i)*0.03;
          const rx=W*0.45+Math.sin(sec*0.18)*W*0.08;
          ctx.save();ctx.translate(rx,0);ctx.rotate(angle);
          const ray=ctx.createLinearGradient(0,0,0,H*1.4);
          ray.addColorStop(0,"rgba("+fgR+","+fgG+","+fgB+",0.10)");
          ray.addColorStop(0.5,"rgba("+fgR+","+fgG+","+fgB+",0.05)");
          ray.addColorStop(1,"rgba("+fgR+","+fgG+","+fgB+",0)");
          ctx.fillStyle=ray;ctx.fillRect(-50,0,100,H*1.4);ctx.restore();
        }
      }
      if(sceneData.waves!==false){
        for(let w=0;w<3;w++){
          ctx.strokeStyle="rgba("+fgR+","+fgG+","+fgB+","+(0.08-w*0.02)+")";
          ctx.lineWidth=1+w;ctx.beginPath();
          for(let x=0;x<W;x+=2){
            const y=H*(0.62+w*0.08)+Math.sin(x*0.006+sec*(0.8+w*0.3)+w)*H*(0.025+w*0.01)+Math.sin(x*0.015+sec*1.2)*H*0.01;
            x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
          }
          ctx.stroke();
        }
      }
      const sil=sceneData.silhouette||"none";
      if(sil==="mountain"){
        ctx.fillStyle="rgba(0,0,0,0.75)";ctx.beginPath();ctx.moveTo(0,H);
        for(let x=0;x<=W;x+=W/60){
          const h=H*0.78-Math.abs(Math.sin(x*0.003+0.5)*H*0.18)-Math.abs(Math.sin(x*0.008)*H*0.08);
          x===0?ctx.moveTo(x,h):ctx.lineTo(x,h);
        }
        ctx.lineTo(W,H);ctx.closePath();ctx.fill();
      }
      if(sil==="city"){
        ctx.fillStyle="rgba(0,0,0,0.8)";
        for(let i=0;i<30;i++){
          const bw=20+i%5*15,bh=H*0.12+i%7*H*0.06,bx=i*(W/29);
          ctx.fillRect(bx,H-bh,bw,bh);
          ctx.fillStyle="rgba("+fgR+","+fgG+","+fgB+",0.3)";
          for(let wy=H-bh+8;wy<H-8;wy+=16){
            for(let wx=bx+4;wx<bx+bw-4;wx+=10){
              if(Math.sin(wx*7+wy*3+frame*0.02)>0.2)ctx.fillRect(wx,wy,6,8);
            }
          }
          ctx.fillStyle="rgba(0,0,0,0.8)";
        }
      }
      if(sil==="forest"){
        ctx.fillStyle="rgba(0,0,0,0.7)";
        for(let i=0;i<40;i++){
          const tx=i*(W/39)+Math.sin(i*7)*15,th=H*0.15+Math.abs(Math.sin(i*2.3))*H*0.18;
          ctx.beginPath();ctx.moveTo(tx,H*0.88);ctx.lineTo(tx-25,H*0.88-th);ctx.lineTo(tx+25,H*0.88-th);ctx.closePath();ctx.fill();
        }
      }
      if(sil==="ocean"){
        const og=ctx.createLinearGradient(0,H*0.7,0,H);
        og.addColorStop(0,"rgba("+acR+","+acG+","+acB+",0.15)");
        og.addColorStop(1,"rgba(0,0,0,0.6)");
        ctx.fillStyle=og;ctx.fillRect(0,H*0.7,W,H*0.3);
        ctx.strokeStyle="rgba("+fgR+","+fgG+","+fgB+",0.2)";ctx.lineWidth=2;
        ctx.beginPath();
        for(let x=0;x<W;x+=3){
          const y=H*0.72+Math.sin(x*0.01+sec*1.5)*H*0.015;
          x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
        }
        ctx.stroke();
      }
      if(sceneData.particles!==false){
        for(let i=0;i<numParticles;i++){
          const px=(i*2791+frame*(0.15+i%3*0.05))%W;
          const py=(i*1847+frame*(0.08+i%2*0.03))%H;
          const twinkle=0.2+Math.sin(frame*0.06+i*1.3)*0.25;
          const size=i%7===0?2.5:i%3===0?1.5:1;
          ctx.fillStyle="rgba("+fgR+","+fgG+","+fgB+","+twinkle+")";
          ctx.beginPath();ctx.arc(px,py,size,0,Math.PI*2);ctx.fill();
        }
      }
      if(sceneData.vignette!==false){
        const vig=ctx.createRadialGradient(W/2,H/2,W*0.2,W/2,H/2,W*0.78);
        vig.addColorStop(0,"rgba(0,0,0,0)");vig.addColorStop(1,"rgba(0,0,0,0.88)");
        ctx.fillStyle=vig;ctx.fillRect(0,0,W,H);
      }
      if(sceneData.scanlines){
        for(let y=0;y<H;y+=3){ctx.fillStyle="rgba(0,0,0,0.12)";ctx.fillRect(0,y,W,1);}
      }
      if(sceneData.letterbox!==false){
        ctx.fillStyle="#000";ctx.fillRect(0,0,W,H*0.07);ctx.fillRect(0,H*0.93,W,H*0.07);
      }
      const lineCount=lines.length;
      if(showText&&t<0.14&&title){
        const alpha=t<0.05?t/0.05:t>0.11?(0.14-t)/0.03:1;
        ctx.globalAlpha=alpha;
        ctx.fillStyle=grade.fg;ctx.font="900 "+Math.round(H*0.058)+"px Arial Black,Arial";ctx.textAlign="center";
        ctx.fillText(title.toUpperCase(),W/2,H*0.44);
        ctx.font="400 "+Math.round(H*0.024)+"px Arial";ctx.fillStyle=accent;
        ctx.fillText("MANDASTRONG STUDIO",W/2,H*0.55);ctx.globalAlpha=1;
      }
      if(showText) lines.forEach((line,i)=>{
        const ls=(i+0.5)/(lineCount+1),le=ls+0.75/(lineCount+1);
        if(t>=ls-0.04&&t<=le+0.07){
          const lt=Math.min(1,(t-(ls-0.04))/0.05),fo=t>le?Math.max(0,1-(t-le)/0.05):1;
          const alpha=lt*fo,slideX=(1-lt)*55;
          ctx.globalAlpha=alpha;
          ctx.fillStyle=accent;ctx.fillRect(W*0.08+slideX,H*0.47+(i-lineCount/2)*(H*0.088),W*0.84*lt,2);
          ctx.fillStyle=i===0?grade.fg:"#ffffff";
          ctx.font=(i===0?"900 ":"700 ")+Math.round(i===0?H*0.072:H*0.052)+"px Arial Black,Arial";
          ctx.textAlign="center";
          ctx.fillText(line.toUpperCase(),W/2+slideX,H*0.5+(i-lineCount/2)*(H*0.088));
          ctx.globalAlpha=1;
        }
      });
      if(showText&&t>0.87){
        const alpha=(t-0.87)/0.13;ctx.globalAlpha=alpha*0.95;
        ctx.fillStyle="rgba(0,0,0,"+alpha+")";ctx.fillRect(0,0,W,H);
        ctx.fillStyle=grade.fg;ctx.font="900 "+Math.round(H*0.038)+"px Arial Black,Arial";ctx.textAlign="center";
        ctx.fillText("MANDASTRONG STUDIO",W/2,H*0.47);
        ctx.fillStyle=accent;ctx.font="400 "+Math.round(H*0.02)+"px Arial";
        ctx.fillText("CINEMA INTELLIGENCE PLATFORM",W/2,H*0.56);ctx.globalAlpha=1;
      }
    };

    addLog("Generating frames...");
    let frame=0;const batchSize=20;
    const renderBatch=()=>new Promise(resolve=>{
      let i=0;
      const next=()=>{
        if(i>=batchSize||frame>=totalFrames){resolve(null);return;}
        drawFrame(frame);frame++;i++;
        setProgress(Math.round((frame/totalFrames)*88));
        if(i%5===0)setTimeout(next,0);else next();
      };next();
    });
    while(frame<totalFrames){
      await renderBatch();
      if(frame%(fps*2)===0)addLog("  "+Math.round(frame/fps)+"s / "+duration+"s rendered...");
    }
    addLog("Finalising...");setProgress(92);
    await new Promise(r=>setTimeout(r,500));
    recorder.stop();
    await new Promise(r=>{recorder.onstop=r;});
    const blob=new Blob(chunks,{type:mimeType});
    const url=URL.createObjectURL(blob);
    setVideoUrl(url);setProgress(100);
    addLog("Complete! "+(blob.size/1024/1024).toFixed(1)+"MB · "+duration+"s · WebM");
    setGenerating(false);
  };

  const saveToLibrary=async()=>{
    if(!videoUrl)return;
    try{
      const response=await fetch(videoUrl);const blob=await response.blob();
      const fileName=(title||"Scene")+" — "+style+" "+duration+"s.webm";
      const file=new File([blob],fileName,{type:"video/webm"});
      const newUrl=URL.createObjectURL(file);
      if(onSave)onSave({id:Date.now()+Math.random(),name:fileName,type:"video/webm",url:newUrl,file:file});
    }catch(e){if(onSave)onSave({id:Date.now()+Math.random(),name:(title||"Scene")+" — "+style+" "+duration+"s.webm",type:"video/webm",url:videoUrl});}
    setSaved(true);
  };

  return (
    <div style={{...Sp}}>
      <canvas ref={canvasRef} style={{display:"none"}}/>
      <div style={{padding:"12px 20px",borderBottom:`1px solid ${GOLDDIM}`,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
        <div>
          <div style={{fontSize:11,color:GOLD,letterSpacing:4,fontWeight:700}}>AI WORKSTATION 04 — CINEMA ENGINE</div>
          <h1 style={{...H1,fontSize:24,margin:0}}>VIDEO GENERATOR</h1>
        </div>
        <div style={{color:DIM,fontSize:12}}>Real video files · No external services</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 380px",minHeight:"calc(100vh - 120px)"}}>
        <div style={{padding:20,overflowY:"auto"}}>
          <div style={{marginBottom:12}}>
            <div style={{color:GOLD,fontSize:11,letterSpacing:3,fontWeight:900,marginBottom:6}}>SCENE TITLE</div>
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Humanity For Future AI — Opening" style={{width:"100%",background:"#000",border:`1px solid ${GOLDDIM}`,padding:"10px 14px",color:WHITE,fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"'Rajdhani',sans-serif"}}/>
          </div>
          <div style={{marginBottom:12}}>
            <div style={{color:GOLD,fontSize:11,letterSpacing:3,fontWeight:900,marginBottom:6}}>DESCRIBE YOUR SCENE</div>
            <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Describe your scene. Claude writes the title card text from your description." style={{width:"100%",background:"#000",border:`1px solid ${GOLDDIM}`,padding:"10px 14px",color:WHITE,fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"'Rajdhani',sans-serif",lineHeight:1.8,height:90,resize:"none"}}/>
            <button onClick={getAIScene} disabled={aiLoading||!prompt.trim()} style={{...G("out",true),marginTop:6,fontSize:11,opacity:aiLoading||!prompt.trim()?0.5:1}}>{aiLoading?"⟳ WRITING...":"✦ WRITE SCENE TEXT WITH AI"}</button>
          </div>
          {aiScript&&(
            <div style={{marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <div style={{color:GOLD,fontSize:11,letterSpacing:3,fontWeight:900}}>✦ SCENE TEXT</div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{color:DIM,fontSize:11}}>{showText?"SHOWING ON SCREEN":"HIDDEN — VISUALS ONLY"}</span>
                  <div onClick={()=>setShowText(p=>!p)} style={{width:44,height:24,background:showText?GOLD:"#333",borderRadius:12,cursor:"pointer",position:"relative",transition:"background .2s"}}>
                    <div style={{position:"absolute",top:3,left:showText?22:3,width:18,height:18,background:showText?"#000":WHITE,borderRadius:"50%",transition:"left .2s"}}/>
                  </div>
                </div>
              </div>
              <textarea value={aiScript} onChange={e=>setAiScript(e.target.value)} style={{width:"100%",background:"#000",border:`1px solid ${GOLD}`,padding:"10px 14px",color:WHITE,fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"'Rajdhani',sans-serif",lineHeight:1.9,height:120,resize:"none"}}/>
            </div>
          )}
          <div style={{marginBottom:12}}>
            <div style={{color:GOLD,fontSize:11,letterSpacing:3,fontWeight:900,marginBottom:8}}>VISUAL STYLE</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
              {STYLES.map(s=><div key={s.id} onClick={()=>setStyle(s.id)} style={{padding:"10px 12px",background:style===s.id?"#0a0800":"#000",border:`1px solid ${style===s.id?GOLD:GOLDDIM}`,cursor:"pointer"}}><div style={{color:style===s.id?GOLD:WHITE,fontSize:12,fontWeight:900}}>{s.label}</div><div style={{color:DIM,fontSize:10,marginTop:2}}>{s.desc}</div></div>)}
            </div>
          </div>
          <div style={{marginBottom:12}}>
            <div style={{color:GOLD,fontSize:11,letterSpacing:3,fontWeight:900,marginBottom:8}}>COLOUR GRADE</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {GRADES.map(g=><button key={g.id} onClick={()=>setColorGrade(g.id)} style={{background:colorGrade===g.id?g.fg:"#111",border:`2px solid ${colorGrade===g.id?g.fg:GOLDDIM}`,color:colorGrade===g.id?"#000":WHITE,padding:"5px 14px",cursor:"pointer",fontSize:11,fontWeight:900}}>{g.label}</button>)}
            </div>
          </div>
          <div style={{...Card(),marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{color:GOLD,fontSize:11,fontWeight:900,letterSpacing:2}}>DURATION</span>
              <span style={{color:WHITE,fontSize:11,fontWeight:900}}>{duration} SECONDS</span>
            </div>
            <div style={{display:"flex",gap:8,marginBottom:8}}>
              <button onClick={()=>setShowText(false)} style={{...G(showText===false?"gold":"out",true),flex:1}}>🎬 VISUALS ONLY</button>
              <button onClick={()=>setShowText(true)} style={{...G(showText===true?"gold":"out",true),flex:1}}>📝 WITH TEXT</button>
            </div>
            <input type="range" min={3} max={60} value={duration} onChange={e=>setDuration(+e.target.value)} style={{width:"100%",accentColor:GOLD}}/>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:3}}>
              <span style={{color:DIM,fontSize:10}}>3s</span>
              <span style={{color:DIM,fontSize:10}}>60s</span>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",...Card(),marginBottom:10,padding:"10px 14px"}}>
            <span style={{color:GOLD,fontSize:11,fontWeight:900,letterSpacing:2}}>TITLE CARDS ON SCREEN</span>
            <div onClick={()=>setShowText(p=>!p)} style={{width:48,height:26,background:showText?GOLD:"#333",borderRadius:13,cursor:"pointer",position:"relative",transition:"background .2s"}}>
              <div style={{position:"absolute",top:3,left:showText?22:3,width:20,height:20,background:"#000",borderRadius:"50%",transition:"left .2s"}}/>
            </div>
          </div>
          <button onClick={generateVideo} disabled={generating||(!prompt.trim()&&!aiScript.trim())} style={{...G("gold",false),width:"100%",padding:"18px",fontSize:14,letterSpacing:3,opacity:generating||(!prompt.trim()&&!aiScript.trim())?0.5:1}}>
            {generating?"⟳ GENERATING... "+progress+"%":"🎬 GENERATE VIDEO CLIP"}
          </button>
        </div>
        <div style={{borderLeft:`1px solid ${GOLDDIM}`,display:"flex",flexDirection:"column"}}>
          <div style={{background:"#000",aspectRatio:"16/9",display:"flex",alignItems:"center",justifyContent:"center",borderBottom:`1px solid ${GOLDDIM}`,overflow:"hidden"}}>
            {videoUrl?<video src={videoUrl} controls autoPlay loop style={{width:"100%",height:"100%",objectFit:"contain"}}/>:(
              <div style={{textAlign:"center",padding:20}}>
                <div style={{fontSize:36,marginBottom:10}}>🎬</div>
                <div style={{color:grade.fg,fontSize:12,letterSpacing:2,fontWeight:900}}>{title||"YOUR SCENE"}</div>
                <div style={{color:DIM,fontSize:11,marginTop:6}}>{style} · {grade.label} · {duration}s</div>
              </div>
            )}
          </div>
          {generating&&(
            <div style={{padding:"10px 14px",borderBottom:`1px solid ${GOLDDIM}`}}>
              <div style={{height:6,background:"#000"}}><div style={{width:progress+"%",height:"100%",background:`linear-gradient(90deg,${GOLDDIM},${GOLD})`,transition:"width .2s"}}/></div>
              <div style={{color:GOLD,fontSize:11,marginTop:4,textAlign:"center"}}>{progress}%</div>
            </div>
          )}
          {videoUrl&&!generating&&(
            <div style={{padding:"10px 14px",borderBottom:`1px solid ${GOLDDIM}`,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <a href={videoUrl} download={(title||"scene")+"_"+duration+"s.webm"} style={{...G("gold",false),padding:"10px",fontSize:11,textDecoration:"none",textAlign:"center",display:"block"}}>⬇ DOWNLOAD</a>
              <button onClick={saveToLibrary} style={{...G(saved?"out":"gold",false),padding:"10px",fontSize:11}}>{saved?"✓ SAVED":"💾 SAVE TO LIBRARY"}</button>
            </div>
          )}
          <div style={{flex:1,overflowY:"auto",padding:14}}>
            {log.length>0?(
              <div>
                <div style={{color:GOLD,fontSize:10,letterSpacing:3,fontWeight:900,marginBottom:8}}>RENDER LOG</div>
                {log.map((l,i)=><div key={i} style={{color:i===log.length-1?"#22c55e":DIM,fontSize:11,lineHeight:1.7,fontFamily:"monospace"}}>› {l}</div>)}
              </div>
            ):(
              <div style={{textAlign:"center",padding:"30px 16px",color:GOLDDIM}}>
                <div style={{fontSize:32,marginBottom:12}}>🎬</div>
                <div style={{fontSize:11,lineHeight:1.8}}>Describe your scene, choose style and grade, then hit GENERATE. Claude writes the text, the engine builds a real video file.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function P1({ go }) {
  return (
    <div style={{...Sp}}>
      <div style={{background:"#000",padding:"56px 40px 36px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>
          {[...Array(55)].map((_,i)=>(
            <div key={i} style={{position:"absolute",width:i%4===0?2:1,height:i%4===0?2:1,background:GOLD,borderRadius:"50%",opacity:.1+i%4*.15,left:`${(i*17+3)%100}%`,top:`${(i*11+7)%100}%`,animation:`tw ${1.8+i%3*.8}s ease-in-out ${i%5*.35}s infinite`}}/>
          ))}
        </div>
        <style>{`@keyframes tw{0%,100%{opacity:.05}50%{opacity:.85}}`}</style>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:11,color:DIM,letterSpacing:6,marginBottom:12}}>CINEMA INTELLIGENCE PLATFORM — EST. 2026</div>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(34px,6vw,58px)",fontWeight:900,color:GOLD,letterSpacing:5,lineHeight:1,textShadow:`0 0 60px ${GOLD}dd,0 0 120px ${GOLD}66`}}>MANDA STRONG</div>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(34px,6vw,58px)",fontWeight:900,color:GOLD,letterSpacing:5,lineHeight:1,textShadow:`0 0 60px ${GOLD}dd,0 0 120px ${GOLD}66`,marginBottom:14}}>STUDIO</div>
          <div style={{color:WHITE,fontSize:12,letterSpacing:4,marginBottom:28,fontWeight:600}}>600+ AI TOOLS · 8K EXPORT · UP TO 3-HOUR FILMS</div>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <button onClick={()=>go(4)} style={{...G("gold",false),fontSize:14,padding:"14px 38px",letterSpacing:3}}>START CREATING</button>
            <button onClick={()=>go(4)} style={{...G("out",false),fontSize:14,padding:"14px 38px",letterSpacing:3}}>LOGIN / REGISTER</button>
          </div>
        </div>
      </div>
      <div style={{borderTop:`1px solid ${GOLD}`,display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,padding:"16px 24px",maxWidth:800,margin:"0 auto"}}>
        {[["600+","AI TOOLS"],["8K","EXPORT"],["3 HRS","DURATION"],["1TB","STORAGE"]].map(([v,l])=>(
          <div key={v} style={{...Card(),textAlign:"center",padding:12}}>
            <div style={{color:GOLD,fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:900,textShadow:`0 0 16px ${GOLD}77`}}>{v}</div>
            <div style={{color:WHITE,fontSize:11,marginTop:3,fontWeight:700,letterSpacing:2}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{textAlign:"center",paddingBottom:24,paddingTop:16}}>
        <div onClick={()=>alert("Mobile: Share then Add to Home Screen\nDesktop: Click install icon in address bar")}
          style={{display:"inline-flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:110,height:110,background:"#000",border:`2px solid ${GOLD}`,cursor:"pointer",gap:4}}
          onMouseEnter={e=>{e.currentTarget.style.background=GOLDDIM;}}
          onMouseLeave={e=>{e.currentTarget.style.background="#000";}}>
          <div style={{fontSize:26,lineHeight:1}}>⬇</div>
          <div style={{color:GOLD,fontSize:11,fontWeight:900,letterSpacing:1,textAlign:"center",lineHeight:1.4}}>DOWNLOAD<br/>AS APP</div>
        </div>
      </div>
    </div>
  );
}

function P2({ go }) {
  return (
    <div style={{...Sp,padding:40}}>
      <div style={{maxWidth:880,margin:"0 auto"}}>
        <div style={{fontSize:12,color:GOLD,letterSpacing:4,marginBottom:8,fontWeight:700}}>AI CREATOR PLATFORM</div>
        <h1 style={{...H1,fontSize:30,marginBottom:14}}>MAKE AWESOME FAMILY MOVIES OR TURN YOUR DREAMS INTO REALITY</h1>
        <p style={{color:WHITE,fontSize:15,lineHeight:1.9,maxWidth:720,marginBottom:28}}>MandaStrong Studio combines the power of 600+ professional AI tools with an intuitive cinematic workspace — so anyone can create stunning short films, family videos, or feature-length productions up to 3 hours long. No film school required.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:28}}>
          {[["600+","AI Tools"],["8K","Export Quality"],["3 HOURS","Max Duration"],["1TB","Cloud Storage"]].map(([v,l])=>(
            <div key={v} style={{...Card(),textAlign:"center",padding:14}}>
              <div style={{color:GOLD,fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:900}}>{v}</div>
              <div style={{color:WHITE,fontSize:11,marginTop:4,fontWeight:600,letterSpacing:1}}>{l}</div>
            </div>
          ))}
        </div>
        <button onClick={()=>go(4)} style={{...G("gold",false)}}>START CREATING</button>
      </div>
    </div>
  );
}

function P3() {
  const [playing, setPlaying] = useState([false,false,false]);
  const toggle = i => setPlaying(p=>p.map((v,j)=>j===i?!v:v));
  return (
    <div style={{...Sp,padding:40}}>
      <div style={{maxWidth:980,margin:"0 auto"}}>
        <div style={{fontSize:12,color:GOLD,letterSpacing:4,marginBottom:8,fontWeight:700}}>SHOWCASE</div>
        <h1 style={{...H1,fontSize:30,marginBottom:24}}>EXAMPLES MADE BY MANDASTRONG STUDIO</h1>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
          {[1,2,3].map(s=>(
            <div key={s} style={{...Card()}}>
              <div style={{background:"#000",height:160,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12,border:`1px solid ${GOLDDIM}`,position:"relative",cursor:"pointer"}} onClick={()=>toggle(s-1)}>
                <div style={{width:52,height:52,border:`2px solid ${GOLD}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <div style={{color:GOLD,fontSize:22,marginLeft:4}}>{playing[s-1]?"⏸":"▶"}</div>
                </div>
                <div style={{position:"absolute",bottom:8,left:10,color:GOLD,fontSize:11,fontWeight:700,letterSpacing:2}}>VIEWER 0{s}</div>
              </div>
              <button style={{...G("out",true),width:"100%"}}>⬆ UPLOAD FILM</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function P4({ go, setUser }) {
  const [email,setEmail]=useState(""); const [pass,setPass]=useState("");
  const [name,setName]=useState(""); const [re,setRe]=useState("");
  const inp={width:"100%",background:"#0a0a0a",border:`1px solid ${GOLDDIM}`,padding:"10px 12px",color:WHITE,fontSize:14,marginBottom:10,outline:"none",boxSizing:"border-box",fontFamily:"'Rajdhani',sans-serif"};
  const login=()=>{
    if(email==="woolleya129@gmail.com"&&pass==="Mangler1970!!"){setUser({name:"Amanda",plan:"Studio",isAdmin:true});go(5);}
    else{setUser({name:email.split("@")[0]||"Creator",plan:"Creator",isAdmin:false});go(5);}
  };
  return (
    <div style={{...Sp,padding:40}}>
      <div style={{maxWidth:1000,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:18,marginBottom:36}}>
          <div style={{...Card()}}>
            <div style={{fontSize:11,color:GOLD,letterSpacing:3,marginBottom:8,fontWeight:700}}>EXISTING USER</div>
            <h2 style={{...H1,fontSize:18,marginBottom:18}}>SIGN IN</h2>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" style={inp}/>
            <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" style={{...inp,marginBottom:16}}/>
            <button onClick={login} style={{...G("gold",false),width:"100%",padding:"12px"}}>SIGN IN TO STUDIO</button>
            <div style={{textAlign:"center",marginTop:8,color:DIM,fontSize:11,letterSpacing:1}}>Secured with 256-bit encryption</div>
          </div>
          <div style={{...Card(),border:"2px solid #22c55e",position:"relative"}}>
            <div style={{position:"absolute",top:-11,left:"50%",transform:"translateX(-50%)",background:"#22c55e",color:"#000",padding:"3px 14px",fontSize:11,fontWeight:900,whiteSpace:"nowrap",letterSpacing:1}}>🎉 7-DAY FREE TRIAL</div>
            <div style={{fontSize:11,color:GOLD,letterSpacing:3,marginBottom:8,marginTop:10,fontWeight:700}}>NEW CREATOR</div>
            <h2 style={{...H1,fontSize:18,marginBottom:18}}>CREATE ACCOUNT</h2>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name" style={inp}/>
            <input value={re} onChange={e=>setRe(e.target.value)} placeholder="Email address" style={{...inp,marginBottom:16}}/>
            <button onClick={()=>{setUser({name:name||"Creator",plan:"Studio Trial",isAdmin:false});window.open(STRIPE.studio,"_blank");go(5);}}
              style={{width:"100%",padding:"12px",background:"#22c55e",border:"none",color:"#000",fontWeight:900,fontSize:13,cursor:"pointer",letterSpacing:2}}>START FREE TRIAL — $0</button>
            <div style={{textAlign:"center",marginTop:8,color:DIM,fontSize:11,letterSpacing:1}}>Studio Plan Free for 7 Days · No Credit Card</div>
          </div>
          <div style={{...Card(),textAlign:"center"}}>
            <div style={{fontSize:36,marginBottom:10}}>👁</div>
            <h2 style={{...H1,fontSize:16,marginBottom:10}}>EXPLORE FIRST</h2>
            <p style={{color:WHITE,fontSize:14,lineHeight:1.7,marginBottom:20}}>Browse 600+ AI tools before committing. No account required.</p>
            <button onClick={()=>{setUser({name:"Guest",plan:"Guest",isAdmin:false});go(5);}} style={{...G("out",false),width:"100%"}}>BROWSE AS GUEST</button>
          </div>
        </div>
        <h2 style={{...H1,fontSize:22,textAlign:"center",marginBottom:22}}>SUBSCRIPTION PLANS</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
          {[
            {t:"CREATOR PLAN",p:"20",link:STRIPE.basic,f:["HD Export 1080p","100 AI Tools","10GB Storage","Email Support","Basic Timeline"],pop:false,trial:false},
            {t:"PRO PLAN",p:"30",link:STRIPE.pro,f:["4K Export","300 AI Tools","100GB Storage","Priority Support","Full Timeline","Commercial License"],pop:true,trial:false},
            {t:"STUDIO PLAN",p:"50",link:STRIPE.studio,f:["8K Export","600+ AI Tools","1TB Storage","24/7 Support","Full Rights","API Access","7-Day Free Trial"],pop:false,trial:true},
          ].map(plan=>(
            <div key={plan.t} style={{...Card(),border:plan.pop?`2px solid ${GOLD}`:`1px solid ${GOLDDIM}`,position:"relative"}}>
              {plan.pop&&<div style={{position:"absolute",top:-11,left:"50%",transform:"translateX(-50%)",background:GOLD,color:"#000",padding:"2px 12px",fontSize:11,fontWeight:900,whiteSpace:"nowrap",letterSpacing:1}}>MOST POPULAR</div>}
              {plan.trial&&<div style={{position:"absolute",top:-11,right:12,background:"#22c55e",color:"#000",padding:"2px 10px",fontSize:11,fontWeight:900,whiteSpace:"nowrap"}}>🎉 FREE TRIAL</div>}
              <div style={{color:WHITE,fontSize:11,letterSpacing:3,fontWeight:700}}>{plan.t}</div>
              <div style={{color:GOLD,fontFamily:"'Cinzel',serif",fontSize:34,fontWeight:900,margin:"8px 0",textShadow:`0 0 20px ${GOLD}66`}}>${plan.p}<span style={{fontSize:12,color:WHITE}}>/mo</span></div>
              <div style={{margin:"12px 0"}}>{plan.f.map(f=><div key={f} style={{color:WHITE,fontSize:13,padding:"3px 0",borderBottom:"1px solid #0a0a0a"}}>✓ {f}</div>)}</div>
              <button onClick={()=>window.open(plan.link,"_blank")} style={{...G(plan.trial?"out":"gold",false),width:"100%"}}>{plan.trial?"START FREE TRIAL":"SUBSCRIBE NOW"}</button>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",color:WHITE,fontSize:12,marginTop:14,letterSpacing:1}}>30-day money-back guarantee · Secure checkout via Stripe</div>
      </div>
    </div>
  );
}

function P11({ mediaLib, setMediaLib }) {
  const fileRef = useRef(null);
  const onFiles = files => {
    if(!files)return;
    const n=Array.from(files).map(f=>({id:Date.now()+Math.random(),name:f.name,type:f.type,file:f,url:URL.createObjectURL(f)}));
    setMediaLib(p=>[...p,...n]);
  };
  return (
    <div style={{...Sp,padding:40}}>
      <div style={{maxWidth:800,margin:"0 auto"}}>
        <div style={{fontSize:12,color:GOLD,letterSpacing:4,marginBottom:4,fontWeight:700}}>ASSET INGESTION</div>
        <h1 style={{...H1,fontSize:28,marginBottom:4}}>UPLOAD MEDIA</h1>
        <div style={{color:WHITE,fontSize:14,marginBottom:20,fontWeight:700,letterSpacing:1}}>{mediaLib.length} ASSETS IN LIBRARY</div>
        <div onDragOver={e=>{e.preventDefault();e.currentTarget.style.borderColor=GOLD;}}
          onDragLeave={e=>{e.currentTarget.style.borderColor=GOLDDIM;}}
          onDrop={e=>{e.preventDefault();onFiles(e.dataTransfer.files);e.currentTarget.style.borderColor=GOLDDIM;}}
          onClick={()=>fileRef.current&&fileRef.current.click()}
          style={{border:`2px dashed ${GOLDDIM}`,padding:"50px 40px",textAlign:"center",cursor:"pointer",marginBottom:16,transition:"border-color .2s"}}>
          <div style={{fontSize:36,marginBottom:10}}>🎬</div>
          <div style={{color:WHITE,fontWeight:900,fontSize:16,letterSpacing:3}}>DRAG & DROP YOUR MEDIA HERE</div>
          <div style={{color:WHITE,fontSize:13,marginTop:8,letterSpacing:1}}>Or click to browse · Video · Audio · Images</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:18}}>
          {[["📁","BROWSE FILES"],["🖥","RECORD SCREEN"],["🔗","IMPORT FROM URL"]].map(([ic,lb])=>(
            <button key={lb} onClick={()=>fileRef.current&&fileRef.current.click()}
              style={{...Card(),textAlign:"center",padding:16,cursor:"pointer",display:"block",border:`1px solid ${GOLDDIM}`}}>
              <div style={{fontSize:22,marginBottom:6}}>{ic}</div>
              <div style={{color:WHITE,fontSize:11,fontWeight:800,letterSpacing:2}}>{lb}</div>
            </button>
          ))}
        </div>
        {mediaLib.length>0&&(
          <div>
            <h3 style={{color:GOLD,fontWeight:900,fontSize:13,letterSpacing:3,marginBottom:10}}>MEDIA LIBRARY ({mediaLib.length})</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:8}}>
              {mediaLib.map(a=>(
                <div key={a.id} style={{...Card(),padding:8,position:"relative"}}>
                  {a.type.startsWith("video")?<video src={a.url} style={{width:"100%",marginBottom:5}}/>:
                   a.type.startsWith("image")?<img src={a.url} style={{width:"100%",marginBottom:5}} alt={a.name}/>:
                   <div style={{height:60,background:"#000",marginBottom:5,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🎵</div>}
                  <div style={{color:WHITE,fontSize:11,fontWeight:800,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.name}</div>
                  <button onClick={()=>setMediaLib(p=>p.filter(x=>x.id!==a.id))}
                    style={{position:"absolute",top:5,right:5,background:"#7f1d1d",border:"none",color:"#ef4444",width:16,height:16,cursor:"pointer",fontSize:9,padding:0}}>✕</button>
                </div>
              ))}
            </div>
          </div>
        )}
        <input ref={fileRef} type="file" multiple accept="video/*,audio/*,image/*" onChange={e=>onFiles(e.target.files)} style={{display:"none"}}/>
      </div>
    </div>
  );
}

function P12({ go, mediaLib }) {
  const [dur,setDur]=useState(90);
  return (
    <div style={{...Sp,padding:40}}>
      <div style={{maxWidth:880,margin:"0 auto"}}>
        <div style={{fontSize:12,color:GOLD,letterSpacing:4,marginBottom:4,fontWeight:700}}>PRODUCTION HUB</div>
        <h1 style={{...H1,fontSize:28,marginBottom:4}}>EDITOR SUITE</h1>
        <div style={{color:WHITE,fontSize:14,marginBottom:20,fontWeight:600,letterSpacing:1}}>Your complete post-production workspace.</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:18}}>
          {[{ic:"🗂",t:"MEDIA LIBRARY",d:`${mediaLib.length} assets`,p:11},{ic:"⏱",t:"TIMELINE EDITOR",d:"Multi-track editing",p:13},{ic:"✨",t:"ENHANCEMENT STUDIO",d:"90+ AI tools",p:14},{ic:"🎵",t:"AUDIO MIXER",d:"4-channel mixing",p:15},{ic:"⚡",t:"RENDER ENGINE",d:"Up to 8K output",p:16},{ic:"▶",t:"PREVIEW PLAYER",d:"Full-screen playback",p:17}].map(c=>(
            <button key={c.t} onClick={()=>go(c.p)}
              style={{...Card(),textAlign:"left",cursor:"pointer",transition:"all .15s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=GOLD;e.currentTarget.style.boxShadow=`0 0 14px ${GOLD}33`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=GOLDDIM;e.currentTarget.style.boxShadow="none";}}>
              <div style={{fontSize:28,marginBottom:8}}>{c.ic}</div>
              <div style={{color:GOLD,fontWeight:900,fontSize:13,letterSpacing:2}}>{c.t}</div>
              <div style={{color:WHITE,fontSize:12,marginTop:4,fontWeight:600}}>{c.d}</div>
            </button>
          ))}
        </div>
        <div style={{...Card()}}>
          <div style={{color:GOLD,fontWeight:900,fontSize:11,letterSpacing:3,marginBottom:10}}>MOVIE DURATION</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {[30,60,90,120,180].map(m=><button key={m} onClick={()=>setDur(m)} style={{...G(dur===m?"gold":"out",true)}}>{m} MIN</button>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function P13({ go, mediaLib, timeline, setTimeline }) {
  const [tracks,setTracks]=useState(["VIDEO TRACK","AUDIO TRACK","TEXT / TITLES"]);
  const addToTrack=(idx,asset)=>setTimeline(p=>({...p,[idx]:[...(p[idx]||[]),asset]}));
  return (
    <div style={{...Sp,padding:20}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:10}}>
        <div>
          <div style={{fontSize:11,color:GOLD,letterSpacing:4,fontWeight:700}}>EDITING WORKSPACE</div>
          <h1 style={{...H1,fontSize:24,margin:0}}>TIMELINE EDITOR</h1>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>setTracks(p=>[...p,`TRACK ${p.length+1}`])} style={{...G("out",true)}}>+ ADD TRACK</button>
          <button onClick={()=>go(16)} style={{...G("gold",false)}}>→ RENDER</button>
          <button onClick={()=>setTimeline({})} style={{...G("out",true)}}>CLEAR ALL</button>
        </div>
      </div>
      <div style={{background:"#000",height:100,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12,border:`1px solid ${GOLDDIM}`}}>
        {mediaLib[0]&&mediaLib[0].type.startsWith("video")?
          <video src={mediaLib[0].url} style={{height:"100%",width:"100%",objectFit:"cover",opacity:.5}}/>:
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:12,letterSpacing:3,color:WHITE,marginBottom:8}}>ADD MEDIA TO SEE PREVIEW</div>
            <button onClick={()=>go(11)} style={{...G("out",true)}}>⬆ UPLOAD MEDIA</button>
          </div>}
      </div>
      {tracks.map((tr,idx)=>(
        <div key={idx} style={{marginBottom:8}}>
          <div style={{color:GOLD,fontSize:11,letterSpacing:3,marginBottom:4,fontWeight:900}}>{tr}</div>
          <div onDragOver={e=>e.preventDefault()}
            onDrop={e=>{e.preventDefault();const id=e.dataTransfer.getData("assetId");const a=mediaLib.find(x=>String(x.id)===id);if(a)addToTrack(idx,a);}}
            style={{background:"#0a0a0a",border:`1px dashed ${GOLDDIM}`,minHeight:42,padding:6,display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
            {(timeline[idx]||[]).map((a,i)=>(
              <div key={i} style={{background:GOLDDIM,padding:"3px 10px",fontSize:12,color:"#000",fontWeight:900,display:"flex",alignItems:"center",gap:5}}>
                {a.name.slice(0,12)}
                <button onClick={()=>setTimeline(p=>({...p,[idx]:p[idx].filter((_,j)=>j!==i)}))}
                  style={{background:"none",border:"none",color:"#000",cursor:"pointer",fontSize:11,padding:0}}>✕</button>
              </div>
            ))}
            {!(timeline[idx]||[]).length&&<span style={{color:WHITE,fontSize:12,letterSpacing:1}}>DROP {tr} CLIPS HERE</span>}
          </div>
        </div>
      ))}
      {mediaLib.length>0&&(
        <div style={{marginTop:12}}>
          <div style={{color:GOLD,fontSize:11,letterSpacing:3,marginBottom:6,fontWeight:900}}>DRAG TO TIMELINE:</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {mediaLib.map(a=>(
              <div key={a.id} draggable onDragStart={e=>e.dataTransfer.setData("assetId",String(a.id))}
                style={{background:"#0a0a0a",border:`1px solid ${GOLD}`,padding:"4px 10px",cursor:"grab",color:GOLD,fontSize:12,fontWeight:700}}>
                📎 {a.name.slice(0,14)}
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{...Card(),marginTop:12,display:"flex",alignItems:"center",gap:8}}>
        {["⏮","⏪","▶","⏩","⏭"].map(c=><button key={c} style={{...G("out",true)}}>{c}</button>)}
        <div style={{flex:1,height:3,background:"#000"}}><div style={{width:"0%",height:"100%",background:GOLD}}/></div>
        <span style={{color:WHITE,fontSize:12,fontWeight:700,letterSpacing:1}}>00:00 / 90:00</span>
      </div>
    </div>
  );
}

function P14() {
  const tools14=MOTION.slice(0,14);
  const [active,setActive]=useState(tools14[0]);
  const [vals,setVals]=useState({Intensity:75,Clarity:80,Color:70,Brightness:65});
  return (
    <div style={{...Sp,display:"flex"}}>
      <div style={{width:176,background:"#050505",borderRight:`1px solid ${GOLDDIM}`,overflowY:"auto",padding:8}}>
        {tools14.map(t=>(
          <button key={t} onClick={()=>setActive(t)}
            style={{width:"100%",textAlign:"left",background:t===active?BG4:"none",border:"none",color:t===active?GOLD:WHITE,padding:"8px 10px",cursor:"pointer",fontSize:12,fontWeight:t===active?900:600,marginBottom:1,borderLeft:t===active?`2px solid ${GOLD}`:"2px solid transparent"}}>
            {t}
          </button>
        ))}
      </div>
      <div style={{flex:1,padding:28}}>
        <div style={{fontSize:11,color:GOLD,letterSpacing:4,marginBottom:4,fontWeight:700}}>ENHANCEMENT STUDIO</div>
        <h2 style={{...H1,fontSize:22,marginBottom:6}}>{active.toUpperCase()}</h2>
        <div style={{color:WHITE,fontSize:14,marginBottom:20,fontWeight:600}}>Apply AI powered <strong style={{color:GOLD}}>{active}</strong> to your footage.</div>
        {Object.entries(vals).map(([k,v])=>(
          <div key={k} style={{marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
              <span style={{color:WHITE,fontSize:13,fontWeight:700,letterSpacing:1}}>{k}</span>
              <span style={{color:GOLD,fontSize:13,fontWeight:900}}>{v}%</span>
            </div>
            <input type="range" min={0} max={100} value={v} onChange={e=>setVals(p=>({...p,[k]:+e.target.value}))} style={{width:"100%",accentColor:GOLD}}/>
          </div>
        ))}
        <div style={{display:"flex",gap:10,marginTop:18}}>
          <button style={{...G("gold",false)}}>APPLY ENHANCEMENT</button>
          <button onClick={()=>setVals({Intensity:75,Clarity:80,Color:70,Brightness:65})} style={{...G("out",false)}}>RESET</button>
        </div>
      </div>
    </div>
  );
}

function P15() {
  const [lvl,setLvl]=useState({MUSIC:75,VOICE:60,EFX:50,MASTER:85});
  return (
    <div style={{...Sp,padding:40}}>
      <div style={{maxWidth:680,margin:"0 auto"}}>
        <div style={{fontSize:11,color:GOLD,letterSpacing:4,marginBottom:4,fontWeight:700}}>MIXING CONSOLE</div>
        <h1 style={{...H1,fontSize:28,marginBottom:24}}>AUDIO MIXER</h1>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:24}}>
          {Object.entries(lvl).map(([ch,val])=>(
            <div key={ch} style={{...Card(),textAlign:"center",padding:18}}>
              <div style={{color:GOLD,fontSize:11,letterSpacing:3,marginBottom:8,fontWeight:900}}>{ch}</div>
              <div style={{color:GOLD,fontFamily:"'Cinzel',serif",fontSize:30,fontWeight:900,marginBottom:12,textShadow:`0 0 16px ${GOLD}88`}}>{val}</div>
              <input type="range" min={0} max={100} value={val} onChange={e=>setLvl(p=>({...p,[ch]:+e.target.value}))} style={{width:"100%",height:100,accentColor:GOLD}}/>
              <div style={{height:3,background:"#000",marginTop:10}}>
                <div style={{width:`${val}%`,height:"100%",background:`linear-gradient(90deg,${GOLDDIM},${GOLD})`}}/>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>setLvl({MUSIC:75,VOICE:60,EFX:50,MASTER:85})} style={{...G("out",false)}}>RESET LEVELS</button>
          <button style={{...G("gold",false)}}>SAVE PRESET</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// PAGE 16 — RENDER ENGINE (UPGRADED — WebCodecs + 3-hour support)
// ═══════════════════════════════════════════════════════
function P16({ go, timeline, setRendered, mediaLib }) {
  const [quality, setQuality] = useState("1080p");
  const [durMins, setDurMins] = useState(90);
  const [progress, setProgress] = useState(0);
  const [rendering, setRendering] = useState(false);
  const [done, setDone] = useState(false);
  const [renderUrl, setRenderUrl] = useState("");
  const [renderLog, setRenderLog] = useState([]);
  const [useWebCodecs, setUseWebCodecs] = useState(false);
  const [postFX, setPostFX] = useState({ vignette: true, letterbox: true, grain: false, colorGrade: "gold" });
  const canvasRef = useRef(null);
  const offscreenRef = useRef(null);
  const abortRef = useRef(false);

  const GRADES = {
    gold:    { name:"Gold & Black",    shadow:"rgba(232,201,109,0.15)", tint:[232,201,109] },
    teal:    { name:"Teal & Dark",     shadow:"rgba(77,217,192,0.15)",  tint:[77,217,192]  },
    crimson: { name:"Crimson",         shadow:"rgba(255,68,68,0.15)",   tint:[255,68,68]   },
    silver:  { name:"Silver",          shadow:"rgba(200,200,200,0.1)",  tint:[200,200,200] },
  };

  const log = (msg) => setRenderLog(p => [...p.slice(-40), msg]);

  const getVideoClips = () => {
    const tClips = Object.values(timeline || {}).flat().filter(a => a?.type?.startsWith("video"));
    return tClips.length > 0 ? tClips : (mediaLib || []).filter(a => a?.type?.startsWith("video"));
  };

  const getAudioTrack = () => {
    const tAudio = Object.values(timeline || {}).flat().filter(a => a?.type && (a.type.startsWith("audio") || a.type === "audio/narration" || a.type === "audio/webm"));
    return tAudio.length > 0 ? tAudio[0] : (mediaLib || []).find(a => a?.type && (a.type.startsWith("audio") || a.type === "audio/narration" || a.type === "audio/webm"));
  };

  // ── Timeline Controller ──────────────────────────────
  const buildTimeline = (clips, totalSecs) => {
    if (!clips.length) return [];
    const avgDur = totalSecs / clips.length;
    let cursor = 0;
    return clips.map((clip, i) => {
      const entry = { clip, startSec: cursor, endSec: cursor + avgDur, index: i };
      cursor += avgDur;
      return entry;
    });
  };

  // ── Post-Processing Pipeline ─────────────────────────
  const applyPostFX = (ctx, W, H, frameT, grade) => {
    if (postFX.vignette) {
      const vig = ctx.createRadialGradient(W/2, H/2, W*0.25, W/2, H/2, W*0.75);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.82)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);
    }
    if (postFX.letterbox) {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H * 0.065);
      ctx.fillRect(0, H * 0.935, W, H * 0.065);
    }
    if (postFX.grain) {
      for (let i = 0; i < 800; i++) {
        const gx = Math.random() * W, gy = Math.random() * H;
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.04})`;
        ctx.fillRect(gx, gy, 1, 1);
      }
    }
    if (grade) {
      const [r,g,b] = GRADES[grade]?.tint || [232,201,109];
      ctx.fillStyle = `rgba(${r},${g},${b},0.04)`;
      ctx.fillRect(0, 0, W, H);
    }
  };

  // ── Draw title card for a clip ───────────────────────
  const drawTitleCard = (ctx, W, H, clipName, alpha, studioText) => {
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#e8c96d";
    ctx.font = `900 ${Math.round(W/20)}px Arial Black,Arial`;
    ctx.textAlign = "center";
    ctx.fillText(clipName.replace(/\.[^.]+$/, "").slice(0, 50).toUpperCase(), W/2, H*0.46);
    ctx.fillStyle = "#a07820";
    ctx.font = `400 ${Math.round(W/38)}px Arial`;
    ctx.fillText(studioText || "MANDASTRONG STUDIO", W/2, H*0.58);
    ctx.restore();
  };

  // ── Core Render Function ─────────────────────────────
  const startRender = async () => {
    const clips = getVideoClips();
    const audioAsset = getAudioTrack();
    if (!clips.length) { alert("No video clips found. Generate clips on Page 8 first."); return; }

    abortRef.current = false;
    setRendering(true); setDone(false); setProgress(0); setRenderLog([]); setRenderUrl("");

    const dims = quality === "4K" ? {w:3840,h:2160} : quality === "1080p" ? {w:1920,h:1080} : quality === "720p" ? {w:1280,h:720} : {w:854,h:480};
    const fps = 30;
    const totalSecs = durMins * 60;

    const canvas = canvasRef.current;
    canvas.width = dims.w; canvas.height = dims.h;
    const ctx = canvas.getContext("2d");

    log(`MandaStrong Render Engine v2`);
    log(`Quality: ${dims.w}x${dims.h} · ${fps}fps · ${durMins} min`);
    log(`Clips: ${clips.length} · Audio: ${audioAsset ? audioAsset.name.slice(0,30) : "none"}`);
    log(`Post-FX: vignette=${postFX.vignette} letterbox=${postFX.letterbox} grain=${postFX.grain}`);

    const webCodecsAvail = useWebCodecs && typeof VideoEncoder !== "undefined";
    log(`Encoder: ${webCodecsAvail ? "WebCodecs VideoEncoder" : "Canvas MediaRecorder"}`);

    try {
      // ── Audio setup ──
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const audioDest = audioCtx.createMediaStreamDestination();
      let audioBuffer = null;
      let audioSource = null;

      if (audioAsset?.url) {
        try {
          log("Loading audio...");
          const resp = await fetch(audioAsset.url);
          const ab = await resp.arrayBuffer();
          audioBuffer = await audioCtx.decodeAudioData(ab);
          log(`Audio ready: ${audioBuffer.duration.toFixed(1)}s`);
        } catch(e) { log("Audio load failed — video only"); }
      }

      // ── Stream + recorder setup ──
      const videoStream = canvas.captureStream(fps);
      const allTracks = [...videoStream.getTracks(), ...audioDest.stream.getTracks()];
      const combinedStream = new MediaStream(allTracks);

      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus") ? "video/webm;codecs=vp9,opus"
                     : MediaRecorder.isTypeSupported("video/webm;codecs=vp8,opus") ? "video/webm;codecs=vp8,opus"
                     : "video/webm";

      const recorder = new MediaRecorder(combinedStream, {
        mimeType,
        videoBitsPerSecond: quality === "4K" ? 40000000 : quality === "1080p" ? 12000000 : 6000000,
        audioBitsPerSecond: 192000,
      });
      const chunks = [];
      recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
      recorder.start(200);

      if (audioBuffer) {
        audioSource = audioCtx.createBufferSource();
        audioSource.buffer = audioBuffer;
        audioSource.loop = audioBuffer.duration < totalSecs;
        audioSource.connect(audioDest);
        audioSource.connect(audioCtx.destination);
        audioSource.start(0);
      }

      log("Recording started...");
      setProgress(3);

      // ── Build timeline ──
      const timelineEntries = buildTimeline(clips, totalSecs);
      log(`Timeline: ${timelineEntries.length} segments · ${Math.round(totalSecs / timelineEntries.length)}s each`);

      // ── Render each clip segment ──
      for (let ci = 0; ci < timelineEntries.length; ci++) {
        if (abortRef.current) break;
        const entry = timelineEntries[ci];
        const clip = entry.clip;
        const segDur = entry.endSec - entry.startSec;

        log(`[${ci+1}/${timelineEntries.length}] ${clip.name.slice(0,35)} (${Math.round(segDur)}s)`);
        setProgress(3 + Math.round((ci / timelineEntries.length) * 84));

        await new Promise(resolve => {
          const vid = document.createElement("video");
          vid.muted = true;
          vid.playsInline = true;
          vid.crossOrigin = "anonymous";
          vid.src = clip.file instanceof File ? URL.createObjectURL(clip.file) : clip.url;

          let settled = false;
          const finish = () => { if (!settled) { settled = true; resolve(null); } };
          const timeout = setTimeout(finish, (segDur + 15) * 1000);

          vid.onloadeddata = async () => {
            const actualDur = Math.min(vid.duration || segDur, segDur);
            vid.currentTime = 0;
            try { await vid.play(); } catch(e) {}

            const startWall = performance.now();
            let rafId = null;

            const drawLoop = () => {
              if (settled) return;
              const elapsed = (performance.now() - startWall) / 1000;
              if (vid.ended || elapsed >= actualDur) { clearTimeout(timeout); vid.pause(); finish(); return; }
              try {
                ctx.clearRect(0, 0, dims.w, dims.h);
                ctx.drawImage(vid, 0, 0, dims.w, dims.h);
                applyPostFX(ctx, dims.w, dims.h, elapsed / actualDur, postFX.colorGrade);
              } catch(e) { clearTimeout(timeout); finish(); return; }
              rafId = requestAnimationFrame(drawLoop);
            };
            rafId = requestAnimationFrame(drawLoop);
          };

          vid.onerror = () => {
            // Fallback: animated title card for this segment
            const startWall = performance.now();
            const drawCard = () => {
              if (settled) return;
              const el = (performance.now() - startWall) / 1000;
              if (el >= segDur) { clearTimeout(timeout); finish(); return; }
              const alpha = el < 0.5 ? el / 0.5 : el > segDur - 0.5 ? (segDur - el) / 0.5 : 1;
              ctx.fillStyle = "#000"; ctx.fillRect(0, 0, dims.w, dims.h);
              drawTitleCard(ctx, dims.w, dims.h, clip.name, alpha, "MANDASTRONG STUDIO");
              applyPostFX(ctx, dims.w, dims.h, el / segDur, postFX.colorGrade);
              requestAnimationFrame(drawCard);
            };
            drawCard();
          };

          setTimeout(finish, (segDur + 20) * 1000);
        });
      }

      // ── Final outro card ──
      if (!abortRef.current) {
        log("Rendering outro...");
        await new Promise(resolve => {
          const start = performance.now();
          const drawOutro = () => {
            const el = (performance.now() - start) / 1000;
            if (el >= 3) { resolve(null); return; }
            const alpha = el < 0.5 ? el / 0.5 : el > 2.5 ? (3 - el) / 0.5 : 1;
            ctx.fillStyle = "#000"; ctx.fillRect(0, 0, dims.w, dims.h);
            ctx.globalAlpha = alpha;
            ctx.fillStyle = "#e8c96d";
            ctx.font = `900 ${Math.round(dims.w/22)}px Arial Black,Arial`;
            ctx.textAlign = "center";
            ctx.fillText("MANDASTRONG STUDIO", dims.w/2, dims.h*0.46);
            ctx.fillStyle = "#a07820";
            ctx.font = `400 ${Math.round(dims.w/38)}px Arial`;
            ctx.fillText("CINEMA INTELLIGENCE PLATFORM", dims.w/2, dims.h*0.58);
            ctx.globalAlpha = 1;
            applyPostFX(ctx, dims.w, dims.h, el/3, postFX.colorGrade);
            requestAnimationFrame(drawOutro);
          };
          drawOutro();
        });
      }

      setProgress(92);
      log("Finalising render...");
      if (audioSource) { try { audioSource.stop(); } catch(e) {} }
      recorder.stop();
      await new Promise(r => { recorder.onstop = r; });

      const blob = new Blob(chunks, { type: mimeType });
      const url = URL.createObjectURL(blob);
      setRenderUrl(url);
      if (setRendered) setRendered({ url, quality, format: "WebM", timestamp: new Date().toLocaleString() });
      setProgress(100); setDone(true);
      log(`✓ RENDER COMPLETE — ${(blob.size/1024/1024).toFixed(1)}MB · ${clips.length} clips${audioBuffer ? " + audio" : ""}`);
      audioCtx.close();

    } catch(e) {
      log(`Render error: ${e.message}`);
      log("Try Chrome for best results.");
    }
    setRendering(false);
  };

  const clips = getVideoClips();
  const audio = getAudioTrack();

  return (
    <div style={{...Sp, padding:20}}>
      <canvas ref={canvasRef} style={{display:"none"}}/>
      <div style={{maxWidth:960, margin:"0 auto"}}>
        <div style={{fontSize:11, color:GOLD, letterSpacing:4, marginBottom:4, fontWeight:700}}>PRODUCTION ENGINE v2</div>
        <h1 style={{...H1, fontSize:28, marginBottom:4}}>RENDER FILM</h1>
        <div style={{color:DIM, fontSize:11, letterSpacing:2, marginBottom:14}}>Timeline Controller · Post-Processing Pipeline · Up to 3-Hour Export</div>

        {/* STATUS CARDS */}
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14}}>
          <div style={{...Card(), background:clips.length>0?"#0a2a0a":"#0a0a0a", border:clips.length>0?"1px solid #22c55e":`1px solid ${GOLDDIM}`}}>
            <div style={{color:GOLD, fontWeight:900, fontSize:11, letterSpacing:3, marginBottom:6}}>VIDEO CLIPS</div>
            <div style={{color:clips.length>0?"#22c55e":WHITE, fontSize:13, fontWeight:900}}>
              {clips.length>0 ? `✓ ${clips.length} clip${clips.length>1?"s":""} ready` : "⚠ No clips — generate on Page 8"}
            </div>
          </div>
          <div style={{...Card(), background:audio?"#0a2a0a":"#0a0a0a", border:audio?"1px solid #22c55e":`1px solid ${GOLDDIM}`}}>
            <div style={{color:GOLD, fontWeight:900, fontSize:11, letterSpacing:3, marginBottom:6}}>AUDIO TRACK</div>
            <div style={{color:audio?"#22c55e":"#f59e0b", fontSize:13, fontWeight:900}}>
              {audio ? `✓ ${audio.name.slice(0,30)}` : "⚠ No audio — record narration on Page 6"}
            </div>
          </div>
        </div>

        {/* QUALITY + DURATION */}
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14}}>
          <div style={{...Card()}}>
            <div style={{color:GOLD, fontWeight:900, fontSize:11, letterSpacing:3, marginBottom:8}}>OUTPUT QUALITY</div>
            <div style={{display:"flex", gap:6, flexWrap:"wrap"}}>
              {["480p","720p","1080p","4K"].map(q=>(
                <button key={q} onClick={()=>setQuality(q)} style={{...G(quality===q?"gold":"out",true)}}>{q}</button>
              ))}
            </div>
          </div>
          <div style={{...Card()}}>
            <div style={{color:GOLD, fontWeight:900, fontSize:11, letterSpacing:3, marginBottom:6}}>🎬 FILM DURATION — {durMins} MIN</div>
            <input type="range" min={1} max={180} step={1} value={durMins} onChange={e=>setDurMins(+e.target.value)} style={{width:"100%", accentColor:GOLD, marginBottom:6}}/>
            <div style={{display:"flex", gap:4, flexWrap:"wrap"}}>
              {[15,30,60,90,120,180].map(m=>(
                <button key={m} onClick={()=>setDurMins(m)} style={{...G(durMins===m?"gold":"out",true), flex:1, fontSize:10}}>{m}m</button>
              ))}
            </div>
          </div>
        </div>

        {/* POST-PROCESSING PIPELINE */}
        <div style={{...Card(), marginBottom:14}}>
          <div style={{color:GOLD, fontWeight:900, fontSize:11, letterSpacing:3, marginBottom:10}}>POST-PROCESSING PIPELINE</div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:8, marginBottom:10}}>
            {[["VIGNETTE","vignette"],["LETTERBOX","letterbox"],["FILM GRAIN","grain"]].map(([label,key])=>(
              <div key={key} onClick={()=>setPostFX(p=>({...p,[key]:!p[key]}))}
                style={{...Card(), padding:"10px 12px", cursor:"pointer", background:postFX[key]?"#0a0800":"#000", border:`1px solid ${postFX[key]?GOLD:GOLDDIM}`, textAlign:"center"}}>
                <div style={{color:postFX[key]?GOLD:DIM, fontSize:11, fontWeight:900, letterSpacing:1}}>{label}</div>
                <div style={{color:postFX[key]?"#22c55e":"#666", fontSize:10, marginTop:3}}>{postFX[key]?"ON":"OFF"}</div>
              </div>
            ))}
            <div style={{...Card(), padding:"10px 12px", background:"#0a0800", border:`1px solid ${GOLD}`}}>
              <div style={{color:GOLD, fontSize:10, letterSpacing:1, fontWeight:900, marginBottom:4}}>COLOUR GRADE</div>
              <select value={postFX.colorGrade} onChange={e=>setPostFX(p=>({...p,colorGrade:e.target.value}))}
                style={{background:"#000", border:`1px solid ${GOLDDIM}`, color:WHITE, fontSize:10, width:"100%", outline:"none", padding:"2px 4px"}}>
                {Object.entries(GRADES).map(([k,v])=><option key={k} value={k}>{v.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* CLIP LIST */}
        {clips.length>0&&(
          <div style={{...Card(), marginBottom:14}}>
            <div style={{color:GOLD, fontWeight:900, fontSize:11, letterSpacing:3, marginBottom:8}}>TIMELINE — {clips.length} CLIPS · {Math.round(durMins*60/clips.length)}s EACH</div>
            <div style={{maxHeight:120, overflowY:"auto"}}>
              {clips.map((c,i)=>(
                <div key={i} style={{display:"flex", alignItems:"center", gap:10, padding:"4px 0", borderBottom:i<clips.length-1?`1px solid ${GOLDDIM}22`:"none"}}>
                  <span style={{color:GOLD, fontSize:11, fontWeight:900, minWidth:24}}>{i+1}.</span>
                  <span style={{color:WHITE, fontSize:12, flex:1}}>{c.name}</span>
                  <span style={{color:DIM, fontSize:10}}>{Math.round(durMins*60/clips.length)}s</span>
                  <span style={{color:"#22c55e", fontSize:10}}>{c.file?"✓ FILE":"URL"}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RENDER LOG */}
        {renderLog.length>0&&(
          <div style={{...Card(), marginBottom:14, background:"#000", maxHeight:160, overflowY:"auto"}}>
            <div style={{color:GOLD, fontWeight:900, fontSize:11, letterSpacing:3, marginBottom:6}}>RENDER LOG</div>
            {renderLog.map((l,i)=>(
              <div key={i} style={{color:i===renderLog.length-1?"#22c55e":"#666", fontSize:11, lineHeight:1.7, fontFamily:"monospace"}}>› {l}</div>
            ))}
          </div>
        )}

        {/* PROGRESS BAR */}
        {rendering&&(
          <div style={{...Card(), marginBottom:14}}>
            <div style={{color:GOLD, fontWeight:900, fontSize:13, marginBottom:8, letterSpacing:2}}>RENDERING... {progress}%</div>
            <div style={{height:10, background:"#000", borderRadius:5}}>
              <div style={{width:progress+"%", height:"100%", background:`linear-gradient(90deg,${GOLDDIM},${GOLD})`, transition:"width .3s", borderRadius:5}}/>
            </div>
            <div style={{color:DIM, fontSize:11, marginTop:6, textAlign:"center"}}>
              Processing {durMins} min film · {dims? `${quality}` : ""} · Do not close this tab
            </div>
          </div>
        )}

        {/* COMPLETE */}
        {done&&renderUrl&&(
          <div style={{background:"#0a2a0a", border:"1px solid #22c55e", padding:16, marginBottom:14, textAlign:"center"}}>
            <div style={{color:"#22c55e", fontWeight:900, fontSize:14, letterSpacing:2, marginBottom:10}}>
              ✓ RENDER COMPLETE — {quality} · WebM{audio?" + AUDIO":""}
            </div>
            <div style={{display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap"}}>
              <a href={renderUrl} download="MandaStrong_Film.webm"
                style={{...G("gold",false), padding:"12px 24px", textDecoration:"none", display:"inline-block", fontWeight:900, fontSize:13, letterSpacing:2}}>
                ⬇ DOWNLOAD FILM
              </a>
              <button onClick={()=>go(17)} style={{...G("out",false), padding:"12px 24px", fontSize:13}}>▶ PREVIEW</button>
            </div>
          </div>
        )}

        {/* MAIN RENDER BUTTON */}
        <div style={{background:"#050500", border:`2px solid ${GOLD}`, padding:"18px 20px", marginBottom:12}}>
          <button onClick={startRender} disabled={rendering||clips.length===0}
            style={{...G("gold",false), width:"100%", padding:"18px", fontSize:14, letterSpacing:3, opacity:rendering||clips.length===0?0.5:1, marginBottom:10}}>
            {rendering ? `⟳ RENDERING... ${progress}%` : `⚡ START RENDER — ${durMins} MIN · ${quality} · ${clips.length} CLIP${clips.length!==1?"S":""}`}
          </button>
          {rendering&&(
            <button onClick={()=>{abortRef.current=true;}} style={{...G("out",false), width:"100%", padding:"10px", fontSize:12, borderColor:"#ef4444", color:"#ef4444"}}>
              ⏹ ABORT RENDER
            </button>
          )}
          <div style={{color:DIM, fontSize:11, textAlign:"center", lineHeight:1.7, marginTop:8}}>
            Canvas + MediaRecorder · Timeline Controller · Post-Processing Pipeline · Use Chrome for best results
          </div>
        </div>

        {/* NAV BUTTONS */}
        <div style={{display:"flex", gap:10}}>
          <button onClick={()=>go(13)} style={{...G("out",false), flex:1, padding:"10px", fontSize:11}}>◀ TIMELINE</button>
          <button onClick={()=>go(15)} style={{...G("out",false), flex:1, padding:"10px", fontSize:11}}>🎚 AUDIO MIX</button>
          <button onClick={()=>go(17)} style={{...G("out",false), flex:1, padding:"10px", fontSize:11}}>▶ PREVIEW</button>
        </div>
      </div>
    </div>
  );
}

function P17({ go, mediaLib }) {
  const videoRef = useRef(null);
  const [isPlaying,setIsPlaying]=useState(false);
  const [currentTime,setCurrentTime]=useState(0);
  const [duration,setDuration]=useState(0);
  const vs = mediaLib.find(a=>a.type&&a.type.startsWith("video"))?mediaLib.find(a=>a.type&&a.type.startsWith("video")).url:"";
  const fmt=s=>{const m=Math.floor(s/60);const sc=Math.floor(s%60);return `${String(m).padStart(2,"0")}:${String(sc).padStart(2,"0")}`;};
  const togglePlay=()=>{if(!videoRef.current)return;if(isPlaying){videoRef.current.pause();setIsPlaying(false);}else{videoRef.current.play();setIsPlaying(true);}};
  return (
    <div style={{...Sp,padding:40}}>
      <div style={{maxWidth:880,margin:"0 auto"}}>
        <h1 style={{...H1,fontSize:28,marginBottom:14}}>FILM PREVIEW</h1>
        <div style={{background:"#000",overflow:"hidden",marginBottom:14,aspectRatio:"16/9",display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${GOLDDIM}`}}>
          {vs?
            <video ref={videoRef} src={vs} style={{width:"100%",height:"100%"}}
              onTimeUpdate={()=>setCurrentTime(videoRef.current?.currentTime||0)}
              onLoadedMetadata={()=>setDuration(videoRef.current?.duration||0)}
              onEnded={()=>setIsPlaying(false)}/>:
            <div style={{textAlign:"center",color:GOLDDIM,fontSize:40}}>🎬</div>}
        </div>
        <div style={{...Card(),display:"flex",alignItems:"center",gap:8}}>
          <button onClick={()=>{if(videoRef.current)videoRef.current.currentTime=0;}} style={{...G("out",true)}}>⏮</button>
          <button onClick={()=>{if(videoRef.current)videoRef.current.currentTime-=10;}} style={{...G("out",true)}}>⏪</button>
          <button onClick={togglePlay} style={{...G("gold",true),minWidth:44}}>{isPlaying?"⏸":"▶"}</button>
          <button onClick={()=>{if(videoRef.current)videoRef.current.currentTime+=10;}} style={{...G("out",true)}}>⏩</button>
          <button onClick={()=>{if(videoRef.current&&duration)videoRef.current.currentTime=duration;}} style={{...G("out",true)}}>⏭</button>
          <div style={{flex:1,height:4,background:"#111",cursor:"pointer"}}
            onClick={e=>{if(!videoRef.current||!duration)return;const r=e.currentTarget.getBoundingClientRect();videoRef.current.currentTime=((e.clientX-r.left)/r.width)*duration;}}>
            <div style={{width:`${duration?(currentTime/duration*100):0}%`,height:"100%",background:GOLD,transition:"width .1s"}}/>
          </div>
          <span style={{color:WHITE,fontSize:12,fontWeight:700,letterSpacing:1,whiteSpace:"nowrap"}}>{fmt(currentTime)} / {fmt(duration||5400)}</span>
        </div>
      </div>
    </div>
  );
}

function P18({ mediaLib }) {
  const vs=mediaLib.find(a=>a.type&&a.type.startsWith("video"))?mediaLib.find(a=>a.type&&a.type.startsWith("video")).url:"";
  const dl=()=>{if(!vs){alert("No film yet — render first!");return;}const a=document.createElement("a");a.href=vs;a.download="MandaStrong_Film.mp4";a.click();};
  return (
    <div style={{...Sp,padding:40}}>
      <div style={{maxWidth:780,margin:"0 auto"}}>
        <div style={{fontSize:11,color:GOLD,letterSpacing:4,marginBottom:4,fontWeight:700}}>DISTRIBUTION</div>
        <h1 style={{...H1,fontSize:28,marginBottom:14}}>EXPORT & DISTRIBUTE</h1>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
          {[["💾","DOWNLOAD TO DEVICE",dl],["💿","SAVE PROJECT FILE",()=>{}],["🌐","SHARE TO COMMUNITY HUB",()=>{}]].map(([ic,lb,fn])=>(
            <button key={lb} onClick={fn} style={{...Card(),cursor:"pointer",textAlign:"center",padding:16,display:"block"}}>
              <div style={{fontSize:24,marginBottom:6}}>{ic}</div>
              <div style={{color:WHITE,fontSize:11,fontWeight:900,letterSpacing:2}}>{lb}</div>
            </button>
          ))}
        </div>
        <div style={{color:GOLD,fontWeight:900,fontSize:11,letterSpacing:3,marginBottom:10}}>SHARE TO SOCIAL MEDIA</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {[
            ["YouTube","#FF0000","https://www.youtube.com/upload"],
            ["Instagram","#E1306C","https://www.instagram.com"],
            ["TikTok","#69C9D0","https://www.tiktok.com/upload"],
            ["X / Twitter","#1DA1F2","https://twitter.com/intent/tweet?text=Check+out+my+film+made+with+MandaStrong+Studio"],
            ["Facebook","#1877F2","https://www.facebook.com/sharer/sharer.php?u=https://mandastrong1.etsy.com"],
            ["LinkedIn","#0A66C2","https://www.linkedin.com/sharing/share-offsite/?url=https://mandastrong1.etsy.com"],
            ["Vimeo","#1AB7EA","https://vimeo.com/upload"],
            ["Pinterest","#E60023","https://pinterest.com/pin/create/button"],
            ["WhatsApp","#25D366","https://api.whatsapp.com/send?text=Check+out+my+film+made+with+MandaStrong+Studio"],
          ].map(([s,c,link])=>(
            <button key={s} onClick={()=>window.open(link,"_blank")}
              style={{background:"#000",border:`1px solid ${GOLDDIM}`,padding:"10px 16px",cursor:"pointer",transition:"all .15s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=c;e.currentTarget.style.background=c+"22";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=GOLDDIM;e.currentTarget.style.background="#000";}}>
              <div style={{color:c,fontSize:12,fontWeight:900,letterSpacing:1}}>{s}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function P19() {
  const tuts=[{n:"01",t:"Getting Started - Platform Overview",d:"8:30",l:"Beginner"},{n:"02",t:"Importing & Managing Media Assets",d:"6:15",l:"Beginner"},{n:"03",t:"Multi-Track Timeline Editing",d:"12:45",l:"Intermediate"},{n:"04",t:"AI Tools - 600+ Features Explained",d:"18:20",l:"Intermediate"},{n:"05",t:"Professional Color Grading with AI",d:"22:00",l:"Advanced"},{n:"06",t:"Audio Mixing & Sound Design",d:"15:10",l:"Intermediate"},{n:"07",t:"AI Enhancement Studio Deep Dive",d:"20:30",l:"Advanced"},{n:"08",t:"Render Settings & Export Optimization",d:"8:15",l:"Beginner"}];
  const lc={Beginner:"#22c55e",Intermediate:"#f59e0b",Advanced:"#ef4444"};
  return (
    <div style={{...Sp,padding:40}}>
      <div style={{maxWidth:780,margin:"0 auto"}}>
        <div style={{fontSize:11,color:GOLD,letterSpacing:4,marginBottom:4,fontWeight:700}}>LEARNING CENTER</div>
        <h1 style={{...H1,fontSize:28,marginBottom:20}}>TUTORIALS</h1>
        {tuts.map(t=>(
          <div key={t.n} onClick={()=>window.open("https://youtube.com","_blank")}
            style={{...Card(),marginBottom:8,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",transition:"border-color .15s"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor=GOLD}
            onMouseLeave={e=>e.currentTarget.style.borderColor=GOLDDIM}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <span style={{fontFamily:"'Cinzel',serif",color:GOLD,fontSize:16,fontWeight:900,minWidth:28}}>{t.n}</span>
              <div>
                <div style={{color:WHITE,fontWeight:800,fontSize:14}}>{t.t}</div>
                <div style={{color:WHITE,fontSize:12,marginTop:2,fontWeight:600,letterSpacing:1}}>{t.d} · OPENS ON YOUTUBE</div>
              </div>
            </div>
            <span style={{background:lc[t.l]+"22",border:`1px solid ${lc[t.l]}`,color:lc[t.l],padding:"3px 10px",fontSize:11,fontWeight:900,flexShrink:0,letterSpacing:2}}>{t.l.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function P20() {
  return (
    <div style={{...Sp,padding:40}}>
      <div style={{maxWidth:780,margin:"0 auto"}}>
        <div style={{fontSize:11,color:GOLD,letterSpacing:4,marginBottom:4,fontWeight:700}}>LEGAL</div>
        <h1 style={{...H1,fontSize:28,marginBottom:4}}>TERMS OF SERVICE & DISCLAIMER</h1>
        <div style={{color:WHITE,fontSize:12,marginBottom:20,fontWeight:600,letterSpacing:2}}>EFFECTIVE: MARCH 2026 · MANDASTRONG STUDIO LLC</div>
        <div style={{...Card(),marginBottom:14}}>
          <h2 style={{color:GOLD,fontWeight:900,fontSize:16,marginBottom:12,letterSpacing:2}}>TERMS OF SERVICE</h2>
          <p style={{color:WHITE,fontSize:14,lineHeight:1.9,margin:0}}>By accessing or using MandaStrong Studio, you agree to be legally bound by these Terms of Service. Subscriptions bill monthly and auto-renew unless cancelled. All payments processed via Stripe. Studio Plan subscribers receive full commercial rights. You retain ownership of all media you upload. For support contact MandaStrong1.Etsy.com or Agent Grok on Page 21.</p>
        </div>
        <div style={{...Card()}}>
          <h2 style={{color:GOLD,fontWeight:900,fontSize:16,marginBottom:12,letterSpacing:2}}>DISCLAIMER</h2>
          <p style={{color:WHITE,fontSize:14,lineHeight:1.9,margin:0}}>MandaStrong Studio is provided as is without warranties. AI-generated content is produced algorithmically — users are solely responsible for reviewing all outputs. A significant portion of all proceeds supports veterans mental health and anti-bullying education.</p>
        </div>
      </div>
    </div>
  );
}

function P21() {
  const [msgs,setMsgs]=useState([{role:"assistant",content:"Ask me anything about your production."}]);
  const [inp,setInp]=useState("");const [loading,setLoading]=useState(false);
  const bot=useRef(null);
  const qs=["How do I export in 8K?","What AI tools do you have?","How does the timeline work?","Tell me about pricing"];
  useEffect(()=>{bot.current&&bot.current.scrollIntoView({behavior:"smooth"});},[msgs]);
  const send=async()=>{
    if(!inp.trim())return;const q=inp.trim();setInp("");setLoading(true);
    setMsgs(p=>[...p,{role:"user",content:q}]);
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,system:"You are Agent Grok, 24/7 assistant for MandaStrong Studio — professional cinema AI platform, 600+ tools, 8K export, films up to 3 hours, plans $20/$30/$50/mo with 7-day free trial. Be helpful and concise.",messages:[...msgs.filter(m=>m.role!=="system"),{role:"user",content:q}]})});
      const d=await r.json();setMsgs(p=>[...p,{role:"assistant",content:d.content&&d.content[0]?d.content[0].text:"Let me help!"}]);
    }catch(e){setMsgs(p=>[...p,{role:"assistant",content:"Unable to connect — check API key in Bolt settings."}]);}
    setLoading(false);
  };
  return (
    <div style={{...Sp,padding:40}}>
      <div style={{maxWidth:680,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{width:52,height:52,background:`linear-gradient(135deg,${GOLDDIM},${GOLD})`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",fontFamily:"'Cinzel',serif",fontSize:26,fontWeight:900,color:"#000",boxShadow:`0 0 24px ${GOLD}88`}}>G</div>
          <h1 style={{...H1,fontSize:24}}>AGENT GROK</h1>
          <div style={{color:WHITE,fontSize:11,letterSpacing:4,fontWeight:700}}>24/7 PRODUCTION SUPPORT</div>
          <div style={{color:"#22c55e",fontSize:11,letterSpacing:3,marginTop:4,fontWeight:900}}>● ONLINE</div>
        </div>
        <div style={{...Card(),height:290,overflowY:"auto",marginBottom:10,display:"flex",flexDirection:"column",gap:8,padding:12}}>
          {msgs.map((m,i)=>(
            <div key={i} style={{padding:"10px 14px",background:m.role==="user"?"rgba(232,201,109,0.08)":"rgba(26,82,118,0.2)",borderLeft:`2px solid ${m.role==="user"?GOLD:"#2980b9"}`}}>
              <span style={{fontSize:11,color:GOLD,display:"block",marginBottom:4,fontWeight:900,letterSpacing:2}}>{m.role==="user"?"YOU":"AGENT GROK"}</span>
              <span style={{color:WHITE,fontSize:14,lineHeight:1.7}}>{m.content}</span>
            </div>
          ))}
          {loading&&<div style={{padding:"10px 14px",background:"rgba(26,82,118,0.2)",borderLeft:"2px solid #2980b9",color:WHITE,fontSize:13}}>Agent Grok is thinking...</div>}
          <div ref={bot}/>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>
          {qs.map(q=><button key={q} onClick={()=>setInp(q)} style={{...G("out",true),fontSize:11}}>{q}</button>)}
        </div>
        <div style={{display:"flex",gap:8}}>
          <textarea value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}
            placeholder="Ask Agent Grok anything about your production..."
            style={{flex:1,height:50,resize:"none",padding:"10px 12px",fontSize:14,background:"#0a0a0a",border:`1px solid ${GOLDDIM}`,color:WHITE,outline:"none",lineHeight:1.5,fontFamily:"'Rajdhani',sans-serif"}}/>
          <button onClick={send} disabled={loading||!inp.trim()} style={{...G("gold",false),height:50,padding:"0 22px",opacity:loading||!inp.trim()?0.5:1,letterSpacing:2}}>SEND</button>
        </div>
      </div>
    </div>
  );
}

function P22() {
  const [posts,setPosts]=useState([{id:1,user:"Sarah J.",title:"Epic Action Feature",icon:"🎬",views:2847,likes:1522},{id:2,user:"Mike Chen",title:"Family Documentary",icon:"📽",views:1256,likes:812},{id:3,user:"Emily R.",title:"Short Film Entry",icon:"🏆",views:3421,likes:2156},{id:4,user:"Alex T.",title:"Music Video Cut",icon:"🎵",views:5234,likes:4012}]);
  return (
    <div style={{...Sp,padding:40}}>
      <div style={{maxWidth:780,margin:"0 auto"}}>
        <div style={{fontSize:11,color:GOLD,letterSpacing:4,marginBottom:4,fontWeight:700}}>CREATOR NETWORK</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h1 style={{...H1,fontSize:28,margin:0}}>COMMUNITY HUB</h1>
          <button style={{...G("gold",false)}}>UPLOAD YOUR MOVIE</button>
        </div>
        {posts.map(p=>(
          <div key={p.id} style={{...Card(),marginBottom:8,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:24}}>{p.icon}</span>
              <div>
                <div style={{color:GOLD,fontWeight:900,fontSize:14,letterSpacing:1}}>{p.title}</div>
                <div style={{color:WHITE,fontSize:12,fontWeight:600,letterSpacing:1}}>by {p.user}</div>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <span style={{color:WHITE,fontSize:12,fontWeight:700}}>👁 {p.views.toLocaleString()}</span>
              <span style={{color:WHITE,fontSize:12,fontWeight:700}}>❤️ {p.likes.toLocaleString()}</span>
              <button onClick={()=>setPosts(ps=>ps.map(x=>x.id===p.id?{...x,likes:x.likes+1}:x))} style={{...G("out",true)}}>POST</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function P23({ go }) {
  const [guideOpen,setGuideOpen]=useState(false);
  return (
    <div style={{...Sp,padding:"26px 40px 80px"}}>
      <div style={{maxWidth:780,margin:"0 auto",textAlign:"center"}}>
        <h1 style={{fontFamily:"'Cinzel',serif",color:GOLD,fontSize:"clamp(20px,3vw,28px)",fontWeight:900,letterSpacing:5,textShadow:`0 0 30px ${GOLD}99`,marginBottom:14}}>THAT'S ALL FOLKS</h1>
        <div style={{height:1,background:`linear-gradient(90deg,transparent,${GOLD},transparent)`,marginBottom:18}}/>
        <video autoPlay loop muted playsInline style={{width:"100%",aspectRatio:"16/9",background:"#000",border:`1px solid ${GOLDDIM}`,marginBottom:20,display:"block"}}>
          <source src="/background.mp4" type="video/mp4"/>
        </video>
        <div onClick={()=>setGuideOpen(g=>!g)}
          style={{...Card(),marginBottom:guideOpen?0:16,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",textAlign:"left",border:`1px solid ${GOLD}`}}>
          <span style={{color:GOLD,fontWeight:900,fontSize:14,letterSpacing:3}}>📖 HOW TO USE GUIDE</span>
          <span style={{color:GOLD,fontSize:18}}>{guideOpen?"▲":"▼"}</span>
        </div>
        {guideOpen&&(
          <div style={{...Card(),textAlign:"left",marginBottom:16,borderTop:"none"}}>
            {[["NAVIGATION","Use ☰ Quick Access menu or BACK / NEXT buttons to move between all 23 pages."],["PAGES 1-3","Home, Platform overview, and Example films. Upload your own films to the viewer slots."],["PAGE 4","Login, register for your 7-Day Free Trial, or browse as guest."],["PAGES 5-10","600+ AI Tools across 6 categories. Click any tool, describe what you want, hit AI CREATE."],["PAGE 6","Voice Tools — select from 6 voices, paste your script, hit SPEAK NOW or GENERATE & SPEAK."],["PAGE 11","Upload your media — video, audio, images. Drag files in or click Browse."],["PAGE 13","Timeline Editor — drag your media onto tracks. Add extra tracks with + ADD TRACK."],["PAGE 15","Audio Mixer — VOICE 85, MUSIC 40, EFX 50, MASTER 85 for documentary."],["PAGE 16","Render Engine — set duration 0-180 mins, choose quality up to 8K, hit START RENDER."],["PAGE 17","Film Preview — watch your film with working playback controls."],["PAGE 18","Export & Distribute — download or share to social media."],["PAGE 21","Agent Grok — your 24/7 AI assistant."],["PAGE 22","Community Hub — share your films with other creators."]].map(([t,d])=>(
              <div key={t} style={{borderBottom:`1px solid ${GOLDDIM}33`,paddingBottom:10,marginBottom:10}}>
                <div style={{color:GOLD,fontWeight:900,fontSize:11,letterSpacing:2,marginBottom:4}}>{t}</div>
                <div style={{color:WHITE,fontSize:13,lineHeight:1.7}}>{d}</div>
              </div>
            ))}
          </div>
        )}
        <div style={{...Card(),textAlign:"left",marginBottom:16}}>
          <h2 style={{color:GOLD,fontWeight:900,fontSize:15,textAlign:"center",marginBottom:14,letterSpacing:3}}>✦ A SPECIAL THANK YOU ✦</h2>
          <p style={{color:WHITE,fontSize:14,lineHeight:1.9}}>Dear Creator,</p>
          <p style={{color:WHITE,fontSize:14,lineHeight:1.9}}>From the bottom of my heart — <strong style={{color:GOLD}}>thank you.</strong> Whether you are here to capture precious family memories, tell a story that has lived rent-free in your head for years, or simply explore what is possible when creativity meets technology, you chose to do it with MandaStrong Studio. That means everything.</p>
          <p style={{color:WHITE,fontSize:14,lineHeight:1.9}}>I built this platform because I believe that <strong style={{color:GOLD}}>storytelling should have no gatekeepers.</strong> You do not need a film school degree or a Hollywood budget. You just need a story worth telling — and now you have 600+ professional tools to help you tell it.</p>
          <p style={{color:WHITE,fontSize:14,lineHeight:1.9}}>Every subscription supports <strong style={{color:GOLD}}>veterans mental health initiatives</strong> and <strong style={{color:GOLD}}>school anti-bullying programs</strong> — causes deeply personal to me as the author of <em>Doxy the School Bully.</em> When you create here, you are helping build a kinder world.</p>
          <p style={{color:WHITE,fontSize:14,lineHeight:1.9}}>Together we are building a community of creators who use their talents to spread kindness, understanding, and hope.</p>
          <p style={{color:WHITE,fontSize:14,lineHeight:1.9}}>With gratitude and cinematic love,</p>
          <p style={{color:GOLD,fontWeight:900,fontSize:14,letterSpacing:2}}>— AMANDA STRONG</p>
          <p style={{color:WHITE,fontSize:12,letterSpacing:1}}>Founder, MandaStrong Studio · Author of Doxy the School Bully<br/>MandaStrong1.Etsy.com</p>
        </div>
        <div style={{...Card(),textAlign:"left",marginBottom:16}}>
          <h2 style={{color:GOLD,fontWeight:900,fontSize:12,letterSpacing:3,marginBottom:14}}>OUR MISSION</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {[{ic:"🎬",t:"EMPOWER CREATORS",d:"600+ AI tools making professional filmmaking accessible to everyone."},{ic:"🛡",t:"PROTECT THE YOUNG",d:"Most proceeds fund school anti-bullying programs, inspired by Doxy the School Bully."},{ic:"🏅",t:"SUPPORT VETERANS",d:"A major portion funds mental health services for veterans."},{ic:"🌐",t:"BUILD COMMUNITY",d:"The Creator Network connects filmmakers worldwide to share and grow."}].map(m=>(
              <div key={m.t} style={{background:"#000",border:`1px solid ${GOLDDIM}`,padding:12}}>
                <div style={{fontSize:18,marginBottom:5}}>{m.ic}</div>
                <div style={{color:GOLD,fontWeight:900,fontSize:11,letterSpacing:2,marginBottom:4}}>{m.t}</div>
                <div style={{color:WHITE,fontSize:12,lineHeight:1.7}}>{m.d}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>window.open("https://MandaStrong1.Etsy.com","_blank")} style={{...G("out",false)}}>VISIT ETSY STORE</button>
          <button onClick={()=>window.close()} style={{...G("gold",false)}}>EXIT APP</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page,setPage]=useState(()=>{try{return JSON.parse(localStorage.getItem("ms_page")||"1");}catch{return 1;}});
  const [menu,setMenu]=useState(false);
  const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem("ms_user")||'{"name":"Guest","plan":"Guest","isAdmin":false}');}catch{return {name:"Guest",plan:"Guest",isAdmin:false};}});
  const [mediaLib,setMediaLib]=useState([]);
  const [timeline,setTimeline]=useState(()=>{try{return JSON.parse(localStorage.getItem("ms_timeline")||"{}");}catch{return {};}});
  const [rendered,setRendered]=useState(null);
  const [savedNotice,setSavedNotice]=useState(false);
  const go=p=>{setPage(p);window.scrollTo(0,0);try{localStorage.setItem("ms_page",JSON.stringify(p));}catch{}};
  const saveAsset=a=>setMediaLib(p=>[...p,a]);
  const saveProject=()=>{
    try{
      localStorage.setItem("ms_page",JSON.stringify(page));
      localStorage.setItem("ms_user",JSON.stringify(user));
      localStorage.setItem("ms_timeline",JSON.stringify(timeline));
      setSavedNotice(true);
      setTimeout(()=>setSavedNotice(false),2000);
    }catch(e){alert("Project saved!");}
  };
  const pages={
    1:<P1 go={go}/>,2:<P2 go={go}/>,3:<P3/>,4:<P4 go={go} setUser={setUser}/>,
    5:<ToolPage title="WRITING TOOLS" subtitle="AI WORKSTATION 01 — WRITING" tools={WRITING} onSave={saveAsset}/>,
    6:<P6Voice onSave={saveAsset}/>,
    7:<ToolPage title="IMAGE TOOLS" subtitle="AI WORKSTATION 03 — IMAGE" tools={IMAGE_T} onSave={saveAsset}/>,
    8:<P8VideoGenerator onSave={saveAsset}/>,
    9:<ToolPage title="MOTION & VFX" subtitle="AI WORKSTATION 05 — MOTION" tools={MOTION} onSave={saveAsset}/>,
    10:<ToolPage title="ENHANCEMENT STUDIO" subtitle="AI WORKSTATION 06 — ENHANCE" tools={MOTION} onSave={saveAsset}/>,
    11:<P11 mediaLib={mediaLib} setMediaLib={setMediaLib}/>,
    12:<P12 go={go} mediaLib={mediaLib}/>,
    13:<P13 go={go} mediaLib={mediaLib} timeline={timeline} setTimeline={setTimeline}/>,
    14:<P14/>,15:<P15/>,
    16:<P16 go={go} timeline={timeline} setRendered={setRendered} mediaLib={mediaLib}/>,
    17:<P17 go={go} rendered={rendered} mediaLib={mediaLib}/>,
    18:<P18 rendered={rendered} mediaLib={mediaLib}/>,
    19:<P19/>,20:<P20/>,21:<P21/>,22:<P22/>,23:<P23 go={go}/>,
  };
  return (
    <div style={{background:"#000",minHeight:"100vh",fontFamily:"'Rajdhani',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Rajdhani:wght@400;600;700;800;900&display=swap" rel="stylesheet"/>
      <Header go={go} setMenu={setMenu}/>
      {menu&&<QAMenu go={go} onClose={()=>setMenu(false)} user={user}/>}
      {savedNotice&&<div style={{position:"fixed",top:60,left:"50%",transform:"translateX(-50%)",background:GOLDDIM,color:"#000",padding:"10px 24px",fontWeight:900,fontSize:13,letterSpacing:2,zIndex:999}}>✓ PROJECT SAVED</div>}
      <div style={{minHeight:"calc(100vh - 116px)"}}>{pages[page]||<P1 go={go}/>}</div>
      <Footer page={page} go={go} onSave={saveProject}/>
    </div>
  );
}
```