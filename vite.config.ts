import type { UserConfig, ConfigEnv } from 'vite';

// eslint-disable-next-line no-duplicate-imports
import { loadEnv } from 'vite';
import { wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugin';
import { createProxy } from './build/vite/proxy';

import { resolve } from 'path';

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), '.', dir);
};

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv;
  const isBuild = command === 'build';
  return {
    base: VITE_PUBLIC_PATH,
    publicDir: 'public',
    resolve: {
      alias: [
        {
          find: /\/@\//,
          replacement: `${pathResolve('src')}/`,
        },
      ],
    },
    server: {
      port: VITE_PORT,
      https: false,
      cors: true,
      proxy: createProxy(VITE_PROXY),
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
    },
    css: {
      preprocessorOptions: {
        less: {
          // color - 全局默认主题颜色； width - 默认页面最小宽度
          additionalData: '@color: #0960BD;@width: 1366px;',
          javascriptEnabled: true,
        },
      },
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      assetsDir: 'doppler',
      assetsInlineLimit: 4096, // 4kb
      // 默认为 Terser，虽然 Terser 相对较慢，但大多数情况下构建后的文件体积更小。ESbuild 最小化混淆更快但构建后的文件相对更大。
      minify: isBuild ? 'terser' : 'esbuild',
      // 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能
      brotliSize: false,
      // chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2000,
    },
    // viteEnv, isBuild
    plugins: createVitePlugins(),
  };
};
