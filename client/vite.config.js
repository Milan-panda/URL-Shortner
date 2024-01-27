import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api':'https://urlshort-0ush.onrender.com'
    }
  },
  esbuild: {
    // Add this configuration to handle JSX in .js files
    loader: {
      '.js': 'jsx',
    },
  },
});