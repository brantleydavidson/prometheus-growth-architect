
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
// Import react-helmet-async with named imports
import { HelmetProvider } from 'react-helmet-async';

export function render(url: string) {
  // Define the helmet context as a generic object
  const helmetContext = {};
  
  // Render our React app to string
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  // Get the helmet data for SEO
  // TypeScript will accept this because we're accessing a property that gets added by HelmetProvider
  const helmet = (helmetContext as any).helmet;

  return { html, helmet };
}
