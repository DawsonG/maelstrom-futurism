import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';
import sassDts from 'vite-plugin-sass-dts';

export default defineConfig({
    plugins: [react(), sassDts()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es']
        },
        rollupOptions: {
            external: ['react', 'react/jsx-runtime'],
        },
    },
});