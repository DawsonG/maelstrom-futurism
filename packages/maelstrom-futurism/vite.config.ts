import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({ include: ['index.ts'] }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        'react-dom',
        '@maelstrom-futurism/button',
        '@maelstrom-futurism/core',
        '@maelstrom-futurism/form',
        '@maelstrom-futurism/layout',
        '@maelstrom-futurism/modal',
        '@maelstrom-futurism/navbar',
        '@maelstrom-futurism/paper',
        '@maelstrom-futurism/sidebar',
        '@maelstrom-futurism/table',
        '@maelstrom-futurism/tooltip',
      ],
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});
