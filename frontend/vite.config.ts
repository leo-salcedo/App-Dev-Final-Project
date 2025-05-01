import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/App-Dev-Final-Project/',
  plugins: [react()],
  server: {
    proxy: {
      '/submit-progress': 'http://localhost:8000',
    },
  },
})