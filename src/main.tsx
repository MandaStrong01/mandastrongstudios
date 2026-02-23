import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
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
        console.log('MandaStrong Studio PWA: Service Worker registration failed', error);
      }
    );
  });
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);