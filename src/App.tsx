import { useState, useRef, useEffect } from "react";
import { EnhancedLoginRegister } from './components/EnhancedLoginRegister';
import ToolBoardPage from './components/ToolBoardPage';
import LiveVideoEditor from './components/LiveVideoEditor';
import TimelineEditor from './components/TimelineEditor';
import DaVinciTimeline from './components/DaVinciTimeline';
import VideoRecorder from './components/VideoRecorder';
import { AudioMixer } from './components/AudioMixer';
import PasteImporter from './components/PasteImporter';
import VideoPreview from './components/VideoPreview';
import VideoTrimmer from './components/VideoTrimmer';
import FullScreenViewer from './components/FullScreenViewer';
import FullscreenMovieViewer from './components/FullscreenMovieViewer';
import { EnhancedCommunityHub } from './components/EnhancedCommunityHub';
import SubscriptionPricing from './components/SubscriptionPricing';
import SubscriptionDashboard from './components/SubscriptionDashboard';
import { AgentGrokHelpDesk } from './components/AgentGrokHelpDesk';
import { ThankYouMissionPage } from './components/ThankYouMissionPage';
import Page21 from './components/Page21';
import { DevTools } from './components/DevTools';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import QuickAccess from './components/QuickAccess';
import Footer from './components/Footer';
import { supabase } from './lib/supabase';
import type { User } from '@supabase/supabase-js';

const GOLD = "#e8c96d";
const GOLDDIM = "#a07820";
const BG = "#000000";
const BG4 = "#080808";
const WHITE = "#d4c9a8";
const DIM = "#aaaaaa";
const TOTAL = 23;

const STRIPE = {
  basic:"https://buy.stripe.com/test_basic",
  pro:"https://buy.stripe.com/test_pro",
  studio:"https://buy.stripe.com/test_studio",
};

const G = (v, sm) => ({
  background: v==="gold" ? `linear-gradient(135deg,${GOLDDIM},${GOLD})` : "transparent",
  border: v==="gold" ? "none" : `1px solid ${GOLD}`,
  color: v==="gold" ? "#000" : GOLD,
  borderRadius:0, fontWeight:900,
  padding: sm ? "5px 14px" : "10px 26px",
  fontSize: sm ? 11 : 13,
  cursor:"pointer", letterSpacing:2, textTransform:"uppercase",
  fontFamily:"'Rajdhani',sans-serif",
});
const Sp = { minHeight:"100vh", background:BG, color:WHITE, fontFamily:"'Rajdhani',sans-serif", paddingBottom:100 };
const H1 = { fontFamily:"'Cinzel',serif", color:GOLD, letterSpacing:5, textTransform:"uppercase", margin:0 };
const Card = (x) => ({ background:"#0a0a0a", border:`1px solid ${GOLDDIM}`, borderRadius:0, padding:18, ...(x||{}) });

const STOCK_VOICES = [
  { id:"aurora", name:"Aurora", desc:"Warm, measured British female. Calm authority with quiet emotion. Perfect for documentaries, nature films and serious narration. Never rushes. Never shouts.", style:"Documentary · Narrator", accent:"British RP" },
  { id:"marcus", name:"Marcus", desc:"Deep, commanding American male. Powerful and cinematic. Built for trailers, action films and stories that need weight behind every word.", style:"Cinematic · Authoritative", accent:"American" },
  { id:"sophia", name:"Sophia", desc:"Bright, energetic Australian female. Upbeat and engaging with natural warmth. Great for social content, uplifting stories and anything that needs forward momentum.", style:"Upbeat · Engaging", accent:"Australian" },
  { id:"james",  name:"James",  desc:"Dry, deadpan British male. Blunt, sarcastic and witty with perfect comic timing. Says the uncomfortable truth with a straight face. Ideal for satire, dark comedy and narration that should make you laugh before it makes you think.", style:"Sarcastic · Deadpan · Witty", accent:"British" },
  { id:"nova",   name:"Nova",   desc:"Neutral, precise AI-style female. Clear, clean and professional. No accent, no emotion, no opinion — just pure information delivered calmly. Perfect for tech content, instructions and corporate narration.", style:"Clean · Professional · Neutral", accent:"Neutral" },
  { id:"river",  name:"River",  desc:"Warm, unhurried American male. Southern charm with genuine intimacy. Feels like someone telling you a story on a porch at dusk. Built for personal films, heartfelt content and anything that needs feel human.", style:"Friendly · Intimate · Storyteller", accent:"American South" },
];

