import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Store dismissal in localStorage to not show again for 7 days
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // Check if user dismissed recently
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - dismissedTime < sevenDays) {
        setShowPrompt(false);
      }
    }
  }, []);

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4">
      <div className="bg-zinc-950 border-2 border-[#7c3aed] rounded-2xl p-6 shadow-2xl">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        <div className="flex items-start gap-4">
          <div className="bg-[#7c3aed] p-3 rounded-xl">
            <Download size={24} className="text-white" />
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-black text-white uppercase mb-2">
              Install MandaStrong Studio
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              Install our app for quick access, offline support, and the best experience!
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleInstallClick}
                className="bg-[#7c3aed] text-white px-6 py-2 rounded-full font-bold uppercase text-sm hover:bg-[#6d28d9] transition"
              >
                Install App
              </button>
              <button
                onClick={handleDismiss}
                className="bg-transparent border border-[#7c3aed] text-[#7c3aed] px-6 py-2 rounded-full font-bold uppercase text-sm hover:bg-[#7c3aed] hover:text-white transition"
              >
                Not Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
