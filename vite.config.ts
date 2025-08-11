import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import dyadComponentTagger from '@dyad-sh/react-vite-component-tagger';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/tomopan-friends-united-main/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    dyadComponentTagger(), 
    react(),
    mode === 'development' && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'logo.svg'],
      manifest: {
        name: 'ȚOMAPAN Online — Play with Friends',
        short_name: 'ȚOMAPAN',
        description: 'Play ȚOMAPAN (Țări, Orașe, Munți, Ape, Plante, Animale, Nume) online with friends. Fast rounds, modern UI, zero setup.',
        theme_color: '#0f172a',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));