const VOICE_TOOLS = ["Text to Voice","Text to Speech","Text to Narration","Text to Audiobook","Text to Voiceover","AI Voice Actor","Neural Voice Generator","Emotion Voice Synth","Documentary Voice","Trailer Voice Generator","Commercial Voice","Character Voice Creator","Audiobook Creator","Podcast Voice"];

let VOICE_ASSIGNMENTS = {};
try { VOICE_ASSIGNMENTS = JSON.parse(localStorage.getItem("ms_voice_assign")||"{}"); } catch{}

let currentUtterance = null;

const VOICE_PARAMS = {
  aurora: { pitch:1.05, rate:0.82 },
  marcus: { pitch:0.80, rate:0.78 },
  sophia: { pitch:1.25, rate:1.08 },
  james:  { pitch:0.90, rate:0.72 },
  nova:   { pitch:1.10, rate:0.95 },
  river:  { pitch:0.95, rate:0.80 },
};

function speakText(voiceId, txt, onStart, onEnd, pitchOverride) {
  if (!txt||!txt.trim()) return;
  window.speechSynthesis.cancel();
  currentUtterance = null;
  const clean = txt.replace(/\[pause\]/g,". . . ").replace(/[*\/]/g," ").slice(0,5000);
  const doSpeak = () => {
    const allVoices = window.speechSynthesis.getVoices();
    const utt = new SpeechSynthesisUtterance(clean);
    const params = VOICE_PARAMS[voiceId] || { pitch:1.0, rate:0.9 };

    utt.pitch = pitchOverride !== undefined ? pitchOverride : params.pitch;
    utt.rate  = params.rate;

    const assignedName = VOICE_ASSIGNMENTS[voiceId];
    let picked = assignedName ? allVoices.find(v=>v.name===assignedName) : null;
    if (!picked) {
      const femalePat = /samantha|zira|victoria|moira|karen|susan|lisa|fiona|serena|tessa|heather|hazel|allison|ava|nora|siri|female/i;
      const malePat   = /david|daniel|oliver|arthur|george|harry|lee|ryan|eric|reed|liam|aaron|rishi|wayne|brian|derek|steven|alan|albert|andy|tom|bruce|fred|mark|paul|peter|john|james|gordon|alex|eddy|bobby|ralph|male/i;
      if (voiceId==="aurora") {
        picked = allVoices.find(x=>/kate|serena|emily/i.test(x.name)) || allVoices.find(x=>x.lang==="en-GB"&&femalePat.test(x.name)) || allVoices.find(x=>x.lang==="en-GB") || allVoices.find(x=>x.lang.startsWith("en")&&femalePat.test(x.name));
      } else if (voiceId==="marcus") {
        picked = allVoices.find(x=>/daniel|david|alex/i.test(x.name)&&x.lang.startsWith("en-US")) || allVoices.find(x=>x.lang==="en-US"&&malePat.test(x.name)) || allVoices.find(x=>x.lang.startsWith("en")&&malePat.test(x.name));
      } else if (voiceId==="sophia") {
        picked = allVoices.find(x=>/karen/i.test(x.name)) || allVoices.find(x=>x.lang==="en-AU") || allVoices.find(x=>x.lang.startsWith("en")&&femalePat.test(x.name));
      } else if (voiceId==="james") {
        picked = allVoices.find(x=>/daniel|oliver|arthur/i.test(x.name)&&x.lang==="en-GB") || allVoices.find(x=>x.lang==="en-GB"&&malePat.test(x.name)) || allVoices.find(x=>x.lang==="en-GB"&&!femalePat.test(x.name)) || allVoices.find(x=>x.lang.startsWith("en")&&malePat.test(x.name));
      } else if (voiceId==="nova") {
        picked = allVoices.find(x=>/samantha|victoria|zira/i.test(x.name)) || allVoices.find(x=>x.lang==="en-US"&&femalePat.test(x.name)) || allVoices.find(x=>x.lang.startsWith("en")&&femalePat.test(x.name));
      } else if (voiceId==="river") {
        picked = allVoices.find(x=>/ryan|eric|reed|liam/i.test(x.name)) || allVoices.find(x=>x.lang==="en-US"&&malePat.test(x.name)) || allVoices.find(x=>x.lang.startsWith("en")&&malePat.test(x.name));
      }
      picked = picked || allVoices.find(x=>x.lang.startsWith("en")) || allVoices[0];
    }
    if (picked) utt.voice = picked;
    currentUtterance = utt;
    if (onStart) onStart();
    utt.onend=()=>{ currentUtterance=null; if(onEnd)onEnd(); };
    utt.onerror=()=>{ currentUtterance=null; if(onEnd)onEnd(); };
    window.speechSynthesis.speak(utt);
  };
  if (window.speechSynthesis.getVoices().length>0){doSpeak();}
  else{window.speechSynthesis.onvoiceschanged=()=>{doSpeak();};}
}

