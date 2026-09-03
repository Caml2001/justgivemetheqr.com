// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://justgivemetheqr.com',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [preact(), sitemap({ filter: (page) => !page.includes('/design') })],
  vite: {
    plugins: [tailwindcss()],
    // Pre-bundle the one CJS dependency up front. Discovering it lazily makes
    // Vite re-optimize mid-session, which leaves open tabs with stale dep
    // hashes (504 "Outdated Optimize Dep") and a generator that never hydrates.
    optimizeDeps: { include: ['qrcode'] },
  },
});
