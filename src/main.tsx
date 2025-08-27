import 'modern-normalize/modern-normalize.css';
import 'nes.css/css/nes.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App/App.tsx';
import '@/global.css';
import SfxProvider from '@/contexts/SfxProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SfxProvider>
      <App />
    </SfxProvider>
  </StrictMode>,
);
