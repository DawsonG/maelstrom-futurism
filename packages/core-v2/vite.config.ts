import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';
import sassDts from 'vite-plugin-sass-dts';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    plugins: [
        react(),
        sassDts(),
        dts({ include: ['lib'] }),
        viteStaticCopy({
            targets: [
                {
                    src: resolve(__dirname, './lib/') + '/**/*.scss',
                    dest: './',
                },
                {
                    src: resolve(__dirname, './lib/fonts'),
                    dest: './',
                },
            ],
        }),
    ],
    css: {
        modules: {
            localsConvention: 'camelCaseOnly',
        }
    },
    build: {
        minify: 'terser',
        sourcemap: false,
        copyPublicDir: false,
        lib: {
            entry: resolve(__dirname, 'lib/index.ts'),
            formats: ['es']
        },
        rollupOptions: {
            external: ['react', 'react/jsx-runtime', 'react-dom'],
            output: {
                assetFileNames: 'assets/[name][extname]',
                entryFileNames: '[name].js',
                globals: {
                    'react': 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'jsxRuntime',
                },
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            },
        },
    },
});