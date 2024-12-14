import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagetools({
      defaultDirectives: new URLSearchParams({
        format: "webp",
        quality: "80",
        progressive: "",
      }),
    }),
    {
      name: "remove-schema-from-body",
      transformIndexHtml(html) {
        // Remove any schema scripts from the body
        return html.replace(
          /<script type="application\/ld\+json">[\s\S]*?<\/script>/g,
          (match, offset) => {
            // Keep only the schema in head
            if (html.slice(0, offset).includes("</head>")) {
              return "";
            }
            return match;
          }
        );
      },
    },
  ],
  base: "/",
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@lottiefiles")) {
              return "lottie";
            }
            if (id.includes("i18next") || id.includes("react-i18next")) {
              return "i18n";
            }
            if (id.includes("posthog")) {
              return "analytics";
            }
            return "vendor";
          }
        },
        assetFileNames: "assets/[name].[hash].[ext]",
        chunkFileNames: "js/[name].[hash].js",
        entryFileNames: "js/[name].[hash].js",
      },
    },
    cssCodeSplit: true,
    modulePreload: {
      polyfill: true,
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    sourcemap: true,
    reportCompressedSize: true,
    assetsDir: "assets",
    manifest: true,
    copyPublicDir: true,
    write: true,
  },
  optimizeDeps: {
    include: ["@lottiefiles/react-lottie-player"],
  },
  server: {
    headers: {
      // Add cache control headers
      "Cache-Control": "public, max-age=31536000", // 1 year for static assets
    },
  },
});
