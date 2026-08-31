// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project site: https://toverbay.github.io/sands/
  // If you later move to a custom domain or Cloudflare Pages, set `site` to
  // that URL and remove (or empty) `base`.
  //site: 'https://toverbay.github.io',
  site: 'https://stitchandgrain.online',
  // base: '/sands',
  integrations: [vue()],
});
