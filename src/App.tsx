import { useState, useRef, useCallback, useEffect } from 'react';
import {
  Menu, Sparkles, MessageCircle, ChevronLeft, ChevronRight, CheckCircle,
  Play, Upload, Mic, Zap, Shield, Music, Sliders, Database, FileVideo,
  BookOpen, Clock, ThumbsUp, Heart, HelpCircle, Plus, Eye, Layers, X,
  Download, Save, Wand2, Trash2, Share2, Search, LogOut, User, Lock,
  Mail, AlertCircle, Film, Star, TrendingUp, Award, Globe, Phone,
  RefreshCw, Copy, ExternalLink, ChevronDown, ChevronUp, Info, Bell,
  Volume2, VolumeX, Maximize, Minimize, RotateCcw, Check, AlertTriangle
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// ─── PWA Install Prompt (inline) ──────────────────────────────────────────────
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}
function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) { setIsInstalled(true); return; }
    if (sessionStorage.getItem('pwa-dismissed')) return;
    const iOS = /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase());
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setIsIOS(iOS);
    if (iOS && isSafari) { setTimeout(() => setShowBanner(true), 4000); return; }
    const handler = (e: Event) => { e.preventDefault(); setDeferredPrompt(e as BeforeInstallPromptEvent); setTimeout(() => setShowBanner(true), 4000); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') { setIsInstalled(true); }
    setShowBanner(false); setDeferredPrompt(null);
  };
  const dismiss = () => { setShowBanner(false); sessionStorage.setItem('pwa-dismissed','1'); };

  if (isInstalled || !showBanner) return null;
  return (
    <div className="fixed bottom-24 left-4 right-4 md:left-auto md:right-6 md:w-96 z-[60]" style={{animation:'slideUp .3s ease'}}>
      <div className="bg-zinc-950 border-2 border-[#7c3aed] rounded-2xl p-5 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] p-3 rounded-xl flex-shrink-0">
            <Sparkles size={22} className="text-white"/>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-black text-white text-sm mb-1">Install MandaStrong Studio</p>
            {isIOS ? (
              <p className="text-zinc-400 text-xs leading-relaxed">Tap <strong className="text-white">Share</strong> → <strong className="text-white">"Add to Home Screen"</strong></p>
            ) : (
              <>
                <p className="text-zinc-400 text-xs mb-3">Install for offline access & full-screen experience.</p>
                <button onClick={install} className="bg-[#7c3aed] text-white px-4 py-2 rounded-lg text-xs font-black uppercase hover:bg-[#6d28d9] transition">
                  INSTALL FREE
                </button>
              </>
            )}
          </div>
          <button onClick={dismiss} className="text-zinc-600 hover:text-white transition flex-shrink-0"><X size={18}/></button>
        </div>
      </div>
    </div>
  );
}

// ─── Supabase ─────────────────────────────────────────────────────────────────
const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  || '';
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseKey)
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// ─── AI Tools ─────────────────────────────────────────────────────────────────
const AI_TOOLS = {
  Writing: ["Text to Video","Text to Scene","Text to Animation","Text to Film","Script to Movie","Story to Video","Prompt to Video","Description to Scene","Narrative to Film","Dialogue to Animation","Plot to Video","Character to Scene","Action to Animation","Drama to Video","Comedy to Scene","Thriller to Film","Horror to Animation","Romance to Video","Sci-Fi to Scene","Fantasy to Film","Documentary Style","Commercial Creator","Trailer Maker","Music Video","Short Film Gen","Feature Film","Web Series","TV Episode","Podcast Video","Social Media","Vertical Video","Square Video","Widescreen","Ultra Wide","360 Video","VR Scene","AR Content","Hologram","Projection Map","LED Wall","Green Screen","Motion Graphics","Title Sequence","Credits Roll","Lower Thirds","Captions","Subtitles","Voiceover","Narration","Sound Design","Foley","Ambient Sound","Music Score","Theme Song","Jingle","Sound Effect","Transition Sound","Impact","Riser","Drop","Whoosh","Swoosh","Glitch","Digital","Analog","Vintage","Modern","Futuristic","Retro","Classic","Contemporary","Experimental","Abstract","Realistic","Stylized","Cartoon","Anime","3D Animation","2D Animation","Stop Motion","Claymation","Rotoscope","Motion Capture","CGI","VFX","Practical FX","Miniatures","Matte Painting","Compositing","Keying","Tracking","Stabilization","Color Grade","LUT Apply","Film Look","Digital Look","Broadcast","Cinema","IMAX","Anamorphic","Spherical","Wide Angle","Telephoto","Macro","Tilt Shift","Fisheye","Drone Shot","Aerial View","Birds Eye","Worms Eye","POV","First Person","Third Person","Isometric","Top Down","Side Scroller","Parallax","Ken Burns","Time Lapse","Hyperlapse"],
  Voice:   ["Text to Speech","Voice Clone","Character Voice","Narrator Voice","Accent British","Accent American","Accent Australian","Accent Irish","Accent Scottish","Accent Indian","Accent French","Accent German","Accent Spanish","Accent Italian","Accent Japanese","Accent Chinese","Accent Korean","Accent Russian","Accent Arabic","Accent Portuguese","Age Child","Age Teen","Age Adult","Age Elderly","Gender Male","Gender Female","Gender Neutral","Emotion Happy","Emotion Sad","Emotion Angry","Emotion Excited","Emotion Calm","Emotion Scared","Emotion Surprised","Emotion Disgusted","Emotion Neutral","Emotion Love","Emotion Hate","Tone Formal","Tone Casual","Tone Professional","Tone Friendly","Tone Serious","Tone Playful","Tone Dramatic","Tone Comedic","Tone Sarcastic","Tone Sincere","Style News Anchor","Style Radio DJ","Style Podcast","Style Audiobook","Style Commercial","Style Trailer","Style Documentary","Style Tutorial","Style Gaming","Style ASMR","Style Meditation","Style Hypnosis","Style Sports Cast","Style Weather","Style Movie Promo","Voice Whisper","Voice Shout","Voice Scream","Voice Laugh","Voice Cry","Voice Sigh","Voice Gasp","Effect Robot","Effect Alien","Effect Monster","Effect Demon","Effect Angel","Effect Ghost","Effect Zombie","Effect Chipmunk","Effect Deep Bass","Effect High Pitch","Effect Echo","Effect Reverb","Effect Delay","Effect Chorus","Effect Flanger","Effect Phaser","Effect Distortion","Effect Bitcrush","Effect Lo-Fi","Effect Radio","Effect Phone","Effect Megaphone","Effect Underwater","Effect Space","Effect Cave","Effect Stadium","Effect Concert Hall","Effect Cathedral","Speed Slow","Speed Fast","Speed Normal","Pitch Up","Pitch Down","Volume Loud","Volume Soft","Clarity HD"],
  Image:   ["Text to Image","Image Upscale","Photo Enhance","Style Transfer","Image to Video","Still to Motion","Photo Animation","Portrait Animate","Landscape Pan","Product Showcase","Food Styling","Fashion Photo","Architecture Render","Interior Design","Car Render","Jewelry Photo","Tech Product","Nature Photo","Wildlife Shot","Pet Portrait","Baby Photo","Wedding Photo","Event Photo","Concert Photo","Sports Photo","Action Shot","Macro Photo","Aerial Photo","Drone Image","Street Photo","Urban Scene","Rural Scene","Beach Scene","Mountain Scene","Forest Scene","Desert Scene","Snow Scene","Rain Scene","Fog Scene","Sunset Photo","Sunrise Photo","Night Photo","Starry Sky","Moon Photo","Aurora Photo","Lightning Photo","Rainbow Photo","Cloud Photo","Storm Photo","Season Spring","Season Summer","Season Fall","Season Winter","Time Dawn","Time Morning","Time Noon","Time Evening","Time Dusk","Time Night","Light Natural","Light Studio","Light Golden Hour","Light Blue Hour","Light Dramatic","Light Soft","Color Vibrant","Color Muted","Color BW","Color Sepia","Color Graded","Color Corrected","Mood Happy","Mood Sad","Mood Energetic","Mood Calm","Mood Dramatic","Mood Romantic","Mood Scary","Mood Mysterious","Mood Nostalgic","Mood Futuristic","Filter Vintage","Filter Modern","Filter Retro","Filter Cinematic","Filter HDR","Filter Soft Focus","Filter Sharp","Filter Blur","Filter Grain","Effect Bokeh","Effect Lens Flare","Effect Light Leak","Effect Vignette","Effect Glow","Effect Sparkle"],
  Video:   ["Video Upscale","Video Enhance","Slow Motion","Time Lapse","Reverse Video","Loop Video","Stabilize Video","Color Grade Video","LUT Video","Denoise Video","Sharpen Video","Blur Video","Zoom Video","Pan Video","Tilt Video","Rotate Video","Flip Video","Crop Video","Resize Video","Speed Up","Speed Down","Freeze Frame","Split Screen","Picture in Picture","Green Screen","Chroma Key","Motion Track","Face Track","Object Track","Camera Track","Stabilization 2D","Stabilization 3D","Warp Stabilizer","Rolling Shutter","Remove Objects","Remove People","Clone Video","Time Remap","Optical Flow","Frame Blend","Frame Hold","Cut Video","Trim Video","Split Video","Merge Video","Concatenate","Crossfade","Dissolve","Fade In","Fade Out","Wipe Left","Wipe Right","Wipe Up","Wipe Down","Push","Slide","Zoom In Trans","Zoom Out Trans","Spin","Rotate Trans","Flip Trans","Page Peel","Cube Spin","Ripple","Wave","Glitch Trans","Digital Trans","Light Trans","Blur Trans","Morph","Pixelate","Mosaic","Kaleidoscope","Mirror","Symmetry","Prism","RGB Split","Anaglyph","VHS","Film Burn","Dust Scratch","Light Leak Video","Bloom","Glow Video","God Rays","Volumetric Light","Lens Flare Video","Star Filter","Bokeh Video","Tilt Shift Video","Miniature","Lomography","Polaroid","Negative","Solarize","Posterize","Invert","Gamma","Contrast","Brightness Video","Saturation Video","Hue Shift Video","Temperature Video","Tint Video"],
  Motion:  ["Motion Blur","Radial Blur","Zoom Blur","Directional Blur","Camera Shake","Earthquake","Explosion Shake","Impact Shake","Wobble","Wiggle","Wave Motion","Ripple Motion","Bounce","Elastic","Spring","Pendulum","Rotate Continuous","Spin","Spiral","Orbit","Circle","Arc","Figure 8","Random","Noise","Turbulence","Wind","Gravity","Attraction","Repulsion","Vortex","Swirl","Twist","Bend","Warp","Bulge","Pinch","Spherize","Displace","Offset","Slide Motion","Drift","Float","Rise","Fall","Ascend","Descend","Levitate","Hover","Bob","Sway","Rock","Swing","Jitter","Vibrate","Tremble","Quake","Pulse","Beat","Throb","Flicker","Flash","Strobe","Blink","Fade Motion","Appear","Disappear","Materialize","Dematerialize","Teleport","Portal","Door Open","Door Close","Curtain","Blinds","Shutter","Iris","Reveal","Conceal","Unfold","Fold","Expand","Collapse","Grow","Shrink","Scale Up","Scale Down","Stretch","Squeeze","Compress","Inflate","Deflate","Morph Motion","Liquefy","Melt","Drip","Pour","Splash","Spray","Burst","Shatter","Break","Crack","Crumble","Disintegrate","Particle Burst","Particle Trail","Particle Swarm","Particle Rain","Particle Snow","Particle Dust","Particle Smoke","Particle Fire","Particle Sparks","Particle Stars","Particle Confetti","Particle Leaves","Particle Petals","Particle Bubbles"]
};

