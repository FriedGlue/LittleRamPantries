import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    watch: {
      usePolling: true,
    },
    strictPort: true,
    port: 5173, // you can replace this port with any port
  },
});
