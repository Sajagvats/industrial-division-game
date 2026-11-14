import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Dynamically resolve canonical and OpenGraph URLs for whichever domain hosts the app
const currentUrl = window.location.origin + window.location.pathname;
let canonicalEl = document.querySelector('link[rel="canonical"]');
if (!canonicalEl) {
  canonicalEl = document.createElement('link');
  canonicalEl.setAttribute('rel', 'canonical');
  document.head.appendChild(canonicalEl);
}
canonicalEl.setAttribute('href', currentUrl);

let ogUrlEl = document.querySelector('meta[property="og:url"]');
if (!ogUrlEl) {
  ogUrlEl = document.createElement('meta');
  ogUrlEl.setAttribute('property', 'og:url');
  document.head.appendChild(ogUrlEl);
}
ogUrlEl.setAttribute('content', currentUrl);

// Register PWA service worker for immediate offline readiness and install prompt
registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(<App />);
