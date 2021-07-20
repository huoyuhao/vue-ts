import type { Plugin } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export const createVitePlugins = () => {
  // viteEnv: ViteEnv
  // const { VITE_USE_MOCK } = viteEnv;
  const vitePlugins: (Plugin | Plugin[])[] = [
    vue(),
    vueJsx(),
  ];

  return vitePlugins;
};
