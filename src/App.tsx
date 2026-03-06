import { useState, useRef, useCallback } from 'react';
import { Menu, Sparkles, MessageCircle, ChevronLeft, ChevronRight, CheckCircle, Play, Upload, Film, Mic, Zap, Shield, Music, Sliders, Database, FileVideo, TrendingUp, BookOpen, Clock, ThumbsUp, Heart, HelpCircle, Plus, Settings, Eye, Layers, X, Download, Save, Wand2, Trash2, Share2, Search } from 'lucide-react';

const AI_TOOLS = {
  Writing: ["Text to Video","Text to Scene","Text to Animation","Text to Film","Script to Movie","Story to Video","Prompt to Video","Description to Scene","Narrative to Film","Dialogue to Animation","Plot to Video","Character to Scene","Action to Animation","Drama to Video","Comedy to Scene","Thriller to Film","Horror to Animation","Romance to Video","Sci-Fi to Scene","Fantasy to Film","Documentary Style","Commercial Creator","Trailer Maker","Music Video","Short Film Gen","Feature Film","Web Series","TV Episode","Podcast Video","Social Media","Vertical Video","Square Video","Widescreen","Ultra Wide","360 Video","VR Scene","AR Content","Hologram","Projection Map","LED Wall","Green Screen","Motion Graphics","Title Sequence","Credits Roll","Lower Thirds","Captions","Subtitles","Voiceover","Narration","Sound Design","Foley","Ambient Sound","Music Score","Theme Song","Jingle","Sound Effect","Transition Sound","Impact","Riser","Drop","Whoosh","Swoosh","Glitch","Digital","Analog","Vintage","Modern","Futuristic","Retro","Classic","Contemporary","Experimental","Abstract","Realistic","Stylized","Cartoon","Anime","3D Animation","2D Animation","Stop Motion","Claymation","Rotoscope","Motion Capture","CGI","VFX","Practical FX","Miniatures","Matte Painting","Compositing","Keying","Tracking","Stabilization","Color Grade","LUT Apply","Film Look","Digital Look","Broadcast","Cinema","IMAX","Anamorphic","Spherical","Wide Angle","Telephoto","Macro","Tilt Shift","Fisheye","Drone Shot","Aerial View","Birds Eye","Worms Eye","POV","First Person","Third Person","Isometric","Top Down","Side Scroller","Parallax","Ken Burns","Time Lapse","Hyperlapse"],
  Voice: ["Text to Speech","Voice Clone","Character Voice","Narrator Voice","Accent British","Accent American","Accent Australian","Accent Irish","Accent Scottish","Accent Indian","Accent French","Accent German","Accent Spanish","Accent Italian","Accent Japanese","Accent Chinese","Accent Korean","Accent Russian","Accent Arabic","Accent Portuguese","Age Child","Age Teen","Age Adult","Age Elderly","Gender Male","Gender Female","Gender Neutral","Emotion Happy","Emotion Sad","Emotion Angry","Emotion Excited","Emotion Calm","Emotion Scared","Emotion Surprised","Emotion Disgusted","Emotion Neutral","Emotion Love","Emotion Hate","Tone Formal","Tone Casual","Tone Professional","Tone Friendly","Tone Serious","Tone Playful","Tone Dramatic","Tone Comedic","Tone Sarcastic","Tone Sincere","Style News Anchor","Style Radio DJ","Style Podcast","Style Audiobook","Style Commercial","Style Trailer","Style Documentary","Style Tutorial","Style Gaming","Style ASMR","Style Meditation","Style Hypnosis","Style Sports Cast","Style Weather","Style Movie Promo","Voice Whisper","Voice Shout","Voice Scream","Voice Laugh","Voice Cry","Voice Sigh","Voice Gasp","Voice Cough","Voice Sneeze","Effect Robot","Effect Alien","Effect Monster","Effect Demon","Effect Angel","Effect Ghost","Effect Zombie","Effect Chipmunk","Effect Deep Bass","Effect High Pitch","Effect Echo","Effect Reverb","Effect Delay","Effect Chorus","Effect Flanger","Effect Phaser","Effect Distortion","Effect Bitcrush","Effect Lo-Fi","Effect Radio","Effect Phone","Effect Megaphone","Effect Underwater","Effect Space","Effect Cave","Effect Stadium","Effect Concert Hall","Effect Small Room","Effect Large Hall","Effect Cathedral","Effect Forest","Effect City","Effect Traffic","Effect Crowd","Effect Applause","Effect Cheer","Effect Boo","Effect Murmur","Speed Slow","Speed Fast","Speed Normal","Pitch Up","Pitch Down","Volume Loud","Volume Soft","Clarity HD","Clarity Clear"],
  Image: ["Text to Image","Image Upscale","Photo Enhance","Style Transfer","Image to Video","Still to Motion","Photo Animation","Portrait Animate","Landscape Pan","Product Showcase","Food Styling","Fashion Photo","Architecture Render","Interior Design","Car Render","Jewelry Photo","Tech Product","Nature Photo","Wildlife Shot","Pet Portrait","Baby Photo","Wedding Photo","Event Photo","Concert Photo","Sports Photo","Action Shot","Macro Photo","Aerial Photo","Drone Image","Satellite View","Street Photo","Urban Scene","Rural Scene","Beach Scene","Mountain Scene","Forest Scene","Desert Scene","Snow Scene","Rain Scene","Fog Scene","Sunset Photo","Sunrise Photo","Night Photo","Starry Sky","Moon Photo","Aurora Photo","Lightning Photo","Rainbow Photo","Cloud Photo","Storm Photo","Weather Photo","Season Spring","Season Summer","Season Fall","Season Winter","Time Dawn","Time Morning","Time Noon","Time Afternoon","Time Evening","Time Dusk","Time Night","Time Midnight","Light Natural","Light Studio","Light Golden Hour","Light Blue Hour","Light Harsh","Light Soft","Light Dramatic","Light Flat","Color Vibrant","Color Muted","Color BW","Color Sepia","Color Tinted","Color Graded","Color Corrected","Mood Happy","Mood Sad","Mood Energetic","Mood Calm","Mood Dramatic","Mood Romantic","Mood Scary","Mood Mysterious","Mood Nostalgic","Mood Futuristic","Filter Vintage","Filter Modern","Filter Retro","Filter Cinematic","Filter HDR","Filter Soft Focus","Filter Sharp","Filter Blur","Filter Grain","Filter Clean","Effect Bokeh","Effect Lens Flare","Effect Light Leak","Effect Vignette","Effect Glow","Effect Sparkle","Effect Glitter","Effect Shine","Effect Shadow","Effect Reflection"],
  Video: ["Video Upscale","Video Enhance","Slow Motion","Time Lapse","Reverse Video","Loop Video","Stabilize Video","Color Grade Video","LUT Video","Denoise Video","Sharpen Video","Blur Video","Zoom Video","Pan Video","Tilt Video","Rotate Video","Flip Video","Crop Video","Resize Video","Speed Up","Speed Down","Freeze Frame","Split Screen","Picture in Picture","Green Screen","Chroma Key","Motion Track","Face Track","Object Track","Camera Track","Stabilization 2D","Stabilization 3D","Warp Stabilizer","Rolling Shutter","Lens Distort Fix","Remove Objects","Remove People","Clone Video","Time Remap","Optical Flow","Frame Blend","Frame Mix","Frame Hold","Frame Skip","Cut Video","Trim Video","Split Video","Merge Video","Concatenate","Crossfade","Dissolve","Fade In","Fade Out","Wipe Left","Wipe Right","Wipe Up","Wipe Down","Push","Slide","Zoom In Trans","Zoom Out Trans","Spin","Rotate Trans","Flip Trans","Page Peel","Cube Spin","Ripple","Wave","Glitch Trans","Digital Trans","Light Trans","Blur Trans","Morph","Distort Trans","Pixelate","Mosaic","Kaleidoscope","Mirror","Symmetry","Prism","Rainbow","Chromatic","RGB Split","Anaglyph","VHS","Film Burn","Dust Scratch","Light Leak Video","Vignette Video","Bloom","Glow Video","God Rays","Volumetric Light","Lens Flare Video","Sun Flare","Star Filter","Bokeh Video","Depth Field Video","Tilt Shift Video","Miniature","Toy Camera","Lomography","Polaroid","Instant Film","Negative","Solarize","Posterize","Threshold","Equalize","Invert","Gamma","Contrast","Brightness Video","Saturation Video","Hue Shift Video","Temperature Video","Tint Video"],
  Motion: ["Motion Blur","Radial Blur","Zoom Blur","Directional Blur","Camera Shake","Earthquake","Explosion Shake","Impact Shake","Wobble","Wiggle","Wave Motion","Ripple Motion","Bounce","Elastic","Spring","Pendulum","Rotate Continuous","Spin","Spiral","Orbit","Circle","Arc","Figure 8","Random","Noise","Turbulence","Wind","Gravity","Attraction","Repulsion","Vortex","Swirl","Twist","Bend","Warp","Bulge","Pinch","Spherize","Displace","Offset","Slide Motion","Drift","Float","Rise","Fall","Ascend","Descend","Levitate","Hover","Bob","Sway","Rock","Swing","Jitter","Vibrate","Tremble","Quake","Pulse","Beat","Throb","Flicker","Flash","Strobe","Blink","Fade Motion","Appear","Disappear","Materialize","Dematerialize","Teleport","Warp Motion","Portal","Door Open","Door Close","Curtain","Blinds","Shutter","Iris","Reveal","Conceal","Unfold","Fold","Expand","Collapse","Grow","Shrink","Scale Up","Scale Down","Stretch","Squeeze","Compress","Inflate","Deflate","Morph Motion","Liquefy","Melt","Drip","Pour","Splash","Spray","Burst","Shatter","Break","Crack","Crumble","Disintegrate","Particle Burst","Particle Trail","Particle Swarm","Particle Rain","Particle Snow","Particle Dust","Particle Smoke","Particle Fire","Particle Sparks","Particle Stars","Particle Confetti","Particle Leaves","Particle Petals","Particle Bubbles"]
};

