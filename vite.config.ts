import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { configDefaults } from 'vitest/config';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { fileURLToPath } from 'node:url';

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
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e'],
    coverage: {
      provider: 'v8',
      reporter: ['lcov'],
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
});
