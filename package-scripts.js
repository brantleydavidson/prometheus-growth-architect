
// ES module for updating package.json scripts
import fs from 'fs';

// Read the current package.json
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

// Add or update the scripts for SSG
packageJson.scripts = {
  ...packageJson.scripts,
  "build": "npm run build:client && npm run build:server && npm run prerender",
  "build:client": "vite build --outDir dist/client",
  "build:server": "vite build --ssr src/entry-server.tsx --outDir dist/server",
  "prerender": "node prerender.js",
  "preview": "vite preview --outDir dist/client"
};

// Write the updated package.json
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
console.log('Successfully updated package.json scripts for SSG');
