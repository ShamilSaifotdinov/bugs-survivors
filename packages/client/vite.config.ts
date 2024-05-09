import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
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
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData(source, fp) {
          if (
            fp.endsWith('mixins.scss') ||
            fp.endsWith('variables.scss') ||
            fp.endsWith('reset.scss')
          )
            return source
          return (
            `@import "./src/assets/scss/mixins";@import "./src/assets/scss/variables";@import "./src/assets/scss/reset";` +
            source
          )
        },
      },
    },
  },
})