function stopSpeaking() {
  window.speechSynthesis.cancel();
  currentUtterance = null;
}

const WRITING = ["Script to Movie","Text to Script","Script to Screenplay","Prompt to Story","Story to Script","Feature Film Script","Short Film Script","TV Pilot Script","Documentary Script","Commercial Script","YouTube Script","Podcast Script","Social Media Script","Explainer Script","Plot Generator","Story Outline","Three Act Structure","Five Act Structure","Beat Sheet Builder","Character Bio Writer","Character Arc Builder","Subplot Generator","Plot Twist Generator","Opening Hook Creator","Climax Designer","Logline Generator","Synopsis Writer","Treatment Writer","Scene Writer","Text to Dialogue","Dialogue Generator","Narration Writer","Voiceover Script","Interview Script","Action Line Writer","Scene Heading Tool","Parenthetical Generator","Script Formatter","Dialogue Tightener","Script Timer","Word Counter","Page Counter","Reading Time Estimator","Format Checker","Grammar Polish","Spell Checker","Continuity Checker","Plot Hole Detector","Tone Checker","Genre Classifier"];

const VOICE = ["Upload Own Voice","Record My Voice","Clone My Voice","Text to Voice","Text to Speech","Text to Narration","Text to Audiobook","Text to Voiceover","Voice Cloning","Voice to Voice","AI Voice Actor","Neural Voice Generator","Emotion Voice Synth","Trailer Voice Generator","Documentary Voice","Commercial Voice","Character Voice Creator","Accent Generator","Multi Language Voice","Voice Translator","Lip Sync AI","Dialogue Synth","Audiobook Creator","Podcast Voice","Radio DJ Voice","Sports Commentary Voice","ASMR Creator","Whisper Generator","Meditation Voice","Alien Voice","Deep Voice Generator","Robot Voice","Child Voice","Elder Voice","Monster Voice","Celebrity Voice Clone","Cartoon Voice","Anime Voice","Video Game Voice","Audio Drama Voice","Voice Modifier","Pitch Shifter","Voice Equalizer","Reverb Voice","Echo Voice","Distortion Voice","Auto Tune Voice","Harmony Generator","Voice Layering","Multi Voice Mixer","Background Noise Remover","Voice Enhancer","Clarity Booster","Volume Normalizer","Voice Compressor","Limiter","De-esser","Breath Remover","Pop Filter","Noise Gate","Voice Isolation","Stem Separator","Vocal Extractor","Karaoke Maker","Acapella Extractor","Instrumental Remover","Voice to MIDI","Speech to Song","Melodyne Voice","Voice Autotune","Vocal Tuning","Formant Shifter","Timbre Changer","Gender Swap Voice","Age Progression Voice","Accent Remover","Accent Adder","Dialect Generator","Regional Voice","International Voice","Bilingual Voice","Voice Dubbing","Language Dub","Translation Voice","Subtitle Voice Sync","ADR Voice Tool","Dialogue Replacement","Voiceover Sync","Lip Sync Tool","Mouth Animation Sync","Facial Animation Voice","Motion Capture Voice","Performance Capture Voice","Voice Acting Tool","Character Performer","Multi Character Voice","Crowd Voice Generator","Background Chatter","Ambient Voice","Environmental Voice","3D Spatial Voice","Surround Sound Voice","Binaural Voice","HRTF Voice","Spatial Audio Voice","Dolby Atmos Voice","Immersive Audio Voice","360 Audio Voice","VR Voice Spatializer","AR Voice Tool","Mixed Reality Voice","Interactive Voice","Game Voice Integration","Real-time Voice Mod","Live Voice Filter","Streaming Voice Effect","Broadcast Voice","Radio Voice Polish","Podcast Voice EQ","Voice Mastering","Audio Mastering Voice","Final Mix Voice"];

