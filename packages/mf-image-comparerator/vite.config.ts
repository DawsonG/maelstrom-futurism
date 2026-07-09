import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import sass from 'sass';

export default defineConfig({
    plugins: [
        react(),
        dts({ include: ['src'] }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
        },
        rollupOptions: {
            external: ['react', 'react/jsx-runtime', 'react-dom', '@maelstrom-futurism/core'],
            output: {
                assetFileNames: 'assets/[name][extname]',
                entryFileNames: '[name].js',
                globals: {
                    'react': 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'jsxRuntime',
                },
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                implementation: sass,
            },
        },
    },
});
