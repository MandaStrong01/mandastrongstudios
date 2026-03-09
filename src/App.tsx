import { useState, useRef, useCallback, useEffect } from 'react';
import {
  Menu, X, ChevronLeft, ChevronRight, Play, Upload, Film, Mic,
  Zap, Shield, Music, Sliders, Database, FileVideo, Clock,
  ThumbsUp, Heart, Plus, Eye, Download, Save, Wand2, Trash2,
  Share2, Search, AlertCircle, Loader, CheckCircle, Sparkles,
  MessageCircle, Send, User, Lock, CreditCard, LogOut, Settings,
  Volume2, Layers, Scissors, BarChart2, Globe, Star, Award,
  Camera, Monitor, HardDrive, Cpu, Activity, BookOpen
} from 'lucide-react';

// ===================== VIDEOS =====================
const OCEAN_VIDEO = "https://assets.mixkit.co/videos/preview/mixkit-ocean-waves-loop-1196-large.mp4";

// ===================== BOLT AI =====================
import { generateText } from '@bolt/ai';

async function callAI(prompt: string, systemPrompt = '') {
  const result = await generateText({
    system: systemPrompt,
    prompt
  });
  return result.text;
}

// ===================== TYPES =====================
interface Asset {
  id: number;
  name: string;
  type: string;
  size: string;
  url: string;
  timestamp: string;
  aiGenerated?: boolean;
  enhanced?: boolean;
}

interface TimelineState {
  video: Asset[];
  audio: Asset[];
  text: Asset[];
}

interface Toast {
  id: number;
  msg: string;
  type: string;
}

// ===================== AI TOOLS DATA =====================
const AI_TOOLS: Record<string, string[]> = {
  Writing: [
    "Script to Movie","Text to Script","Script to Screenplay","Prompt to Story","Story to Script",
    "Text to Dialogue","Dialogue Generator","Scene Writer","Plot Generator","Story Outline",
    "Script Formatter","Logline Generator","Synopsis Writer","Treatment Writer","Beat Sheet Builder",
    "Character Bio Writer","Character Arc Builder","Subplot Generator","Plot Twist Generator",
    "Opening Hook Creator","Climax Designer","Three Act Structure","Five Act Structure",
    "Documentary Script","Short Film Script","Feature Film Script","TV Pilot Script",
    "Commercial Script","Explainer Script","Narration Writer","Voiceover Script",
    "Interview Script","Podcast Script","YouTube Script","Social Media Script",
    "Action Line Writer","Scene Heading Tool","Parenthetical Generator","Dialogue Tightener",
    "Script Timer","Word Counter","Page Counter","Reading Time Estimator","Format Checker",
    "Grammar Polish","Spell Checker","Continuity Checker","Plot Hole Detector","Tone Checker",
    "Genre Analyzer","Pacing Analyzer","Readability Meter","Engagement Scorer","Originality Scorer",
    "Theme Generator","Conflict Builder","Backstory Generator","World Builder","Name Generator",
    "Location Finder","Prop List Generator","Costume Designer","Research Helper","Fact Checker",
    "Pitch Deck Builder","Coverage Writer","Version Control","Revision Tracker","Collab Hub",
    "Story Outliner","Character Mapper","Emotional Arc Map","Story Arc Map","Flashback Creator",
    "Foreshadowing Tool","MacGuffin Creator","Trope Finder","Cliche Detector","POV Analyzer",
    "Tense Checker","Scene Analyzer","Mythology Builder","Quest Designer","Story Consultant",
    "Inciting Incident Finder","Midpoint Architect","Character Interview","Scene Setting Engine",
    "Prophecy Creator","History Timeline","Geography Mapper","Economy Builder","Culture Creator",
    "Plot Tension Engine","Character Voice Lab","Sprint Timer","Pitch Writer","Tagline Generator"
  ],
  Voice: [
    "Upload Own Voice","Record My Voice","Clone My Voice","Text to Speech","Text to Voice","Text to Narration","Text to Audiobook","Text to Voiceover",
    "Voice Cloning","Voice to Voice","AI Voice Actor","Neural Voice Generator","Emotion Voice Synth",
    "Trailer Voice Generator","Documentary Voice","Commercial Voice","News Anchor Voice",
    "Character Voice Creator","Accent Generator","Multi Language Voice","Voice Translator",
    "Lip Sync AI","Dialogue Synth","Audiobook Creator","Podcast Voice","Radio DJ Voice",
    "Sports Commentary Voice","Meditation Voice","ASMR Creator","Whisper Generator",
    "Deep Voice Generator","Robot Voice","Alien Voice","Monster Voice","Child Voice",
    "Elderly Voice","Male to Female Voice","Female to Male Voice","Speed Controller",
    "Pitch Controller","Tone Adjuster","Volume Normalizer","Clarity Booster",
    "Voice Denoiser","Echo Remover","Reverb Remover","Background Noise Remover",
    "Voice EQ Studio","De-Esser","Pop Filter Sim","Noise Gate","Compression Tool",
    "Reverb Voice FX","Echo Voice FX","Chorus FX","Phone Effect","Radio Effect",
    "Megaphone Effect","Lo-Fi Voice","Distortion FX","Warmth Adder","Brightness Mixer",
    "Richness Amplifier","Resonance Tuner","Dynamic Range Engine","Vocal Enhancer",
    "Voice Consistency Checker","Narrator Optimizer","Breathing Remover","Room Tone Match",
    "Studio Grade Clarity","Voice Recorder","Voice Timer","Voice Health Monitor",
    "Multi Voice Generator","Voice Mixer","Voice Layering","Choir Generator","Crowd Voice",
    "Baby Voice","Singing Voice","Rap Voice Generator","Spoken Word Generator",
    "Voice to Text","Voice Transcriber","Subtitle from Voice","Caption Generator",
    "Voice Style Transfer","Celebrity Voice Match","Smooth Voice Filter","Texture Designer",
    "Projection Booster","Volume Expander","Timbre Modifier","Voice Warm-up","Posture Guide"
  ],
  Image: [
    "Text to Image","Prompt to Image","Image to Image","Image Upscaler","Image Generator",
    "AI Art Generator","Photo to Painting","Sketch to Image","Wireframe to Image",
    "Background Generator","Background Remover","Sky Replacer","Object Remover",
    "Face Generator","Character Design","Portrait Generator","Avatar Creator",
    "Product Image Generator","Architecture Visualizer","Interior Design Generator",
    "Landscape Generator","Abstract Art Generator","Logo Generator","Icon Creator",
    "Texture Generator","Pattern Maker","Color Palette Generator","Style Transfer",
    "Photo Enhancer","Photo Restorer","Old Photo Colorizer","Black & White to Color",
    "Image Denoiser","Sharpness Enhancer","Clarity Booster","Detail Enhancer",
    "HDR Image Creator","Exposure Fixer","White Balance AI","Color Grading Studio",
    "LUT Creator","Tone Mapper","Contrast Adjuster","Brightness Tool","Saturation Engine",
    "Hue Shift","Temperature Control","Vignette Tool","Bokeh Generator","Depth of Field",
    "Film Grain Synth","Light Leaks","Lens Flare","God Rays","Volumetric Light",
    "Golden Hour FX","Blue Hour FX","Sunset FX","Sunrise FX","Moonlight FX","Neon Light",
    "Fire Light","Candle Light","Studio Light","3 Point Light","Rim Light",
    "Shadow Generator","Highlight Creator","Ambient Occlusion","Global Illumination",
    "Panorama Stitcher","360 Image Creator","Fisheye Corrector","Lens Distorter",
    "Chromatic Aberration","Motion Blur","Radial Blur","Zoom Blur","Gaussian Blur",
    "Weather FX","Rain Effect","Snow Effect","Fog Generator","Smoke FX","Fire Creator",
    "Explosion FX","Lightning FX","Aurora Effect","Rainbow Creator","Caustics Engine",
    "Prop Creator","Scene Compositor","Lighting Designer","Cloud Generator","Dehaze Engine"
  ],
  Video: [
    "Text to Video","Prompt to Video","Image to Video","Script to Video","Story to Video",
    "AI Movie Creator","AI Film Maker","AI Video Generator","Scene Generator","Shot Generator",
    "Video Upscaler 4K","Video Upscaler 8K","Frame Rate Booster","60FPS Converter",
    "Slow Motion Generator","Time Lapse Creator","Speed Ramp Engine","Video Extender",
    "Video Stabilizer","Background Remover","Green Screen Replacer","Sky Replacer Video",
    "Object Remover Video","Watermark Remover","Video Denoiser","Video Sharpener",
    "Color Grading Pro","Film Look Generator","Cinematic LUT","Black & White Film",
    "Film Restorer","Old Film Effect","VHS Effect","Glitch Effect","Hologram Effect",
    "Drone Shot Generator","Aerial View Creator","Tracking Shot","Dolly Zoom",
    "Whip Pan","Time Freeze","Bullet Time Effect","Matrix Effect","Clone Effect",
    "Face Swap Video","Deepfake Detector","Age Progression Video","De-Aging Video",
    "Talking Head Generator","Avatar Video Creator","Virtual Presenter","AI News Anchor",
    "Lip Sync Video","Mouth Animation","Eye Contact Correction","Head Pose Correction",
    "Video Translator","Subtitle Generator","Caption Burner","Auto Subtitles",
    "Video Loop Creator","Boomerang Effect","Reverse Video","Mirror Effect",
    "Split Screen Creator","Picture in Picture","Video Collage","Slideshow Maker",
    "Transition Generator","Intro Maker","Outro Maker","Lower Third Generator",
    "Title Card Creator","End Screen Maker","Thumbnail Generator","Cover Frame Selector",
    "Video Compressor","Format Converter","Resolution Changer","Crop & Resize",
    "Video Trimmer","Scene Cutter","Auto Edit","Jump Cut Generator","Beat Sync Editor",
    "Highlight Reel Maker","Recap Generator","Trailer Maker","Teaser Creator","Sizzle Reel"
  ],
  Motion: [
    "Text to Animation","Prompt to Motion","Image to Animation","2D to 3D Animation",
    "Character Animation","Facial Animation","Body Motion Capture","Hand Animation",
    "Lip Sync Animation","Eye Blink Animation","Crowd Animation","Animal Animation",
    "VFX Generator","Particle Effect Generator","Explosion Generator","Fire Animation",
    "Smoke Animation","Water Simulation","Rain Animation","Snow Animation","Lightning FX",
    "Magic Effect","Energy Beam","Portal Effect","Teleportation FX","Force Field",
    "Shockwave Creator","Laser Effect","Plasma Effect","Hologram Animation","Glitch FX",
    "Invisibility Effect","Morphing Effect","Liquid Metal","Shape Shifting","Disintegration FX",
    "Physics Simulator","Gravity Simulator","Cloth Dynamics","Hair Simulator","Fur Dynamics",
    "Rigid Body Physics","Soft Body Physics","Fluid Dynamics","Rope Physics","Chain Dynamic",
    "Destruction Simulator","Fracture System","Debris Generator","Dust Effect","Spark Generator",
    "Motion Tracker","Camera Tracker","Object Tracker","Face Tracker","Stabilizer",
    "Speed Lines","Zoom Blur Motion","Motion Trail","Echo Effect","Ghost Effect",
    "Freeze Frame","Slow Motion FX","Hyperspeed Effect","Time Warp","Strobe Effect",
    "Keyframe Animator","Ease In / Ease Out","Bounce Effect","Elastic Motion","Spring System",
    "Path Animator","Orbit Animation","Rotation Loop","Float Animation","Pendulum Motion",
    "Screen Shake","Camera Shake","Handheld Camera FX","Cinematic Push In","Ken Burns Effect",
    "Parallax Effect","3D Camera Move","Dolly In Animation","Crane Move","Tilt Shift Animation",
    "Cartoon Animation","Stop Motion Style","Claymation Effect","Puppet Rig","IK Rig Builder",
    "Skeleton Animator","Mocap Solver","Facial Rigging","Muscle System","Skin Deformer"
  ],
  Enhancement: [
    "AI 8K Upscaling","AI 4K Upscaling","Video Super Resolution","Frame Interpolation",
    "Video Denoiser","Noise Reduction","Grain Remover","Artifact Remover","Scratch Remover",
    "Video Sharpener","Clarity Booster","Detail Enhancer","Edge Enhancement","Texture Boost",
    "Color Correction","Auto Color Balance","White Balance AI","Color Match Pro","Color Grading AI",
    "Cinematic Color Grade","Film Stock Emulation","LUT Generator","Tone Mapping Pro",
    "HDR Enhancement","Deep HDR Boost","Dynamic Range Expansion","Shadow Recovery",
    "Highlight Recovery","Highlight Rolloff","Black Point Calibration","Gamma Correction",
    "Contrast Enhancer","Brightness Optimizer","Saturation Booster","Smart Saturation",
    "Skin Tone Enhancer","Face Enhancement","Face Retouch","Eye Enhancer","Teeth Whitener",
    "Background Enhancer","Sky Enhancer","Landscape Enhancer","Night Video Enhancer",
    "Low Light Clarity","Motion Stabilization","Shake Remover","Rolling Shutter Fix",
    "Flicker Reduction","Flicker Fixer","Lens Distortion Fix","Vignette Remover",
    "Chromatic Aberration Fix","Moire Remover","De-Banding Pro","Anamorphic Correction",
    "Audio Enhancer","Voice Clarity Booster","Dialogue Enhancer","Background Noise Remover",
    "Echo Remover","Reverb Remover","Hum Remover","Wind Noise Remover","Breath Remover",
    "Click & Pop Remover","Room Tone Match","Audio Normalization","Loudness Optimizer",
    "Cinematic Grain","Film Grain Advanced","Halation Effect","Glow Synthesis","Bloom Control",
    "Lens Flare Enhancer","Atmospheric Haze","Light Wrap","Depth of Field Enhancement",
    "Bokeh Enhancer","Focus Puller","Optical Flow Smooth","Temporal Denoise","Motion Blur Add",
    "Sky Replacement","Background Replacement","Object Removal","Watermark Remover",
    "Subtitles Enhancer","Burned Caption Fix","Frame Rate Fix","Sync Fix","Audio Drift Fix",
    "Quality Optimizer","File Size Optimizer","Codec Converter","Format Enhancer","Master Exporter"
  ]
};

