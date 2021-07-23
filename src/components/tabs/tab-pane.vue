<template>
  <div v-if="activeKey === name">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, inject, toRefs, onUnmounted } from 'vue';

export default defineComponent({
  name: 'DTabPane',
  props: {
    name: {
      type: String,
    },
    label: {
      type: String,
    },
  },
  setup(props) {
    const activeKey = inject('activeKey');
    const addList = inject('addList');
    const removeList = inject('removeList');
    const tab = { key: props.name, name: props.label };
    addList(tab);
    onUnmounted(() => {
      removeList(tab);
    });
    return {
      ...toRefs(props),
      activeKey,
    };
  },
});
</script>
<style lang="less" scoped></style>
