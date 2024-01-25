import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({ 
  base: "/IsaiashChat", 
  plugins: [svgr(), react()],
  server: {
    host: '0.0.0.0',
  }
})
