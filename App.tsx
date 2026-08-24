import { useState, useRef, useEffect } from "react";

// IndexedDB helpers for persistent clip storage
const DB_NAME="mandastrong_db",DB_VER=1,STORE="clips";
const openDB=()=>new Promise((res,rej)=>{const r=indexedDB.open(DB_NAME,DB_VER);r.onupgradeneeded=e=>e.target.result.createObjectStore(STORE,{keyPath:"id"});r.onsuccess=e=>res(e.target.result);r.onerror=rej;});

function buildChunks(text){const clean=text.replace(/\s+/g," ").trim();const sentences=clean.match(/[^.!?]+[.!?]+[\s]*/g)||[clean];const chunks=[];for(const s of sentences){const trimmed=s.trim();if(trimmed.length>0){const type=trimmed.endsWith("?")?"question":trimmed.endsWith("!")?"exclaim":"sentence";chunks.push({text:trimmed,type});}}return chunks.length>0?chunks:[{text:clean.slice(0,200),type:"sentence"}];}

async function proxyFetch(body){
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),55000);
  try{
    const res=await fetch("https://njqfexhltjwpgvctmyaw.supabase.co/functions/v1/claude-proxy",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body),signal:controller.signal});
    clearTimeout(timeout);
    return res.json();
  }catch(e){clearTimeout(timeout);throw e;}
}

// ══════════════════════════════════════════════════════════════════
// MANDASTRONG ENGINE — real photorealistic footage
// Single shared client. Every studio page renders through this.
// ══════════════════════════════════════════════════════════════════
const ENGINE_URL="https://njqfexhltjwpgvctmyaw.supabase.co/functions/v1/generate-video";
const ENGINE_KEY="msk_live_j-HsVOiMDEbwfqLInIsNTrnMreDvr-VKKbPNf21oink";
const engineHeaders={"Content-Type":"application/json","x-engine-key":ENGINE_KEY};

// The engine answers with .url; older builds looked for .output. Accept either.
const pickEngineUrl=(d)=>{ if(!d||typeof d!=="object")return""; const v=d.url||d.output||d.video||""; return (typeof v==="string"&&v.indexOf("http")===0)?v:""; };

async function engineCall(body){
  const res=await fetch(ENGINE_URL,{method:"POST",headers:engineHeaders,body:JSON.stringify(body)});
  return res.json();
}

// ── CINEMA VOICE ENGINE ──────────────────────────────────────────
// Server-side speech. Same voice on every device — iPad, Galaxy, HP.
const VOICE_URL="https://njqfexhltjwpgvctmyaw.supabase.co/functions/v1/generate-voice";
let __msAudio=null;

async function engineSpeak(text,meta){
  meta=meta||{};
  try{
    const res=await fetch(VOICE_URL,{method:"POST",headers:engineHeaders,body:JSON.stringify({
      text:String(text||"").slice(0,3500),
      voice:meta.voice||"",
      gender:meta.gender||"",
      origin:meta.origin||"",
      speed:meta.speed||1
    })});
    let d=await res.json();
    let url=pickEngineUrl(d);
    if(url) return url;
    if(d&&d.id){
      for(let i=0;i<40;i++){
        await new Promise(r=>setTimeout(r,1500));
        const p=await fetch(VOICE_URL,{method:"POST",headers:engineHeaders,body:JSON.stringify({id:d.id})});
        const pd=await p.json();
        url=pickEngineUrl(pd);
        if(url) return url;
        if(pd&&(pd.status==="failed"||pd.status==="canceled")) return "";
      }
    }
  }catch(e){}
  return "";
}

// ── HIDDEN: mint a personal cloned voice from a sample recording ──
// Sends the sample to the engine's clone core and returns an opaque
// MandaStrong voice id. Store it; later pass it as meta.voice to speak
// in the cloned voice. Provider is never surfaced.
async function engineCloneVoice(sample){
  try{
    const res=await fetch(VOICE_URL,{method:"POST",headers:engineHeaders,body:JSON.stringify({clone:true,sample:String(sample||"")})});
    let d=await res.json();
    if(d&&d.voice_id) return d.voice_id;
    if(d&&d.id){
      for(let i=0;i<40;i++){
        await new Promise(r=>setTimeout(r,1500));
        const p=await fetch(VOICE_URL,{method:"POST",headers:engineHeaders,body:JSON.stringify({id:d.id})});
        const pd=await p.json();
        if(pd&&pd.voice_id) return pd.voice_id;
        if(pd&&(pd.status==="failed"||pd.status==="canceled")) return "";
      }
    }
  }catch(e){}
  return "";
}

function playEngineAudio(url,volume){
  return new Promise((resolve)=>{
    try{
      const a=new Audio(url);
      a.volume=typeof volume==="number"?Math.max(0,Math.min(1,volume)):1;
      __msAudio=a;
      a.onended=()=>resolve(true);
      a.onerror=()=>resolve(false);
      a.play().catch(()=>resolve(false));
    }catch(e){resolve(false);}
  });
}

function stopEngineAudio(){
  try{ if(__msAudio){ __msAudio.pause(); __msAudio.currentTime=0; __msAudio=null; } }catch(e){}
}

// Health check — tells you if the engine has a provider key installed.
async function engineStatus(){
  try{ const r=await fetch(ENGINE_URL); return await r.json(); }catch(e){ return {ok:false,message:"Engine unreachable"}; }
}

// Starts one render and polls until the footage lands.
// Returns a playable URL, or "" if the engine could not deliver.
async function engineRender(prompt,opts){
  opts=opts||{};
  try{
    const body={prompt:String(prompt||"").slice(0,1800),duration:opts.duration||5,aspect_ratio:opts.aspect_ratio||"16:9",cheap_only:true};
    if(opts.image)body.image=opts.image;
    const started=await engineCall(body);
    if(!started||started.error)return "";
    let url=pickEngineUrl(started);
    const pid=started.id;
    if(!url&&!pid)return "";
    for(let i=0;