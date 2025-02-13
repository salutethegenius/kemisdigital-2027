import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
    hmr: {
      clientPort: 3000,
      timeout: 120000
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: '../dist/public',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'framer-motion'],
          'ui': ['@radix-ui/react-slot', '@radix-ui/react-toast', '@radix-ui/react-dialog']
        }
      }
    }
  }
})