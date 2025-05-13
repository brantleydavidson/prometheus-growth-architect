
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
// Fix the import for react-helmet-async
import pkg from 'react-helmet-async';
const { HelmetProvider } = pkg;

export async function render(url: string) {
  // Create a proper context object for Helmet
  const helmetContext = {};
  
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    </StaticRouter>
  );
  
  // Get the helmet data after rendering
  const { helmet } = helmetContext as any;
  
  return {
    html,
    helmet
  };
}
