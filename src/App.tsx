import { useState, useRef, useCallback } from 'react';
import { Menu, Sparkles, MessageCircle, ChevronLeft, ChevronRight, CheckCircle, Play, Upload, Film, Mic, Zap, Shield, Music, Sliders, Database, FileVideo, TrendingUp, BookOpen, Clock, ThumbsUp, Heart, HelpCircle, Plus, Settings, Eye, Layers, X, Download, Save, Wand2, Trash2, Share2, Search, AlertCircle, Loader } from 'lucide-react';

// ===================== AI TOOLS DATA =====================
const AI_TOOLS = {
  Writing: ["Text to Video - Cinematic","Text to Video - Realistic","Text to Video - Animated","Script to Movie","Story to Video","Dialogue Writer","Plot Generator","Scene Writer","Story Outliner","Character Developer","Script Formatter","Three Act Builder","Backstory Generator","Theme Generator","Plot Twist Creator","Scene Analyzer","World Builder","Subplot Generator","Character Voice","Pacing Analyzer","Opening Hook","Climax Designer","Character Mapper","Flashback Creator","Foreshadowing Tool","Beat Sheet","Story Structure","Character Arc","Plot Device","Narrative Flow","Story Consultant","Character Interview","Scene Setting","Emotional Arc","Story Question","Character Flaw","Story Goal","Inciting Incident","Midpoint Tool","Dark Night","Growth Tracker","Tag Optimizer","Action Line","Scene Heading","Parenthetical","Script Timer","Format Checker","Name Generator","Location Database","Prop List","Costume Designer","Scene Number","Page Counter","Reading Timer","Coverage Writer","Logline Generator","Synopsis Writer","Treatment Format","Pitch Deck","Character Bio","World Bible","Magic System","Tech Inventor","Culture Creator","Language Builder","Religion Designer","Government Tool","Economy Builder","Geography Map","History Timeline","Mythology","Legend Writer","Prophecy","Quest Designer","MacGuffin","Plot Hole Detector","Continuity Check","Character Check","Timeline Validator","Research Helper","Fact Checker","Trope Finder","Cliche Detector","Originality Score","Genre Analyzer","Tone Checker","Voice Tool","POV Analyzer","Tense Checker","Grammar Polish","Spell Check","Readability","Engagement Meter","Pacing Visual","Story Arc Map","Network Graph","Distribution Chart","Word Counter","Goal Setter","Sprint Timer","Dashboard","Collab Hub","Version Control","Comment System","Revision Track"],
  Voice: ["Text to Speech - Natural","Voice Cloning - Instant","AI Voice Generator","Voice Narrator","Voice Actor Generator","Text to Speech - Multiple Voices","Voice Maker","Voice Cloner","Voice Creator","Voice Recorder","Speech Converter","Voice Builder","Voice Generator","Premium Voice","Emotion Voice","Natural Voice","Narrator Voice","Voice Imitator","Accent Generator","Pitch Controller","Tone Adjuster","Lip Sync AI","Voice Coach","Audiobook Creator","Commercial Voice","Trailer Voice","Documentary Voice","News Anchor Voice","Radio DJ Voice","Sports Cast Voice","Game Show Host","Meditation Voice","Hypnosis Voice","ASMR Creator","Whisper Generator","Shout Creator","Scream Generator","Laugh Creator","Cry Generator","Sigh Creator","Gasp Generator","Cough Creator","Throat Clear","Voice Warm-up","Range Finder","Pitch Training","Articulation","Diction Drill","Health Monitor","Strain Detector","Rest Reminder","Hydration Alert","Posture Guide","Breathing Coach","Vocal Workout","Range Expander","Stamina Builder","Endurance Train","Quality Enhance","Clarity Boost","Richness Amp","Warmth Add","Brightness Mix","Darkness Mix","Raspy Tool","Smooth Filter","Texture Design","Timbre Modifier","Resonance Tune","Projection Boost","Volume Expander","Dynamic Range","Compression","EQ Voice","De-esser","Pop Filter","Noise Gate","Reverb Voice","Echo Voice","Delay Voice","Chorus FX","Flanger FX","Phaser FX","Distortion FX","Bitcrush","Lo-fi Voice","Radio Effect","Phone Effect","Megaphone","Robot Voice","Alien Voice","Monster Voice","Demon Voice","Angel Voice","Chipmunk Voice","Deep Voice","High Voice","Child Voice","Elderly Voice","Speed Modifier","Volume Normal"],
  Image: ["Image to Video - Motion","Photo to Animation","AI Image Animator","Image Generator","Asset Architect","Texture Mapper","VFX Synthesis","Matte Logic","Color Palette","Background Generator","Character Design","Lighting Designer","Scene Composite","Photo Enhance","Image Upscale","Style Transfer","Text to Image","Color Grading","Tone Mapper","Film Grain","Bokeh Generator","Sky Replace","Cloud Generator","Prop Creator","Depth Map","Normal Map","Albedo Map","Roughness Map","Metallic Map","Emission Map","Ambient Occlude","Shadow Generator","Highlight","Rim Light","Fill Light","Key Light","3-Point Light","Studio Light","Natural Light","Golden Hour","Blue Hour","Night Scene","Day Scene","Sunrise FX","Sunset FX","Moonlight","Starlight","Fire Light","Candle Light","Neon Light","LED Effect","LUT Creator","Contrast Adjust","Brightness","Saturation","Hue Shift","Temperature","Tint Control","Exposure Fix","HDR Merge","Panorama Stitch","360 Image","Fisheye Fix","Lens Distort","Chromatic Aberr","Vignette","Noise Add","Scratch Add","Dust Particles","Light Leaks","Depth Field","Motion Blur","Radial Blur","Zoom Blur","Gaussian Blur","Smart Blur","Sharpen","Edge Enhance","Detail Boost","Clarity","Structure","Dehaze","Weather FX","Rain Creator","Snow Effect","Fog Generator","Mist Tool","Haze Creator","Smoke FX","Steam Generator","Fire Creator","Explosion","Spark Generator","Lightning","Aurora FX","Rainbow","Lens Flare","God Rays","Volumetric","Caustics"],
  Video: ["Video Upscaler to 4K","Video Upscaler to 8K","Frame Rate Booster","60FPS Converter","Slow Motion Generator","Video Extender","Scene Generator","Motion Video Maker","Video Creator","Avatar Generator","Video Synthesizer","Video Studio","Image to Motion","Dynamic Pan","Tilt Shot","Tracking Shot","Crane Movement","Steadycam","Shot Transition","Close-up","Wide Shot","POV Shot","Zoom In","Dolly In","Time Lapse","Slow Motion","Speed Ramp","Flow Generator","Video Craft","Style Tool","Temporal Flow","Frame Blend","Track Shot","Crane Move","Handheld FX","Shot Transit","Establish Shot","Medium Shot","Over Shoulder","Dutch Angle","Whip Pan","Swish Pan","Zoom Out","Dolly Out","Truck Left","Truck Right","Pedestal Up","Pedestal Down","Arc Shot","Orbit Shot","Boom Up","Boom Down","Jib Shot","Drone Shot","Aerial View","Birds Eye","Ground Level","Low Angle","High Angle","Eye Level","Worms Eye","Canted Frame","Symmetry","Rule Thirds","Golden Ratio","Leading Lines","Frame Frame","Negative Space","Depth Layers","Video Stabilizer","Color Grading Pro","Background Remover","Old Film Restorer","Black & White Colorizer"],
  Motion: ["Particle Effect Generator","VFX Generator - All Types","Style Transfer - Any Style","Motion Tracker","Mocap Logic","Physics Engine","Cloth Dynamics","Skeleton Animator","Facial Rigging","Body Movement","Camera Tracker","Particle System","Fluid Dynamics","Spring System","Keyframe Tool","Graph Editor","Timeline Editor","Ease In","Ease Out","Bounce Effect","Elastic Motion","Anticipation","Follow Through","Tracker Pro","Object Physics","Gravity Sim","Collision Detect","Soft Body","Rigid Body","Particle System","Fluid Dynamic","Smoke Sim","Fire Dynamic","Water Physics","Wind Effect","Force Field","Turbulence","Vortex","Attraction","Repulsion","Gravity Well","Rope Physics","Chain Dynamic","Hair Sim","Fur Dynamic","Cloth Drape","Flag Wave","Curtain Motion","Dress Physics","Cape Sim","Muscle System","Skin Deform","Explosion Effect","Fire Effect","Smoke Effect","Water Effect","Lightning Effect","Magic Effect","Energy Beam","Glitch Effect","Hologram Effect","Portal Effect","Teleportation","Invisibility","Force Field","Laser Effect","Plasma Effect","Shockwave","Dust Effect"],
  Enhancement: ["AI 8K Upscaling","Video Denoiser","Audio Enhancer","Noise Cancellation","Face Enhancement","Cinematic Grain","Motion Stabilization","Deep HDR Boost","Face Retouch Pro","Neural Noise Reduction","Auto Color Balance","Dynamic Range Expansion","Lens Flare Synth","Shadow Recovery","Highlight Rolloff","Skin Tone Uniformity","Optical Flow Smooth","Atmospheric Haze","Sharpen Intelligence","De-Banding Pro","Moire Removal","Color Space Transform","Anamorphic Stretch","Flicker Reduction","Low Light Clarity","Texture Enhancement","Micro-Contrast Adjust","Vignette Pro","Film Stock Emulation","Glow Synthesis","Edge Refinement","Smart Saturation","Tone Mapping Pro","Gamma Correction","Black Point Calibration","White Balance AI","Color Match Pro","Temporal Denoise","Digital Intermediate","Chromatic Correction","Film Grain Advanced","Halation Effect","Bloom Control","Light Wrap","Contrast Enhancer","Brightness Optimizer","Saturation Booster","HDR Video Creator","Night Video Enhancer","Quality Optimizer","Resolution Multiplier","Detail Enhancer","Clarity Booster","Sharpness Enhancer","Blur Remover","Artifact Remover","Scratch Remover","Flicker Fixer","Sky Replacement","Background Replacer","Object Remover","Watermark Remover","Echo Remover","Reverb Remover","Hum Remover","Pop Remover","Click Remover","Breath Remover","Room Tone Remover"]
};

