
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { Helmet, HelmetData } from 'react-helmet-async';

export async function render(url: string) {
  // Create a fresh HelmetProvider context for each render
  const helmetContext = {};
  
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
  
  // Get the helmet data after rendering
  const helmet = helmetContext.helmet as HelmetData;
  
  return {
    html,
    helmet
  };
}
