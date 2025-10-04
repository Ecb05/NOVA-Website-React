import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    port: 3000, // Change this to whatever port you prefer
    open: true,  // Optional: automatically opens browser when dev server starts
        proxy: {
      '/api': {
        target: 'http://localhost:3001'
      }
  }
}})