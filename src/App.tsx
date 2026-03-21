        </div>
        <div style={{ color:GOLD, fontWeight:700, marginBottom:12, fontSize:16 }}>Recent Community Films</div>
        <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:20 }}>
          {[{ title:"The Bully's Redemption", user:"CineCreator", views:"1.2K", duration:"12 min" },{ title:"Social Skills 101", user:"FilmMakerJ", views:"3.4K", duration:"8 min" },{ title:"Together We Rise", user:"StoryTeller_M", views:"5.1K", duration:"22 min" }].map(f=>(<div key={f.title} style={{ background:BG3, border:"1px solid "+BORDER, borderRadius:12, padding:"10px 14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}><div><div style={{ color:GOLD, fontWeight:600, fontSize:14 }}>{f.title}</div><div style={{ color:TEXT3, fontSize:12 }}>by {f.user} &bull; {f.duration}</div></div><div style={{ color:TEXT2, fontSize:13 }}>{f.views} views</div></div>))}
        </div>
        <GoldBtn onClick={onClose}>Close Dashboard</GoldBtn>
      </div>
    </div>
  );
}

const TOTAL = 21;

export default function App() {
  const [user, setUser]           = useState<User|null>(null);
  const [page, setPage]           = useState(1);
  const [assets, setAssets]       = useState<string[]>([]);
  const [showQA, setShowQA]       = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const go = useCallback((n:number) => { const c=Math.max(1,Math.min(TOTAL,n)); setPage(c); window.scrollTo({ top:0, behavior:"smooth" }); },[]);
  const addAsset = useCallback((name:string) => { setAssets(prev=>prev.includes(name)?prev:[...prev,name]); },[]);
  const handleAuth = useCallback((u:User) => { setUser(u); setPage(1); },[]);
  if (!user) return <LoginScreen onAuth={handleAuth} />;
  const pages: Record<number,React.ReactNode> = {
    1:<P1 go={go} />, 2:<P2 go={go} />, 3:<P3 go={go} onAuth={handleAuth} />,
    4:<AIToolBoard pageNum={4} go={go} addAsset={addAsset} />, 5:<AIToolBoard pageNum={5} go={go} addAsset={addAsset} />,
    6:<AIToolBoard pageNum={6} go={go} addAsset={addAsset} />, 7:<AIToolBoard pageNum={7} go={go} addAsset={addAsset} />,
    8:<AIToolBoard pageNum={8} go={go} addAsset={addAsset} />, 9:<AIToolBoard pageNum={9} go={go} addAsset={addAsset} />,
    10:<P10 go={go} />, 11:<P11 go={go} assets={assets} />, 12:<P12 go={go} />,
    13:<P13 go={go} />, 14:<P14 go={go} />, 15:<P15 go={go} />,
    16:<P16 go={go} />, 17:<P17 go={go} />, 18:<P18 go={go} />,
    19:<P19 go={go} />, 20:<P20 go={go} />, 21:<P21 go={go} />,
  };
  return (
    <>
      <div style={{ background:BG2, borderBottom