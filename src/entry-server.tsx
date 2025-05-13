
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { HelmetData, HelmetProvider } from 'react-helmet-async';

export async function render(url: string) {
  // Create a proper context object for Helmet
  const helmetContext: { helmet?: HelmetData } = {};
  
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    </StaticRouter>
  );
  
  // Get the helmet data after rendering
  const helmet = helmetContext.helmet;
  
  return {
    html,
    helmet
  };
}
