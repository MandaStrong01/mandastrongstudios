import { useState, useRef, useCallback, useEffect } from 'react';
import {
  Menu, Sparkles, MessageCircle, ChevronLeft, ChevronRight,
  CheckCircle, Play, Upload, Mic, Zap, Shield, Music, Sliders,
  Database, FileVideo, BookOpen, Clock, ThumbsUp, Heart, HelpCircle,
  Eye, X, Download, Save, Wand2, Share2, Search, AlertCircle, Loader, Clipboard
} from 'lucide-react';
import PasteImporter from './components/PasteImporter';
import Page21 from './components/Page21';
import TimelineEditor from './components/TimelineEditor';

const DEMO_VIDEOS = [
  "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-ocean-waves-loop-1196-large.mp4",
];

const AI_TOOLS: Record<string, string[]> = {
  Writing: [
    "Text to Video - Cinematic","Text to Video - Realistic","Text to Video - Animated","Script to Movie","Story to Video",
    "Dialogue Writer","Plot Generator","Scene Writer","Story Outliner","Character Developer","Script Formatter",
    "Three Act Builder","Backstory Generator","Theme Generator","Plot Twist Creator","Scene Analyzer","World Builder",
    "Subplot Generator","Character Voice","Pacing Analyzer","Opening Hook","Climax Designer","Character Mapper",
    "Flashback Creator","Foreshadowing Tool","Beat Sheet","Story Structure","Character Arc","Plot Device","Narrative Flow",
    "Story Consultant","Character Interview","Scene Setting","Emotional Arc","Story Question","Character Flaw","Story Goal",
    "Inciting Incident","Midpoint Tool","Dark Night","Growth Tracker","Tag Optimizer","Action Line","Scene Heading",
    "Parenthetical","Script Timer","Format Checker","Name Generator","Location Database","Prop List","Costume Designer",
    "Scene Number","Page Counter","Reading Timer","Coverage Writer","Logline Generator","Synopsis Writer","Treatment Format",
    "Pitch Deck","Character Bio","World Bible","Magic System","Tech Inventor","Culture Creator","Language Builder",
    "Religion Designer","Government Tool","Economy Builder","Geography Map","History Timeline","Mythology","Legend Writer",
    "Prophecy","Quest Designer","MacGuffin","Plot Hole Detector","Continuity Check","Character Check","Timeline Validator",
    "Research Helper","Fact Checker","Trope Finder","Cliche Detector","Originality Score","Genre Analyzer","Tone Checker",
    "Voice Tool","POV Analyzer","Tense Checker","Grammar Polish","Spell Check","Readability","Engagement Meter",
    "Pacing Visual","Story Arc Map","Network Graph","Word Counter","Goal Setter","Sprint Timer","Dashboard","Collab Hub",
    "Version Control","Comment System","Revision Track"
  ],
  Voice: [
    "Text to Speech - Natural","Voice Cloning - Instant","AI Voice Generator","Voice Narrator","Voice Actor Generator",
    "Text to Speech - Multiple Voices","Voice Maker","Voice Cloner","Voice Creator","Voice Recorder","Speech Converter",
    "Voice Builder","Voice Generator","Premium Voice","Emotion Voice","Natural Voice","Narrator Voice","Voice Imitator",
    "Accent Generator","Pitch Controller","Tone Adjuster","Lip Sync AI","Voice Coach","Audiobook Creator","Commercial Voice",
    "Trailer Voice","Documentary Voice","News Anchor Voice","Radio DJ Voice","Sports Cast Voice","Game Show Host",
    "Meditation Voice","Hypnosis Voice","ASMR Creator","Whisper Generator","Shout Creator","Scream Generator",
    "Laugh Creator","Cry Generator","Sigh Creator","Gasp Generator","Cough Creator","Throat Clear","Voice Warm-up",
    "Range Finder","Pitch Training","Articulation","Diction Drill","Health Monitor","Strain Detector","Rest Reminder",
    "Hydration Alert","Posture Guide","Breathing Coach","Vocal Workout","Range Expander","Stamina Builder","Endurance Train",
    "Quality Enhance","Clarity Boost","Richness Amp","Warmth Add","Brightness Mix","Darkness Mix","Raspy Tool",
    "Smooth Filter","Texture Design","Timbre Modifier","Resonance Tune","Projection Boost","Volume Expander","Dynamic Range",
    "Compression","EQ Voice","De-esser","Pop Filter","Noise Gate","Reverb Voice","Echo Voice","Delay Voice","Chorus FX",
    "Flanger FX","Phaser FX","Distortion FX","Bitcrush","Lo-fi Voice","Radio Effect","Phone Effect","Megaphone",
    "Robot Voice","Alien Voice","Monster Voice","Demon Voice","Angel Voice","Chipmunk Voice","Deep Voice","High Voice",
    "Child Voice","Elderly Voice","Speed Modifier","Volume Normal"
  ],
  Image: [
    "Image to Video - Motion","Photo to Animation","AI Image Animator","Image Generator","Asset Architect","Texture Mapper",
    "VFX Synthesis","Matte Logic","Color Palette","Background Generator","Character Design","Lighting Designer",
    "Scene Composite","Photo Enhance","Image Upscale","Style Transfer","Text to Image","Color Grading","Tone Mapper",
    "Film Grain","Bokeh Generator","Sky Replace","Cloud Generator","Prop Creator","Depth Map","Normal Map","Albedo Map",
    "Roughness Map","Metallic Map","Emission Map","Ambient Occlude","Shadow Generator","Highlight","Rim Light","Fill Light",
    "Key Light","3-Point Light","Studio Light","Natural Light","Golden Hour","Blue Hour","Night Scene","Day Scene",
    "Sunrise FX","Sunset FX","Moonlight","Starlight","Fire Light","Candle Light","Neon Light","LED Effect","LUT Creator",
    "Contrast Adjust","Brightness","Saturation","Hue Shift","Temperature","Tint Control","Exposure Fix","HDR Merge",
    "Panorama Stitch","360 Image","Fisheye Fix","Lens Distort","Chromatic Aberr","Vignette","Noise Add","Scratch Add",
    "Dust Particles","Light Leaks","Depth Field","Motion Blur","Radial Blur","Zoom Blur","Gaussian Blur","Smart Blur",
    "Sharpen","Edge Enhance","Detail Boost","Clarity","Structure","Dehaze","Weather FX","Rain Creator","Snow Effect",
    "Fog Generator","Mist Tool","Haze Creator","Smoke FX","Steam Generator","Fire Creator","Explosion","Spark Generator",
    "Lightning","Aurora FX","Rainbow","Lens Flare","God Rays","Volumetric","Caustics"
  ],
  Video: [
    "Video Upscaler to 4K","Video Upscaler to 8K","Frame Rate Booster","60FPS Converter","Slow Motion Generator",
    "Video Extender","Scene Generator","Motion Video Maker","Video Creator","Avatar Generator","Video Synthesizer",
    "Video Studio","Image to Motion","Dynamic Pan","Tilt Shot","Tracking Shot","Crane Movement","Steadycam",
    "Shot Transition","Close-up","Wide Shot","POV Shot","Zoom In","Dolly In","Time Lapse","Slow Motion","Speed Ramp",
    "Flow Generator","Video Craft","Style Tool","Temporal Flow","Frame Blend","Track Shot","Crane Move","Handheld FX",
    "Shot Transit","Establish Shot","Medium Shot","Over Shoulder","Dutch Angle","Whip Pan","Swish Pan","Zoom Out",
    "Dolly Out","Truck Left","Truck Right","Pedestal Up","Pedestal Down","Arc Shot","Orbit Shot","Boom Up","Boom Down",
    "Jib Shot","Drone Shot","Aerial View","Birds Eye","Ground Level","Low Angle","High Angle","Eye Level","Worms Eye",
    "Canted Frame","Symmetry","Rule Thirds","Golden Ratio","Leading Lines","Frame Frame","Negative Space","Depth Layers",
    "Video Stabilizer","Color Grading Pro","Background Remover","Old Film Restorer","Black & White Colorizer"
  ],
  Motion: [
    "Particle Effect Generator","VFX Generator - All Types","Style Transfer - Any Style","Motion Tracker","Mocap Logic",
    "Physics Engine","Cloth Dynamics","Skeleton Animator","Facial Rigging","Body Movement","Camera Tracker",
    "Particle System","Fluid Dynamics","Spring System","Keyframe Tool","Graph Editor","Timeline Editor","Ease In",
    "Ease Out","Bounce Effect","Elastic Motion","Anticipation","Follow Through","Tracker Pro","Object Physics",
    "Gravity Sim","Collision Detect","Soft Body","Rigid Body","Fluid Dynamic","Smoke Sim","Fire Dynamic","Water Physics",
    "Wind Effect","Force Field","Turbulence","Vortex","Attraction","Repulsion","Gravity Well","Rope Physics",
    "Chain Dynamic","Hair Sim","Fur Dynamic","Cloth Drape","Flag Wave","Curtain Motion","Dress Physics","Cape Sim",
    "Muscle System","Skin Deform","Explosion Effect","Fire Effect","Smoke Effect","Water Effect","Lightning Effect",
    "Magic Effect","Energy Beam","Glitch Effect","Hologram Effect","Portal Effect","Teleportation","Invisibility",
    "Laser Effect","Plasma Effect","Shockwave","Dust Effect"
  ],
  Enhancement: [
    "AI 8K Upscaling","Video Denoiser","Audio Enhancer","Noise Cancellation","Face Enhancement","Cinematic Grain",
    "Motion Stabilization","Deep HDR Boost","Face Retouch Pro","Neural Noise Reduction","Auto Color Balance",
    "Dynamic Range Expansion","Lens Flare Synth","Shadow Recovery","Highlight Rolloff","Skin Tone Uniformity",
    "Optical Flow Smooth","Atmospheric Haze","Sharpen Intelligence","De-Banding Pro","Moire Removal",
    "Color Space Transform","Anamorphic Stretch","Flicker Reduction","Low Light Clarity","Texture Enhancement",
    "Micro-Contrast Adjust","Vignette Pro","Film Stock Emulation","Glow Synthesis","Edge Refinement","Smart Saturation",
    "Tone Mapping Pro","Gamma Correction","Black Point Calibration","White Balance AI","Color Match Pro",
    "Temporal Denoise","Digital Intermediate","Chromatic Correction","Film Grain Advanced","Halation Effect",
    "Bloom Control","Light Wrap","Contrast Enhancer","Brightness Optimizer","Saturation Booster","HDR Video Creator",
    "Night Video Enhancer","Quality Optimizer","Resolution Multiplier","Detail Enhancer","Clarity Booster",
    "Sharpness Enhancer","Blur Remover","Artifact Remover","Scratch Remover","Flicker Fixer","Sky Replacement",
    "Background Replacer","Object Remover","Watermark Remover","Echo Remover","Reverb Remover","Hum Remover",
    "Pop Remover","Click Remover","Breath Remover","Room Tone Remover"
  ]
};

