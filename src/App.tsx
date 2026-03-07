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
  "Action Line Writer": "Write vivid action lines that describe what we see on screen",
  "Scene Heading Tool": "Generate correct scene headings for your screenplay",
  "Parenthetical Generator": "Add actor direction notes within dialogue",
  "Dialogue Tightener": "Cut unnecessary words and sharpen your dialogue",
  "Script Timer": "Calculate how long your script will run on screen",
  "Word Counter": "Count words, pages and estimated screen time",
  "Page Counter": "Track page count to estimate film runtime",
  "Reading Time Estimator": "Estimate how long your script takes to read aloud",
  "Format Checker": "Check your script meets industry formatting standards",
  "Grammar Polish": "Fix grammar errors and improve sentence flow",
  "Spell Checker": "Catch and correct spelling mistakes in your script",
  "Continuity Checker": "Find inconsistencies in your story timeline or details",
  "Plot Hole Detector": "Identify gaps and logical errors in your plot",
  "Tone Checker": "Ensure your writing tone is consistent throughout",
  "Genre Analyzer": "Identify what genre your script fits and how well",
  "Pacing Analyzer": "Check if your story moves at the right speed",
  "Readability Meter": "Score how easy your script is to read and follow",
  "Engagement Scorer": "Rate how engaging and compelling your story is",
  "Originality Scorer": "Check how unique your story is compared to existing films",
  "Theme Generator": "Identify and develop the core themes of your story",
  "Conflict Builder": "Create compelling conflict between characters or forces",
  "Backstory Generator": "Build rich history for your characters before the story begins",
  "World Builder": "Create a detailed fictional world for your story",
  "Name Generator": "Generate character names that fit your story world",
  "Location Finder": "Suggest ideal filming locations for your scenes",
  "Prop List Generator": "Create a complete list of props needed for your film",
  "Costume Designer": "Generate costume descriptions for each character",
  "Research Helper": "Find facts and references to make your story accurate",
  "Fact Checker": "Verify claims and details in your script are correct",
  "Pitch Deck Builder": "Create a visual presentation to pitch your film idea",
  "Coverage Writer": "Write professional script coverage and analysis",
  "Version Control": "Track changes and manage different versions of your script",
  "Revision Tracker": "Keep track of all edits made to your script over time",
  "Collab Hub": "Share and co-write scripts with your production team",
  "Story Outliner": "Build a visual map of your entire story structure",
  "Character Mapper": "Map relationships between all characters in your story",
  "Emotional Arc Map": "Chart the emotional journey of your characters",
  "Story Arc Map": "Visualise the rise and fall of tension through your story",
  "Flashback Creator": "Write and structure flashback sequences into your script",
  "Foreshadowing Tool": "Plant clues and hints that pay off later in the story",
  "MacGuffin Creator": "Design the object or goal that drives your plot forward",
  "Trope Finder": "Identify common storytelling tropes in your script",
  "Cliche Detector": "Spot overused phrases and ideas to make your script fresher",
  "POV Analyzer": "Check and clarify whose point of view each scene is told from",
  "Tense Checker": "Ensure consistent use of past or present tense throughout",
  "Scene Analyzer": "Break down any scene to understand its purpose and impact",
  "Mythology Builder": "Create a rich mythology and lore for your story world",
  "Quest Designer": "Structure a quest or mission that drives your story forward",
  "Story Consultant": "Get AI feedback on how to improve your overall story",
  "Inciting Incident Finder": "Identify the moment that kicks your story into motion",
  "Midpoint Architect": "Design the crucial turning point at the middle of your story",
  "Character Interview": "Interview your characters to discover how they think and speak",
  "Scene Setting Engine": "Write vivid descriptions that establish time and place",
  "Prophecy Creator": "Write mysterious prophecies that drive your fantasy story",
  "History Timeline": "Build a detailed timeline of events in your story world",
  "Geography Mapper": "Design the geography and layout of your story world",
  "Economy Builder": "Create the economic system of your fictional world",
  "Culture Creator": "Design the customs and culture of your story world",
  "Plot Tension Engine": "Ratchet up tension and stakes at key story moments",
  "Character Voice Lab": "Develop a unique and consistent voice for each character",
  "Sprint Timer": "Set timed writing sessions to boost productivity",
  "Pitch Writer": "Write a compelling verbal pitch for your film project",
  "Tagline Generator": "Create memorable one-line taglines for your film",
  "Upload Own Voice": "Upload your own recorded voice for use in projects",
  "Record My Voice": "Record your voice directly in the app",
  "Clone My Voice": "Create an AI clone of your voice for narration",
  "Text to Speech": "Convert any written text into natural spoken audio",
  "Text to Voice": "Generate a human-sounding voice from your text",
  "Text to Narration": "Create professional narration audio from your script",
  "Text to Audiobook": "Turn your written content into a full audiobook",
  "Text to Voiceover": "Generate smooth voiceover audio for your videos",
  "Voice Cloning": "Clone any voice to create consistent character audio",
  "Voice to Voice": "Transform one voice style into another voice style",
  "AI Voice Actor": "Generate professional voice acting for any character",
  "Neural Voice Generator": "Create ultra-realistic AI voices using neural technology",
  "Emotion Voice Synth": "Add emotion like joy, fear or sadness to any voice",
  "Trailer Voice Generator": "Create the iconic deep trailer narrator voice",
  "Documentary Voice": "Generate the authoritative tone used in documentaries",
  "Commercial Voice": "Create the warm friendly voice used in advertisements",
  "News Anchor Voice": "Generate a clear professional broadcast news voice",
  "Character Voice Creator": "Build a unique voice for any fictional character",
  "Accent Generator": "Apply any regional or international accent to a voice",
  "Multi Language Voice": "Generate speech in any of 50+ languages",
  "Voice Translator": "Translate and re-voice audio into another language",
  "Lip Sync AI": "Sync mouth movements to any audio automatically",
  "Dialogue Synth": "Synthesise realistic character dialogue from text",
  "Audiobook Creator": "Produce a complete audiobook with chapter narration",
  "Podcast Voice": "Generate natural sounding podcast presenter voices",
  "Radio DJ Voice": "Create the energetic voice style of a radio presenter",
  "Sports Commentary Voice": "Generate live-style sports commentary narration",
  "Meditation Voice": "Create calm soothing voices for meditation content",
  "ASMR Creator": "Generate soft whispered ASMR audio content",
  "Whisper Generator": "Create intimate whispered voice audio",
  "Deep Voice Generator": "Generate a rich powerful deep voice",
  "Robot Voice": "Create a mechanical robotic synthesised voice",
  "Alien Voice": "Generate otherworldly alien character voices",
  "Monster Voice": "Create terrifying monster and creature voices",
  "Child Voice": "Generate realistic child character voices",
  "Elderly Voice": "Create authentic older character voice performances",
  "Male to Female Voice": "Convert male voice recordings to female voice",
  "Female to Male Voice": "Convert female voice recordings to male voice",
  "Speed Controller": "Speed up or slow down any voice recording",
  "Pitch Controller": "Raise or lower the pitch of any voice",
  "Tone Adjuster": "Adjust warmth, brightness and texture of a voice",
  "Volume Normalizer": "Balance volume levels across all audio tracks",
  "Clarity Booster": "Enhance speech clarity and intelligibility",
  "Voice Denoiser": "Remove background noise from voice recordings",
  "Echo Remover": "Eliminate echo and reverb from voice audio",
  "Reverb Remover": "Strip reverb from recorded voice tracks",
  "Background Noise Remover": "Remove ambient noise leaving only the voice",
  "Voice EQ Studio": "Fine-tune voice frequencies for perfect sound",
  "De-Esser": "Reduce harsh sibilant sounds in voice recordings",
  "Pop Filter Sim": "Simulate a pop filter to remove plosive sounds",
  "Noise Gate": "Cut audio below a volume threshold automatically",
  "Compression Tool": "Even out loud and quiet parts of voice audio",
  "Reverb Voice FX": "Add atmospheric reverb to voice recordings",
  "Echo Voice FX": "Add controlled echo effects to voice audio",
  "Chorus FX": "Add a chorus effect to thicken voice sound",
  "Phone Effect": "Make voice sound like it is coming through a phone",
  "Radio Effect": "Add the lo-fi crackle of a radio transmission",
  "Megaphone Effect": "Make voice sound like a megaphone or PA system",
  "Lo-Fi Voice": "Add vintage lo-fi character to voice recordings",
  "Distortion FX": "Add gritty distortion to create dramatic voice effects",
  "Warmth Adder": "Add warmth and richness to thin voice recordings",
  "Brightness Mixer": "Increase the brightness and presence of a voice",
  "Richness Amplifier": "Enhance the fullness and body of any voice",
  "Resonance Tuner": "Tune the resonance frequencies of recorded voice",
  "Dynamic Range Engine": "Control the dynamic range of voice performances",
  "Vocal Enhancer": "Overall enhancement for professional voice quality",
  "Voice Consistency Checker": "Ensure voice quality stays consistent across takes",
  "Narrator Optimizer": "Optimize narration audio for documentary style",
  "Breathing Remover": "Remove audible breathing sounds from recordings",
  "Room Tone Match": "Match the ambient room tone across different recordings",
  "Studio Grade Clarity": "Apply studio-quality processing to any voice recording",
  "Voice Recorder": "Record voice directly in the app with one click",
  "Voice Timer": "Time voice recordings and narration sessions",
  "Voice Health Monitor": "Monitor voice strain and recommend rest periods",
  "Multi Voice Generator": "Generate multiple different voices for a scene",
  "Voice Mixer": "Mix multiple voice tracks into one balanced audio file",
  "Voice Layering": "Layer voices together to create rich choral effects",
  "Choir Generator": "Generate a full choir from a single voice recording",
  "Crowd Voice": "Create the sound of a crowd from individual voices",
  "Baby Voice": "Generate realistic baby and infant voice sounds",
  "Singing Voice": "Convert spoken text into a sung melody",
  "Rap Voice Generator": "Generate rhythmic rap-style vocal delivery",
  "Spoken Word Generator": "Create artistic spoken word poetry performances",
  "Voice to Text": "Transcribe any voice recording into written text",
  "Voice Transcriber": "Convert spoken audio into accurate text transcriptions",
  "Subtitle from Voice": "Auto-generate subtitles from voice audio",
  "Caption Generator": "Create captions from any voice or dialogue audio",
  "Voice Style Transfer": "Apply one voice style to a different recording",
  "Celebrity Voice Match": "Match the style of famous voice performers",
  "Smooth Voice Filter": "Apply smoothing to rough or inconsistent voice audio",
  "Texture Designer": "Add unique texture and character to voice recordings",
  "Projection Booster": "Increase the power and projection of a voice",
  "Volume Expander": "Expand the dynamic volume range of voice audio",
  "Timbre Modifier": "Change the tonal quality and character of a voice",
  "Voice Warm-up": "Guided exercises to warm up your voice before recording",
  "Posture Guide": "Tips for correct posture during voice recording sessions",
  "Text to Image": "Generate an image from a text description",
  "Prompt to Image": "Turn any prompt into a detailed AI-generated image",
  "Image to Image": "Transform one image into another using AI styling",
  "Image Upscaler": "Increase image resolution without losing quality",
  "Image Generator": "Create original images from scratch using AI",
  "AI Art Generator": "Generate artistic and creative images in any style",
  "Photo to Painting": "Convert photographs into painted artwork styles",
  "Sketch to Image": "Turn rough sketches into fully rendered images",
  "Wireframe to Image": "Convert design wireframes into realistic visuals",
  "Background Generator": "Create custom backgrounds for any scene or setting",
  "Background Remover": "Remove the background from any image automatically",
  "Sky Replacer": "Replace the sky in any photo with a new sky",
  "Object Remover": "Remove unwanted objects from images seamlessly",
  "Face Generator": "Generate realistic human faces for characters",
  "Character Design": "Design detailed visual characters for your film",
  "Portrait Generator": "Create professional portrait images of characters",
  "Avatar Creator": "Design a custom avatar or character illustration",
  "Product Image Generator": "Create professional product photography with AI",
  "Architecture Visualizer": "Visualise buildings and spaces before they are built",
  "Interior Design Generator": "Generate interior design concepts for film sets",
  "Landscape Generator": "Create sweeping landscape images for film backgrounds",
  "Abstract Art Generator": "Generate abstract artwork in any visual style",
  "Logo Generator": "Design a professional logo for your film or studio",
  "Icon Creator": "Create small icons and graphic elements for your project",
  "Texture Generator": "Generate surface textures for use in film and design",
  "Pattern Maker": "Create repeating patterns for backgrounds and surfaces",
  "Color Palette Generator": "Generate cohesive color palettes for your film",
  "Style Transfer": "Apply the visual style of one image to another",
  "Photo Enhancer": "Improve photo quality with AI enhancement",
  "Photo Restorer": "Restore damaged or faded old photographs",
  "Old Photo Colorizer": "Add color to black and white historical photographs",
  "Black & White to Color": "Colorize black and white images automatically",
  "Image Denoiser": "Remove grain and noise from digital images",
  "Sharpness Enhancer": "Increase the sharpness and detail in images",
  "Clarity Booster": "Enhance midtone contrast for clearer images",
  "Detail Enhancer": "Bring out fine details in images and photographs",
  "HDR Image Creator": "Create high dynamic range images with rich contrast",
  "Exposure Fixer": "Correct overexposed or underexposed images",
  "White Balance AI": "Automatically correct color temperature in images",
  "Color Grading Studio": "Apply cinematic color grades to your images",
  "LUT Creator": "Create custom Look Up Tables for color grading",
  "Tone Mapper": "Map tones for cinematic looks in your images",
  "Contrast Adjuster": "Fine-tune contrast for the perfect image balance",
  "Brightness Tool": "Adjust overall brightness of images precisely",
  "Saturation Engine": "Control the intensity of colors in your images",
  "Hue Shift": "Shift all colors in an image by any degree",
  "Temperature Control": "Warm or cool the color temperature of images",
  "Vignette Tool": "Add a darkened border vignette to images",
  "Bokeh Generator": "Add artistic background blur to any image",
  "Depth of Field": "Simulate camera depth of field blur effects",
  "Film Grain Synth": "Add authentic film grain texture to digital images",
  "Light Leaks": "Add vintage film light leak effects to images",
  "Lens Flare": "Add cinematic lens flare to images and video",
  "God Rays": "Add volumetric light rays through scenes",
  "Volumetric Light": "Create atmospheric volumetric lighting effects",
  "Golden Hour FX": "Apply the warm glow of golden hour lighting",
  "Blue Hour FX": "Add the cool blue tones of twilight to images",
  "Sunset FX": "Apply dramatic sunset color effects to any image",
  "Sunrise FX": "Add soft warm sunrise tones to your images",
  "Moonlight FX": "Create cool blue moonlight atmosphere in images",
  "Neon Light": "Add vibrant neon lighting effects to scenes",
  "Fire Light": "Simulate warm flickering firelight on subjects",
  "Candle Light": "Add intimate warm candle light to images",
  "Studio Light": "Apply professional studio lighting setups to images",
  "3 Point Light": "Add classic three-point lighting to any image",
  "Rim Light": "Add a dramatic rim or edge light to subjects",
  "Shadow Generator": "Create and control shadows in images",
  "Highlight Creator": "Add and control highlights on subjects and surfaces",
  "Ambient Occlusion": "Add realistic contact shadows to scenes",
  "Global Illumination": "Simulate realistic light bouncing through scenes",
  "Panorama Stitcher": "Stitch multiple images into a seamless panorama",
  "360 Image Creator": "Create fully immersive 360-degree images",
  "Fisheye Corrector": "Remove fisheye distortion from wide angle shots",
  "Lens Distorter": "Apply lens distortion effects to images",
  "Chromatic Aberration": "Add realistic lens color fringing effects",
  "Motion Blur": "Add realistic motion blur to moving subjects",
  "Radial Blur": "Create zoom or spin blur from a central point",
  "Zoom Blur": "Add a fast zoom blur for dynamic energy",
  "Gaussian Blur": "Apply smooth Gaussian blur to images or regions",
  "Weather FX": "Add weather effects like rain or snow to images",
  "Rain Effect": "Add realistic falling rain to any image",
  "Snow Effect": "Add falling snow effects to outdoor scenes",
  "Fog Generator": "Add atmospheric fog and mist to images",
  "Smoke FX": "Add realistic smoke effects to scenes",
  "Fire Creator": "Add realistic fire and flame effects",
  "Explosion FX": "Create dramatic explosion effects in images",
  "Lightning FX": "Add dramatic lightning bolt effects to skies",
  "Aurora Effect": "Add the northern lights aurora to night sky images",
  "Rainbow Creator": "Add a natural rainbow arc to sky images",
  "Caustics Engine": "Simulate light caustic patterns through water or glass",
  "Prop Creator": "Design and generate props for film scenes",
  "Scene Compositor": "Composite multiple image elements into one scene",
  "Lighting Designer": "Design complete lighting setups for film scenes",
  "Cloud Generator": "Generate realistic cloud formations for sky scenes",
  "Dehaze Engine": "Remove haze and atmospheric fog from images",
  "Text to Video": "Generate a video clip from a text description",
  "Prompt to Video": "Turn any prompt into a generated video sequence",
  "Image to Video": "Animate a still image into a moving video clip",
  "Script to Video": "Convert a written script into video automatically",
  "Story to Video": "Turn a story into a complete video production",
  "AI Movie Creator": "Create a complete short movie using AI generation",
  "AI Film Maker": "Generate full film sequences from descriptions",
  "AI Video Generator": "Create any video content from text prompts",
  "Scene Generator": "Generate complete film scenes from descriptions",
  "Shot Generator": "Generate specific camera shots for your film",
  "Video Upscaler 4K": "Upscale video resolution to crisp 4K quality",
  "Video Upscaler 8K": "Upscale video resolution to stunning 8K quality",
  "Frame Rate Booster": "Increase video frame rate for smoother playback",
  "60FPS Converter": "Convert any video to smooth 60 frames per second",
  "Slow Motion Generator": "Create smooth slow motion from standard video",
  "Time Lapse Creator": "Condense long events into dramatic time lapse clips",
  "Speed Ramp Engine": "Smoothly speed up and slow down within clips",
  "Video Extender": "Extend the length of video clips using AI",
  "Video Stabilizer": "Remove camera shake and stabilize shaky footage",
  "Background Remover": "Remove video backgrounds and replace them",
  "Green Screen Replacer": "Replace green screen backgrounds with any footage",
  "Sky Replacer Video": "Replace the sky in video footage automatically",
  "Object Remover Video": "Remove unwanted objects from video scenes",
  "Watermark Remover": "Remove logos and watermarks from video footage",
  "Video Denoiser": "Remove grain and noise from video footage",
  "Video Sharpener": "Increase sharpness and detail in video footage",
  "Color Grading Pro": "Apply professional color grades to video footage",
  "Film Look Generator": "Give digital video the look of film stock",
  "Cinematic LUT": "Apply cinematic Look Up Tables to video footage",
  "Black & White Film": "Convert color video to classic black and white",
  "Film Restorer": "Restore old or damaged film footage",
  "Old Film Effect": "Make modern video look like vintage film",
  "VHS Effect": "Add authentic VHS tape distortion effects",
  "Glitch Effect": "Add digital glitch distortion to video",
  "Hologram Effect": "Create a sci-fi hologram video effect",
  "Drone Shot Generator": "Generate aerial drone-style video footage",
  "Aerial View Creator": "Create birds-eye aerial view video shots",
  "Tracking Shot": "Generate smooth camera tracking movements",
  "Dolly Zoom": "Create the dramatic Vertigo dolly zoom effect",
  "Whip Pan": "Add fast whip pan transitions between scenes",
  "Time Freeze": "Freeze time and move around subjects in video",
  "Bullet Time Effect": "Create the iconic Matrix bullet time effect",
  "Matrix Effect": "Add the famous green code Matrix visual effect",
  "Clone Effect": "Duplicate a person in the same video frame",
  "Face Swap Video": "Swap faces between people in video footage",
  "Deepfake Detector": "Detect AI-generated deepfake video content",
  "Age Progression Video": "Show a character aging over time in video",
  "De-Aging Video": "Make subjects appear younger in video footage",
  "Talking Head Generator": "Generate a realistic talking head video",
  "Avatar Video Creator": "Create animated avatar videos from descriptions",
  "Virtual Presenter": "Generate a virtual human presenter for videos",
  "AI News Anchor": "Create an AI news anchor reading any script",
  "Lip Sync Video": "Sync lip movements to any audio in video",
  "Mouth Animation": "Animate mouth movements from audio input",
  "Eye Contact Correction": "Make subjects appear to look at the camera",
  "Head Pose Correction": "Fix head angle and pose in video footage",
  "Video Translator": "Translate and re-voice video in any language",
  "Subtitle Generator": "Auto-generate subtitles for any video",
  "Caption Burner": "Burn captions permanently into video footage",
  "Auto Subtitles": "Automatically create and sync subtitles to video",
  "Video Loop Creator": "Create seamlessly looping video clips",
  "Boomerang Effect": "Create a forward-reverse boomerang video loop",
  "Reverse Video": "Play any video clip in reverse",
  "Mirror Effect": "Mirror video footage horizontally or vertically",
  "Split Screen Creator": "Show multiple video clips side by side",
  "Picture in Picture": "Overlay a small video inside a larger video",
  "Video Collage": "Combine multiple videos into one collage layout",
  "Slideshow Maker": "Create a video slideshow from images",
  "Transition Generator": "Create smooth transitions between video clips",
  "Intro Maker": "Create a professional intro sequence for your film",
  "Outro Maker": "Create a polished outro and credits sequence",
  "Lower Third Generator": "Add professional lower third name graphics",
  "Title Card Creator": "Design title cards and intertitles for your film",
  "End Screen Maker": "Create a compelling end screen for your video",
  "Thumbnail Generator": "Generate eye-catching video thumbnails",
  "Cover Frame Selector": "Choose the best frame to represent your video",
  "Video Compressor": "Reduce video file size without losing quality",
  "Format Converter": "Convert video between different file formats",
  "Resolution Changer": "Change video resolution up or down",
  "Crop & Resize": "Crop and resize video to any aspect ratio",
  "Video Trimmer": "Trim the start and end of video clips",
  "Scene Cutter": "Automatically cut video into individual scenes",
  "Auto Edit": "Automatically edit footage into a finished sequence",
  "Jump Cut Generator": "Create dynamic jump cut editing automatically",
  "Beat Sync Editor": "Sync video cuts to music beats automatically",
  "Highlight Reel Maker": "Create a highlight reel from longer footage",
  "Recap Generator": "Create a recap video from previous episodes",
  "Trailer Maker": "Automatically edit footage into a movie trailer",
  "Teaser Creator": "Create a short teaser clip that builds anticipation",
  "Sizzle Reel": "Create a fast-paced promotional sizzle reel",
  "Text to Animation": "Generate animated video from a text description",
  "Prompt to Motion": "Turn any prompt into animated motion content",
  "Image to Animation": "Animate a still image into motion",
  "2D to 3D Animation": "Convert flat 2D animation into 3D depth",
  "Character Animation": "Animate characters with realistic movement",
  "Facial Animation": "Animate facial expressions on any character",
  "Body Motion Capture": "Apply motion capture data to characters",
  "Hand Animation": "Animate realistic hand and finger movements",
  "Lip Sync Animation": "Sync character mouth movements to audio",
  "Eye Blink Animation": "Add natural eye blink animations to characters",
  "Crowd Animation": "Generate animated crowds of people",
  "Animal Animation": "Animate realistic animal movement and behaviour",
  "VFX Generator": "Generate visual effects for any scene",
  "Particle Effect Generator": "Create particle systems like sparks or stars",
  "Explosion Generator": "Create realistic explosion visual effects",
  "Fire Animation": "Generate realistic animated fire effects",
  "Smoke Animation": "Create realistic smoke and vapour animations",
  "Water Simulation": "Simulate realistic water behaviour and flow",
  "Rain Animation": "Add animated falling rain to video scenes",
  "Snow Animation": "Add animated falling snow to video scenes",
  "Magic Effect": "Create magical visual effects like spells and portals",
  "Energy Beam": "Generate energy beam and laser visual effects",
  "Portal Effect": "Create dimensional portal opening visual effects",
  "Teleportation FX": "Create teleportation visual effects for characters",
  "Force Field": "Generate force field and energy shield effects",
  "Shockwave Creator": "Create expanding shockwave visual effects",
  "Laser Effect": "Generate precision laser beam visual effects",
  "Plasma Effect": "Create plasma and electricity visual effects",
  "Hologram Animation": "Animate holographic projection effects",
  "Glitch FX": "Add digital glitch and distortion animations",
  "Invisibility Effect": "Make subjects appear to turn invisible",
  "Morphing Effect": "Create smooth morphing between two subjects",
  "Liquid Metal": "Generate liquid metal transformation effects",
  "Shape Shifting": "Animate characters or objects changing shape",
  "Disintegration FX": "Create dramatic disintegration visual effects",
  "Physics Simulator": "Simulate realistic physical behaviour in scenes",
  "Gravity Simulator": "Simulate gravitational effects on objects",
  "Cloth Dynamics": "Simulate realistic cloth and fabric movement",
  "Hair Simulator": "Simulate realistic hair and fur movement",
  "Fur Dynamics": "Generate realistic fur simulation for animals",
  "Rigid Body Physics": "Simulate hard object collisions and movement",
  "Soft Body Physics": "Simulate flexible soft object deformation",
  "Fluid Dynamics": "Simulate realistic fluid and liquid behaviour",
  "Rope Physics": "Simulate realistic rope and cable movement",
  "Chain Dynamic": "Simulate chain links and mechanical movement",
  "Destruction Simulator": "Create realistic building and object destruction",
  "Fracture System": "Simulate objects breaking apart realistically",
  "Debris Generator": "Create flying debris from explosions",
  "Dust Effect": "Add realistic dust clouds and particles",
  "Spark Generator": "Generate realistic spark and ember effects",
  "Motion Tracker": "Track moving objects through video footage",
  "Camera Tracker": "Track camera movement for VFX integration",
  "Object Tracker": "Track specific objects through video scenes",
  "Face Tracker": "Track and follow faces through video footage",
  "Stabilizer": "Stabilize camera movement in video footage",
  "Speed Lines": "Add motion speed lines to fast moving subjects",
  "Zoom Blur Motion": "Add zoom motion blur for dynamic energy",
  "Motion Trail": "Create motion trails behind moving objects",
  "Echo Effect": "Create multiple echoing copies of moving subjects",
  "Ghost Effect": "Add a ghostly trailing effect to movement",
  "Freeze Frame": "Freeze a single frame in the middle of video",
  "Slow Motion FX": "Create dramatic slow motion visual effects",
  "Hyperspeed Effect": "Create hyperspeed warp travel visual effects",
  "Time Warp": "Distort and warp time within video footage",
  "Strobe Effect": "Add strobe light flashing effects to video",
  "Keyframe Animator": "Set keyframes to animate any property over time",
  "Ease In / Ease Out": "Add smooth acceleration and deceleration to animation",
  "Bounce Effect": "Add realistic bouncing animation to objects",
  "Elastic Motion": "Create stretchy elastic movement animations",
  "Spring System": "Add spring-based physics to animations",
  "Path Animator": "Animate objects along any custom drawn path",
  "Orbit Animation": "Animate objects orbiting around a central point",
  "Rotation Loop": "Create seamless rotating animation loops",
  "Float Animation": "Add gentle floating movement to objects",
  "Pendulum Motion": "Animate realistic pendulum swinging movement",
  "Screen Shake": "Add camera shake to intense action moments",
  "Camera Shake": "Apply realistic camera shake to footage",
  "Handheld Camera FX": "Simulate handheld documentary camera movement",
  "Cinematic Push In": "Create smooth dramatic push-in camera moves",
  "Ken Burns Effect": "Apply the classic Ken Burns pan and zoom to images",
  "Parallax Effect": "Create depth using parallax scrolling layers",
  "3D Camera Move": "Generate 3D camera movement through scenes",
  "Dolly In Animation": "Animate a smooth dolly in camera move",
  "Crane Move": "Simulate a crane camera rise or sweep movement",
  "Tilt Shift Animation": "Apply miniature tilt shift effects to footage",
  "Cartoon Animation": "Convert footage to cartoon animation style",
  "Stop Motion Style": "Apply stop motion animation style to footage",
  "Claymation Effect": "Give footage the look of claymation animation",
  "Puppet Rig": "Create a puppet rig to control character movement",
  "IK Rig Builder": "Build inverse kinematics rigs for character animation",
  "Skeleton Animator": "Animate characters using a skeleton bone system",
  "Mocap Solver": "Solve and apply motion capture data to characters",
  "Facial Rigging": "Create facial animation rigs for characters",
  "Muscle System": "Simulate realistic muscle movement under skin",
  "Skin Deformer": "Deform skin meshes realistically with movement",
  "AI 8K Upscaling": "Upscale video to stunning 8K resolution with AI",
  "AI 4K Upscaling": "Upscale video to crisp 4K resolution with AI",
  "Video Super Resolution": "Use AI to dramatically increase video resolution",
  "Frame Interpolation": "Generate smooth extra frames between existing frames",
  "Video Denoiser": "Remove all noise and grain from video footage",
  "Noise Reduction": "Reduce digital noise in video and audio",
  "Grain Remover": "Remove film grain from footage for a clean look",
  "Artifact Remover": "Remove compression artifacts from video files",
  "Scratch Remover": "Remove scratches and damage from film footage",
  "Video Sharpener": "Increase sharpness and detail in video",
  "Detail Enhancer": "Bring out fine detail that was lost in compression",
  "Edge Enhancement": "Sharpen and define edges for a crisp look",
  "Texture Boost": "Enhance surface texture detail in video footage",
  "Color Correction": "Fix and correct color issues in footage",
  "Auto Color Balance": "Automatically balance colors for natural results",
  "White Balance AI": "AI correction of white balance across footage",
  "Color Match Pro": "Match the color grade between different clips",
  "Color Grading AI": "Apply AI-generated color grades to your footage",
  "Cinematic Color Grade": "Apply professional cinematic color grades",
  "Film Stock Emulation": "Emulate the look of classic film stocks",
  "LUT Generator": "Generate custom LUT color grading presets",
  "Tone Mapping Pro": "Advanced tone mapping for HDR footage",
  "HDR Enhancement": "Enhance and expand the HDR range of footage",
  "Deep HDR Boost": "Deeply enhance HDR detail in highlights and shadows",
  "Dynamic Range Expansion": "Expand the dynamic range of your footage",
  "Shadow Recovery": "Recover detail from dark shadow areas",
  "Highlight Recovery": "Recover blown out highlight detail",
  "Highlight Rolloff": "Create natural smooth highlight rolloff",
  "Black Point Calibration": "Set the perfect black point for your footage",
  "Gamma Correction": "Correct gamma for proper brightness and contrast",
  "Contrast Enhancer": "Boost contrast for a more punchy image",
  "Brightness Optimizer": "Optimize overall brightness for best results",
  "Saturation Booster": "Increase color saturation for vivid results",
  "Smart Saturation": "AI-powered selective saturation enhancement",
  "Skin Tone Enhancer": "Specifically enhance and perfect skin tones",
  "Face Enhancement": "Enhance facial features and skin quality",
  "Face Retouch": "Retouch faces to remove blemishes and imperfections",
  "Eye Enhancer": "Brighten and enhance eyes in video footage",
  "Teeth Whitener": "Whiten teeth in video footage automatically",
  "Background Enhancer": "Enhance and improve background areas",
  "Sky Enhancer": "Enhance sky detail, color and drama",
  "Landscape Enhancer": "Enhance landscape footage with richer detail",
  "Night Video Enhancer": "Dramatically improve low-light night footage",
  "Low Light Clarity": "Bring clarity to dark underexposed footage",
  "Motion Stabilization": "Remove all unwanted camera movement",
  "Shake Remover": "Specifically target and remove camera shake",
  "Rolling Shutter Fix": "Fix rolling shutter wobble in handheld footage",
  "Flicker Reduction": "Reduce flickering caused by lighting issues",
  "Flicker Fixer": "Completely eliminate flicker from footage",
  "Lens Distortion Fix": "Correct lens distortion in wide angle footage",
  "Vignette Remover": "Remove unwanted vignetting from footage",
  "Chromatic Aberration Fix": "Remove color fringing around high contrast edges",
  "Moire Remover": "Eliminate moire patterns from footage",
  "De-Banding Pro": "Remove banding artifacts from gradients",
  "Anamorphic Correction": "Correct and manage anamorphic lens footage",
  "Audio Enhancer": "Enhance overall audio quality in your video",
  "Voice Clarity Booster": "Specifically boost voice clarity in recordings",
  "Dialogue Enhancer": "Enhance spoken dialogue in film and video",
  "Background Noise Remover": "Remove all background noise from audio",
  "Echo Remover": "Remove echo from audio recordings",
  "Reverb Remover": "Strip reverb from voice and audio tracks",
  "Hum Remover": "Remove electrical hum and buzz from recordings",
  "Wind Noise Remover": "Remove wind noise from outdoor recordings",
  "Breath Remover": "Remove audible breaths from voice recordings",
  "Click & Pop Remover": "Remove clicks and pops from audio tracks",
  "Room Tone Match": "Match room tone across different recordings",
  "Audio Normalization": "Normalize audio levels to a standard volume",
  "Loudness Optimizer": "Optimize loudness for broadcast standards",
  "Cinematic Grain": "Add beautiful cinematic grain to your footage",
  "Film Grain Advanced": "Advanced film grain control and customization",
  "Halation Effect": "Add the soft halation glow of film to your footage",
  "Glow Synthesis": "Add atmospheric glow to bright areas",
  "Bloom Control": "Control and add lens bloom to highlights",
  "Lens Flare Enhancer": "Enhance and add cinematic lens flares",
  "Atmospheric Haze": "Add atmospheric haze for depth and mood",
  "Light Wrap": "Wrap background light around foreground subjects",
  "Depth of Field Enhancement": "Enhance background blur and depth of field",
  "Bokeh Enhancer": "Improve and stylise background bokeh blur",
  "Focus Puller": "Simulate a rack focus pull between subjects",
  "Optical Flow Smooth": "Use optical flow for ultra smooth slow motion",
  "Temporal Denoise": "Remove noise consistently across time in video",
  "Motion Blur Add": "Add natural motion blur to CGI or still footage",
  "Sky Replacement": "Replace any sky in video with a new sky",
  "Background Replacement": "Replace entire video backgrounds",
  "Object Removal": "Remove any object from video footage",
  "Watermark Remover": "Remove watermarks and logos from footage",
  "Subtitles Enhancer": "Improve the styling and readability of subtitles",
  "Burned Caption Fix": "Fix or remove burned-in captions from footage",
  "Frame Rate Fix": "Fix frame rate issues and inconsistencies",
  "Sync Fix": "Fix audio and video sync problems",
  "Audio Drift Fix": "Correct gradual audio drift over long recordings",
  "Quality Optimizer": "Overall quality optimization for final output",
  "File Size Optimizer": "Reduce file size while maintaining quality",
  "Codec Converter": "Convert between different video codecs",
  "Format Enhancer": "Enhance video during format conversion",
  "Master Exporter": "Export your final master file in any format"
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
  // Examples page state
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

  // Auto-save
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

  // Ocean video autoplay on pages 1-2
  useEffect(() => {
    if (oceanRef.current && (page === 1 || page === 2)) {
      oceanRef.current.muted = true;
      oceanRef.current.play().catch(() => {});
    }
  }, [page]);

  // Load saved
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

  const handleAIGenerate = useCallback(() => {
    if (!aiPrompt.trim() || !selectedTool) return;
    setGenerating(true);
    addToast(`Generating: ${selectedTool}...`, 'info');
    setTimeout(() => {
      const asset: Asset = {
        id: Date.now(),
        name: `AI_${selectedTool.replace(/\s+/g, '_')}_${Date.now()}.mp4`,
        type: 'video',
        size: (Math.random() * 500 + 100).toFixed(2) + 'MB',
        url: OCEAN_VIDEO,
        aiGenerated: true,
        timestamp: new Date().toISOString()
      };
      setMediaLibrary(prev => [...prev, asset]);
      setGenerating(false);
      setAiPrompt('');
      setSelectedTool(null);
      addToast(`Generated: ${selectedTool}`, 'success');
    }, 2500);
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

  const sendGrokMessage = useCallback(() => {
    if (!grokMessage.trim()) return;
    const userMsg = grokMessage;
    setGrokChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setGrokMessage('');
    setTimeout(() => {
      const responses: Record<string, string> = {
        upload: "Go to Page 11 — Upload Media. Click Browse Files to upload from your device, Record Screen to capture live, or Import URL to load a direct video link. Supports MP4, MOV, AVI, WebM, MP3, WAV, JPG, PNG.",
        tool: "Pages 5–10 are the AI Tool Boards — Writing, Voice, Image, Video, Motion, and Enhancement. Use the search bar to filter all 600+ tools. Click any tool card to open the generation panel with upload and AI prompt options.",
        timeline: "Page 13 — Timeline Editor. Drag assets from the Media Pool on the left onto the Video, Audio, or Text tracks. Drag from library and drop onto the track bar. Hit → RENDER to go to the render page.",
        render: "Page 16 — Render Film. Choose your quality (8K, 4K, 1080p, 720p) and format (MP4, MOV, AVI, WebM), then click START RENDER. Your finished film automatically saves to your media library and opens in Preview.",
        audio: "Page 15 — Audio Mixer. Four channels: Music, Voice, SFX, and Master. Drag the vertical sliders to adjust each level. The VU meter shows your live levels. Click Save Preset to keep your mix.",
        export: "Page 18 — Export. After rendering, choose Download to Device to save the file, Save Project File to export a JSON backup, or Share to Community Hub to post it for others to see.",
        enhance: "Page 14 — Enhancement Studio. Browse 90+ tools organized by type. Click any tool to open its control panel with Intensity, Clarity, Color, and Brightness sliders. Click Apply Enhancement to process.",
        subscribe: "Page 4 — Login & Subscribe. Three plans: Creator $20/mo (HD), Pro $30/mo (4K), Studio $50/mo (8K + 600 tools). New Studio subscribers get a 7-Day Free Trial. All plans include a 30-day money-back guarantee.",
        price: "Plans start at $20/month. Creator: HD export, 100 tools. Pro: 4K, 300 tools. Studio: 8K, all 600+ tools, 1TB storage. New Studio subscribers receive a 7-Day Free Trial.",
        login: "Go to Page 4 — Login & Subscribe. Click Sign In for existing accounts or Create Account to register. You can also explore as a guest with no login required.",
        example: "Page 3 — Examples. Admin-uploaded films showcase what MandaStrong Studio can create. Films will appear here once uploaded by the studio team.",
        community: "Page 22 — Community Hub. View films uploaded by other creators, like or love posts, and leave comments. Click Upload Your Movie to share your own creation.",
      };
      const key = Object.keys(responses).find(k => userMsg.toLowerCase().includes(k));
      const reply = key ? responses[key] : "I'm here to help with any part of MandaStrong Studio. Ask me about: uploading media, AI tools, the timeline editor, audio mixing, enhancement studio, rendering, exporting, subscriptions, or the community hub.";
      setGrokChat(prev => [...prev, { role: 'agent', text: reply }]);
    }, 1000);
  }, [grokMessage]);

  // ==================== STYLES ====================
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=Barlow:ital,wght@0,300;0,400;0,700;1,300;1,700&display=swap');
    
    :root {
      --void: #060608;
      --deep: #0c0c10;
      --panel: #111116;
      --border: rgba(255,255,255,0.06);
      --border-active: rgba(139,92,246,0.5);
      --purple: #6B21A8;
      --purple-mid: #7C3AED;
      --purple-bright: #A78BFA;
      --silver: #94A3B8;
      --silver-bright: #CBD5E1;
      --text: #E2E8F0;
      --text-dim: #64748B;
      --purple-alt: #A78BFA;
      --red: #EF4444;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    html, body { 
      background: var(--void); 
      color: var(--text); 
      font-family: 'Barlow', sans-serif;
      overflow-x: hidden;
    }

    /* Film grain overlay */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 9998;
      opacity: 0.4;
    }

    .font-display { font-family: 'Bebas Neue', sans-serif; }
    .font-mono { font-family: 'DM Mono', monospace; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--void); }
    ::-webkit-scrollbar-thumb { background: var(--purple); border-radius: 2px; }

    /* Animations */
    @keyframes slideInRight { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes fadeUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes scanline {
      0% { top: -10%; }
      100% { top: 110%; }
    }
    @keyframes flicker { 0%,100%{opacity:1} 50%{opacity:0.97} 75%{opacity:0.99} }

    .fade-up { animation: fadeUp 0.5s ease both; }
    .animate-pulse { animation: pulse 2s ease-in-out infinite; }
    .animate-spin { animation: spin 1s linear infinite; }
    .animate-flicker { animation: flicker 4s ease-in-out infinite; }

    input[type=range] {
      -webkit-appearance: none;
      background: rgba(255,255,255,0.05);
      border-radius: 2px;
      height: 3px;
    }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 14px; height: 14px;
      border-radius: 50%;
      background: var(--purple-mid);
      border: 2px solid var(--purple-bright);
      cursor: pointer;
    }

    /* Panel style */
    .panel {
      background: var(--panel);
      border: 1px solid var(--border);
    }
    .panel-active {
      border-color: var(--border-active);
    }

    /* Btn primary */
    .btn-primary {
      background: var(--purple);
      color: white;
      border: 1px solid rgba(139,92,246,0.3);
      font-family: 'DM Mono', monospace;
      font-size: 0.7rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      padding: 0.6rem 1.5rem;
      cursor: pointer;
      transition: all 0.15s;
    }
    .btn-primary:hover { background: var(--purple-mid); }
    .btn-secondary {
      background: transparent;
      color: var(--text-dim);
      border: 1px solid var(--border);
      font-family: 'DM Mono', monospace;
      font-size: 0.7rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      padding: 0.6rem 1.5rem;
      cursor: pointer;
      transition: all 0.15s;
    }
    .btn-secondary:hover { border-color: var(--purple-bright); color: var(--text); }

    /* Tool card */
    .tool-card {
      background: var(--deep);
      border: 1px solid var(--border);
      padding: 0.75rem 1rem;
      cursor: pointer;
      transition: all 0.15s;
      text-align: left;
    }
    .tool-card:hover {
      border-color: rgba(139,92,246,0.4);
      background: rgba(107,33,168,0.1);
    }

    /* Scanline effect */
    .scanline::after {
      content: '';
      position: absolute;
      left: 0; right: 0;
      height: 2px;
      background: linear-gradient(to right, transparent, rgba(139,92,246,0.15), transparent);
      animation: scanline 6s linear infinite;
      pointer-events: none;
    }

    /* Track */
    .track-bar {
      height: 28px;
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--border);
      position: relative;
      overflow: hidden;
    }

    /* Clip on timeline */
    .timeline-clip {
      position: absolute;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 0.5rem;
      font-family: 'DM Mono', monospace;
      font-size: 0.6rem;
      color: white;
      overflow: hidden;
    }
  `;

  // ==================== NAV MENU ====================
  const NAV_ITEMS = [
    { label: '01 — Home', p: 1 },
    { label: '02 — About', p: 2 },
    { label: '03 — Examples', p: 3 },
    { label: '04 — Login & Access', p: 4 },
    { label: '05 — Writing Tools', p: 5 },
    { label: '06 — Voice Tools', p: 6 },
    { label: '07 — Image Tools', p: 7 },
    { label: '08 — Video Tools', p: 8 },
    { label: '09 — Motion Tools', p: 9 },
    { label: '10 — Enhancement', p: 10 },
    { label: '11 — Upload Media', p: 11 },
    { label: '12 — Editor Suite', p: 12 },
    { label: '13 — Timeline', p: 13 },
    { label: '14 — Enhancements', p: 14 },
    { label: '15 — Audio Mixer', p: 15 },
    { label: '16 — Render', p: 16 },
    { label: '17 — Preview', p: 17 },
    { label: '18 — Export', p: 18 },
    { label: '19 — Tutorials', p: 19 },
    { label: '20 — Terms', p: 20 },
    { label: '21 — Agent Grok', p: 21 },
    { label: '22 — Community', p: 22 },
    { label: '23 — Thank You', p: 23 },
  ];

  const toolCategories = ['Writing', 'Voice', 'Image', 'Video', 'Motion', 'Enhancement'];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--void)', color: 'var(--text)', position: 'relative' }}>
      <style>{css}</style>
      <input ref={fileInputRef} type="file" multiple accept="video/*,audio/*,image/*" onChange={handleFileUpload} style={{ display: 'none' }} />

      {/* TOAST */}
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* AUTO-SAVE */}
      {page >= 5 && (
        <div style={{ position: 'fixed', bottom: '4rem', right: '1rem', zIndex: 100 }}>
          <div className="panel font-mono" style={{ padding: '0.3rem 0.75rem', fontSize: '0.9rem', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {autoSaveStatus === 'saving' && <><Loader size={10} className="animate-spin" style={{ color: '#facc15' }} /><span style={{ color: '#facc15' }}>SAVING</span></>}
            {autoSaveStatus === 'saved' && <><CheckCircle size={10} style={{ color: 'var(--purple-bright)' }} /><span style={{ color: 'var(--purple-bright)' }}>SAVED</span></>}
            {autoSaveStatus === 'idle' && lastSaved && <><span style={{ color: 'var(--text-dim)' }}>AUTOSAVE ON</span></>}
          </div>
        </div>
      )}

      {/* MENU BUTTON */}
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
              <button key={item.p} onClick={() => goTo(item.p)}
                className="font-mono"
                style={{
                  display: 'block', width: '100%', padding: '0.5rem 1rem', textAlign: 'left',
                  fontSize: '0.95rem', letterSpacing: '0.1em', background: page === item.p ? 'rgba(107,33,168,0.2)' : 'transparent',
                  color: page === item.p ? 'var(--purple-bright)' : 'var(--text-dim)',
                  border: 'none', cursor: 'pointer', borderLeft: page === item.p ? '2px solid var(--purple-bright)' : '2px solid transparent',
                  transition: 'all 0.1s'
                }}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* GROK BUTTON */}
      {page !== 21 && (
        <button onClick={() => goTo(21)}
          style={{ position: 'fixed', bottom: '4rem', left: '1.25rem', zIndex: 100, background: 'var(--purple)', border: '1px solid rgba(139,92,246,0.3)', color: 'white', width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <span className="font-display" style={{ fontSize: '1rem' }}>G</span>
        </button>
      )}

      {/* FOOTER */}
      {page >= 1 && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: 50, borderTop: '1px solid var(--border)', background: 'rgba(6,6,8,0.95)', padding: '0.4rem', textAlign: 'center' }}>
          <span className="font-mono" style={{ fontSize: '1rem', letterSpacing: '0.2em', color: 'var(--text-dim)' }}>
            MANDASTRONG STUDIO 2026 &nbsp;•&nbsp; PROFESSIONAL CINEMA SYNTHESIS &nbsp;•&nbsp; MandaStrong1.Etsy.com
          </span>
        </div>
      )}

      {/* NAV ARROWS */}
      {page >= 1 && page < 23 && (
        <div style={{ position: 'fixed', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 100, display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => goTo(page - 1)} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <ChevronLeft size={12} /> BACK
          </button>
          <button onClick={() => goTo(page + 1)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            NEXT <ChevronRight size={12} />
          </button>
        </div>
      )}

      {/* ======================== PAGES ======================== */}
      <main style={{ minHeight: '100vh', paddingBottom: '5rem' }}>

        {/* PAGE 1 — LANDING */}
        {page === 1 && (
          <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
            {/* Ocean video background */}
            <video ref={oceanRef} autoPlay loop muted playsInline
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18, pointerEvents: 'none' }}>
              <source src={OCEAN_VIDEO} type="video/mp4" />
            </video>
            {/* Dark overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,6,8,0.6), rgba(6,6,8,0.75))', pointerEvents: 'none' }} />
            {/* Grid lines */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(139,92,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.04) 1px,transparent 1px)', backgroundSize: '80px 80px', pointerEvents: 'none' }} />

            <div className="font-mono fade-up" style={{ position: 'relative', fontSize: '0.95rem', letterSpacing: '0.4em', color: 'var(--purple-bright)', marginBottom: '2rem', opacity: 0.85 }}>
              CINEMA INTELLIGENCE PLATFORM — EST. 2026
            </div>

            <h1 className="font-display animate-flicker" style={{ position: 'relative', fontSize: 'clamp(5rem,16vw,13rem)', lineHeight: 0.85, letterSpacing: '-0.02em', color: 'white', marginBottom: '1rem', textShadow: '0 0 80px rgba(139,92,246,0.5)' }}>
              MANDA<br />STRONG<br />STUDIO
            </h1>

            <div style={{ position: 'relative', width: '100%', maxWidth: '600px', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(139,92,246,0.6),transparent)', margin: '2rem 0' }} />

            <p className="font-mono fade-up" style={{ position: 'relative', fontSize: '0.9rem', letterSpacing: '0.2em', color: 'var(--silver)', marginBottom: '0.5rem' }}>
              600+ AI TOOLS &nbsp;•&nbsp; 8K EXPORT &nbsp;•&nbsp; UP TO 3-HOUR FILMS
            </p>
            <p style={{ position: 'relative', fontSize: '1.1rem', fontWeight: 300, fontStyle: 'italic', color: 'var(--text-dim)', marginBottom: '0.75rem' }}>
              The All-In-One Professional AI Movie Creation Platform
            </p>
            <p style={{ position: 'relative', fontSize: '0.9rem', fontWeight: 600, color: 'var(--purple-bright)', marginBottom: '3rem', letterSpacing: '0.05em' }}>
              🎬 Special Offer: New Studio Plan Subscribers Receive 7-Day Free Trial
            </p>

            <div style={{ position: 'relative', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={() => goTo(5)} className="btn-primary" style={{ fontSize: '1rem', padding: '0.85rem 2.5rem', background: 'var(--purple-mid)' }}>
                ✦ ENTER STUDIO
              </button>
              <button onClick={() => goTo(2)} className="btn-secondary" style={{ fontSize: '0.95rem', padding: '0.85rem 2.5rem' }}>
                ABOUT
              </button>
              <button onClick={() => goTo(4)} className="btn-secondary" style={{ fontSize: '0.95rem', padding: '0.85rem 2.5rem' }}>
                LOGIN / SUBSCRIBE
              </button>
            </div>

            {/* Corner marker */}
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
            {/* Ocean video background */}
            <video ref={oceanRef} autoPlay loop muted playsInline
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12, pointerEvents: 'none' }}>
              <source src={OCEAN_VIDEO} type="video/mp4" />
            </video>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,6,8,0.7), rgba(6,6,8,0.85))', pointerEvents: 'none' }} />
            <div style={{ maxWidth: '900px', width: '100%', position: 'relative' }}>
              <div className="font-mono fade-up" style={{ fontSize: '0.9rem', letterSpacing: '0.3em', color: 'var(--purple-bright)', marginBottom: '1.5rem' }}>ABOUT THE PLATFORM</div>
              <h1 className="font-display fade-up" style={{ fontSize: 'clamp(3rem,10vw,8rem)', lineHeight: 0.85, marginBottom: '1.5rem' }}>
                MAKE AWESOME<br /><span style={{ color: 'var(--purple-bright)' }}>FAMILY MOVIES</span><br />OR TURN YOUR<br />DREAMS INTO REALITY
              </h1>
              <p style={{ fontSize: '1rem', fontWeight: 300, color: 'var(--silver)', lineHeight: 1.7, marginBottom: '3rem', maxWidth: '680px' }}>
                MandaStrong Studio combines the power of 600+ professional AI tools with an intuitive cinematic workspace — so anyone can create stunning short films, family videos, or feature-length productions up to 3 hours long. No film school required.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1px', background: 'var(--border)', marginTop: '1rem' }}>
                {[
                  { icon: Zap, label: '600+', sub: 'AI Tools Across 6 Categories' },
                  { icon: Monitor, label: '8K', sub: 'Cinema-Grade Export Quality' },
                  { icon: Clock, label: '3 Hours', sub: 'Maximum Film Duration' },
                  { icon: HardDrive, label: '1TB', sub: 'Cloud Storage on Studio Plan' },
                ].map(({ icon: Icon, label, sub }) => (
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
            {/* Hidden file inputs — admin only */}
            <input ref={exRef0} type="file" accept="video/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (!f) return; const u = URL.createObjectURL(f); setExVideos(prev => prev.map((v,i) => i===0 ? {...v, url:u, name:f.name} : v)); }} />
            <input ref={exRef1} type="file" accept="video/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (!f) return; const u = URL.createObjectURL(f); setExVideos(prev => prev.map((v,i) => i===1 ? {...v, url:u, name:f.name} : v)); }} />
            <input ref={exRef2} type="file" accept="video/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (!f) return; const u = URL.createObjectURL(f); setExVideos(prev => prev.map((v,i) => i===2 ? {...v, url:u, name:f.name} : v)); }} />

            {/* Admin login modal */}
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

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <div className="font-mono" style={{ fontSize: '1rem', letterSpacing: '0.4em', color: 'var(--purple-bright)', marginBottom: '0.5rem' }}>SHOWCASE</div>
                <h1 className="font-display" style={{ fontSize: 'clamp(3rem,8vw,7rem)', lineHeight: 0.85 }}>EXAMPLES MADE BY<br /><span style={{ color: 'var(--purple-bright)' }}>MANDASTRONG STUDIO</span></h1>
              </div>
              {exIsAdmin ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'DM Mono', fontSize: '0.9rem', color: 'var(--purple-bright)', letterSpacing: '0.1em' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--purple-bright)' }} className="animate-pulse" /> ADMIN ACTIVE
                  <button onClick={() => setExIsAdmin(false)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', marginLeft: '0.25rem' }}><X size={12} /></button>
                </div>
              ) : (
                <button onClick={() => setExShowLogin(true)} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                  <Lock size={10} /> ADMIN
                </button>
              )}
            </div>

            <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(139,92,246,0.3),transparent)', marginBottom: '2rem' }} />

            {/* TOP ROW — 2 viewers side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.04)', marginBottom: '1px' }}>
              {[0, 1].map(i => (
                <div key={i} style={{ position: 'relative', aspectRatio: '16/9', background: '#000', border: `1px solid ${exActiveVideo === i ? 'rgba(139,92,246,0.7)' : 'rgba(255,255,255,0.06)'}`, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.15s' }} onClick={() => setExActiveVideo(exActiveVideo === i ? null : i)}>
                  <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', zIndex: 10, background: 'rgba(0,0,0,0.7)', padding: '0.3rem 0.75rem' }}>
                    <div className="font-mono" style={{ fontSize: '1rem', letterSpacing: '0.2em', color: exActiveVideo === i ? 'var(--purple-bright)' : 'rgba(255,255,255,0.4)' }}>VIEWER {String(i+1).padStart(2,'0')} — {exVideos[i].title.toUpperCase()}</div>
                    <div className="font-mono" style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.1rem' }}>{exVideos[i].desc}</div>
                  </div>
                  {exVideos[i].url ? (
                    <>
                      <video src={exVideos[i].url!} controls={exActiveVideo === i} autoPlay={exActiveVideo === i} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      {exIsAdmin && <button onClick={e => { e.stopPropagation(); exRefs[i].current?.click(); }} className="btn-primary" style={{ position: 'absolute', bottom: '0.75rem', right: '0.75rem', zIndex: 20, padding: '0.2rem 0.6rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Upload size={10} /> REPLACE</button>}
                    </>
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', background: 'linear-gradient(135deg,rgba(107,33,168,0.08),#000)' }}>
                      <Film size={28} style={{ color: 'rgba(139,92,246,0.3)' }} />
                      <div className="font-mono" style={{ fontSize: '1rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)' }}>FILM UPLOADING SOON</div>
                      {exIsAdmin && <button onClick={e => { e.stopPropagation(); exRefs[i].current?.click(); }} className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.4rem 1rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Upload size={10} /> UPLOAD</button>}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* BOTTOM ROW — 1 full-width viewer */}
            <div style={{ position: 'relative', height: '480px', background: '#000', border: `1px solid ${exActiveVideo === 2 ? 'rgba(139,92,246,0.7)' : 'rgba(255,255,255,0.06)'}`, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.15s', marginBottom: '2rem' }} onClick={() => setExActiveVideo(exActiveVideo === 2 ? null : 2)}>
              <div className="font-mono" style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', zIndex: 10, background: 'rgba(0,0,0,0.7)', padding: '0.2rem 0.6rem', fontSize: '1rem', letterSpacing: '0.2em', color: exActiveVideo === 2 ? 'var(--purple-bright)' : 'rgba(255,255,255,0.4)' }}>
                VIEWER 03 — FEATURE SHOWCASE — {exVideos[2].title.toUpperCase()}
              </div>
              {exVideos[2].url ? (
                <>
                  <video src={exVideos[2].url!} controls={exActiveVideo === 2} autoPlay={exActiveVideo === 2} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  {exIsAdmin && <button onClick={e => { e.stopPropagation(); exRefs[2].current?.click(); }} className="btn-primary" style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', zIndex: 20, padding: '0.3rem 0.75rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Upload size={10} /> REPLACE FEATURE</button>}
                </>
              ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', background: 'linear-gradient(135deg,rgba(107,33,168,0.05),#000)', backgroundImage: 'linear-gradient(rgba(139,92,246,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.03) 1px,transparent 1px)', backgroundSize: '40px 40px' }}>
                  <Film size={48} style={{ color: 'rgba(139,92,246,0.2)' }} />
                  <div className="font-display" style={{ fontSize: '2rem', color: 'rgba(255,255,255,0.08)', letterSpacing: '0.1em' }}>FEATURE SHOWCASE</div>
                  {exIsAdmin ? <button onClick={e => { e.stopPropagation(); exRefs[2].current?.click(); }} className="btn-primary" style={{ fontSize: '1rem', padding: '0.6rem 2rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Upload size={14} /> UPLOAD FEATURE FILM</button> : <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Film size={12} /> FEATURE FILM UPLOADING SOON</div>}
                </div>
              )}
            </div>

            {/* CTA */}
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

        {/* PAGE 4 — ACCESS / LOGIN / PRICING */}
        {page === 4 && (
          <div style={{ minHeight: '100vh', padding: '5rem 1.5rem 8rem', maxWidth: '1100px', margin: '0 auto' }}>

            {/* SPECIAL OFFER BANNER */}
            <div style={{ background: 'linear-gradient(90deg, rgba(107,33,168,0.3), rgba(139,92,246,0.15), rgba(107,33,168,0.3))', border: '1px solid rgba(139,92,246,0.5)', padding: '1rem 1.5rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', textAlign: 'center' }}>
              <span style={{ fontSize: '1.2rem' }}>🎬</span>
              <div>
                <span className="font-display" style={{ fontSize: '1.25rem', color: 'white', letterSpacing: '0.05em' }}>SPECIAL OFFER</span>
                <span style={{ color: 'var(--text-dim)', margin: '0 0.5rem' }}>—</span>
                <span style={{ fontSize: '0.95rem', color: 'var(--purple-bright)', fontWeight: 600 }}>All New Studio Plan Subscribers Receive a 7-Day Free Trial</span>
              </div>
              <span className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>NO CREDIT CARD REQUIRED TO START</span>
            </div>

            <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.3em', color: 'var(--purple-bright)', marginBottom: '1rem' }}>ACCESS PORTAL</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(3rem,8vw,6rem)', marginBottom: '3rem' }}>LOGIN & SUBSCRIBE</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1px', background: 'var(--border)', marginBottom: '4rem' }}>
              {/* Login */}
              <div className="panel" style={{ padding: '2rem' }}>
                <div className="font-mono" style={{ fontSize: '0.95rem', letterSpacing: '0.2em', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>EXISTING USER</div>
                <h3 className="font-display" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>SIGN IN</h3>
                <label className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-dim)', display: 'block', marginBottom: '0.35rem' }}>EMAIL ADDRESS</label>
                <input type="email" placeholder="your@email.com"
                  style={{ display: 'block', width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.75rem 1rem', fontFamily: 'DM Mono', fontSize: '0.9rem', marginBottom: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'} />
                <label className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-dim)', display: 'block', marginBottom: '0.35rem' }}>PASSWORD</label>
                <input type="password" placeholder="Enter your password"
                  style={{ display: 'block', width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.75rem 1rem', fontFamily: 'DM Mono', fontSize: '0.9rem', marginBottom: '0.5rem', outline: 'none', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'} />
                <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
                  <button style={{ background: 'none', border: 'none', color: 'var(--purple-bright)', cursor: 'pointer', fontFamily: 'DM Mono', fontSize: '0.9rem' }}>Forgot password?</button>
                </div>
                <button onClick={(e) => { const form = (e.target as HTMLElement).closest('.panel'); const emailInput = form?.querySelector('input[type="email"]') as HTMLInputElement; const passInput = form?.querySelector('input[type="password"]') as HTMLInputElement; const isAmanda = emailInput?.value === 'woolleya129@gmail.com' && passInput?.value === 'Mangler1970!!'; try { localStorage.setItem('ms_loggedin','1'); if (isAmanda) localStorage.setItem('ms_admin','1'); } catch {} if (isAmanda) setExIsAdmin(true); addToast(isAmanda ? 'Welcome Amanda — Admin access granted!' : 'Welcome back!', 'success'); setTimeout(() => goTo(5), 800); }} className="btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
                  SIGN IN TO STUDIO
                </button>
                <p style={{ textAlign: 'center', fontSize: '1rem', color: 'var(--text-dim)', marginTop: '1rem', fontStyle: 'italic' }}>
                  Secured with 256-bit encryption
                </p>
              </div>

              {/* Register */}
              <div className="panel" style={{ padding: '2rem', borderTop: '2px solid var(--purple-bright)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-0.75rem', left: '1.5rem', background: 'var(--purple)', padding: '0.15rem 0.75rem' }}>
                  <span className="font-mono" style={{ fontSize: '1rem', letterSpacing: '0.2em', color: 'white' }}>7-DAY FREE TRIAL</span>
                </div>
                <div className="font-mono" style={{ fontSize: '0.95rem', letterSpacing: '0.2em', color: 'var(--text-dim)', marginBottom: '0.5rem', marginTop: '0.5rem' }}>NEW CREATOR</div>
                <h3 className="font-display" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>CREATE ACCOUNT</h3>
                <label className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-dim)', display: 'block', marginBottom: '0.35rem' }}>YOUR NAME</label>
                <input type="text" placeholder="Director / Creator Name"
                  style={{ display: 'block', width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.75rem 1rem', fontFamily: 'DM Mono', fontSize: '0.9rem', marginBottom: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'} />
                <label className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-dim)', display: 'block', marginBottom: '0.35rem' }}>EMAIL ADDRESS</label>
                <input type="email" placeholder="your@email.com"
                  style={{ display: 'block', width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.75rem 1rem', fontFamily: 'DM Mono', fontSize: '0.9rem', marginBottom: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'} />
                <label className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-dim)', display: 'block', marginBottom: '0.35rem' }}>CREATE PASSWORD</label>
                <input type="password" placeholder="Minimum 8 characters"
                  style={{ display: 'block', width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.75rem 1rem', fontFamily: 'DM Mono', fontSize: '0.9rem', marginBottom: '1.5rem', outline: 'none', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'} />
                <button onClick={() => { try { localStorage.setItem('ms_loggedin','1'); } catch {} addToast('Account created! Your 7-Day Free Trial begins now.', 'success'); setTimeout(() => goTo(5), 800); }} className="btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
                  START FREE TRIAL
                </button>
                <p style={{ textAlign: 'center', fontSize: '1rem', color: 'var(--text-dim)', marginTop: '1rem', fontStyle: 'italic' }}>
                  No credit card needed · Cancel anytime
                </p>
              </div>

              {/* Guest */}
              <div className="panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <Eye size={32} style={{ color: 'var(--text-dim)', marginBottom: '1rem' }} />
                <div className="font-display" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>EXPLORE FIRST</div>
                <p style={{ fontSize: '1rem', color: 'var(--text-dim)', marginBottom: '0.75rem', lineHeight: 1.6 }}>Browse all 600+ AI tools and see the full platform before committing.</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--purple-bright)', marginBottom: '1.5rem', fontStyle: 'italic' }}>No account required</p>
                <button onClick={() => { try { localStorage.setItem('ms_loggedin','1'); } catch {} goTo(5); }} className="btn-primary" style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', background: 'var(--purple-mid)' }}>
                  ✦ ENTER APP — NO LOGIN NEEDED
                </button>
              </div>
            </div>

            {/* Pricing */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.3em', color: 'var(--text-dim)' }}>SUBSCRIPTION PLANS</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--purple-bright)', background: 'rgba(107,33,168,0.15)', border: '1px solid rgba(139,92,246,0.3)', padding: '0.2rem 0.6rem' }}>
                  🎬 Studio Plan: 7-Day Free Trial Included
                </span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1px', background: 'var(--border)' }}>
              {PLANS.map(plan => (
                <div key={plan.name} className="panel" style={{ padding: '2rem', position: 'relative', borderTop: plan.popular ? '2px solid var(--purple-bright)' : plan.name === 'Studio' ? '2px solid rgba(167,139,250,0.5)' : '2px solid transparent' }}>
                  {plan.popular && <div className="font-mono" style={{ position: 'absolute', top: '-0.75rem', left: '50%', transform: 'translateX(-50%)', background: 'var(--purple)', padding: '0.15rem 0.75rem', fontSize: '1rem', letterSpacing: '0.2em', color: 'white', whiteSpace: 'nowrap' }}>MOST POPULAR</div>}
                  {plan.name === 'Studio' && <div className="font-mono" style={{ position: 'absolute', top: '-0.75rem', left: '50%', transform: 'translateX(-50%)', background: 'rgba(107,33,168,0.8)', padding: '0.15rem 0.75rem', fontSize: '1rem', letterSpacing: '0.15em', color: 'white', whiteSpace: 'nowrap' }}>7-DAY FREE TRIAL</div>}
                  <div className="font-mono" style={{ fontSize: '0.95rem', letterSpacing: '0.2em', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>{plan.name.toUpperCase()} PLAN</div>
                  <div className="font-display" style={{ fontSize: '3rem', lineHeight: 1 }}>${plan.price}<span style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>/mo</span></div>
                  <p style={{ fontSize: '1rem', color: 'var(--text-dim)', margin: '0.5rem 0 1.5rem', fontStyle: 'italic' }}>
                    {plan.name === 'Creator' ? 'Perfect for hobbyists & family films' : plan.name === 'Pro' ? 'For serious independent filmmakers' : 'Full professional production suite'}
                  </p>
                  <div style={{ margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {plan.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--text-dim)' }}>
                        <CheckCircle size={12} style={{ color: 'var(--purple-bright)', flexShrink: 0 }} /> {f}
                      </div>
                    ))}
                    {plan.name === 'Studio' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--purple-bright)', fontWeight: 600 }}>
                        <Zap size={12} style={{ flexShrink: 0 }} /> 7-Day Free Trial Included
                      </div>
                    )}
                  </div>
                  <a href={plan.stripe} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', padding: '0.85rem' }}>
                    {plan.name === 'Studio' ? 'START FREE TRIAL' : 'SUBSCRIBE NOW'}
                  </a>
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', fontSize: '1rem', color: 'var(--text-dim)', marginTop: '1.5rem', fontStyle: 'italic' }}>
              All plans include a 30-day money-back guarantee · Secure checkout via Stripe
            </p>
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
              {/* Header */}
              <div className="panel" style={{ padding: '1.5rem 2rem', borderLeft: 0, borderRight: 0, borderTop: 0, marginBottom: '1px', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CatIcon size={20} style={{ color: 'var(--purple-bright)' }} />
                  <div>

                    <div className="font-display" style={{ fontSize: '1.8rem', lineHeight: 1 }}>{cat.toUpperCase()} TOOLS</div>
                  </div>
                </div>

                {/* Category tabs */}
                <div style={{ display: 'flex', gap: '1px', background: 'var(--border)', marginLeft: 'auto', flexWrap: 'wrap' }}>
                  {toolCategories.map((c, i) => (
                    <button key={c} onClick={() => goTo(5 + i)}
                      className="font-mono"
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.9rem', letterSpacing: '0.1em', background: c === cat ? 'var(--purple)' : 'var(--panel)', color: c === cat ? 'white' : 'var(--text-dim)', border: 'none', cursor: 'pointer' }}>
                      {c.slice(0, 3).toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div style={{ position: 'relative' }}>
                  <Search size={12} style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input type="text" value={toolSearch} onChange={e => setToolSearch(e.target.value)}
                    placeholder={`Search ${filtered.length} tools...`}
                    className="font-mono"
                    style={{ background: 'var(--deep)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.4rem 0.5rem 0.4rem 2rem', fontSize: '0.95rem', width: '200px', outline: 'none' }} />
                </div>

                <div className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--purple-bright)' }}>{filtered.length} TOOLS</div>
              </div>

              {/* Tools grid — 4 across, name only on card */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '2px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', background: 'rgba(139,92,246,0.15)' }}>
                  {filtered.map((tool, i) => (
                    <button key={i} onClick={() => setSelectedTool(tool)}
                      style={{ background: '#0c0c10', padding: '1.25rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '70px', border: '1px solid rgba(139,92,246,0.2)', transition: 'all 0.15s', cursor: 'pointer', textAlign: 'left', gap: '0.5rem' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(107,33,168,0.2)'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.7)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#0c0c10'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.2)'; }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.3, letterSpacing: '0.01em' }}>{tool}</span>
                      <span style={{ color: 'rgba(167,139,250,0.5)', fontSize: '1rem', flexShrink: 0 }}>›</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tool Modal */}
              {selectedTool && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                  <div className="panel" style={{ maxWidth: '600px', width: '100%', padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                      <div>
                        <div className="font-mono" style={{ fontSize: '1rem', letterSpacing: '0.2em', color: 'var(--purple-bright)', marginBottom: '0.25rem' }}>{cat.toUpperCase()} TOOL</div>
                        <h2 className="font-display" style={{ fontSize: '2rem' }}>{selectedTool}</h2>
                      </div>
                      <button onClick={() => { setSelectedTool(null); setAiPrompt(''); }} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text-dim)', padding: '0.3rem', cursor: 'pointer' }}>
                        <X size={16} />
                      </button>
                    </div>

                    {/* Description */}
                    {TOOL_DESC[selectedTool] && (
                      <div style={{ marginBottom: '1.25rem', padding: '0.75rem 1rem', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}>
                        <p style={{ fontSize: '1rem', color: '#CBD5E1', lineHeight: 1.6, fontStyle: 'italic' }}>{TOOL_DESC[selectedTool]}</p>
                      </div>
                    )}

                    {/* 3 Action Buttons */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '1.25rem' }}>
                      <button onClick={() => fileInputRef.current?.click()}
                        style={{ background: 'rgba(107,33,168,0.3)', border: '1px solid rgba(139,92,246,0.5)', color: '#E2E8F0', padding: '0.75rem 0.5rem', cursor: 'pointer', fontFamily: 'DM Mono', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        ↑ UPLOAD
                      </button>
                      <button onClick={() => setAiPrompt('')}
                        style={{ background: 'rgba(107,33,168,0.3)', border: '1px solid rgba(139,92,246,0.5)', color: '#E2E8F0', padding: '0.75rem 0.5rem', cursor: 'pointer', fontFamily: 'DM Mono', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        ✎ PASTE
                      </button>
                      <button onClick={handleAIGenerate}
                        style={{ background: 'rgba(107,33,168,0.8)', border: '1px solid rgba(167,139,250,0.8)', color: '#FFFFFF', padding: '0.75rem 0.5rem', cursor: 'pointer', fontFamily: 'DM Mono', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        ✦ AI CREATE
                      </button>
                    </div>

                    {/* Upload */}
                    <div style={{ marginBottom: '1rem' }}>
                      <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>UPLOAD SOURCE MEDIA</div>
                      <button onClick={() => fileInputRef.current?.click()}
                        style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(139,92,246,0.3)', color: 'var(--text-dim)', padding: '1rem', cursor: 'pointer', fontFamily: 'DM Mono', fontSize: '0.95rem', letterSpacing: '0.1em' }}>
                        + BROWSE FILES / UPLOAD OWN VOICE
                      </button>
                    </div>

                    {/* Stock Voices — show on Voice page or Text to Speech tool */}
                    {(cat === 'Voice' || selectedTool === 'Text to Speech') && (
                      <div style={{ marginBottom: '1rem' }}>
                        <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>STOCK VOICES — SELECT & PREVIEW</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                          {STOCK_VOICES.map(v => (
                            <div key={v.name} onClick={() => setSelectedVoice(v.name)}
                              style={{ padding: '0.65rem 0.75rem', background: selectedVoice === v.name ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.02)', border: `1px solid ${selectedVoice === v.name ? 'rgba(139,92,246,0.6)' : 'var(--border)'}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                              <div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>{v.name}</div>
                                <div className="font-mono" style={{ fontSize: '0.5rem', color: 'var(--text-dim)' }}>{v.style} · {v.accent}</div>
                              </div>
                              <button onClick={e => { e.stopPropagation(); const a = new Audio(v.url); setPlayingVoice(v.name); a.play(); a.onended = () => setPlayingVoice(null); }}
                                style={{ background: 'var(--purple)', border: 'none', color: 'white', padding: '0.3rem 0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'DM Mono' }}>
                                {playingVoice === v.name ? '■' : '▶'}
                              </button>
                            </div>
                          ))}
                        </div>
                        {selectedVoice && (
                          <div className="font-mono" style={{ fontSize: '1rem', color: 'var(--purple-bright)', marginTop: '0.4rem' }}>✓ {selectedVoice} selected as voice</div>
                        )}
                      </div>
                    )}

                    {/* Prompt */}
                    <div style={{ marginBottom: '1rem' }}>
                      <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>AI GENERATION PROMPT</div>
                      <textarea value={aiPrompt} onChange={e => { setAiPrompt(e.target.value); try { localStorage.setItem('ms_draft', e.target.value); } catch {} }}
                        placeholder={`Describe what you want to generate with ${selectedTool}...`}
                        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.75rem 1rem', fontFamily: 'Barlow', fontSize: '1rem', height: '100px', resize: 'none', outline: 'none' }} />
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
                <div key={label} onClick={action}
                  style={{ padding: '2.5rem', textAlign: 'center', cursor: 'pointer', background: 'var(--panel)', transition: 'all 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(107,33,168,0.1)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--panel)')}>
                  <Icon size={32} style={{ color, marginBottom: '1rem' }} />
                  <div className="font-mono" style={{ fontSize: '1rem', letterSpacing: '0.15em', color: 'var(--text)', marginBottom: '0.3rem' }}>{label}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* URL Import Modal */}
            {showUrlImport && (
              <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <div className="panel" style={{ maxWidth: '500px', width: '100%', padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div className="font-display" style={{ fontSize: '1.5rem' }}>IMPORT FROM URL</div>
                    <button onClick={() => setShowUrlImport(false)} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text-dim)', padding: '0.3rem', cursor: 'pointer' }}><X size={14} /></button>
                  </div>
                  <div className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>DIRECT VIDEO URL (MP4, WebM, MOV)</div>
                  <input type="url" value={importUrl} onChange={e => setImportUrl(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleImportUrl()}
                    placeholder="https://example.com/video.mp4"
                    style={{ display: 'block', width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.75rem 1rem', fontFamily: 'DM Mono', fontSize: '0.9rem', marginBottom: '1.5rem', outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.6)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'} />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => setShowUrlImport(false)} className="btn-secondary" style={{ flex: 1 }}>CANCEL</button>
                    <button onClick={handleImportUrl} className="btn-primary" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      <Globe size={14} /> IMPORT VIDEO
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Upload progress */}
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

            {/* Media library */}
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
                        <button onClick={() => {
                          setTimeline(prev => ({ ...prev, video: [...prev.video, asset] }));
                          addToast('Added to timeline', 'success');
                        }} className="btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '1rem' }}>+ TIMELINE</button>
                        <button onClick={() => setMediaLibrary(prev => prev.filter(a => a.id !== asset.id))}
                          style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text-dim)', padding: '0.2rem 0.4rem', cursor: 'pointer' }}>
                          <Trash2 size={10} />
                        </button>
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

            {/* Duration */}
            <div className="panel" style={{ padding: '2rem', marginBottom: '1px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.2em', color: 'var(--text-dim)' }}>MOVIE DURATION</div>
                <div className="font-display" style={{ fontSize: '3rem', color: 'var(--purple-bright)', lineHeight: 1 }}>{duration} <span style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>MIN</span></div>
              </div>
              <input type="range" min="0" max="180" value={duration} onChange={e => setDuration(Number(e.target.value))} style={{ width: '100%', marginBottom: '0.75rem' }} />
              <div style={{ display: 'flex', gap: '1px', background: 'var(--border)' }}>
                {[30, 60, 90, 120, 180].map(m => (
                  <button key={m} onClick={() => setDuration(m)} className="font-mono"
                    style={{ flex: 1, padding: '0.4rem', fontSize: '0.9rem', background: duration === m ? 'var(--purple)' : 'var(--deep)', color: duration === m ? 'white' : 'var(--text-dim)', border: 'none', cursor: 'pointer' }}>
                    {m}m
                  </button>
                ))}
              </div>
            </div>

            {/* Suite links */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1px', background: 'var(--border)' }}>
              {[
                { icon: Database, label: 'MEDIA LIBRARY', sub: `${mediaLibrary.length} assets`, p: 11 },
                { icon: Layers, label: 'TIMELINE EDITOR', sub: 'Multi-track editing', p: 13 },
                { icon: Wand2, label: 'ENHANCEMENT STUDIO', sub: '60+ tools', p: 14 },
                { icon: Volume2, label: 'AUDIO MIXER', sub: '4-channel mixing', p: 15 },
                { icon: Zap, label: 'RENDER ENGINE', sub: 'Up to 8K output', p: 16 },
                { icon: Eye, label: 'PREVIEW PLAYER', sub: 'Full-screen playback', p: 17 },
              ].map(({ icon: Icon, label, sub, p }) => (
                <button key={label} onClick={() => goTo(p)} className="panel"
                  style={{ padding: '1.5rem', textAlign: 'left', border: '1px solid var(--border)', cursor: 'pointer', background: 'var(--panel)', transition: 'all 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
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
              {/* Media panel */}
              <div className="panel" style={{ width: '200px', flexShrink: 0, overflowY: 'auto', borderTop: 0, borderBottom: 0, padding: '1rem' }}>
                <div className="font-mono" style={{ fontSize: '1rem', letterSpacing: '0.15em', color: 'var(--text-dim)', marginBottom: '0.75rem' }}>MEDIA POOL</div>
                {mediaLibrary.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <Film size={16} style={{ color: 'var(--text-dim)', marginBottom: '0.4rem' }} />
                    <div style={{ fontSize: '0.95rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>Upload media first</div>
                    <button onClick={() => goTo(11)} className="btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '1rem' }}>UPLOAD</button>
                  </div>
                ) : mediaLibrary.map(asset => (
                  <div key={asset.id} draggable onDragStart={() => setDraggedItem(asset)}
                    style={{ padding: '0.5rem', marginBottom: '1px', background: 'var(--deep)', border: '1px solid var(--border)', cursor: 'grab', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <FileVideo size={10} style={{ color: 'var(--purple-bright)', flexShrink: 0 }} />
                    <div style={{ fontSize: '0.9rem', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{asset.name}</div>
                  </div>
                ))}
              </div>

              {/* Timeline tracks */}
              <div style={{ flex: 1, overflowX: 'auto', padding: '1rem' }}>
                {(['video', 'audio', 'text'] as const).map(track => (
                  <div key={track} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="font-mono" style={{ width: '50px', fontSize: '1rem', letterSpacing: '0.1em', color: 'var(--text-dim)', flexShrink: 0 }}>{track.toUpperCase()}</div>
                    <div className="track-bar" style={{ flex: 1 }}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        if (draggedItem) {
                          setTimeline(prev => ({ ...prev, [track]: [...prev[track], { ...draggedItem }] }));
                          setDraggedItem(null);
                          addToast(`Added to ${track} track`, 'success');
                        }
                      }}>
                      {timeline[track].map((clip, i) => (
                        <div key={i} className="timeline-clip"
                          style={{ left: `${i * 12}%`, width: '100px', background: track === 'video' ? 'rgba(107,33,168,0.6)' : track === 'audio' ? 'rgba(16,185,129,0.6)' : 'rgba(245,158,11,0.6)', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                          {clip.name.slice(0, 12)}
                        </div>
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
                  <button onClick={() => { goTo(16); setTimeout(() => handleRender(), 300); }} className="btn-primary" style={{ marginRight: '0.5rem' }}>
                    → RENDER
                  </button>
                  <button onClick={() => { setTimeline({ video: [], audio: [], text: [] }); addToast('Timeline cleared', 'warning'); }} className="btn-secondary">
                    CLEAR ALL
                  </button>
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
                  <button onClick={() => setSelectedEnhancement(null)} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text-dim)', padding: '0.25rem 0.5rem', cursor: 'pointer' }}>
                    <X size={14} />
                  </button>
                </div>
                {Object.entries(enhancementSettings).map(([key, value]) => (
                  <div key={key} style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <span className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{key}</span>
                      <span className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--purple-bright)' }}>{value}%</span>
                    </div>
                    <input type="range" min="0" max="100" value={value}
                      onChange={e => setEnhancementSettings(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                      style={{ width: '100%' }} />
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                  <button onClick={() => { addToast(`Applying ${selectedEnhancement}...`, 'info'); setTimeout(() => { setSelectedEnhancement(null); addToast('Enhancement applied!', 'success'); }, 2000); }}
                    className="btn-primary" style={{ flex: 2, padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={14} /> APPLY ENHANCEMENT
                  </button>
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
                {[
                  { key: 'music', label: 'MUSIC', color: '#8B5CF6' },
                  { key: 'voice', label: 'VOICE', color: '#A78BFA' },
                  { key: 'sfx', label: 'SFX', color: '#F59E0B' },
                  { key: 'master', label: 'MASTER', color: '#EF4444' },
                ].map(ch => (
                  <div key={ch.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.15em', color: 'var(--text-dim)' }}>{ch.label}</div>
                    {/* VU Meter */}
                    <div style={{ width: '24px', height: '140px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                      <div style={{ width: '100%', background: `linear-gradient(to top, ${ch.color}, ${ch.color}aa)`, height: `${audioLevels[ch.key as keyof typeof audioLevels]}%`, transition: 'height 0.1s' }} />
                    </div>
                    <input type="range" min="0" max="100" value={audioLevels[ch.key as keyof typeof audioLevels]}
                      onChange={e => setAudioLevels(prev => ({ ...prev, [ch.key]: Number(e.target.value) }))}
                      style={{ writingMode: 'vertical-lr', direction: 'rtl', width: '30px', height: '120px', cursor: 'pointer' }} />
                    <div className="font-display" style={{ fontSize: '1.5rem', color: ch.color }}>{audioLevels[ch.key as keyof typeof audioLevels]}</div>
                    <div className="font-mono" style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>%</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                <button onClick={() => { setAudioLevels({ music: 75, voice: 60, sfx: 50, master: 85 }); addToast('Levels reset', 'info'); }} className="btn-secondary" style={{ flex: 1, padding: '0.65rem' }}>RESET LEVELS</button>
                <button onClick={() => addToast('Audio preset saved!', 'success')} className="btn-primary" style={{ flex: 1, padding: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                  <Save size={12} /> SAVE PRESET
                </button>
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
                    <select value={exportSettings.quality} onChange={e => setExportSettings(p => ({ ...p, quality: e.target.value }))}
                      style={{ width: '100%', background: 'var(--deep)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.6rem 0.75rem', fontFamily: 'DM Mono', fontSize: '1rem', outline: 'none' }}>
                      <option value="8K">8K — 4320p</option>
                      <option value="4K">4K — 2160p</option>
                      <option value="1080p">HD — 1080p</option>
                      <option value="720p">SD — 720p</option>
                    </select>
                  </div>
                  <div>
                    <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>FORMAT</div>
                    <select value={exportSettings.format} onChange={e => setExportSettings(p => ({ ...p, format: e.target.value }))}
                      style={{ width: '100%', background: 'var(--deep)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.6rem 0.75rem', fontFamily: 'DM Mono', fontSize: '1rem', outline: 'none' }}>
                      <option>MP4</option><option>MOV</option><option>AVI</option><option>WebM</option>
                    </select>
                  </div>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'var(--border)', marginBottom: '2rem' }}>
                  {[
                    { label: 'DURATION', value: `${duration} MIN` },
                    { label: 'VIDEO CLIPS', value: timeline.video.length },
                    { label: 'AUDIO TRACKS', value: timeline.audio.length },
                  ].map(({ label, value }) => (
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
                  <button onClick={handleRender} className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Zap size={16} /> START RENDER — {exportSettings.quality} {exportSettings.format}
                  </button>
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
                    <div className="font-mono" style={{ fontSize: '0.95rem', color: 'var(--text-dim)' }}>No film rendered yet —&nbsp;
                      <button onClick={() => goTo(16)} style={{ background: 'none', border: 'none', color: 'var(--purple-bright)', cursor: 'pointer', fontFamily: 'DM Mono', fontSize: '0.95rem' }}>
                        go to Render Engine →
                      </button>
                    </div>
                  </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
                {[
                  { icon: Download, label: 'DOWNLOAD TO DEVICE', color: 'var(--purple)', action: () => { if (currentVideo) { const a = document.createElement('a'); a.href = currentVideo.url; a.download = currentVideo.name; a.click(); } else addToast('No render available', 'error'); } },
                  { icon: Save, label: 'SAVE PROJECT FILE', color: '#A78BFA', action: () => {
                    const projectData = { mediaLibrary, timeline, audioLevels, duration, exportSettings, savedAt: new Date().toISOString() };
                    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
                    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `MandaStrong_Project_${Date.now()}.json`; a.click();
                    addToast('Project file downloaded!', 'success');
                  }},
                  { icon: Share2, label: 'SHARE TO COMMUNITY HUB', color: '#3B82F6', action: () => { addToast('Shared to Community!', 'success'); setTimeout(() => goTo(22), 800); } },
                ].map(({ icon: Icon, label, color, action }) => (
                  <button key={label} onClick={action}
                    className="panel"
                    style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid var(--border)', cursor: 'pointer', background: 'var(--panel)', transition: 'all 0.15s', opacity: currentVideo ? 1 : 0.4 }}>
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
                <a key={i} href={tut.url} target="_blank" rel="noopener noreferrer"
                  className="panel"
                  style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', border: '1px solid var(--border)', cursor: 'pointer', background: 'var(--panel)', textAlign: 'left', transition: 'all 0.15s', textDecoration: 'none', color: 'inherit' }}>
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
                { t: 'Contact & Support', b: 'For questions contact us via MandaStrong1.Etsy.com or use Agent Grok (Page 21) available 24/7 within the application. For billing issues contact your Stripe receipt directly.' },
              ].map(s => (
                <div key={s.t} className="panel" style={{ padding: '1.5rem' }}>
                  <div className="font-mono" style={{ fontSize: '0.95rem', letterSpacing: '0.1em', color: 'var(--purple-bright)', marginBottom: '0.5rem' }}>{s.t.toUpperCase()}</div>
                  <p style={{ fontSize: '1rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>{s.b}</p>
                </div>
              ))}
            </div>

            <button onClick={() => { addToast('Terms accepted', 'success'); goTo(5); }} className="btn-primary" style={{ padding: '0.85rem 3rem' }}>
              ACCEPT TERMS & ENTER
            </button>
          </div>
        )}

        {/* PAGE 21 — AGENT GROK */}
        {page === 21 && (
          <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '4rem', paddingBottom: '5rem' }}>
            <div className="panel" style={{ padding: '1rem 1.5rem', borderLeft: 0, borderRight: 0, borderTop: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--purple-bright)' }} className="animate-pulse" />
              <div className="font-display" style={{ fontSize: '1.5rem' }}>AGENT GROK</div>
              <span className="font-mono" style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>24/7 PRODUCTION SUPPORT</span>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {grokChat.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '70%', padding: '0.75rem 1rem',
                    background: msg.role === 'user' ? 'var(--purple)' : 'var(--panel)',
                    border: `1px solid ${msg.role === 'user' ? 'rgba(139,92,246,0.3)' : 'var(--border)'}`,
                    fontSize: '1rem', lineHeight: 1.5
                  }}>
                    {msg.role === 'agent' && <div className="font-mono" style={{ fontSize: '1rem', color: 'var(--purple-bright)', marginBottom: '0.3rem', letterSpacing: '0.1em' }}>AGENT GROK</div>}
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="panel" style={{ padding: '1rem', borderLeft: 0, borderRight: 0, borderBottom: 0, display: 'flex', gap: '0.5rem' }}>
              <input type="text" value={grokMessage} onChange={e => setGrokMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendGrokMessage()}
                placeholder="Ask anything about MandaStrong Studio..."
                style={{ flex: 1, background: 'var(--deep)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.6rem 1rem', fontFamily: 'Barlow', fontSize: '1rem', outline: 'none' }} />
              <button onClick={sendGrokMessage} className="btn-primary" style={{ padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
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
              <button onClick={() => fileInputRef.current?.click()} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem' }}>
                <Upload size={14} /> UPLOAD YOUR MOVIE
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1px', background: 'var(--border)' }}>
              {communityPosts.map(post => (
                <div key={post.id} className="panel" style={{ padding: '1.5rem' }}>
                  <div style={{ aspectRatio: '16/9', background: 'var(--deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', marginBottom: '1rem', border: '1px solid var(--border)' }}>
                    {post.emoji}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{post.title}</div>
                  <div className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>BY {post.user.toUpperCase()}</div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <button onClick={() => addToast('Liked!', 'success')} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem', fontFamily: 'DM Mono' }}>
                      <ThumbsUp size={12} style={{ color: '#3B82F6' }} /> {post.likes.toLocaleString()}
                    </button>
                    <button onClick={() => addToast('Loved!', 'success')} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem', fontFamily: 'DM Mono' }}>
                      <Heart size={12} style={{ color: '#EF4444' }} /> {post.loves.toLocaleString()}
                    </button>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input type="text" value={newComment[post.id] || ''} onChange={e => setNewComment(p => ({ ...p, [post.id]: e.target.value }))}
                      placeholder="Comment..." style={{ flex: 1, background: 'var(--deep)', border: '1px solid var(--border)', color: 'var(--text)', padding: '0.4rem 0.6rem', fontSize: '0.9rem', outline: 'none' }} />
                    <button onClick={() => { addToast('Comment posted!', 'success'); setNewComment(p => ({ ...p, [post.id]: '' })); }} className="btn-primary" style={{ padding: '0.4rem 0.75rem' }}>POST</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 23 — THANK YOU */}
        {page === 23 && (
          <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(139,92,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.04) 1px,transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
            <div className="font-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.4em', color: 'var(--purple-bright)', marginBottom: '2rem' }}>THAT'S ALL FOLKS</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(4rem,15vw,12rem)', lineHeight: 0.85, marginBottom: '2rem', textShadow: '0 0 80px rgba(139,92,246,0.5)' }}>
              MANDA<br />STRONG<br />STUDIO
            </h1>
            <blockquote style={{ maxWidth: '600px', fontSize: '1.1rem', fontWeight: 300, fontStyle: 'italic', color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '3rem' }}>
              "Amanda's thank you to creators now and in the future.<br />Supporting cinematic innovation through our Veteran Fundraiser mission."
            </blockquote>
            <a href="https://MandaStrong1.Etsy.com" target="_blank" rel="noopener noreferrer"
              className="font-display"
              style={{ fontSize: 'clamp(1.5rem,5vw,3.5rem)', color: 'var(--purple-bright)', textDecoration: 'none', borderBottom: '2px solid var(--purple)', paddingBottom: '0.25rem', marginBottom: '3rem', display: 'block', transition: 'all 0.2s' }}>
              MandaStrong1.Etsy.com
            </a>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={() => goTo(1)} className="btn-primary" style={{ padding: '0.85rem 2.5rem', fontSize: '0.95rem' }}>← HOME</button>
              <button onClick={() => goTo(5)} className="btn-secondary" style={{ padding: '0.85rem 2.5rem', fontSize: '0.95rem' }}>BACK TO TOOLS</button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}