const ENHANCEMENT_TOOLS = ["AI 8K Upscaling","Cinematic Grain","Motion Stabilization","Deep HDR Boost","Face Retouch Pro","Neural Noise Reduction","Auto Color Balance","Dynamic Range Expansion","Lens Flare Synth","Shadow Recovery","Highlight Rolloff","Skin Tone Uniformity","Optical Flow Smooth","Atmospheric Haze","Sharpen Intelligence","De-Banding Pro","Moire Removal","Color Space Transform","Anamorphic Stretch","Flicker Reduction","Low Light Clarity","Texture Enhancement","Micro-Contrast Adjust","Vignette Pro","Film Stock Emulation","Glow Synthesis","Edge Refinement","Smart Saturation","Tone Mapping Pro","Gamma Correction","Black Point Calibration","White Balance AI","Color Match Pro","Temporal Denoise","Digital Intermediate","Chromatic Correction","Film Grain Advanced","Halation Effect","Bloom Control","Light Wrap"];

export default function App() {
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolSearch, setToolSearch] = useState('');
  const [duration, setDuration] = useState(90);
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedEnhancement, setSelectedEnhancement] = useState(null);
  const [mediaLibrary, setMediaLibrary] = useState([]);
  const [timeline, setTimeline] = useState({ video: [], audio: [], text: [] });
  const [draggedItem, setDraggedItem] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [audioLevels, setAudioLevels] = useState({ music: 75, voice: 50, sfx: 65, master: 80 });
  const [enhancementSettings, setEnhancementSettings] = useState({ intensity: 75, clarity: 75, color: 75, brightness: 75 });
  const [exportSettings, setExportSettings] = useState({ quality: '8K', format: 'MP4' });
  const [communityPosts, setCommunityPosts] = useState([
    {id:1,title:'Epic Action Movie',user:'Sarah J.',emoji:'🎬',likes:2847,loves:1923,comments:[]},
    {id:2,title:'Family Vacation',user:'Mike Chen',emoji:'✈️',likes:1256,loves:892,comments:[]},
    {id:3,title:'First Documentary',user:'Emily R.',emoji:'📹',likes:3421,loves:2156,comments:[]},
    {id:4,title:'Music Video',user:'Alex T.',emoji:'🎵',likes:5234,loves:4012,comments:[]}
  ]);
  const [newComment, setNewComment] = useState({});
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const handleFileUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newAsset = {
          id: Date.now() + Math.random(),
          name: file.name,
          type: file.type.startsWith('video') ? 'video' : file.type.startsWith('audio') ? 'audio' : 'image',
          size: (file.size / 1024 / 1024).toFixed(2) + 'MB',
          url: event.target.result,
          timestamp: new Date().toISOString()
        };
        setMediaLibrary(prev => [...prev, newAsset]);
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const handleAIGenerate = useCallback(() => {
    if (!aiPrompt.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      const newAsset = {
        id: Date.now(),
        name: \`AI-\${selectedTool.replace(/\\s+/g,'-').toLowerCase()}-\${Date.now()}.mp4\`,
        type: 'video',
        size: (Math.random() * 500 + 100).toFixed(2) + 'MB',
        url: \`data:video/mp4;base64,SIMULATED_AI_GENERATED_CONTENT\`,
        aiGenerated: true,
        prompt: aiPrompt,
        timestamp: new Date().toISOString()
      };
      setMediaLibrary(prev => [...prev, newAsset]);
      setGenerating(false);
      setAiPrompt('');
      setSelectedTool(null);
    }, 2000);
  }, [aiPrompt, selectedTool]);

  const handleDrop = useCallback((track) => {
    if (!draggedItem) return;
    setTimeline(prev => ({
      ...prev,
      [track]: [...prev[track], { ...draggedItem, trackPosition: Date.now() }]
    }));
    setDraggedItem(null);
  }, [draggedItem]);

  const removeFromTimeline = useCallback((track, index) => {
    setTimeline(prev => ({
      ...prev,
      [track]: prev[track].filter((_, i) => i !== index)
    }));
  }, []);

  const deleteFromLibrary = useCallback((id) => {
    setMediaLibrary(prev => prev.filter(item => item.id !== id));
  }, []);

  const applyEnhancement = useCallback(() => {
    const enhancedAsset = {
      id: Date.now(),
      name: \`enhanced-\${selectedEnhancement.toLowerCase().replace(/\\s+/g,'-')}-\${Date.now()}.mp4\`,
      type: 'video',
      size: (Math.random() * 500 + 100).toFixed(2) + 'MB',
      url: \`data:video/mp4;base64,ENHANCED_CONTENT\`,
      enhanced: true,
      enhancement: selectedEnhancement,
      settings: { ...enhancementSettings },
      timestamp: new Date().toISOString()
    };
    setMediaLibrary(prev => [...prev, enhancedAsset]);
    setSelectedEnhancement(null);
  }, [selectedEnhancement, enhancementSettings]);

  const handleRender = useCallback(() => {
    setRendering(true);
    setRenderProgress(0);
    const interval = setInterval(() => {
      setRenderProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const renderedVideo = {
              id: Date.now(),
              name: \`final-render-\${Date.now()}.\${exportSettings.format.toLowerCase()}\`,
              type: 'video',
              size: (Math.random() * 1000 + 500).toFixed(2) + 'MB',
              url: \`data:video/\${exportSettings.format.toLowerCase()};base64,RENDERED_CONTENT\`,
              rendered: true,
              quality: exportSettings.quality,
              format: exportSettings.format,
              duration: duration,
              timestamp: new Date().toISOString()
            };
            setMediaLibrary(prev => [...prev, renderedVideo]);
            setCurrentVideo(renderedVideo);
            setRendering(false);
            setRenderProgress(0);
            setPage(16);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  }, [duration, exportSettings]);

  const handleDownload = useCallback((asset) => {
    const link = document.createElement('a');
    link.href = asset.url;
    link.download = asset.name;
    link.click();
  }, []);

  const handleLike = useCallback((postId) => {
    setCommunityPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  }, []);

  const handleLove = useCallback((postId) => {
    setCommunityPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, loves: post.loves + 1 } : post
    ));
  }, []);

  const handleComment = useCallback((postId) => {
    const comment = newComment[postId];
    if (!comment || !comment.trim()) return;
    setCommunityPosts(prev => prev.map(post => 
      post.id === postId ? { 
        ...post, 
        comments: [...(post.comments || []), { 
          id: Date.now(), 
          text: comment, 
          user: 'You', 
          timestamp: new Date().toISOString() 
        }] 
      } : post
    ));
    setNewComment(prev => ({ ...prev, [postId]: '' }));
  }, [newComment]);

  return (
    <div className="min-h-screen bg-black text-white relative">
      <style>{\`
        [data-bolt-badge], .bolt-badge, #bolt-badge, a[href*="bolt"],
        div[class*="fixed"][class*="bottom"] iframe, [class*="made"],
        [id*="bolt"], footer[class*="bolt"] { display:none!important; }
        .scrollbar::-webkit-scrollbar{width:8px;}
        .scrollbar::-webkit-scrollbar-track{background:#000;}
        .scrollbar::-webkit-scrollbar-thumb{background:#7c3aed;border-radius:10px;}
      \`}</style>

      <input ref={fileInputRef} type="file" multiple accept="video/*,audio/*,image/*" onChange={handleFileUpload} className="hidden"/>

      {page > 0 && (
        <div className="fixed top-6 left-6 z-50">
          <button onClick={() => setMenuOpen(!menuOpen)} className="bg-[#7c3aed] p-4 rounded-full shadow-2xl hover:scale-110 transition"><Menu size={28}/></button>
          {menuOpen && (
            <div className="absolute top-20 left-0 bg-zinc-950 border border-[#7c3aed] p-6 rounded-2xl w-72 shadow-2xl max-h-[80vh] overflow-y-auto scrollbar">
              <h3 className="text-lg font-black uppercase mb-4 text-[#7c3aed]">Quick Access</h3>
              {[{p:1,l:"Home"},{p:2,l:"Welcome"},{p:3,l:"Login/Pricing"},{p:4,l:"Writing Tools"},{p:5,l:"Voice Tools"},{p:6,l:"Image Tools"},{p:7,l:"Video Tools"},{p:8,l:"Motion Tools"},{p:10,l:"Upload Media"},{p:11,l:"Editor Suite"},{p:12,l:"Timeline & Library"},{p:13,l:"Enhancement"},{p:14,l:"Audio Mixer"},{p:15,l:"Preview"},{p:16,l:"Export"},{p:17,l:"Tutorials"},{p:18,l:"Terms"},{p:19,l:"Agent Grok"},{p:20,l:"Community"},{p:21,l:"Thank You"}].map(i => (
                <button key={i.p} onClick={() => {setPage(i.p);setMenuOpen(false);}} className="w-full text-left text-sm font-bold uppercase text-white p-3 hover:bg-[#7c3aed] rounded-lg transition">{i.l}</button>
              ))}
            </div>
          )}
        </div>
      )}

      {page >= 1 && page !== 19 && (
        <button onClick={() => setPage(19)} className="fixed bottom-6 right-6 z-50 bg-[#7c3aed] w-16 h-16 rounded-full flex items-center justify-center text-4xl font-black shadow-2xl hover:scale-110 transition border-2 border-[#a78bfa]">G</button>
      )}

      {page >= 3 && (
        <div className="fixed bottom-0 left-0 w-full bg-black/95 py-2.5 text-center z-40 border-t border-[#7c3aed]/20">
          <p className="text-xs uppercase font-black text-white/80">MandaStrong Studio 2026 • MandaStrong1.Etsy.com</p>
        </div>
      )}

      {page > 1 && page < 21 && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 flex gap-6">
          <button onClick={() => setPage(page-1)} className="bg-zinc-950 border border-[#7c3aed] px-10 py-2.5 rounded-full font-black uppercase text-[#7c3aed] hover:bg-[#7c3aed] hover:text-white transition text-xs flex items-center gap-2"><ChevronLeft size={16}/> BACK</button>
          <button onClick={() => setPage(page+1)} className="bg-[#7c3aed] px-10 py-2.5 rounded-full font-black uppercase text-white hover:bg-[#6d28d9] transition text-xs flex items-center gap-2">NEXT <ChevronRight size={16}/></button>
        </div>
      )}

      <main className="min-h-screen pb-32">
        {page === 1 && (
          <div className="h-screen flex flex-col justify-center items-center text-center px-6">
            <Sparkles size={64} className="text-[#7c3aed] mb-8 animate-pulse"/>
            <h1 className="text-7xl md:text-9xl font-black text-[#7c3aed] uppercase mb-6">MANDASTRONG STUDIO</h1>
            <p className="text-xl md:text-2xl font-bold text-[#7c3aed] max-w-3xl mb-16">Welcome To The All In One Make Your Own Longer Movies App!</p>
            <button onClick={() => setPage(2)} className="bg-[#7c3aed] text-white px-16 py-4 rounded-full font-black uppercase text-xl hover:scale-105 transition shadow-2xl">START CREATING</button>
          </div>
        )}

        {page === 2 && (
          <div className="h-screen flex flex-col justify-center items-center text-center px-4">
            <Sparkles size={64} className="text-[#7c3aed] mb-6"/>
            <h1 className="text-5xl md:text-8xl font-black text-[#7c3aed] uppercase mb-6">MANDASTRONG STUDIO</h1>
            <p className="text-2xl md:text-4xl font-bold text-[#7c3aed] italic uppercase max-w-5xl">WELCOME! MAKE AWESOME FAMILY MOVIES OR TURN YOUR DREAMS INTO REALITY. ENJOY!</p>
          </div>
        )}

        {page === 3 && (
          <div className="p-6 pt-16 pb-40 max-w-7xl mx-auto overflow-y-auto scrollbar">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
              <div className="bg-zinc-950 border-2 border-[#7c3aed] p-10 rounded-3xl">
                <h3 className="text-3xl font-black uppercase mb-6 text-center text-white">Login</h3>
                <input type="email" placeholder="your@email.com" className="w-full bg-black border-2 border-[#7c3aed] p-4 rounded-xl text-white mb-4 outline-none"/>
                <input type="password" placeholder="••••••••" className="w-full bg-black border-2 border-[#7c3aed] p-4 rounded-xl text-white mb-6 outline-none"/>
                <button onClick={() => setPage(4)} className="w-full bg-[#7c3aed] py-4 rounded-xl font-black uppercase hover:bg-[#6d28d9] transition">Login & Start</button>
              </div>
              <div className="bg-zinc-950 border-2 border-[#7c3aed] p-10 rounded-3xl">
                <h3 className="text-3xl font-black uppercase mb-6 text-center text-white">Register</h3>
                <input type="text" placeholder="Your Name" className="w-full bg-black border-2 border-[#7c3aed] p-4 rounded-xl text-white mb-4 outline-none"/>
                <input type="email" placeholder="your@email.com" className="w-full bg-black border-2 border-[#7c3aed] p-4 rounded-xl text-white mb-4 outline-none"/>
                <button onClick={() => setPage(4)} className="w-full bg-[#7c3aed] py-4 rounded-xl font-black uppercase hover:bg-[#6d28d9] transition">Create Account</button>
              </div>
            </div>
            
            <div className="text-center mb-12">
              <button onClick={() => setPage(4)} className="bg-zinc-800 hover:bg-zinc-700 border-2 border-[#7c3aed] px-12 py-4 rounded-xl font-black uppercase text-white transition-all flex items-center gap-3 mx-auto">
                <Eye size={24}/>
                BROWSE AS GUEST (VIEW ONLY)
              </button>
            </div>

            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-black text-center mb-12 uppercase text-white">Choose Your Plan</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {t:'Basic',p:'20',s:'https://buy.stripe.com/test_14k00SfE88Wn5K85kk',f:['HD Export (1080p)','100 AI Tools','10GB Storage','Email Support']},
                  {t:'Pro',p:'30',s:'https://buy.stripe.com/test_6oE00SfE8cit65G002',f:['4K Export (2160p)','300 AI Tools','100GB Storage','Priority Support','Commercial License']},
                  {t:'Studio',p:'50',s:'https://buy.stripe.com/test_dR68wwdvZ8Wn4E43cc',f:['8K Export (4320p)','600 AI Tools','1TB Storage','24/7 Support','Full Rights','API Access']}
                ].map(plan => (
                  <div key={plan.t} className="bg-zinc-950 border-2 border-[#7c3aed]/30 rounded-3xl p-8 hover:border-[#7c3aed] transition">
                    <h3 className="text-2xl font-black uppercase mb-2 text-white">{plan.t}</h3>
                    <div className="text-5xl font-black text-[#7c3aed] mb-8">\${plan.p}<span className="text-sm opacity-50">/mo</span></div>
                    <ul className="space-y-3 mb-10">
                      {plan.f.map(f => <li key={f} className="text-sm font-semibold flex items-start gap-2 text-white"><CheckCircle size={16} className="text-[#7c3aed] flex-shrink-0 mt-0.5"/> {f}</li>)}
                    </ul>
                    <a href={plan.s} target="_blank" rel="noopener noreferrer" className="block w-full py-4 bg-[#7c3aed] text-center rounded-xl font-black uppercase hover:bg-[#6d28d9] transition">SUBSCRIBE NOW</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {(page >= 4 && page <= 8) && (() => {
          const boards = ["Writing","Voice","Image","Video","Motion"];
          const allTools = AI_TOOLS[boards[page-4]] || [];
          const tools = toolSearch ? allTools.filter(t => t.toLowerCase().includes(toolSearch.toLowerCase())) : allTools;
          return (
            <div className="h-screen flex flex-col pt-20 pb-40">
              <h2 className="text-5xl font-black uppercase text-[#7c3aed] text-center mb-6">AI TOOL BOARD</h2>
              <div className="px-8 mb-6">
                <div className="relative max-w-xl">
                  <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c3aed]"/>
                  <input value={toolSearch} onChange={e => setToolSearch(e.target.value)} placeholder="🔍 Search Tools..." className="w-full bg-zinc-900 border-2 border-[#7c3aed] pl-12 pr-10 py-4 rounded-xl text-white outline-none text-lg font-bold"/>
                  {toolSearch && <button onClick={() => setToolSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"><X size={20}/></button>}
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-8 scrollbar">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8">
                  {tools.map((tool,i) => (
                    <button key={i} onClick={() => setSelectedTool(tool)} className="bg-black border-2 border-[#7c3aed] p-6 rounded-2xl hover:bg-[#7c3aed]/10 transition group">
                      <Sparkles size={18} className="text-[#7c3aed] mb-2 group-hover:animate-spin"/>
                      <span className="text-sm font-bold uppercase text-white">{tool}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {selectedTool && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8">
            <div className="bg-zinc-950 border-2 border-[#7c3aed] rounded-3xl p-8 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-black uppercase text-white">{selectedTool}</h2>
                <button onClick={() => {setSelectedTool(null);setAiPrompt('');}} className="text-white hover:text-red-500 transition"><X size={32}/></button>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <button onClick={() => fileInputRef.current?.click()} className="aspect-square bg-zinc-900 border-2 border-[#7c3aed] rounded-2xl flex flex-col items-center justify-center hover:bg-[#7c3aed]/20 transition">
                  <Upload size={40} className="text-[#7c3aed] mb-2"/>
                  <p className="font-black text-white text-sm">UPLOAD</p>
                </button>
                <button onClick={async () => {
                  try {
                    const text = await navigator.clipboard.readText();
                    if (text && text.trim()) {
                      const isUrl = text.startsWith('http') || text.startsWith('data:') || text.includes('://');
                      const newItem = {
                        id: Date.now(),
                        name: isUrl ? \`pasted-url-\${Date.now()}.mp4\` : \`pasted-text-\${Date.now()}.txt\`,
                        type: isUrl ? 'video' : 'text',
                        size: ((text.length / 1024).toFixed(2)) + ' KB',
                        url: isUrl ? text : \`data:text/plain;charset=utf-8,\${encodeURIComponent(text)}\`,
                        content: text,
                        pasted: true,
                        timestamp: new Date().toISOString()
                      };
                      setMediaLibrary(prev => [...prev, newItem]);
                      setSelectedTool(null);
                      alert(\`✓ \${isUrl ? 'URL' : 'Text'} pasted! Check Media Library.\`);
                    } else {
                      alert('Nothing to paste. Copy a URL or text first.');
                    }
                  } catch (err) {
                    alert('Paste failed. Copy something first.');
                  }
                }} className="aspect-square bg-zinc-900 border-2 border-[#7c3aed] rounded-2xl flex flex-col items-center justify-center hover:bg-[#7c3aed]/20 transition cursor-pointer">
                  <Layers size={40} className="text-[#7c3aed] mb-2"/>
                  <p className="font-black text-white text-sm">PASTE</p>
                  <p className="text-xs text-zinc-500 mt-1">URL or Text</p>
                </button>
                <div className="aspect-square bg-zinc-900 border-2 border-[#7c3aed] rounded-2xl flex flex-col items-center justify-center">
                  <Sparkles size={40} className="text-[#7c3aed] mb-2"/>
                  <p className="font-black text-white text-sm">GENERATE</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-black border border-[#7c3aed]/30 rounded-xl p-6">
                  <h3 className="font-bold mb-4 text-white flex items-center gap-2">
                    <Sparkles size={20} className="text-[#7c3aed]"/>
                    Generate With AI
                  </h3>
                  <textarea value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder="Describe what you want to create..." className="w-full bg-zinc-900 border border-[#7c3aed] p-3 rounded-lg text-white h-24 outline-none resize-none"/>
                </div>
                <button onClick={handleAIGenerate} disabled={!aiPrompt.trim() || generating} className="w-full bg-[#7c3aed] py-4 rounded-xl font-black uppercase text-xl hover:bg-[#6d28d9] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3">
                  {generating ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"/>
                      GENERATING...
                    </>
                  ) : (
                    <>
                      <Zap size={24}/>
                      GENERATE & SAVE TO LIBRARY
                    </>
                  )}
                </button>
                <p className="text-xs text-center text-zinc-500">Assets automatically save to Media Library</p>
              </div>
            </div>
          </div>
        )}

        {page === 10 && (
          <div className="h-screen flex items-center justify-center p-8">
            <div className="text-center max-w-3xl">
              <h1 className="text-6xl font-black uppercase text-[#7c3aed] mb-8">UPLOAD MEDIA</h1>
              <div onClick={() => fileInputRef.current?.click()} className="aspect-video bg-zinc-950 rounded-3xl border-4 border-dashed border-[#7c3aed] mb-8 flex flex-col items-center justify-center cursor-pointer hover:bg-[#7c3aed]/10 transition">
                <Upload size={100} className="text-[#7c3aed] mb-4"/>
                <p className="text-2xl font-bold text-white">Click to Browse Files</p>
                <p className="text-zinc-400 mt-2">or drag and drop here</p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-left">
                <div className="bg-zinc-950 border border-[#7c3aed] p-4 rounded-xl">
                  <FileVideo size={32} className="text-[#7c3aed] mb-2"/>
                  <p className="text-sm font-bold text-white">Videos</p>
                  <p className="text-xs text-zinc-500">MP4, MOV, AVI</p>
                </div>
                <div className="bg-zinc-950 border border-[#7c3aed] p-4 rounded-xl">
                  <Music size={32} className="text-[#7c3aed] mb-2"/>
                  <p className="text-sm font-bold text-white">Audio</p>
                  <p className="text-xs text-zinc-500">MP3, WAV, AAC</p>
                </div>
                <div className="bg-zinc-950 border border-[#7c3aed] p-4 rounded-xl">
                  <Eye size={32} className="text-[#7c3aed] mb-2"/>
                  <p className="text-sm font-bold text-white">Images</p>
                  <p className="text-xs text-zinc-500">JPG, PNG, GIF</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {page === 11 && (
          <div className="min-h-screen p-8 pt-20 pb-40">
            <h1 className="text-6xl font-black uppercase text-[#7c3aed] mb-12 text-center">EDITOR SUITE</h1>
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] rounded-3xl p-12 mb-12 border-4 border-[#a78bfa]">
              <div className="flex items-center gap-6 mb-8">
                <Clock size={56} className="text-white"/>
                <h3 className="text-4xl font-black text-white">MOVIE DURATION</h3>
              </div>
              <div className="text-center mb-6">
                <div className="text-8xl font-black text-white">{duration}</div>
                <div className="text-2xl font-bold text-white/80 uppercase">MINUTES</div>
              </div>
              <input type="range" min="0" max="180" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full h-4 bg-white/20 rounded-full mb-4 cursor-pointer appearance-none" style={{accentColor: 'white'}}/>
              <div className="flex justify-between text-sm text-white/70 mb-8">
                <span>0 min</span>
                <span>180 min (3 hours)</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[30,60,90,120].map(m => (
                  <button key={m} onClick={() => setDuration(m)} className={\`py-4 rounded-xl font-bold text-lg transition \${duration===m?'bg-white text-[#7c3aed]':'bg-white/20 text-white hover:bg-white/30'}\`}>{m} min</button>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <button onClick={() => setPage(12)} className="bg-zinc-950 border-2 border-[#7c3aed] p-8 rounded-3xl hover:bg-[#7c3aed]/10 transition">
                <Database size={48} className="text-[#7c3aed] mb-4"/>
                <h3 className="text-xl font-black uppercase mb-2 text-white">Media Library</h3>
                <p className="text-sm text-zinc-400">{mediaLibrary.length} assets</p>
              </button>
              <button onClick={() => setPage(13)} className="bg-zinc-950 border-2 border-[#7c3aed] p-8 rounded-3xl hover:bg-[#7c3aed]/10 transition">
                <Wand2 size={48} className="text-[#7c3aed] mb-4"/>
                <h3 className="text-xl font-black uppercase mb-2 text-white">Enhancements</h3>
                <p className="text-sm text-zinc-400">{ENHANCEMENT_TOOLS.length} tools</p>
              </button>
              <button onClick={() => setPage(14)} className="bg-zinc-950 border-2 border-[#7c3aed] p-8 rounded-3xl hover:bg-[#7c3aed]/10 transition">
                <Sliders size={48} className="text-[#7c3aed] mb-4"/>
                <h3 className="text-xl font-black uppercase mb-2 text-white">Audio Mixer</h3>
                <p className="text-sm text-zinc-400">4 channels</p>
              </button>
            </div>
          </div>
        )}

        {page === 12 && (
          <div className="min-h-screen flex pb-32">
            <div className="w-1/3 bg-zinc-950 border-r-4 border-[#7c3aed] p-6 overflow-y-auto scrollbar">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black uppercase text-white flex items-center gap-3">
                  <Database size={24} className="text-[#7c3aed]"/>
                  MEDIA LIBRARY
                </h3>
                <button onClick={() => fileInputRef.current?.click()} className="bg-[#7c3aed] p-2 rounded-lg hover:bg-[#6d28d9] transition">
                  <Plus size={20}/>
                </button>
              </div>
              {mediaLibrary.length === 0 ? (
                <div className="text-center py-12">
                  <Upload size={48} className="text-zinc-700 mx-auto mb-4"/>
                  <p className="text-zinc-500 text-sm">No assets yet</p>
                  <button onClick={() => setPage(10)} className="text-[#7c3aed] text-xs mt-2 underline">Upload Media</button>
                </div>
              ) : (
                <div className="space-y-3">
                  {mediaLibrary.map((asset) => (
                    <div key={asset.id} draggable onDragStart={() => setDraggedItem(asset)} onDragEnd={() => setDraggedItem(null)} className="bg-zinc-900 border-2 border-[#7c3aed] p-4 rounded-xl hover:bg-[#7c3aed]/20 cursor-move transition group">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="text-sm font-bold text-white truncate">{asset.name}</div>
                          <div className="text-xs text-zinc-500 flex gap-2 mt-1">
                            <span>{asset.type}</span>
                            <span>•</span>
                            <span>{asset.size}</span>
                          </div>
                        </div>
                        <button onClick={() => deleteFromLibrary(asset.id)} className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition">
                          <Trash2 size={16}/>
                        </button>
                      </div>
                      {asset.aiGenerated && (
                        <div className="text-xs bg-[#7c3aed] text-white px-2 py-1 rounded inline-block mt-2">🤖 AI Generated</div>
                      )}
                      {asset.enhanced && (
                        <div className="text-xs bg-[#7c3aed] text-white px-2 py-1 rounded inline-block mt-2">✨ Enhanced</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex-1 bg-black flex items-center justify-center">
                {currentVideo ? (
                  <div className="text-center">
                    <div className="w-96 h-96 rounded-full bg-[#7c3aed]/30 flex items-center justify-center mb-6">
                      <Play size={120} className="text-[#7c3aed]"/>
                    </div>
                    <p className="text-white font-bold">{currentVideo.name}</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-48 h-48 rounded-full bg-[#7c3aed]/30 flex items-center justify-center">
                      <Play size={80} className="text-[#7c3aed]"/>
                    </div>
                    <p className="text-zinc-500 mt-4">No video selected</p>
                  </div>
                )}
              </div>
              <div className="bg-zinc-950 p-6 border-t-4 border-[#7c3aed]">
                <h3 className="text-2xl font-black uppercase text-[#7c3aed] mb-6">MULTI-TRACK TIMELINE</h3>
                <div className="space-y-3">
                  {[
                    { key: 'video', label: 'VIDEO TRACK', icon: FileVideo },
                    { key: 'audio', label: 'AUDIO TRACK', icon: Music },
                    { key: 'text', label: 'TEXT OVERLAY', icon: Layers }
                  ].map(track => (
                    <div key={track.key} onDragOver={(e) => e.preventDefault()} onDrop={() => handleDrop(track.key)} className="bg-black border-2 border-[#7c3aed] rounded-xl min-h-[80px] p-4 hover:bg-[#7c3aed]/10 transition">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <track.icon size={18} className="text-[#7c3aed]"/>
                          <span className="text-sm font-bold text-white">{track.label}</span>
                        </div>
                        <span className="text-xs text-zinc-500">{timeline[track.key].length} clips</span>
                      </div>
                      {timeline[track.key].length > 0 && (
                        <div className="flex gap-2 overflow-x-auto mt-2">
                          {timeline[track.key].map((item, idx) => (
                            <div key={idx} className="bg-[#7c3aed] px-3 py-2 rounded text-xs font-bold whitespace-nowrap flex items-center gap-2">
                              {item.name.substring(0, 15)}...
                              <button onClick={() => removeFromTimeline(track.key, idx)} className="hover:text-red-400">
                                <X size={12}/>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-zinc-500 mt-4 italic text-center">Drag assets from Media Library to timeline tracks</p>
              </div>
            </div>
          </div>
        )}

        {page === 13 && (
          <div className="min-h-screen p-8 pt-20 pb-40">
            <h1 className="text-5xl font-black uppercase text-[#7c3aed] mb-4 text-center">ENHANCEMENT STUDIO</h1>
            <p className="text-center text-zinc-400 mb-12 text-lg">Professional AI-Powered Enhancement Tools</p>
            <div className="grid md:grid-cols-4 gap-4 max-w-7xl mx-auto">
              {ENHANCEMENT_TOOLS.map((tool) => (
                <button key={tool} onClick={() => setSelectedEnhancement(tool)} className="bg-black border-2 border-[#7c3aed] p-6 rounded-2xl hover:bg-[#7c3aed]/10 cursor-pointer transition group">
                  <Wand2 size={28} className="text-[#7c3aed] mb-3 group-hover:rotate-12 transition-transform"/>
                  <h3 className="text-sm font-bold uppercase text-white leading-tight">{tool}</h3>
                </button>
              ))}
            </div>

            {selectedEnhancement && (
              <div className="fixed inset-0 z-50 bg-black/95 p-10 flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-4xl font-black text-[#7c3aed] uppercase">{selectedEnhancement}</h3>
                  <button onClick={() => setSelectedEnhancement(null)} className="text-white hover:text-red-500 transition">
                    <X size={40}/>
                  </button>
                </div>
                <div className="flex-1 flex gap-10">
                  <div className="flex-1 bg-zinc-900 border-4 border-[#7c3aed] rounded-3xl flex items-center justify-center overflow-hidden">
                    <div className="text-center">
                      <div className="w-64 h-64 rounded-full bg-[#7c3aed]/30 flex items-center justify-center mb-6 mx-auto">
                        <Sparkles size={100} className="text-[#7c3aed] animate-pulse"/>
                      </div>
                      <p className="text-white font-bold text-2xl">LIVE PREVIEW</p>
                      <p className="text-zinc-500 text-sm mt-2">Enhancement active at {enhancementSettings.intensity}%</p>
                    </div>
                  </div>
                  <div className="w-96 space-y-6 p-8 bg-zinc-950 border-2 border-[#7c3aed] rounded-3xl">
                    {Object.entries(enhancementSettings).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between text-sm font-bold uppercase text-white mb-2">
                          <span>{key}</span>
                          <span className="text-[#7c3aed]">{value}%</span>
                        </div>
                        <input type="range" min="0" max="100" value={value} onChange={(e) => setEnhancementSettings(prev => ({ ...prev, [key]: Number(e.target.value) }))} className="w-full h-2 bg-zinc-800 rounded-full cursor-pointer appearance-none" style={{accentColor: '#7c3aed'}}/>
                      </div>
                    ))}
                    <div className="pt-6 border-t border-zinc-800">
                      <button onClick={() => setEnhancementSettings({ intensity: 75, clarity: 75, color: 75, brightness: 75 })} className="w-full py-3 bg-zinc-800 text-white rounded-xl font-bold mb-3 hover:bg-zinc-700 transition">
                        RESET TO DEFAULT
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex gap-6 justify-center">
                  <button onClick={() => setSelectedEnhancement(null)} className="px-16 py-4 bg-zinc-800 text-white rounded-xl font-black uppercase hover:bg-zinc-700 transition">
                    CANCEL
                  </button>
                  <button onClick={applyEnhancement} className="px-16 py-4 bg-[#7c3aed] text-white rounded-xl font-black uppercase hover:bg-[#6d28d9] transition flex items-center gap-3">
                    <CheckCircle size={24}/>
                    APPLY & SAVE
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {page === 14 && (
          <div className="min-h-screen p-8 pt-20 pb-40">
            <h1 className="text-4xl font-black uppercase mb-12 text-white text-center">PROFESSIONAL AUDIO MIXER</h1>
            <div className="grid grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { key: 'music', label: 'MUSIC', icon: Music },
                { key: 'voice', label: 'VOICE', icon: Mic },
                { key: 'sfx', label: 'SFX', icon: Zap },
                { key: 'master', label: 'MASTER', icon: Sliders, master: true }
              ].map((channel) => (
                <div key={channel.key} className={\`bg-zinc-950 border-4 rounded-3xl p-6 flex flex-col items-center \${channel.master?'border-[#7c3aed]':'border-zinc-800'}\`}>
                  <channel.icon size={36} className="text-[#7c3aed] mb-3"/>
                  <div className="font-black text-base mb-6 text-white">{channel.label}</div>
                  <div className="relative h-72 w-28 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-3xl mb-6 overflow-hidden">
                    <div className="absolute bottom-0 w-full rounded-3xl bg-gradient-to-b from-[#a78bfa] to-[#7c3aed] transition-all duration-150" style={{height: \`\${audioLevels[channel.key]}%\`}}/>
                  </div>
                  <input type="range" min="0" max="100" value={audioLevels[channel.key]} onChange={(e) => setAudioLevels(prev => ({ ...prev, [channel.key]: Number(e.target.value) }))} orient="vertical" className="w-full mb-4" style={{accentColor: '#7c3aed'}}/>
                  <div className="text-3xl font-black text-[#7c3aed]">{audioLevels[channel.key]}%</div>
                </div>
              ))}
            </div>
            <div className="max-w-6xl mx-auto mt-12 flex gap-4 justify-center">
              <button onClick={() => setAudioLevels({ music: 75, voice: 50, sfx: 65, master: 80 })} className="px-12 py-4 bg-zinc-800 text-white rounded-xl font-black uppercase hover:bg-zinc-700 transition">
                RESET LEVELS
              </button>
              <button className="px-12 py-4 bg-[#7c3aed] text-white rounded-xl font-black uppercase hover:bg-[#6d28d9] transition">
                SAVE PRESET
              </button>
            </div>
          </div>
        )}

        {page === 15 && (
          <div className="h-screen flex items-center justify-center p-8">
            <div className="text-center max-w-5xl">
              <h1 className="text-5xl font-black text-[#7c3aed] mb-8 uppercase">FINAL PREVIEW</h1>
              <div className="aspect-video bg-zinc-950 rounded-3xl border-4 border-[#7c3aed] mb-8 flex items-center justify-center relative overflow-hidden">
                {currentVideo ? (
                  <div className="text-center">
                    <Play size={120} className="text-[#7c3aed] mb-4"/>
                    <p className="text-white font-bold text-xl">{currentVideo.name}</p>
                    <p className="text-zinc-400 text-sm mt-2">{duration} minutes • {exportSettings.quality}</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Eye size={120} className="text-[#7c3aed] mb-4"/>
                    <p className="text-white font-bold text-xl">No video to preview</p>
                    <button onClick={() => setPage(12)} className="text-[#7c3aed] text-sm mt-4 underline">Go to Timeline</button>
                  </div>
                )}
              </div>
              <div className="flex gap-4 justify-center">
                <button className="bg-zinc-800 px-12 py-4 rounded-xl font-black uppercase flex items-center gap-3 hover:bg-zinc-700 transition">
                  <Play size={24}/>
                  PLAY PREVIEW
                </button>
                <button onClick={handleRender} className="bg-[#7c3aed] px-12 py-4 rounded-xl font-black uppercase flex items-center gap-3 hover:bg-[#6d28d9] transition">
                  <Zap size={24}/>
                  START RENDER
                </button>
              </div>
            </div>
          </div>
        )}

        {rendering && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
            <div className="text-center max-w-2xl">
              <div className="w-64 h-64 rounded-full bg-[#7c3aed]/30 flex items-center justify-center mx-auto mb-8 relative">
                <div className="absolute inset-0 rounded-full border-8 border-[#7c3aed] border-t-transparent animate-spin"/>
                <Sparkles size={100} className="text-[#7c3aed]"/>
              </div>
              <h2 className="text-5xl font-black text-white mb-4">RENDERING</h2>
              <div className="w-full bg-zinc-800 h-6 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] transition-all duration-300" style={{width: \`\${renderProgress}%\`}}/>
              </div>
              <p className="text-3xl font-black text-[#7c3aed]">{renderProgress}%</p>
              <p className="text-zinc-400 mt-2">Processing {duration} minutes of {exportSettings.quality} video...</p>
            </div>
          </div>
        )}

        {page === 16 && (
          <div className="h-screen flex items-center justify-center p-8">
            <div className="max-w-4xl w-full bg-zinc-950 border-4 border-[#7c3aed] rounded-3xl p-12">
              <h1 className="text-5xl font-black text-[#7c3aed] mb-12 text-center">EXPORT YOUR MOVIE</h1>
              
              {currentVideo && (
                <div className="bg-black border-2 border-[#7c3aed] rounded-2xl p-6 mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <FileVideo size={48} className="text-[#7c3aed]"/>
                    <div>
                      <p className="text-xl font-black text-white">{currentVideo.name}</p>
                      <p className="text-sm text-zinc-400">{currentVideo.size} • {currentVideo.quality} • {currentVideo.format}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-black border-2 border-[#7c3aed] p-6 rounded-2xl">
                  <h3 className="font-bold mb-4 text-white">Export Quality</h3>
                  <select value={exportSettings.quality} onChange={(e) => setExportSettings(prev => ({ ...prev, quality: e.target.value }))} className="w-full bg-zinc-900 border border-[#7c3aed] p-3 rounded-lg text-white outline-none">
                    <option value="8K">8K (4320p)</option>
                    <option value="4K">4K (2160p)</option>
                    <option value="HD">HD (1080p)</option>
                    <option value="SD">SD (720p)</option>
                  </select>
                </div>
                <div className="bg-black border-2 border-[#7c3aed] p-6 rounded-2xl">
                  <h3 className="font-bold mb-4 text-white">Format</h3>
                  <select value={exportSettings.format} onChange={(e) => setExportSettings(prev => ({ ...prev, format: e.target.value }))} className="w-full bg-zinc-900 border border-[#7c3aed] p-3 rounded-lg text-white outline-none">
                    <option value="MP4">MP4</option>
                    <option value="MOV">MOV</option>
                    <option value="AVI">AVI</option>
                    <option value="WebM">WebM</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <button onClick={() => currentVideo && handleDownload(currentVideo)} disabled={!currentVideo} className="bg-[#7c3aed] py-6 rounded-xl font-black uppercase text-xl hover:bg-[#6d28d9] transition disabled:opacity-50 flex items-center justify-center gap-3">
                  <Download size={24}/>
                  DOWNLOAD
                </button>
                <button disabled={!currentVideo} className="bg-[#7c3aed] py-6 rounded-xl font-black uppercase text-xl hover:bg-[#6d28d9] transition disabled:opacity-50 flex items-center justify-center gap-3">
                  <Save size={24}/>
                  SAVE TO CLOUD
                </button>
              </div>

              <h3 className="text-2xl font-black mb-6 text-white text-center">SHARE TO SOCIAL MEDIA</h3>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <button disabled={!currentVideo} className="bg-red-600 py-4 rounded-xl font-bold hover:bg-red-700 transition disabled:opacity-50">📺 YOUTUBE</button>
                <button disabled={!currentVideo} className="bg-blue-600 py-4 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50">📘 FACEBOOK</button>
                <button disabled={!currentVideo} className="bg-gradient-to-r from-purple-600 to-pink-600 py-4 rounded-xl font-bold hover:opacity-90 transition disabled:opacity-50">📸 INSTAGRAM</button>
                <button disabled={!currentVideo} className="bg-black py-4 rounded-xl font-bold hover:bg-zinc-900 transition disabled:opacity-50 border border-white">𝕏 TWITTER</button>
                <button disabled={!currentVideo} className="bg-pink-600 py-4 rounded-xl font-bold hover:bg-pink-700 transition disabled:opacity-50">🎵 TIKTOK</button>
                <button disabled={!currentVideo} className="bg-blue-500 py-4 rounded-xl font-bold hover:bg-blue-600 transition disabled:opacity-50">🎬 VIMEO</button>
              </div>

              <button onClick={() => setPage(20)} disabled={!currentVideo} className="w-full bg-[#7c3aed] py-6 rounded-xl font-black uppercase text-xl hover:bg-[#6d28d9] transition disabled:opacity-50 flex items-center justify-center gap-3">
                <Share2 size={24}/>
                SHARE TO COMMUNITY HUB
              </button>
            </div>
          </div>
        )}

        {page === 17 && (
          <div className="min-h-screen p-8 pt-20 pb-40">
            <h1 className="text-4xl font-black uppercase mb-12 text-white text-center">TUTORIALS & LEARNING CENTER</h1>
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="bg-black rounded-3xl border-4 border-[#7c3aed] p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-56 h-56 rounded-full bg-[#7c3aed]/30 flex items-center justify-center mb-6 mx-auto">
                    <Play size={100} className="text-[#7c3aed]"/>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Video Tutorial Player</h3>
                  <p className="text-zinc-400 mt-2">Click a tutorial to play</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                  <BookOpen size={28} className="text-[#7c3aed]"/>
                  Tutorial Library
                </h3>
                {[
                  {title:'Getting Started with MandaStrong',time:'5:30',level:'Beginner'},
                  {title:'Multi-Track Timeline Editing',time:'12:45',level:'Intermediate'},
                  {title:'Professional Color Grading',time:'18:20',level:'Advanced'},
                  {title:'Audio Mixing Masterclass',time:'15:10',level:'Intermediate'},
                  {title:'Enhancement Studio Deep Dive',time:'22:00',level:'Advanced'},
                  {title:'Export & Optimization',time:'8:15',level:'Beginner'}
                ].map((tut,i) => (
                  <button key={i} className={\`w-full bg-zinc-950 border-2 border-[#7c3aed] p-6 rounded-2xl hover:bg-[#7c3aed]/20 cursor-pointer transition \${i===0?'bg-[#7c3aed]/10':''}\`}>
                    <div className="flex items-center gap-3 mb-2">
                      <FileVideo size={20} className="text-[#7c3aed]"/>
                      <h4 className="font-bold flex-1 text-white text-left">{tut.title}</h4>
                    </div>
                    <div className="flex gap-4 text-xs text-zinc-400">
                      <span>⏱ {tut.time}</span>
                      <span>•</span>
                      <span className="bg-[#7c3aed] px-2 py-0.5 rounded text-white">{tut.level}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {page === 18 && (
          <div className="min-h-screen p-8 pt-20 pb-40 max-w-5xl mx-auto overflow-y-auto scrollbar">
            <h1 className="text-4xl font-black uppercase mb-12 text-white">TERMS OF SERVICE & DISCLAIMER</h1>
            
            <div className="bg-[#7c3aed] rounded-3xl p-12 text-center mb-12">
              <Shield size={80} className="mx-auto mb-6"/>
              <h2 className="text-3xl font-black mb-4">Legal Agreement</h2>
              <p className="text-lg">Please read carefully before using MandaStrong Studio</p>
            </div>

            <div className="bg-zinc-950 border-2 border-[#7c3aed] rounded-3xl p-10 mb-8">
              <h3 className="text-2xl font-bold mb-6 text-white">TERMS OF SERVICE</h3>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p><strong>1. Acceptance:</strong> By using MandaStrong Studio, you agree to these terms.</p>
                <p><strong>2. License:</strong> Limited, non-exclusive license for video creation.</p>
                <p><strong>3. User Responsibilities:</strong> Account security and content responsibility.</p>
                <p><strong>4. Content Ownership:</strong> You retain rights to your created content.</p>
                <p><strong>5. Prohibited Uses:</strong> No illegal content or rights violations.</p>
              </div>
            </div>

            <div className="bg-zinc-950 border-2 border-[#7c3aed] rounded-3xl p-10 mb-12">
              <h3 className="text-2xl font-bold mb-6 text-white">DISCLAIMER</h3>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p><strong>No Warranty:</strong> Service provided "as is" without guarantees.</p>
                <p><strong>Limitation of Liability:</strong> Not liable for user-generated content.</p>
                <p><strong>User Responsibility:</strong> Ensure content complies with laws.</p>
                <p><strong>Third-Party Services:</strong> Not responsible for external integrations.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <button className="flex-1 bg-zinc-800 py-6 rounded-2xl font-black uppercase hover:bg-zinc-700 transition">DECLINE</button>
              <button onClick={() => setPage(19)} className="flex-1 bg-[#7c3aed] py-6 rounded-2xl font-black uppercase hover:bg-[#6d28d9] transition">ACCEPT</button>
            </div>
          </div>
        )}

        {page === 19 && (
          <div className="min-h-screen p-8 pt-20 pb-40">
            <h1 className="text-5xl font-black uppercase mb-12 flex items-center gap-4 text-white">
              <MessageCircle size={48} className="text-[#7c3aed]"/>
              AGENT GROK - 24/7 HELP
            </h1>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
              <div>
                <div className="bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] rounded-3xl p-8 mb-8 border-4 border-[#a78bfa]">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-4xl font-black">G</div>
                    <div>
                      <h3 className="text-2xl font-black text-white">Agent Grok</h3>
                      <p className="text-lg text-white/80">● Online & Ready</p>
                    </div>
                    <div className="ml-auto bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-black">⚡ INSTANT</div>
                  </div>
                </div>

                <div className="bg-zinc-950 border-2 border-[#7c3aed] rounded-3xl p-8 mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#7c3aed] flex items-center justify-center font-black text-xl">G</div>
                    <div className="text-xs text-zinc-500">Just now</div>
                  </div>
                  <div className="bg-white text-black p-6 rounded-2xl rounded-tl-none">
                    <p className="font-bold text-lg">Hello! I'm Agent Grok. I can help with uploads, AI generation, timeline editing, enhancements, audio mixing, rendering, and exports. What do you need?</p>
                  </div>
                </div>

                <div className="bg-zinc-950 border-2 border-[#7c3aed] rounded-3xl p-6">
                  <input type="text" placeholder="Ask anything..." className="w-full bg-black border border-[#7c3aed] p-4 rounded-lg text-white outline-none mb-4"/>
                  <button className="w-full bg-[#7c3aed] py-4 rounded-lg font-bold hover:bg-[#6d28d9] transition">SEND MESSAGE</button>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                    <HelpCircle size={28} className="text-[#7c3aed]"/>
                    Common Questions
                  </h3>
                  <div className="space-y-3">
                    {[
                      'How do I upload files?',
                      'How does AI generation work?',
                      'How do I add clips to timeline?',
                      'What enhancements are available?',
                      'How do I adjust audio levels?',
                      'What export qualities can I use?',
                      'How do I download my video?',
                      'Can I share to community?'
                    ].map(q => (
                      <button key={q} className="w-full bg-zinc-950 border-2 border-zinc-800 p-4 rounded-xl text-left hover:bg-[#7c3aed]/20 hover:border-[#7c3aed] text-sm font-bold transition text-white">
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#7c3aed]/20 to-transparent border-2 border-[#7c3aed] rounded-3xl p-8">
                  <h3 className="text-xl font-bold mb-4 text-white">System Status</h3>
                  <div className="space-y-3">
                    {['File Upload','AI Generation','Timeline Editor','Enhancement Tools','Audio Mixer','Render Engine'].map(s => (
                      <div key={s} className="flex justify-between items-center bg-black/50 p-4 rounded-xl">
                        <span className="font-bold text-white">{s}</span>
                        <span className="text-[#a78bfa] flex items-center gap-2 font-bold">● Operational</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {page === 20 && (
          <div className="min-h-screen p-8 pt-20 pb-40">
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-5xl font-black uppercase text-white">COMMUNITY HUB</h1>
              <button onClick={() => fileInputRef.current?.click()} className="bg-[#7c3aed] px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-[#6d28d9] transition">
                <Upload size={24}/>
                UPLOAD YOUR MOVIE
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {communityPosts.map((post) => (
                <div key={post.id} className="bg-zinc-950 border-2 border-[#7c3aed] rounded-3xl overflow-hidden hover:scale-[1.02] transition">
                  <div className="aspect-video bg-gradient-to-br from-[#7c3aed]/30 to-[#6d28d9]/30 flex items-center justify-center text-9xl border-b-2 border-[#7c3aed]">
                    {post.emoji}
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-black mb-4 text-white">{post.title}</h3>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-[#7c3aed] flex items-center justify-center text-sm font-black">{post.user[0]}</div>
                      <div>
                        <div className="font-bold text-white">{post.user}</div>
                        <div className="text-xs text-zinc-500">2 hours ago</div>
                      </div>
                    </div>
                    <div className="flex gap-8 mb-6">
                      <button onClick={() => handleLike(post.id)} className="flex items-center gap-2 text-white font-bold hover:text-blue-400 transition">
                        <ThumbsUp className="text-blue-400" size={20}/> {post.likes}
                      </button>
                      <button onClick={() => handleLove(post.id)} className="flex items-center gap-2 text-white font-bold hover:text-red-400 transition">
                        <Heart className="text-red-400" size={20}/> {post.loves}
                      </button>
                    </div>
                    
                    {post.comments && post.comments.length > 0 && (
                      <div className="mb-4 space-y-2">
                        {post.comments.map(comment => (
                          <div key={comment.id} className="bg-black/50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-sm text-[#7c3aed]">{comment.user}</span>
                              <span className="text-xs text-zinc-500">just now</span>
                            </div>
                            <p className="text-sm text-white">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <textarea value={newComment[post.id] || ''} onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))} className="w-full p-4 bg-black border-2 border-[#7c3aed] rounded-xl text-white text-sm mb-4 outline-none resize-none" placeholder="Add a comment..."/>
                    <button onClick={() => handleComment(post.id)} className="bg-[#7c3aed] px-8 py-3 rounded-lg font-black uppercase hover:bg-[#6d28d9] transition">
                      POST COMMENT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {page === 21 && (
          <div className="min-h-screen p-8 pt-20 pb-40">
            <div className="max-w-6xl mx-auto">
              
              <div className="mb-16">
                <video autoPlay loop muted playsInline className="w-full rounded-3xl border-4 border-[#7c3aed] shadow-2xl">
                  <source src="/ThatsAllFolks.MP4" type="video/mp4"/>
                </video>
              </div>

              <h1 className="text-9xl font-black text-[#7c3aed] uppercase text-center mb-16 leading-none">THAT'S ALL FOLKS!</h1>

              <div className="bg-gradient-to-br from-[#7c3aed]/20 to-[#6d28d9]/10 border-4 border-[#7c3aed] rounded-3xl p-12 mb-12">
                <h2 className="text-4xl font-black mb-8 text-white text-center">A SPECIAL THANK YOU</h2>
                <div className="text-lg text-white leading-relaxed space-y-6">
                  <p className="italic font-bold text-[#7c3aed] text-2xl">Dear Creator,</p>
                  <p>Thank you for choosing MandaStrong Studio. This journey is more than video creation; it's about the <strong>social impact</strong> your stories will have.</p>
                  <p>Our mission: aid schools in <strong>bullying prevention</strong> and <strong>social skills development</strong>. Your films have the power to educate, inspire, and bring awareness to critical issues.</p>
                  <p>Thank you for being part of this mission to cultivate humanity in our communities.</p>
                </div>
              </div>

              <div className="bg-zinc-950 border-4 border-[#7c3aed] rounded-3xl p-12 text-center mb-12">
                <BookOpen size={80} className="mx-auto text-[#7c3aed] mb-8"/>
                <h3 className="text-4xl font-black text-white uppercase mb-6">HOW TO USE GUIDE</h3>
                <p className="text-zinc-400 font-bold text-xl uppercase mb-8">Complete Instructional Manual</p>
                <a href="https://raw.githubusercontent.com/mandastrong/studio-guide/main/MandaStrong-Studio-User-Guide.md" download="MandaStrong-Studio-User-Guide.md" target="_blank" rel="noopener noreferrer" className="inline-block px-16 py-6 bg-[#7c3aed] text-white rounded-full font-black text-2xl shadow-2xl hover:bg-[#6d28d9] transition">
                  📥 DOWNLOAD GUIDE
                </a>
              </div>

              <div className="bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] rounded-3xl p-12 text-center mb-16">
                <h3 className="text-4xl font-black mb-6">SUPPORT VETERANS MENTAL HEALTH</h3>
                <p className="text-2xl mb-8 font-bold">100% of Etsy Proceeds Benefit Veterans Mental Health Services</p>
                <a href="https://MandaStrong1.Etsy.com" target="_blank" rel="noopener noreferrer" className="inline-block px-16 py-6 bg-white text-[#7c3aed] rounded-full font-black text-2xl shadow-2xl hover:scale-105 transition">
                  🛍 VISIT ETSY STORE
                </a>
              </div>

              <div className="flex gap-8 justify-center mb-12">
                <button onClick={() => setPage(1)} className="px-20 py-8 bg-white text-black rounded-full font-black uppercase text-3xl hover:scale-105 transition shadow-2xl">
                  🏠 HOME
                </button>
                <button onClick={() => window.close()} className="px-20 py-8 bg-red-600 text-white rounded-full font-black uppercase text-3xl hover:scale-105 transition shadow-2xl">
                  ✕ CLOSE APP
                </button>
              </div>

              <div className="text-center">
                <a href="https://thatsallfolks.com" target="_blank" rel="noopener noreferrer" className="text-[#7c3aed] text-2xl font-black hover:text-[#a78bfa] transition">
                  ThatsAllFolks.com
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