const ENHANCEMENT_TOOLS = [
  "AI 8K Upscaling","Cinematic Grain","Motion Stabilization","Deep HDR Boost","Face Retouch Pro",
  "Neural Noise Reduction","Auto Color Balance","Dynamic Range Expansion","Lens Flare Synth","Shadow Recovery",
  "Highlight Rolloff","Skin Tone Uniformity","Optical Flow Smooth","Atmospheric Haze","Sharpen Intelligence",
  "De-Banding Pro","Moire Removal","Color Space Transform","Anamorphic Stretch","Flicker Reduction",
  "Low Light Clarity","Texture Enhancement","Micro-Contrast Adjust","Vignette Pro","Film Stock Emulation",
  "Glow Synthesis","Edge Refinement","Smart Saturation","Tone Mapping Pro","Gamma Correction",
  "Black Point Calibration","White Balance AI","Color Match Pro","Temporal Denoise","Digital Intermediate",
  "Chromatic Correction","Film Grain Advanced","Halation Effect","Bloom Control","Light Wrap"
];

function Toast({ toasts, removeToast }: { toasts: any[]; removeToast: (id: number) => void }) {
  return (
    <div className="fixed top-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
      {toasts.map((t: any) => (
        <div key={t.id} className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border pointer-events-auto min-w-72 max-w-sm
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

function ConfirmModal({ modal, onConfirm, onCancel }: { modal: any; onConfirm: () => void; onCancel: () => void }) {
  if (!modal) return null;
  return (
    <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-zinc-950 border-2 border-[#7c3aed] rounded-3xl p-10 max-w-md w-full shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-[#7c3aed]/20 flex items-center justify-center">
            <AlertCircle size={28} className="text-[#7c3aed]" />
          </div>
          <h3 className="text-2xl font-black text-white">{modal.title}</h3>
        </div>
        <p className="text-zinc-400 mb-8 leading-relaxed">{modal.body}</p>
        <div className="flex gap-4">
          <button onClick={onCancel} className="flex-1 py-4 bg-zinc-800 text-white rounded-xl font-black uppercase hover:bg-zinc-700 transition">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-4 bg-[#7c3aed] text-white rounded-xl font-black uppercase hover:bg-[#6d28d9] transition">
            {modal.confirmLabel || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProgressOverlay({ progress, label, subLabel }: { progress: number; label: string; subLabel: string }) {
  const isComplete = progress >= 100;
  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center max-w-xl w-full px-8">
        <div className="w-40 h-40 rounded-full bg-[#7c3aed]/20 flex items-center justify-center mx-auto mb-10 relative">
          {!isComplete && <div className="absolut