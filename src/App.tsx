import React, { useState, useRef, useEffect } from "react";
import { Btn, S, AIPanel } from "./components"; // Assuming your existing components
import { supabase } from "./supabaseClient"; // Your Supabase setup
import { RenderEngine } from "./RenderEngine"; // Your custom render engine

const BG = "#0a0a0a", BG2 = "#101010", BG3 = "#181818", GOLD = "#d4a847", GOLD2 = "#f0c870", GOLDDIM = "#8a6d22", BORDER = "#333", TEXT = "#e8e4dc", TEXT2 = "#ccc", TEXT3 = "#666";

const TOTAL = 23;
const NAV = ["HOME","FEATURES","WORKSTATION","LOGIN","TOOLS","VOICES","IMAGES","VIDEOS","MOTION","ENHANCE","UPLOAD","TIMELINE","COMMUNITY","RENDER","SETTINGS","STRIPE","PROFILE","HELP","ABOUT","CONTACT","GROK","COMMUNITY HUB","THAT'S ALL"];

export default function App() {
  const [page, setPage] = useState(0);
  const [aiTool, setAiTool] = useState("");
  const [communityPosts, setCommunityPosts] = useState<any[]>([]);
  const [newComment, setNewComment] = useState<{[key:number]:string}>({});
  const [mediaLibrary, setMediaLibrary] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const communityFileRef = useRef<HTMLInputElement>(null);

  const goTo = (n: number) => { if(n>=0 && n<TOTAL) setPage(n); };

  const addAssetToLibrary = (a:any) => setMediaLibrary(prev=>[...prev,a]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if(!files) return;
    for(let f of Array.from(files)){
      const newAsset = {id:Date.now()+Math.random(), title:f.name.replace(/\.[^/.]+$/,""), type:f.type, file:f};
      addAssetToLibrary(newAsset);
    }
  };

  const renderPage = () => {
    switch(page){
      case 21: return(
        <div style={{maxWidth:900,margin:"0 auto",padding:"28px 20px 60px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:24,flexWrap:"wrap",gap:12}}>
            <div>
              <div style={{fontSize:9,letterSpacing:5,color:GOLDDIM,marginBottom:6,fontFamily:"'Cinzel',serif"}}>CREATOR NETWORK</div>
              <div style={S.cinzel(24,GOLD2)}>COMMUNITY HUB</div>
            </div>
            <div>
              <input ref={communityFileRef} type="file" accept="video/*" style={{display:"none"}} onChange={e=>{
                const f=e.target.files?.[0];
                if(f){
                  const newPost={id:Date.now(),title:f.name.replace(/\.[^/.]+$/,""),user:"You",emoji:"🎬",likes:0,comments:[]};
                  setCommunityPosts(prev=>[newPost,...prev]);
                }
              }}/>
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
                    <input value={newComment[post.id]||""} onChange={e=>setNewComment(p=>({...p,[post.id]:e.target.value}))} placeholder="Leave a comment…" style={{flex:1,padding:"6px 10px",fontSize:12}} onKeyDown={e=>{
                      if(e.key==="Enter"&&newComment[post.id]?.trim()){
                        setCommunityPosts(prev=>prev.map(p=>p.id===post.id?{...p,comments:[...p.comments,newComment[post.id]]}:p));
                        setNewComment(p=>({...p,[post.id]:""}));
                      }
                    }}/>
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
      case 23: return(
        <div style={{maxWidth:900,margin:"0 auto",padding:"40px 20px"}}>
          <h2 style={{...S.cinzel(28,GOLD2)}}>🎬 RENDER ENGINE</h2>
          <RenderEngine maxMinutes={180} mediaLibrary={mediaLibrary} onRenderComplete={addAssetToLibrary}/>
        </div>
      );
      default: return null;
    }
  };

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
        <div style