// ===================== PRICING PLANS =====================
const PLANS = [
  {
    name: 'Creator',
    price: 20,
    features: ['HD Export 1080p', '100 AI Tools', '10GB Storage', 'Email Support', 'Basic Timeline'],
    stripe: 'https://buy.stripe.com/4gM5kFaVYfjN7EX0vMafS00',
    color: '#374151'
  },
  {
    name: 'Pro',
    price: 30,
    features: ['4K Export', '300 AI Tools', '100GB Storage', 'Priority Support', 'Full Timeline', 'Commercial License'],
    stripe: 'https://buy.stripe.com/14A00l8NQ0oTbVd3HYafS01',
    color: '#4C1D95',
    popular: true
  },
  {
    name: 'Studio',
    price: 50,
    features: ['8K Export', '600+ AI Tools', '1TB Storage', '24/7 Support', 'Full Rights', 'API Access', 'Collaboration'],
    stripe: 'https://buy.stripe.com/fZubJ35BE3B53oHdiyafS02',
    color: '#1F2937'
  }
];

// ===================== TOAST =====================
function Toast({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: number) => void }) {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className={`flex items-center gap-3 px-4 py-3 rounded border pointer-events-auto min-w-64 max-w-sm
          ${t.type === 'success' ? 'bg-[#0a0a0a] border-[#16a34a] text-[#4ade80]' :
            t.type === 'error' ? 'bg-[#0a0a0a] border-[#dc2626] text-[#f87171]' :
            t.type === 'warning' ? 'bg-[#0a0a0a] border-[#ca8a04] text-[#facc15]' :
            'bg-[#0a0a0a] border-[#6B21A8] text-[#c084fc]'}`}
          style={{ animation: 'slideInRight 0.2s ease' }}>
          <span className="text-sm font-mono flex-1 tracking-wide">{t.msg}</span>
          <button onClick={() => removeToast(t.id)} className="text-zinc-600 hover:text-white ml-1 text-xs">✕</button>
        </div>
      ))}
    </div>
  );
}

