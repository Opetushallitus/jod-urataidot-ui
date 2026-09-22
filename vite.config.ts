import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from 'vite-plugin-svgr';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/urataidot/',
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'assets/urataidot/videos/*',
          dest: 'videos',
          rename: { stripBase: true },
        },
        {
          src: 'assets/urataidot/videos/placeholders/*',
          dest: 'videos/placeholders',
          rename: { stripBase: true },
        },
        {
          src: 'assets/urataidot/fonts/*',
          dest: 'fonts',
          rename: { stripBase: true },
        },
        ...['apple', 'facebook', 'twitter', 'google'].map((provider) => ({
          src: `node_modules/emoji-datasource-${provider}/img/${provider}/64/*`,
          dest: `emoji-datasource-${provider}/img/${provider}/64`,
          rename: { stripBase: true as const },
        })),
      ],
    }),
    svgr({
      svgrOptions: { exportType: 'default', ref: true, svgo: false, titleProp: true },
      include: './src/icons/*.svg?react',
    }),
    react(),
    tailwindcss(),
  ],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            // React must sit in its own chunk: it changes rarely and everything depends on it.
            {
              name: 'react-vendor',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 40,
            },
            // The shared UI machinery pulled in by the design system.
            {
              name: 'ui-vendor',
              test: /[\\/]node_modules[\\/](@headlessui|@ark-ui|@floating-ui|@zag-js|@react-aria|@tanstack|@internationalized|motion|framer-motion|focus-trap|focus-trap-react|tabbable)[\\/]/,
              priority: 30,
            },
            // The design system itself. Matches both the installed package and a
            // `npm link`ed checkout, whose module ids are real paths.
            {
              name: 'design-system',
              test: /(?:[\\/]node_modules[\\/]@jod[\\/]design-system[\\/]|[\\/]jod-design-system[\\/]dist[\\/])/,
              priority: 20,
            },
            {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              minSize: 20_000,
            },
          ],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e'],
    coverage: {
      provider: 'v8',
      reporter: ['lcov'],
    },
  },
  resolve: {
    // Keeps the dev server working against a `npm link`ed @jod/design-system:
    // without this it loads a second React from the linked checkout's own
    // node_modules and every hook call throws. Does not help Vitest, which
    // resolves externalized deps with Node — run tests against `npm pack`
    // output instead (see README).
    dedupe: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'motion',
      '@headlessui/react',
      '@ark-ui/react',
      '@floating-ui/react',
      '@internationalized/date',
      'cva',
      'tailwind-merge',
      'focus-trap-react',
    ],
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
});
