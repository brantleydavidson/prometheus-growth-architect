
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
// Import react-helmet-async properly for SSR
import pkg from 'react-helmet-async';
// Destructure the package to get the HelmetProvider component
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
