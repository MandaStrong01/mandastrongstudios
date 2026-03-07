import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { EnhancedLoginRegister } from './components/EnhancedLoginRegister';
import LiveVideoEditor from './components/LiveVideoEditor';
import ToolBoardPage from './components/ToolBoardPage';
import { EnhancedCommunityHub } from './components/EnhancedCommunityHub';
import { AgentGrokHelpDesk } from './components/AgentGrokHelpDesk';
import Page21 from './components/Page21';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import LoadingSpinner from './components/LoadingSpinner';
import { Home, Film, Wand2, Users, HelpCircle, Heart } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleNavigate = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleGuestMode = () => {
    setIsGuest(true);
    setCurrentPage(2);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsGuest(false);
    setCurrentPage(1);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  // Page 1: Welcome/Login
  if (currentPage === 1 && !user && !isGuest) {
    return (
      <>
        <PWAInstallPrompt />
        <EnhancedLoginRegister
          onBack={() => {}}
          onLoginSuccess={() => setCurrentPage(2)}
          onBrowseAsGuest={handleGuestMode}
        />
      </>
    );
  }

  // Navigation Bar
  const NavigationBar = () => (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-b border-purple-500/30">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="w-6 h-6 text-purple-400" />
            <h1 className="text-lg font-bold text-white">MandaStrong Studio</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNavigate(2)}
              className="p-2 rounded-lg hover:bg-purple-500/20 transition-colors"
              title="Home"
            >
              <Home className="w-5 h-5 text-purple-400" />
            </button>
            <button
              onClick={() => handleNavigate(4)}
              className="p-2 rounded-lg hover:bg-purple-500/20 transition-colors"
              title="AI Tools"
            >
              <Wand2 className="w-5 h-5 text-purple-400" />
            </button>
            <button
              onClick={() => handleNavigate(12)}
              className="p-2 rounded-lg hover:bg-purple-500/20 transition-colors"
              title="Editor"
            >
              <Film className="w-5 h-5 text-purple-400" />
            </button>
            <button
              onClick={() => handleNavigate(20)}
              className="p-2 rounded-lg hover:bg-purple-500/20 transition-colors"
              title="Community"
            >
              <Users className="w-5 h-5 text-purple-400" />
            </button>
            <button
              onClick={() => handleNavigate(19)}
              className="p-2 rounded-lg hover:bg-purple-500/20 transition-colors"
              title="Help"
            >
              <HelpCircle className="w-5 h-5 text-purple-400" />
            </button>
            <button
              onClick={() => handleNavigate(21)}
              className="p-2 rounded-lg hover:bg-purple-500/20 transition-colors"
              title="Mission"
            >
              <Heart className="w-5 h-5 text-purple-400" />
            </button>
            {(user || isGuest) && (
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 bg-red-600/80 hover:bg-red-600 rounded-lg text-white text-sm transition-colors"
              >
                {isGuest ? 'Exit Guest' : 'Logout'}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );

  // Page routing
  return (
    <>
      <PWAInstallPrompt />
      <NavigationBar />
      <div className="pt-16">
        {currentPage === 2 && (
          <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-black to-purple-900/20 text-white p-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-5xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Welcome to MandaStrong Studio
              </h1>
              <p className="text-xl text-center mb-12 text-white/80">
                Your professional video editing platform with 720+ AI creative tools
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <button
                  onClick={() => handleNavigate(4)}
                  className="p-8 bg-black/30 backdrop-blur-sm rounded-2xl border border-purple-500/30 hover:border-purple-500 transition-all hover:scale-105"
                >
                  <Wand2 className="w-12 h-12 text-purple-400 mb-4 mx-auto" />
                  <h2 className="text-2xl font-bold mb-2">720+ AI Tools</h2>
                  <p className="text-white/70">Explore creative AI tools</p>
                </button>
                <button
                  onClick={() => handleNavigate(12)}
                  className="p-8 bg-black/30 backdrop-blur-sm rounded-2xl border border-purple-500/30 hover:border-purple-500 transition-all hover:scale-105"
                >
                  <Film className="w-12 h-12 text-purple-400 mb-4 mx-auto" />
                  <h2 className="text-2xl font-bold mb-2">Video Editor</h2>
                  <p className="text-white/70">Professional editing suite</p>
                </button>
                <button
                  onClick={() => handleNavigate(20)}
                  className="p-8 bg-black/30 backdrop-blur-sm rounded-2xl border border-purple-500/30 hover:border-purple-500 transition-all hover:scale-105"
                >
                  <Users className="w-12 h-12 text-purple-400 mb-4 mx-auto" />
                  <h2 className="text-2xl font-bold mb-2">Community Hub</h2>
                  <p className="text-white/70">Share and discover content</p>
                </button>
              </div>
            </div>
          </div>
        )}
        {currentPage >= 4 && currentPage <= 9 && (
          <ToolBoardPage
            page={currentPage}
            toolCategories={['Video', 'Audio', 'Graphics', 'AI Tools', 'Effects', 'Templates']}
            AI_TOOLS={{
              'Video': Array(120).fill('Tool'),
              'Audio': Array(120).fill('Tool'),
              'Graphics': Array(120).fill('Tool'),
              'AI Tools': Array(120).fill('Tool'),
              'Effects': Array(120).fill('Tool'),
              'Templates': Array(120).fill('Tool'),
            }}
            toolSearch=""
            setToolSearch={() => {}}
            goTo={handleNavigate}
            fileInputRef={{ current: null }}
            handleAIGenerate={() => {}}
            handleUrlImport={() => {}}
            generating={false}
            aiPrompt=""
            setAiPrompt={() => {}}
            importUrl=""
            setImportUrl={() => {}}
          />
        )}
        {currentPage >= 10 && currentPage <= 17 && (
          <LiveVideoEditor />
        )}
        {currentPage === 19 && (
          <AgentGrokHelpDesk
            onBack={() => handleNavigate(2)}
            onNext={() => handleNavigate(20)}
          />
        )}
        {currentPage === 20 && (
          <EnhancedCommunityHub
            user={user}
            onBack={() => handleNavigate(2)}
            onNext={() => handleNavigate(21)}
          />
        )}
        {currentPage === 21 && <Page21 onNavigate={handleNavigate} />}
      </div>
    </>
  );
}
