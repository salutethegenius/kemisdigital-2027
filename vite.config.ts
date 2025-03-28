import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
//import viteImagemin from 'vite-plugin-imagemin'; // Removed as per edited config

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      db: path.resolve(__dirname, "db"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'wouter'],
          ui: ['@radix-ui/react-avatar', '@radix-ui/react-dialog'],
          utils: ['date-fns', 'clsx', 'tailwind-merge']
        }
      }
    },
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5000
  },
  preview: {
    port: 5000,
    strictPort: true
  }
});