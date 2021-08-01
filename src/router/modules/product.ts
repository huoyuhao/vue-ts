import type { AppRouteModule } from '/@/router/types';

import { LAYOUTS } from '/@/router/constant';

const product: AppRouteModule = {
  path: '/product',
  name: 'product',
  component: LAYOUTS,
  redirect: '/product/warehouse/data',
  meta: {
    title: '物料管理',
    icon: 'AppstoreOutlined',
  },
  children: [
    {
      path: 'warehouse/:type',
      name: 'product-warehouse',
      meta: { title: '仓库', redirect: '/product/warehouse/data' },
      component: import('/@/views/product/warehouse/index.vue'),
    },
    {
      path: 'material/:type',
      name: 'product-material',
      component: import('/@/views/product/material/index.vue'),
      meta: { title: '物料', redirect: '/product/material/data' },
    },
    {
      path: 'materialParts/:type',
      name: 'product-materialParts',
      component: import('/@/views/product/materialParts/index.vue'),
      meta: { title: '物料件', redirect: '/product/materialParts/entryFactory' },
    },
  ],
};

export default product;
