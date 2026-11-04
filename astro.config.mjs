// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// TODO: ganti dengan domain asli setelah deploy (mis. https://tahugunting.id)
const SITE_URL = 'https://tahu-gunting-bali.vercel.app';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  build: {
    // CSS ±8 KB setelah gzip: disisipkan langsung ke HTML agar tidak memblokir render
    inlineStylesheets: 'always',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
