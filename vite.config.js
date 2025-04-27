import { wordpressPlugin, wordpressThemeJson } from '@roots/vite-plugin';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import inject from '@rollup/plugin-inject';

export default defineConfig({
  base: '/app/themes/sage/public/build/',
  plugins: [
    inject({
      jQuery: 'jquery',
    }),
    laravel({
      input: [
        'resources/css/app.scss',
        'resources/js/app.js',
        'resources/css/editor.scss',
        'resources/js/editor.js',
      ],
      refresh: true,
    }),

    wordpressPlugin(),

    // Generate the theme.json file in the public/build/assets directory
    // based on the Tailwind config and the theme.json file from base theme folder
    wordpressThemeJson({
      disableTailwindColors: true,
      disableTailwindFonts: true,
      disableTailwindFontSizes: true,
    }),
  ],
  optimizeDeps: {
    include: ['jquery'],
  },
  resolve: {
    alias: {
      '@scripts': '/resources/js',
      '@styles': '/resources/css',
      '@fonts': '/resources/fonts',
      '@images': '/resources/images',
    },
  },
});
