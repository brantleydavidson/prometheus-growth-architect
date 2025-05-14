
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
// Import react-helmet-async for client-side using named exports
import * as ReactHelmetAsync from 'react-helmet-async';
const { HelmetProvider } = ReactHelmetAsync;

const root = document.getElementById("root")!;
const app = (
  <BrowserRouter>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </BrowserRouter>
);

// Use hydration for SSR in production
if (import.meta.env.PROD) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
