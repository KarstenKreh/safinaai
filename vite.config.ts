import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';

const isProd = process.env.NODE_ENV === 'production';
const CDN_URL = 'https://cdn.safinaai.com'; // Replace with your CDN domain

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagetools({
      defaultDirectives: new URLSearchParams({
        format: 'webp',
        quality: '80',
        progressive: '',
      }),
    }),
  ],
  base: isProd ? CDN_URL : '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@lottiefiles')) {
              return 'lottie';
            }
            return 'vendor';
          }
        }
      }
    },
    cssCodeSplit: true,
    modulePreload: {
      polyfill: true
    }
  },
});