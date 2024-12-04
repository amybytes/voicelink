import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      src: '/src/',
      components: '/src/components',
      contexts: '/src/contexts',
      hooks: '/src/hooks',
      routes: '/src/routes',
      api: '/src/api',
      assets: '/src/assets',
      images: '/src/assets/images',
      icons: '/src/assets/icons',
      styles: '/src/assets/styles',
      constants: '/src/assets/constants',
    },
  },
});
