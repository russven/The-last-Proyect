import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/items" : {
        target: "http//localhost:5007", 
        changeOrigin: true
      }
    }
  }
})
