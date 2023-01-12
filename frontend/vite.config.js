import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    envDir: '../.',
    server: {
        proxy: {
            '/api': {
                target: 'https://weather-api-server.onrender.com',
                changeOrigin: true,
                secure: false,
            }
        }
    }
});
