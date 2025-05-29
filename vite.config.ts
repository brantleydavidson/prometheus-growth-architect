import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import type { OutputOptions, OutputAsset, OutputChunk, PreRenderedAsset, PreRenderedChunk } from 'rollup';

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const isSSR = process.env.BUILD_TYPE === 'ssr';
  const mode = env.mode;

  // Build rollupOptions config conditionally
  const rollupOptions = isSSR
    ? {
        output: {
          chunkFileNames: (chunkInfo: PreRenderedChunk) => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
            return `assets/js/${facadeModuleId}-[hash].js`;
          },
          assetFileNames: (assetInfo: PreRenderedAsset) => {
            if (!assetInfo.name) return `assets/[name]-[hash][extname]`;
            const info = assetInfo.name.split('.');
            const extType = info[info.length - 1];
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (extType === 'css') {
              return `assets/css/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
        },
      }
    : {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-slot'],
            'supabase': ['@supabase/supabase-js'],
            'utils': ['clsx', 'tailwind-merge', 'class-variance-authority'],
          },
          chunkFileNames: (chunkInfo: PreRenderedChunk) => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
            return `assets/js/${facadeModuleId}-[hash].js`;
          },
          assetFileNames: (assetInfo: PreRenderedAsset) => {
            if (!assetInfo.name) return `assets/[name]-[hash][extname]`;
            const info = assetInfo.name.split('.');
            const extType = info[info.length - 1];
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (extType === 'css') {
              return `assets/css/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
        },
      };

  return {
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
      // Optimize build
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions,
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 1000,
      // Optimize assets
      assetsInlineLimit: 4096, // 4kb - inline smaller assets
      // Enable CSS code splitting
      cssCodeSplit: true,
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      exclude: ['@supabase/supabase-js'],
    },
    // Ensure certain dependencies are bundled for SSR instead of being treated as external
    ssr: {
      noExternal: ['react-helmet-async'],
    },
  };
});