const VIDEO = ["Video to Movie","Text to Video","Image to Video","Script to Video","Audio to Video","Prompt to Video","Story to Film","AI Video Generator","Neural Video Creator","Text to Animation","Image Animation","Photo to Video","Still to Motion","Time Lapse Creator","Slow Motion Generator","Speed Ramping","Frame Interpolation","Motion Smoothing","Video Upscaler","4K Upscaler","8K Converter","Resolution Enhancer","Video Denoiser","Grain Remover","Stabilization","Camera Shake Fix","Warp Stabilizer","Rolling Shutter Fix","Lens Distortion Fix","Chromatic Fix","Vignette Remover","Color Correction","Color Grading","LUT Creator","Cinematic Color","Film Look","Vintage Filter","Retro Effect","Black and White","Sepia Tone","Infrared Effect","Thermal Vision","Night Vision","X-Ray Effect","Negative Film","Cross Process","Bleach Bypass","Teal and Orange","Blockbuster Look","Netflix Color","HBO Style","Cinematic Bars","Aspect Ratio Converter","Crop Tool","Rotate Video","Flip Video","Mirror Effect","Split Screen","Picture in Picture","Multi Camera Sync","Multicam Editor","Angle Switcher","Camera Coverage","B-Roll Generator","Stock Footage Finder","Clip Suggester","Scene Matcher","Shot List Creator","Storyboard to Video","Animatic Creator","Previz Tool","Virtual Production","Green Screen Keyer","Chroma Key","Blue Screen Removal","Background Remover","Rotoscoping Tool","Mask Creator","Tracking Tool","Motion Tracking","Face Tracking","Object Tracking","Planar Tracking","3D Camera Tracker","Match Moving","Compositing Tool","Layer Blending","Alpha Channel","Matte Generator","Garbage Matte","Hold Out Matte","Luma Key","Difference Key","Color Key","Advanced Spill Suppression","Edge Feathering","Matte Cleanup","Matte Choker","Core Matte","Channel Mixer","RGB Splitter","Channel Combiner"];

const SOUND = ["Audio to Movie","Sound to Film","Music to Video","Beat to Visual","Rhythm to Animation","Audio Reactive Video","Sound Visualization","Waveform Video","Spectrum Video","Frequency Visualizer","Audio Spectrum Generator","Music Visualizer","Beat Detector","BPM Analyzer","Tempo Finder","Rhythm Tracker","Audio to MIDI","Sound to Note","Music Transcription","Melody Extractor","Chord Detector","Harmony Analyzer","Key Finder","Scale Detector","Pitch Detection","Frequency Analysis","Audio Fingerprint","Music Recognition","Song Identifier","Shazam Clone","Audio Search","Sound Matcher","Stem Separation","Vocal Isolation","Instrumental Isolation","Drum Isolation","Bass Isolation","Piano Isolation","Guitar Isolation","Source Separation","Unmix","Spleeter","Demucs","Audio Repair","Click Removal","Pop Removal","Hum Removal","Noise Reduction","Hiss Removal","Crackle Removal","Vinyl Restoration","Tape Restoration","Audio Restoration","Declip","Decrackle","Dehum","Denoise","Dialogue Cleaner","Voice Isolator","Background Noise Remover","Wind Noise Removal","Traffic Noise Removal","Room Tone Removal","Reverb Removal","Deverb","Echo Removal","Audio Enhancer","Clarity Boost","Presence Boost","Warmth","Air","Brightness","Bass Boost","Treble Boost","Midrange EQ","Parametric EQ","Graphic EQ","Dynamic EQ","Adaptive EQ","Auto EQ","Intelligent EQ","Match EQ","Reference EQ","Mastering EQ","Mixing Console","Virtual Mixer","Channel Strip","Compressor","Limiter","Expander","Gate","Multiband Compressor","Multiband Limiter","Transient Shaper","Attack Control","Decay Control","Sustain Control","Release Control","Envelope Shaper","Dynamics Processor"];

