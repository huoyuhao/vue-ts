<template>
  <d-tab-view :list="list" :active="active"></d-tab-view>
</template>
<script lang="ts">
import { defineComponent, watchEffect, ref } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
  name: 'DProductWarehouse',
  components: {
  },
  setup() {
    const route = useRoute();
    const list = [
      { key: 'data', name: '仓库', route: '/product/warehouse/data', file: import('./data.vue') },
      { key: 'type', name: '仓库类型', route: '/product/warehouse/type', file: import('./type.vue') },
    ];
    const active = ref('');
    watchEffect(() => {
      active.value = route.params?.type as string;
    });
    return {
      list,
      active,
    };
  },
});
</script>
<style lang="less" scoped></style>
