import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'Mi-192.png', 'Mi-512.png'],
      manifest: {
        name: 'MindNest AI - Health Companion',
        short_name: 'MindNest',
        description: 'Your AI Mental Health Companion',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#8b5cf6',
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