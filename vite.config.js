import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path, { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        login: resolve(__dirname, 'src/login.html'),
        register: resolve(__dirname, 'src/register.html'),
        createAd: resolve(__dirname, 'src/createAd.html'),
      },
    },
  },
  server: {
    allowedHosts: [
      'http://localhost:3000'
    ]
  },
});
