/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  resolve:{
    alias: {
      '@': path.resolve(__dirname,'src'),
      '@component': path.resolve(__dirname, 'src/component'),
      '@libs': path.resolve(__dirname, 'src/libs'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
    }
  }
})
