<template>
  <d-tab-view :list="list" :active="active"></d-tab-view>
</template>
<script>
import { defineComponent, watchEffect, ref } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
  name: 'DProductMaterial',
  components: {
  },
  setup() {
    const route = useRoute();
    const list = [
      { key: 'data', name: '物料', route: '/product/material/data', file: import('./data.vue') },
      { key: 'type', name: '物料类型', route: '/product/material/type', file: import('./type.vue') },
      { key: 'unit', name: '物料单位', route: '/product/material/unit', file: import('./unit.vue') },
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
