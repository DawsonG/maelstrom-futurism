import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react({ jsxImportSource: '@emotion/react' }),
    dts({ include: ['lib'] }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        'react-dom',
        '@emotion/react',
        '@emotion/react/jsx-runtime',
        '@maelstrom-futurism/core',
        '@maelstrom-futurism/icons',
      ],
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          '@emotion/react': 'emotionReact',
        },
      },
    },
  },
});
