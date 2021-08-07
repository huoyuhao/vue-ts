<template>
  <d-tab-view :list="list" :active="active"></d-tab-view>
</template>
<script>
import { defineComponent, watchEffect, ref } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
  name: 'DProductWarehouse',
  components: {
  },
  setup() {
    const route = useRoute();
    const list = [
      { key: 'entryFactory', name: '入厂', route: '/product/materialParts/entryFactory', file: import('./entry-factory.vue') },
      { key: 'outFactory', name: '出厂', route: '/product/materialParts/outFactory', file: import('./out-factory.vue') },
      { key: 'entryWarehouse', name: '入库', route: '/product/materialParts/entryWarehouse', file: import('./entry-warehouse.vue') },
      { key: 'outWarehouse', name: '出库', route: '/product/materialParts/outWarehouse', file: import('./out-warehouse.vue') },
    ];
    const active = ref('');
    watchEffect(() => {
      active.value = route.params?.type;
    });
    return {
      list,
      active,
    };
  },
});
</script>
<style lang="less" scoped></style>
