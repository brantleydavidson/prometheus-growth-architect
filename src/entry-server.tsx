
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import ReactHelmetAsync from 'react-helmet-async';
const { HelmetProvider, HelmetServerState } = ReactHelmetAsync;

export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {};
  
  // Render our React app to string
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  // Get the helmet data for SEO
  const { helmet } = helmetContext;

  return { html, helmet };
}
