// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  integrations: [react(), tailwind(), mdx()],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'nord', // 你可以换成 'github-dark', 'dracula', 'monokai', 'light-plus' 等
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});