// ===================== STOCK VOICES =====================
const STOCK_VOICES = [
  { name: "Aurora", style: "Warm Female", accent: "British", url: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3" },
  { name: "Marcus", style: "Deep Male", accent: "American", url: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3" },
  { name: "Sage", style: "Neutral", accent: "Australian", url: "https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3" },
  { name: "Nova", style: "Energetic Female", accent: "American", url: "https://assets.mixkit.co/active_storage/sfx/2569/2569-preview.mp3" },
  { name: "Caspian", style: "Cinematic Male", accent: "British", url: "https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3" },
  { name: "Iris", style: "Soft Female", accent: "Irish", url: "https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3" },
];

// ===================== TOOL DESCRIPTIONS =====================
const TOOL_DESC: Record<string, string> = {
  "Script to Movie": "Turn your script into a full movie sequence automatically",
  "Text to Script": "Convert any text or idea into a formatted film script",
  "Script to Screenplay": "Format your script to industry-standard screenplay layout",
  "Prompt to Story": "Generate a full story from a single sentence prompt",
  "Story to Script": "Convert a written story into dialogue and scene format",
  "Text to Dialogue": "Turn narration or prose into spoken character dialogue",
  "Dialogue Generator": "Create realistic back-and-forth character conversations",
  "Scene Writer": "Write a complete scene from a brief description",
  "Plot Generator": "Build a full plot with beginning, middle and end",
  "Story Outline": "Create a structured outline for your film or book",
  "Script Formatter": "Auto-format your script to professional standards",
  "Logline Generator": "Write a one-sentence summary that sells your story",
  "Synopsis Writer": "Create a short compelling summary of your film",
  "Treatment Writer": "Write a detailed treatment document for your project",
  "Beat Sheet Builder": "Map out every major story beat in your film",
  "Character Bio Writer": "Create detailed character backgrounds and profiles",
  "Character Arc Builder": "Map how your character changes through the story",
  "Subplot Generator": "Add secondary storylines that enrich your main plot",
  "Plot Twist Generator": "Create unexpected story turns that surprise audiences",
  "Opening Hook Creator": "Write a powerful opening that grabs attention immediately",
  "Climax Designer": "Build the peak dramatic moment of your story",
  "Three Act Structure": "Organise your story into the classic three-act format",
  "Five Act Structure": "Build a more complex five-act dramatic structure",
  "Documentary Script": "Write a narration-based script for documentary films",
  "Short Film Script": "Create a complete script for a short film under 30 minutes",
  "Feature Film Script": "Write a full-length feature film screenplay",
  "TV Pilot Script": "Create the first episode script for a TV series",
  "Commercial Script": "Write a punchy script for ads and promotional content",
  "Explainer Script": "Create clear scripts for explainer or tutorial videos",
  "Narration Writer": "Write smooth voiceover narration for any video",
  "Voiceover Script": "Create a script specifically designed to be read aloud",
  "Interview Script": "Prepare structured questions and responses for interviews",
  "Podcast Script": "Write a scripted or semi-scripted podcast episode",
  "YouTube Script": "Create engaging scripts optimised for YouTube videos",
  "Social Media Script": "Write short punchy scripts for social media videos",
  "Tagline Generator": "Create memorable one-line taglines for your film",
  "Upload Own Voice": "Upload your own recorded voice for use in projects",
  "Record My Voice": "Record your voice directly in the app",
  "Clone My Voice": "Create an AI clone of your voice for narration",
  "Text to Speech": "Convert any written text into natural spoken audio",
  "Text to Image": "Generate an image from a text description",
  "Text to Video": "Generate a video clip from a text description",
  "Text to Animation": "Generate animated video from a text description",
  "AI 8K Upscaling": "Upscale video to stunning 8K resolution with AI",
};

// ===================== MAIN APP =====================
export default function App() {
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [duration, setDuration] = useState(90);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Writing');
  const [selectedEnhancement, setSelectedEnhancement] = useState<string | null>(null);
  const [mediaLibrary, setMediaLibrary] = useState<Asset[]>([]);
  const [timeline, setTimeline] = useState<TimelineState>({ video: [], audio: [], text: [] });
  const [draggedItem, setDraggedItem] = useState<Asset | null>(null);
  const [currentVideo, setCurrentVideo] = useState<Asset | null>(null);
  const [aiPrompt, setAiPrompt] = useState(() => { try { return localStorage.getItem('ms_draft') || ''; } catch { return ''; } });
  const [generating, setGenerating] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [audioLevels, setAudioLevels] = useState({ music: 75, voice: 60, sfx: 50, master: 85 });
  const [enhancementSettings, setEnhancementSettings] = useState({ intensity: 75, clarity: 80, color: 70, brightness: 65 });
  const [exportSettings, setExportSettings] = useState({ quality: '8K', format: 'MP4' });
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [toolSearch, setToolSearch] = useState('');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState('idle');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [grokMessage, setGrokMessage] = useState('');
  const [grokLoading, setGrokLoading] = useState(false);
  const [grokChat, setGrokChat] = useState([
    { role: 'agent', text: "I'm Agent Grok — your 24/7 production assistant. Ask me anything about uploads, AI generation, timeline editing, enhancements, audio mixing, rendering, or exports." }
  ]);
  const [communityPosts] = useState([
    { id: 1, title: 'Epic Action Feature', user: 'Sarah J.', emoji: '🎬', likes: 2847, loves: 1923 },
    { id: 2, title: 'Family Documentary', user: 'Mike Chen', emoji: '📹', likes: 1256, loves: 892 },
    { id: 3, title: 'Short Film Entry', user: 'Emily R.', emoji: '🏆', likes: 3421, loves: 2156 },
    { id: 4, title: 'Music Video Cut', user: 'Alex T.', emoji: '🎵', likes: 5234, loves: 4012 }
  ]);
  const [newComment, setNewComment] = useState<Record<number, string>>({});
  const [importUrl, setImportUrl] = useState('');
  const [showUrlImport, setShowUrlImport] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const [exIsAdmin, setExIsAdmin] = useState(true);
  const [exShowLogin, setExShowLogin] = useState(false);
  const [exEmail, setExEmail] = useState('');
  const [exPassword, setExPassword] = useState('');
  const [exError, setExError] = useState('');
  const [exActiveVideo, setExActiveVideo] = useState<number | null>(null);
  const [exVideos, setExVideos] = useState([
    { id: 0, url: null as string | null, name: '', title: 'Humanity of AI', desc: 'A documentary film — MandaStrong Studio x Doxy' },
    { id: 1, url: null as string | null, name: '', title: 'AI For Dummies', desc: 'A plain-English guide to artificial intelligence' },
    { id: 2, url: null as string | null, name: '', title: 'Humanity of AI — Feature Cut', desc: 'Full 90-minute documentary — MandaStrong Studio' },
  ]);
  const exRef0 = useRef<HTMLInputElement>(null);
  const exRef1 = useRef<HTMLInputElement>(null);
  const exRef2 = useRef<HTMLInputElement>(null);
  const exRefs = [exRef0, exRef1, exRef2];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const oceanRef = useRef<HTMLVideoElement>(null);
  const autoSaveRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addToast = useCallback((msg: string, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id: number) => setToasts(prev => prev.filter(t => t.id !== id)), []);
  const goTo = useCallback((p: number) => { setPage(p); setMenuOpen(false); window.scrollTo(0, 0); }, []);

  const startScreenRecord = useCallback(async () => {
    try {
      const stream = await (navigator.mediaDevices as any).getDisplayMedia({ video: true, audio: true });
      const recorder = new MediaRecorder(stream);
      recordedChunksRef.current = [];
      recorder.ondataavailable = e => { if (e.data.size > 0) recordedChunksRef.current.push(e.data); };
      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const asset: Asset = { id: Date.now(), name: `Screen_Recording_${Date.now()}.webm`, type: 'video', size: (blob.size / 1024 / 1024).toFixed(2) + 'MB', url, timestamp: new Date().toISOString() };
        setMediaLibrary(prev => [...prev, asset]);
        addToast('Screen recording saved to library!', 'success');
        stream.getTracks().forEach((t: MediaStreamTrack) => t.stop());
        setIsRecording(false);
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
      addToast('Recording screen... Click Stop when done.', 'info');
    } catch (err) {
      addToast('Screen recording cancelled or not supported', 'warning');
    }
  }, [addToast]);

  const stopScreenRecord = useCallback(() => {
    mediaRecorderRef.current?.stop();
  }, []);

  const handleImportUrl = useCallback(() => {
    if (!importUrl.trim()) return;
    const url = importUrl.trim();
    const name = url.split('/').pop() || `imported_${Date.now()}.mp4`;
    const asset: Asset = { id: Date.now(), name, type: 'video', size: 'External', url, timestamp: new Date().toISOString() };
    setMediaLibrary(prev => [...prev, asset]);
    setImportUrl('');
    setShowUrlImport(false);
    addToast('URL imported to media library!', 'success');
  }, [importUrl, addToast]);

  useEffect(() => {
    if (page >= 5) {
      autoSaveRef.current = setInterval(() => {
        setAutoSaveStatus('saving');
        try {
          localStorage.setItem('ms_save', JSON.stringify({ mediaLibrary, timeline, audioLevels, duration, exportSettings }));
          setAutoSaveStatus('saved');
          setLastSaved(new Date());
          setTimeout(() => setAutoSaveStatus('idle'), 2000);
        } catch { setAutoSaveStatus('error'); }
      }, 15000);
      return () => { if (autoSaveRef.current) clearInterval(autoSaveRef.current); };
    }
  }, [page, mediaLibrary, timeline, audioLevels, duration, exportSettings]);

  useEffect(() => {
    if (oceanRef.current && (page === 1 || page === 2)) {
      oceanRef.current.muted = true;
      oceanRef.current.play().catch(() => {});
    }
  }, [page]);

  useEffect(() => {
    const saved = localStorage.getItem('ms_save');
    if (saved) {
      try {
        const d = JSON.parse(saved);
        setMediaLibrary(d.mediaLibrary || []);
        setTimeline(d.timeline || { video: [], audio: [], text: [] });
        setAudioLevels(d.audioLevels || { music: 75, voice: 60, sfx: 50, master: 85 });
        setDuration(d.duration || 90);
        setExportSettings(d.exportSettings || { quality: '8K', format: 'MP4' });
      } catch {}
    }
  }, []);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadProgress(0);
    let completed = 0;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        completed++;
        const asset: Asset = {
          id: Date.now() + Math.random(),
          name: file.name,
          type: file.type.startsWith('video') ? 'video' : file.type.startsWith('audio') ? 'audio' : 'image',
          size: (file.size / 1024 / 1024).toFixed(2) + 'MB',
          url: ev.target?.result as string,
          timestamp: new Date().toISOString()
        };
        setMediaLibrary(prev => [...prev, asset]);
        setUploadProgress(Math.round((completed / files.length) * 100));
        if (completed === files.length) {
          setTimeout(() => { setUploadProgress(null); addToast(`${files.length} file(s) uploaded`, 'success'); }, 600);
        }
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [addToast]);

  // ===================== SPOT 1 — AI GENERATE =====================
  const handleAIGenerate = useCallback(async () => {
    if (!aiPrompt.trim() || !selectedTool) return;
    setGenerating(true);
    addToast(`Generating: ${selectedTool}...`, 'info');
    try {
      const generatedText = await callAI(
        `You are a professional film and content creation AI inside MandaStrong Studio. The user is using the tool: "${selectedTool}". Their prompt is: "${aiPrompt}". Generate professional, detailed content for this tool. Be creative, specific, and production-ready.`
      );
      const asset: Asset = {
        id: Date.now(),
        name: `AI_${selectedTool.replace(/\s+/g, '_')}_${Date.now()}.txt`,
        type: 'video',
        size: (generatedText.length / 1024).toFixed(2) + 'KB',
        url: OCEAN_VIDEO,
        aiGenerated: true,
        timestamp: new Date().toISOString()
      };
      setMediaLibrary(prev => [...prev, asset]);
      setGenerating(false);
      setAiPrompt('');
      setSelectedTool(null);
      addToast(`Generated: ${selectedTool}`, 'success');
      alert(`✦ GENERATED OUTPUT:\n\n${generatedText}`);
    } catch (err) {
      setGenerating(false);
      addToast('Generation failed. Check API key.', 'error');
    }
    try { localStorage.removeItem('ms_draft'); } catch {}
  }, [aiPrompt, selectedTool, addToast]);

  const handleRender = useCallback(() => {
    if (!timeline.video.length && !timeline.audio.length) {
      addToast('Add clips to timeline first', 'error'); return;
    }
    setRendering(true);
    setRenderProgress(0);
    addToast('Render started...', 'info');
    let prog = 0;
    const iv = setInterval(() => {
      prog += 2;
      setRenderProgress(prog);
      if (prog >= 100) {
        clearInterval(iv);
        const rendered: Asset = {
          id: Date.now(),
          name: `render_${Date.now()}.${exportSettings.format.toLowerCase()}`,
          type: 'video',
          size: (Math.random() * 1000 + 500).toFixed(2) + 'MB',
          url: OCEAN_VIDEO,
          timestamp: new Date().toISOString()
        };
        setMediaLibrary(prev => [...prev, rendered]);
        setCurrentVideo(rendered);
        setRendering(false);
        setRenderProgress(100);
        addToast('Render complete! Opening preview...', 'success');
        setTimeout(() => goTo(17), 1000);
      }
    }, 100);
  }, [timeline, exportSettings, addToast, goTo]);

  // ===================== SPOT 2 — AGENT GROK =====================
  const sendGrokMessage = useCallback(async () => {
    if (!grokMessage.trim() || grokLoading) return;
    const userMsg = grokMessage;
    setGrokChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setGrokMessage('');
    setGrokLoading(true);
    try {
      const reply = await callAI(
        userMsg,
        `You are Agent Grok, the 24/7 AI production assistant inside MandaStrong Studio — a professional AI movie creation platform with 600+ tools, 8K export, and up to 3-hour film duration. You know every page of the app: Page 1 Home, Page 2 About, Page 3 Examples, Page 4 Login/Subscribe, Pages 5-10 AI Tool Boards (Writing/Voice/Image/Video/Motion/Enhancement), Page 11 Upload Media, Page 12 Editor Suite, Page 13 Timeline, Page 14 Enhancement Studio, Page 15 Audio Mixer, Page 16 Render, Page 17 Preview, Page 18 Export, Page 19 Tutorials, Page 20 Terms, Page 21 Agent Grok, Page 22 Community Hub, Page 23 Thank You. Plans: Creator $20, Pro $30, Studio $50 with 7-day free trial. Answer helpfully, concisely, and always in the context of this app.`
      );
      setGrokChat(prev => [...prev, { role: 'agent', text: reply }]);
    } catch (err) {
      setGrokChat(prev => [...prev, { role: 'agent', text: 'Connection error. Please check your internet and try again.' }]);
    }
    setGrokLoading(false);
  }, [grokMessage, grokLoading]);

  // ===================== SPOT 3 — SCRIPT WRITER =====================
  const [scriptPrompt, setScriptPrompt] = useState('');
  const [scriptResult, setScriptResult] = useState('');
  const [scriptGenerating, setScriptGenerating] = useState(false);

  const handleScriptGenerate = useCallback(async () => {
    if (!scriptPrompt.trim()) return;
    setScriptGenerating(true);
    setScriptResult('');
    try {
      const result = await callAI(
        `You are a professional Hollywood screenwriter inside MandaStrong Studio. Write a complete, properly formatted film script based on this prompt: "${scriptPrompt}". Include scene headings, action lines, and dialogue. Make it cinematic, compelling, and production-ready.`
      );
      setScriptResult(result);
      const asset: Asset = {
        id: Date.now(),
        name: `Script_${Date.now()}.txt`,
        type: 'video',
        size: (result.length / 1024).toFixed(2) + 'KB',
        url: OCEAN_VIDEO,
        aiGenerated: true,
        timestamp: new Date().toISOString()
      };
      setMediaLibrary(prev => [...prev, asset]);
      addToast('Script generated and saved to library!', 'success');
    } catch (err) {
      setScriptResult('Error generating script. Please try again.');
      addToast('Script generation failed.', 'error');
    }
    setScriptGenerating(false);
  }, [scriptPrompt, addToast]);

  // ===================== STYLES =====================
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=Barlow:ital,wght@0,300;0,400;0,700;1,300;1,700&display=swap');
    :root {
      --void: #060608; --deep: #0c0c10; --panel: #111116;
      --border: rgba(255,255,255,0.06); --border-active: rgba(139,92,246,0.5);
      --purple: #6B21A8; --purple-mid: #7C3AED; --purple-bright: #A78BFA;
      --silver: #94A3B8; --silver-bright: #CBD5E1; --text: #E2E8F0;
      --text-dim: #64748B; --red: #EF4444;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { background: var(--void); color: var(--text); font-family: 'Barlow', sans-serif; overflow-x: hidden; }
    body::before { content: ''; position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); pointer-events: none; z-index: 9998; opacity: 0.4; }
    .font-display { font-family: 'Bebas Neue', sans-serif; }
    .font-mono { font-family: 'DM Mono', monospace; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--void); }
    ::-webkit-scrollbar-thumb { background: var(--purple); border-radius: 2px; }
    @keyframes slideInRight { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes fadeUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes scanline { 0% { top: -10%; } 100% { top: 110%; } }
    @keyframes flicker { 0%,100%{opacity:1} 50%{opacity:0.97} 75%{opacity:0.99} }
    .fade-up { animation: fadeUp 0.5s ease both; }
    .animate-pulse { animation: pulse 2s ease-in-out infinite; }
    .animate-spin { animation: spin 1s linear infinite; }
    .animate-flicker { animation: flicker 4s ease-in-out infinite; }
    input[type=range] { -webkit-appearance: none; background: rgba(255,255,255,0.05); border-radius: 2px; height: 3px; }
    input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%; background: var(--purple-mid); border: 2px solid var(--purple-bright); cursor: pointer; }
    .panel { background: var(--panel); border: 1px solid var(--border); }
    .panel-active { border-color: var(--border-active); }
    .btn-primary { background: var(--purple); color: white; border: 1px solid rgba(139,92,246,0.3); font-family: 'DM Mono', monospace; font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.6rem 1.5rem; cursor: pointer; transition: all 0.15s; }
    .btn-primary:hover { background: var(--purple-mid); }
    .btn-secondary { background: transparent; color: var(--text-dim); border: 1px solid var(--border); font-family: 'DM Mono', monospace; font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.6rem 1.5rem; cursor: pointer; transition: all 0.15s; }
    .btn-secondary:hover { border-color: var(--purple-bright); color: var(--text); }
    .tool-card { background: var(--deep); border: 1px solid var(--border); padding: 0.75rem 1rem; cursor: pointer; transition: all 0.15s; text-align: left; }
    .tool-card:hover { border-color: rgba(139,92,246,0.4); background: rgba(107,33,168,0.1); }
    .track-bar { height: 28px; background: rgba(255,255,255,0.02); border: 1px solid var(--border); position: relative; overflow: hidden; }
    .timeline-clip { position: absolute; height: 100%; display: flex; align-items: center; padding: 0 0.5rem; font-family: 'DM Mono', monospace; font-size: 0.6rem; color: white; overflow: hidden; }
  `;

  const NAV_ITEMS = [
    { label: '01 — Home', p: 1 }, { label: '02 — About', p: 2 }, { label: '03 — Examples', p: 3 },
    { label: '04 — Login & Access', p: 4 }, { label: '05 — Writing Tools', p: 5 },
    { label: '06 — Voice Tools', p: 6 }, { label: '07 — Image Tools', p: 7 },
    { label: '08 — Video Tools', p: 8 }, { label: '09 — Motion Tools', p: 9 },
    { label: '10 — Enhancement', p: 10 }, { label: '11 — Upload Media', p: 11 },
    { label: '12 — Editor Suite', p: 12 }, { label: '13 — Timeline', p: 13 },
    { label: '14 — Enhancements', p: 14 }, { label: '15 — Audio Mixer', p: 15 },
    { label: '16 — Render', p: 16 }, { label: '17 — Preview', p: 17 },
    { label: '18 — Export', p: 18 }, { label: '19 — Tutorials', p: 19 },
    { label: '20 — Terms', p: 20 }, { label: '21 — Agent Grok', p: 21 },
    { label: '22 — Community', p: 22 }, { label: '23 — Thank You', p: 23 },
  ];

  const toolCategories = ['Writing', 'Voice', 'Image', 'Video', 'Motion', 'Enhancement'];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--void)', color: 'var(--text)', position: 'relative' }}>
      <style>{css}</style>
      <input ref={fileInputRef} type="file" multiple accept="video/*,audio/*,image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
      <input ref={exRef0} type="file" accept="video/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (!f) return; const u = URL.createObjectURL(f); setExVideos(prev => prev.map((v,i) => i===0 ? {...v, url:u, name:f.name} : v)); }} />
      <input ref={exRef1} type="file" accept="video/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (!f) return; const u = URL.createObjectURL(f); setExVideos(prev => prev.map((v,i) => i===1 ? {...v, url:u, name:f.name} : v)); }} />
      <input ref={exRef2} type="file" accept="video/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (!f) return; const u = URL.createObjectURL(f); setExVideos(prev => prev.map((v,i) => i===2 ? {...v, url:u, name:f.name} : v)); }} />

      <Toast toasts={toasts} removeToast={removeToast} />

      {page >= 5 && (
        <div style={{ position: 'fixed', bottom: '4rem', right: '1rem', zIndex: 100 }}>
          <div className="panel font-mono" style={{ padding: '0.3rem 0.75rem', fontSize: '0.9rem', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {autoSaveStatus === 'saving' && <><Loader size={10} className="animate-spin" style={{ color: '#facc15' }} /><span style={{ color: '#facc15' }}>SAVING</span></>}
            {autoSaveStatus === 'saved' && <><CheckCircle size={10} style={{ color: 'var(--purple-bright)' }} /><span style={{ color: 'var(--purple-bright)' }}>SAVED</span></>}
            {autoSaveStatus === 'idle' && lastSaved && <><span style={{ color: 'var(--text-dim)' }}>AUTOSAVE ON</span></>}
          </div>
        </div>
      )}

      <div style={{ position: 'fixed', top: '1.25rem', left: '1.25rem', zIndex: 1000 }}>
        <button onClick={() => setMenuOpen(!menuOpen)} className="btn-primary" style={{ padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
        {menuOpen && (
          <div className="panel" style={{ position: 'absolute', top: '3rem', left: 0, width: '240px', maxHeight: '80vh', overflowY: 'auto', padding: '1rem 0' }}>
            <div style={{ padding: '0.5rem 1rem 1rem', borderBottom: '1px solid var(--border)', marginBottom: '0.5rem' }}>
              <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.2em', color: 'var(--purple-bright)', marginBottom: '0.25rem' }}>✦ STUDIO PLAN — ADMIN</div>
              <div className="font-display" style={{ fontSize: '1rem', color: 'var(--purple-bright)' }}>MANDASTRONG</div>
            </div>
            {NAV_ITEMS.map(item => (
              <button key={item.p} onClick={() => goTo(item.p)} className="font-mono"
                style={{ display: 'block', width: '100%', padding: '0.5rem 1rem', textAlign: 'left', fontSize: '0.95rem', letterSpacing: '0.1em', background: page === item.p ? 'rgba(107,33,168,0.2)' : 'transparent', color: page === item.p ? 'var(--purple-bright)' : 'var(--text-dim)', border: 'none', cursor: 'pointer', borderLeft: page === item.p ? '2px solid var(--purple-bright)' : '2px solid transparent', transition: 'all 0.1s' }}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {page !== 21 && (
        <button onClick={() => goTo(21)} style={{ position: 'fixed', bottom: '4rem', left: '1.25rem', zIndex: 100, background: 'var(--purple)', border: '1px solid rgba(139,92,246,0.3)', color: 'white', width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <span className="font-display" style={{ fontSize: '1rem' }}>G</span>
        </button>
      )}

      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: 50, borderTop: '1px solid var(--border)', background: 'rgba(6,6,8,0.95)', padding: '0.4rem', textAlign: 'center' }}>
        <span className="font-mono" style={{ fontSize: '1rem', letterSpacing: '0.2em', color: 'var(--text-dim)' }}>
          MANDASTRONG STUDIO 2026 &nbsp;•&nbsp; PROFESSIONAL CINEMA SYNTHESIS &nbsp;•&nbsp; MandaStrong1.Etsy.com
        </span>
      </div>

      {page >= 1 && page < 23 && (
        <div style={{ position: 'fixed', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 100, display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => goTo(page - 1)} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><ChevronLeft size={12} /> BACK</button>
          <button onClick={() => goTo(page + 1)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>NEXT <ChevronRight size={12} /></button>
        </div>
      )}

      <main style={{ minHeight: '100vh', paddingBottom: '5rem' }}>

        {/* PAGE 1 — LANDING */}
        {page === 1 && (
          <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
            <video ref={oceanRef} autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18, pointerEvents: 'none' }}><source src={OCEAN_VIDEO} type="video/mp4" /></video>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,6,8,0.6), rgba(6,6,8,0.75))', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(139,92,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.04) 1px,transparent 1px)', backgroundSize: '80px 80px', pointerEvents: 'none' }} />
            <div className="font-mono fade-up" style={{ position: 'relative', fontSize: '0.95rem', letterSpacing: '0.4em', color: 'var(--purple-bright)', marginBottom: '2rem', opacity: 0.85 }}>CINEMA INTELLIGENCE PLATFORM — EST. 2026</div>
            <h1 className="font-display animate-flicker" style={{ position: 'relative', fontSize: 'clamp(5rem,16vw,13rem)', lineHeight: 0.85, letterSpacing: '-0.02em', color: 'white', marginBottom: '1rem', textShadow: '0 0 80px rgba(139,92,246,0.5)' }}>MANDA<br />STRONG<br />STUDIO</h1>
            <div style={{ position: 'relative', width: '100%', maxWidth: '600px', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(139,92,246,0.6),transparent)', margin: '2rem 0' }} />
            <p className="font-mono fade-up" style={{ position: 'relative', fontSize: '0.9rem', letterSpacing: '0.2em', color: 'var(--silver)', marginBottom: '0.5rem' }}>600+ AI TOOLS &nbsp;•&nbsp; 8K EXPORT &nbsp;•&nbsp; UP TO 3-HOUR FILMS</p>
            <p style={{ position: 'relative', fontSize: '1.1rem', fontWeight: 300, fontStyle: 'italic', color: 'var(--text-dim)', marginBottom: '0.75rem' }}>The All-In-One Professional AI Movie Creation Platform</p>
            <p style={{ position: 'relative', fontSize: '0.9rem', fontWeight: 600, color: 'var(--purple-bright)', marginBottom: '3rem', letterSpacing: '0.05em' }}>🎬 Special Offer: New Studio Plan Subscribers Receive 7-Day Free Trial</p>
            <div style={{ position: 'relative', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={() => goTo(5)} className="btn-primary" style={{ fontSize: '1rem', padding: '0.85rem 2.5rem', background: 'var(--purple-mid)' }}>✦ ENTER STUDIO</button>
              <button onClick={() => goTo(2)} className="btn-secondary" style={{ fontSize: '0.95rem', padding: '0.85rem 2.5rem' }}>ABOUT</button>
              <button onClick={() => goTo(4)} className="btn-secondary" style={{ fontSize: '0.95rem', padding: '0.85rem 2.5rem' }}>LOGIN / SUBSCRIBE</button>
            </div>
            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
              <div className="font-mono" style={{ fontSize: '1rem', letterSpacing: '0.2em', color: 'var(--text-dim)', textAlign: 'right' }}>
                <div style={{ color: 'var(--purple-bright)', marginBottom: '0.2rem' }}>● SYSTEM ONLINE</div>
                <div>BUILD 2026.03.05</div>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 2 — ABOUT */}
        {page === 2 && (
          <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem 8rem', position: 'relative', overflow: 'hidden' }}>
            <video ref={oceanRef} autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12, pointerEvents: 'none' }}><source src={OCEAN_VIDEO} type="video/mp4" /></video>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,6,8,0.7), rgba(6,6,8,0.85))', pointerEvents: 'none' }} />
            <div style={{ maxWidth: '900px', width: '100%', position: 'relative' }}>
              <div className="font-mono fade-up" style={{ fontSize: '0.9rem', letterSpacing: '0.3em', color: 'var(--purple-bright)', marginBottom: '1.5rem' }}>ABOUT THE PLATFORM</div>
              <h1 className="font-display fade-up" style={{ fontSize: 'clamp(3rem,10vw,8rem)', lineHeight: 0.85, marginBottom: '1.5rem' }}>MAKE AWESOME<br /><span style={{ color: 'var(--purple-bright)' }}>FAMILY MOVIES</span><br />OR TURN YOUR<br />DREAMS INTO REALITY</h1>
              <p style={{ fontSize: '1rem', fontWeight: 300, color: 'var(--silver)', lineHeight: 1.7, marginBottom: '3rem', maxWidth: '680px' }}>MandaStrong Studio combines the power of 600+ professional AI tools with an intuitive cinematic workspace — so anyone can create stunning short films, family videos, or feature-length productions up to 3 hours long. No film school required.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1px', background: 'var(--border)', marginTop: '1rem' }}>
                {[{ icon: Zap, label: '600+', sub: 'AI Tools Across 6 Categories' }, { icon: Monitor, label: '8K', sub: 'Cinema-Grade Export Quality' }, { icon: Clock, label: '3 Hours', sub: 'Maximum Film Duration' }, { icon: HardDrive, label: '1TB', sub: 'Cloud Storage on Studio Plan' }].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="panel" style={{ padding: '2rem', textAlign: 'center' }}>
                    <Icon size={24} style={{ color: 'var(--purple-bright)', marginBottom: '1rem' }} />
                    <div className="font-display" style={{ fontSize: '2.5rem', color: 'white', lineHeight: 1 }}>{label}</div>
                    <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-dim)', marginTop: '0.5rem' }}>{sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1px', background: 'var(--border)' }}>
                <div className="panel" style={{ padding: '1.5rem 2rem', borderLeft: 0, borderRight: 0 }}>
                  <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {['Writing & Script AI', 'Voice Synthesis', 'Image Generation', 'Video Production', 'Motion & VFX', 'AI Enhancement'].map(cat => (
                      <span key={cat} className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--purple-bright)', letterSpacing: '0.1em' }}>✦ {cat}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 3 — EXAMPLES */}
        {page === 3 && (
          <div style={{ minHeight: '100vh', padding: '5rem 2rem 8rem', maxWidth: '1400px', margin: '0 auto' }}>
            {exShowLogin && (
              <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <div className="panel" style={{ maxWidth: '380px', width: '100%', padding: '2.5rem', border: '1px solid rgba(139,92,246,0.4)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                    <Shield size={18} style={{ color: 'var(--purple-bright)' }} />
                    <div>
                      <div className="font-mono" style={{ fontSize: '1rem', letterSpacing: '0.2em', color: 'var(--text-dim)' }}>RESTRICTED ACCESS</div>
                      <div className="font-display" style={{ fontSize: '1.5rem' }}>ADMIN LOGIN</div>
                    </div>
                    <button onClick={() => { setExShowLogin(false); setExError(''); }} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}><X size={16} /></button>
                  </div>
                  <input type="email" value={exEmail} onChange={e => setExEmail(e.target.value)} placeholder="Admin email" style={{ display: 'block', width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.75rem 1rem', fontFamily: 'DM Mono', fontSize: '1rem', marginBottom: '0.75rem', outline: 'none' }} />
                  <input type="password" value={exPassword} onChange={e => setExPassword(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { if (exEmail === 'woolleya129@gmail.com' && exPassword === 'Mangler1970!!') { setExIsAdmin(true); setExShowLogin(false); setExError(''); setExEmail(''); setExPassword(''); addToast('Admin access granted', 'success'); } else { setExError('Invalid credentials'); } } }} placeholder="Admin password" style={{ display: 'block', width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.75rem 1rem', fontFamily: 'DM Mono', fontSize: '1rem', marginBottom: '0.5rem', outline: 'none' }} />
                  {exError && <div className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--red)', marginBottom: '0.5rem' }}>✕ {exError}</div>}
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
                    <button onClick={() => { setExShowLogin(false); setExError(''); }} className="btn-secondary" style={{ flex: 1 }}>CANCEL</button>
                    <button onClick={() => { if (exEmail === 'woolleya129@gmail.com' && exPassword === 'Mangler1970!!') { setExIsAdmin(true); setExShowLogin(false); setExError(''); setExEmail(''); setExPassword(''); addToast('Admin access granted', 'success'); } else { setExError('Invalid credentials'); } }} className="btn-primary" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                      <Lock size={12} /> ENTER ADMIN
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <div className="font-mono" style={{ fontSize: '1rem', letterSpacing: '0.4em', color: 'var(--purple-bright)', marginBottom: '0.5rem' }}>SHOWCASE</div>
                <h1 className="font-display" style={{ fontSize: 'clamp(3rem,8vw,7rem)', lineHeight: 0.85 }}>EXAMPLES MADE BY<br /><span style={{ color: 'var(--purple-bright)' }}>MANDASTRONG STUDIO</span></h1>
              </div>
            </div>
            <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(139,92,246,0.3),transparent)', marginBottom: '2rem' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.04)', marginBottom: '1px' }}>
              {[0, 1].map(i => (
                <div key={i} style={{ position: 'relative', aspectRatio: '16/9', background: '#000', border: `1px solid ${exActiveVideo === i ? 'rgba(139,92,246,0.7)' : 'rgba(255,255,255,0.06)'}`, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.15s' }} onClick={() => setExActiveVideo(exActiveVideo === i ? null : i)}>
                  <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', zIndex: 10, background: 'rgba(0,0,0,0.7)', padding: '0.3rem 0.75rem' }}>
                    <div className="font-mono" style={{ fontSize: '1rem', letterSpacing: '0.2em', color: exActiveVideo === i ? 'var(--purple-bright)' : 'rgba(255,255,255,0.4)' }}>VIEWER {String(i+1).padStart(2,'0')} — {exVideos[i].title.toUpperCase()}</div>
                    <div className="font-mono" style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.1rem' }}>{exVideos[i].desc}</div>
                  </div>
                  {exVideos[i].url ? (
                    <><video src={exVideos[i].url!} controls={exActiveVideo === i} autoPlay={exActiveVideo === i} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    {exIsAdmin && <button onClick={e => { e.stopPropagation(); exRefs[i].current?.click(); }} className="btn-primary" style={{ position: 'absolute', bottom: '0.75rem', right: '0.75rem', zIndex: 20, padding: '0.2rem 0.6rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Upload size={10} /> REPLACE</button>}</>
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', background: 'linear-gradient(135deg,rgba(107,33,168,0.12),#000)' }}>
                      <div className="font-mono" style={{ fontSize: '0.85rem', letterSpacing: '0.2em', color: 'rgba(167,139,250,0.7)' }}>AI RENDERING IN PROGRESS</div>
                      <div className="font-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.2)' }}>{exVideos[i].title.toUpperCase()}</div>
                      {exIsAdmin && <button onClick={e => { e.stopPropagation(); exRefs[i].current?.click(); }} className="btn-primary" style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Upload size={10} /> UPLOAD</button>}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ position: 'relative', height: '480px', background: '#000', border: `1px solid ${exActiveVideo === 2 ? 'rgba(139,92,246,0.7)' : 'rgba(255,255,255,0.06)'}`, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.15s', marginBottom: '2rem' }} onClick={() => setExActiveVideo(exActiveVideo === 2 ? null : 2)}>
              <div className="font-mono" style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', zIndex: 10, background: 'rgba(0,0,0,0.7)', padding: '0.2rem 0.6rem', fontSize: '1rem', letterSpacing: '0.2em', color: exActiveVideo === 2 ? 'var(--purple-bright)' : 'rgba(255,255,255,0.4)' }}>VIEWER 03 — FEATURE SHOWCASE — {exVideos[2].title.toUpperCase()}</div>
              {exVideos[2].url ? (
                <><video src={exVideos[2].url!} controls={exActiveVideo === 2} autoPlay={exActiveVideo === 2} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                {exIsAdmin && <button onClick={e => { e.stopPropagation(); exRefs[2].current?.click(); }} className="btn-primary" style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', zIndex: 20, padding: '0.3rem 0.75rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Upload size={10} /> REPLACE FEATURE</button>}</>
              ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', background: 'linear-gradient(135deg,rgba(107,33,168,0.1),#000)' }}>
                  <div className="font-display" style={{ fontSize: '2.5rem', color: 'rgba(167,139,250,0.4)', letterSpacing: '0.1em' }}>AI RENDERING</div>
                  <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.25em', color: 'rgba(167,139,250,0.5)' }}>HUMANITY OF AI — FEATURE CUT</div>
                  {exIsAdmin && <button onClick={e => { e.stopPropagation(); exRefs[2].current?.click(); }} className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.4rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem' }}><Upload size={12} /> UPLOAD</button>}
                </div>
              )}
            </div>
            <div className="panel" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div className="font-mono" style={{ fontSize: '1rem', letterSpacing: '0.2em', color: 'var(--text-dim)', marginBottom: '0.25rem' }}>READY TO CREATE YOUR OWN?</div>
                <div className="font-display" style={{ fontSize: '1.5rem' }}>START WITH 600+ AI TOOLS TODAY</div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => goTo(4)} className="btn-primary" style={{ padding: '0.65rem 1.5rem' }}>LOGIN / REGISTER</button>
                <button onClick={() => goTo(5)} className="btn-secondary" style={{ padding: '0.65rem 1.5rem' }}>BROWSE TOOLS →</button>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 4 — LOGIN / PRICING */}
        {page === 4 && (
          <div style={{ minHeight: '100vh', padding: '5rem 1.5rem 8rem', maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(90deg, rgba(107,33,168,0.3), rgba(139,92,246,0.15), rgba(107,33,168,0.3))', border: '1px solid rgba(139,92,246,0.5)', padding: '1rem 1.5rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', textAlign: 'center' }}>
              <span style={{ fontSize: '1.2rem' }}>🎬</span>
              <div><span className="font-display" style={{ fontSize: '1.25rem', color: 'white', letterSpacing: '0.05em' }}>SPECIAL OFFER</span><span style={{ color: 'var(--text-dim)', margin: '0 0.5rem' }}>—</span><span style={{ fontSize: '0.95rem', color: 'var(--purple-bright)', fontWeight: 600 }}>All New Studio Plan Subscribers Receive a 7-Day Free Trial</span></div>
              <span className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>NO CREDIT CARD REQUIRED TO START</span>
            </div>
            <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.3em', color: 'var(--purple-bright)', marginBottom: '1rem' }}>ACCESS PORTAL</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(3rem,8vw,6rem)', marginBottom: '3rem' }}>LOGIN & SUBSCRIBE</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1px', background: 'var(--border)', marginBottom: '4rem' }}>
              <div className="panel" style={{ padding: '2rem' }}>
                <div className="font-mono" style={{ fontSize: '0.95rem', letterSpacing: '0.2em', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>EXISTING USER</div>
                <h3 className="font-display" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>SIGN IN</h3>
                <label className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-dim)', display: 'block', marginBottom: '0.35rem' }}>EMAIL ADDRESS</label>
                <input type="email" placeholder="your@email.com" style={{ display: 'block', width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.75rem 1rem', fontFamily: 'DM Mono', fontSize: '0.9rem', marginBottom: '1rem', outline: 'none' }} onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.6)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'} />
                <label className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-dim)', display: 'block', marginBottom: '0.35rem' }}>PASSWORD</label>
                <input type="password" placeholder="Enter your password" style={{ display: 'block', width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.75rem 1rem', fontFamily: 'DM Mono', fontSize: '0.9rem', marginBottom: '0.5rem', outline: 'none' }} onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.6)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'} />
                <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}><button style={{ background: 'none', border: 'none', color: 'var(--purple-bright)', cursor: 'pointer', fontFamily: 'DM Mono', fontSize: '0.9rem' }}>Forgot password?</button></div>
                <button onClick={(e) => { const form = (e.target as HTMLElement).closest('.panel'); const emailInput = form?.querySelector('input[type="email"]') as HTMLInputElement; const passInput = form?.querySelector('input[type="password"]') as HTMLInputElement; const isAmanda = emailInput?.value === 'woolleya129@gmail.com' && passInput?.value === 'Mangler1970!!'; try { localStorage.setItem('ms_loggedin','1'); if (isAmanda) localStorage.setItem('ms_admin','1'); } catch {} if (isAmanda) setExIsAdmin(true); addToast(isAmanda ? 'Welcome Amanda — Admin access granted!' : 'Welcome back!', 'success'); setTimeout(() => goTo(5), 800); }} className="btn-primary" style={{ width: '100%', padding: '0.85rem' }}>SIGN IN TO STUDIO</button>
                <p style={{ textAlign: 'center', fontSize: '1rem', color: 'var(--text-dim)', marginTop: '1rem', fontStyle: 'italic' }}>Secured with 256-bit encryption</p>
              </div>
              <div className="panel" style={{ padding: '2rem', borderTop: '2px solid var(--purple-bright)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-0.75rem', left: '1.5rem', background: 'var(--purple)', padding: '0.15rem 0.75rem' }}><span className="font-mono" style={{ fontSize: '1rem', letterSpacing: '0.2em', color: 'white' }}>7-DAY FREE TRIAL</span></div>
                <div className="font-mono" style={{ fontSize: '0.95rem', letterSpacing: '0.2em', color: 'var(--text-dim)', marginBottom: '0.5rem', marginTop: '0.5rem' }}>NEW CREATOR</div>
                <h3 className="font-display" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>CREATE ACCOUNT</h3>
                <label className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-dim)', display: 'block', marginBottom: '0.35rem' }}>YOUR NAME</label>
                <input type="text" placeholder="Director / Creator Name" style={{ display: 'block', width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.75rem 1rem', fontFamily: 'DM Mono', fontSize: '0.9rem', marginBottom: '1rem', outline: 'none' }} onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.6)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'} />
                <label className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-dim)', display: 'block', marginBottom: '0.35rem' }}>EMAIL ADDRESS</label>
                <input type="email" placeholder="your@email.com" style={{ display: 'block', width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.75rem 1rem', fontFamily: 'DM Mono', fontSize: '0.9rem', marginBottom: '1rem', outline: 'none' }} onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.6)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'} />
                <label className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-dim)', display: 'block', marginBottom: '0.35rem' }}>CREATE PASSWORD</label>
                <input type="password" placeholder="Minimum 8 characters" style={{ display: 'block', width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.75rem 1rem', fontFamily: 'DM Mono', fontSize: '0.9rem', marginBottom: '1.5rem', outline: 'none' }} onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.6)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'} />
                <button onClick={() => { try { localStorage.setItem('ms_loggedin','1'); } catch {} addToast('Account created! Your 7-Day Free Trial begins now.', 'success'); setTimeout(() => goTo(5), 800); }} className="btn-primary" style={{ width: '100%', padding: '0.85rem' }}>START FREE TRIAL</button>
                <p style={{ textAlign: 'center', fontSize: '1rem', color: 'var(--text-dim)', marginTop: '1rem', fontStyle: 'italic' }}>No credit card needed · Cancel anytime</p>
              </div>
              <div className="panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <Eye size={32} style={{ color: 'var(--text-dim)', marginBottom: '1rem' }} />
                <div className="font-display" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>EXPLORE FIRST</div>
                <p style={{ fontSize: '1rem', color: 'var(--text-dim)', marginBottom: '0.75rem', lineHeight: 1.6 }}>Browse all 600+ AI tools and see the full platform before committing.</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--purple-bright)', marginBottom: '1.5rem', fontStyle: 'italic' }}>No account required</p>
                <button onClick={() => { try { localStorage.setItem('ms_loggedin','1'); } catch {} goTo(5); }} className="btn-primary" style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', background: 'var(--purple-mid)' }}>✦ ENTER APP — NO LOGIN NEEDED</button>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.3em', color: 'var(--text-dim)' }}>SUBSCRIPTION PLANS</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--purple-bright)', background: 'rgba(107,33,168,0.15)', border: '1px solid rgba(139,92,246,0.3)', padding: '0.2rem 0.6rem' }}>🎬 Studio Plan: 7-Day Free Trial Included</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1px', background: 'var(--border)' }}>
              {PLANS.map(plan => (
                <div key={plan.name} className="panel" style={{ padding: '2rem', position: 'relative', borderTop: plan.popular ? '2px solid var(--purple-bright)' : plan.name === 'Studio' ? '2px solid rgba(167,139,250,0.5)' : '2px solid transparent' }}>
                  {plan.popular && <div className="font-mono" style={{ position: 'absolute', top: '-0.75rem', left: '50%', transform: 'translateX(-50%)', background: 'var(--purple)', padding: '0.15rem 0.75rem', fontSize: '1rem', letterSpacing: '0.2em', color: 'white', whiteSpace: 'nowrap' }}>MOST POPULAR</div>}
                  {plan.name === 'Studio' && <div className="font-mono" style={{ position: 'absolute', top: '-0.75rem', left: '50%', transform: 'translateX(-50%)', background: 'rgba(107,33,168,0.8)', padding: '0.15rem 0.75rem', fontSize: '1rem', letterSpacing: '0.15em', color: 'white', whiteSpace: 'nowrap' }}>7-DAY FREE TRIAL</div>}
                  <div className="font-mono" style={{ fontSize: '0.95rem', letterSpacing: '0.2em', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>{plan.name.toUpperCase()} PLAN</div>
                  <div className="font-display" style={{ fontSize: '3rem', lineHeight: 1 }}>${plan.price}<span style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>/mo</span></div>
                  <p style={{ fontSize: '1rem', color: 'var(--text-dim)', margin: '0.5rem 0 1.5rem', fontStyle: 'italic' }}>{plan.name === 'Creator' ? 'Perfect for hobbyists & family films' : plan.name === 'Pro' ? 'For serious independent filmmakers' : 'Full professional production suite'}</p>
                  <div style={{ margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {plan.features.map(f => (<div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--text-dim)' }}><CheckCircle size={12} style={{ color: 'var(--purple-bright)', flexShrink: 0 }} /> {f}</div>))}
                    {plan.name === 'Studio' && (<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--purple-bright)', fontWeight: 600 }}><Zap size={12} style={{ flexShrink: 0 }} /> 7-Day Free Trial Included</div>)}
                  </div>
                  <a href={plan.stripe} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', padding: '0.85rem' }}>{plan.name === 'Studio' ? 'START FREE TRIAL' : 'SUBSCRIBE NOW'}</a>
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', fontSize: '1rem', color: 'var(--text-dim)', marginTop: '1.5rem', fontStyle: 'italic' }}>All plans include a 30-day money-back guarantee · Secure checkout via Stripe</p>
          </div>
        )}

        {/* PAGES 5–10 — AI TOOL BOARDS */}
        {page >= 5 && page <= 10 && (() => {
          const cat = toolCategories[page - 5];
          const allTools = AI_TOOLS[cat] || [];
          const filtered = toolSearch.trim() ? allTools.filter(t => t.toLowerCase().includes(toolSearch.toLowerCase())) : allTools;
          const catIcons: Record<string, any> = { Writing: BookOpen, Voice: Mic, Image: Camera, Video: Film, Motion: Activity, Enhancement: Sparkles };
          const CatIcon = catIcons[cat] || Zap;
          return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '4rem', paddingBottom: '6rem' }}>
              <div className="panel" style={{ padding: '1.5rem 2rem', borderLeft: 0, borderRight: 0, borderTop: 0, marginBottom: '1px', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CatIcon size={20} style={{ color: 'var(--purple-bright)' }} />
                  <div className="font-display" style={{ fontSize: '2.5rem', lineHeight: 1 }}>{cat.toUpperCase()} TOOLS</div>
                </div>
                <div style={{ display: 'flex', gap: '1px', background: 'var(--border)', marginLeft: 'auto', flexWrap: 'wrap' }}>
                  {toolCategories.map((c, i) => (
                    <button key={c} onClick={() => goTo(5 + i)} className="font-mono" style={{ padding: '0.4rem 0.75rem', fontSize: '0.9rem', letterSpacing: '0.1em', background: c === cat ? 'var(--purple)' : 'var(--panel)', color: c === cat ? 'white' : 'var(--text-dim)', border: 'none', cursor: 'pointer' }}>{c.slice(0, 3).toUpperCase()}</button>
                  ))}
                </div>
                <div style={{ position: 'relative' }}>
                  <Search size={12} style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input type="text" value={toolSearch} onChange={e => setToolSearch(e.target.value)} placeholder={`Search ${filtered.length} tools...`} className="font-mono" style={{ background: 'var(--deep)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.4rem 0.5rem 0.4rem 2rem', fontSize: '0.95rem', width: '200px', outline: 'none' }} />
                </div>
                <div className="font-mono" style={{ fontSize: '1.1rem', color: 'var(--purple-bright)' }}>{filtered.length} TOOLS</div>
              </div>

              {cat === 'Writing' && (
                <div className="panel" style={{ margin: '1px 0', padding: '1.5rem 2rem', borderLeft: 0, borderRight: 0, background: 'rgba(107,33,168,0.08)', borderColor: 'rgba(139,92,246,0.3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <Sparkles size={16} style={{ color: 'var(--purple-bright)' }} />
                    <div className="font-display" style={{ fontSize: '1.5rem' }}>AI SCRIPT WRITER — POWERED BY CLAUDE</div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <textarea
                      value={scriptPrompt}
                      onChange={e => setScriptPrompt(e.target.value)}
                      placeholder="Describe your film idea, story, or what you want written... e.g. 'A short film about a girl who discovers her grandmother was a spy'"
                      style={{ flex: 1, minWidth: '260px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.75rem 1rem', fontFamily: 'Barlow', fontSize: '1rem', height: '80px', resize: 'none', outline: 'none' }}
                    />
                    <button onClick={handleScriptGenerate} disabled={!scriptPrompt.trim() || scriptGenerating} className="btn-primary"
                      style={{ alignSelf: 'flex-end', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: (!scriptPrompt.trim() || scriptGenerating) ? 0.4 : 1 }}>
                      {scriptGenerating ? <><Loader size={14} className="animate-spin" /> WRITING...</> : <><Zap size={14} /> GENERATE SCRIPT</>}
                    </button>
                  </div>
                  {scriptResult && (
                    <div style={{ marginTop: '1rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(139,92,246,0.3)', padding: '1rem', maxHeight: '300px', overflowY: 'auto' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <div className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--purple-bright)', letterSpacing: '0.1em' }}>✦ GENERATED SCRIPT</div>
                        <button onClick={() => { navigator.clipboard?.writeText(scriptResult); addToast('Script copied!', 'success'); }} className="btn-secondary" style={{ padding: '0.2rem 0.6rem', fontSize: '0.8rem' }}>COPY</button>
                      </div>
                      <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'DM Mono', fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.6 }}>{scriptResult}</pre>
                    </div>
                  )}
                </div>
              )}

              <div style={{ flex: 1, overflowY: 'auto', padding: '2px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', background: 'rgba(139,92,246,0.15)' }}>
                  {filtered.map((tool, i) => (
                    <button key={i} onClick={() => setSelectedTool(tool)}
                      style={{ background: '#0c0c10', padding: '1.5rem 1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '90px', border: '1px solid rgba(139,92,246,0.2)', transition: 'all 0.15s', cursor: 'pointer', textAlign: 'left', gap: '0.5rem' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(107,33,168,0.2)'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.7)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#0c0c10'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.2)'; }}>
                      <span style={{ fontSize: '1.35rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.35, letterSpacing: '0.01em' }}>{tool}</span>
                      <span style={{ color: 'rgba(167,139,250,0.5)', fontSize: '1.3rem', flexShrink: 0 }}>›</span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedTool && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                  <div className="panel" style={{ maxWidth: '600px', width: '100%', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                      <div>
                        <div className="font-mono" style={{ fontSize: '1rem', letterSpacing: '0.2em', color: 'var(--purple-bright)', marginBottom: '0.25rem' }}>{cat.toUpperCase()} TOOL</div>
                        <h2 className="font-display" style={{ fontSize: '2rem' }}>{selectedTool}</h2>
                      </div>
                      <button onClick={() => { setSelectedTool(null); setAiPrompt(''); }} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text-dim)', padding: '0.3rem', cursor: 'pointer' }}><X size={16} /></button>
                    </div>
                    {TOOL_DESC[selectedTool] && (
                      <div style={{ marginBottom: '1.25rem', padding: '0.75rem 1rem', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}>
                        <p style={{ fontSize: '1rem', color: '#CBD5E1', lineHeight: 1.6, fontStyle: 'italic' }}>{TOOL_DESC[selectedTool]}</p>
                      </div>
                    )}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '1.25rem' }}>
                      <button onClick={() => fileInputRef.current?.click()} style={{ background: 'rgba(107,33,168,0.3)', border: '1px solid rgba(139,92,246,0.5)', color: '#E2E8F0', padding: '0.75rem 0.5rem', cursor: 'pointer', fontFamily: 'DM Mono', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>↑ UPLOAD</button>
                      <button onClick={() => setAiPrompt('')} style={{ background: 'rgba(107,33,168,0.3)', border: '1px solid rgba(139,92,246,0.5)', color: '#E2E8F0', padding: '0.75rem 0.5rem', cursor: 'pointer', fontFamily: 'DM Mono', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>✎ PASTE</button>
                      <button onClick={handleAIGenerate} style={{ background: 'rgba(107,33,168,0.8)', border: '1px solid rgba(167,139,250,0.8)', color: '#FFFFFF', padding: '0.75rem 0.5rem', cursor: 'pointer', fontFamily: 'DM Mono', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>✦ AI CREATE</button>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>UPLOAD SOURCE MEDIA</div>
                      <button onClick={() => fileInputRef.current?.click()} style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(139,92,246,0.3)', color: 'var(--text-dim)', padding: '1rem', cursor: 'pointer', fontFamily: 'DM Mono', fontSize: '0.95rem', letterSpacing: '0.1em' }}>+ BROWSE FILES / UPLOAD OWN VOICE</button>
                    </div>
                    {(cat === 'Voice' || selectedTool === 'Text to Speech') && (
                      <div style={{ marginBottom: '1rem' }}>
                        <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>STOCK VOICES — SELECT & PREVIEW</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                          {STOCK_VOICES.map(v => (
                            <div key={v.name} onClick={() => setSelectedVoice(v.name)} style={{ padding: '0.65rem 0.75rem', background: selectedVoice === v.name ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.02)', border: `1px solid ${selectedVoice === v.name ? 'rgba(139,92,246,0.6)' : 'var(--border)'}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                              <div><div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>{v.name}</div><div className="font-mono" style={{ fontSize: '0.5rem', color: 'var(--text-dim)' }}>{v.style} · {v.accent}</div></div>
                              <button onClick={e => { e.stopPropagation(); const a = new Audio(v.url); setPlayingVoice(v.name); a.play(); a.onended = () => setPlayingVoice(null); }} style={{ background: 'var(--purple)', border: 'none', color: 'white', padding: '0.3rem 0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'DM Mono' }}>{playingVoice === v.name ? '■' : '▶'}</button>
                            </div>
                          ))}
                        </div>
                        {selectedVoice && <div className="font-mono" style={{ fontSize: '1rem', color: 'var(--purple-bright)', marginTop: '0.4rem' }}>✓ {selectedVoice} selected as voice</div>}
                      </div>
                    )}
                    <div style={{ marginBottom: '1rem' }}>
                      <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>AI GENERATION PROMPT</div>
                      <textarea value={aiPrompt} onChange={e => { setAiPrompt(e.target.value); try { localStorage.setItem('ms_draft', e.target.value); } catch {} }} placeholder={`Describe what you want to generate with ${selectedTool}...`} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.75rem 1rem', fontFamily: 'Barlow', fontSize: '1rem', height: '100px', resize: 'none', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => { setSelectedTool(null); setAiPrompt(''); }} className="btn-secondary" style={{ flex: 1, padding: '0.75rem' }}>CANCEL</button>
                      <button onClick={handleAIGenerate} disabled={!aiPrompt.trim() || generating} className="btn-primary" style={{ flex: 2, padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: (!aiPrompt.trim() || generating) ? 0.4 : 1 }}>
                        {generating ? <><Loader size={14} className="animate-spin" /> GENERATING...</> : <><Zap size={14} /> GENERATE & SAVE</>}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* PAGE 11 — UPLOAD MEDIA */}
        {page === 11 && (
          <div style={{ minHeight: '100vh', padding: '5rem 2rem 8rem', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.3em', color: 'var(--purple-bright)', marginBottom: '0.75rem' }}>ASSET INGESTION</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(3rem,8vw,6rem)', marginBottom: '0.5rem' }}>UPLOAD MEDIA</h1>
            <p className="font-mono" style={{ fontSize: '0.95rem', color: 'var(--text-dim)', marginBottom: '3rem', letterSpacing: '0.1em' }}>{mediaLibrary.length} ASSETS IN LIBRARY</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1px', background: 'var(--border)', marginBottom: '3rem' }}>
              {[
                { icon: Upload, label: 'BROWSE FILES', sub: 'Video • Audio • Images', action: () => fileInputRef.current?.click(), color: 'var(--purple-bright)' },
                { icon: FileVideo, label: isRecording ? 'STOP RECORDING' : 'RECORD SCREEN', sub: isRecording ? 'Click to stop & save' : 'Capture your screen live', action: () => isRecording ? stopScreenRecord() : startScreenRecord(), color: isRecording ? '#EF4444' : 'var(--silver)' },
                { icon: Globe, label: 'IMPORT FROM URL', sub: 'Direct video link', action: () => setShowUrlImport(true), color: 'var(--silver)' },
              ].map(({ icon: Icon, label, sub, action, color }) => (
                <div key={label} onClick={action} style={{ padding: '2.5rem', textAlign: 'center', cursor: 'pointer', background: 'var(--panel)', transition: 'all 0.15s' }} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(107,33,168,0.1)')} onMouseLeave={e => (e.currentTarget.style.background = 'var(--panel)')}>
                  <Icon size={32} style={{ color, marginBottom: '1rem' }} />
                  <div className="font-mono" style={{ fontSize: '1rem', letterSpacing: '0.15em', color: 'var(--text)', marginBottom: '0.3rem' }}>{label}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>{sub}</div>
                </div>
              ))}
            </div>
            {showUrlImport && (
              <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <div className="panel" style={{ maxWidth: '500px', width: '100%', padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div className="font-display" style={{ fontSize: '1.5rem' }}>IMPORT FROM URL</div>
                    <button onClick={() => setShowUrlImport(false)} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text-dim)', padding: '0.3rem', cursor: 'pointer' }}><X size={14} /></button>
                  </div>
                  <input type="url" value={importUrl} onChange={e => setImportUrl(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleImportUrl()} placeholder="https://example.com/video.mp4" style={{ display: 'block', width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.75rem 1rem', fontFamily: 'DM Mono', fontSize: '0.9rem', marginBottom: '1.5rem', outline: 'none' }} />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => setShowUrlImport(false)} className="btn-secondary" style={{ flex: 1 }}>CANCEL</button>
                    <button onClick={handleImportUrl} className="btn-primary" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><Globe size={14} /> IMPORT VIDEO</button>
                  </div>
                </div>
              </div>
            )}
            {uploadProgress !== null && (
              <div className="panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="font-mono" style={{ fontSize: '0.95rem', color: 'var(--text-dim)' }}>UPLOADING...</span>
                  <span className="font-mono" style={{ fontSize: '0.95rem', color: 'var(--purple-bright)' }}>{uploadProgress}%</span>
                </div>
                <div style={{ height: '2px', background: 'rgba(255,255,255,0.05)' }}>
                  <div style={{ height: '100%', background: 'var(--purple-mid)', width: `${uploadProgress}%`, transition: 'width 0.3s' }} />
                </div>
              </div>
            )}
            {mediaLibrary.length > 0 && (
              <div>
                <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.2em', color: 'var(--text-dim)', marginBottom: '1rem' }}>MEDIA LIBRARY</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
                  {mediaLibrary.map(asset => (
                    <div key={asset.id} className="panel" style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <FileVideo size={14} style={{ color: 'var(--purple-bright)', flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.95rem', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{asset.name}</div>
                        <div className="font-mono" style={{ fontSize: '1rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>{asset.type.toUpperCase()} • {asset.size}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => { setTimeline(prev => ({ ...prev, video: [...prev.video, asset] })); addToast('Added to timeline', 'success'); }} className="btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '1rem' }}>+ TIMELINE</button>
                        <button onClick={() => setMediaLibrary(prev => prev.filter(a => a.id !== asset.id))} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text-dim)', padding: '0.2rem 0.4rem', cursor: 'pointer' }}><Trash2 size={10} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PAGE 12 — EDITOR SUITE */}
        {page === 12 && (
          <div style={{ minHeight: '100vh', padding: '5rem 2rem 8rem', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.3em', color: 'var(--purple-bright)', marginBottom: '0.75rem' }}>PRODUCTION HUB</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(3rem,8vw,6rem)', marginBottom: '3rem' }}>EDITOR SUITE</h1>
            <div className="panel" style={{ padding: '2rem', marginBottom: '1px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.2em', color: 'var(--text-dim)' }}>MOVIE DURATION</div>
                <div className="font-display" style={{ fontSize: '3rem', color: 'var(--purple-bright)', lineHeight: 1 }}>{duration} <span style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>MIN</span></div>
              </div>
              <input type="range" min="0" max="180" value={duration} onChange={e => setDuration(Number(e.target.value))} style={{ width: '100%', marginBottom: '0.75rem' }} />
              <div style={{ display: 'flex', gap: '1px', background: 'var(--border)' }}>
                {[30, 60, 90, 120, 180].map(m => (
                  <button key={m} onClick={() => setDuration(m)} className="font-mono" style={{ flex: 1, padding: '0.4rem', fontSize: '0.9rem', background: duration === m ? 'var(--purple)' : 'var(--deep)', color: duration === m ? 'white' : 'var(--text-dim)', border: 'none', cursor: 'pointer' }}>{m}m</button>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1px', background: 'var(--border)' }}>
              {[
                { icon: Database, label: 'MEDIA LIBRARY', sub: `${mediaLibrary.length} assets`, p: 11 },
                { icon: Layers, label: 'TIMELINE EDITOR', sub: 'Multi-track editing', p: 13 },
                { icon: Wand2, label: 'ENHANCEMENT STUDIO', sub: '60+ tools', p: 14 },
                { icon: Volume2, label: 'AUDIO MIXER', sub: '4-channel mixing', p: 15 },
                { icon: Zap, label: 'RENDER ENGINE', sub: 'Up to 8K output', p: 16 },
                { icon: Eye, label: 'PREVIEW PLAYER', sub: 'Full-screen playback', p: 17 },
              ].map(({ icon: Icon, label, sub, p }) => (
                <button key={label} onClick={() => goTo(p)} className="panel" style={{ padding: '1.5rem', textAlign: 'left', border: '1px solid var(--border)', cursor: 'pointer', background: 'var(--panel)', transition: 'all 0.15s' }} onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)')} onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  <Icon size={20} style={{ color: 'var(--purple-bright)', marginBottom: '0.75rem' }} />
                  <div className="font-mono" style={{ fontSize: '0.95rem', letterSpacing: '0.1em', color: 'var(--text)', marginBottom: '0.2rem' }}>{label}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>{sub}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 13 — TIMELINE */}
        {page === 13 && (
          <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '4rem', paddingBottom: '5rem' }}>
            <div className="panel" style={{ padding: '1rem 1.5rem', borderLeft: 0, borderRight: 0, borderTop: 0, display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="font-display" style={{ fontSize: '1.5rem' }}>TIMELINE EDITOR</div>
              <div className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginLeft: 'auto' }}>{duration} MIN PROJECT</div>
            </div>
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
              <div className="panel" style={{ width: '200px', flexShrink: 0, overflowY: 'auto', borderTop: 0, borderBottom: 0, padding: '1rem' }}>
                <div className="font-mono" style={{ fontSize: '1rem', letterSpacing: '0.15em', color: 'var(--text-dim)', marginBottom: '0.75rem' }}>MEDIA POOL</div>
                {mediaLibrary.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <Film size={16} style={{ color: 'var(--text-dim)', marginBottom: '0.4rem' }} />
                    <div style={{ fontSize: '0.95rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>Upload media first</div>
                    <button onClick={() => goTo(11)} className="btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '1rem' }}>UPLOAD</button>
                  </div>
                ) : mediaLibrary.map(asset => (
                  <div key={asset.id} draggable onDragStart={() => setDraggedItem(asset)} style={{ padding: '0.5rem', marginBottom: '1px', background: 'var(--deep)', border: '1px solid var(--border)', cursor: 'grab', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <FileVideo size={10} style={{ color: 'var(--purple-bright)', flexShrink: 0 }} />
                    <div style={{ fontSize: '0.9rem', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{asset.name}</div>
                  </div>
                ))}
              </div>
              <div style={{ flex: 1, overflowX: 'auto', padding: '1rem' }}>
                {(['video', 'audio', 'text'] as const).map(track => (
                  <div key={track} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="font-mono" style={{ width: '50px', fontSize: '1rem', letterSpacing: '0.1em', color: 'var(--text-dim)', flexShrink: 0 }}>{track.toUpperCase()}</div>
                    <div className="track-bar" style={{ flex: 1 }} onDragOver={e => e.preventDefault()} onDrop={() => { if (draggedItem) { setTimeline(prev => ({ ...prev, [track]: [...prev[track], { ...draggedItem }] })); setDraggedItem(null); addToast(`Added to ${track} track`, 'success'); } }}>
                      {timeline[track].map((clip, i) => (
                        <div key={i} className="timeline-clip" style={{ left: `${i * 12}%`, width: '100px', background: track === 'video' ? 'rgba(107,33,168,0.6)' : track === 'audio' ? 'rgba(16,185,129,0.6)' : 'rgba(245,158,11,0.6)', borderRight: '1px solid rgba(255,255,255,0.1)' }}>{clip.name.slice(0, 12)}</div>
                      ))}
                      {timeline[track].length === 0 && (
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span className="font-mono" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.1)', letterSpacing: '0.2em' }}>DROP CLIPS HERE</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: '2rem' }}>
                  <button onClick={() => { goTo(16); setTimeout(() => handleRender(), 300); }} className="btn-primary" style={{ marginRight: '0.5rem' }}>→ RENDER</button>
                  <button onClick={() => { setTimeline({ video: [], audio: [], text: [] }); addToast('Timeline cleared', 'warning'); }} className="btn-secondary">CLEAR ALL</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 14 — ENHANCEMENT STUDIO */}
        {page === 14 && (
          <div style={{ minHeight: '100vh', padding: '5rem 2rem 8rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.3em', color: 'var(--purple-bright)', marginBottom: '0.75rem' }}>NEURAL OPTIMIZATION</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(3rem,8vw,6rem)', marginBottom: '0.5rem' }}>ENHANCEMENT STUDIO</h1>
            <p className="font-mono" style={{ fontSize: '0.95rem', color: 'var(--text-dim)', marginBottom: '2.5rem', letterSpacing: '0.1em' }}>{AI_TOOLS.Enhancement.length} PROFESSIONAL TOOLS</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '1px', background: 'var(--border)', marginBottom: '2rem' }}>
              {AI_TOOLS.Enhancement.map((tool, i) => (
                <button key={i} onClick={() => setSelectedEnhancement(tool)} className="tool-card" style={{ minHeight: '60px' }}>
                  <Wand2 size={10} style={{ color: 'var(--purple-bright)', marginBottom: '0.3rem' }} />
                  <div style={{ fontSize: '1rem', color: 'var(--text)', lineHeight: 1.2 }}>{tool}</div>
                </button>
              ))}
            </div>
            {selectedEnhancement && (
              <div className="panel panel-active" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div className="font-display" style={{ fontSize: '1.5rem', color: 'var(--purple-bright)' }}>{selectedEnhancement}</div>
                  <button onClick={() => setSelectedEnhancement(null)} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text-dim)', padding: '0.25rem 0.5rem', cursor: 'pointer' }}><X size={14} /></button>
                </div>
                {Object.entries(enhancementSettings).map(([key, value]) => (
                  <div key={key} style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <span className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{key}</span>
                      <span className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--purple-bright)' }}>{value}%</span>
                    </div>
                    <input type="range" min="0" max="100" value={value} onChange={e => setEnhancementSettings(prev => ({ ...prev, [key]: Number(e.target.value) }))} style={{ width: '100%' }} />
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                  <button onClick={() => { addToast(`Applying ${selectedEnhancement}...`, 'info'); setTimeout(() => { setSelectedEnhancement(null); addToast('Enhancement applied!', 'success'); }, 2000); }} className="btn-primary" style={{ flex: 2, padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><CheckCircle size={14} /> APPLY ENHANCEMENT</button>
                  <button onClick={() => setEnhancementSettings({ intensity: 75, clarity: 80, color: 70, brightness: 65 })} className="btn-secondary" style={{ flex: 1, padding: '0.75rem' }}>RESET</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PAGE 15 — AUDIO MIXER */}
        {page === 15 && (
          <div style={{ minHeight: '100vh', padding: '5rem 2rem 8rem', maxWidth: '900px', margin: '0 auto' }}>
            <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.3em', color: 'var(--purple-bright)', marginBottom: '0.75rem' }}>MIXING CONSOLE</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(3rem,8vw,6rem)', marginBottom: '3rem' }}>AUDIO MIXER</h1>
            <div className="panel" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem' }}>
                {[{ key: 'music', label: 'MUSIC', color: '#8B5CF6' }, { key: 'voice', label: 'VOICE', color: '#A78BFA' }, { key: 'sfx', label: 'SFX', color: '#F59E0B' }, { key: 'master', label: 'MASTER', color: '#EF4444' }].map(ch => (
                  <div key={ch.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.15em', color: 'var(--text-dim)' }}>{ch.label}</div>
                    <div style={{ width: '24px', height: '140px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                      <div style={{ width: '100%', background: `linear-gradient(to top, ${ch.color}, ${ch.color}aa)`, height: `${audioLevels[ch.key as keyof typeof audioLevels]}%`, transition: 'height 0.1s' }} />
                    </div>
                    <input type="range" min="0" max="100" value={audioLevels[ch.key as keyof typeof audioLevels]} onChange={e => setAudioLevels(prev => ({ ...prev, [ch.key]: Number(e.target.value) }))} style={{ writingMode: 'vertical-lr', direction: 'rtl', width: '30px', height: '120px', cursor: 'pointer' }} />
                    <div className="font-display" style={{ fontSize: '1.5rem', color: ch.color }}>{audioLevels[ch.key as keyof typeof audioLevels]}</div>
                    <div className="font-mono" style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>%</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                <button onClick={() => { setAudioLevels({ music: 75, voice: 60, sfx: 50, master: 85 }); addToast('Levels reset', 'info'); }} className="btn-secondary" style={{ flex: 1, padding: '0.65rem' }}>RESET LEVELS</button>
                <button onClick={() => addToast('Audio preset saved!', 'success')} className="btn-primary" style={{ flex: 1, padding: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}><Save size={12} /> SAVE PRESET</button>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 16 — RENDER */}
        {page === 16 && (
          <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 2rem' }}>
            <div style={{ maxWidth: '700px', width: '100%' }}>
              <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.3em', color: 'var(--purple-bright)', marginBottom: '0.75rem' }}>FINAL OUTPUT</div>
              <h1 className="font-display" style={{ fontSize: 'clamp(3rem,8vw,6rem)', marginBottom: '2rem' }}>RENDER FILM</h1>
              <div className="panel" style={{ padding: '2.5rem', marginBottom: '1px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div>
                    <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>EXPORT QUALITY</div>
                    <select value={exportSettings.quality} onChange={e => setExportSettings(p => ({ ...p, quality: e.target.value }))} style={{ width: '100%', background: 'var(--deep)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.6rem 0.75rem', fontFamily: 'DM Mono', fontSize: '1rem', outline: 'none' }}>
                      <option value="8K">8K — 4320p</option><option value="4K">4K — 2160p</option><option value="1080p">HD — 1080p</option><option value="720p">SD — 720p</option>
                    </select>
                  </div>
                  <div>
                    <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>FORMAT</div>
                    <select value={exportSettings.format} onChange={e => setExportSettings(p => ({ ...p, format: e.target.value }))} style={{ width: '100%', background: 'var(--deep)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.6rem 0.75rem', fontFamily: 'DM Mono', fontSize: '1rem', outline: 'none' }}>
                      <option>MP4</option><option>MOV</option><option>AVI</option><option>WebM</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'var(--border)', marginBottom: '2rem' }}>
                  {[{ label: 'DURATION', value: `${duration} MIN` }, { label: 'VIDEO CLIPS', value: timeline.video.length }, { label: 'AUDIO TRACKS', value: timeline.audio.length }].map(({ label, value }) => (
                    <div key={label} className="panel" style={{ padding: '1rem', textAlign: 'center' }}>
                      <div className="font-mono" style={{ fontSize: '1rem', color: 'var(--text-dim)', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>{label}</div>
                      <div className="font-display" style={{ fontSize: '1.8rem', color: 'var(--purple-bright)' }}>{value}</div>
                    </div>
                  ))}
                </div>
                {rendering ? (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span className="font-mono" style={{ fontSize: '0.95rem', color: 'var(--text-dim)' }}>RENDERING {exportSettings.quality} {exportSettings.format}...</span>
                      <span className="font-mono" style={{ fontSize: '0.95rem', color: 'var(--purple-bright)' }}>{renderProgress}%</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', marginBottom: '0.5rem' }}>
                      <div style={{ height: '100%', background: 'linear-gradient(90deg,var(--purple),var(--purple-bright))', width: `${renderProgress}%`, transition: 'width 0.3s', boxShadow: '0 0 10px var(--purple)' }} />
                    </div>
                    <div className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--text-dim)', textAlign: 'center' }}>Processing {duration} minutes of cinema...</div>
                  </div>
                ) : (
                  <button onClick={handleRender} className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><Zap size={16} /> START RENDER — {exportSettings.quality} {exportSettings.format}</button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PAGE 17 — PREVIEW */}
        {page === 17 && (
          <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '4rem', paddingBottom: '5rem' }}>
            <div className="panel" style={{ padding: '1rem 1.5rem', borderLeft: 0, borderRight: 0, borderTop: 0, display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="font-display" style={{ fontSize: '1.5rem' }}>PREVIEW PLAYER</div>
              {currentVideo && <div className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--purple-bright)' }}>● {currentVideo.name}</div>}
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', position: 'relative' }}>
              {currentVideo ? (
                <video controls style={{ maxWidth: '100%', maxHeight: '100%' }} src={currentVideo.url} />
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <Play size={48} style={{ color: 'rgba(139,92,246,0.3)', marginBottom: '1rem' }} />
                  <div className="font-mono" style={{ fontSize: '1rem', color: 'var(--text-dim)', letterSpacing: '0.2em' }}>NO RENDER AVAILABLE</div>
                  <button onClick={() => goTo(16)} className="btn-primary" style={{ marginTop: '1.5rem' }}>GO TO RENDER</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PAGE 18 — EXPORT */}
        {page === 18 && (
          <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 2rem' }}>
            <div style={{ maxWidth: '700px', width: '100%' }}>
              <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.3em', color: 'var(--purple-bright)', marginBottom: '0.75rem' }}>DISTRIBUTION</div>
              <h1 className="font-display" style={{ fontSize: 'clamp(3rem,8vw,6rem)', marginBottom: '2rem' }}>EXPORT</h1>
              {currentVideo ? (
                <div className="panel" style={{ padding: '2rem', marginBottom: '1rem', borderColor: 'rgba(16,185,129,0.3)' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <CheckCircle size={24} style={{ color: 'var(--purple-bright)', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>{currentVideo.name}</div>
                      <div className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>{currentVideo.size} • {exportSettings.quality} • {exportSettings.format} • READY</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="panel" style={{ padding: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
                  <div className="font-mono" style={{ fontSize: '0.95rem', color: 'var(--text-dim)' }}>No film rendered yet — <button onClick={() => goTo(16)} style={{ background: 'none', border: 'none', color: 'var(--purple-bright)', cursor: 'pointer', fontFamily: 'DM Mono', fontSize: '0.95rem' }}>go to Render Engine →</button></div>
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
                {[
                  { icon: Download, label: 'DOWNLOAD TO DEVICE', color: 'var(--purple)', action: () => { if (currentVideo) { const a = document.createElement('a'); a.href = currentVideo.url; a.download = currentVideo.name; a.click(); addToast('Download started!', 'success'); } else addToast('No render available', 'error'); } },
                  { icon: Save, label: 'SAVE PROJECT FILE', color: '#A78BFA', action: () => { const projectData = { mediaLibrary, timeline, audioLevels, duration, exportSettings, savedAt: new Date().toISOString() }; const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `MandaStrong_Project_${Date.now()}.json`; a.click(); addToast('Project file downloaded!', 'success'); } },
                  { icon: Share2, label: 'SHARE TO COMMUNITY HUB', color: '#3B82F6', action: () => { addToast('Shared to Community!', 'success'); setTimeout(() => goTo(22), 800); } },
                ].map(({ icon: Icon, label, color, action }) => (
                  <button key={label} onClick={action} className="panel" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid var(--border)', cursor: 'pointer', background: 'var(--panel)', transition: 'all 0.15s', opacity: currentVideo ? 1 : 0.4 }}>
                    <Icon size={18} style={{ color }} />
                    <span className="font-mono" style={{ fontSize: '1rem', letterSpacing: '0.1em' }}>{label}</span>
                    <ChevronRight size={14} style={{ color: 'var(--text-dim)', marginLeft: 'auto' }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PAGE 19 — TUTORIALS */}
        {page === 19 && (
          <div style={{ minHeight: '100vh', padding: '5rem 2rem 8rem', maxWidth: '900px', margin: '0 auto' }}>
            <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.3em', color: 'var(--purple-bright)', marginBottom: '0.75rem' }}>LEARNING CENTER</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(3rem,8vw,6rem)', marginBottom: '3rem' }}>TUTORIALS</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
              {[
                { title: 'Getting Started — Platform Overview', time: '5:30', level: 'BEGINNER', url: 'https://www.youtube.com/results?search_query=video+editing+getting+started+beginners' },
                { title: 'Importing & Managing Media Assets', time: '8:15', level: 'BEGINNER', url: 'https://www.youtube.com/results?search_query=how+to+import+media+video+editor' },
                { title: 'Multi-Track Timeline Editing', time: '12:45', level: 'INTERMEDIATE', url: 'https://www.youtube.com/results?search_query=multi+track+timeline+video+editing+tutorial' },
                { title: 'AI Tools — 600+ Features Explained', time: '18:20', level: 'INTERMEDIATE', url: 'https://www.youtube.com/results?search_query=AI+video+editing+tools+tutorial+2024' },
                { title: 'Professional Color Grading with AI', time: '22:00', level: 'ADVANCED', url: 'https://www.youtube.com/results?search_query=professional+color+grading+tutorial+AI' },
                { title: 'Audio Mixing & Sound Design', time: '15:10', level: 'INTERMEDIATE', url: 'https://www.youtube.com/results?search_query=audio+mixing+tutorial+video+production' },
                { title: 'AI Enhancement Studio Deep Dive', time: '20:30', level: 'ADVANCED', url: 'https://www.youtube.com/results?search_query=AI+video+enhancement+upscaling+tutorial' },
                { title: 'Render Settings & Export Optimization', time: '8:15', level: 'BEGINNER', url: 'https://www.youtube.com/results?search_query=video+export+render+settings+tutorial' },
              ].map((tut, i) => (
                <a key={i} href={tut.url} target="_blank" rel="noopener noreferrer" className="panel" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', border: '1px solid var(--border)', cursor: 'pointer', background: 'var(--panel)', textAlign: 'left', transition: 'all 0.15s', textDecoration: 'none', color: 'inherit' }}>
                  <Play size={16} style={{ color: 'var(--purple-bright)', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{tut.title}</div>
                    <div className="font-mono" style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>TUTORIAL {String(i+1).padStart(2,'0')} &nbsp;•&nbsp; {tut.time} &nbsp;•&nbsp; Opens on YouTube</div>
                  </div>
                  <div className="font-mono" style={{ fontSize: '1rem', padding: '0.2rem 0.5rem', background: tut.level === 'ADVANCED' ? 'rgba(239,68,68,0.15)' : tut.level === 'INTERMEDIATE' ? 'rgba(245,158,11,0.15)' : 'rgba(167,139,250,0.15)', color: tut.level === 'ADVANCED' ? '#EF4444' : tut.level === 'INTERMEDIATE' ? '#F59E0B' : 'var(--purple-bright)', letterSpacing: '0.1em' }}>{tut.level}</div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 20 — TERMS */}
        {page === 20 && (
          <div style={{ minHeight: '100vh', padding: '5rem 2rem 8rem', maxWidth: '800px', margin: '0 auto' }}>
            <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.3em', color: 'var(--purple-bright)', marginBottom: '0.75rem' }}>LEGAL</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(3rem,8vw,5rem)', marginBottom: '0.5rem' }}>TERMS OF SERVICE</h1>
            <p className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '3rem' }}>LAST UPDATED: FEBRUARY 2026</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', marginBottom: '2rem' }}>
              {[
                { t: 'Acceptance of Terms', b: 'By accessing MandaStrong Studio, you agree to be bound by these Terms of Service. These constitute a legally binding agreement between you and MandaStrong Studio.' },
                { t: 'Service Description', b: 'MandaStrong Studio provides cloud-based AI video editing and content creation tools. The service is provided as-is and we reserve the right to modify any aspect with reasonable notice.' },
                { t: 'User Accounts & Subscriptions', b: 'You are responsible for maintaining confidentiality of your account. Subscriptions bill monthly and auto-renew unless cancelled. Refunds within 30 days of initial purchase only.' },
                { t: 'Intellectual Property & Content Rights', b: 'Studio plan subscribers receive full commercial rights. Basic and Pro plans receive personal use licenses. You retain ownership of content you upload.' },
                { t: 'Acceptable Use Policy', b: 'You agree not to create or distribute content that violates laws, infringes IP rights, contains malicious code, promotes hate speech, or violates rights of minors.' },
                { t: 'Privacy & Data Protection', b: 'We collect and process data per our Privacy Policy and applicable laws. Content is encrypted at rest and in transit. We do not sell personal data.' },
                { t: 'Limitation of Liability', b: 'TO THE MAXIMUM EXTENT PERMITTED BY LAW, MANDASTRONG STUDIO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES.' },
                { t: 'Social Mission', b: 'MandaStrong Studio supports anti-bullying education and veterans mental health services. A portion of revenue is donated to these causes.' },
                { t: 'Contact & Support', b: 'For questions contact us via MandaStrong1.Etsy.com or use Agent Grok (Page 21) available 24/7 within the application.' },
              ].map(s => (
                <div key={s.t} className="panel" style={{ padding: '1.5rem' }}>
                  <div className="font-mono" style={{ fontSize: '0.95rem', letterSpacing: '0.1em', color: 'var(--purple-bright)', marginBottom: '0.5rem' }}>{s.t.toUpperCase()}</div>
                  <p style={{ fontSize: '1rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>{s.b}</p>
                </div>
              ))}
            </div>
            <button onClick={() => { addToast('Terms accepted', 'success'); goTo(5); }} className="btn-primary" style={{ padding: '0.85rem 3rem' }}>ACCEPT TERMS & ENTER</button>
          </div>
        )}

        {/* PAGE 21 — AGENT GROK */}
        {page === 21 && (
          <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '4rem', paddingBottom: '5rem' }}>
            <div className="panel" style={{ padding: '1rem 1.5rem', borderLeft: 0, borderRight: 0, borderTop: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--purple-bright)' }} className="animate-pulse" />
              <div className="font-display" style={{ fontSize: '1.5rem' }}>AGENT GROK</div>
              <span className="font-mono" style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>24/7 PRODUCTION SUPPORT — POWERED BY CLAUDE</span>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {grokChat.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ maxWidth: '70%', padding: '0.75rem 1rem', background: msg.role === 'user' ? 'var(--purple)' : 'var(--panel)', border: `1px solid ${msg.role === 'user' ? 'rgba(139,92,246,0.3)' : 'var(--border)'}`, fontSize: '1rem', lineHeight: 1.5 }}>
                    {msg.role === 'agent' && <div className="font-mono" style={{ fontSize: '1rem', color: 'var(--purple-bright)', marginBottom: '0.3rem', letterSpacing: '0.1em' }}>AGENT GROK</div>}
                    {msg.text}
                  </div>
                </div>
              ))}
              {grokLoading && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{ padding: '0.75rem 1rem', background: 'var(--panel)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Loader size={12} className="animate-spin" style={{ color: 'var(--purple-bright)' }} />
                    <span className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>THINKING...</span>
                  </div>
                </div>
              )}
            </div>
            <div className="panel" style={{ padding: '1rem', borderLeft: 0, borderRight: 0, borderBottom: 0, display: 'flex', gap: '0.5rem' }}>
              <input type="text" value={grokMessage} onChange={e => setGrokMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendGrokMessage()} placeholder="Ask anything about MandaStrong Studio..." style={{ flex: 1, background: 'var(--deep)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.6rem 1rem', fontFamily: 'Barlow', fontSize: '1rem', outline: 'none' }} />
              <button onClick={sendGrokMessage} disabled={grokLoading} className="btn-primary" style={{ padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: grokLoading ? 0.5 : 1 }}>
                <Send size={14} /> SEND
              </button>
            </div>
          </div>
        )}

        {/* PAGE 22 — COMMUNITY HUB */}
        {page === 22 && (
          <div style={{ minHeight: '100vh', padding: '5rem 2rem 8rem', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.3em', color: 'var(--purple-bright)', marginBottom: '0.75rem' }}>CREATOR NETWORK</div>
                <h1 className="font-display" style={{ fontSize: 'clamp(3rem,8vw,6rem)' }}>COMMUNITY HUB</h1>
              </div>
              <button onClick={() => fileInputRef.current?.click()} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem' }}><Upload size={14} /> UPLOAD YOUR MOVIE</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1px', background: 'var(--border)' }}>
              {communityPosts.map(post => (
                <div key={post.id} className="panel" style={{ padding: '1.5rem' }}>
                  <div style={{ aspectRatio: '16/9', background: 'var(--deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', marginBottom: '1rem', border: '1px solid var(--border)' }}>{post.emoji}</div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{post.title}</div>
                  <div className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>BY {post.user.toUpperCase()}</div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <button onClick={() => addToast('Liked!', 'success')} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem', fontFamily: 'DM Mono' }}><ThumbsUp size={12} style={{ color: '#3B82F6' }} /> {post.likes.toLocaleString()}</button>
                    <button onClick={() => addToast('Loved!', 'success')} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem', fontFamily: 'DM Mono' }}><Heart size={12} style={{ color: '#EF4444' }} /> {post.loves.toLocaleString()}</button>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input type="text" value={newComment[post.id] || ''} onChange={e => setNewComment(p => ({ ...p, [post.id]: e.target.value }))} placeholder="Comment..." style={{ flex: 1, background: 'var(--deep)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.4rem 0.6rem', fontSize: '0.9rem', outline: 'none' }} />
                    <button onClick={() => { addToast('Comment posted!', 'success'); setNewComment(p => ({ ...p, [post.id]: '' })); }} className="btn-primary" style={{ padding: '0.4rem 0.75rem' }}>POST</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 23 — THANK YOU */}
        {page === 23 && (
          <div style={{ minHeight: '100vh', background: '#000', color: 'white', paddingBottom: '5rem' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>
              <div style={{ marginBottom: '2rem' }}>
                <video autoPlay loop muted={false} playsInline style={{ width: '100%', maxWidth: '900px', display: 'block', margin: '0 auto', borderRadius: '12px', border: '2px solid #7C3AED' }}>
                  <source src="/thatsallfolks.mp4" type="video/mp4" />
                </video>
              </div>
              <h1 className="font-display" style={{ fontSize: 'clamp(3rem,10vw,6rem)', textAlign: 'center', color: '#A78BFA', marginBottom: '2rem', letterSpacing: '0.05em' }}>THAT'S ALL FOLKS!</h1>
              <div style={{ background: 'linear-gradient(135deg,#4C1D95,#6B21A8)', border: '2px solid #7C3AED', borderRadius: '16px', padding: '2.5rem', marginBottom: '2rem' }}>
                <h2 className="font-display" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1.5rem' }}>A Special Thank You</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center', color: '#E2E8F0' }}>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>To all current and future creators, dreamers, and storytellers...</p>
                  <p style={{ fontSize: '1rem', lineHeight: 1.7 }}>Your creativity and passion inspire positive change in the world. Through your films and stories, you have the power to educate, inspire, and bring awareness to critical issues like bullying prevention, social skills development, and humanity's collective growth.</p>
                  <p style={{ fontSize: '1rem', lineHeight: 1.7 }}>Every piece of content you create has the potential to touch hearts, change minds, and make our world a better place. Thank you for being part of this mission to combine creative expression with meaningful impact.</p>
                  <p style={{ fontSize: '1rem', lineHeight: 1.7, fontWeight: 700 }}>Together, we are building a community of creators who use their talents to spread kindness, understanding, and hope. Your impact matters more than you know.</p>
                </div>
              </div>
              <div style={{ background: '#111116', border: '2px solid #7C3AED', borderRadius: '16px', padding: '2.5rem', marginBottom: '2rem' }}>
                <h2 className="font-display" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>About Our Mission</h2>
                <p style={{ fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem', color: '#E2E8F0' }}><strong>MandaStrong Studio</strong> is more than a filmmaking platform. It's part of a comprehensive educational initiative designed to bring awareness and action to schools regarding bullying prevention, social skills development, and the cultivation of humanity in our communities.</p>
                <div style={{ background: 'rgba(107,33,168,0.4)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>Fundraiser: Educational Program on Bullying Prevention & Social Skills</h3>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#CBD5E1' }}>Through this comprehensive program, we provide educational resources and movie-based content to help schools address these critical issues. Our goal is to create safe, supportive environments where every student can thrive.</p>
                </div>
                <div style={{ background: '#1a1a20', borderRadius: '12px', padding: '1.5rem', border: '2px solid #7C3AED' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Heart size={22} style={{ color: '#EF4444' }} /> Supporting Our Heroes</h3>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#CBD5E1', marginBottom: '1rem' }}><strong>All Etsy Store Proceeds Benefit Veterans Mental Health Services</strong> — 100% of all proceeds from our Etsy Store fundraiser are donated directly to <strong>Veterans Mental Health Services</strong>, supporting those who have sacrificed so much for our freedom.</p>
                  <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#E2E8F0' }}>Visit our fundraiser and learn more at{' '}<a href="https://MandaStrong1.Etsy.com" target="_blank" rel="noopener noreferrer" style={{ color: '#A78BFA', fontWeight: 700, fontSize: '1.4rem', textDecoration: 'underline' }}>MandaStrong1.Etsy.com</a></p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem' }}>
                <button onClick={() => goTo(1)} className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>← BACK TO HOME</button>
              </div>
            </div>
            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#7C3AED', color: 'white', padding: '0.75rem 1.5rem', textAlign: 'center', zIndex: 50, fontSize: '0.9rem' }}>
              MandaStrong 2026 ~ Author Doxy The School Bully ~ <a href="https://MandaStrong1.Etsy.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline' }}>Click MandaStrong1.Etsy.com</a>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}