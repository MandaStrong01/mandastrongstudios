import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { EnhancedLoginRegister } from './components/EnhancedLoginRegister';
import LiveVideoEditor from './components/LiveVideoEditor';
import { EnhancedCommunityHub } from './components/EnhancedCommunityHub';
import ToolBoardPage from './components/ToolBoardPage';
import SubscriptionPricing from './components/SubscriptionPricing';
import SubscriptionDashboard from './components/SubscriptionDashboard';
import { ThankYouMissionPage } from './components/ThankYouMissionPage';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import Footer from './components/Footer';
import QuickAccess from './components/QuickAccess';
import { Film, Users, LayoutGrid, CreditCard, Loader2, LogOut } from 'lucide-react';

type Page = 'login' | 'home' | 'editor' | 'community' | 'toolboard' | 'pricing' | 'dashboard' | 'thankyou';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    checkUser();
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await loadUserSubscription(session.user.id);
          if (currentPage === 'login') {
            setCurrentPage('home');
          }
        } else {
          setSubscription(null);
          setCurrentPage('login');
        }
      })();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
    if (session?.user) {
      await loadUserSubscription(session.user.id);
      setCurrentPage('home');
    }
    setIsLoading(false);
  }

  async function loadUserSubscription(userId: string) {
    const { data } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    setSubscription(data);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setCurrentPage('login');
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-yellow-400 animate-spin" />
      </div>
    );
  }

  if (currentPage === 'login') {
    return (
      <EnhancedLoginRegister
        onBack={() => {}}
        onLoginSuccess={() => setCurrentPage('home')}
        onBrowseAsGuest={() => setCurrentPage('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <PWAInstallPrompt />

      <nav className="bg-black/50 backdrop-blur-md border-b border-yellow-400/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Film className="w-8 h-8 text-yellow-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  MandaStrong Studio
                </span>
              </div>

              <div className="hidden md:flex space-x-4">
                <button
                  onClick={() => setCurrentPage('home')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    currentPage === 'home'
                      ? 'bg-yellow-400 text-black'
                      : 'text-gray-300 hover:text-yellow-400 hover:bg-white/5'
                  }`}
                >
                  <Film className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentPage('community')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    currentPage === 'community'
                      ? 'bg-yellow-400 text-black'
                      : 'text-gray-300 hover:text-yellow-400 hover:bg-white/5'
                  }`}
                >
                  <Users className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentPage('toolboard')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    currentPage === 'toolboard'
                      ? 'bg-yellow-400 text-black'
                      : 'text-gray-300 hover:text-yellow-400 hover:bg-white/5'
                  }`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentPage('pricing')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    currentPage === 'pricing'
                      ? 'bg-yellow-400 text-black'
                      : 'text-gray-300 hover:text-yellow-400 hover:bg-white/5'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {user && (
                <>
                  <div className="hidden sm:block text-sm text-gray-400">
                    {user.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="pb-20">
        {currentPage === 'home' && (
          <LiveVideoEditor onClose={() => setCurrentPage('home')} />
        )}
        {currentPage === 'editor' && (
          <LiveVideoEditor onClose={() => setCurrentPage('home')} />
        )}
        {currentPage === 'community' && (
          <EnhancedCommunityHub
            user={user}
            onBack={() => setCurrentPage('home')}
            onNext={() => setCurrentPage('toolboard')}
          />
        )}
        {currentPage === 'toolboard' && (
          <ToolBoardPage />
        )}
        {currentPage === 'pricing' && (
          <SubscriptionPricing
            onClose={() => setCurrentPage('home')}
          />
        )}
        {currentPage === 'dashboard' && (
          <SubscriptionDashboard />
        )}
        {currentPage === 'thankyou' && (
          <ThankYouMissionPage
            onBackToHome={() => setCurrentPage('home')}
          />
        )}
      </main>

      <QuickAccess onNavigate={setCurrentPage} currentPage={currentPage} />
      <Footer />
    </div>
  );
}
