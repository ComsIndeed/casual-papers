// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import icon from 'astro-icon';

export default defineConfig({
  site: 'https://www.casualpapers.com', // Replace with your actual domain
  integrations: [react(), sitemap(), icon()],
});