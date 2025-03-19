import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  
  const isReplEnv = !!process.env.REPL_SLUG
  
  console.log('Vite config running in:', isReplEnv ? 'Replit environment' : 'Local environment')
  console.log('API URL from env:', env.VITE_API_URL)

  return {
    plugins: [react()],
    server: {
      port: 5000, // Use port 5000 for the client
      host: '0.0.0.0',
      strictPort: true,
      hmr: {
        // In Replit, use the correct settings for HMR
        clientPort: 443,
        port: 5000,
        host: '0.0.0.0',
        protocol: 'wss'
      },
      watch: {
        // Explicitly excluded the node_modules folder for better performance
        ignored: ['**/node_modules/**', '**/dist/**']
      },
      cors: true // Enable CORS for development
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
  }
})
