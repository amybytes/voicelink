import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

interface ConfigInput {
  mode: string;
}

// https://vitejs.dev/config/
export default ({mode}: ConfigInput) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [react(), svgr()],
    base: '/' + process.env.VITE_BASE_URL,
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
};
