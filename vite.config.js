import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt"],
      manifest: {
        name: "FieldOps Pro",
        short_name: "FieldOps",
        description: "Offline-First PWA for Field Operations",
        theme_color: "#1e40af",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/jsonplaceholder\.typicode\.com\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },
              networkTimeoutSeconds: 3,
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 5500,
    strictPort: false,
    hmr: {
      overlay: true,
    },
  },
  build: {
    sourcemap: false,
    minify: "terser",
    chunkSizeWarningLimit: 1000,
  },
});