const ENHANCEMENT_TOOLS = [
  "AI 8K Upscaling","Cinematic Grain","Motion Stabilization","Deep HDR Boost",
  "Face Retouch Pro","Neural Noise Reduction","Auto Color Balance","Dynamic Range Expansion",
  "Lens Flare Synth","Shadow Recovery","Highlight Rolloff","Skin Tone Uniformity",
  "Optical Flow Smooth","Atmospheric Haze","Sharpen Intelligence","De-Banding Pro",
  "Moire Removal","Color Space Transform","Anamorphic Stretch","Flicker Reduction",
  "Low Light Clarity","Texture Enhancement","Micro-Contrast Adjust","Vignette Pro",
  "Film Stock Emulation","Glow Synthesis","Edge Refinement","Smart Saturation",
  "Tone Mapping Pro","Gamma Correction","Black Point Calibration","White Balance AI",
  "Color Match Pro","Temporal Denoise","Digital Intermediate","Chromatic Correction",
  "Film Grain Advanced","Halation Effect","Bloom Control","Light Wrap"
];

// Duration presets with labels
const DURATION_PRESETS = [
  { label: 'Short', mins: 5, desc: 'Social/Reel' },
  { label: 'Medium', mins: 15, desc: 'Short Film' },
  { label: 'Standard', mins: 30, desc: 'Episode' },
  { label: '1 Hour', mins: 60, desc: 'Feature' },
  { label: '90 Min', mins: 90, desc: 'Movie' },
  { label: '2 Hours', mins: 120, desc: 'Epic' },
  { label: '3 Hours', mins: 180, desc: 'Marathon' },
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface MediaAsset {
  id: number; name: string; type: string; size: string; url: string;
  aiGenerated?: boolean; enhanced?: boolean; enhancement?: string;
  rendered?: boolean; quality?: string; format?: string; duration?: number;
  prompt?: string; timestamp: string;
}
interface Comment { id: number; text: string; user: string; timestamp: string; }
interface CommunityPost {
  id: number; title: string; user: string; emoji: string;
  likes: number; loves: number; views: number; comments: Comment[];
}
interface AuthUser { id: string; email: string; user_metadata?: { full_name?: string }; }

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {

  // Navigation
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);

  // Auth
  const [authUser, setAuthUser]           = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading]     = useState(false);
  const [authError, setAuthError]         = useState('');
  const [authMode, setAuthMode]           = useState<'login'|'register'|'forgot'>('login');
  const [loginEmail, setLoginEmail]       = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName]             = useState('');
  const [regEmail, setRegEmail]           = useState('');
  const [regPassword, setRegPassword]     = useState('');
  const [forgotEmail, setForgotEmail]     = useState('');
  const [forgotSent, setForgotSent]       = useState(false);

  // Editor
  const [duration, setDuration]                       = useState(90);
  const [selectedTool, setSelectedTool]               = useState<string|null>(null);
  const [selectedEnhancement, setSelectedEnhancement] = useState<string|null>(null);
  const [mediaLibrary, setMediaLibrary]               = useState<MediaAsset[]>([]);
  const [timeline, setTimeline]                       = useState<{video:MediaAsset[];audio:MediaAsset[];text:MediaAsset[]}>({video:[],audio:[],text:[]});
  const [draggedItem, setDraggedItem]                 = useState<MediaAsset|null>(null);
  const [currentVideo, setCurrentVideo]               = useState<MediaAsset|null>(null);
  const [aiPrompt, setAiPrompt]                       = useState('');
  const [generating, setGenerating]                   = useState(false);
  const [showPasteOptions, setShowPasteOptions]       = useState(false);
  const [pasteMode, setPasteMode]                     = useState<'url'|'text'|null>(null);
  const [rendering, setRendering]                     = useState(false);
  const [renderProgress, setRenderProgress]           = useState(0);
  const [audioLevels, setAudioLevels]                 = useState({music:75,voice:50,sfx:65,master:80});
  const [enhSettings, setEnhSettings]                 = useState({intensity:75,clarity:75,color:75,brightness:75});
  const [exportSettings, setExportSettings]           = useState({quality:'8K',format:'MP4'});
  const [toolSearch, setToolSearch]                   = useState('');
  const [uploadProgress, setUploadProgress]           = useState<Record<number,number>>({});
  const [isUploading, setIsUploading]                 = useState(false);
  const [processing, setProcessing]                   = useState(false);
  const [muted, setMuted]                             = useState(false);
  const [showDurationTip, setShowDurationTip]         = useState(false);

  // Community
  const [isGuest, setIsGuest]           = useState(false);
  const [newComment, setNewComment]     = useState<Record<number,string>>({});
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([
    {id:1,title:'Epic Action Movie',user:'Sarah J.',emoji:'🎬',likes:2847,loves:1923,views:12543,comments:[]},
    {id:2,title:'Family Vacation Memories',user:'Mike Chen',emoji:'✈️',likes:1256,loves:892,views:5421,comments:[]},
    {id:3,title:'First Documentary',user:'Emily R.',emoji:'📹',likes:3421,loves:2156,views:8932,comments:[]},
    {id:4,title:'Music Video Edit',user:'Alex T.',emoji:'🎵',likes:5234,loves:4012,views:18765,comments:[]},
    {id:5,title:'Wedding Highlights',user:'Jessica M.',emoji:'💍',likes:4123,loves:3456,views:9876,comments:[]},
    {id:6,title:'Gaming Montage',user:'Tyler K.',emoji:'🎮',likes:6543,loves:5231,views:23456,comments:[]},
    {id:7,title:'Product Showcase',user:'David L.',emoji:'📦',likes:987,loves:654,views:3210,comments:[]},
    {id:8,title:'Travel Adventure',user:'Maya P.',emoji:'🌍',likes:3210,loves:2345,views:11234,comments:[]},
    {id:9,title:'Cooking Tutorial',user:'Chef Marco',emoji:'👨‍🍳',likes:2134,loves:1876,views:7654,comments:[]},
    {id:10,title:'Fitness Journey',user:'Amanda R.',emoji:'💪',likes:4567,loves:3421,views:15432,comments:[]},
    {id:11,title:'Pet Compilation',user:'Luna B.',emoji:'🐕',likes:8765,loves:7654,views:32109,comments:[]},
    {id:12,title:'Art Time Lapse',user:'Vincent A.',emoji:'🎨',likes:1987,loves:1543,views:6543,comments:[]}
  ]);

  // Notifications
  const [notifications, setNotifications] = useState<{id:number;msg:string;type:'success'|'error'|'info'}[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Notification helper ───────────────────────────────────────────────────
  const notify = useCallback((msg: string, type: 'success'|'error'|'info' = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, {id, msg, type}]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3500);
  }, []);

  // ── Supabase auth listener ────────────────────────────────────────────────
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) setAuthUser(session.user as AuthUser);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setAuthUser(session?.user as AuthUser ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // ── Close menu on outside click ───────────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#hamburger-menu')) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  // ── Auth handlers ─────────────────────────────────────────────────────────
  const handleLogin = useCallback(async () => {
    if (!loginEmail.trim() || !loginPassword.trim()) { setAuthError('Please enter email and password.'); return; }
    setAuthLoading(true); setAuthError('');
    if (supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword });
      if (error) { setAuthError(error.message); setAuthLoading(false); return; }
    } else {
      setAuthUser({ id: 'demo-user', email: loginEmail });
      notify('Logged in (demo mode — add Supabase keys to enable real auth)', 'info');
    }
    setAuthLoading(false); setPage(4); notify('Welcome back! 🎬');
  }, [loginEmail, loginPassword]);

  const handleRegister = useCallback(async () => {
    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) { setAuthError('Please fill in all fields.'); return; }
    if (regPassword.length < 6) { setAuthError('Password must be at least 6 characters.'); return; }
    setAuthLoading(true); setAuthError('');
    if (supabase) {
      const { error } = await supabase.auth.signUp({ email: regEmail, password: regPassword, options: { data: { full_name: regName } } });
      if (error) { setAuthError(error.message); setAuthLoading(false); return; }
    } else {
      setAuthUser({ id: 'demo-user', email: regEmail, user_metadata: { full_name: regName } });
    }
    setAuthLoading(false); setPage(4); notify('Account created! Welcome to MandaStrong Studio 🎬');
  }, [regName, regEmail, regPassword]);

  const handleForgotPassword = useCallback(async () => {
    if (!forgotEmail.trim()) { setAuthError('Please enter your email.'); return; }
    setAuthLoading(true); setAuthError('');
    if (supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail);
      if (error) { setAuthError(error.message); setAuthLoading(false); return; }
    }
    setForgotSent(true); setAuthLoading(false);
  }, [forgotEmail]);

  const handleLogout = useCallback(async () => {
    if (supabase) await supabase.auth.signOut();
    setAuthUser(null); setIsGuest(false); setPage(3); notify('Signed out successfully', 'info');
  }, []);

  const userName = authUser?.user_metadata?.full_name || authUser?.email?.split('@')[0] || '';

  // ── File Upload ───────────────────────────────────────────────────────────
  const processFiles = useCallback((files: FileList | File[]) => {
    const arr = Array.from(files);
    if (!arr.length) return;
    setIsUploading(true);
    arr.forEach((file, index) => {
      const fileId = Date.now() + index;
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
      const reader = new FileReader();
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 25;
        if (progress >= 100) { progress = 100; clearInterval(interval); }
        setUploadProgress(prev => ({ ...prev, [fileId]: Math.min(progress, 100) }));
      }, 150);
      reader.onload = (e) => {
        setTimeout(() => {
          const asset: MediaAsset = {
            id: fileId, name: file.name,
            type: file.type.startsWith('video') ? 'video' : file.type.startsWith('audio') ? 'audio' : 'image',
            size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            url: e.target?.result as string,
            timestamp: new Date().toISOString()
          };
          setMediaLibrary(prev => [...prev, asset]);
          setUploadProgress(prev => {
            const next = { ...prev }; delete next[fileId];
            if (Object.keys(next).length === 0) { setIsUploading(false); notify(`${arr.length} file${arr.length > 1 ? 's' : ''} uploaded to library ✓`); }
            return next;
          });
        }, 800);
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [notify]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processFiles(e.target.files);
  }, [processFiles]);

  // ── AI Generate ───────────────────────────────────────────────────────────
  const handleAIGenerate = useCallback(() => {
    if (!aiPrompt.trim() || !selectedTool) return;
    setGenerating(true);
    setTimeout(() => {
      const asset: MediaAsset = {
        id: Date.now(),
        name: `AI-${selectedTool.replace(/\s+/g,'-').toLowerCase()}-${Date.now()}.mp4`,
        type: 'video', size: (Math.random()*400+100).toFixed(0)+' MB',
        url: 'data:video/mp4;base64,SIMULATED',
        aiGenerated: true, prompt: aiPrompt,
        timestamp: new Date().toISOString()
      };
      setMediaLibrary(prev => [...prev, asset]);
      setGenerating(false); setAiPrompt(''); setSelectedTool(null);
      notify('AI asset generated & saved to library ✓');
    }, 2500);
  }, [aiPrompt, selectedTool, notify]);

  // ── Timeline ──────────────────────────────────────────────────────────────
  const handleDrop = useCallback((track: 'video'|'audio'|'text') => {
    if (!draggedItem) return;
    setTimeline(prev => ({ ...prev, [track]: [...prev[track], {...draggedItem, id: Date.now()}] }));
    setDraggedItem(null); notify(`Added to ${track} track`);
  }, [draggedItem, notify]);

  const removeFromTimeline = useCallback((track: 'video'|'audio'|'text', index: number) => {
    setTimeline(prev => ({ ...prev, [track]: prev[track].filter((_,i) => i !== index) }));
  }, []);

  const deleteFromLibrary = useCallback((id: number) => {
    setMediaLibrary(prev => prev.filter(item => item.id !== id));
    notify('Removed from library', 'info');
  }, [notify]);

  // ── Enhancement ───────────────────────────────────────────────────────────
  const applyEnhancement = useCallback(() => {
    if (!selectedEnhancement) return;
    const asset: MediaAsset = {
      id: Date.now(),
      name: `enhanced-${selectedEnhancement.replace(/\s+/g,'-').toLowerCase()}-${Date.now()}.mp4`,
      type: 'video', size: (Math.random()*400+100).toFixed(0)+' MB',
      url: 'data:video/mp4;base64,ENHANCED',
      enhanced: true, enhancement: selectedEnhancement,
      timestamp: new Date().toISOString()
    };
    setMediaLibrary(prev => [...prev, asset]);
    setSelectedEnhancement(null);
    notify(`${selectedEnhancement} applied & saved ✓`);
  }, [selectedEnhancement, notify]);

  // ── Render ────────────────────────────────────────────────────────────────
  const handleRender = useCallback(() => {
    setRendering(true); setRenderProgress(0);
    const interval = setInterval(() => {
      setRenderProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const rendered: MediaAsset = {
              id: Date.now(),
              name: `MandaStrong-render-${Date.now()}.${exportSettings.format.toLowerCase()}`,
              type: 'video', size: (Math.random()*800+400).toFixed(0)+' MB',
              url: `data:video/${exportSettings.format.toLowerCase()};base64,RENDERED`,
              rendered: true, quality: exportSettings.quality, format: exportSettings.format,
              duration, timestamp: new Date().toISOString()
            };
            setMediaLibrary(prev => [...prev, rendered]);
            setCurrentVideo(rendered); setRendering(false); setRenderProgress(0);
            setPage(16); notify('Render complete! Ready to export 🎬');
          }, 500);
          return 100;
        }
        return prev + (Math.random() * 4 + 2);
      });
    }, 120);
  }, [duration, exportSettings, notify]);

  // ── Download ──────────────────────────────────────────────────────────────
  const handleDownload = useCallback((asset: MediaAsset) => {
    const link = document.createElement('a');
    link.href = asset.url; link.download = asset.name; link.click();
    notify('Download started ✓');
  }, [notify]);

  // ── Community ─────────────────────────────────────────────────────────────
  const handleLike  = useCallback((id: number) => setCommunityPosts(prev => prev.map(p => p.id === id ? {...p, likes: p.likes+1} : p)), []);
  const handleLove  = useCallback((id: number) => setCommunityPosts(prev => prev.map(p => p.id === id ? {...p, loves: p.loves+1} : p)), []);
  const handleComment = useCallback((postId: number) => {
    const text = newComment[postId];
    if (!text?.trim()) return;
    setCommunityPosts(prev => prev.map(p => p.id === postId
      ? { ...p, comments: [...p.comments, { id: Date.now(), text, user: userName || 'You', timestamp: new Date().toISOString() }] }
      : p
    ));
    setNewComment(prev => ({ ...prev, [postId]: '' }));
  }, [newComment, userName]);

  // ─────────────────────────────────────────────────────────────────────────
  // ── RENDER ────────────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <PWAInstallPrompt />

      <style>{`
        /* Hide Bolt.new badge - all variations */
        [data-bolt-badge],[class*="bolt-badge"],[id*="bolt-badge"],
        a[href*="bolt.new"],a[href*="stackblitz"],
        div[class*="PoweredBy"],footer[class*="bolt"],
        .sb-badge,[class*="sb-badge"],[id*="powered-by"],
        div[style*="z-index: 9999"] a[href*="bolt"],
        iframe[src*="bolt"]{display:none!important;visibility:hidden!important;opacity:0!important;}

        /* Scrollbar */
        .scrollbar::-webkit-scrollbar{width:6px;}
        .scrollbar::-webkit-scrollbar-track{background:#000;}
        .scrollbar::-webkit-scrollbar-thumb{background:#7c3aed;border-radius:10px;}

        /* Range sliders - cross browser */
        input[type=range]{-webkit-appearance:none;appearance:none;width:100%;background:transparent;cursor:pointer;}
        input[type=range]::-webkit-slider-runnable-track{height:6px;background:#3f3f46;border-radius:3px;}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:#7c3aed;margin-top:-8px;box-shadow:0 0 6px #7c3aed88;}
        input[type=range]::-moz-range-track{height:6px;background:#3f3f46;border-radius:3px;}
        input[type=range]::-moz-range-thumb{width:22px;height:22px;border-radius:50%;background:#7c3aed;border:none;}

        /* Page transitions */
        .page-enter{animation:fadeIn .25s ease;}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}

        /* Pulse glow for live badge */
        @keyframes pulseGlow{0%,100%{box-shadow:0 0 8px #7c3aed;}50%{box-shadow:0 0 20px #a78bfa;}}
        .live-badge{animation:pulseGlow 2s infinite;}
      `}</style>

      {/* ── Hidden file input ── */}
      <input ref={fileInputRef} type="file" multiple accept="video/*,audio/*,image/*" onChange={handleFileUpload} className="hidden" />

      {/* ── Toast Notifications ── */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none">
        {notifications.map(n => (
          <div key={n.id} className={`px-6 py-3 rounded-full font-bold text-sm shadow-2xl flex items-center gap-2 page-enter ${
            n.type === 'success' ? 'bg-green-600 text-white' :
            n.type === 'error'   ? 'bg-red-600 text-white' :
                                   'bg-[#7c3aed] text-white'
          }`}>
            {n.type === 'success' && <Check size={16}/>}
            {n.type === 'error'   && <AlertCircle size={16}/>}
            {n.type === 'info'    && <Info size={16}/>}
            {n.msg}
          </div>
        ))}
      </div>

      {/* ── Upload Progress Overlay ── */}
      {isUploading && Object.keys(uploadProgress).length > 0 && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-8">
          <div className="bg-zinc-950 border-4 border-[#7c3aed] rounded-3xl p-8 max-w-lg w-full">
            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
              <Upload size={28} className="text-[#7c3aed]"/> UPLOADING FILES...
            </h2>
            <div className="space-y-4">
              {Object.entries(uploadProgress).map(([fid, prog]) => (
                <div key={fid} className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-white">Uploading...</span>
                    <span className="text-[#7c3aed]">{Math.round(prog as number)}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-3 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] transition-all duration-200 rounded-full" style={{width:`${prog}%`}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Processing Overlay ── */}
      {processing && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 border-8 border-[#7c3aed] border-t-transparent rounded-full animate-spin mb-6"/>
            <h2 className="text-3xl font-black text-white">PROCESSING...</h2>
          </div>
        </div>
      )}

      {/* ── Hamburger Menu ── */}
      {page > 0 && (
        <div id="hamburger-menu" className="fixed top-6 left-6 z-50">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-[#7c3aed] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
            aria-label="Menu"
          >
            <Menu size={26}/>
          </button>

          {menuOpen && (
            <div className="absolute top-20 left-0 bg-zinc-950 border-2 border-[#7c3aed] rounded-2xl w-72 shadow-2xl max-h-[85vh] overflow-y-auto scrollbar page-enter">
              {/* User badge in menu */}
              {authUser && (
                <div className="p-5 border-b border-zinc-800">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] flex items-center justify-center font-black text-lg flex-shrink-0">
                      {(userName[0] || 'U').toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="font-black text-white text-sm truncate">{userName}</div>
                      <div className="text-xs text-zinc-500 truncate">{authUser.email}</div>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 text-red-400 text-xs font-bold p-2 hover:bg-red-500/10 rounded-lg transition">
                    <LogOut size={14}/> Sign Out
                  </button>
                </div>
              )}
              {isGuest && (
                <div className="p-4 border-b border-zinc-800 bg-yellow-600/20">
                  <p className="text-yellow-400 text-xs font-bold">👁 Browsing as Guest</p>
                  <button onClick={()=>{setIsGuest(false);setPage(3);setMenuOpen(false);}} className="text-white text-xs underline mt-1">Sign Up / Login</button>
                </div>
              )}
              <div className="p-4">
                <h3 className="text-sm font-black uppercase mb-3 text-[#7c3aed]">Quick Access</h3>
                <div className="space-y-1">
                  {[
                    {p:1,l:'🏠 Home'},{p:2,l:'👋 Welcome'},{p:3,l:'🔐 Login / Pricing'},
                    {p:4,l:'✍️ Writing Tools'},{p:5,l:'🎙 Voice Tools'},{p:6,l:'🖼 Image Tools'},
                    {p:7,l:'🎥 Video Tools'},{p:8,l:'🌊 Motion Tools'},{p:10,l:'📁 Upload Media'},
                    {p:11,l:'🎬 Editor Suite'},{p:12,l:'🗂 Timeline & Library'},{p:13,l:'✨ Enhancement'},
                    {p:14,l:'🎚 Audio Mixer'},{p:15,l:'👁 Preview'},{p:16,l:'📤 Export'},
                    {p:17,l:'📚 Tutorials'},{p:18,l:'📜 Terms'},{p:19,l:'🤖 Agent Grok'},
                    {p:20,l:'👥 Community'},{p:21,l:'🙏 Thank You'}
                  ].map(i => (
                    <button key={i.p} onClick={()=>{setPage(i.p);setMenuOpen(false);}}
                      className={`w-full text-left text-sm font-bold text-white p-2.5 rounded-lg transition ${page===i.p?'bg-[#7c3aed]':'hover:bg-[#7c3aed]/20'}`}>
                      {i.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Live Badge ── */}
      {page >= 3 && (
        <div className="fixed top-6 right-6 z-50 bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] px-5 py-2.5 rounded-full shadow-2xl border-2 border-[#a78bfa] live-badge flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-ping absolute right-16"/>
          <div className="w-2.5 h-2.5 bg-green-400 rounded-full"/>
          <span className="text-white font-black text-xs uppercase tracking-wider ml-1">Live on Bolt</span>
        </div>
      )}

      {/* ── Grok button ── */}
      {page >= 1 && page !== 19 && (
        <button onClick={()=>setPage(19)}
          className="fixed bottom-20 right-6 z-50 bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black shadow-2xl hover:scale-110 transition border-2 border-[#a78bfa]"
          title="Agent Grok - 24/7 Help"
        >G</button>
      )}

      {/* ── Footer bar ── */}
      {page >= 3 && (
        <div className="fixed bottom-0 left-0 w-full bg-black/95 py-2 text-center z-40 border-t border-[#7c3aed]/30">
          <p className="text-xs font-black text-white/70 uppercase tracking-wide">
            MandaStrong Studio 2025–2026 &nbsp;•&nbsp; <a href="https://MandaStrong1.Etsy.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#7c3aed] transition">MandaStrong1.Etsy.com</a>
          </p>
        </div>
      )}

      {/* ── Nav arrows ── */}
      {page > 1 && page < 21 && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 flex gap-4">
          <button onClick={()=>setPage(page-1)} className="bg-zinc-950 border border-[#7c3aed] px-8 py-2 rounded-full font-black uppercase text-[#7c3aed] hover:bg-[#7c3aed] hover:text-white transition text-xs flex items-center gap-1.5">
            <ChevronLeft size={14}/> BACK
          </button>
          <button onClick={()=>setPage(page+1)} className="bg-[#7c3aed] px-8 py-2 rounded-full font-black uppercase text-white hover:bg-[#6d28d9] transition text-xs flex items-center gap-1.5">
            NEXT <ChevronRight size={14}/>
          </button>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          PAGES
      ════════════════════════════════════════════════════════════ */}
      <main className="min-h-screen pb-32">

        {/* ── P1: SPLASH ── */}
        {page === 1 && (
          <div className="h-screen flex flex-col justify-center items-center text-center px-6 page-enter">
            <div className="relative mb-10">
              <Sparkles size={72} className="text-[#7c3aed] animate-pulse"/>
              <div className="absolute inset-0 blur-2xl bg-[#7c3aed]/30 rounded-full"/>
            </div>
            <h1 className="text-6xl md:text-9xl font-black text-[#7c3aed] uppercase mb-4 leading-none">MANDASTRONG</h1>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-6">STUDIO</h2>
            <p className="text-lg md:text-2xl font-bold text-zinc-400 max-w-2xl mb-12">
              The All-In-One App to Make Your Own Longer Movies
            </p>
            <button onClick={()=>setPage(2)}
              className="bg-[#7c3aed] text-white px-16 py-5 rounded-full font-black uppercase text-xl hover:scale-105 hover:bg-[#6d28d9] transition shadow-2xl shadow-[#7c3aed]/40">
              START CREATING
            </button>
            <p className="text-zinc-600 text-xs mt-8 uppercase tracking-widest">600+ AI Tools • Professional Editor • Community Hub</p>
          </div>
        )}

        {/* ── P2: WELCOME ── */}
        {page === 2 && (
          <div className="h-screen flex flex-col justify-center items-center text-center px-8 page-enter">
            <Film size={80} className="text-[#7c3aed] mb-8"/>
            <h1 className="text-5xl md:text-7xl font-black text-[#7c3aed] uppercase mb-6">WELCOME!</h1>
            <p className="text-xl md:text-3xl font-bold text-white italic uppercase max-w-4xl leading-relaxed">
              Make Awesome Family Movies or Turn Your Dreams Into Reality.
            </p>
            <p className="text-[#7c3aed] text-xl font-black mt-6 uppercase tracking-widest">Enjoy! 🎬</p>
            <div className="grid grid-cols-3 gap-6 mt-16 max-w-3xl">
              {[
                {icon:'✍️', label:'AI Writing'},
                {icon:'🎙', label:'Voice Tools'},
                {icon:'🖼', label:'Image AI'},
                {icon:'🎥', label:'Video Tools'},
                {icon:'🌊', label:'Motion FX'},
                {icon:'👥', label:'Community'}
              ].map(f => (
                <div key={f.label} className="bg-zinc-950 border border-[#7c3aed]/40 rounded-2xl p-4 text-center">
                  <div className="text-3xl mb-2">{f.icon}</div>
                  <div className="text-xs font-black text-white uppercase">{f.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── P3: LOGIN / PRICING ── */}
        {page === 3 && (
          <div className="min-h-screen p-6 pt-20 pb-40 max-w-7xl mx-auto overflow-y-auto scrollbar page-enter">

            {/* Guest button */}
            <div className="text-center mb-10">
              <button onClick={()=>{setIsGuest(true);setPage(20);}}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] px-10 py-4 rounded-full font-black uppercase text-white text-base hover:scale-105 transition shadow-2xl border-2 border-[#a78bfa]">
                <Eye size={22}/> BROWSE COMMUNITY AS GUEST
              </button>
              <p className="text-zinc-500 text-sm mt-2">View-only • No sign-up required</p>
            </div>

            {/* Error */}
            {authError && (
              <div className="max-w-5xl mx-auto mb-6 bg-red-500/10 border-2 border-red-500 rounded-2xl p-4 flex items-center gap-3">
                <AlertCircle size={18} className="text-red-400 flex-shrink-0"/>
                <p className="text-red-300 font-bold text-sm flex-1">{authError}</p>
                <button onClick={()=>setAuthError('')}><X size={16} className="text-red-400"/></button>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
              {/* Auth card */}
              <div className="bg-zinc-950 border-2 border-[#7c3aed] p-8 rounded-3xl">
                {/* Mode tabs */}
                <div className="flex gap-2 mb-8">
                  {(['login','register','forgot'] as const).map(m => (
                    <button key={m} onClick={()=>{setAuthMode(m);setAuthError('');}}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase transition ${authMode===m?'bg-[#7c3aed] text-white':'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>
                      {m==='forgot'?'Reset':m}
                    </button>
                  ))}
                </div>

                {authMode === 'login' && (<>
                  <h3 className="text-2xl font-black uppercase mb-6 text-white">Sign In</h3>
                  <label className="block text-xs font-bold text-zinc-400 uppercase mb-1.5">Email</label>
                  <div className="relative mb-4">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c3aed]"/>
                    <input type="email" placeholder="you@example.com" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)}
                      className="w-full bg-black border-2 border-zinc-800 focus:border-[#7c3aed] pl-11 pr-4 py-3.5 rounded-xl text-white outline-none transition"/>
                  </div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase mb-1.5">Password</label>
                  <div className="relative mb-6">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c3aed]"/>
                    <input type="password" placeholder="••••••••" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)}
                      onKeyDown={e=>e.key==='Enter'&&handleLogin()}
                      className="w-full bg-black border-2 border-zinc-800 focus:border-[#7c3aed] pl-11 pr-4 py-3.5 rounded-xl text-white outline-none transition"/>
                  </div>
                  <button onClick={handleLogin} disabled={authLoading}
                    className="w-full bg-[#7c3aed] py-4 rounded-xl font-black uppercase hover:bg-[#6d28d9] transition disabled:opacity-50 flex items-center justify-center gap-3">
                    {authLoading?<><div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"/>Signing in...</>:'Login & Create'}
                  </button>
                </>)}

                {authMode === 'register' && (<>
                  <h3 className="text-2xl font-black uppercase mb-6 text-white">Create Account</h3>
                  {[
                    {label:'Your Name',type:'text',icon:User,val:regName,set:setRegName,ph:'Full Name'},
                    {label:'Email',type:'email',icon:Mail,val:regEmail,set:setRegEmail,ph:'you@example.com'},
                    {label:'Password',type:'password',icon:Lock,val:regPassword,set:setRegPassword,ph:'Min. 6 characters'},
                  ].map(f => (
                    <div key={f.label} className="mb-4">
                      <label className="block text-xs font-bold text-zinc-400 uppercase mb-1.5">{f.label}</label>
                      <div className="relative">
                        <f.icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c3aed]"/>
                        <input type={f.type} placeholder={f.ph} value={f.val} onChange={e=>f.set(e.target.value)}
                          onKeyDown={e=>e.key==='Enter'&&handleRegister()}
                          className="w-full bg-black border-2 border-zinc-800 focus:border-[#7c3aed] pl-11 pr-4 py-3.5 rounded-xl text-white outline-none transition"/>
                      </div>
                    </div>
                  ))}
                  <button onClick={handleRegister} disabled={authLoading}
                    className="w-full bg-[#7c3aed] py-4 rounded-xl font-black uppercase hover:bg-[#6d28d9] transition disabled:opacity-50 mt-2 flex items-center justify-center gap-3">
                    {authLoading?<><div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"/>Creating...</>:'Create Account'}
                  </button>
                </>)}

                {authMode === 'forgot' && (<>
                  <h3 className="text-2xl font-black uppercase mb-6 text-white">Reset Password</h3>
                  {forgotSent ? (
                    <div className="text-center py-8">
                      <CheckCircle size={56} className="text-green-400 mx-auto mb-4"/>
                      <p className="text-white font-black text-lg mb-2">Email Sent!</p>
                      <p className="text-zinc-400 text-sm">Check your inbox for the reset link.</p>
                      <button onClick={()=>{setAuthMode('login');setForgotSent(false);}} className="mt-6 text-[#7c3aed] font-bold text-sm underline">Back to Login</button>
                    </div>
                  ) : (<>
                    <label className="block text-xs font-bold text-zinc-400 uppercase mb-1.5">Email Address</label>
                    <div className="relative mb-6">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c3aed]"/>
                      <input type="email" placeholder="you@example.com" value={forgotEmail} onChange={e=>setForgotEmail(e.target.value)}
                        className="w-full bg-black border-2 border-zinc-800 focus:border-[#7c3aed] pl-11 pr-4 py-3.5 rounded-xl text-white outline-none transition"/>
                    </div>
                    <button onClick={handleForgotPassword} disabled={authLoading}
                      className="w-full bg-[#7c3aed] py-4 rounded-xl font-black uppercase hover:bg-[#6d28d9] transition disabled:opacity-50">
                      {authLoading?'Sending...':'Send Reset Link'}
                    </button>
                  </>)}
                </>)}
              </div>

              {/* Features card */}
              <div className="bg-zinc-950 border-2 border-[#7c3aed]/40 p-8 rounded-3xl flex flex-col justify-center">
                <Sparkles size={44} className="text-[#7c3aed] mb-5"/>
                <h3 className="text-2xl font-black text-white mb-5">Everything You Need</h3>
                <ul className="space-y-3">
                  {['600+ AI video & voice tools','Multi-track timeline editor','8K export quality','Professional audio mixer (4 channels)','40 AI enhancement tools','Community hub — share your movies','PWA — install on any device','Supports Veterans mental health 🇺🇸'].map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                      <CheckCircle size={16} className="text-[#7c3aed] flex-shrink-0 mt-0.5"/>{f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pricing */}
            <h2 className="text-4xl font-black text-center mb-10 uppercase text-white">Choose Your Plan</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {t:'Basic', p:'20', stripe:'https://buy.stripe.com/test_14k00SfE88Wn5K85kk', badge:'', f:['HD Export (1080p)','100 AI Tools','10 GB Storage','Email Support']},
                {t:'Pro',   p:'30', stripe:'https://buy.stripe.com/test_6oE00SfE8cit65G002', badge:'POPULAR', f:['4K Export (2160p)','300 AI Tools','100 GB Storage','Priority Support','Commercial License']},
                {t:'Studio',p:'50', stripe:'https://buy.stripe.com/test_dR68wwdvZ8Wn4E43cc', badge:'BEST VALUE', f:['8K Export (4320p)','600+ AI Tools','1 TB Storage','24/7 Support','Full Rights','API Access']},
              ].map(plan => (
                <div key={plan.t} className={`bg-zinc-950 border-2 rounded-3xl p-8 transition relative ${plan.badge?'border-[#7c3aed]':'border-zinc-800 hover:border-[#7c3aed]/60'}`}>
                  {plan.badge && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#7c3aed] text-white text-xs font-black px-4 py-1 rounded-full">{plan.badge}</div>}
                  <h3 className="text-2xl font-black uppercase mb-1 text-white">{plan.t}</h3>
                  <div className="text-5xl font-black text-[#7c3aed] mb-6">${plan.p}<span className="text-base text-zinc-500 font-normal">/mo</span></div>
                  <ul className="space-y-2.5 mb-8">
                    {plan.f.map(f => <li key={f} className="flex items-center gap-2 text-sm text-white"><CheckCircle size={14} className="text-[#7c3aed] flex-shrink-0"/>{f}</li>)}
                  </ul>
                  <a href={plan.stripe} target="_blank" rel="noopener noreferrer"
                    className="block w-full py-3.5 bg-[#7c3aed] text-center rounded-xl font-black uppercase text-sm hover:bg-[#6d28d9] transition">
                    SUBSCRIBE NOW
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── P4–P9: AI TOOL BOARDS ── */}
        {page >= 4 && page <= 9 && (() => {
          const boards = ['Writing','Voice','Image','Video','Motion','Image'];
          const boardName = boards[page - 4];
          const allTools = AI_TOOLS[boardName as keyof typeof AI_TOOLS] || [];
          const tools = toolSearch ? allTools.filter(t => t.toLowerCase().includes(toolSearch.toLowerCase())) : allTools;
          return (
            <div className="h-screen flex flex-col pt-20 pb-40 page-enter">
              <div className="text-center mb-2">
                <h2 className="text-4xl font-black uppercase text-[#7c3aed]">{boardName} AI TOOLS</h2>
                <p className="text-zinc-500 text-sm mt-1">{tools.length} tools {toolSearch && `matching "${toolSearch}"`}</p>
              </div>

              <div className="px-6 mt-4 mb-4">
                <div className="relative max-w-lg mx-auto">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c3aed]"/>
                  <input value={toolSearch} onChange={e=>setToolSearch(e.target.value)} placeholder="Search tools..."
                    className="w-full bg-zinc-900 border-2 border-[#7c3aed]/50 focus:border-[#7c3aed] pl-11 pr-10 py-3.5 rounded-xl text-white outline-none transition"/>
                  {toolSearch && <button onClick={()=>setToolSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"><X size={18}/></button>}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 scrollbar">
                {tools.length === 0 ? (
                  <div className="text-center py-16 text-zinc-600">
                    <Search size={48} className="mx-auto mb-4"/>
                    <p className="font-bold">No tools found for "{toolSearch}"</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 pb-8">
                    {tools.map((tool, i) => (
                      <button key={i} onClick={()=>setSelectedTool(tool)}
                        className="bg-black border-2 border-[#7c3aed]/40 hover:border-[#7c3aed] p-4 rounded-2xl hover:bg-[#7c3aed]/10 transition group text-left">
                        <Sparkles size={16} className="text-[#7c3aed] mb-2 group-hover:animate-spin"/>
                        <span className="text-xs font-bold uppercase text-white leading-tight block">{tool}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* ── AI TOOL MODAL ── */}
        {selectedTool && (
          <div className="fixed inset-0 bg-black/92 z-50 flex items-center justify-center p-6 page-enter">
            <div className="bg-zinc-950 border-2 border-[#7c3aed] rounded-3xl p-8 max-w-xl w-full shadow-2xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-black uppercase text-white">{selectedTool}</h2>
                  <p className="text-zinc-500 text-sm mt-1">Choose how to use this tool</p>
                </div>
                <button onClick={()=>{setSelectedTool(null);setAiPrompt('');}} className="text-zinc-500 hover:text-white transition"><X size={28}/></button>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  {icon:Upload, label:'UPLOAD', action:()=>fileInputRef.current?.click()},
                  {icon:Layers, label:'PASTE',  action:()=>setShowPasteOptions(true)},
                  {icon:Sparkles,label:'AI GEN', action:()=>{}},
                ].map(btn => (
                  <button key={btn.label} onClick={btn.action}
                    className="aspect-square bg-zinc-900 border-2 border-[#7c3aed]/50 hover:border-[#7c3aed] rounded-2xl flex flex-col items-center justify-center hover:bg-[#7c3aed]/15 transition gap-2">
                    <btn.icon size={32} className="text-[#7c3aed]"/>
                    <span className="font-black text-white text-xs">{btn.label}</span>
                  </button>
                ))}
              </div>

              <div className="bg-black border border-[#7c3aed]/30 rounded-2xl p-5 mb-4">
                <h3 className="font-black text-sm text-[#7c3aed] uppercase mb-3 flex items-center gap-2">
                  <Sparkles size={16}/> Describe Your Vision
                </h3>
                <textarea value={aiPrompt} onChange={e=>setAiPrompt(e.target.value)}
                  placeholder={`Describe what you want to generate with ${selectedTool}...`}
                  className="w-full bg-zinc-900 border border-[#7c3aed]/40 focus:border-[#7c3aed] p-3 rounded-xl text-white h-24 outline-none resize-none transition text-sm"/>
              </div>
              <button onClick={handleAIGenerate} disabled={!aiPrompt.trim()||generating}
                className="w-full bg-[#7c3aed] py-4 rounded-xl font-black uppercase hover:bg-[#6d28d9] transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3">
                {generating
                  ? <><div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"/>GENERATING...</>
                  : <><Zap size={20}/>GENERATE & SAVE TO LIBRARY</>}
              </button>
              <p className="text-center text-xs text-zinc-600 mt-3">Saved automatically to your Media Library</p>
            </div>
          </div>
        )}

        {/* ── PASTE MODAL ── */}
        {showPasteOptions && (
          <div className="fixed inset-0 bg-black/92 z-50 flex items-center justify-center p-6 page-enter">
            <div className="bg-zinc-950 border-2 border-[#7c3aed] rounded-3xl p-8 max-w-xl w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black uppercase text-white">PASTE CONTENT</h2>
                <button onClick={()=>{setShowPasteOptions(false);setPasteMode(null);}}><X size={28} className="text-zinc-500 hover:text-white transition"/></button>
              </div>
              {!pasteMode ? (
                <div className="space-y-3">
                  {[
                    {mode:'url' as const, icon:Globe, title:'PASTE URL', desc:'YouTube, Vimeo, or any direct video link'},
                    {mode:'text' as const, icon:BookOpen, title:'PASTE TEXT', desc:'Scripts, notes, lyrics, or any text content'},
                  ].map(opt => (
                    <button key={opt.mode} onClick={()=>setPasteMode(opt.mode)}
                      className="w-full bg-zinc-900 border-2 border-[#7c3aed]/40 hover:border-[#7c3aed] p-5 rounded-2xl hover:bg-[#7c3aed]/10 transition flex items-center gap-4 text-left">
                      <opt.icon size={40} className="text-[#7c3aed] flex-shrink-0"/>
                      <div><h3 className="text-lg font-black text-white">{opt.title}</h3><p className="text-sm text-zinc-400 mt-0.5">{opt.desc}</p></div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <textarea id="pasteInput"
                    placeholder={pasteMode==='url'?'Paste video URLs here (one per line)...':'Paste your text, script, or notes here...'}
                    className="w-full bg-zinc-900 border-2 border-[#7c3aed]/40 focus:border-[#7c3aed] p-4 rounded-xl text-white h-36 outline-none resize-none transition"/>
                  <div className="flex gap-3">
                    <button onClick={()=>setPasteMode(null)} className="flex-1 bg-zinc-800 py-3.5 rounded-xl font-black uppercase hover:bg-zinc-700 transition text-sm">BACK</button>
                    <button onClick={async()=>{
                      const ta = document.getElementById('pasteInput') as HTMLTextAreaElement;
                      let text = ta?.value||'';
                      if(!text.trim()){try{text=await navigator.clipboard.readText();if(ta)ta.value=text;}catch{}}
                      if(text.trim()){
                        if(pasteMode==='url'){
                          text.split('\n').filter(l=>l.trim().startsWith('http')).forEach((url,i)=>{
                            setMediaLibrary(prev=>[...prev,{id:Date.now()+i,name:`url-${Date.now()}.mp4`,type:'video',size:'Remote',url:url.trim(),timestamp:new Date().toISOString()}]);
                          });
                          notify('URL(s) added to library ✓');
                        } else {
                          setMediaLibrary(prev=>[...prev,{id:Date.now(),name:`text-${Date.now()}.txt`,type:'text',size:`${(text.length/1024).toFixed(1)} KB`,url:`data:text/plain;charset=utf-8,${encodeURIComponent(text)}`,timestamp:new Date().toISOString()}]);
                          notify('Text content added to library ✓');
                        }
                        setShowPasteOptions(false);setPasteMode(null);setSelectedTool(null);
                      }
                    }} className="flex-1 bg-[#7c3aed] py-3.5 rounded-xl font-black uppercase hover:bg-[#6d28d9] transition text-sm">
                      IMPORT
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── P10: UPLOAD MEDIA ── */}
        {page === 10 && (
          <div className="h-screen flex items-center justify-center p-8 page-enter">
            <div className="text-center max-w-2xl w-full">
              <h1 className="text-5xl font-black uppercase text-[#7c3aed] mb-8">UPLOAD MEDIA</h1>
              <div
                onClick={()=>fileInputRef.current?.click()}
                onDragOver={e=>e.preventDefault()}
                onDrop={e=>{e.preventDefault();if(e.dataTransfer.files.length) processFiles(e.dataTransfer.files);}}
                className="aspect-video bg-zinc-950 rounded-3xl border-4 border-dashed border-[#7c3aed]/60 hover:border-[#7c3aed] mb-6 flex flex-col items-center justify-center cursor-pointer hover:bg-[#7c3aed]/5 transition"
              >
                <Upload size={80} className="text-[#7c3aed] mb-4"/>
                <p className="text-xl font-black text-white">Click or Drag & Drop</p>
                <p className="text-zinc-500 text-sm mt-2">Videos • Audio • Images</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[{icon:FileVideo,label:'Videos',ext:'MP4 MOV AVI MKV'},{icon:Music,label:'Audio',ext:'MP3 WAV AAC FLAC'},{icon:Eye,label:'Images',ext:'JPG PNG GIF WebP'}].map(({icon:I,label,ext})=>(
                  <div key={label} className="bg-zinc-950 border border-[#7c3aed]/30 p-4 rounded-xl">
                    <I size={28} className="text-[#7c3aed] mb-2"/>
                    <p className="text-sm font-black text-white">{label}</p>
                    <p className="text-xs text-zinc-600 mt-1">{ext}</p>
                  </div>
                ))}
              </div>
              {mediaLibrary.length > 0 && (
                <div className="mt-6 bg-zinc-950 border border-[#7c3aed]/30 rounded-2xl p-4">
                  <p className="text-[#7c3aed] font-black text-sm">{mediaLibrary.length} asset{mediaLibrary.length>1?'s':''} in library</p>
                  <button onClick={()=>setPage(12)} className="text-xs text-zinc-400 underline mt-1">View in Timeline →</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── P11: EDITOR SUITE ── */}
        {page === 11 && (
          <div className="min-h-screen p-8 pt-20 pb-40 page-enter">
            <h1 className="text-5xl font-black uppercase text-[#7c3aed] mb-10 text-center">EDITOR SUITE</h1>

            {/* Duration card - ENHANCED */}
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] rounded-3xl p-10 mb-10 border-4 border-[#a78bfa] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"/>
              <div className="flex items-center gap-4 mb-6">
                <Clock size={44} className="text-white"/>
                <div>
                  <h3 className="text-3xl font-black text-white">MOVIE DURATION</h3>
                  <p className="text-white/70 text-sm">Set the target length for your movie</p>
                </div>
                <button onClick={()=>setShowDurationTip(!showDurationTip)} className="ml-auto text-white/60 hover:text-white transition">
                  <Info size={20}/>
                </button>
              </div>

              {showDurationTip && (
                <div className="bg-white/10 rounded-2xl p-4 mb-6 text-sm text-white/90">
                  💡 Set your target duration before rendering. Longer movies need more clips in the timeline. 3-hour movies support multiple scenes, chapters, and acts.
                </div>
              )}

              <div className="text-center mb-6">
                <div className="text-7xl font-black text-white tabular-nums">{duration}</div>
                <div className="text-xl font-black text-white/70 uppercase mt-1">
                  MINUTES &nbsp;•&nbsp; {duration >= 60 ? `${Math.floor(duration/60)}h ${duration%60>0?`${duration%60}m`:''}` : `${duration}m`}
                </div>
              </div>

              <input type="range" min="1" max="180" value={duration} onChange={e=>setDuration(Number(e.target.value))}
                className="w-full mb-4" style={{accentColor:'white'}}/>
              <div className="flex justify-between text-xs text-white/50 mb-8">
                <span>1 min</span><span>90 min</span><span>3 hrs</span>
              </div>

              {/* Duration presets */}
              <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                {DURATION_PRESETS.map(p => (
                  <button key={p.mins} onClick={()=>setDuration(p.mins)}
                    className={`py-3 px-1 rounded-xl font-black text-xs transition flex flex-col items-center gap-1 ${duration===p.mins?'bg-white text-[#7c3aed]':'bg-white/15 text-white hover:bg-white/25'}`}>
                    <span className="font-black">{p.label}</span>
                    <span className="text-xs opacity-70">{p.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick access cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {icon:Database, label:'Media Library', sub:`${mediaLibrary.length} assets`, page:12, color:'from-[#7c3aed]/20'},
                {icon:Wand2,    label:'Enhancements',  sub:`${ENHANCEMENT_TOOLS.length} tools`, page:13, color:'from-purple-900/20'},
                {icon:Sliders,  label:'Audio Mixer',   sub:'4 channels', page:14, color:'from-violet-900/20'},
              ].map(({icon:I,label,sub,page:p,color})=>(
                <button key={label} onClick={()=>setPage(p)}
                  className={`bg-gradient-to-br ${color} to-transparent border-2 border-[#7c3aed]/40 hover:border-[#7c3aed] p-8 rounded-3xl hover:bg-[#7c3aed]/10 transition text-left`}>
                  <I size={44} className="text-[#7c3aed] mb-4"/>
                  <h3 className="text-xl font-black uppercase text-white mb-1">{label}</h3>
                  <p className="text-sm text-zinc-400">{sub}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── P12: TIMELINE & LIBRARY ── */}
        {page === 12 && (
          <div className="h-screen flex overflow-hidden page-enter">
            {/* Library */}
            <div className="w-80 bg-zinc-950 border-r-4 border-[#7c3aed] flex flex-col">
              <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                <h3 className="font-black text-white flex items-center gap-2 text-sm uppercase"><Database size={18} className="text-[#7c3aed]"/>Library ({mediaLibrary.length})</h3>
                <button onClick={()=>fileInputRef.current?.click()} className="bg-[#7c3aed] p-1.5 rounded-lg hover:bg-[#6d28d9] transition"><Plus size={16}/></button>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar p-3 space-y-2">
                {mediaLibrary.length === 0 ? (
                  <div className="text-center py-10">
                    <Upload size={36} className="text-zinc-700 mx-auto mb-3"/>
                    <p className="text-zinc-500 text-xs font-bold">No assets yet</p>
                    <button onClick={()=>setPage(10)} className="text-[#7c3aed] text-xs mt-2 underline">Upload Media</button>
                  </div>
                ) : mediaLibrary.map(asset => (
                  <div key={asset.id} draggable onDragStart={()=>setDraggedItem(asset)} onDragEnd={()=>setDraggedItem(null)}
                    className="bg-zinc-900 border border-[#7c3aed]/40 hover:border-[#7c3aed] p-3 rounded-xl cursor-move group transition">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{asset.name}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{asset.type} • {asset.size}</p>
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {asset.aiGenerated && <span className="text-xs bg-[#7c3aed]/30 text-[#a78bfa] px-1.5 py-0.5 rounded font-bold">AI</span>}
                          {asset.enhanced    && <span className="text-xs bg-[#7c3aed]/30 text-[#a78bfa] px-1.5 py-0.5 rounded font-bold">FX</span>}
                          {asset.rendered    && <span className="text-xs bg-green-900/40 text-green-400 px-1.5 py-0.5 rounded font-bold">RENDER</span>}
                        </div>
                      </div>
                      <button onClick={()=>deleteFromLibrary(asset.id)} className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition ml-1 flex-shrink-0">
                        <Trash2 size={14}/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main area */}
            <div className="flex-1 flex flex-col">
              {/* Preview */}
              <div className="flex-1 bg-black flex items-center justify-center">
                {currentVideo ? (
                  <div className="text-center">
                    <div className="w-80 h-80 rounded-full bg-[#7c3aed]/20 flex items-center justify-center mb-4 border-4 border-[#7c3aed]/30">
                      <Play size={100} className="text-[#7c3aed]"/>
                    </div>
                    <p className="text-white font-black">{currentVideo.name}</p>
                    <p className="text-zinc-500 text-sm mt-1">{currentVideo.quality} • {currentVideo.size}</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Film size={64} className="text-zinc-800 mx-auto mb-4"/>
                    <p className="text-zinc-600 font-bold">Drag assets to timeline tracks below</p>
                  </div>
                )}
              </div>

              {/* Timeline */}
              <div className="bg-zinc-950 border-t-4 border-[#7c3aed] p-5 pb-20">
                <h3 className="font-black uppercase text-[#7c3aed] text-lg mb-4">MULTI-TRACK TIMELINE — {duration} min target</h3>
                <div className="space-y-2">
                  {([
                    {key:'video' as const, label:'VIDEO', icon:FileVideo},
                    {key:'audio' as const, label:'AUDIO', icon:Music},
                    {key:'text'  as const, label:'TEXT',  icon:Layers},
                  ]).map(track => (
                    <div key={track.key}
                      onDragOver={e=>e.preventDefault()}
                      onDrop={()=>handleDrop(track.key)}
                      className="bg-black border-2 border-[#7c3aed]/30 hover:border-[#7c3aed] rounded-xl min-h-[64px] p-3 transition"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <track.icon size={14} className="text-[#7c3aed]"/>
                        <span className="text-xs font-black text-white uppercase">{track.label} TRACK</span>
                        <span className="text-xs text-zinc-600 ml-auto">{timeline[track.key].length} clips</span>
                      </div>
                      {timeline[track.key].length > 0 && (
                        <div className="flex gap-1.5 overflow-x-auto scrollbar pb-1">
                          {timeline[track.key].map((item, idx) => (
                            <div key={idx} className="bg-[#7c3aed] px-2.5 py-1.5 rounded text-xs font-bold whitespace-nowrap flex items-center gap-1.5 flex-shrink-0">
                              {item.name.substring(0,10)}... <button onClick={()=>removeFromTimeline(track.key,idx)} className="hover:text-red-400"><X size={10}/></button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-zinc-700 mt-3 text-center">← Drag assets from library to add to tracks</p>
              </div>
            </div>
          </div>
        )}

        {/* ── P13: ENHANCEMENT STUDIO ── */}
        {page === 13 && (
          <div className="min-h-screen p-6 pt-20 pb-40 page-enter">
            <h1 className="text-4xl font-black uppercase text-[#7c3aed] mb-2 text-center">ENHANCEMENT STUDIO</h1>
            <p className="text-center text-zinc-400 mb-10">40 Professional AI-Powered Enhancement Tools</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-7xl mx-auto">
              {ENHANCEMENT_TOOLS.map(tool => (
                <button key={tool} onClick={()=>setSelectedEnhancement(tool)}
                  className="bg-black border border-[#7c3aed]/30 hover:border-[#7c3aed] p-4 rounded-2xl hover:bg-[#7c3aed]/10 transition group text-left">
                  <Wand2 size={22} className="text-[#7c3aed] mb-2 group-hover:rotate-12 transition-transform"/>
                  <h3 className="text-xs font-bold uppercase text-white leading-tight">{tool}</h3>
                </button>
              ))}
            </div>

            {selectedEnhancement && (
              <div className="fixed inset-0 z-50 bg-black/95 flex flex-col p-8 page-enter">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-3xl font-black text-[#7c3aed] uppercase">{selectedEnhancement}</h3>
                    <p className="text-zinc-400 text-sm mt-1">Adjust settings and apply to your video</p>
                  </div>
                  <button onClick={()=>setSelectedEnhancement(null)}><X size={36} className="text-zinc-500 hover:text-white transition"/></button>
                </div>
                <div className="flex-1 flex gap-8">
                  <div className="flex-1 bg-zinc-900 border-4 border-[#7c3aed] rounded-3xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-48 h-48 rounded-full bg-[#7c3aed]/20 flex items-center justify-center mb-4 mx-auto">
                        <Sparkles size={80} className="text-[#7c3aed] animate-pulse"/>
                      </div>
                      <p className="text-white font-black text-xl">LIVE PREVIEW</p>
                      <p className="text-zinc-500 text-sm mt-1">Intensity: {enhSettings.intensity}%</p>
                    </div>
                  </div>
                  <div className="w-80 bg-zinc-950 border-2 border-[#7c3aed] rounded-3xl p-6 space-y-5">
                    {Object.entries(enhSettings).map(([key, val]) => (
                      <div key={key}>
                        <div className="flex justify-between text-sm font-black uppercase text-white mb-2">
                          <span>{key}</span><span className="text-[#7c3aed]">{val}%</span>
                        </div>
                        <input type="range" min="0" max="100" value={val}
                          onChange={e=>setEnhSettings(prev=>({...prev,[key]:Number(e.target.value)}))}
                          style={{accentColor:'#7c3aed'}}/>
                      </div>
                    ))}
                    <button onClick={()=>setEnhSettings({intensity:75,clarity:75,color:75,brightness:75})}
                      className="w-full py-2.5 bg-zinc-800 text-white rounded-xl font-bold text-sm hover:bg-zinc-700 transition mt-2">
                      RESET DEFAULTS
                    </button>
                  </div>
                </div>
                <div className="mt-8 flex gap-4 justify-center">
                  <button onClick={()=>setSelectedEnhancement(null)} className="px-12 py-4 bg-zinc-800 text-white rounded-xl font-black uppercase hover:bg-zinc-700 transition">CANCEL</button>
                  <button onClick={applyEnhancement} className="px-12 py-4 bg-[#7c3aed] text-white rounded-xl font-black uppercase hover:bg-[#6d28d9] transition flex items-center gap-3">
                    <CheckCircle size={22}/>APPLY & SAVE TO LIBRARY
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── P14: AUDIO MIXER ── */}
        {page === 14 && (
          <div className="min-h-screen p-8 pt-20 pb-40 page-enter">
            <h1 className="text-4xl font-black uppercase mb-2 text-white text-center">PROFESSIONAL AUDIO MIXER</h1>
            <p className="text-center text-zinc-400 mb-10">4-Channel Mixer with Visual Level Meters</p>
            <div className="grid grid-cols-4 gap-5 max-w-5xl mx-auto">
              {([
                {key:'music' as const, label:'MUSIC',  icon:Music},
                {key:'voice' as const, label:'VOICE',  icon:Mic},
                {key:'sfx'   as const, label:'SFX',    icon:Zap},
                {key:'master'as const, label:'MASTER', icon:Sliders, master:true},
              ]).map(ch => (
                <div key={ch.key} className={`bg-zinc-950 border-4 rounded-3xl p-5 flex flex-col items-center ${ch.master?'border-[#7c3aed]':'border-zinc-800'}`}>
                  <ch.icon size={32} className="text-[#7c3aed] mb-2"/>
                  <div className="font-black text-sm mb-5 text-white tracking-widest">{ch.label}</div>

                  {/* Level meter */}
                  <div className="relative h-60 w-20 bg-zinc-900 rounded-2xl mb-4 overflow-hidden border-2 border-zinc-800">
                    {/* Grid lines */}
                    {[25,50,75].map(l => (
                      <div key={l} className="absolute w-full border-t border-zinc-700 opacity-30" style={{bottom:`${l}%`}}/>
                    ))}
                    <div className="absolute bottom-0 w-full rounded-2xl bg-gradient-to-t from-[#7c3aed] to-[#a78bfa] transition-all duration-100"
                      style={{height:`${audioLevels[ch.key]}%`}}/>
                    {/* Clip indicator */}
                    {audioLevels[ch.key] > 90 && <div className="absolute top-0 w-full h-3 bg-red-500 rounded-t-2xl animate-pulse"/>}
                  </div>

                  <input type="range" min="0" max="100" value={audioLevels[ch.key]}
                    onChange={e=>setAudioLevels(prev=>({...prev,[ch.key]:Number(e.target.value)}))}
                    style={{accentColor:'#7c3aed'}} className="w-full mb-3"/>
                  <div className={`text-2xl font-black ${audioLevels[ch.key]>90?'text-red-400':audioLevels[ch.key]>70?'text-[#7c3aed]':'text-zinc-400'}`}>
                    {audioLevels[ch.key]}%
                  </div>
                  {audioLevels[ch.key] > 90 && <div className="text-red-400 text-xs font-bold mt-1">CLIP!</div>}
                </div>
              ))}
            </div>
            <div className="max-w-5xl mx-auto mt-8 flex gap-4 justify-center">
              <button onClick={()=>setAudioLevels({music:75,voice:50,sfx:65,master:80})}
                className="px-10 py-3.5 bg-zinc-800 text-white rounded-xl font-black uppercase hover:bg-zinc-700 transition flex items-center gap-2">
                <RotateCcw size={16}/>RESET
              </button>
              <button onClick={()=>notify('Audio preset saved ✓')}
                className="px-10 py-3.5 bg-[#7c3aed] text-white rounded-xl font-black uppercase hover:bg-[#6d28d9] transition flex items-center gap-2">
                <Save size={16}/>SAVE PRESET
              </button>
            </div>
          </div>
        )}

        {/* ── P15: PREVIEW ── */}
        {page === 15 && (
          <div className="h-screen flex items-center justify-center p-8 page-enter">
            <div className="text-center max-w-5xl w-full">
              <h1 className="text-5xl font-black text-[#7c3aed] mb-8 uppercase">FINAL PREVIEW</h1>
              <div className="aspect-video bg-zinc-950 rounded-3xl border-4 border-[#7c3aed] mb-8 flex items-center justify-center relative overflow-hidden">
                {currentVideo ? (
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-[#7c3aed]/20 flex items-center justify-center mb-4 mx-auto">
                      <Play size={72} className="text-[#7c3aed]"/>
                    </div>
                    <p className="text-white font-black text-xl">{currentVideo.name}</p>
                    <p className="text-zinc-500 text-sm mt-1">{duration} min • {exportSettings.quality} • {exportSettings.format}</p>
                    <div className="flex gap-3 justify-center mt-4">
                      <span className="bg-[#7c3aed]/20 text-[#a78bfa] px-3 py-1 rounded-full text-xs font-bold">{exportSettings.quality}</span>
                      <span className="bg-[#7c3aed]/20 text-[#a78bfa] px-3 py-1 rounded-full text-xs font-bold">{exportSettings.format}</span>
                      <span className="bg-[#7c3aed]/20 text-[#a78bfa] px-3 py-1 rounded-full text-xs font-bold">{duration} MIN</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Eye size={80} className="text-zinc-700 mb-4 mx-auto"/>
                    <p className="text-zinc-500 font-bold text-xl">No video to preview yet</p>
                    <p className="text-zinc-700 text-sm mt-2">Add clips to the timeline first</p>
                    <button onClick={()=>setPage(12)} className="text-[#7c3aed] text-sm mt-4 underline">Go to Timeline →</button>
                  </div>
                )}
              </div>
              <div className="flex gap-4 justify-center">
                <button className="bg-zinc-800 px-10 py-4 rounded-xl font-black uppercase flex items-center gap-3 hover:bg-zinc-700 transition">
                  <Play size={20}/>PLAY
                </button>
                <button onClick={handleRender} className="bg-[#7c3aed] px-10 py-4 rounded-xl font-black uppercase flex items-center gap-3 hover:bg-[#6d28d9] transition shadow-lg shadow-[#7c3aed]/30">
                  <Zap size={20}/>START RENDER
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── RENDERING OVERLAY ── */}
        {rendering && (
          <div className="fixed inset-0 z-50 bg-black/97 flex items-center justify-center">
            <div className="text-center max-w-xl w-full px-8">
              <div className="relative w-56 h-56 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full border-8 border-[#7c3aed]/20"/>
                <div className="absolute inset-0 rounded-full border-8 border-[#7c3aed] border-t-transparent animate-spin"/>
                <div className="absolute inset-4 rounded-full border-4 border-[#a78bfa]/30 border-b-transparent animate-spin" style={{animationDirection:'reverse',animationDuration:'1.5s'}}/>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles size={72} className="text-[#7c3aed]"/>
                </div>
              </div>
              <h2 className="text-5xl font-black text-white mb-6">RENDERING</h2>
              <div className="w-full bg-zinc-800 h-5 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] transition-all duration-200 rounded-full"
                  style={{width:`${renderProgress}%`}}/>
              </div>
              <p className="text-3xl font-black text-[#7c3aed] mb-2">{Math.round(renderProgress)}%</p>
              <p className="text-zinc-500 text-sm">Processing {duration} min • {exportSettings.quality} {exportSettings.format}</p>
            </div>
          </div>
        )}

        {/* ── P16: EXPORT ── */}
        {page === 16 && (
          <div className="min-h-screen flex items-center justify-center p-8 page-enter">
            <div className="max-w-4xl w-full bg-zinc-950 border-4 border-[#7c3aed] rounded-3xl p-10">
              <h1 className="text-4xl font-black text-[#7c3aed] mb-10 text-center uppercase">EXPORT YOUR MOVIE</h1>

              {currentVideo ? (
                <div className="bg-black border-2 border-[#7c3aed]/40 rounded-2xl p-5 mb-8 flex items-center gap-4">
                  <div className="bg-[#7c3aed]/20 p-3 rounded-xl"><FileVideo size={40} className="text-[#7c3aed]"/></div>
                  <div>
                    <p className="font-black text-white">{currentVideo.name}</p>
                    <p className="text-sm text-zinc-400 mt-1">{currentVideo.size} • {duration} min • {exportSettings.quality}</p>
                  </div>
                  <div className="ml-auto bg-green-500/20 border border-green-500 text-green-400 px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5">
                    <Check size={12}/> READY
                  </div>
                </div>
              ) : (
                <div className="bg-zinc-900 border-2 border-dashed border-zinc-700 rounded-2xl p-6 mb-8 text-center">
                  <AlertTriangle size={32} className="text-yellow-500 mx-auto mb-2"/>
                  <p className="text-zinc-400 font-bold">No rendered video yet</p>
                  <button onClick={()=>setPage(15)} className="text-[#7c3aed] text-sm mt-2 underline">Go to Preview & Render →</button>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-5 mb-8">
                {[
                  {label:'Export Quality', key:'quality', opts:[{v:'8K',l:'8K (4320p) — Studio'},{v:'4K',l:'4K (2160p) — Pro'},{v:'HD',l:'HD (1080p) — Basic'},{v:'SD',l:'SD (720p) — Web'}]},
                  {label:'File Format',    key:'format',  opts:[{v:'MP4',l:'MP4 — Universal'},{v:'MOV',l:'MOV — Apple'},{v:'AVI',l:'AVI — Windows'},{v:'WebM',l:'WebM — Web'}]},
                ].map(sel => (
                  <div key={sel.key} className="bg-black border border-[#7c3aed]/30 p-5 rounded-2xl">
                    <h3 className="font-black text-white mb-3 text-sm uppercase">{sel.label}</h3>
                    <select value={exportSettings[sel.key as keyof typeof exportSettings]}
                      onChange={e=>setExportSettings(prev=>({...prev,[sel.key]:e.target.value}))}
                      className="w-full bg-zinc-900 border border-[#7c3aed]/40 p-3 rounded-lg text-white outline-none focus:border-[#7c3aed] transition">
                      {sel.opts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                    </select>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <button onClick={()=>currentVideo&&handleDownload(currentVideo)} disabled={!currentVideo}
                  className="bg-[#7c3aed] py-5 rounded-xl font-black uppercase text-lg hover:bg-[#6d28d9] transition disabled:opacity-40 flex items-center justify-center gap-3 shadow-lg shadow-[#7c3aed]/20">
                  <Download size={22}/>DOWNLOAD
                </button>
                <button disabled={!currentVideo} onClick={()=>notify('Saving to cloud...','info')}
                  className="bg-[#7c3aed] py-5 rounded-xl font-black uppercase text-lg hover:bg-[#6d28d9] transition disabled:opacity-40 flex items-center justify-center gap-3">
                  <Save size={22}/>SAVE TO CLOUD
                </button>
              </div>

              <h3 className="text-lg font-black mb-5 text-white text-center uppercase">Share to Social Media</h3>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  {label:'📺 YouTube',   bg:'bg-red-600 hover:bg-red-700'},
                  {label:'📘 Facebook',  bg:'bg-blue-600 hover:bg-blue-700'},
                  {label:'📸 Instagram', bg:'bg-gradient-to-r from-purple-600 to-pink-600'},
                  {label:'𝕏 Twitter',   bg:'bg-zinc-900 border border-white hover:bg-zinc-800'},
                  {label:'🎵 TikTok',    bg:'bg-pink-700 hover:bg-pink-800'},
                  {label:'🎬 Vimeo',     bg:'bg-sky-600 hover:bg-sky-700'},
                ].map(({label,bg})=>(
                  <button key={label} disabled={!currentVideo} onClick={()=>notify(`Opening ${label}...`,'info')}
                    className={`${bg} py-3.5 rounded-xl font-bold text-sm transition disabled:opacity-40`}>{label}</button>
                ))}
              </div>

              <button onClick={()=>setPage(20)} disabled={!currentVideo}
                className="w-full bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] py-5 rounded-xl font-black uppercase text-lg hover:opacity-90 transition disabled:opacity-40 flex items-center justify-center gap-3">
                <Share2 size={22}/>SHARE TO COMMUNITY HUB
              </button>
            </div>
          </div>
        )}

        {/* ── P17: TUTORIALS ── */}
        {page === 17 && (
          <div className="min-h-screen p-8 pt-20 pb-40 page-enter">
            <h1 className="text-4xl font-black uppercase mb-10 text-white text-center">TUTORIALS & LEARNING</h1>
            <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
              <div className="bg-black rounded-3xl border-4 border-[#7c3aed] aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="w-40 h-40 rounded-full bg-[#7c3aed]/20 flex items-center justify-center mx-auto mb-4">
                    <Play size={72} className="text-[#7c3aed]"/>
                  </div>
                  <p className="text-white font-black text-lg">Getting Started</p>
                  <p className="text-zinc-500 text-sm mt-1">Click a tutorial to play</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  {title:'Getting Started with MandaStrong', time:'5:30', level:'Beginner',    emoji:'🚀'},
                  {title:'Multi-Track Timeline Editing',      time:'12:45',level:'Intermediate', emoji:'🎬'},
                  {title:'Professional Color Grading',        time:'18:20',level:'Advanced',     emoji:'🎨'},
                  {title:'Audio Mixing Masterclass',          time:'15:10',level:'Intermediate', emoji:'🎚'},
                  {title:'Enhancement Studio Deep Dive',      time:'22:00',level:'Advanced',     emoji:'✨'},
                  {title:'Export & Optimization Guide',       time:'8:15', level:'Beginner',     emoji:'📤'},
                ].map((t,i) => (
                  <button key={i} className="w-full bg-zinc-950 border-2 border-[#7c3aed]/30 hover:border-[#7c3aed] p-5 rounded-2xl hover:bg-[#7c3aed]/10 transition text-left">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{t.emoji}</span>
                      <div className="flex-1">
                        <p className="font-black text-white text-sm">{t.title}</p>
                        <div className="flex gap-3 mt-1 text-xs text-zinc-500">
                          <span>⏱ {t.time}</span>
                          <span className={`px-2 py-0.5 rounded font-bold ${t.level==='Beginner'?'bg-green-900/40 text-green-400':t.level==='Intermediate'?'bg-yellow-900/40 text-yellow-400':'bg-red-900/40 text-red-400'}`}>{t.level}</span>
                        </div>
                      </div>
                      <Play size={20} className="text-[#7c3aed] flex-shrink-0"/>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── P18: TERMS ── */}
        {page === 18 && (
          <div className="min-h-screen p-8 pt-20 pb-40 max-w-5xl mx-auto page-enter">
            <h1 className="text-4xl font-black uppercase mb-10 text-white">TERMS OF SERVICE & DISCLAIMER</h1>
            <div className="bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] rounded-3xl p-10 text-center mb-10">
              <Shield size={64} className="mx-auto mb-4"/>
              <h2 className="text-2xl font-black mb-2">Legal Agreement</h2>
              <p className="text-white/80">Please read carefully before using MandaStrong Studio</p>
            </div>
            {[
              {title:'TERMS OF SERVICE', items:[
                ['1. Acceptance','By using MandaStrong Studio, you agree to be bound by these Terms.'],
                ['2. License','Non-exclusive, non-transferable license for personal or commercial video creation.'],
                ['3. Your Content','You retain full ownership of all content you create.'],
                ['4. Prohibited Uses','No illegal content, IP infringement, hacking, spam, or harmful activities.'],
                ['5. Payments','Processed via Stripe. Subscriptions are non-refundable once billed.'],
                ['6. Community','Be respectful. Harassment or hate speech results in immediate termination.'],
                ['7. Charitable Mission','100% of Etsy store proceeds benefit Veterans Mental Health Services.'],
              ]},
              {title:'DISCLAIMER & LIABILITY', items:[
                ['No Warranty','Provided "AS IS" without warranties of any kind.'],
                ['Availability','We do not guarantee uninterrupted or error-free service.'],
                ['AI Content','AI-generated content is for creative purposes only.'],
                ['Limitation','To the maximum extent permitted by law, we are not liable for indirect damages.'],
                ['DMCA','We respect intellectual property rights. Contact us with any DMCA notices.'],
              ]},
            ].map(section => (
              <div key={section.title} className="bg-zinc-950 border-2 border-[#7c3aed]/30 rounded-3xl p-8 mb-6">
                <h3 className="text-xl font-black text-white mb-5">{section.title}</h3>
                <div className="space-y-3 max-h-80 overflow-y-auto scrollbar pr-2">
                  {section.items.map(([title,text]) => (
                    <p key={title} className="text-zinc-300 text-sm leading-relaxed">
                      <strong className="text-[#7c3aed]">{title}: </strong>{text}
                    </p>
                  ))}
                  <p className="text-xs text-zinc-600 italic mt-4">Last Updated: February 24, 2026</p>
                </div>
              </div>
            ))}
            <div className="flex gap-4">
              <button onClick={()=>setPage(page-1)} className="flex-1 bg-zinc-800 py-5 rounded-2xl font-black uppercase hover:bg-zinc-700 transition">DECLINE</button>
              <button onClick={()=>{setPage(19);notify('Terms accepted ✓');}} className="flex-1 bg-[#7c3aed] py-5 rounded-2xl font-black uppercase hover:bg-[#6d28d9] transition">ACCEPT & CONTINUE</button>
            </div>
          </div>
        )}

        {/* ── P19: AGENT GROK ── */}
        {page === 19 && (
          <div className="min-h-screen p-8 pt-20 pb-40 page-enter">
            <h1 className="text-4xl font-black uppercase mb-10 flex items-center gap-4 text-white">
              <MessageCircle size={44} className="text-[#7c3aed]"/>AGENT GROK — 24/7 HELP
            </h1>
            <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">
              <div>
                <div className="bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] rounded-3xl p-7 mb-6 border-4 border-[#a78bfa]">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl font-black flex-shrink-0">G</div>
                    <div>
                      <h3 className="text-xl font-black text-white">Agent Grok</h3>
                      <p className="text-white/70 text-sm">● Online & Ready to Help</p>
                    </div>
                    <div className="ml-auto bg-yellow-500 text-black px-3 py-1.5 rounded-full text-xs font-black">⚡ INSTANT</div>
                  </div>
                </div>

                <div className="bg-zinc-950 border-2 border-[#7c3aed]/30 rounded-3xl p-6 mb-5">
                  <div className="bg-white text-black p-5 rounded-2xl rounded-tl-none">
                    <p className="font-bold">Hello! I'm Agent Grok. I can help with uploads, AI generation, timeline editing, enhancements, audio mixing, rendering, and exports. What do you need? 🎬</p>
                  </div>
                </div>

                <div className="bg-zinc-950 border-2 border-[#7c3aed]/30 rounded-3xl p-5">
                  <input type="text" placeholder="Ask anything about MandaStrong Studio..."
                    className="w-full bg-black border border-[#7c3aed]/40 focus:border-[#7c3aed] p-3.5 rounded-xl text-white outline-none transition mb-3"/>
                  <button onClick={()=>notify('Message sent to Agent Grok ✓')}
                    className="w-full bg-[#7c3aed] py-3.5 rounded-xl font-black uppercase hover:bg-[#6d28d9] transition">
                    SEND MESSAGE
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-black mb-4 text-white flex items-center gap-2"><HelpCircle size={22} className="text-[#7c3aed]"/>Common Questions</h3>
                <div className="space-y-2 mb-8">
                  {['How do I upload files?','How does AI generation work?','How do I add clips to the timeline?','What enhancement tools are available?','How do I adjust audio levels?','What export qualities are available?','How do I download my final video?','Can I share my movie to Community?'].map(q => (
                    <button key={q} onClick={()=>notify('Question sent to Agent Grok','info')}
                      className="w-full bg-zinc-950 border border-zinc-800 hover:border-[#7c3aed] p-3.5 rounded-xl text-left text-sm font-bold text-white hover:bg-[#7c3aed]/10 transition">
                      {q}
                    </button>
                  ))}
                </div>

                <div className="bg-[#7c3aed]/10 border-2 border-[#7c3aed]/30 rounded-3xl p-6">
                  <h3 className="font-black text-white mb-4">System Status</h3>
                  <div className="space-y-2">
                    {['File Upload','AI Generation','Timeline Editor','Enhancement Tools','Audio Mixer','Render Engine','Community Hub'].map(s => (
                      <div key={s} className="flex justify-between items-center bg-black/40 px-4 py-3 rounded-xl">
                        <span className="text-sm font-bold text-white">{s}</span>
                        <span className="text-xs text-green-400 font-bold flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-green-400 rounded-full"/>Operational</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── P20: COMMUNITY HUB ── */}
        {page === 20 && (
          <div className="min-h-screen p-8 pt-20 pb-40 page-enter">
            {isGuest && (
              <div className="bg-amber-600/20 border-2 border-amber-500 rounded-2xl p-5 mb-8 max-w-4xl mx-auto flex items-center gap-4">
                <Eye size={36} className="text-amber-400 flex-shrink-0"/>
                <div className="flex-1">
                  <h3 className="font-black text-amber-300 mb-1">BROWSING AS GUEST — VIEW ONLY</h3>
                  <p className="text-amber-200/80 text-sm">Sign up free to like, comment, and share your own movies!</p>
                </div>
                <button onClick={()=>{setIsGuest(false);setPage(3);}}
                  className="bg-amber-500 text-black px-5 py-2 rounded-xl font-black uppercase text-sm hover:bg-amber-400 transition flex-shrink-0">
                  Sign Up
                </button>
              </div>
            )}

            <div className="flex flex-wrap justify-between items-center mb-10 gap-4">
              <div>
                <h1 className="text-4xl font-black uppercase text-white">COMMUNITY HUB</h1>
                <p className="text-zinc-500 text-sm mt-1">{communityPosts.length} movies shared by creators</p>
              </div>
              {!isGuest && (
                <button onClick={()=>fileInputRef.current?.click()}
                  className="bg-[#7c3aed] px-7 py-3.5 rounded-xl font-black uppercase flex items-center gap-3 hover:bg-[#6d28d9] transition text-sm">
                  <Upload size={20}/>UPLOAD YOUR MOVIE
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-5 max-w-7xl mx-auto">
              {communityPosts.map(post => (
                <div key={post.id} className="bg-zinc-950 border border-[#7c3aed]/30 hover:border-[#7c3aed] rounded-2xl overflow-hidden hover:scale-[1.01] transition group">
                  <div className="aspect-video bg-gradient-to-br from-[#7c3aed]/20 to-[#6d28d9]/20 flex items-center justify-center text-6xl border-b border-[#7c3aed]/20 relative cursor-pointer">
                    {post.emoji}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#7c3aed] flex items-center justify-center">
                        <Play size={28} className="text-white ml-1"/>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-black text-white mb-2 text-sm line-clamp-1">{post.title}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-full bg-[#7c3aed] flex items-center justify-center text-xs font-black flex-shrink-0">{post.user[0]}</div>
                      <div className="min-w-0">
                        <p className="font-bold text-white text-xs truncate">{post.user}</p>
                        <p className="text-zinc-600 text-xs">{post.views.toLocaleString()} views</p>
                      </div>
                    </div>

                    <div className="flex gap-4 mb-4 text-xs">
                      <button onClick={()=>!isGuest&&handleLike(post.id)} disabled={isGuest}
                        className="flex items-center gap-1 text-white hover:text-blue-400 transition disabled:opacity-50 font-bold">
                        <ThumbsUp size={14} className="text-blue-400"/>{post.likes.toLocaleString()}
                      </button>
                      <button onClick={()=>!isGuest&&handleLove(post.id)} disabled={isGuest}
                        className="flex items-center gap-1 text-white hover:text-red-400 transition disabled:opacity-50 font-bold">
                        <Heart size={14} className="text-red-400"/>{post.loves.toLocaleString()}
                      </button>
                      <div className="flex items-center gap-1 text-zinc-500 font-bold ml-auto">
                        <MessageCircle size={14}/>{post.comments.length}
                      </div>
                    </div>

                    {post.comments.length > 0 && (
                      <div className="mb-3 space-y-1.5 max-h-24 overflow-y-auto scrollbar">
                        {post.comments.map(c => (
                          <div key={c.id} className="bg-black/40 p-2 rounded-lg">
                            <span className="text-[#a78bfa] font-bold text-xs">{c.user}: </span>
                            <span className="text-white text-xs">{c.text}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="border-t border-zinc-800/50 pt-3">
                      <textarea value={newComment[post.id]||''} onChange={e=>setNewComment(prev=>({...prev,[post.id]:e.target.value}))}
                        disabled={isGuest} placeholder={isGuest?'Sign up to comment...':'Add a comment...'}
                        className="w-full p-2 bg-black border border-[#7c3aed]/20 focus:border-[#7c3aed] rounded-lg text-white text-xs mb-2 outline-none resize-none disabled:opacity-50 h-12 transition"/>
                      <button onClick={()=>handleComment(post.id)} disabled={isGuest||!newComment[post.id]?.trim()}
                        className="w-full bg-[#7c3aed] py-1.5 rounded-lg font-bold uppercase text-xs hover:bg-[#6d28d9] transition disabled:opacity-40">
                        POST
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── P21: THANK YOU ── */}
        {page === 21 && (
          <div className="min-h-screen p-8 pt-20 pb-40 page-enter">
            <div className="max-w-5xl mx-auto">

              {/* Video / fallback */}
              <div className="mb-12 rounded-3xl overflow-hidden border-4 border-[#7c3aed]">
                <video autoPlay loop muted playsInline className="w-full bg-black"
                  onError={e=>{const v=e.currentTarget;v.style.display='none';const fb=v.nextElementSibling as HTMLElement;if(fb)fb.style.display='flex';}}>
                  <source src="/background.mp4" type="video/mp4"/>
                </video>
                <div className="hidden w-full aspect-video bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">🎬</div>
                    <h2 className="text-4xl font-black text-white">THAT'S ALL FOLKS!</h2>
                  </div>
                </div>
              </div>

              <h1 className="text-7xl md:text-8xl font-black text-[#7c3aed] uppercase text-center mb-12 leading-none animate-pulse">
                THAT'S ALL FOLKS!
              </h1>

              <div className="bg-gradient-to-br from-[#7c3aed]/20 to-[#6d28d9]/10 border-4 border-[#7c3aed] rounded-3xl p-10 mb-10">
                <div className="text-center mb-8">
                  <Heart size={56} className="mx-auto text-[#7c3aed] mb-4"/>
                  <h2 className="text-3xl font-black text-white">A SPECIAL THANK YOU</h2>
                </div>
                <div className="text-white leading-relaxed space-y-5 max-w-3xl mx-auto text-center">
                  <p className="italic font-black text-[#7c3aed] text-xl">Dear Creator,</p>
                  <p>Thank you for choosing <strong className="text-[#7c3aed]">MandaStrong Studio</strong>. This is more than video creation — it's about the <strong className="text-[#7c3aed]">social impact</strong> your stories will have on the world.</p>
                  <p>Our mission is to support schools in <strong className="text-[#7c3aed]">bullying prevention</strong> and <strong className="text-[#7c3aed]">social skills development</strong>. Every movie you create can educate, inspire, and bring awareness to critical issues.</p>
                  <p className="font-black text-[#7c3aed] text-lg">Thank you for being part of this mission to cultivate humanity in our communities. 💜</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-zinc-950 border-4 border-[#7c3aed] rounded-3xl p-8 text-center">
                  <BookOpen size={52} className="mx-auto text-[#7c3aed] mb-4"/>
                  <h3 className="text-2xl font-black text-white uppercase mb-3">HOW TO USE GUIDE</h3>
                  <p className="text-zinc-400 text-sm mb-6">Step-by-step tutorials for every feature</p>
                  <button onClick={()=>setPage(17)} className="px-10 py-3.5 bg-[#7c3aed] text-white rounded-full font-black hover:bg-[#6d28d9] transition">
                    📚 VIEW TUTORIALS
                  </button>
                </div>
                <div className="bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] rounded-3xl p-8 text-center border-4 border-[#a78bfa]">
                  <Shield size={52} className="mx-auto text-white mb-4"/>
                  <h3 className="text-2xl font-black mb-3">VETERANS SUPPORT 🇺🇸</h3>
                  <p className="text-white/80 text-sm mb-6">100% of Etsy proceeds benefit Veterans Mental Health Services</p>
                  <a href="https://MandaStrong1.Etsy.com" target="_blank" rel="noopener noreferrer"
                    className="inline-block px-10 py-3.5 bg-white text-[#7c3aed] rounded-full font-black hover:scale-105 transition">
                    🛍 VISIT ETSY STORE
                  </a>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-5 justify-center mb-12">
                <button onClick={()=>setPage(1)} className="px-14 py-6 bg-white text-black rounded-full font-black uppercase text-2xl hover:scale-105 transition shadow-2xl">🏠 HOME</button>
                <button onClick={()=>setPage(20)} className="px-14 py-6 bg-[#7c3aed] text-white rounded-full font-black uppercase text-2xl hover:scale-105 transition shadow-2xl shadow-[#7c3aed]/30">👥 COMMUNITY</button>
              </div>

              <div className="text-center border-t border-zinc-800 pt-8">
                <p className="text-[#7c3aed] text-xl font-black mb-2">MandaStrong Studio © 2025–2026</p>
                <p className="text-zinc-600 text-sm mb-4">Building Communities Through Creative Storytelling</p>
                <div className="flex flex-wrap justify-center gap-6 text-xs text-zinc-600">
                  <button onClick={()=>setPage(18)} className="hover:text-[#7c3aed] transition">Terms of Service</button>
                  <span>•</span>
                  <button onClick={()=>setPage(19)} className="hover:text-[#7c3aed] transition">Support / Agent Grok</button>
                  <span>•</span>
                  <a href="https://MandaStrong1.Etsy.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#7c3aed] transition">MandaStrong1.Etsy.com</a>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
