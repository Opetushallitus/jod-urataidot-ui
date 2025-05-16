import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { configDefaults } from 'vitest/config';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import react from '@vitejs/plugin-react-swc';
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
        },
        {
          src: 'assets/urataidot/fonts/*',
          dest: 'fonts',
        },
        {
          src: 'node_modules/emoji-datasource-apple/img/apple/64/*',
          dest: 'emoji-datasource-apple/img/apple/64',
        },
        {
          src: 'node_modules/emoji-datasource-facebook/img/facebook/64/*',
          dest: 'emoji-datasource-facebook/img/facebook/64',
        },
        {
          src: 'node_modules/emoji-datasource-twitter/img/twitter/64/*',
          dest: 'emoji-datasource-twitter/img/twitter/64',
        },
        {
          src: 'node_modules/emoji-datasource-google/img/google/64/*',
          dest: 'emoji-datasource-google/img/google/64',
        },
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
