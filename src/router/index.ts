import type { RouteRecordRaw } from 'vue-router';
import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';
import type { App } from 'vue';

// eslint-disable-next-line no-duplicate-imports
import { createRouter, createWebHashHistory } from 'vue-router';
import { PageEnum } from '/@/enums/pageEnum';
import { clearPending } from '/@/utils/http/pending';

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
  meta: { title: '首页', hideMenu: true },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  redirect: PageEnum.BASE_HOME,
  // component: () => import('/@/views/sys/login/Login.vue'),
  meta: { title: '登录', hideMenu: true },
};

export const basicRoutes = [LoginRoute, RootRoute, ...routeModuleList];

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH as string),
  routes: basicRoutes as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => {
    return { left: 0, top: 0 };
  },
});

router.beforeEach((_to, _from, next) => {
  // 在跳转路由之前，先清除所有的请求
  clearPending();
  next();
});

// config router
export const setupRouter = (app: App<Element>) => {
  app.use(router);
};
