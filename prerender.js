
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/client/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

// Helper function to ensure directory exists
const ensureDirectoryExists = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExists(dirname);
  fs.mkdirSync(dirname);
}

// Extract all routes from App.tsx
const appContent = fs.readFileSync(toAbsolute('src/App.tsx'), 'utf-8');

// Regular expression to find routes in App.tsx
const routeRegex = /<Route\s+path=["'](.*?)["']/g;
let routesToPrerender = [];
let match;

while ((match = routeRegex.exec(appContent)) !== null) {
  const route = match[1];
  routesToPrerender.push(route);
}

// Add the root route if it's not already included
if (!routesToPrerender.includes('/')) {
  routesToPrerender.push('/');
}

// Log the discovered routes
console.log('Found routes to prerender:', routesToPrerender);

;(async () => {
  for (const url of routesToPrerender) {
    const appHtml = await render(url);
    const html = template.replace('<!--app-html-->', appHtml)

    // Determine the output file path, handling the root route as index.html
    const outputPath = url === '/' 
      ? 'dist/client/index.html'
      : `dist/client${url}${url.endsWith('/') ? 'index' : ''}.html`;

    // Ensure the directory exists
    ensureDirectoryExists(toAbsolute(outputPath));
    
    // Write the file
    fs.writeFileSync(toAbsolute(outputPath), html);
    console.log('pre-rendered:', outputPath);
  }
})()
