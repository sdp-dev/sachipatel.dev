import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages deployment, update this to your repo name
  // e.g., base: '/your-repo-name/'
  // If deploying to username.github.io, use: base: '/'
  base: '/',
})
