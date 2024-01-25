import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

const options = {
  workbox: { globPatterns: ["**/*"] },
  includeAssets: ["**/*"],
}

export default defineConfig({
  base: "/IsaiashChat/",
  plugins: [svgr(), react(), VitePWA(options)],
  server: {
    host: '0.0.0.0',
  }
})
