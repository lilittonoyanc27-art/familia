import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()], base: './',
  build: { target: 'es2021', chunkSizeWarningLimit: 900, rollupOptions: { output: { manualChunks(id: string) { if (id.includes('node_modules/three')) return 'three'; } } } },
});
