import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/weather-app/',  // 👈 MUST match GitHub repo name
  plugins: [react()]
});
