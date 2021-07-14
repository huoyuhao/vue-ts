import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const product: AppRouteModule = {
  path: '/product',
  name: 'product',
  component: LAYOUT,
  redirect: '/product/warehouse',
  meta: {
    title: 'test1',
  },
  children: [
    {
      path: 'warehouse',
      name: 'product-warehouse',
      component: () => import('/@/views/product/warehouse/index.vue'),
      meta: {
        title: 'test1-1',
      },
    },
    {
      path: 'material',
      name: 'product-material',
      component: () => import('/@/views/product/material/index.vue'),
      meta: {
        title: 'test1-2',
      },
    },
    {
      path: 'materialParts',
      name: 'product-materialParts',
      component: () => import('/@/views/product/materialParts/index.vue'),
      meta: {
        title: 'test1-3',
      },
    },
  ],
};

export default product;
