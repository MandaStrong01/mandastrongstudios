import { useState, useRef, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { EnhancedLoginRegister } from './components/EnhancedLoginRegister';
import Page21 from './components/Page21';
import ToolBoardPage from './components/ToolBoardPage';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import { ThankYouMissionPage } from './components/ThankYouMissionPage';
import { AgentGrokHelpDesk } from './components/AgentGrokHelpDesk';
import { EnhancedCommunityHub } from './components/EnhancedCommunityHub';
import SubscriptionPricing from './components/SubscriptionPricing';
import LiveVideoEditor from './components/LiveVideoEditor';
import FullScreenViewer from './components/FullScreenViewer';
import PasteImporter from './components/PasteImporter';
import { uploadFile } from './lib/storage';

const GOLD = "#e8c96d";
const BG = "#000";
const TEXT = "#d4c9a8";
const DIM = "#777";

const AI_TOOLS = {
  Writing: [
    "Script to Movie","Text to Script","Script to Screenplay","Prompt to Story","Story to Script",
    "Feature Film Script","Short Film Script","TV Pilot Script","Documentary Script","Commercial Script",
    "YouTube Script","Podcast Script","Social Media Script","Explainer Script","Plot Generator",
    "Story Outline","Three Act Structure","Five Act Structure","Beat Sheet Builder","Character Bio Writer",
    "Character Arc Builder","Subplot Generator","Plot Twist Generator","Opening Hook Creator","Climax Designer",
    "Logline Generator","Synopsis Writer","Treatment Writer","Scene Writer","Text to Dialogue",
    "Dialogue Generator","Narration Writer","Voiceover Script","Interview Script","Action Line Writer",
    "Scene Heading Tool","Parenthetical Generator","Script Formatter","Dialogue Tightener","Script Timer",
    "Word Counter","Page Counter","Reading Time Estimator","Format Checker","Grammar Polish",
    "Spell Checker","Continuity Checker","Plot Hole Detector","Tone Checker","Genre Classifier"
  ],
  Voice: ['Voice Clone', 'Text-to-Speech', 'Voice Effects', 'Accent Generator', 'Multilingual TTS', 'Voice Mixing', 'Pitch Shifter', 'Audio Enhancer', 'Noise Reduction', 'Echo Effect', 'Voice Morph', 'Age Voice', 'Gender Voice', 'Celebrity Voice', 'Character Voice', 'Emotion Voice', 'Whisper Mode', 'Shout Mode', 'Robot Voice', 'Alien Voice', 'Monster Voice', 'Child Voice', 'Elderly Voice', 'Professional Narration', 'Audiobook Voice', 'Podcast Voice', 'Radio Voice', 'Phone Voice', 'Megaphone Voice', 'Underwater Voice', 'Cave Echo', 'Stadium Voice', 'Theatre Voice', 'Cinema Voice', 'TV Voice', 'Gaming Voice', 'Anime Voice', 'Cartoon Voice', 'Documentary Voice', 'News Voice', 'Sports Voice', 'Weather Voice', 'DJ Voice', 'Singer Voice', 'Rapper Voice', 'Opera Voice', 'Jazz Voice', 'Blues Voice', 'Rock Voice', 'Pop Voice'],
  Image: ['AI Image Generator', 'Style Transfer', 'Background Remover', 'Upscaler', 'Face Restoration', 'Color Grading', 'Image Enhancer', 'Object Removal', 'Inpainting', 'Outpainting', 'Photo to Sketch', 'Sketch to Photo', 'Cartoon Effect', 'Anime Style', 'Oil Painting', 'Watercolor', 'Pop Art', 'Pixel Art', 'Low Poly', '3D Render', 'Cinematic Look', 'Film Noir', 'Vintage Photo', 'Sepia Tone', 'Black & White', 'HDR Effect', 'Tilt Shift', 'Miniature', 'Bokeh', 'Lens Flare', 'Light Leak', 'Vignette', 'Grain', 'Sharpen', 'Blur', 'Motion Blur', 'Radial Blur', 'Zoom Blur', 'Face Swap', 'Age Progression', 'Age Regression', 'Gender Swap', 'Hair Color', 'Eye Color', 'Skin Tone', 'Makeup', 'Tattoo Remover', 'Scar Remover', 'Blemish Remover'],
  Video: ['AI Video Generator', 'Video Upscaler', 'Frame Interpolation', 'Slow Motion', 'Stabilization', 'Background Blur', 'Green Screen', 'Face Swap', 'Lip Sync', 'Motion Tracking', 'Object Tracking', 'Face Tracking', 'Eye Tracking', 'Hand Tracking', 'Body Tracking', 'Camera Tracking', 'Motion Smoothing', 'Shake Reduction', 'Rolling Shutter Fix', 'Lens Correction', 'Chromatic Fix', 'Color Match', 'White Balance', 'Exposure Fix', 'Highlight Recovery', 'Shadow Recovery', 'Noise Reduction', 'Grain Removal', 'Compression Fix', 'Artifact Removal', 'Deinterlace', 'Inverse Telecine', 'Framerate Convert', 'Resolution Upscale', '4K Upscale', '8K Upscale', 'HD Upscale', 'Aspect Ratio', 'Crop & Resize', 'Rotate & Flip', 'Speed Ramp', 'Time Remapping', 'Reverse Video', 'Loop Creator', 'Boomerang', 'Cinemagraph', 'Living Photo', 'Photo Animation', 'Parallax Effect', 'Ken Burns'],
  Motion: ['Motion Graphics', 'Particle Effects', 'Camera Animation', '3D Text', 'Logo Animation', 'Transitions', 'Visual Effects', 'Light Effects', 'Kinetic Typography', 'Abstract Visuals', 'Lower Third', 'Title Card', 'End Card', 'Credits Roll', 'Countdown Timer', 'Progress Bar', 'Loading Animation', 'Spin Animation', 'Bounce Animation', 'Fade Animation', 'Slide Animation', 'Zoom Animation', 'Pan Animation', 'Tilt Animation', 'Dolly Animation', 'Orbit Animation', 'Path Animation', 'Follow Path', 'Morphing', 'Shape Animation', 'Line Animation', 'Draw On', 'Write On', 'Reveal', 'Wipe', 'Iris', 'Clock Wipe', 'Radial Wipe', 'Linear Wipe', 'Gradient Wipe', 'Luma Key', 'Chroma Key', 'Track Matte', 'Set Matte', 'Blend Mode', 'Overlay', 'Screen', 'Multiply', 'Add'],
  Enhancement: ['Quality Boost', 'Sharpening', 'Color Correction', 'Brightness/Contrast', 'HDR Effect', 'Cinematic Look', 'Film Grain', 'Vignette', 'Lens Flare', 'Glow Effect', 'Bloom', 'Light Rays', 'God Rays', 'Volumetric Light', 'Fog', 'Mist', 'Smoke', 'Dust', 'Rain', 'Snow', 'Fire', 'Sparks', 'Lightning', 'Energy', 'Magic', 'Hologram', 'Glitch', 'VHS', 'CRT', 'Film Damage', 'Dust & Scratches', 'Old Film', 'Silent Film', '8mm Film', '16mm Film', 'Super 8', 'VHS Tape', 'Betamax', 'LaserDisc', 'DVD', 'Blu-ray', 'IMAX', '70mm', 'Anamorphic', 'Cinemascope', 'Academy Ratio', 'TV Safe', 'Instagram Square', 'TikTok Vertical']
};

export default function App() {
  const [page, setPage] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showPasteImporter, setShowPasteImporter] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toolCategories = Object.keys(AI_TOOLS);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuthenticated(true);
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        if (session) {
          setIsAuthenticated(true);
          setUser(session.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const goTo = (p: number) => setPage(p);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    try {
      await uploadFile(file);
      alert('Upload successful!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    }
  };

  if (!isAuthenticated && !isGuest) {
    if (page === 0) {
      return (
        <div style={{ background: BG, minHeight: "100vh", color: TEXT, padding: 20 }}>
          <PWAInstallPrompt />
          <div style={{ textAlign: "center", paddingTop: "15vh" }}>
            <h1 style={{ color: GOLD, fontSize: "4rem", marginBottom: 20 }}>MANDASTRONG STUDIO</h1>
            <p style={{ fontSize: "1.5rem", marginBottom: 40, color: DIM }}>
              PROFESSIONAL CINEMA INTELLIGENCE PLATFORM
            </p>
            <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => setPage(1)}
                style={{ background: GOLD, color: BG, padding: "15px 40px", border: "none", fontSize: "1.2rem", cursor: "pointer" }}
              >
                GET STARTED
              </button>
              <button
                onClick={() => setPage(20)}
                style={{ background: "transparent", border: `2px solid ${GOLD}`, color: GOLD, padding: "15px 40px", fontSize: "1.2rem", cursor: "pointer" }}
              >
                LEARN MORE
              </button>
            </div>
          </div>
          <div style={{ position: "fixed", bottom: 20, left: 20, color: DIM }}>
            MANDASTRONG STUDIO 2026 · PROFESSIONAL CINEMA SYNTHESIS · MandaStrong1.Etsy.com
          </div>
        </div>
      );
    }

    if (page === 1) {
      return (
        <div style={{ background: BG, minHeight: "100vh", color: TEXT, padding: 40 }}>
          <div style={{ maxWidth: 800, margin: "0 auto", paddingTop: "10vh" }}>
            <h2 style={{ color: GOLD, fontSize: "3rem", marginBottom: 30 }}>OUR STORY & MISSION</h2>
            <p style={{ fontSize: "1.2rem", marginBottom: 20, lineHeight: 1.8 }}>
              MandaStrong Studio is more than a filmmaking platform. It's part of a comprehensive educational initiative
              designed to bring awareness to bullying prevention, social skills development, and the cultivation of humanity in our communities.
            </p>
            <p style={{ fontSize: "1.2rem", marginBottom: 40, lineHeight: 1.8 }}>
              All Etsy Store proceeds benefit Veterans Mental Health Services. 100% of proceeds go directly to supporting those who have sacrificed for our freedom.
            </p>
            <div style={{ display: "flex", gap: 20 }}>
              <button onClick={() => setPage(0)} style={{ background: "transparent", border: `2px solid ${GOLD}`, color: GOLD, padding: "12px 30px", cursor: "pointer" }}>
                ◀ BACK
              </button>
              <button onClick={() => setPage(2)} style={{ background: GOLD, color: BG, padding: "12px 30px", border: "none", cursor: "pointer" }}>
                CONTINUE ▶
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (page === 2 || page === 3) {
      return (
        <EnhancedLoginRegister
          onBack={() => setPage(1)}
          onLoginSuccess={() => setPage(4)}
          onBrowseAsGuest={() => {
            setIsGuest(true);
            setPage(4);
          }}
        />
      );
    }

    if (page === 20) {
      return <Page21 onNavigate={goTo} />;
    }

    return null;
  }

  if (page === 4) {
    return (
      <div style={{ background: BG, minHeight: "100vh" }}>
        <SubscriptionPricing onClose={() => goTo(5)} />
      </div>
    );
  }

  if (page >= 5 && page <= 10) {
    const categoryIndex = page - 5;
    const category = toolCategories[categoryIndex];
    const tools = AI_TOOLS[category as keyof typeof AI_TOOLS] || [];

    return (
      <div style={{ background: BG, minHeight: "100vh", padding: 20, color: TEXT }}>
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ color: GOLD }}>☰ MANDA STRONG</h1>
          <div style={{ color: TEXT }}>STUDIO</div>
          <div style={{ color: DIM, fontSize: "0.9rem" }}>
            ✦ CINEMA INTELLIGENCE PLATFORM · 600+ AI TOOLS · 8K EXPORT · UP TO 3-HOUR FILMS · PROFESSIONAL CINEMA SYNTHESIS
          </div>
          <div style={{ color: "lime", marginTop: 5 }}>● SYSTEM ONLINE</div>
        </div>

        <h2 style={{ color: GOLD }}>AI WORKSTATION {String(categoryIndex + 1).padStart(2, '0')} — {category.toUpperCase()}</h2>
        <div style={{ color: TEXT, marginBottom: 10 }}>{category.toUpperCase()} TOOLS</div>

        <input
          placeholder={`Search ${tools.length} tools...`}
          style={{
            width: "100%",
            padding: 10,
            marginTop: 10,
            background: "#000",
            border: `1px solid ${GOLD}`,
            color: TEXT
          }}
        />

        <div style={{ color: DIM, marginTop: 5 }}>🔍 {tools.length} TOOLS</div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 10,
            marginTop: 10,
            maxHeight: "50vh",
            overflowY: "auto"
          }}
        >
          {tools.map((tool, i) => (
            <div
              key={i}
              style={{
                background: "#111",
                border: `1px solid ${GOLD}`,
                padding: 12,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                minHeight: 50
              }}
            >
              {tool}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 30, color: DIM }}>
          MANDASTRONG STUDIO 2026 · PROFESSIONAL CINEMA SYNTHESIS · MandaStrong1.Etsy.com
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
          <span onClick={() => goTo(page > 5 ? page - 1 : 4)} style={{ cursor: "pointer" }}>◀ BACK</span>
          <span>PAGE {page} / 23</span>
          <span onClick={() => goTo(page < 10 ? page + 1 : 11)} style={{ cursor: "pointer" }}>NEXT ▶</span>
        </div>

        <div style={{ color: "lime", marginTop: 5 }}>● AUTOSAVE ON</div>

        <input
          ref={fileInputRef}
          type="file"
          accept="video/*,audio/*,image/*"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </div>
    );
  }

  if (page === 11) {
    return (
      <div style={{ background: BG, minHeight: "100vh", padding: 20, color: TEXT }}>
        <h1 style={{ color: GOLD, marginBottom: 20 }}>UPLOAD MEDIA</h1>
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{ background: GOLD, color: BG, padding: "12px 24px", border: "none", cursor: "pointer" }}
          >
            ⬆ UPLOAD FILES
          </button>
          <button
            onClick={() => setShowPasteImporter(true)}
            style={{ background: "transparent", border: `1px solid ${GOLD}`, color: TEXT, padding: "12px 24px", cursor: "pointer" }}
          >
            PASTE URL/TEXT
          </button>
        </div>
        {showPasteImporter && (
          <PasteImporter
            onImport={(content) => {
              console.log('Imported:', content);
              setShowPasteImporter(false);
            }}
            onClose={() => setShowPasteImporter(false)}
          />
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*,audio/*,image/*"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
        <div style={{ marginTop: 30 }}>
          <button onClick={() => goTo(10)} style={{ background: "transparent", border: `1px solid ${GOLD}`, color: TEXT, padding: "10px 20px", cursor: "pointer" }}>
            ◀ BACK TO TOOLS
          </button>
        </div>
        <div style={{ position: "fixed", bottom: 20, left: 20, color: DIM }}>
          PAGE 11 / 23
        </div>
      </div>
    );
  }

  if (page >= 12 && page <= 16) {
    return <LiveVideoEditor onClose={() => goTo(11)} />;
  }

  if (page === 17) {
    return <FullScreenViewer />;
  }

  if (page === 18) {
    return <ThankYouMissionPage onBackToHome={() => goTo(0)} />;
  }

  if (page === 19) {
    return <AgentGrokHelpDesk onBack={() => goTo(18)} onNext={() => goTo(20)} />;
  }

  if (page === 20) {
    return <EnhancedCommunityHub user={user} onBack={() => goTo(19)} onNext={() => goTo(21)} />;
  }

  if (page === 21) {
    return <Page21 onNavigate={goTo} />;
  }

  return (
    <div style={{ background: BG, minHeight: "100vh", color: TEXT, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: GOLD, fontSize: "3rem", marginBottom: 20 }}>PAGE {page}</h1>
        <button onClick={() => setPage(0)} style={{ background: GOLD, color: BG, padding: "12px 30px", border: "none", cursor: "pointer" }}>
          GO HOME
        </button>
      </div>
    </div>
  );
}
