import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { EnhancedLoginRegister } from './components/EnhancedLoginRegister';
import LiveVideoEditor from './components/LiveVideoEditor';
import FullscreenMovieViewer from './components/FullscreenMovieViewer';
import VideoRecorder from './components/VideoRecorder';
import LoadingSpinner from './components/LoadingSpinner';
import PWAInstallPrompt from './components/PWAInstallPrompt';

type Page = 'home' | 'login' | 'editor' | 'movies' | 'recorder';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Loading MandaStrong Studio...');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setIsLoading(true);
    setLoadingMessage('Checking authentication...');

    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
    setUserEmail(session?.user?.email || null);

    if (session?.user?.id) {
      setLoadingMessage('Loading profile...');
      const { data: profile } = await supabase
        .from('profiles')
        .select('subscription_plan')
        .eq('id', session.user.id)
        .maybeSingle();

      setIsAdmin(profile?.subscription_plan === 'studio');
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setIsAuthenticated(!!session);
        setUserEmail(session?.user?.email || null);

        if (session?.user?.id) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('subscription_plan')
            .eq('id', session.user.id)
            .maybeSingle();

          setIsAdmin(profile?.subscription_plan === 'studio');
        } else {
          setIsAdmin(false);
        }
      }
    );

    setIsLoading(false);

    return () => subscription.unsubscribe();
  };

  const handleLogout = async () => {
    setLoadingMessage('Logging out...');
    setIsLoading(true);
    await supabase.auth.signOut();
    setCurrentPage('home');
    setIsLoading(false);
  };

  const handleLoginSuccess = async () => {
    setLoadingMessage('Welcome! Loading your studio...');
    setIsLoading(true);
    await checkAuth();
    setCurrentPage('editor');
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingSpinner size="xl" message={loadingMessage} fullscreen />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return (
          <EnhancedLoginRegister
            onBack={() => setCurrentPage('home')}
            onLoginSuccess={handleLoginSuccess}
            onBrowseAsGuest={() => setCurrentPage('movies')}
          />
        );

      case 'editor':
        if (!isAuthenticated) {
          return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 flex items-center justify-center">
              <div className="text-center">
                <p className="text-white text-2xl mb-6">Please login to access the studio</p>
                <button
                  onClick={() => setCurrentPage('login')}
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-white font-bold transition"
                >
                  Go to Login
                </button>
              </div>
            </div>
          );
        }
        return <LiveVideoEditor />;

      case 'recorder':
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 p-8">
            <div className="max-w-6xl mx-auto">
              <button
                onClick={() => setCurrentPage(isAuthenticated ? 'editor' : 'home')}
                className="mb-6 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition"
              >
                Back to {isAuthenticated ? 'Studio' : 'Home'}
              </button>
              <VideoRecorder />
            </div>
          </div>
        );

      case 'movies':
        return (
          <FullscreenMovieViewer
            onClose={() => setCurrentPage('home')}
            isAdmin={isAdmin}
            userEmail={userEmail || undefined}
          />
        );

      default:
        return (
          <div className="min-h-screen bg-black text-white relative overflow-hidden">
            <video
              className="absolute inset-0 w-full h-full object-cover opacity-40"
              src="/background.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
              <div className="text-center mb-8">
                <div className="text-xs tracking-[0.3em] text-gray-400 mb-6">
                  CINEMA INTELLIGENCE PLATFORM — EST. 2026
                </div>
                <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
                  <span className="block text-white">MANDA</span>
                  <span className="block text-white">STRONG</span>
                  <span className="block bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    STUDIO
                  </span>
                </h1>
                <div className="text-sm tracking-[0.2em] text-gray-300 mb-8">
                  600+ AI TOOLS • 8K EXPORT • UP TO 3-HOUR FILMS
                </div>
                <p className="text-2xl md:text-3xl font-light text-gray-200 mb-12">
                  The All-In-One Professional AI Movie Creation Platform
                </p>
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/50 rounded-lg px-6 py-3 inline-block mb-8">
                  <span className="text-orange-400">🎬 Special Offer:</span>
                  <span className="text-white ml-2">New Studio Plan Subscribers Receive 3 Hours Free Trial</span>
                </div>
              </div>

              {!isAuthenticated ? (
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setCurrentPage('login')}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-12 py-4 rounded-lg text-lg font-bold transition shadow-2xl uppercase tracking-wider"
                  >
                    Start Creating
                  </button>
                  <button
                    onClick={() => setCurrentPage('login')}
                    className="bg-white/10 hover:bg-white/20 border border-white/30 px-12 py-4 rounded-lg text-lg font-bold transition uppercase tracking-wider backdrop-blur-sm"
                  >
                    Login / Register
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setCurrentPage('editor')}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-12 py-4 rounded-lg text-lg font-bold transition shadow-2xl uppercase tracking-wider"
                  >
                    Open Video Editor
                  </button>
                  <button
                    onClick={() => setCurrentPage('recorder')}
                    className="bg-white/10 hover:bg-white/20 border border-white/30 px-12 py-4 rounded-lg text-lg font-bold transition uppercase tracking-wider backdrop-blur-sm"
                  >
                    Screen Recorder
                  </button>
                  <button
                    onClick={() => setCurrentPage('movies')}
                    className="bg-white/10 hover:bg-white/20 border border-white/30 px-12 py-4 rounded-lg text-lg font-bold transition uppercase tracking-wider backdrop-blur-sm"
                  >
                    Watch Movies
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-slate-800/50 hover:bg-slate-700/50 px-12 py-4 rounded-lg text-sm font-medium transition border border-slate-600"
                  >
                    Logout ({userEmail})
                  </button>
                </div>
              )}

              <div className="absolute bottom-8 left-8 flex items-center gap-3 text-xs text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="uppercase tracking-wider">System Online</span>
              </div>
              <div className="absolute bottom-8 right-8 text-xs text-gray-400 uppercase tracking-wider">
                Build 2026.03.05
              </div>
            </div>
            <PWAInstallPrompt />
          </div>
        );
    }
  };

  return renderPage();
}

export default App;
