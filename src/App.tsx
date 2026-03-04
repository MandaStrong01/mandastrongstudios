import React, { useState, useEffect } from 'react';
import { Film, Video, Users, Settings, LogIn, UserPlus, Home } from 'lucide-react';
import { EnhancedLoginRegister } from './components/EnhancedLoginRegister';
import LiveVideoEditor from './components/LiveVideoEditor';
import { EnhancedCommunityHub } from './components/EnhancedCommunityHub';
import FullscreenMovieViewer from './components/FullscreenMovieViewer';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import Footer from './components/Footer';
import { supabase } from './lib/supabase';

type Page = 'home' | 'login' | 'editor' | 'community' | 'movies';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setUserEmail(session?.user?.email || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setUserEmail(session?.user?.email || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <EnhancedLoginRegister onSuccess={() => setCurrentPage('editor')} />;
      case 'editor':
        return isAuthenticated ? <LiveVideoEditor /> : <EnhancedLoginRegister onSuccess={() => setCurrentPage('editor')} />;
      case 'community':
        return <EnhancedCommunityHub />;
      case 'movies':
        return <FullscreenMovieViewer />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
            <video
              className="absolute inset-0 w-full h-full object-cover opacity-30"
              src="/background.mp4"
              autoPlay
              loop
              muted
              playsInline
            />

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
              <div className="text-center mb-12">
                <h1 className="text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  MANDASTRONG
                </h1>
                <p className="text-2xl text-blue-200 mb-8">
                  Professional Video Studio
                </p>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-12">
                  Create, edit, and share your movies with our powerful online studio.
                  Up to 180 minutes of video editing power at your fingertips.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full mb-12">
                <button
                  onClick={() => setCurrentPage('editor')}
                  className="group bg-blue-600/20 backdrop-blur-sm border-2 border-blue-500 rounded-xl p-8 hover:bg-blue-600/30 transition-all hover:scale-105"
                >
                  <Video className="w-12 h-12 mb-4 text-blue-400 group-hover:text-blue-300" />
                  <h3 className="text-2xl font-bold mb-2">Video Editor</h3>
                  <p className="text-slate-300">Professional editing tools</p>
                </button>

                <button
                  onClick={() => setCurrentPage('movies')}
                  className="group bg-purple-600/20 backdrop-blur-sm border-2 border-purple-500 rounded-xl p-8 hover:bg-purple-600/30 transition-all hover:scale-105"
                >
                  <Film className="w-12 h-12 mb-4 text-purple-400 group-hover:text-purple-300" />
                  <h3 className="text-2xl font-bold mb-2">Watch Movies</h3>
                  <p className="text-slate-300">Browse featured content</p>
                </button>

                <button
                  onClick={() => setCurrentPage('community')}
                  className="group bg-green-600/20 backdrop-blur-sm border-2 border-green-500 rounded-xl p-8 hover:bg-green-600/30 transition-all hover:scale-105"
                >
                  <Users className="w-12 h-12 mb-4 text-green-400 group-hover:text-green-300" />
                  <h3 className="text-2xl font-bold mb-2">Community</h3>
                  <p className="text-slate-300">Connect with creators</p>
                </button>

                {!isAuthenticated ? (
                  <button
                    onClick={() => setCurrentPage('login')}
                    className="group bg-orange-600/20 backdrop-blur-sm border-2 border-orange-500 rounded-xl p-8 hover:bg-orange-600/30 transition-all hover:scale-105"
                  >
                    <LogIn className="w-12 h-12 mb-4 text-orange-400 group-hover:text-orange-300" />
                    <h3 className="text-2xl font-bold mb-2">Sign In</h3>
                    <p className="text-slate-300">Access your account</p>
                  </button>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="group bg-red-600/20 backdrop-blur-sm border-2 border-red-500 rounded-xl p-8 hover:bg-red-600/30 transition-all hover:scale-105"
                  >
                    <Settings className="w-12 h-12 mb-4 text-red-400 group-hover:text-red-300" />
                    <h3 className="text-2xl font-bold mb-2">Sign Out</h3>
                    <p className="text-slate-300">{userEmail}</p>
                  </button>
                )}
              </div>

              <div className="bg-blue-600/20 backdrop-blur-sm border border-blue-500 rounded-lg p-6 max-w-2xl">
                <p className="text-lg font-semibold text-blue-300 mb-2">
                  Special Offer for New Users
                </p>
                <p className="text-slate-300">
                  First-time registration includes 3 hours of complimentary studio time!
                </p>
              </div>
            </div>

            <PWAInstallPrompt />
            <Footer />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {currentPage !== 'home' && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-sm border-b border-slate-700">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-semibold">MANDASTRONG</span>
            </button>
            <div className="flex gap-4">
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </nav>
      )}
      <div className={currentPage !== 'home' ? 'pt-16' : ''}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;