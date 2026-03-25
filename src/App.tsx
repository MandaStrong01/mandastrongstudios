import { useState, useEffect, useRef } from 'react';
import { supabase } from './lib/supabase';
import { EnhancedLoginRegister } from './components/EnhancedLoginRegister';
import LoadingSpinner from './components/LoadingSpinner';
import ToolBoardPage from './components/ToolBoardPage';
import { ThankYouMissionPage } from './components/ThankYouMissionPage';
import FullscreenMovieViewer from './components/FullscreenMovieViewer';
import LiveVideoEditor from './components/LiveVideoEditor';
import VideoRecorder from './components/VideoRecorder';
import TimelineEditor from './components/TimelineEditor';
import { EnhancedCommunityHub } from './components/EnhancedCommunityHub';
import { AgentGrokHelpDesk } from './components/AgentGrokHelpDesk';
import SubscriptionPricing from './components/SubscriptionPricing';
import DaVinciTimeline from './components/DaVinciTimeline';
import PasteImporter from './components/PasteImporter';
import { Camera, Film, Sparkles, Upload, LogOut, Menu, X } from 'lucide-react';

const AI_TOOLS: Record<string, string[]> = {
  Writing: ['Blog Generator', 'Story Writer', 'Script Format', 'Dialogue Polish', 'Character Dev', 'Plot Twist Gen', 'Scene Description', 'Narrative Voice', 'Poetry Composer', 'Essay Outline'],
  Voice: ['Text-to-Speech', 'Voice Clone', 'Accent Change', 'Pitch Adjust', 'Echo Removal', 'Noise Cancel', 'Audio Enhance', 'Dialogue Clean', 'Voice Morph', 'Speech Synthesis'],
  Image: ['AI Upscale', 'Background Remove', 'Style Transfer', 'Color Grade', 'Face Enhance', 'Object Remove', 'Image Restore', 'Art Generator', 'Photo Filter', 'Image Blend'],
  Video: ['Auto Edit', 'Clip Trim', 'Transition AI', 'Speed Ramp', 'Stabilize', 'Color Match', 'Scene Detect', 'Auto Subtitle', 'Video Upscale', 'Frame Blend'],
  Motion: ['Smooth Track', 'Object Track', 'Camera Shake', 'Motion Blur', 'Speed Change', '3D Motion', 'Parallax Gen', 'Motion Tile', 'Path Animate', 'Kinetic Type'],
  Enhancement: ['Auto Enhance', 'HDR Merge', 'Denoise Pro', 'Sharpen AI', 'Grain Add', 'Vignette', 'Lens Correct', 'Chromatic Fix', 'Bloom Effect', 'Glow Add']
};

export default function App() {
  const [page, setPage] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Loading MandaStrong Studio...');
  const [toolSearch, setToolSearch] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [importUrl, setImportUrl] = useState('');
  const [generating, setGenerating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toolCategories = Object.keys(AI_TOOLS);

  useEffect(() => {
    checkAuth();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  async function checkAuth() {
    setLoadingMessage('Checking authentication...');
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
    if (session?.user) {
      await loadProfile(session.user.id);
    }
    setLoading(false);
  }

  async function loadProfile(userId: string) {
    setLoadingMessage('Loading profile...');
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    setProfile(data);
  }

  async function handleLogout() {
    setLoadingMessage('Logging out...');
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setPage(0);
    setLoading(false);
  }

  function goTo(p: number) {
    setPage(p);
    setMenuOpen(false);
  }

  function handleAIGenerate() {
    if (!aiPrompt.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      alert(`AI Generation for: ${aiPrompt}`);
      setAiPrompt('');
    }, 2000);
  }

  function handleUrlImport() {
    if (!importUrl.trim()) return;
    alert(`Importing from: ${importUrl}`);
    setImportUrl('');
  }

  if (loading) {
    return <LoadingSpinner message={loadingMessage} fullscreen />;
  }

  if (page === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30">
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            MandaStrong Studio
          </h1>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl text-center">
            Professional AI-powered video creation platform with 720+ creative tools
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {user ? (
              <>
                <button onClick={() => goTo(4)} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:scale-105 transition-transform">
                  Enter Studio
                </button>
                <button onClick={handleLogout} className="px-8 py-4 bg-gray-800 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center gap-2">
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => goTo(3)} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:scale-105 transition-transform">
                  Login / Register
                </button>
                <button onClick={() => goTo(4)} className="px-8 py-4 bg-gray-800 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                  Browse as Guest
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (page === 3) {
    return <EnhancedLoginRegister onSuccess={() => goTo(4)} onBack={() => goTo(0)} />;
  }

  if (page >= 4 && page <= 9) {
    return (
      <ToolBoardPage
        page={page}
        toolCategories={toolCategories}
        AI_TOOLS={AI_TOOLS}
        toolSearch={toolSearch}
        setToolSearch={setToolSearch}
        goTo={goTo}
        fileInputRef={fileInputRef}
        handleAIGenerate={handleAIGenerate}
        handleUrlImport={handleUrlImport}
        generating={generating}
        aiPrompt={aiPrompt}
        setAiPrompt={setAiPrompt}
        importUrl={importUrl}
        setImportUrl={setImportUrl}
      />
    );
  }

  if (page === 10) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <button onClick={() => goTo(4)} className="mb-4 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700">← Back</button>
        <h1 className="text-4xl font-bold mb-6">Upload Media</h1>
        <PasteImporter />
      </div>
    );
  }

  if (page === 11) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <button onClick={() => goTo(4)} className="mb-4 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700">← Back</button>
        <h1 className="text-4xl font-bold mb-6">Media Library</h1>
        <LiveVideoEditor />
      </div>
    );
  }

  if (page >= 12 && page <= 16) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="p-4 bg-gray-800 flex justify-between items-center">
          <button onClick={() => goTo(4)} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">← Back</button>
          <h1 className="text-2xl font-bold">Timeline Editor</h1>
          <div className="w-24"></div>
        </div>
        <DaVinciTimeline />
      </div>
    );
  }

  if (page === 17) {
    return (
      <div className="min-h-screen bg-black">
        <FullscreenMovieViewer onBack={() => goTo(4)} />
      </div>
    );
  }

  if (page === 18) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <button onClick={() => goTo(4)} className="mb-4 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700">← Back</button>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-4">Last Updated: March 2026</p>
            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-300 mb-4">By accessing MandaStrong Studio, you agree to these terms.</p>
            <h2 className="text-2xl font-semibold mb-3">2. User Content</h2>
            <p className="text-gray-300 mb-4">You retain rights to your content. We may display user content in community features.</p>
            <h2 className="text-2xl font-semibold mb-3">3. Subscriptions</h2>
            <p className="text-gray-300 mb-4">Subscription plans provide access to premium features. Payments are processed securely.</p>
          </div>
        </div>
      </div>
    );
  }

  if (page === 19) {
    return <AgentGrokHelpDesk onBack={() => goTo(4)} />;
  }

  if (page === 20) {
    return <EnhancedCommunityHub user={user} profile={profile} onBack={() => goTo(4)} />;
  }

  if (page === 21) {
    return <ThankYouMissionPage onBack={() => goTo(4)} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-6">
        <button onClick={() => goTo(0)} className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700">← Home</button>
      </div>
    </div>
  );
}
