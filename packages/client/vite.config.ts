import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import dotenv from 'dotenv'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      includeAssets: ['fonts/*.ttf', 'images/*.png'],
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg}'],
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData(source, fp) {
          if (fp.endsWith('mixins.scss')) return source
          return `@import "./src/assets/scss/mixins";` + source
        },
      },
    },
  },
})
