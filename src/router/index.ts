import type { RouteRecordRaw } from 'vue-router';
import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';
import type { App } from 'vue';
import { getToken } from '/@/utils/http/auth';

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
  name: 'home',
  redirect: PageEnum.BASE_HOME,
  meta: { title: '首页', hideMenu: true },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'login',
  component: () => {
    return import('/@/views/sys/login.vue');
  },
  meta: { title: '登录', hideMenu: true, ignoreAuth: true },
};

export const ErrorRoute: AppRouteRecordRaw = {
  path: '/404',
  name: '404',
  component: () => {
    return import('/@/views/sys/404.vue');
  },
  meta: { title: '找不到', hideMenu: true, ignoreAuth: true },
};

export const basicRoutes = [LoginRoute, RootRoute, ErrorRoute, ...routeModuleList];

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
  const { ignoreAuth } = _to.meta;
  if (ignoreAuth || getToken()) {  // 页面无需校验权限 或者有token)
    next();
  } else {
    next('/login');
  }
});

// config router
export const setupRouter = (app: App<Element>) => {
  app.use(router);
};
