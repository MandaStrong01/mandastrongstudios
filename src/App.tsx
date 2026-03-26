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
import { Upload, Sparkles, Play, X } from 'lucide-react';
import { uploadFile } from './lib/storage';
import { useMediaAssets } from './hooks/useMediaAssets';
import { useSubscription } from './hooks/useSubscription';

const AI_TOOLS = {
  Writing: ['Script Writer', 'Dialogue Generator', 'Scene Description', 'Character Development', 'Plot Outliner', 'Screenplay Formatter', 'Storyboard Text', 'Narration Writer', 'Subtitle Creator', 'Caption Generator'],
  Voice: ['Voice Clone', 'Text-to-Speech', 'Voice Effects', 'Accent Generator', 'Multilingual TTS', 'Voice Mixing', 'Pitch Shifter', 'Audio Enhancer', 'Noise Reduction', 'Echo Effect'],
  Image: ['AI Image Generator', 'Style Transfer', 'Background Remover', 'Upscaler', 'Face Restoration', 'Color Grading', 'Image Enhancer', 'Object Removal', 'Inpainting', 'Outpainting'],
  Video: ['AI Video Generator', 'Video Upscaler', 'Frame Interpolation', 'Slow Motion', 'Stabilization', 'Background Blur', 'Green Screen', 'Face Swap', 'Lip Sync', 'Motion Tracking'],
  Motion: ['Motion Graphics', 'Particle Effects', 'Camera Animation', '3D Text', 'Logo Animation', 'Transitions', 'Visual Effects', 'Light Effects', 'Kinetic Typography', 'Abstract Visuals'],
  Enhancement: ['Quality Boost', 'Sharpening', 'Color Correction', 'Brightness/Contrast', 'HDR Effect', 'Cinematic Look', 'Film Grain', 'Vignette', 'Lens Flare', 'Glow Effect']
};

export default function App() {
  const [page, setPage] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [toolSearch, setToolSearch] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [importUrl, setImportUrl] = useState('');
  const [generating, setGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { addAsset, loading: assetsLoading } = useMediaAssets(user?.id);
  const { subscription, loading: subLoading } = useSubscription(user?.id);

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

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim() || !user) return;
    setGenerating(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      await addAsset({
        name: `AI Generated - ${aiPrompt.substring(0, 30)}`,
        type: 'video',
        file_path: `/ai-generated/${Date.now()}.mp4`,
        file_size: 5000000,
        ai_generated: true,
        ai_tool_name: 'AI Video Generator',
        ai_prompt: aiPrompt
      });

      setAiPrompt('');
      alert('AI generation started! Check your media library.');
    } catch (error) {
      console.error('AI generation error:', error);
      alert('Generation failed');
    } finally {
      setGenerating(false);
    }
  };

  const handleUrlImport = async () => {
    if (!importUrl.trim() || !user) return;

    try {
      await addAsset({
        name: `Imported from URL`,
        type: 'video',
        file_path: importUrl,
        file_size: 0
      });

      setImportUrl('');
      alert('URL imported successfully!');
    } catch (error) {
      console.error('Import error:', error);
      alert('Import failed');
    }
  };

  if (!isAuthenticated && !isGuest) {
    if (page === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-black to-purple-900/20 text-white flex flex-col items-center justify-center p-4">
          <PWAInstallPrompt />
          <div className="max-w-4xl w-full text-center">
            <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              MANDASTRONG STUDIO
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-purple-200">
              Professional Cinema Intelligence Platform
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => setPage(1)}
                className="bg-purple-600 hover:bg-purple-700 px-12 py-4 rounded-xl font-bold text-xl transition"
              >
                Get Started
              </button>
              <button
                onClick={() => setPage(20)}
                className="bg-black/50 hover:bg-black/70 border-2 border-purple-500 px-12 py-4 rounded-xl font-bold text-xl transition"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (page === 1) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-black to-purple-900/20 text-white flex flex-col items-center justify-center p-4">
          <div className="max-w-4xl w-full text-center mb-8">
            <h2 className="text-4xl md:text-6xl font-black mb-6">Our Story & Mission</h2>
            <p className="text-lg md:text-xl mb-6 text-purple-200 leading-relaxed">
              MandaStrong Studio is more than a filmmaking platform. It's part of a comprehensive educational initiative
              designed to bring awareness to bullying prevention, social skills development, and the cultivation of humanity in our communities.
            </p>
            <p className="text-lg md:text-xl mb-8 text-purple-200 leading-relaxed">
              All Etsy Store proceeds benefit Veterans Mental Health Services. 100% of proceeds go directly to supporting those who have sacrificed for our freedom.
            </p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setPage(0)} className="bg-black/50 border-2 border-purple-500 px-8 py-3 rounded-lg font-bold">
              Back
            </button>
            <button onClick={() => setPage(2)} className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-bold">
              Continue
            </button>
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
      <div className="min-h-screen bg-black text-white">
        <SubscriptionPricing onClose={() => goTo(5)} />
      </div>
    );
  }

  if (page >= 5 && page <= 10) {
    return (
      <div className="min-h-screen bg-black text-white">
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
    const [showPasteImporter, setShowPasteImporter] = useState(false);

    return (
      <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-4xl font-bold mb-8">Upload Media</h1>
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg font-bold"
          >
            <Upload className="inline mr-2" size={20} />
            Upload Files
          </button>
          <button
            onClick={() => setShowPasteImporter(true)}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-bold"
          >
            Paste URL/Text
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
        <div className="mt-8">
          <button onClick={() => goTo(4)} className="bg-black/50 border border-purple-500 px-6 py-3 rounded-lg">
            Back to Tools
          </button>
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
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Page {page}</h1>
        <button onClick={() => setPage(0)} className="bg-purple-600 px-8 py-4 rounded-lg font-bold">
          Go Home
        </button>
      </div>
    </div>
  );
}
