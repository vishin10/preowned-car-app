import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '', // ✅ Firebase serves from root, so base should be empty
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
