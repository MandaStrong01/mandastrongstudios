          <p style={{ color: GOLD, fontWeight: 700, marginBottom: 6 }}>Our Mission</p>
          <p style={{ color: TEXT2, lineHeight: 1.7 }}>To educate, inspire, and bring awareness to critical issues like bullying prevention, social skills development, and humanity's collective growth - through the power of film.</p>
        </div>
        <GoldBtn onClick={() => go(3)}>Begin Creating</GoldBtn>
      </div>
    </Page>
  );
}

function P3({ go }: { go: (n: number) => void }) {
  const plans = [
    { name: "Basic", price: "$10", features: ["5 projects", "100 AI tool uses/mo", "720p export", "Community access"] },
    { name: "Pro", price: "$20", features: ["Unlimited projects", "500 AI uses/mo", "1080p export", "Priority support", "Analytics"] },
    { name: "Studio", price: "$30", features: ["Everything in Pro", "Unlimited AI uses", "4K export", "Admin dashboard", "Custom branding"] },
  ];
  return (
    <Page sparkle>
      <div style={{ padding: "24px 20px", maxWidth: 500, margin: "0 auto" }}>
        <SH>Choose Your Plan</SH>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {plans.map(p => (
            <div key={p.name} style={{ border: p.name === "Pro" ? "2px solid " + GOLD : "1px solid " + BORDER, background: BG3, borderRadius: 20, padding: 20 }}>
              {p.name === "Pro" && <div style={{ color: GOLD, fontSize: 11, fontWeight: 700, marginBottom: 4 }}>MOST POPULAR</div>}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ color: GOLD, fontWeight: 700, fontSize: 18 }}>{p.name}</span>
                <span style={{ color: GOLD2, fontWeight: 900, fontSize: 22 }}>{p.price}<span style={{ fontSize: 13, color: TEXT2 }}>/mo</span></span>
              </div>
              <ul style={{ color: TEXT2, marginBottom: 16, paddingLeft: 0, listStyle: "none" }}>{p.features.map(f => <li key={f} style={{ marginBottom: 4 }}>✓ {f}</li>)}</ul>
              {p.name === "Pro" ? <GoldBtn onClick={() => go(4)}>Select {p.name}</GoldBtn> : <PurBtn onClick={() => go(4)}>Select {p.name}</PurBtn>}
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

const AI_TOOLS: { page: number; name: string; desc: string; icon: string }[] = [
  { page: 4, name: "Script To Movie", desc: "Paste or write a script and AI generates your full film.", icon: "📝" },
  { page: 4, name: "Text To Video", desc: "Type a description and AI creates the video clip.", icon: "🎥" },
  { page: 4, name: "Image To Video", desc: "Bring still images to life with AI animation.", icon: "🖼️" },
  { page: 4, name: "Voice Generator", desc: "Generate natural AI voiceovers from text.", icon: "🎙️" },
  { page: 4, name: "Music Composer", desc: "AI-generated original background music.", icon: "🎵" },
  { page: 4, name: "Sound FX Maker", desc: "Create custom sound effects with AI.", icon: "🔊" },
  { page: 4, name: "Dialogue Writer", desc: "AI writes realistic dialogue for your scenes.", icon: "💬" },
  { page: 4, name: "Storyboard Gen", desc: "Auto-generate visual storyboards from scripts.", icon: "🗂️" },
  { page: 5, name: "Character Creator", desc: "Design unique AI-generated characters.", icon: "🧑‍🎨" },
  { page: 5, name: "Background Gen", desc: "Generate cinematic backgrounds and settings.", icon: "🌅" },
  { page: 5, name: "Prop Maker", desc: "Create custom props and objects with AI.", icon: "🎭" },
  { page: 5, name: "Costume Designer", desc: "AI-generated costume and wardrobe ideas.", icon: "👗" },
  { page: 5, name: "Logo Maker", desc: "Create stunning studio logos instantly.", icon: "🏷️" },
  { page: 5, name: "Poster Designer", desc: "Generate professional movie posters.", icon: "🖼️" },
  { page: 5, name: "Trailer Creator", desc: "Auto-cut a cinematic trailer from your footage.", icon: "🎬" },
  { page: 5, name: "Caption Writer", desc: "AI writes engaging captions and subtitles.", icon: "📋" },
  { page: 6, name: "Motion Video Maker", desc: "Create motion graphics and animated videos.", icon: "🌀" },
  { page: 6, name: "3D Scene Builder", desc: "Build 3D environments for your films.", icon: "🏗️" },
  { page: 6, name: "Animation Studio", desc: "Frame-by-frame AI animation tools.", icon: "✏️" },
  { page: 6, name: "Color Grader", desc: "Professional AI colour grading for your footage.", icon: "🎨" },
  { page: 6, name: "VFX Generator", desc: "Add stunning visual effects with one click.", icon: "✨" },
  { page: 6, name: "Green Screen", desc: "AI-powered background replacement.", icon: "🟩" },
  { page: 6, name: "Face Swap", desc: "Seamless AI face-swap for characters.", icon: "😶" },
  { page: 6, name: "Lip Sync AI", desc: "Sync character lips to any audio track.", icon: "👄" },
  { page: 7, name: "Script Analyser", desc: "AI analyses and improves your screenplay.", icon: "🔍" },
  { page: 7, name: "Plot Generator", desc: "Generate compelling plot ideas and twists.", icon: "🌀" },
  { page: 7, name: "Scene Writer", desc: "AI writes complete scenes from your brief.", icon: "✍️" },
  { page: 7, name: "Title Generator", desc: "Generate powerful film and project titles.", icon: "🔤" },
  { page: 7, name: "Tagline Creator", desc: "Craft memorable marketing taglines.", icon: "💡" },
  { page: 7, name: "Press Kit Builder", desc: "Auto-generate professional press kits.", icon: "📰" },
  { page: 7, name: "Social Media Pack", desc: "Create a full social media content pack.", icon: "📱" },
  { page: 7, name: "Pitch Deck AI", desc: "Build investor-ready pitch decks.", icon: "📊" },
  { page: 8, name: "Upload & Enhance", desc: "Upload footage - AI enhances quality automatically.", icon: "⬆️" },
  { page: 8, name: "Noise Reducer", desc: "Remove audio and video noise with AI.", icon: "🔇" },
  { page: 8, name: "Upscaler 4K", desc: "Upscale any video to 4K resolution.", icon: "📺" },
  { page: 8, name: "Stabiliser", desc: "AI removes camera shake from footage.", icon: "📷" },
  { page: 8, name: "Speed Controller", desc: "Slow-mo or speed-ramp any clip.", icon: "⏱️" },
  { page: 8, name: "Object Remover", desc: "Remove unwanted objects from video.", icon: "🗑️" },
  { page: 8, name: "Text Overlay", desc: "Add dynamic animated text to your video.", icon: "🔤" },
  { page: 8, name: "Watermark Remover", desc: "Clean up footage by removing watermarks.", icon: "🧹" },
  { page: 9, name: "Auto Editor", desc: "AI edits your raw footage into a polished film.", icon: "🤖" },
  { page: 9, name: "Beat Syncer", desc: "Sync your cuts automatically to music beats.", icon: "🎶" },
  { page: 9, name: "Highlight Reel", desc: "AI creates a highlight reel from long footage.", icon: "⭐" },
  { page: 9, name: "Podcast Converter", desc: "Turn any video into a podcast episode.", icon: "🎙️" },
  { page: 9, name: "Shorts Creator", desc: "Auto-clip your film into viral short clips.", icon: "📱" },
  { page: 9, name: "SRT Generator", desc: "Auto-generate subtitle SRT files.", icon: "💬" },
  { page: 9, name: "Translate & Dub", desc: "Translate and dub your film into any language.", icon: "🌍" },
  { page: 9, name: "Export Optimizer", desc: "AI optimises export settings for any platform.", icon: "📤" },
];

const PAGE_LABELS: Record<number, string> = { 4: "Script & Story", 5: "Design & Characters", 6: "Video & VFX", 7: "Writing & Marketing", 8: "Upload & Enhance", 9: "Edit & Export" };

function AIToolBoard({ pageNum, go, addAsset }: { pageNum: number; go: (n: number) => void; addAsset: (name: string) => void }) {
  const [search, setSearch] = useState("");
  const tools = AI_TOOLS.filter(t => t.page === pageNum && t.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <Page sparkle>
      <div style={{ padding: "16px", maxWidth: 500, margin: "0 auto" }}>
        <SH>AI Tool Board - {PAGE_LABELS[pageNum]}</SH>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search 600+ AI tools..." style={{ background: BG3, border: "1px solid " + PUR2, color: TEXT, borderRadius: 16, width: "100%", padding: "10px 14px", outline: "none", fontSize: 13, marginBottom: 16, boxSizing: "border-box" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {tools.map(t => (
            <div key={t.name} style={{ background: BG3, border: "1px solid " + GOLDDIM, borderRadius: 16, padding: 14, display: "flex", flexDirection: "column", gap: 6, boxShadow: "0 0 8px #d4a84722" }}>
              <div style={{ fontSize: 26 }}>{t.icon}</div>
              <div style={{ color: GOLD, fontWeight: 700, fontSize: 13 }}>{t.name}</div>
              <div style={{ color: TEXT2, fontSize: 11, lineHeight: 1.4, flexGrow: 1 }}>{t.desc}</div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => { addAsset(t.name); go(11); }} style={{ background: PUR2, color: "#fff", fontSize: 11, borderRadius: 8, padding: "5px 10px", border: "none", cursor: "pointer", fontWeight: 700, flex: 1 }}>Upload</button>
                <button onClick={() => { addAsset(t.name); go(11); }} style={{ background: GOLDDIM, color: GOLD2, fontSize: 11, borderRadius: 8, padding: "5px 10px", border: "none", cursor: "pointer", fontWeight: 700, flex: 1 }}>AI Create</button>
              </div>
            </div>
          ))}
        </div>
        {search && tools.length === 0 && <p style={{ color: TEXT3, textAlign: "center", marginTop: 20 }}>No tools found</p>}
        <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
          {[4,5,6,7,8,9].map(n => <button key={n} onClick={() => go(n)} style={{ background: n === pageNum ? GOLD : BG3, color: n === pageNum ? "#000" : TEXT2, border: "1px solid " + (n === pageNum ? GOLD : BORDER), borderRadius: 10, padding: "5px 12px", fontSize: 12, cursor: "pointer", fontWeight: 700 }}>Pg {n}</button>)}
        </div>
      </div>
    </Page>
  );
}

