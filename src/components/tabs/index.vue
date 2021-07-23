<template>
  <d-tab-list :data="list" :activeKey="current" :size="size" @change="change" />
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, provide, ref, watch } from 'vue';
import DTabList from './tab-list.vue';

export default defineComponent({
  name: 'DTabs',
  components: { DTabList },
  props: {
    activeKey: {
      type: String,
    },
    size: {
      type: String,
      default: 'default',
    },
  },
  setup(props, { emit }) {
    const current = ref('');
    const list = ref([]);
    provide('activeKey', current);
    const addList = (item) => {
      list.value.push(item);
    };
    const removeList = (item) => {
      let indexDel;
      list.value.forEach((tab, index) => {
        if (tab.key === item.key) {
          indexDel = index;
        }
      });
      list.value.slice(indexDel, 1);
    };
    provide('addList', addList);
    provide('removeList', removeList);
    watch(
      () => {
        return props.activeKey;
      },
      () => {
        current.value = props.activeKey;
      },
      {
        immediate: true,
      },
    );
    const change = (item) => {
      emit('update:activeKey', item.key);
    };
    return {
      ...toRefs(props),
      current,
      list,
      change,
    };
  },
});
</script>
<style lang="less" scoped></style>