const IMAGE = ["Image to Movie","Photo to Video","Still to Motion","Picture to Film","Graphic to Video","AI Image to Video","Photo Animation","Image Animator","Still Image Animation","Cinemagraph Creator","Living Photo","Motion Still","Parallax Photo","2.5D Photo","Depth Photo","Portrait Mode Video","Bokeh Animation","Background Blur Video","Ken Burns Effect","Pan and Zoom","Auto Zoom","Smart Crop Video","Auto Reframe","Face Detect Animation","Object Follow","Subject Track","Camera Movement Generator","Virtual Camera","Dolly Shot","Truck Shot","Pan Shot","Tilt Shot","Crane Shot","Jib Movement","Steadicam Effect","Gimbal Smoothing","Camera Shake Generator","Handheld Effect","POV Shot","First Person Camera","Third Person Camera","Orbital Camera","Camera Orbit","Turntable Effect","360 Spin","Product Rotation","3D Product View","Multi Angle View","Camera Array","Bullet Time","Time Slice","Frozen Moment","Matrix Effect","Speed Ramp","Slow Motion Photo","Time Freeze","Action Freeze","Splash Freeze","Motion Freeze Frame","High Speed Photography","Macro Photography","Microscopic View","Telescope View","Satellite View","Aerial View","Drone Shot","Birds Eye View","Top Down View","Overhead Shot","Isometric View","Axonometric","Perspective Correction","Lens Correction","Distortion Fix","Straighten Horizon","Auto Level","Crop and Straighten","Auto Crop","Content Aware Crop","Intelligent Crop","Smart Resize","Content Aware Scale","Seam Carving","Liquid Rescale","Aspect Ratio Change","Portrait to Landscape","Landscape to Portrait","Square Crop","Vertical Video","Horizontal Video","Instagram Format","TikTok Format","YouTube Thumbnail","Social Media Resize","Multi Platform Export","Batch Resize","Bulk Processing"];

const TOOLS_720 = [
  ...WRITING, ...VOICE, ...VIDEO, ...SOUND, ...IMAGE
];