function P10({ go }: { go: (n: number) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  return (
    <Page sparkle>
      <div style={{ padding: "24px 20px", maxWidth: 500, margin: "0 auto" }}>
        <SH>Upload Your Movie</SH>
        <div onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) setFile(f); }} onClick={() => ref.current?.click()} style={{ border: "2px dashed " + (dragging ? GOLD : PUR2), background: dragging ? "#1a1020" : BG3, borderRadius: 20, padding: 40, textAlign: "center", cursor: "pointer", boxShadow: dragging ? "0 0 20px " + GOLD + "44" : "none" }}>
          <div style={{ fontSize: 50, marginBottom: 10 }}>🎬</div>
          {file ? <p style={{ color: GOLD, fontWeight: 700 }}>{file.name}</p> : <><p style={{ color: TEXT, fontWeight: 700, marginBottom: 6 }}>No Movie Uploaded</p><p style={{ color: TEXT3, fontSize: 13 }}>Drag and drop your film here, or tap to browse</p><p style={{ color: TEXT3, fontSize: 11, marginTop: 6 }}>MP4, MOV, AVI, MKV supported</p></>}
          <input ref={ref} type="file" accept="video/*" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) setFile(f); }} />
        </div>
        {file && (<div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}><div style={{ background: BG3, border: "1px solid " + BORDER, borderRadius: 16, padding: 16, color: TEXT2 }}><div><span style={GP}>Name:</span> {file.name}</div><div><span style={GP}>Size:</span> {(file.size/1024/1024).toFixed(1)} MB</div></div><GoldBtn onClick={() => go(11)}>Continue to Media Library</GoldBtn></div>)}
        {!file && <div style={{ marginTop: 16 }}><PurBtn onClick={() => go(11)}>Skip - Use Existing Media</PurBtn></div>}
      </div>
    </Page>
  );
}

