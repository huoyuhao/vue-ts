import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { PageEnum } from '/@/enums/pageEnum';

const modules = import.meta.globEager('./modules/**/*.ts');
const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: { title: '首页' },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/Login.vue'),
  meta: { title: '登录' },
};

export const basicRoutes = [LoginRoute, RootRoute, ...routeModuleList];

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: basicRoutes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// config router
export function setupRouter(app: App<Element>) {
  app.use(router);
}
