import type { AppRouteModule } from '/@/router/types';

import { LAYOUTS } from '/@/router/constant';

const product: AppRouteModule = {
  path: '/product',
  name: 'product',
  component: LAYOUTS,
  redirect: '/product/warehouse',
  meta: {
    title: '物料管理',
    icon: 'AppstoreOutlined',
  },
  children: [
    {
      path: 'warehouse',
      name: 'product-warehouse',
      component: import('/@/views/product/warehouse/index.vue'),
      meta: { title: '仓库' },
    },
    {
      path: 'material',
      name: 'product-material',
      component: import('/@/views/product/material/index.vue'),
      meta: { title: '物料' },
    },
    {
      path: 'materialParts',
      name: 'product-materialParts',
      component: import('/@/views/product/materialParts/index.vue'),
      meta: { title: '物料件' },
    },
  ],
};

export default product;