export default function App() {
  const [page, setPage] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPasteImporter, setShowPasteImporter] = useState(false);
  const [showDevTools, setShowDevTools] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);
  const [currentProject, setCurrentProject] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        loadUserSubscription(session.user.id);
      }
    });

    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserSubscription(session.user.id);
      } else {
        setSubscription(null);
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const loadUserSubscription = async (userId: string) => {
    const { data } = await supabase
      .from('subscriptions')
      .select('plan')
      .eq('user_id', userId)
      .eq('status', 'active')
      .maybeSingle();

    setSubscription(data?.plan ?? null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setPage(0);
  };

  const handleFileUpload = async (file: File) => {
    if (!user) return;

    const fileName = `${user.id}/${Date.now()}_${file.name}`;
    const bucket = file.type.startsWith('video/') ? 'videos' :
                  file.type.startsWith('audio/') ? 'audio' : 'images';

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return;
    }

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    const { error: dbError } = await supabase
      .from('media_assets')
      .insert({
        user_id: user.id,
        type: bucket.slice(0, -1),
        url: urlData.publicUrl,
        filename: file.name,
        size: file.size
      });

    if (dbError) {
      console.error('DB error:', dbError);
    }
  };

  if (loading) {
    return (
      <div style={Sp}>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", minHeight:"100vh"}}>
          <div style={{fontSize:20, color:GOLD}}>Loading...</div>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    if (page === 0) {
      return (
        <div style={{...Sp, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:20}}>
          <h1 style={{...H1, fontSize:48, marginBottom:30}}>MandaStrong Studio</h1>
          <p style={{fontSize:18, marginBottom:40, textAlign:"center", maxWidth:600}}>
            Professional video editing platform with AI-powered tools for creators
          </p>
          <div style={{display:"flex", gap:20, flexWrap:"wrap", justifyContent:"center"}}>
            <button style={G("gold")} onClick={() => setPage(user ? 1 : 2)}>
              {user ? "Enter Studio" : "Get Started"}
            </button>
            {!user && (
              <button style={G(null)} onClick={() => setPage(2)}>
                Sign In
              </button>
            )}
            {user && (
              <button style={G(null)} onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      );
    }

    if (page === 1) {
      return (
        <div style={Sp}>
          <div style={{padding:20}}>
            <h1 style={{...H1, fontSize:32, marginBottom:30}}>Studio Dashboard</h1>
            <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))", gap:20}}>
              <div style={Card()} onClick={() => setPage(4)}>
                <h3 style={{color:GOLD, marginBottom:10}}>AI Writing Tools</h3>
                <p style={{fontSize:14, color:DIM}}>Script to movie, text to screenplay, story generation</p>
              </div>
              <div style={Card()} onClick={() => setPage(5)}>
                <h3 style={{color:GOLD, marginBottom:10}}>Voice & Audio</h3>
                <p style={{fontSize:14, color:DIM}}>Text to speech, voice cloning, audio effects</p>
              </div>
              <div style={Card()} onClick={() => setPage(6)}>
                <h3 style={{color:GOLD, marginBottom:10}}>Video Generation</h3>
                <p style={{fontSize:14, color:DIM}}>Text to video, image animation, AI effects</p>
              </div>
              <div style={Card()} onClick={() => setPage(7)}>
                <h3 style={{color:GOLD, marginBottom:10}}>Sound Design</h3>
                <p style={{fontSize:14, color:DIM}}>Audio reactive, music visualization, mixing</p>
              </div>
              <div style={Card()} onClick={() => setPage(8)}>
                <h3 style={{color:GOLD, marginBottom:10}}>Image Tools</h3>
                <p style={{fontSize:14, color:DIM}}>Photo to video, AI enhancement, effects</p>
              </div>
              <div style={Card()} onClick={() => setPage(12)}>
                <h3 style={{color:GOLD, marginBottom:10}}>Video Editor</h3>
                <p style={{fontSize:14, color:DIM}}>Full featured timeline editor</p>
              </div>
              <div style={Card()} onClick={() => setPage(3)}>
                <h3 style={{color:GOLD, marginBottom:10}}>Upgrade</h3>
                <p style={{fontSize:14, color:DIM}}>Current: {subscription || "Free"}</p>
              </div>
              <div style={Card()} onClick={() => setPage(20)}>
                <h3 style={{color:GOLD, marginBottom:10}}>Community</h3>
                <p style={{fontSize:14, color:DIM}}>Share and discover</p>
              </div>
            </div>
            <div style={{marginTop:30}}>
              <button style={G(null, true)} onClick={() => setPage(0)}>Back to Home</button>
            </div>
          </div>
          <Footer onNavigate={setPage} />
        </div>
      );
    }

    if (page === 2) {
      return <EnhancedLoginRegister onNavigate={setPage} />;
    }

    if (page === 3) {
      return <SubscriptionPricing onNavigate={setPage} currentPlan={subscription} />;
    }

    if (page === 4) {
      return <ToolBoardPage category="Writing" tools={WRITING} onNavigate={setPage} />;
    }

    if (page === 5) {
      return <ToolBoardPage category="Voice & Audio" tools={VOICE} onNavigate={setPage} />;
    }

    if (page === 6) {
      return <ToolBoardPage category="Video Generation" tools={VIDEO} onNavigate={setPage} />;
    }

    if (page === 7) {
      return <ToolBoardPage category="Sound Design" tools={SOUND} onNavigate={setPage} />;
    }

    if (page === 8) {
      return <ToolBoardPage category="Image Tools" tools={IMAGE} onNavigate={setPage} />;
    }

    if (page === 9) {
      return <ToolBoardPage category="All Tools" tools={TOOLS_720} onNavigate={setPage} />;
    }

    if (page === 12) {
      return <LiveVideoEditor onNavigate={setPage} />;
    }

    if (page === 13) {
      return <TimelineEditor onNavigate={setPage} />;
    }

    if (page === 14) {
      return <DaVinciTimeline onNavigate={setPage} />;
    }

    if (page === 15) {
      return <VideoRecorder onNavigate={setPage} />;
    }

    if (page === 16) {
      return <AudioMixer onNavigate={setPage} />;
    }

    if (page === 17) {
      return <FullScreenViewer onNavigate={setPage} />;
    }

    if (page === 18) {
      return <FullscreenMovieViewer onNavigate={setPage} />;
    }

    if (page === 19) {
      return <AgentGrokHelpDesk onNavigate={setPage} />;
    }

    if (page === 20) {
      return <EnhancedCommunityHub onNavigate={setPage} />;
    }

    if (page === 21) {
      return <Page21 onNavigate={setPage} />;
    }

    if (page === 22) {
      return <SubscriptionDashboard onNavigate={setPage} />;
    }

    return (
      <div style={Sp}>
        <div style={{padding:20}}>
          <h1 style={{...H1, fontSize:28}}>Page {page}</h1>
          <button style={G(null, true)} onClick={() => setPage(0)}>Back to Home</button>
        </div>
      </div>
    );
  };

  return (
    <>
      <PWAInstallPrompt />
      <QuickAccess onNavigate={setPage} />
      {renderPage()}
      {showPasteImporter && (
        <PasteImporter onClose={() => setShowPasteImporter(false)} />
      )}
      {showDevTools && (
        <DevTools onClose={() => setShowDevTools(false)} />
      )}
    </>
  );
}
