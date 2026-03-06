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
              <h1 className="text-4xl md:text-6xl font-black mb-4 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                MandaStrong Studio
              </h1>
              <p className="text-xl md:text-2xl mb-12 text-gray-300 text-center max-w-2xl">
                Professional Video Creation & Editing Platform
              </p>

              {!isAuthenticated ? (
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setCurrentPage('login')}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-4 rounded-xl text-lg font-bold transition shadow-lg"
                  >
                    Get Started
                  </button>
                  <button
                    onClick={() => setCurrentPage('movies')}
                    className="bg-slate-700 hover:bg-slate-600 px-8 py-4 rounded-xl text-lg font-bold transition"
                  >
                    Browse Movies
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setCurrentPage('editor')}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-8 py-4 rounded-xl text-lg font-bold transition shadow-lg"
                  >
                    Open Video Editor
                  </button>
                  <button
                    onClick={() => setCurrentPage('recorder')}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-4 rounded-xl text-lg font-bold transition shadow-lg"
                  >
                    Screen Recorder
                  </button>
                  <button
                    onClick={() => setCurrentPage('movies')}
                    className="bg-slate-700 hover:bg-slate-600 px-8 py-4 rounded-xl text-lg font-bold transition"
                  >
                    Watch Movies
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-slate-800 hover:bg-slate-700 px-8 py-4 rounded-xl text-lg font-bold transition border border-slate-600"
                  >
                    Logout ({userEmail})
                  </button>
                </div>
              )}
            </div>
            <PWAInstallPrompt />
          </div>
        );
    }
  };

  return renderPage();
}

export default App;
