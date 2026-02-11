
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Vite uses import.meta.env, but we map process.env for compatibility with existing code
    'process.env': {
      API_KEY: JSON.stringify(process.env.VITE_API_KEY || process.env.API_KEY || '')
    }
  },
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '5173'),
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '8080')
  }
});