function P11({ go, assets }: { go: (n: number) => void; assets: string[] }) {
  const types = ["All","Video","Audio","Image","Generated"];
  const [filter, setFilter] = useState("All");
  const library = [
    { name: "Opening Scene.mp4", type: "Video", icon: "🎬" }, { name: "Background Music.mp3", type: "Audio", icon: "🎵" },
    { name: "Character Art.png", type: "Image", icon: "🖼️" }, { name: "Voiceover Track.mp3", type: "Audio", icon: "🎙️" },
    { name: "Title Card.png", type: "Image", icon: "🏷️" }, { name: "Ending Credits.mp4", type: "Video", icon: "🎥" },
    ...assets.map(a => ({ name: a + " (Generated)", type: "Generated", icon: "✨" })),
  ];
  const shown = filter === "All" ? library : library.filter(i => i.type === filter);
  return (
    <Page sparkle>
      <div style={{ padding: "16px", maxWidth: 500, margin: "0 auto" }}>
        <SH>Media Library</SH>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {types.map(t => <button key={t} onClick={() => setFilter(t)} style={{ background: filter === t ? GOLD : BG3, color: filter === t ? "#000" : TEXT2, border: "1px solid " + (filter === t ? GOLD : BORDER), borderRadius: 12, padding: "5px 14px", fontSize: 12, cursor: "pointer", fontWeight: 700 }}>{t}</button>)}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {shown.map(item => (
            <div key={item.name} style={{ background: BG3, border: "1px solid " + BORDER, display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: 12, padding: "12px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ fontSize: 22 }}>{item.icon}</span><div><div style={{ color: TEXT, fontWeight: 600, fontSize: 13 }}>{item.name}</div><div style={{ color: TEXT3, fontSize: 11 }}>{item.type}</div></div></div>
              <button onClick={() => go(13)} style={{ background: PUR2, color: "#fff", border: "none", borderRadius: 10, padding: "5px 12px", fontSize: 11, cursor: "pointer", fontWeight: 700 }}>+ Timeline</button>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20 }}><GoldBtn onClick={() => go(13)}>Open Timeline Editor</GoldBtn></div>
      </div>
    </Page>
  );
}

function P12({ go }: { go: (n: number) => void }) {
  const tabs = ["Script","Storyboard","Notes","Characters","Locations"];
  const [tab, setTab] = useState("Script");
  const [text, setText] = useState("");
  const durations = ["15 min","30 min","45 min","60 min","90 min","120 min"];
  const [dur, setDur] = useState("60 min");
  return (
    <Page sparkle>
      <div style={{ padding: "16px", maxWidth: 500, margin: "0 auto" }}>
        <SH>Editor Suite</SH>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 16 }}>
          {tabs.map(t => <button key={t} onClick={() => setTab(t)} style={{ background: tab === t ? GOLD : BG3, color: tab === t ? "#000" : TEXT2, border: "1px solid " + (tab === t ? GOLD : BORDER), borderRadius: 12, padding: "5px 14px", fontSize: 12, cursor: "pointer", fontWeight: 700, whiteSpace: "nowrap" }}>{t}</button>)}
        </div>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder={"Write your " + tab.toLowerCase() + " here..."} style={{ background: BG3, border: "1px solid " + BORDER, color: TEXT, borderRadius: 16, width: "100%", padding: 14, minHeight: 180, fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
        <div style={{ marginTop: 16 }}>
          <div style={{ color: GOLD, fontWeight: 700, marginBottom: 8 }}>Movie Duration</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {durations.map(d => <button key={d} onClick={() => setDur(d)} style={{ background: dur === d ? GOLD : BG3, color: dur === d ? "#000" : TEXT2, border: "1px solid " + (dur === d ? GOLD : BORDER), borderRadius: 10, padding: "5px 14px", fontSize: 12, cursor: "pointer", fontWeight: 700 }}>{d}</button>)}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
          <GoldBtn onClick={() => go(13)} style={{ flex: 1 }}>Timeline</GoldBtn>
          <button style={{ background: BG3, color: TEXT2, border: "1px solid " + BORDER, borderRadius: 12, padding: "10px 18px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>Save</button>
        </div>
      </div>
    </Page>
  );
}

function P13({ go }: { go: (n: number) => void }) {
  const defaultTracks = [
    { id: 1, label: "Video", color: PUR2, clips: ["Opening Scene", "Main Act", "Climax"] },
    { id: 2, label: "Audio", color: GOLDDIM, clips: ["Background Music", "Ambient"] },
    { id: 3, label: "Voiceover", color: "#0e7490", clips: ["VO Take 1"] },
    { id: 4, label: "SFX", color: "#065f46", clips: ["Swoosh", "Boom"] },
    { id: 5, label: "SRT Subtitles", color: "#92400e", clips: ["English Subs"] },
  ];
  const [tracks, setTracks] = useState(defaultTracks);
  const [zoom, setZoom] = useState(1);
  const addTrack = () => {
    const labels = ["B-Roll","Music 2","Title Cards","VFX Layer"];
    const colors = ["#7f1d1d","#1e3a5f","#1a2e1a","#2d1b69"];
    const i = tracks.length % 4;
    setTracks(prev => [...prev, { id: Date.now(), label: labels[i], color: colors[i], clips: ["New Clip"] }]);
  };
  return (
    <Page sparkle>
      <div style={{ padding: "16px", maxWidth: 500, margin: "0 auto" }}>
        <SH>Timeline Editor</SH>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          <button onClick={addTrack} style={{ background: PUR2, color: "#fff", border: "none", borderRadius: 10, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontWeight: 700 }}>+ Add Track</button>
          <button onClick={() => setZoom(z => Math.min(z+0.25,3))} style={{ background: BG3, color: TEXT2, border: "1px solid " + BORDER, borderRadius: 10, padding: "6px 12px", fontSize: 12, cursor: "pointer" }}>Zoom+</button>
          <button onClick={() => setZoom(z => Math.max(z-0.25,0.5))} style={{ background: BG3, color: TEXT2, border: "1px solid " + BORDER, borderRadius: 10, padding: "6px 12px", fontSize: 12, cursor: "pointer" }}>Zoom-</button>
          <span style={{ color: TEXT3, fontSize: 12, alignSelf: "center" }}>x{zoom.toFixed(2)}</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: 500*zoom }}>
            <div style={{ display: "flex", background: BG4, borderRadius: "8px 8px 0 0", borderBottom: "1px solid " + BORDER, padding: "3px 8px" }}>
              {Array.from({length:10}).map((_,i) => <div key={i} style={{ flex: 1, color: TEXT3, fontSize: 10, textAlign: "center" }}>{i*10}s</div>)}
            </div>
            {tracks.map(track => (
              <div key={track.id} style={{ display: "flex", alignItems: "center", borderBottom: "1px solid " + BORDER, minHeight: 44 }}>
                <div style={{ width: 90, minWidth: 90, color: TEXT2, fontSize: 12, fontWeight: 700, padding: "0 8px", background: BG4, alignSelf: "stretch", display: "flex", alignItems: "center" }}>{track.label}</div>
                <div style={{ flex: 1, padding: 4, display: "flex", gap: 4 }}>
                  {track.clips.map((c,i) => <div key={i} draggable style={{ background: track.color+"44", border: "1px solid "+track.color, borderRadius: 8, padding: "4px 10px", color: "#fff", fontSize: 11, cursor: "grab", whiteSpace: "nowrap", minWidth: 80*zoom, textAlign: "center" }}>{c}</div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <GoldBtn onClick={() => go(14)} style={{ flex: 1 }}>Audio Mixer</GoldBtn>
          <PurBtn onClick={() => go(17)} style={{ flex: 1 }}>Preview Film</PurBtn>
        </div>
      </div>
    </Page>
  );
}

function P14({ go }: { go: (n: number) => void }) {
  const channels = [{ label: "Music", icon: "🎵" }, { label: "Voice", icon: "🎙️" }, { label: "SFX", icon: "🔊" }, { label: "Master", icon: "🎚️" }];
  const [levels, setLevels] = useState([75,85,60,90]);
  const [muted, setMuted] = useState([false,false,false,false]);
  const effects = ["Reverb","Echo","EQ","Compressor","Limiter"];
  const [fx, setFx] = useState<string[]>([]);
  return (
    <Page sparkle>
      <div style={{ padding: "16px", maxWidth: 500, margin: "0 auto" }}>
        <SH>Audio Mixer</SH>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
          {channels.map((ch,i) => (
            <div key={ch.label} style={{ background: BG3, border: "1px solid " + GOLDDIM, borderRadius: 14, display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 0", gap: 8 }}>
              <span style={{ fontSize: 22 }}>{ch.icon}</span>
              <span style={{ color: GOLD, fontSize: 11, fontWeight: 700 }}>{ch.label}</span>
              <div style={{ height: 100, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <input type="range" min={0} max={100} value={levels[i]} onChange={e => setLevels(prev => { const n=[...prev]; n[i]=+e.target.value; return n; })} style={{ writingMode: "vertical-lr", direction: "rtl", height: 80 }} />
                <span style={{ color: TEXT3, fontSize: 10 }}>{levels[i]}</span>
              </div>
              <button onClick={() => setMuted(prev => { const n=[...prev]; n[i]=!n[i]; return n; })} style={{ background: muted[i]?"#7f1d1d":BG4, color: muted[i]?"#ef4444":TEXT2, border: "1px solid "+(muted[i]?"#ef4444":BORDER), borderRadius: 8, padding: "3px 8px", fontSize: 10, cursor: "pointer" }}>{muted[i]?"MUTED":"LIVE"}</button>
            </div>
          ))}
        </div>
        <div style={{ color: GOLD, fontWeight: 700, marginBottom: 8 }}>Effects</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {effects.map(e => <button key={e} onClick={() => setFx(prev => prev.includes(e)?prev.filter(x=>x!==e):[...prev,e])} style={{ background: fx.includes(e)?PUR2:BG3, color: fx.includes(e)?"#fff":TEXT2, border: "1px solid "+(fx.includes(e)?PUR2:BORDER), borderRadius: 10, padding: "5px 14px", fontSize: 12, cursor: "pointer", fontWeight: 700 }}>{e}</button>)}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => go(13)} style={{ background: BG3, color: TEXT2, border: "1px solid "+BORDER, borderRadius: 12, padding: "10px 16px", cursor: "pointer", fontSize: 13 }}>Timeline</button>
          <GoldBtn onClick={() => go(17)} style={{ flex: 1 }}>Preview Film</GoldBtn>
        </div>
      </div>
    </Page>
  );
}

function P15({ go }: { go: (n: number) => void }) {
  const qualities = ["720p","1080p","4K"];
  const formats = ["MP4","MOV","AVI","WebM"];
  const [quality, setQuality] = useState("1080p");
  const [format, setFormat] = useState("MP4");
  const [duration, setDuration] = useState(60);
  const [rendering, setRendering] = useState(false);
  const [progress, setProgress] = useState(0);
  const startRender = () => {
    setRendering(true); setProgress(0);
    const iv = setInterval(() => { setProgress(p => { if (p>=100) { clearInterval(iv); setRendering(false); return 100; } return p+2; }); }, 80);
  };
  return (
    <Page sparkle>
      <div style={{ padding: "16px", maxWidth: 500, margin: "0 auto" }}>
        <SH>Render Film</SH>
        <div style={{ background: BG3, border: "1px solid " + GOLDDIM, borderRadius: 16, padding: 20, marginBottom: 16 }}>
          <div style={{ color: GOLD, fontWeight: 700, marginBottom: 8 }}>Film Duration: {duration} minutes</div>
          <input type="range" min={0} max={180} value={duration} onChange={e => setDuration(+e.target.value)} style={{ width: "100%" }} />
          <div style={{ display: "flex", justifyContent: "space-between", color: TEXT3, fontSize: 11, marginTop: 4 }}><span>0 min</span><span>90 min</span><span>180 min</span></div>
        </div>
        <div style={{ background: BG3, border: "1px solid " + BORDER, borderRadius: 16, padding: 20, marginBottom: 16 }}>
          <div style={{ color: GOLD, fontWeight: 700, marginBottom: 8 }}>Export Quality</div>
          <div style={{ display: "flex", gap: 8 }}>{qualities.map(q => <button key={q} onClick={() => setQuality(q)} style={{ background: quality===q?GOLD:BG4, color: quality===q?"#000":TEXT2, border: "1px solid "+(quality===q?GOLD:BORDER), borderRadius: 10, padding: "6px 16px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>{q}</button>)}</div>
        </div>
        <div style={{ background: BG3, border: "1px solid " + BORDER, borderRadius: 16, padding: 20, marginBottom: 16 }}>
          <div style={{ color: GOLD, fontWeight: 700, marginBottom: 8 }}>File Format</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{formats.map(f => <button key={f} onClick={() => setFormat(f)} style={{ background: format===f?PUR2:BG4, color: format===f?"#fff":TEXT2, border: "1px solid "+(format===f?PUR2:BORDER), borderRadius: 10, padding: "6px 16px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>{f}</button>)}</div>
        </div>
        {rendering && <div style={{ background: BG3, border: "1px solid "+GOLDDIM, borderRadius: 16, padding: 20, marginBottom: 16 }}><div style={{ color: GOLD, fontWeight: 700, marginBottom: 8 }}>Rendering... {progress}%</div><div style={{ background: BG4, borderRadius: 8, height: 10 }}><div style={{ background: "linear-gradient(90deg,"+PUR2+","+GOLD+")", width: progress+"%", height: "100%", borderRadius: 8 }} /></div></div>}
        {progress === 100 && <div style={{ background: BG3, border: "1px solid "+GOLD, borderRadius: 16, padding: 20, marginBottom: 16 }}><div style={{ color: GOLD, fontWeight: 700 }}>Render Complete!</div><p style={{ color: TEXT2, fontSize: 13, marginTop: 4 }}>Your film is ready in {quality} {format}.</p><GoldBtn onClick={() => {}}>Download Film</GoldBtn></div>}
        {!rendering && progress < 100 && <GoldBtn onClick={startRender}>Render Film ({quality} {format} - {duration} min)</GoldBtn>}
      </div>
    </Page>
  );
}

function P16({ go }: { go: (n: number) => void }) {
  const tuts = [
    { title: "Getting Started", duration: "5 min", icon: "🚀", cat: "Beginner" },
    { title: "Using the AI Tool Board", duration: "8 min", icon: "🤖", cat: "Beginner" },
    { title: "Timeline Editing Basics", duration: "12 min", icon: "✂️", cat: "Intermediate" },
    { title: "Audio Mixing Deep Dive", duration: "15 min", icon: "🎛️", cat: "Intermediate" },
    { title: "Advanced VFX Techniques", duration: "20 min", icon: "✨", cat: "Advanced" },
    { title: "Export and Distribution", duration: "7 min", icon: "📤", cat: "Beginner" },
  ];
  const [playing, setPlaying] = useState<string | null>(null);
  return (
    <Page sparkle>
      <div style={{ padding: "16px", maxWidth: 500, margin: "0 auto" }}>
        <SH>Tutorials and Learning Centre</SH>
        {playing && <div style={{ background: BG3, border: "1px solid "+PUR2, borderRadius: 16, padding: 16, marginBottom: 16 }}><div style={{ color: GOLD, fontWeight: 700, marginBottom: 6 }}>Now Playing: {playing}</div><div style={{ background: "#000", borderRadius: 12, height: 140, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: TEXT3 }}>Video player</span></div><button onClick={() => setPlaying(null)} style={{ marginTop: 8, color: TEXT3, background: "none", border: "none", cursor: "pointer", fontSize: 12 }}>Close</button></div>}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {tuts.map(t => (
            <div key={t.title} style={{ background: BG3, border: "1px solid "+GOLDDIM, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ fontSize: 24 }}>{t.icon}</span><div><div style={{ color: TEXT, fontWeight: 600, fontSize: 13 }}>{t.title}</div><div style={{ color: TEXT3, fontSize: 11 }}>{t.cat} - {t.duration}</div></div></div>
              <button onClick={() => setPlaying(t.title)} style={{ background: PUR2, color: "#fff", border: "none", borderRadius: 10, padding: "5px 12px", fontSize: 11, cursor: "pointer", fontWeight: 700 }}>Play</button>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

function P17({ go }: { go: (n: number) => void }) {
  const [playing, setPlaying] = useState(false);
  return (
    <Page sparkle>
      <div style={{ padding: "16px", maxWidth: 500, margin: "0 auto" }}>
        <SH>Film Preview</SH>
        <div style={{ background: "#000", borderRadius: 18, overflow: "hidden", marginBottom: 16 }}>
          {!playing
            ? <div onClick={() => setPlaying(true)} style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10, cursor: "pointer" }}><div style={{ fontSize: 60 }}>&#9654;</div><div style={{ color: TEXT2, fontSize: 14 }}>Tap to preview your film</div></div>
            : <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "#111" }}><div style={{ color: TEXT2 }}>Playing preview...</div></div>}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <GoldBtn onClick={() => go(15)} style={{ flex: 1 }}>Render Film</GoldBtn>
          <PurBtn onClick={() => go(13)} style={{ flex: 1 }}>Edit</PurBtn>
        </div>
      </div>
    </Page>
  );
}

function P18({ go }: { go: (n: number) => void }) {
  return (
    <Page sparkle>
      <div style={{ padding: "24px 20px", maxWidth: 500, margin: "0 auto" }}>
        <SH>Terms of Service and Disclaimer</SH>
        <div style={{ background: BG3, border: "1px solid "+GOLDDIM, borderRadius: 16, padding: 20, marginBottom: 20 }}>
          <div style={{ color: GOLD, fontWeight: 800, fontSize: 16, marginBottom: 10 }}>Terms of Service</div>
          <p style={{ color: TEXT2, lineHeight: 1.8, fontSize: 13 }}>By using MandaStrong Studio, you agree to use the platform solely for lawful creative and educational purposes. You retain full copyright ownership of all original content you create. You grant MandaStrong Studio a limited, non-exclusive licence to host and display your content within the platform. You must not upload content that infringes third-party rights, contains explicit material, or violates applicable laws. MandaStrong Studio reserves the right to suspend accounts that breach these terms. Subscriptions are billed monthly and may be cancelled at any time. Refunds are issued at our discretion within 7 days of purchase.</p>
        </div>
        <div style={{ background: BG3, border: "1px solid "+GOLDDIM, borderRadius: 16, padding: 20, marginBottom: 20 }}>
          <div style={{ color: GOLD, fontWeight: 800, fontSize: 16, marginBottom: 10 }}>Disclaimer</div>
          <p style={{ color: TEXT2, lineHeight: 1.8, fontSize: 13 }}>MandaStrong Studio provides AI-powered creative tools on an as-is basis. While we strive for accuracy and reliability, we make no warranties regarding the uninterrupted availability of services or the quality of AI-generated content. We are not responsible for any loss, damage, or liability arising from the use of this platform. Educational resources provided are for general guidance only and do not constitute professional, legal, or psychological advice. By using this platform you acknowledge and accept these terms in full.</p>
        </div>
        <GoldBtn onClick={() => go(19)}>Continue to Help Desk</GoldBtn>
      </div>
    </Page>
  );
}

function P19({ go }: { go: (n: number) => void }) {
  const [msgs, setMsgs] = useState<{ role: string; content: string }[]>([]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);
  const send = async () => {
    if (!inp.trim() || loading) return;
    const userMsg = inp.trim(); setInp("");
    const history = [...msgs, { role: "user", content: userMsg }];
    setMsgs(history); setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: "You are Agent Grok, the 24/7 production assistant for MandaStrong Studio - an AI-powered filmmaking platform. Help users with uploading media, AI tools, editing, timeline, audio mixing, rendering and exporting. Plans: Basic $10/mo, Pro $20/mo, Studio $30/mo. Be helpful and concise.", messages: history.map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      const reply = data.content?.map((c: any) => c.text || "").join("") || "I am here to help - ask me anything about MandaStrong Studio.";
      setMsgs([...history, { role: "assistant", content: reply }]);
    } catch { setMsgs([...history, { role: "assistant", content: "Connection error - please try again." }]); }
    setLoading(false);
  };
  const quickQ = ["How do I upload a video?","How do AI tools work?","How do I render my film?","How do I add timeline tracks?","Where is the Audio Mixer?"];
  return (
    <Page sparkle>
      <div style={{ padding: "16px", maxWidth: 500, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ width: 56, height: 56, border: "2px solid "+GOLD, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 8px", background: BG3, boxShadow: "0 0 20px "+GOLDDIM }}>🤖</div>
          <div style={{ color: GOLD2, fontWeight: 900, fontSize: 18, letterSpacing: 2 }}>AGENT GROK</div>
          <div style={{ fontSize: 11, color: TEXT3, marginTop: 3 }}>24/7 PRODUCTION SUPPORT - <span style={{ color: "#2ecc71" }}>ONLINE</span></div>
        </div>
        <div style={{ background: BG2, border: "1px solid "+BORDER, borderRadius: 16, padding: 14, minHeight: 260, maxHeight: 360, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
          {msgs.length === 0 && <div style={{ padding: "10px 14px", background: "rgba(26,82,118,.2)", borderLeft: "2px solid #2980b9", color: "#aed6f1", fontSize: 13, lineHeight: 1.7, borderRadius: 8 }}>I am Agent Grok - your 24/7 MandaStrong Studio assistant powered by Claude AI. Ask me anything about the platform!</div>}
          {msgs.map((m,i) => (
            <div key={i} style={{ padding: "10px 14px", borderRadius: 10, fontSize: 13, lineHeight: 1.7, background: m.role==="user"?"rgba(212,168,71,.1)":"rgba(26,82,118,.2)", borderLeft: m.role==="user"?"2px solid "+GOLDDIM:"2px solid #2980b9", color: m.role==="user"?TEXT:"#aed6f1" }}>
              <span style={{ fontSize: 10, color: TEXT3, display: "block", marginBottom: 4 }}>{m.role==="user"?"YOU":"AGENT GROK"}</span>
              {m.content}
            </div>
          ))}
          {loading && <div style={{ padding: "10px 14px", background: "rgba(26,82,118,.2)", borderLeft: "2px solid #2980b9", borderRadius: 10, color: TEXT3, fontSize: 12, fontStyle: "italic" }}>Agent Grok is thinking...</div>}
          <div ref={bottomRef} />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
          {quickQ.map(q => <button key={q} onClick={() => setInp(q)} style={{ background: BG3, border: "1px solid "+GOLDDIM, color: TEXT3, borderRadius: 8, padding: "4px 10px", fontSize: 11, cursor: "pointer" }}>{q}</button>)}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <textarea value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => { if (e.key==="Enter"&&!e.shiftKey) { e.preventDefault(); send(); } }} placeholder="Ask Agent Grok anything..." style={{ flex: 1, height: 52, resize: "none", padding: "10px 12px", fontSize: 13, background: BG3, border: "1px solid "+GOLDDIM, color: TEXT, borderRadius: 12, outline: "none" }} />
          <button onClick={send} disabled={loading||!inp.trim()} style={{ height: 52, padding: "0 18px", background: "linear-gradient(135deg,"+GOLDDIM+","+GOLD+")", color: "#000", fontWeight: 700, border: "none", borderRadius: 12, cursor: "pointer", opacity: loading||!inp.trim()?0.5:1 }}>Ask</button>
        </div>
      </div>
    </Page>
  );
}

type CPost = { id: number; user: string; title: string; desc: string; likes: number; videoFile: File | null; comments: string[] };

function CommunityCard({ post, onLike, onComment }: { post: CPost; onLike: () => void; onComment: (c: string) => void }) {
  const [cmtOpen, setCmtOpen] = useState(false);
  const [cmtText, setCmtText] = useState("");
  const [reacted, setReacted] = useState("");
  const EMOJIS = ["❤️","👏","🔥","🙌","😍","🎬","⭐","💯"];
  const videoSrc = post.videoFile ? URL.createObjectURL(post.videoFile) : null;
  return (
    <div style={{ background: BG3, border: "1px solid "+GOLDDIM, borderRadius: 20, overflow: "hidden", marginBottom: 16, boxShadow: "0 0 8px "+GOLDDIM+"44" }}>
      <div style={{ background: "#000", minHeight: 140 }}>
        {videoSrc ? <video src={videoSrc} controls playsInline style={{ width: "100%", display: "block", maxHeight: 180, objectFit: "cover" }} /> : <div style={{ height: 140, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}><div style={{ fontSize: 44, opacity: 0.4 }}>🎬</div><div style={{ color: TEXT3, fontSize: 11 }}>No video uploaded</div></div>}
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <div style={{ color: GOLD, fontWeight: 800, fontSize: 15 }}>{post.title}</div>
          {post.likes > 80 && <span style={{ background: GOLDDIM, color: GOLD2, borderRadius: 8, padding: "2px 8px", fontSize: 10, fontWeight: 700 }}>TRENDING</span>}
        </div>
        <div style={{ color: TEXT3, fontSize: 11, marginBottom: 6 }}>by {post.user}</div>
        <div style={{ color: TEXT2, fontSize: 13, marginBottom: 12 }}>{post.desc}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10, alignItems: "center" }}>
          {EMOJIS.map(e => <button key={e} onClick={() => { setReacted(e); onLike(); }} style={{ background: reacted===e?"#2d1b69":BG4, border: "1px solid "+(reacted===e?PUR2:BORDER), borderRadius: 8, padding: "4px 8px", fontSize: 15, cursor: "pointer" }}>{e}</button>)}
          <span style={{ color: GOLDDIM, fontWeight: 700, fontSize: 13, marginLeft: 4 }}>{post.likes}</span>
        </div>
        <button onClick={() => setCmtOpen(!cmtOpen)} style={{ background: "none", border: "none", color: TEXT3, fontSize: 12, cursor: "pointer" }}>Comments ({post.comments.length}) {cmtOpen?"v":">"}</button>
        {cmtOpen && (
          <div style={{ marginTop: 10 }}>
            {post.comments.map((c,i) => <div key={i} style={{ background: BG4, borderRadius: 10, padding: "7px 12px", fontSize: 12, color: TEXT2, marginBottom: 6 }}>{c}</div>)}
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <input value={cmtText} onChange={e => setCmtText(e.target.value)} onKeyDown={e => { if (e.key==="Enter"&&cmtText.trim()) { onComment(cmtText.trim()); setCmtText(""); } }} placeholder="Add a comment..." style={{ flex: 1, background: BG2, border: "1px solid "+BORDER, color: TEXT, borderRadius: 10, padding: "7px 10px", fontSize: 12, outline: "none" }} />
              <button onClick={() => { if (cmtText.trim()) { onComment(cmtText.trim()); setCmtText(""); } }} style={{ background: PUR2, color: "#fff", border: "none", borderRadius: 10, padding: "7px 14px", fontSize: 12, cursor: "pointer", fontWeight: 700 }}>Post</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function P20({ go }: { go: (n: number) => void }) {
  const [posts, setPosts] = useState<CPost[]>([
    { id: 1, user: "CineCreator", title: "The Bully's Redemption", desc: "A short film about second chances.", likes: 47, videoFile: null, comments: ["Powerful message!","Love this film."] },
    { id: 2, user: "FilmMakerJ", title: "Social Skills 101", desc: "Animated educational short for schools.", likes: 89, videoFile: null, comments: ["Great for classrooms!"] },
    { id: 3, user: "StoryTeller_M", title: "Together We Rise", desc: "Community fundraiser documentary.", likes: 134, videoFile: null, comments: ["Inspiring!","Shared this everywhere."] },
  ]);
  const uploadRef = useRef<HTMLInputElement>(null);
  const addPost = (file: File) => {
    const title = file.name.split(".").slice(0,-1).join(".") || file.name;
    setPosts(prev => [{ id: Date.now(), user: "You", title, desc: "Just uploaded to MandaStrong Community.", likes: 0, videoFile: file, comments: [] }, ...prev]);
  };
  const likePost = (id: number) => setPosts(prev => prev.map(p => p.id===id?{...p,likes:p.likes+1}:p));
  const addComment = (id: number, c: string) => setPosts(prev => prev.map(p => p.id===id?{...p,comments:[...p.comments,c]}:p));
  return (
    <Page sparkle>
      <div style={{ padding: "16px", maxWidth: 500, margin: "0 auto" }}>
        <SH>Community Hub</SH>
        <p style={{ color: TEXT2, fontSize: 13, marginBottom: 14 }}>Upload your finished films. React with emojis and leave comments.</p>
        <input ref={uploadRef} type="file" accept="video/*" style={{ display: "none" }} onChange={e => { const f=e.target.files?.[0]; if (f) addPost(f); }} />
        <button onClick={() => uploadRef.current?.click()} style={{ background: "linear-gradient(135deg,"+PUR3+",#1e0a4a)", border: "1.5px dashed "+PUR2, borderRadius: 16, width: "100%", padding: 16, color: GOLD, cursor: "pointer", marginBottom: 20, fontSize: 14, fontWeight: 700 }}>Upload Your Film to Community</button>
        {posts.map(p => <CommunityCard key={p.id} post={p} onLike={() => likePost(p.id)} onComment={c => addComment(p.id, c)} />)}
      </div>
    </Page>
  );
}

function P21({ go }: { go: (n: number) => void }) {
  const [guideOpen, setGuideOpen] = useState(false);
  return (
    <div style={{ background: "radial-gradient(ellipse at center, #1a1200 0%, #0a0800 40%, #000 100%)", minHeight: "100vh", paddingTop: 52, position: "relative", overflow: "hidden" }}>
      <Sparkles />
      <div style={{ position: "relative", zIndex: 1, padding: "24px 20px", maxWidth: 500, margin: "0 auto" }}>
        <div style={{ borderRadius: 18, overflow: "hidden", marginBottom: 22, background: "#000", border: "2px solid "+GOLDDIM, boxShadow: "0 0 30px "+GOLDDIM+"66" }}>
          <video src="/video3.mp4" controls autoPlay muted loop playsInline style={{ width: "100%", display: "block", maxHeight: 220, objectFit: "cover" }} />
        </div>
        <h1 style={{ color: GOLD, fontWeight: 900, fontSize: 32, textAlign: "center", textTransform: "uppercase", letterSpacing: 3, marginBottom: 22, animation: "glowPulse 3s ease-in-out infinite", textShadow: "0 0 20px #d4a847" }}>
          That's All Folks!
        </h1>
        <div style={{ background: "linear-gradient(135deg,#1c1200,#2a1a00)", border: "1.5px solid "+GOLDDIM, borderRadius: 18, padding: 22, marginBottom: 16, textAlign: "center" }}>
          <div style={{ color: GOLD2, fontWeight: 800, fontSize: 17, marginBottom: 12 }}>A Special Thank You</div>
          <p style={{ color: GOLD, fontSize: 13, lineHeight: 1.8, fontStyle: "italic", marginBottom: 10 }}>To all current and future creators, dreamers, and storytellers...</p>
          <p style={{ color: TEXT, fontSize: 13, lineHeight: 1.9, marginBottom: 10 }}>Your creativity and passion inspire positive change in the world. Through your films and stories, you have the power to educate, inspire, and bring awareness to critical issues like bullying prevention, social skills development, and humanity's collective growth.</p>
          <p style={{ color: TEXT, fontSize: 13, lineHeight: 1.9 }}>Together, we are building a community of creators who use their talents to spread kindness, understanding, and hope. Your impact matters more than you know.</p>
        </div>
        <button onClick={() => setGuideOpen(!guideOpen)} style={{ background: "linear-gradient(135deg,#1c1200,#2a1a00)", border: "1.5px solid "+GOLD, borderRadius: 14, width: "100%", padding: 16, cursor: "pointer", marginBottom: 16, textAlign: "center" }}>
          <div style={{ color: GOLD, fontWeight: 800, fontSize: 15 }}>Full User Guide To MandaStrong Studio</div>
          <div style={{ color: GOLDDIM, fontSize: 12, marginTop: 4 }}>Click to access the complete guide</div>
        </button>
        <div style={{ background: "linear-gradient(135deg,#120d00,#1e1500)", border: "1.5px solid "+GOLDDIM, borderRadius: 18, padding: 20, marginBottom: 16 }}>
          <div style={{ color: GOLD2, fontWeight: 800, fontSize: 16, marginBottom: 12, textAlign: "center" }}>About Our Mission</div>
          <p style={{ color: TEXT, fontSize: 13, lineHeight: 1.9, marginBottom: 12, textAlign: "center" }}>MandaStrong Studio is more than a filmmaking platform. It is part of a comprehensive educational initiative designed to bring awareness and action to schools regarding bullying prevention, social skills development, and the cultivation of humanity in our communities.</p>
          <div style={{ background: "#0d0900", border: "1px solid "+GOLDDIM, borderRadius: 14, padding: 14, marginBottom: 12, textAlign: "center" }}>
            <p style={{ color: TEXT, fontSize: 12, lineHeight: 1.8 }}>Fundraiser: Educational Program on Bullying Prevention and Social Skills - Through this program, we provide educational resources and movie-based content to help schools address these critical issues.</p>
          </div>
          <div style={{ background: "#0d0900", border: "1px solid "+GOLD, borderRadius: 14, padding: 14, textAlign: "center" }}>
            <div style={{ color: GOLD2, fontWeight: 800, fontSize: 14, marginBottom: 8 }}>Supporting Our Heroes</div>
            <p style={{ color: TEXT, fontSize: 12, lineHeight: 1.8 }}>All Etsy Store Proceeds Benefit Veterans Mental Health Services - 100% of all proceeds donated directly to Veterans Mental Health Services.</p>
          </div>
        </div>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <a href="https://www.etsy.com/shop/MandaStrong1" target="_blank" rel="noopener noreferrer" style={{ color: GOLD, fontWeight: 700, fontSize: 13, textDecoration: "underline" }}>Visit our fundraiser at MandaStrong1.Etsy.com</a>
        </div>
        {guideOpen && (
          <div style={{ background: "linear-gradient(135deg,#1c1200,#2a1a00)", border: "1.5px solid "+GOLD, borderRadius: 16, padding: 20, marginBottom: 16 }}>
            <div style={{ color: GOLD, fontWeight: 800, fontSize: 15, marginBottom: 14, textAlign: "center" }}>Full User Guide To MandaStrong Studio</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div><div style={{ color: GOLD2, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>Navigation</div><div style={{ color: TEXT2, fontSize: 11, lineHeight: 2.0 }}><div>Pages 1-3: Welcome, Story, Login</div><div>Pages 4-9: AI Tool Board 600+ tools</div><div>Page 10: Upload your movie</div><div>Page 11: Media Library</div></div></div>
              <div><div style={{ color: GOLD2, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>Editing and Export</div><div style={{ color: TEXT2, fontSize: 11, lineHeight: 2.0 }}><div>Pages 12-16: Editing tools</div><div>Page 17: Film preview</div><div>Page 18: Terms of Service</div><div>Page 19: Agent Grok</div><div>Page 20: Community Hub</div></div></div>
            </div>
          </div>
        )}
        <GoldBtn onClick={() => go(1)}>Start Creating Again</GoldBtn>
      </div>
    </div>
  );
}

const ADMIN_EMAIL = "woolleya129@gmail.com";
const ADMIN_PASS = "Mangler1970!!";
type User = { name: string; email: string; plan: string; isAdmin: boolean };

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
    const isAdmin = email.trim().toLowerCase()===ADMIN_EMAIL.toLowerCase()&&pass===ADMIN_PASS;
    if (mode==="login") { onAuth({ name: isAdmin?"Amanda Strong":(name||email.split("@")[0]), email: email.trim(), plan: isAdmin?"Studio":plan, isAdmin }); }
    else { if (!name.trim()) { setErr("Please enter your name."); return; } onAuth({ name: name.trim(), email: email.trim(), plan, isAdmin }); }
  };
  return (
    <div style={{ background: "radial-gradient(ellipse at center,#1a1200 0%,#0a0800 40%,#000 100%)", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, position: "relative" }}>
      <Sparkles />
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 8, filter: "drop-shadow(0 0 12px #d4a847)" }}>✦</div>
        <h1 style={{ color: GOLD, fontSize: 32, fontWeight: 900, letterSpacing: 4, textTransform: "uppercase", textAlign: "center", marginBottom: 4, textShadow: "0 0 20px #d4a847" }}>MandaStrong<br />Studio</h1>
        <div style={{ color: TEXT2, fontSize: 12, marginBottom: 32, letterSpacing: 1 }}>AI-Powered Filmmaking Platform</div>
        <div style={{ background: BG3, border: "1.5px solid "+GOLDDIM, borderRadius: 22, padding: 28, width: "100%", boxShadow: "0 0 30px "+GOLDDIM+"44" }}>
          <div style={{ display: "flex", marginBottom: 22, background: BG2, borderRadius: 14, padding: 4 }}>
            {(["login","register"] as const).map(m => <button key={m} onClick={() => { setMode(m); setErr(""); }} style={{ flex: 1, background: mode===m?GOLD:"transparent", color: mode===m?"#000":TEXT2, border: "none", borderRadius: 10, padding: "8px 0", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>{m==="login"?"Sign In":"Register"}</button>)}
          </div>
          {mode==="register" && <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={{ background: BG2, border: "1px solid "+GOLDDIM, color: TEXT, borderRadius: 12, width: "100%", padding: "10px 14px", fontSize: 13, outline: "none", marginBottom: 10, boxSizing: "border-box" }} />}
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email" style={{ background: BG2, border: "1px solid "+BORDER, color: TEXT, borderRadius: 12, width: "100%", padding: "10px 14px", fontSize: 13, outline: "none", marginBottom: 10, boxSizing: "border-box" }} />
          <input value={pass} onChange={e => setPass(e.target.value)} placeholder="Password" type="password" onKeyDown={e => e.key==="Enter"&&submit()} style={{ background: BG2, border: "1px solid "+BORDER, color: TEXT, borderRadius: 12, width: "100%", padding: "10px 14px", fontSize: 13, outline: "none", marginBottom: mode==="register"?14:20, boxSizing: "border-box" }} />
          {mode==="register" && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ color: GOLD, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>Select Plan</div>
              <div style={{ display: "flex", gap: 8 }}>{plans.map(p => <button key={p} onClick={() => setPlan(p)} style={{ flex: 1, background: plan===p?GOLD:BG2, color: plan===p?"#000":TEXT2, border: "1px solid "+(plan===p?GOLD:BORDER), borderRadius: 10, padding: "7px 0", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{p}</button>)}</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}><span style={{ color: TEXT3, fontSize: 11 }}>Basic $10/mo</span><span style={{ color: TEXT3, fontSize: 11 }}>Pro $20/mo</span><span style={{ color: TEXT3, fontSize: 11 }}>Studio $30/mo</span></div>
            </div>
          )}
          {err && <div style={{ color: "#ef4444", fontSize: 12, marginBottom: 10 }}>{err}</div>}
          <GoldBtn onClick={submit}>{mode==="login"?"Sign In":"Create Account"}</GoldBtn>
          {mode==="register" && <div style={{ marginTop: 14, background: BG2, borderRadius: 12, padding: 12, textAlign: "center" }}><div style={{ color: TEXT3, fontSize: 11 }}>Stripe secure checkout. Cancel anytime.<br /><a href="https://stripe.com" target="_blank" rel="noopener noreferrer" style={{ color: GOLDDIM }}>Powered by Stripe</a></div></div>}
        </div>
        <div style={{ color: TEXT3, fontSize: 11, marginTop: 16 }}>By continuing you agree to our <span style={{ color: GOLDDIM, cursor: "pointer" }}>Terms of Service</span></div>
      </div>
    </div>
  );
}

function QuickAccess({ go, onClose }: { go: (n: number) => void; onClose: () => void }) {
  const links = [
    { label: "Welcome", icon: "🏠", page: 1 }, { label: "Our Story", icon: "📖", page: 2 }, { label: "Pricing", icon: "💳", page: 3 },
    { label: "Script & Story", icon: "📝", page: 4 }, { label: "Design", icon: "🎨", page: 5 }, { label: "Video & VFX", icon: "🎬", page: 6 },
    { label: "Writing", icon: "✍️", page: 7 }, { label: "Upload & Enhance", icon: "⬆️", page: 8 }, { label: "Edit & Export", icon: "✂️", page: 9 },
    { label: "Upload Movie", icon: "🎞️", page: 10 }, { label: "Media Library", icon: "🗂️", page: 11 }, { label: "Editor Suite", icon: "🖥️", page: 12 },
    { label: "Timeline", icon: "⏱️", page: 13 }, { label: "Audio Mixer", icon: "🎛️", page: 14 }, { label: "Render Film", icon: "📤", page: 15 },
    { label: "Tutorials", icon: "🎓", page: 16 }, { label: "Film Preview", icon: "▶️", page: 17 }, { label: "Terms", icon: "📄", page: 18 },
    { label: "Agent Grok", icon: "🤖", page: 19 }, { label: "Community Hub", icon: "👥", page: 20 }, { label: "Thats All Folks", icon: "🎉", page: 21 },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "flex-end" }} onClick={onClose}>
      <div style={{ background: BG2, borderTop: "2px solid "+GOLD, width: "100%", maxHeight: "80vh", overflowY: "auto", borderRadius: "22px 22px 0 0", padding: 20, boxShadow: "0 -10px 40px "+GOLDDIM+"44" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ color: GOLD, fontWeight: 800, fontSize: 16, letterSpacing: 1 }}>QUICK ACCESS - ALL PAGES</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: TEXT3, fontSize: 22, cursor: "pointer" }}>X</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {links.map(l => <button key={l.page} onClick={() => { go(l.page); onClose(); }} style={{ background: BG3, border: "1px solid "+GOLDDIM, borderRadius: 12, padding: "10px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, textAlign: "left" }}><span style={{ fontSize: 18 }}>{l.icon}</span><span style={{ color: TEXT, fontSize: 12, fontWeight: 600 }}>{l.label}</span><span style={{ color: TEXT3, fontSize: 10, marginLeft: "auto" }}>p{l.page}</span></button>)}
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ onClose }: { onClose: () => void }) {
  const stats = [
    { label: "Total Users", value: "1,284", icon: "👥" }, { label: "Active Subs", value: "847", icon: "💳" },
    { label: "Films Created", value: "3,921", icon: "🎬" }, { label: "Revenue MRR", value: "$16,940", icon: "💰" },
    { label: "Basic Plans", value: "312", icon: "📗" }, { label: "Pro Plans", value: "428", icon: "📘" },
    { label: "Studio Plans", value: "107", icon: "📕" }, { label: "Community Posts", value: "659", icon: "📣" },
  ];
  const recentUsers = [
    { name: "Jordan M.", plan: "Pro", joined: "Today" }, { name: "Sam K.", plan: "Studio", joined: "Yesterday" },
    { name: "Taylor R.", plan: "Basic", joined: "2 days ago" }, { name: "Alex P.", plan: "Pro", joined: "3 days ago" },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.95)", overflowY: "auto" }} onClick={onClose}>
      <div style={{ background: BG2, margin: "20px 12px", borderRadius: 22, border: "2px solid "+GOLD, padding: 20, boxShadow: "0 0 40px "+GOLDDIM+"66" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ color: GOLD, fontWeight: 900, fontSize: 18, letterSpacing: 1 }}>ADMIN DASHBOARD</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: TEXT3, fontSize: 22, cursor: "pointer" }}>X</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {stats.map(s => <div key={s.label} style={{ background: BG3, border: "1px solid "+GOLDDIM, borderRadius: 14, padding: 14, boxShadow: "0 0 8px "+GOLDDIM+"33" }}><div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div><div style={{ color: GOLD2, fontWeight: 800, fontSize: 18 }}>{s.value}</div><div style={{ color: TEXT3, fontSize: 11 }}>{s.label}</div></div>)}
        </div>
        <div style={{ background: BG3, border: "1px solid "+GOLDDIM, borderRadius: 14, padding: 16, marginBottom: 20 }}>
          <div style={{ color: GOLD, fontWeight: 700, marginBottom: 10 }}>Stripe Revenue - This Month</div>
          <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 60 }}>
            {[40,55,45,70,60,80,75,90,85,95,88,100].map((h,i) => <div key={i} style={{ flex: 1, background: "linear-gradient(to top,"+PUR2+","+GOLD+")", borderRadius: 4, height: h+"%", opacity: 0.8 }} />)}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}><span style={{ color: TEXT3, fontSize: 10 }}>Jan</span><span style={{ color: TEXT3, fontSize: 10 }}>Dec</span></div>
        </div>
        <div style={{ color: GOLD, fontWeight: 700, marginBottom: 10 }}>Recent Sign-ups</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
          {recentUsers.map(u => (
            <div key={u.name} style={{ background: BG3, border: "1px solid "+BORDER, borderRadius: 12, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><div style={{ color: TEXT, fontWeight: 600, fontSize: 13 }}>{u.name}</div><div style={{ color: TEXT3, fontSize: 11 }}>{u.joined}</div></div>
              <div style={{ background: u.plan==="Studio"?GOLDDIM:u.plan==="Pro"?PUR2:BG4, color: u.plan==="Studio"?GOLD2:"#fff", borderRadius: 8, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{u.plan}</div>
            </div>
          ))}
        </div>
        <GoldBtn onClick={onClose}>Close Dashboard</GoldBtn>
      </div>
    </div>
  );
}

const TOTAL = 21;

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState(1);
  const [assets, setAssets] = useState<string[]>([]);
  const [showQA, setShowQA] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const go = useCallback((n: number) => {
    const clamped = Math.max(1, Math.min(TOTAL, n));
    setPage(clamped);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const addAsset = useCallback((name: string) => {
    setAssets(prev => prev.includes(name) ? prev : [...prev, name]);
  }, []);

  if (!user) return <LoginScreen onAuth={u => { setUser(u); setPage(1); }} />;

  const pages: Record<number, React.ReactNode> = {
    1: <P1 go={go} />, 2: <P2 go={go} />, 3: <P3 go={go} />,
    4: <AIToolBoard pageNum={4} go={go} addAsset={addAsset} />,
    5: <AIToolBoard pageNum={5} go={go} addAsset={addAsset} />,
    6: <AIToolBoard pageNum={6} go={go} addAsset={addAsset} />,
    7: <AIToolBoard pageNum={7} go={go} addAsset={addAsset} />,
    8: <AIToolBoard pageNum={8} go={go} addAsset={addAsset} />,
    9: <AIToolBoard pageNum={9} go={go} addAsset={addAsset} />,
    10: <P10 go={go} />, 11: <P11 go={go} assets={assets} />, 12: <P12 go={go} />,
    13: <P13 go={go} />, 14: <P14 go={go} />, 15: <P15 go={go} />,
    16: <P16 go={go} />, 17: <P17 go={go} />, 18: <P18 go={go} />,
    19: <P19 go={go} />, 20: <P20 go={go} />, 21: <P21 go={go} />,
  };

  return (
    <>
      <div style={{ background: BG2, borderBottom: "1px solid "+GOLDDIM, position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 12px", gap: 8, boxShadow: "0 2px 20px "+GOLDDIM+"33" }}>
        <button onClick={() => go(Math.max(1,page-1))} disabled={page===1} style={{ color: GOLD, background: "none", border: "none", fontSize: 26, fontWeight: 900, cursor: "pointer", opacity: page===1?0.3:1, padding: "0 4px" }}>&#8249;</button>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
          <span style={{ color: GOLD, fontWeight: 800, fontSize: 13, letterSpacing: 2, textTransform: "uppercase" }}>MandaStrong</span>
          <span style={{ color: TEXT3, fontSize: 10 }}>{page}/{TOTAL}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button onClick={() => setShowQA(true)} style={{ background: BG3, border: "1px solid "+GOLDDIM, color: GOLD, borderRadius: 10, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Quick</button>
          {user.isAdmin && <button onClick={() => setShowAdmin(true)} style={{ background: "#7f1d1d", border: "1px solid #ef4444", color: "#ef4444", borderRadius: 10, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Admin</button>}
          <div style={{ background: BG3, border: "1px solid "+GOLDDIM, borderRadius: 10, padding: "4px 10px", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <span style={{ color: GOLD, fontSize: 11, fontWeight: 700 }}>{user.name.split(" ")[0]}</span>
            <span style={{ color: GOLDDIM, fontSize: 9 }}>{user.plan}</span>
          </div>
          <button onClick={() => go(Math.min(TOTAL,page+1))} disabled={page===TOTAL} style={{ color: GOLD, background: "none", border: "none", fontSize: 26, fontWeight: 900, cursor: "pointer", opacity: page===TOTAL?0.3:1, padding: "0 4px" }}>&#8250;</button>
        </div>
      </div>
      {pages[page] ?? <P1 go={go} />}
      {showQA && <QuickAccess go={go} onClose={() => setShowQA(false)} />}
      {showAdmin && <AdminDashboard onClose={() => setShowAdmin(false)} />}
    </>
  );
}