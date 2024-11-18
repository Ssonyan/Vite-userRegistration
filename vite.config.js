import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/test/setup.js',
        include: ['**/*.{test,spec}.{js,jsx}'],
        coverage: {
            exclude: [
                'user-registration/*',
                '**/postcss.config.js',
                '**/tailwind.config.js',
                'eslint.config.js',
                'vite.config.js',
                'src/App.jsx',
                'src/main.jsx'
            ]
        }
    },
})