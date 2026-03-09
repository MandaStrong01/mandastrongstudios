import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Service Worker for PWA with storage partitioning support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Request persistent storage to avoid partitioning issues
    if ('storage' in navigator && 'persist' in navigator.storage) {
      navigator.storage.persist().then((persistent) => {
        console.log('MandaStrong Studio: Persistent storage:', persistent);
      });
    }

    navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none'
    }).then(
      (registration) => {
        console.log('MandaStrong Studio PWA: Service Worker registered', registration.scope);

        // Check for updates every time the app loads
        registration.update();

        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available, reload to get latest version
                console.log('MandaStrong Studio: New version available, reloading...');
                window.location.reload();
              }
            });
          }
        });
      },
      (error) => {
        console.warn('MandaStrong Studio PWA: Service Worker registration failed', error);
        // App will still work without service worker
      }
    );
  });
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);