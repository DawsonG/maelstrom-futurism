import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import sassDts from 'vite-plugin-sass-dts';

export default defineConfig({
    plugins: [react(), dts({ include: ['lib'] }), sassDts()],
    build: {
        lib: {
            entry: resolve(__dirname, 'lib/index.ts'),
            formats: ['es']
        },
        rollupOptions: {
            external: ['react', 'react/jsx-runtime', 'react-dom'],
            output: {
                globals: {
                    'react': 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'jsxRuntime',
                },
            },
        },
    },
});