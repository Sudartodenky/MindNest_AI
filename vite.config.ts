import { defineConfig } from 'vite'
import react from '@vitejs/react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'MindNest AI - Health Companion',
        short_name: 'MindNest',
        description: 'Teman kesehatan mental AI kamu',
        theme_color: '#8b5cf6',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'Mi-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'Mi-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})