<template>
  <ul class="d-tab">
    <li
      v-for="item in list"
      :key="item.key"
      :class="['d-tab-item', `d-tab-${size}`, { active: item?.key === activeKey }]"
      @click="clickTab(item)"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script>
import { computed, defineComponent, toRefs } from 'vue';

export default defineComponent({
  name: 'DTabList',
  props: {
    data: {
      type: Array,
    },
    activeKey: {
      type: String,
    },
    size: {
      type: String,
      default: 'default',
    },
  },
  setup(props, context) {
    const clickTab = (item) => {
      context.emit('change', item);
    };
    const list = computed(() => {
      return props.data.map((item) => {
        const { key, name } = item;
        return { key, name };
      });
    });
    return {
      ...toRefs(props),
      list,
      clickTab,
    };
  },
});
</script>
<style lang="less" scoped>
.d-tab {
  display: flex;
  margin-left: 2px;
  .d-tab-item {
    margin-right: 10px;
    min-width: 110px;
    line-height: 38px;
    padding: 0 10px;
    box-sizing: border-box;
    color: #555;
    border: 1px #dbdbdb solid;
    border-bottom: 0;
    text-align: center;
    border-radius: 4px 4px 0 0;
    background-color: #efefef;
    &.d-tab-small {
      margin-right: 6px;
      min-width: 80px;
      line-height: 30px;
      padding: 0 8px;
      font-size: 12px;
    }
    &:hover {
      color: @color;
    }
    &.active {
      border: 0;
      color: #fff;
      background-color: @color;
    }
  }
}
</style>