const ENHANCEMENT_TOOLS = ["AI 8K Upscaling","Cinematic Grain","Motion Stabilization","Deep HDR Boost","Face Retouch Pro","Neural Noise Reduction","Auto Color Balance","Dynamic Range Expansion","Lens Flare Synth","Shadow Recovery","Highlight Rolloff","Skin Tone Uniformity","Optical Flow Smooth","Atmospheric Haze","Sharpen Intelligence","De-Banding Pro","Moire Removal","Color Space Transform","Anamorphic Stretch","Flicker Reduction","Low Light Clarity","Texture Enhancement","Micro-Contrast Adjust","Vignette Pro","Film Stock Emulation","Glow Synthesis","Edge Refinement","Smart Saturation","Tone Mapping Pro","Gamma Correction","Black Point Calibration","White Balance AI","Color Match Pro","Temporal Denoise","Digital Intermediate","Chromatic Correction","Film Grain Advanced","Halation Effect","Bloom Control","Light Wrap"];

// ===================== TOAST COMPONENT =====================
function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed top-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border pointer-events-auto min-w-72 max-w-sm animate-[slideIn_0.3s_ease]
          ${t.type === 'success' ? 'bg-zinc-950 border-green-500 text-green-400' :
            t.type === 'error' ? 'bg-zinc-950 border-red-500 text-red-400' :
            t.type === 'warning' ? 'bg-zinc-950 border-[#7c3aed] text-[#a78bfa]' :
            'bg-zinc-950 border-[#7c3aed] text-white'}`}>
          <span className="text-lg flex-shrink-0">
            {t.type === 'success' ? '✅' : t.type === 'error' ? '❌' : t.type === 'warning' ? '⚠️' : 'ℹ️'}
          </span>
          <span className="text-sm font-bold flex-1">{t.msg}</span>
          <button onClick={() => removeToast(t.id)} className="text-zinc-500 hover:text-white ml-2">✕</button>
        </div>
      ))}
    </div>
  );
}

// ===================== CONFIRM MODAL =====================
function ConfirmModal({ modal, onConfirm, onCancel }) {
  if (!modal) return null;
  return (
    <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-zinc-950 border-2 border-[#7c3aed] rounded-3xl p-10 max-w-md w-full shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-[#7c3aed]/20 flex items-center justify-center">
            <AlertCircle size={28} className="text-[#7c3aed]"/>
          </div>
          <h3 className="text-2xl font-black text-white">{modal.title}</h3>
        </div>
        <p className="text-zinc-400 mb-8 leading-relaxed">{modal.body}</p>
        <div className="flex gap-4">
          <button onClick={onCancel} className="flex-1 py-4 bg-zinc-800 text-white rounded-xl font-black uppercase hover:bg-zinc-700 transition">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-4 bg-[#7c3aed] text-white rounded-xl font-black uppercase hover:bg-[#6d28d9] transition">
            {modal.confirmLabel || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ===================== PROGRESS OVERLAY =====================
function ProgressOverlay({ progress, label, subLabel }) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
      <div className="text-center max-w-xl w-full px-8">
        <div className="w-40 h-40 rounded-full bg-[#7c3aed]/20 flex items-center justify-center mx-auto mb-10 relative">
          <div className="absolute inset-0 rounded-full border-8 border-[#7c3aed] border-t-transparent animate-spin"/>
          <Sparkles size={60} className="text-[#7c3aed]"/>
        </div>
        <h2 className="text-5xl font-black text-white uppercase mb-2">{label}</h2>
        <p className="text-zinc-400 mb-8 font-bold">{subLabel}</p>
        <div className="w-full bg-zinc-800 h-5 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-zinc-500 font-bold">
          <span>Processing...</span>
          <span className="text-[#7c3aed] text-2xl font-black">{progress}%</span>
        </div>
      </div>
    </div>
  );
}

// ===================== MAIN APP =====================
export default function App() {
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
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
    { id: 1, title: 'Epic Action Movie', user: 'Sarah J.', emoji: '🎬', likes: 2847, loves: 1923, comments: [] },
    { id: 2, title: 'Family Vacation', user: 'Mike Chen', emoji: '✈️', likes: 1256, loves: 892, comments: [] },
    { id: 3, title: 'First Documentary', user: 'Emily R.', emoji: '📹', likes: 3421, loves: 2156, comments: [] },
    { id: 4, title: 'Music Video', user: 'Alex T.', emoji: '🎵', likes: 5234, loves: 4012, comments: [] }
  ]);
  const [newComment, setNewComment] = useState({});
  const [toolSearch, setToolSearch] = useState('');
  const [userPlan] = useState('Studio • Admin');
  const [toasts, setToasts] = useState([]);
  const [modal, setModal] = useState(null);
  const [applyingEnhancement, setApplyingEnhancement] = useState(false);
  const [savingPreset, setSavingPreset] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);

  const fileInputRef = useRef(null);

  // ---- TOAST HELPERS ----
  const addToast = useCallback((msg, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // ---- NAVIGATION ----
  const goTo = useCallback((p) => {
    setPage(p);
    setMenuOpen(false);
  }, []);

  // ---- FILE UPLOAD ----
  const handleFileUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploadProgress(0);
    addToast(`Uploading ${files.length} file${files.length > 1 ? 's' : ''}...`, 'info');
    let completed = 0;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onprogress = (ev) => {
        if (ev.lengthComputable) {
          const pct = Math.round((ev.loaded / ev.total) * 100);
          setUploadProgress(Math.round((completed * 100 + pct) / files.length));
        }
      };
      reader.onload = (event) => {
        completed++;
        const newAsset = {
          id: Date.now() + Math.random(),
          name: file.name,
          type: file.type.startsWith('video') ? 'video' : file.type.startsWith('audio') ? 'audio' : 'image',
          size: (file.size / 1024 / 1024).toFixed(2) + 'MB',
          url: event.target.result,
          timestamp: new Date().toISOString()
        };
        setMediaLibrary(prev => [...prev, newAsset]);
        setUploadProgress(Math.round((completed / files.length) * 100));
        if (completed === files.length) {
          setTimeout(() => {
            setUploadProgress(null);
            addToast(`✅ ${files.length} file${files.length > 1 ? 's' : ''} uploaded to Media Library!`, 'success');
          }, 500);
        }
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [addToast]);

  // ---- AI GENERATE ----
  const handleAIGenerate = useCallback(() => {
    if (!aiPrompt.trim()) return;
    setGenerating(true);
    addToast(`🎬 Generating "${selectedTool}"...`, 'info');
    setTimeout(() => {
      const newAsset = {
        id: Date.now(),
        name: `AI-${selectedTool.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.mp4`,
        type: 'video',
        size: (Math.random() * 500 + 100).toFixed(2) + 'MB',
        url: `data:video/mp4;base64,SIMULATED`,
        aiGenerated: true,
        prompt: aiPrompt,
        timestamp: new Date().toISOString()
      };
      setMediaLibrary(prev => [...prev, newAsset]);
      setGenerating(false);
      setAiPrompt('');
      setSelectedTool(null);
      addToast(`✅ "${selectedTool}" generated & saved to Media Library!`, 'success');
    }, 2500);
  }, [aiPrompt, selectedTool, addToast]);

  // ---- DRAG & DROP ----
  const handleDrop = useCallback((track) => {
    if (!draggedItem) return;
    setTimeline(prev => ({ ...prev, [track]: [...prev[track], { ...draggedItem, trackPosition: Date.now() }] }));
    setDraggedItem(null);
    addToast(`✅ Clip added to ${track} track`, 'success');
  }, [draggedItem, addToast]);

  const removeFromTimeline = useCallback((track, index) => {
    setTimeline(prev => ({ ...prev, [track]: prev[track].filter((_, i) => i !== index) }));
    addToast('Clip removed from timeline', 'warning');
  }, [addToast]);

  const deleteFromLibrary = useCallback((id) => {
    setModal({
      title: 'Delete Asset?',
      body: 'This will permanently remove this asset from your Media Library. This cannot be undone.',
      confirmLabel: 'Delete',
      onConfirm: () => {
        setMediaLibrary(prev => prev.filter(item => item.id !== id));
        setModal(null);
        addToast('Asset deleted from library', 'warning');
      }
    });
  }, [addToast]);

  // ---- APPLY ENHANCEMENT ----
  const applyEnhancement = useCallback(() => {
    setApplyingEnhancement(true);
    addToast(`Applying "${selectedEnhancement}"...`, 'info');
    setTimeout(() => {
      const enhancedAsset = {
        id: Date.now(),
        name: `enhanced-${selectedEnhancement.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.mp4`,
        type: 'video',
        size: (Math.random() * 500 + 100).toFixed(2) + 'MB',
        url: `data:video/mp4;base64,ENHANCED`,
        enhanced: true,
        enhancement: selectedEnhancement,
        settings: { ...enhancementSettings },
        timestamp: new Date().toISOString()
      };
      setMediaLibrary(prev => [...prev, enhancedAsset]);
      setApplyingEnhancement(false);
      setSelectedEnhancement(null);
      addToast(`✅ Enhancement "${selectedEnhancement}" applied & saved!`, 'success');
    }, 2000);
  }, [selectedEnhancement, enhancementSettings, addToast]);

  // ---- RENDER ----
  const handleRender = useCallback(() => {
    setModal({
      title: 'Start Final Render?',
      body: `This will render your ${duration}-minute ${exportSettings.quality} ${exportSettings.format} movie. This may take a moment.`,
      confirmLabel: '🎬 Render Now',
      onConfirm: () => {
        setModal(null);
        setRendering(true);
        setRenderProgress(0);
        addToast('🎬 Render started! Sit tight...', 'info');
        const interval = setInterval(() => {
          setRenderProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              setTimeout(() => {
                const renderedVideo = {
                  id: Date.now(),
                  name: `final-render-${Date.now()}.${exportSettings.format.toLowerCase()}`,
                  type: 'video',
                  size: (Math.random() * 1000 + 500).toFixed(2) + 'MB',
                  url: `data:video/${exportSettings.format.toLowerCase()};base64,RENDERED`,
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
                addToast('✅ Render complete! Your movie is ready.', 'success');
                setPage(16);
              }, 600);
              return 100;
            }
            return prev + 4;
          });
        }, 120);
      }
    });
  }, [duration, exportSettings, addToast]);

  // ---- DOWNLOAD ----
  const handleDownload = useCallback((asset) => {
    addToast('⬇️ Download starting...', 'info');
    const link = document.createElement('a');
    link.href = asset.url;
    link.download = asset.name;
    link.click();
    setTimeout(() => addToast('✅ Download complete!', 'success'), 1500);
  }, [addToast]);

  // ---- SAVE PRESET ----
  const handleSavePreset = useCallback(() => {
    setSavingPreset(true);
    addToast('Saving audio preset...', 'info');
    setTimeout(() => {
      setSavingPreset(false);
      addToast('✅ Audio preset saved!', 'success');
    }, 1200);
  }, [addToast]);

  // ---- COMMUNITY ----
  const handleLike = useCallback((postId) => {
    setCommunityPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  }, []);

  const handleLove = useCallback((postId) => {
    setCommunityPosts(prev => prev.map(p => p.id === postId ? { ...p, loves: p.loves + 1 } : p));
  }, []);

  const handleComment = useCallback((postId) => {
    const comment = newComment[postId];
    if (!comment || !comment.trim()) return;
    setCommunityPosts(prev => prev.map(p =>
      p.id === postId ? { ...p, comments: [...(p.comments || []), { id: Date.now(), text: comment, user: 'You', timestamp: new Date().toISOString() }] } : p
    ));
    setNewComment(prev => ({ ...prev, [postId]: '' }));
    addToast('✅ Comment posted!', 'success');
  }, [newComment, addToast]);

  // ---- SHARE ----
  const handleShare = useCallback(() => {
    if (!currentVideo) { addToast('Please render your movie first!', 'warning'); return; }
    addToast('✅ Shared to Community Hub!', 'success');
    setPage(20);
  }, [currentVideo, addToast]);

  // ===================== RENDER =====================
  return (
    <div className="min-h-screen bg-black text-white relative">
      <style>{`
        [data-bolt-badge],[class*="bolt-badge"],[id*="bolt-badge"],footer[class*="bolt"]{display:none!important;}
        .scrollbar::-webkit-scrollbar{width:6px;}
        .scrollbar::-webkit-scrollbar-track{background:#000;}
        .scrollbar::-webkit-scrollbar-thumb{background:#7c3aed;border-radius:10px;}
        @keyframes slideIn{from{transform:translateX(40px);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes fadeUp{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
        .fade-up{animation:fadeUp 0.4s ease both;}
        input[type=range]{accent-color:#7c3aed;}
      `}</style>

      <input ref={fileInputRef} type="file" multiple accept="video/*,audio/*,image/*" onChange={handleFileUpload} className="hidden"/>

      {/* TOAST */}
      <Toast toasts={toasts} removeToast={removeToast}/>

      {/* CONFIRM MODAL */}
      <ConfirmModal
        modal={modal}
        onConfirm={() => modal?.onConfirm?.()}
        onCancel={() => setModal(null)}
      />

      {/* UPLOAD PROGRESS */}
      {uploadProgress !== null && (
        <ProgressOverlay
          progress={uploadProgress}
          label="Uploading"
          subLabel="Adding files to your Media Library..."
        />
      )}

      {/* RENDER PROGRESS */}
      {rendering && (
        <ProgressOverlay
          progress={renderProgress}
          label="Rendering"
          subLabel={`Processing ${duration} minutes of ${exportSettings.quality} video...`}
        />
      )}

      {/* APPLYING ENHANCEMENT */}
      {applyingEnhancement && (
        <ProgressOverlay
          progress={75}
          label="Enhancing"
          subLabel={`Applying "${selectedEnhancement}"...`}
        />
      )}

      {/* HAMBURGER MENU */}
      {page > 0 && (
        <div className="fixed top-6 left-6 z-50">
          <button onClick={() => setMenuOpen(!menuOpen)} className="bg-[#7c3aed] p-4 rounded-full shadow-2xl hover:scale-110 transition">
            <Menu size={28}/>
          </button>
          {menuOpen && (
            <div className="absolute top-20 left-0 bg-zinc-950 border-2 border-[#7c3aed] p-6 rounded-2xl w-72 shadow-2xl max-h-[80vh] overflow-y-auto scrollbar">
              <div className="bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] p-4 rounded-xl mb-6 text-center">
                <div className="text-xs font-bold text-white/70 mb-1">CURRENT PLAN</div>
                <div className="text-2xl font-black text-white">{userPlan}</div>
                <div className="text-xs text-white/90 mt-1">8K Export • 600 AI Tools • 1TB Storage</div>
              </div>
              <h3 className="text-sm font-black uppercase mb-4 text-[#7c3aed] tracking-widest">Navigation</h3>
              <div className="space-y-2">
                {[
                  { label: '🏠 Home', p: 1 },
                  { label: '🔐 Login / Pricing', p: 3 },
                  { label: '✍️ Writing Tools', p: 4 },
                  { label: '🎙 Voice Tools', p: 5 },
                  { label: '🖼 Image Tools', p: 6 },
                  { label: '🎬 Video Tools', p: 7 },
                  { label: '🌀 Motion Tools', p: 8 },
                  { label: '✨ Enhancement Tools', p: 9 },
                  { label: '📂 Upload Media', p: 10 },
                  { label: '🎛 Editor Suite', p: 11 },
                  { label: '🗂 Media Library', p: 12 },
                  { label: '💎 Enhancements', p: 13 },
                  { label: '🔊 Audio Mixer', p: 14 },
                  { label: '👁 Final Preview', p: 15 },
                  { label: '⬇️ Export', p: 16 },
                  { label: '🎓 Tutorials', p: 17 },
                  { label: '📋 Terms', p: 18 },
                  { label: '🤖 Agent Grok', p: 19 },
                  { label: '👥 Community Hub', p: 20 },
                  { label: '🙏 Thank You', p: 21 },
                ].map(item => (
                  <button key={item.p} onClick={() => goTo(item.p)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition ${page === item.p ? 'bg-[#7c3aed] text-white' : 'text-zinc-300 hover:bg-[#7c3aed]/20 hover:text-white'}`}>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SEARCH BAR (Tool pages) */}
      {page >= 4 && page <= 9 && (
        <div className="fixed top-6 left-24 z-50">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c3aed]"/>
            <input
              type="text"
              value={toolSearch}
              onChange={e => setToolSearch(e.target.value)}
              placeholder="Search 600+ AI Tools..."
              className="bg-zinc-950 border-2 border-[#7c3aed] pl-11 pr-10 py-3 rounded-full text-white placeholder-zinc-500 outline-none w-80 font-bold text-sm"
            />
            {toolSearch && (
              <button onClick={() => setToolSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
                <X size={16}/>
              </button>
            )}
          </div>
        </div>
      )}

      {/* GROK BUTTON */}
      {page >= 1 && page !== 19 && (
        <button onClick={() => goTo(19)} className="fixed bottom-20 right-6 z-50 bg-[#7c3aed] w-16 h-16 rounded-full flex items-center justify-center text-3xl font-black shadow-2xl hover:scale-110 transition border-2 border-[#a78bfa]">
          G
        </button>
      )}

      {/* FOOTER */}
      {page >= 3 && (
        <div className="fixed bottom-0 left-0 w-full bg-black/95 py-2 text-center z-40 border-t border-[#7c3aed]/20">
          <p className="text-xs uppercase font-black text-white/60 tracking-widest">MandaStrong Studio 2025 • MandaStrong1.Etsy.com</p>
        </div>
      )}

      {/* BACK / NEXT NAV */}
      {page > 1 && page < 21 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 flex gap-4">
          <button onClick={() => goTo(page - 1)} className="bg-zinc-950 border-2 border-[#7c3aed] px-8 py-2.5 rounded-full font-black uppercase text-[#7c3aed] hover:bg-[#7c3aed] hover:text-white transition text-xs flex items-center gap-2">
            <ChevronLeft size={14}/> BACK
          </button>
          <button onClick={() => goTo(page + 1)} className="bg-[#7c3aed] px-8 py-2.5 rounded-full font-black uppercase text-white hover:bg-[#6d28d9] transition text-xs flex items-center gap-2">
            NEXT <ChevronRight size={14}/>
          </button>
        </div>
      )}

      {/* ===================== PAGES ===================== */}
      <main className="min-h-screen pb-32">

        {/* PAGE 1 - SPLASH */}
        {page === 1 && (
          <div className="h-screen flex flex-col justify-center items-center text-center px-6 fade-up">
            <Sparkles size={72} className="text-[#7c3aed] mb-8 animate-pulse"/>
            <h1 className="text-7xl md:text-9xl font-black text-[#7c3aed] uppercase mb-6 leading-none">MANDASTRONG<br/>STUDIO</h1>
            <p className="text-xl font-bold text-zinc-300 max-w-2xl mb-4">The All-In-One AI Movie Creation Platform</p>
            <p className="text-sm text-zinc-500 mb-12 uppercase tracking-widest">600+ AI Tools • 8K Export • Unlimited Creativity</p>
            <button onClick={() => goTo(2)} className="bg-[#7c3aed] text-white px-16 py-5 rounded-full font-black uppercase text-xl hover:scale-105 transition shadow-2xl hover:bg-[#6d28d9]">
              START CREATING
            </button>
          </div>
        )}

        {/* PAGE 2 - WELCOME */}
        {page === 2 && (
          <div className="h-screen flex flex-col justify-center items-center text-center px-6 fade-up">
            <Sparkles size={64} className="text-[#7c3aed] mb-6 animate-pulse"/>
            <h1 className="text-5xl md:text-8xl font-black text-[#7c3aed] uppercase mb-8 leading-none">MANDASTRONG<br/>STUDIO</h1>
            <p className="text-2xl md:text-4xl font-bold text-[#7c3aed] italic uppercase max-w-5xl leading-tight">
              WELCOME! MAKE AWESOME FAMILY MOVIES<br/>OR TURN YOUR DREAMS INTO REALITY. ENJOY!
            </p>
            <button onClick={() => goTo(3)} className="mt-14 bg-white text-[#7c3aed] px-16 py-5 rounded-full font-black uppercase text-xl hover:scale-105 transition shadow-2xl">
              GET STARTED →
            </button>
          </div>
        )}

        {/* PAGE 3 - LOGIN & PRICING */}
        {page === 3 && (
          <div className="p-6 pt-16 pb-40 max-w-7xl mx-auto overflow-y-auto scrollbar fade-up">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
              <div className="bg-zinc-950 border-2 border-[#7c3aed] p-10 rounded-3xl">
                <h3 className="text-3xl font-black uppercase mb-6 text-center text-white">Login</h3>
                <input type="email" placeholder="your@email.com" className="w-full bg-black border-2 border-[#7c3aed] p-4 rounded-xl text-white mb-4 outline-none font-bold"/>
                <input type="password" placeholder="••••••••" className="w-full bg-black border-2 border-[#7c3aed] p-4 rounded-xl text-white mb-6 outline-none font-bold"/>
                <button onClick={() => { addToast('✅ Welcome back! Redirecting...', 'success'); setTimeout(() => goTo(4), 800); }}
                  className="w-full bg-[#7c3aed] py-4 rounded-xl font-black uppercase text-lg hover:bg-[#6d28d9] transition flex items-center justify-center gap-2">
                  <Zap size={20}/> Login & Start
                </button>
              </div>
              <div className="bg-zinc-950 border-2 border-[#7c3aed] p-10 rounded-3xl">
                <h3 className="text-3xl font-black uppercase mb-6 text-center text-white">Register</h3>
                <input type="text" placeholder="Your Name" className="w-full bg-black border-2 border-[#7c3aed] p-4 rounded-xl text-white mb-4 outline-none font-bold"/>
                <input type="email" placeholder="your@email.com" className="w-full bg-black border-2 border-[#7c3aed] p-4 rounded-xl text-white mb-6 outline-none font-bold"/>
                <button onClick={() => { addToast('✅ Account created! Welcome to MandaStrong!', 'success'); setTimeout(() => goTo(4), 800); }}
                  className="w-full bg-[#7c3aed] py-4 rounded-xl font-black uppercase text-lg hover:bg-[#6d28d9] transition flex items-center justify-center gap-2">
                  <Sparkles size={20}/> Create Account
                </button>
              </div>
            </div>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-black text-center mb-12 uppercase text-white">Choose Your Plan</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { t: 'Basic', p: '20', s: 'https://buy.stripe.com/test_basic', f: ['HD Export (1080p)', '100 AI Tools', '10GB Storage', 'Email Support'] },
                  { t: 'Pro', p: '30', s: 'https://buy.stripe.com/test_pro', f: ['4K Export (2160p)', '300 AI Tools', '100GB Storage', 'Priority Support', 'Commercial License'] },
                  { t: 'Studio', p: '50', s: 'https://buy.stripe.com/test_studio', f: ['8K Export (4320p)', '600 AI Tools', '1TB Storage', '24/7 Support', 'Full Rights', 'API Access'] }
                ].map((plan, i) => (
                  <div key={plan.t} className={`bg-zinc-950 rounded-3xl p-8 hover:border-[#7c3aed] transition border-2 ${i === 2 ? 'border-[#7c3aed] relative' : 'border-zinc-800'}`}>
                    {i === 2 && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#7c3aed] text-white px-6 py-1 rounded-full text-xs font-black uppercase tracking-widest">Most Popular</div>}
                    <h3 className="text-2xl font-black uppercase mb-2 text-white">{plan.t}</h3>
                    <div className="text-5xl font-black text-[#7c3aed] mb-8">${plan.p}<span className="text-sm opacity-50">/mo</span></div>
                    <ul className="space-y-3 mb-10">
                      {plan.f.map(f => <li key={f} className="text-sm font-semibold flex items-start gap-2 text-white"><CheckCircle size={16} className="text-[#7c3aed] flex-shrink-0 mt-0.5"/> {f}</li>)}
                    </ul>
                    <a href={plan.s} target="_blank" rel="noopener noreferrer" className="block w-full py-4 bg-[#7c3aed] text-center rounded-xl font-black uppercase hover:bg-[#6d28d9] transition">
                      SUBSCRIBE NOW
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PAGES 4–9: AI TOOL BOARDS */}
        {page >= 4 && page <= 9 && (() => {
          const boards = ['Writing', 'Voice', 'Image', 'Video', 'Motion', 'Enhancement'];
          const boardIcons = ['✍️', '🎙', '🖼', '🎬', '🌀', '✨'];
          const allTools = AI_TOOLS[boards[page - 4]] || [];
          const tools = toolSearch.trim() ? allTools.filter(t => t.toLowerCase().includes(toolSearch.toLowerCase())) : allTools;
          return (
            <div className="h-screen flex flex-col pt-20 pb-40 fade-up">
              <div className="text-center mb-6 px-4">
                <h2 className="text-5xl font-black uppercase text-[#7c3aed]">{boardIcons[page - 4]} AI TOOL BOARD</h2>
                <p className="text-zinc-400 mt-1 font-bold">{boards[page - 4]} Category • <span className="text-[#7c3aed]">{tools.length} Tools</span> {toolSearch.trim() ? `matching "${toolSearch}"` : 'Available'}</p>
              </div>
              <div className="flex-1 overflow-y-auto px-8 scrollbar">
                {tools.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-zinc-500 text-xl font-bold">No tools found for "{toolSearch}"</p>
                    <button onClick={() => setToolSearch('')} className="mt-4 text-[#7c3aed] underline font-bold">Clear Search</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8">
                    {tools.map((tool, i) => (
                      <button key={i} onClick={() => setSelectedTool(tool)}
                        className="bg-black border-2 border-[#7c3aed]/40 p-5 rounded-2xl hover:bg-[#7c3aed]/10 hover:border-[#7c3aed] transition group text-left">
                        <Sparkles size={16} className="text-[#7c3aed] mb-2 group-hover:animate-spin"/>
                        <span className="text-sm font-bold uppercase text-white">{tool}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* AI TOOL MODAL */}
        {selectedTool && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8">
            <div className="bg-zinc-950 border-2 border-[#7c3aed] rounded-3xl p-8 max-w-2xl w-full fade-up">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black uppercase text-white flex items-center gap-3"><Sparkles className="text-[#7c3aed]" size={24}/>{selectedTool}</h2>
                <button onClick={() => { setSelectedTool(null); setAiPrompt(''); }} className="text-zinc-400 hover:text-red-500 transition"><X size={28}/></button>
              </div>
              <div className="space-y-5">
                <div className="bg-black border border-[#7c3aed]/30 rounded-xl p-5">
                  <h3 className="font-bold mb-3 text-white flex items-center gap-2"><Upload size={18} className="text-[#7c3aed]"/>Upload Existing Media</h3>
                  <button onClick={() => fileInputRef.current?.click()} className="w-full bg-zinc-900 border-2 border-dashed border-[#7c3aed] p-4 rounded-xl text-white hover:bg-[#7c3aed]/10 transition font-bold">
                    📁 BROWSE FILES
                  </button>
                </div>
                <div className="bg-black border border-[#7c3aed]/30 rounded-xl p-5">
                  <h3 className="font-bold mb-3 text-white flex items-center gap-2"><Sparkles size={18} className="text-[#7c3aed]"/>Generate With AI</h3>
                  <textarea
                    value={aiPrompt}
                    onChange={e => setAiPrompt(e.target.value)}
                    placeholder="Describe what you want to create..."
                    className="w-full bg-zinc-900 border border-[#7c3aed]/50 p-3 rounded-xl text-white h-24 outline-none resize-none text-sm"
                  />
                </div>
                <button
                  onClick={handleAIGenerate}
                  disabled={!aiPrompt.trim() || generating}
                  className="w-full bg-[#7c3aed] py-4 rounded-xl font-black uppercase text-lg hover:bg-[#6d28d9] transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {generating ? (<><div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"/><span>GENERATING...</span></>) : (<><Zap size={22}/>GENERATE & SAVE</>)}
                </button>
                <p className="text-xs text-center text-zinc-500">Assets automatically save to Media Library</p>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 10 - UPLOAD MEDIA */}
        {page === 10 && (
          <div className="h-screen flex items-center justify-center p-8 fade-up">
            <div className="text-center max-w-3xl w-full">
              <h1 className="text-6xl font-black uppercase text-[#7c3aed] mb-4">UPLOAD MEDIA</h1>
              <p className="text-zinc-400 mb-8 font-bold">{mediaLibrary.length} assets in your library</p>
              <div onClick={() => fileInputRef.current?.click()}
                className="aspect-video bg-zinc-950 rounded-3xl border-4 border-dashed border-[#7c3aed] mb-8 flex flex-col items-center justify-center cursor-pointer hover:bg-[#7c3aed]/10 transition group">
                <Upload size={80} className="text-[#7c3aed] mb-4 group-hover:scale-110 transition"/>
                <p className="text-2xl font-bold text-white">Click to Browse Files</p>
                <p className="text-zinc-400 mt-2 text-sm">Video • Audio • Images</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[{ icon: FileVideo, label: 'Videos', formats: 'MP4, MOV, AVI' }, { icon: Music, label: 'Audio', formats: 'MP3, WAV, AAC' }, { icon: Eye, label: 'Images', formats: 'JPG, PNG, GIF' }].map(({ icon: Icon, label, formats }) => (
                  <div key={label} className="bg-zinc-950 border border-[#7c3aed]/40 p-5 rounded-2xl">
                    <Icon size={32} className="text-[#7c3aed] mb-2"/>
                    <p className="text-sm font-black text-white uppercase">{label}</p>
                    <p className="text-xs text-zinc-500 mt-1">{formats}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PAGE 11 - EDITOR SUITE */}
        {page === 11 && (
          <div className="min-h-screen p-8 pt-20 pb-40 fade-up">
            <h1 className="text-6xl font-black uppercase text-[#7c3aed] mb-12 text-center">EDITOR SUITE</h1>
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] rounded-3xl p-12 mb-12 border-4 border-[#a78bfa]">
              <div className="flex items-center gap-6 mb-6">
                <Clock size={48} className="text-white"/>
                <h3 className="text-3xl font-black text-white uppercase">Movie Duration</h3>
              </div>
              <div className="text-center mb-6">
                <div className="text-8xl font-black text-white">{duration}</div>
                <div className="text-xl font-bold text-white/80 uppercase">Minutes</div>
              </div>
              <input type="range" min="0" max="180" value={duration} onChange={e => { setDuration(Number(e.target.value)); }} className="w-full h-4 bg-white/20 rounded-full mb-4 cursor-pointer" style={{ accentColor: 'white' }}/>
              <div className="flex justify-between text-sm text-white/70 mb-8"><span>0 min</span><span>180 min</span></div>
              <div className="grid grid-cols-4 gap-3">
                {[30, 60, 90, 120].map(m => (
                  <button key={m} onClick={() => { setDuration(m); addToast(`Duration set to ${m} minutes`, 'info'); }}
                    className={`py-4 rounded-xl font-bold text-lg transition ${duration === m ? 'bg-white text-[#7c3aed]' : 'bg-white/20 text-white hover:bg-white/30'}`}>
                    {m} min
                  </button>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { icon: Database, label: 'Media Library', sub: `${mediaLibrary.length} assets`, p: 12 },
                { icon: Wand2, label: 'Enhancements', sub: `${ENHANCEMENT_TOOLS.length} tools`, p: 13 },
                { icon: Sliders, label: 'Audio Mixer', sub: '4 channels', p: 14 }
              ].map(({ icon: Icon, label, sub, p }) => (
                <button key={label} onClick={() => goTo(p)} className="bg-zinc-950 border-2 border-[#7c3aed]/40 p-8 rounded-3xl hover:bg-[#7c3aed]/10 hover:border-[#7c3aed] transition text-left group">
                  <Icon size={48} className="text-[#7c3aed] mb-4 group-hover:scale-110 transition"/>
                  <h3 className="text-xl font-black uppercase mb-1 text-white">{label}</h3>
                  <p className="text-sm text-zinc-400">{sub}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 12 - MEDIA LIBRARY & TIMELINE */}
        {page === 12 && (
          <div className="min-h-screen flex pb-32 fade-up">
            {/* Library */}
            <div className="w-1/3 bg-zinc-950 border-r-4 border-[#7c3aed] p-6 overflow-y-auto scrollbar">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black uppercase text-white flex items-center gap-2"><Database size={20} className="text-[#7c3aed]"/>LIBRARY</h3>
                <button onClick={() => fileInputRef.current?.click()} className="bg-[#7c3aed] p-2 rounded-lg hover:bg-[#6d28d9] transition"><Plus size={18}/></button>
              </div>
              {mediaLibrary.length === 0 ? (
                <div className="text-center py-12">
                  <Upload size={48} className="text-zinc-700 mx-auto mb-4"/>
                  <p className="text-zinc-500 text-sm font-bold">No assets yet</p>
                  <button onClick={() => goTo(10)} className="text-[#7c3aed] text-xs mt-2 underline font-bold">Upload Media</button>
                </div>
              ) : (
                <div className="space-y-3">
                  {mediaLibrary.map(asset => (
                    <div key={asset.id}
                      draggable
                      onDragStart={() => setDraggedItem(asset)}
                      className="bg-black border border-[#7c3aed]/30 p-3 rounded-xl cursor-grab hover:border-[#7c3aed] transition group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#7c3aed]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          {asset.type === 'video' ? <Film size={18} className="text-[#7c3aed]"/> : asset.type === 'audio' ? <Music size={18} className="text-[#7c3aed]"/> : <Eye size={18} className="text-[#7c3aed]"/>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate">{asset.name}</p>
                          <p className="text-xs text-zinc-500">{asset.size} • {asset.type}</p>
                        </div>
                        <button onClick={() => deleteFromLibrary(asset.id)} className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-500 transition"><Trash2 size={14}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Timeline */}
            <div className="flex-1 p-6 overflow-y-auto scrollbar">
              <h3 className="text-xl font-black uppercase text-white mb-6 flex items-center gap-2"><Layers size={20} className="text-[#7c3aed]"/>TIMELINE</h3>
              {['video', 'audio', 'text'].map(track => (
                <div key={track} className="mb-6">
                  <div className="text-xs font-black uppercase text-[#7c3aed] mb-2 tracking-widest">{track} track</div>
                  <div
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDrop(track)}
                    className="min-h-20 bg-zinc-950 border-2 border-dashed border-[#7c3aed]/30 rounded-xl p-3 flex gap-2 flex-wrap hover:border-[#7c3aed]/60 transition">
                    {timeline[track].length === 0 ? (
                      <p className="text-zinc-600 text-xs font-bold self-center w-full text-center">Drag assets here</p>
                    ) : (
                      timeline[track].map((item, i) => (
                        <div key={i} className="bg-[#7c3aed]/20 border border-[#7c3aed] rounded-lg px-3 py-2 text-xs font-bold text-white flex items-center gap-2">
                          {item.name.substring(0, 20)}...
                          <button onClick={() => removeFromTimeline(track, i)} className="text-zinc-400 hover:text-red-500"><X size={12}/></button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
              <div className="flex gap-4 mt-8">
                <button onClick={() => goTo(15)} className="bg-[#7c3aed] px-8 py-4 rounded-xl font-black uppercase hover:bg-[#6d28d9] transition flex items-center gap-2">
                  <Play size={18}/> Preview
                </button>
                <button onClick={handleRender} className="bg-green-600 px-8 py-4 rounded-xl font-black uppercase hover:bg-green-700 transition flex items-center gap-2">
                  <Zap size={18}/> Render
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 13 - ENHANCEMENTS */}
        {page === 13 && (
          <div className="min-h-screen p-8 pt-20 pb-40 fade-up">
            <h1 className="text-5xl font-black uppercase text-[#7c3aed] mb-4 text-center">ENHANCEMENT STUDIO</h1>
            <p className="text-center text-zinc-400 mb-10 font-bold">{ENHANCEMENT_TOOLS.length} Professional Tools</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
              {ENHANCEMENT_TOOLS.map((tool, i) => (
                <button key={i} onClick={() => setSelectedEnhancement(tool)}
                  className="bg-zinc-950 border-2 border-[#7c3aed]/30 p-5 rounded-2xl hover:bg-[#7c3aed]/10 hover:border-[#7c3aed] transition group text-left">
                  <Wand2 size={18} className="text-[#7c3aed] mb-2 group-hover:scale-110 transition"/>
                  <span className="text-sm font-bold uppercase text-white">{tool}</span>
                </button>
              ))}
            </div>

            {/* Enhancement Panel */}
            {selectedEnhancement && (
              <div className="fixed inset-0 z-50 bg-black/95 p-8 flex flex-col fade-up">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-4xl font-black text-[#7c3aed] uppercase flex items-center gap-3"><Wand2 size={36}/>{selectedEnhancement}</h3>
                  <button onClick={() => setSelectedEnhancement(null)} className="text-white hover:text-red-500 transition"><X size={36}/></button>
                </div>
                <div className="flex-1 flex gap-8">
                  <div className="flex-1 bg-zinc-900 border-4 border-[#7c3aed] rounded-3xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-48 h-48 rounded-full bg-[#7c3aed]/20 flex items-center justify-center mb-6 mx-auto">
                        <Sparkles size={80} className="text-[#7c3aed] animate-pulse"/>
                      </div>
                      <p className="text-white font-black text-2xl uppercase">Live Preview</p>
                      <p className="text-zinc-400 text-sm mt-2">Intensity: {enhancementSettings.intensity}%</p>
                    </div>
                  </div>
                  <div className="w-96 space-y-5 p-8 bg-zinc-950 border-2 border-[#7c3aed] rounded-3xl">
                    {Object.entries(enhancementSettings).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between text-sm font-black uppercase text-white mb-2">
                          <span>{key}</span><span className="text-[#7c3aed]">{value}%</span>
                        </div>
                        <input type="range" min="0" max="100" value={value}
                          onChange={e => setEnhancementSettings(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                          className="w-full h-2 bg-zinc-800 rounded-full cursor-pointer"/>
                      </div>
                    ))}
                    <button onClick={() => setEnhancementSettings({ intensity: 75, clarity: 75, color: 75, brightness: 75 })}
                      className="w-full py-3 bg-zinc-800 text-white rounded-xl font-bold mt-4 hover:bg-zinc-700 transition">
                      RESET TO DEFAULT
                    </button>
                  </div>
                </div>
                <div className="mt-8 flex gap-6 justify-center">
                  <button onClick={() => setSelectedEnhancement(null)} className="px-14 py-4 bg-zinc-800 text-white rounded-xl font-black uppercase hover:bg-zinc-700 transition">CANCEL</button>
                  <button onClick={applyEnhancement} className="px-14 py-4 bg-[#7c3aed] text-white rounded-xl font-black uppercase hover:bg-[#6d28d9] transition flex items-center gap-3">
                    <CheckCircle size={22}/>APPLY & SAVE
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PAGE 14 - AUDIO MIXER */}
        {page === 14 && (
          <div className="min-h-screen p-8 pt-20 pb-40 fade-up">
            <h1 className="text-4xl font-black uppercase mb-12 text-white text-center">🔊 PROFESSIONAL AUDIO MIXER</h1>
            <div className="grid grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { key: 'music', label: 'MUSIC', icon: Music },
                { key: 'voice', label: 'VOICE', icon: Mic },
                { key: 'sfx', label: 'SFX', icon: Zap },
                { key: 'master', label: 'MASTER', icon: Sliders, master: true }
              ].map(channel => (
                <div key={channel.key} className={`bg-zinc-950 border-4 rounded-3xl p-6 flex flex-col items-center ${channel.master ? 'border-[#7c3aed]' : 'border-zinc-800'}`}>
                  <channel.icon size={36} className="text-[#7c3aed] mb-3"/>
                  <div className="font-black text-base mb-6 text-white">{channel.label}</div>
                  <div className="relative h-64 w-24 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-3xl mb-6 overflow-hidden">
                    <div className="absolute bottom-0 w-full rounded-3xl bg-gradient-to-b from-[#a78bfa] to-[#7c3aed] transition-all duration-150" style={{ height: `${audioLevels[channel.key]}%` }}/>
                  </div>
                  <input type="range" min="0" max="100" value={audioLevels[channel.key]}
                    onChange={e => setAudioLevels(prev => ({ ...prev, [channel.key]: Number(e.target.value) }))}
                    className="w-full mb-4 cursor-pointer"/>
                  <div className="text-3xl font-black text-[#7c3aed]">{audioLevels[channel.key]}%</div>
                </div>
              ))}
            </div>
            <div className="max-w-6xl mx-auto mt-12 flex gap-4 justify-center">
              <button onClick={() => { setAudioLevels({ music: 75, voice: 50, sfx: 65, master: 80 }); addToast('Audio levels reset to default', 'info'); }}
                className="px-12 py-4 bg-zinc-800 text-white rounded-xl font-black uppercase hover:bg-zinc-700 transition">
                RESET LEVELS
              </button>
              <button onClick={handleSavePreset} disabled={savingPreset}
                className="px-12 py-4 bg-[#7c3aed] text-white rounded-xl font-black uppercase hover:bg-[#6d28d9] transition flex items-center gap-3 disabled:opacity-50">
                {savingPreset ? <><Loader size={18} className="animate-spin"/>SAVING...</> : <><Save size={18}/>SAVE PRESET</>}
              </button>
            </div>
          </div>
        )}

        {/* PAGE 15 - FINAL PREVIEW */}
        {page === 15 && (
          <div className="h-screen flex items-center justify-center p-8 fade-up">
            <div className="text-center max-w-5xl w-full">
              <h1 className="text-5xl font-black text-[#7c3aed] mb-8 uppercase">🎬 FINAL PREVIEW</h1>
              <div className="aspect-video bg-zinc-950 rounded-3xl border-4 border-[#7c3aed] mb-8 flex items-center justify-center relative overflow-hidden">
                {currentVideo ? (
                  <div className="text-center">
                    <Play size={100} className="text-[#7c3aed] mb-4"/>
                    <p className="text-white font-black text-xl">{currentVideo.name}</p>
                    <p className="text-zinc-400 mt-2">{duration} minutes • {exportSettings.quality}</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Eye size={100} className="text-[#7c3aed]/40 mb-4"/>
                    <p className="text-zinc-500 font-bold text-xl">No video yet — add clips to timeline first</p>
                    <button onClick={() => goTo(12)} className="text-[#7c3aed] text-sm mt-4 underline font-bold">Go to Timeline</button>
                  </div>
                )}
              </div>
              <div className="flex gap-4 justify-center">
                <button onClick={() => addToast('▶️ Preview playing...', 'info')}
                  className="bg-zinc-800 px-10 py-4 rounded-xl font-black uppercase flex items-center gap-3 hover:bg-zinc-700 transition">
                  <Play size={22}/> PLAY
                </button>
                <button onClick={handleRender} className="bg-green-600 px-10 py-4 rounded-xl font-black uppercase flex items-center gap-3 hover:bg-green-700 transition">
                  <Zap size={22}/> START RENDER
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 16 - EXPORT */}
        {page === 16 && (
          <div className="h-screen flex items-center justify-center p-8 fade-up">
            <div className="max-w-4xl w-full bg-zinc-950 border-4 border-[#7c3aed] rounded-3xl p-12">
              <h1 className="text-5xl font-black text-[#7c3aed] mb-12 text-center uppercase">⬇️ Export Your Movie</h1>
              {currentVideo && (
                <div className="bg-black border-2 border-green-500 rounded-2xl p-5 mb-8 flex items-center gap-4">
                  <CheckCircle size={36} className="text-green-500 flex-shrink-0"/>
                  <div>
                    <p className="text-lg font-black text-white">{currentVideo.name}</p>
                    <p className="text-sm text-zinc-400">{currentVideo.size} • {currentVideo.quality} • {currentVideo.format} • Ready!</p>
                  </div>
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-black border-2 border-[#7c3aed]/40 p-5 rounded-2xl">
                  <h3 className="font-black mb-3 text-white uppercase text-sm">Export Quality</h3>
                  <select value={exportSettings.quality} onChange={e => setExportSettings(prev => ({ ...prev, quality: e.target.value }))}
                    className="w-full bg-zinc-900 border border-[#7c3aed] p-3 rounded-xl text-white outline-none font-bold">
                    <option value="8K">8K (4320p)</option>
                    <option value="4K">4K (2160p)</option>
                    <option value="HD">HD (1080p)</option>
                    <option value="SD">SD (720p)</option>
                  </select>
                </div>
                <div className="bg-black border-2 border-[#7c3aed]/40 p-5 rounded-2xl">
                  <h3 className="font-black mb-3 text-white uppercase text-sm">Format</h3>
                  <select value={exportSettings.format} onChange={e => setExportSettings(prev => ({ ...prev, format: e.target.value }))}
                    className="w-full bg-zinc-900 border border-[#7c3aed] p-3 rounded-xl text-white outline-none font-bold">
                    <option>MP4</option><option>MOV</option><option>AVI</option><option>WebM</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-5">
                <button onClick={() => currentVideo && handleDownload(currentVideo)} disabled={!currentVideo}
                  className="bg-[#7c3aed] py-5 rounded-xl font-black uppercase text-lg hover:bg-[#6d28d9] transition disabled:opacity-40 flex items-center justify-center gap-3">
                  <Download size={22}/> DOWNLOAD
                </button>
                <button disabled={!currentVideo} onClick={() => addToast('☁️ Saving to cloud...', 'info')}
                  className="bg-green-600 py-5 rounded-xl font-black uppercase text-lg hover:bg-green-700 transition disabled:opacity-40 flex items-center justify-center gap-3">
                  <Save size={22}/> SAVE TO CLOUD
                </button>
              </div>
              <button onClick={handleShare} disabled={!currentVideo}
                className="w-full bg-blue-600 py-5 rounded-xl font-black uppercase text-lg hover:bg-blue-700 transition disabled:opacity-40 flex items-center justify-center gap-3">
                <Share2 size={22}/> SHARE TO COMMUNITY HUB
              </button>
            </div>
          </div>
        )}

        {/* PAGE 17 - TUTORIALS */}
        {page === 17 && (
          <div className="min-h-screen p-8 pt-20 pb-40 fade-up">
            <h1 className="text-4xl font-black uppercase mb-12 text-white text-center">🎓 TUTORIALS & LEARNING CENTER</h1>
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="bg-black rounded-3xl border-4 border-[#7c3aed] p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-48 h-48 rounded-full bg-[#7c3aed]/20 flex items-center justify-center mb-6 mx-auto">
                    <Play size={80} className="text-[#7c3aed]"/>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Video Tutorial Player</h3>
                  <p className="text-zinc-400 mt-2 text-sm">Click a tutorial to play</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3"><BookOpen size={24} className="text-[#7c3aed]"/>Tutorial Library</h3>
                {[
                  { title: 'Getting Started with MandaStrong', time: '5:30', level: 'Beginner' },
                  { title: 'Multi-Track Timeline Editing', time: '12:45', level: 'Intermediate' },
                  { title: 'Professional Color Grading', time: '18:20', level: 'Advanced' },
                  { title: 'Audio Mixing Masterclass', time: '15:10', level: 'Intermediate' },
                  { title: 'Enhancement Studio Deep Dive', time: '22:00', level: 'Advanced' },
                  { title: 'Export & Optimization', time: '8:15', level: 'Beginner' }
                ].map((tut, i) => (
                  <button key={i} onClick={() => addToast(`▶️ Playing: ${tut.title}`, 'info')}
                    className="w-full bg-zinc-950 border-2 border-[#7c3aed]/30 p-5 rounded-2xl hover:bg-[#7c3aed]/10 hover:border-[#7c3aed] cursor-pointer transition text-left">
                    <div className="flex items-center gap-3 mb-2">
                      <FileVideo size={18} className="text-[#7c3aed]"/>
                      <h4 className="font-bold flex-1 text-white">{tut.title}</h4>
                    </div>
                    <div className="flex gap-3 text-xs text-zinc-400">
                      <span>⏱ {tut.time}</span>
                      <span>•</span>
                      <span className="bg-[#7c3aed] px-2 py-0.5 rounded text-white font-bold">{tut.level}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PAGE 18 - TERMS */}
        {page === 18 && (
          <div className="min-h-screen p-8 pt-20 pb-40 max-w-4xl mx-auto fade-up">
            <h1 className="text-5xl font-black uppercase text-[#7c3aed] mb-12 text-center flex items-center justify-center gap-4"><Shield size={48}/>Terms & Conditions</h1>
            <div className="space-y-6">
              {[
                { title: '1. Acceptance of Terms', body: 'By using MandaStrong Studio, you agree to these terms and conditions. These terms apply to all users of the platform.' },
                { title: '2. License & Usage', body: 'Studio plan users receive full commercial rights to their created content. Basic and Pro plans include personal use licenses only.' },
                { title: '3. Content Policy', body: 'Users must not create content that is illegal, harmful, or violates third-party rights. MandaStrong Studio reserves the right to remove any content that violates these guidelines.' },
                { title: '4. Privacy & Data', body: 'We collect only necessary data to provide our service. Your videos and media files are encrypted and stored securely. We do not sell your personal data to third parties.' },
                { title: '5. Social Mission', body: 'MandaStrong Studio is committed to supporting anti-bullying initiatives and veterans mental health. A portion of all Studio plan revenue supports these causes.' },
                { title: '6. Support & Contact', body: 'For support, visit MandaStrong1.Etsy.com or use the Agent Grok chat assistant available 24/7 within the app.' }
              ].map(section => (
                <div key={section.title} className="bg-zinc-950 border-2 border-[#7c3aed]/30 rounded-2xl p-8">
                  <h3 className="text-xl font-black text-[#7c3aed] mb-3">{section.title}</h3>
                  <p className="text-zinc-300 leading-relaxed">{section.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <button onClick={() => { addToast('✅ Terms accepted!', 'success'); goTo(4); }}
                className="bg-[#7c3aed] px-16 py-5 rounded-full font-black uppercase text-xl hover:bg-[#6d28d9] transition">
                I ACCEPT — LET'S GO
              </button>
            </div>
          </div>
        )}

        {/* PAGE 19 - AGENT GROK */}
        {page === 19 && (
          <div className="min-h-screen p-8 pt-20 pb-40 fade-up">
            <h1 className="text-5xl font-black uppercase mb-12 flex items-center gap-4 text-white">
              <MessageCircle size={48} className="text-[#7c3aed]"/>AGENT GROK - 24/7 HELP
            </h1>
            <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
              <div>
                <div className="bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] rounded-3xl p-8 mb-8 border-4 border-[#a78bfa]">
                  <div className="flex items-center gap-6 mb-4">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl font-black">G</div>
                    <div>
                      <h3 className="text-2xl font-black text-white">Agent Grok</h3>
                      <p className="text-white/80 flex items-center gap-2 font-bold"><span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse"/>Online & Ready</p>
                    </div>
                    <div className="ml-auto bg-yellow-500 text-black px-4 py-2 rounded-full text-xs font-black">⚡ INSTANT</div>
                  </div>
                </div>
                <div className="bg-zinc-950 border-2 border-[#7c3aed] rounded-3xl p-8 mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#7c3aed] flex items-center justify-center font-black">G</div>
                    <span className="text-xs text-zinc-500">Just now</span>
                  </div>
                  <div className="bg-white text-black p-5 rounded-2xl rounded-tl-none">
                    <p className="font-bold">Hello! I'm Agent Grok. I can help with uploads, AI generation, timeline editing, enhancements, audio mixing, rendering, and exports. What do you need?</p>
                  </div>
                </div>
                <div className="bg-zinc-950 border-2 border-[#7c3aed] rounded-3xl p-6">
                  <input type="text" placeholder="Ask anything..." className="w-full bg-black border border-[#7c3aed] p-4 rounded-xl text-white outline-none mb-4 font-bold"/>
                  <button onClick={() => addToast('📨 Message sent to Agent Grok!', 'success')}
                    className="w-full bg-[#7c3aed] py-4 rounded-xl font-black uppercase hover:bg-[#6d28d9] transition">
                    SEND MESSAGE
                  </button>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white"><HelpCircle size={24} className="text-[#7c3aed]"/>Common Questions</h3>
                  <div className="space-y-3">
                    {['How do I upload files?', 'How does AI generation work?', 'How do I add clips to timeline?', 'What enhancements are available?', 'How do I adjust audio levels?', 'What export qualities can I use?', 'How do I download my video?', 'Can I share to community?'].map(q => (
                      <button key={q} onClick={() => addToast(`💬 "${q}" — Agent Grok is answering...`, 'info')}
                        className="w-full bg-zinc-950 border-2 border-zinc-800 p-4 rounded-xl text-left hover:bg-[#7c3aed]/10 hover:border-[#7c3aed] text-sm font-bold transition text-white">
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#7c3aed]/20 to-transparent border-2 border-[#7c3aed] rounded-3xl p-8">
                  <h3 className="text-xl font-bold mb-4 text-white">System Status</h3>
                  <div className="space-y-3">
                    {['File Upload', 'AI Generation', 'Timeline Editor', 'Enhancement Tools', 'Audio Mixer', 'Render Engine'].map(s => (
                      <div key={s} className="flex justify-between items-center bg-black/50 p-4 rounded-xl">
                        <span className="font-bold text-white">{s}</span>
                        <span className="text-green-400 flex items-center gap-2 font-bold text-sm"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"/>Operational</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 20 - COMMUNITY HUB */}
        {page === 20 && (
          <div className="min-h-screen p-8 pt-20 pb-40 fade-up">
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-5xl font-black uppercase text-white">👥 COMMUNITY HUB</h1>
              <button onClick={() => fileInputRef.current?.click()} className="bg-[#7c3aed] px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-[#6d28d9] transition">
                <Upload size={20}/>UPLOAD YOUR MOVIE
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {communityPosts.map(post => (
                <div key={post.id} className="bg-zinc-950 border-2 border-[#7c3aed]/30 rounded-3xl overflow-hidden hover:border-[#7c3aed] hover:scale-[1.01] transition">
                  <div className="aspect-video bg-gradient-to-br from-[#7c3aed]/20 to-[#6d28d9]/20 flex items-center justify-center text-8xl border-b-2 border-[#7c3aed]/30">
                    {post.emoji}
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-black mb-4 text-white">{post.title}</h3>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-[#7c3aed] flex items-center justify-center font-black">{post.user[0]}</div>
                      <div>
                        <div className="font-bold text-white">{post.user}</div>
                        <div className="text-xs text-zinc-500">2 hours ago</div>
                      </div>
                    </div>
                    <div className="flex gap-8 mb-6">
                      <button onClick={() => handleLike(post.id)} className="flex items-center gap-2 text-white font-bold hover:text-blue-400 transition">
                        <ThumbsUp className="text-blue-400" size={18}/> {post.likes.toLocaleString()}
                      </button>
                      <button onClick={() => handleLove(post.id)} className="flex items-center gap-2 text-white font-bold hover:text-red-400 transition">
                        <Heart className="text-red-400" size={18}/> {post.loves.toLocaleString()}
                      </button>
                    </div>
                    {post.comments?.length > 0 && (
                      <div className="mb-4 space-y-2">
                        {post.comments.map(c => (
                          <div key={c.id} className="bg-black/50 p-3 rounded-xl">
                            <span className="font-bold text-sm text-[#7c3aed]">{c.user}</span>
                            <span className="text-xs text-zinc-500 ml-2">just now</span>
                            <p className="text-sm text-white mt-1">{c.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <textarea
                      value={newComment[post.id] || ''}
                      onChange={e => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                      className="w-full p-4 bg-black border-2 border-[#7c3aed]/30 rounded-xl text-white text-sm mb-4 outline-none resize-none focus:border-[#7c3aed] transition"
                      placeholder="Add a comment..." rows={2}
                    />
                    <button onClick={() => handleComment(post.id)} className="bg-[#7c3aed] px-8 py-3 rounded-xl font-black uppercase hover:bg-[#6d28d9] transition text-sm">
                      POST COMMENT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 21 - THANK YOU */}
        {page === 21 && (
          <div className="min-h-screen p-8 pt-20 pb-40 fade-up">
            <div className="max-w-6xl mx-auto">
              <div className="mb-16">
                <video autoPlay loop muted playsInline className="w-full rounded-3xl border-4 border-[#7c3aed] shadow-2xl">
                  <source src="/ThatsAllFolks.mp4" type="video/mp4"/>
                </video>
              </div>
              <h1 className="text-8xl font-black text-[#7c3aed] uppercase text-center mb-16 leading-none">THAT'S ALL FOLKS!</h1>
              <div className="bg-gradient-to-br from-[#7c3aed]/20 to-[#6d28d9]/10 border-4 border-[#7c3aed] rounded-3xl p-12 mb-12">
                <h2 className="text-4xl font-black mb-8 text-white text-center">A SPECIAL THANK YOU</h2>
                <div className="text-lg text-white leading-relaxed space-y-5">
                  <p className="italic font-black text-[#7c3aed] text-2xl">Dear Creator,</p>
                  <p>Thank you for choosing MandaStrong Studio. This journey is more than video creation — it's about the <strong>social impact</strong> your stories will have.</p>
                  <p>Our mission: aid schools in <strong>bullying prevention</strong> and <strong>social skills development</strong>. Your films have the power to educate, inspire, and bring awareness to critical issues.</p>
                  <p>Thank you for being part of this mission to cultivate humanity in our communities.</p>
                </div>
              </div>
              <div className="bg-zinc-950 border-4 border-[#7c3aed] rounded-3xl p-12 text-center mb-12">
                <BookOpen size={72} className="mx-auto text-[#7c3aed] mb-8"/>
                <h3 className="text-4xl font-black text-white uppercase mb-4">HOW TO USE GUIDE</h3>
                <p className="text-zinc-400 font-bold text-lg uppercase mb-8">Complete Instructional Manual</p>
                <button onClick={() => addToast('📥 Guide download starting...', 'info')}
                  className="px-16 py-5 bg-[#7c3aed] text-white rounded-full font-black text-xl shadow-2xl hover:bg-[#6d28d9] transition">
                  📥 DOWNLOAD GUIDE
                </button>
              </div>
              <div className="bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] rounded-3xl p-12 text-center mb-16">
                <h3 className="text-4xl font-black mb-4">SUPPORT VETERANS MENTAL HEALTH</h3>
                <p className="text-xl mb-8 font-bold">100% of Etsy Proceeds Benefit Veterans Mental Health Services</p>
                <a href="https://MandaStrong1.Etsy.com" target="_blank" rel="noopener noreferrer"
                  className="inline-block px-16 py-5 bg-white text-[#7c3aed] rounded-full font-black text-xl shadow-2xl hover:scale-105 transition">
                  🛍 VISIT ETSY STORE
                </a>
              </div>
              <div className="flex gap-8 justify-center flex-wrap">
                <button onClick={() => goTo(1)} className="px-16 py-6 bg-white text-black rounded-full font-black uppercase text-2xl hover:scale-105 transition shadow-2xl">
                  🏠 HOME
                </button>
                <button onClick={() => window.close()} className="px-16 py-6 bg-red-600 text-white rounded-full font-black uppercase text-2xl hover:scale-105 transition shadow-2xl">
                  ✕ CLOSE APP
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
