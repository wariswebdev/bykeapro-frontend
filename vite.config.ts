import { defineConfig } from 'vite'
import react from '@vitejs/react-plugin' // Default Vite plugin
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
