import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist/client',
    // Support for SSR
    ssrManifest: true,
    sourcemap: true,
  },
  // Ensure certain dependencies are bundled for SSR instead of being treated as external
  ssr: {
    noExternal: ['react-helmet-async'],
  },
}));
