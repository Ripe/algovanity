import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      includeAssets: ['favicon.png', 'apple-touch-icon.png', 'maskable-icon.png'],
      manifest: {
        name: 'Algorand Vanity Address Generator',
        short_name: 'Algo Vanity',
        version: '1.0.0',
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        description: 'Algorand Vanity Address Generator',
        theme_color: '#000',
        offline_enabled: true,
        icons: [
          {
            src: 'launcher-icon-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: 'launcher-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'launcher-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'maskable-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ]
});
