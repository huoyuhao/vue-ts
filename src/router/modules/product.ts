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
      component: () => {
        return import('/@/views/product/warehouse/index.vue');
      },
      meta: { title: '仓库' },
    },
    {
      path: 'material',
      name: 'product-material',
      component: () => {
        return import('/@/views/product/material/index.vue');
      },
      meta: { title: '物料' },
    },
    {
      path: 'materialParts',
      name: 'product-materialParts',
      component: () => {
        return import('/@/views/product/materialParts/index.vue');
      },
      meta: { title: '物料件' },
    },
  ],
};

export default product;
