import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import sass from 'sass';

export default defineConfig({
    plugins: [react(), dts()],
    build: {
        lib: {
            entry: 'src/index.ts', // Your library's entry file
            name: 'MfImageComparerator', // Global variable name for UMD builds
            fileName: (format) => `mf-image-comparerator.${format}.js`, // Output file name
        },
        rollupOptions: {
            // Externalize dependencies to prevent bundling them
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
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
