<template>
  <div class="d-card">
    <a-row v-if="title" class="d-card-header" type="flex" align="middle" justify="space-between">
      <a-col>
        <span class="d-card-title">{{ title }}</span>
        <slot name="header"></slot>
      </a-col>
      <a-col v-if="isFold" @click="change">
        <ShrinkOutlined v-if="showContent" />
        <ArrowsAltOutlined v-else />
      </a-col>
    </a-row>
    <div v-show="showContent" class="d-card-content">
      <div class="d-loading" v-if="loading">
        <a-spin />
      </div>
      <slot v-else name="default"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  name: 'DCard',
  components: { ArrowsAltOutlined, ShrinkOutlined },
  props: {
    title: { // 卡片名称
      type: String,
    },
    isFold: { // 卡片是否可折叠
      type: Boolean,
      default: false,
    },
    loading: { // 卡片加载动画
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const showContent = ref(true);
    const change = () => {
      showContent.value = !showContent.value;
    };
    return {
      showContent,
      change,
    };
  },
});
</script>
<style lang="less" scoped>
.d-card {
  width: 100%;
  padding: 14px 16px 0;
  margin-bottom: 10px;
  background-color: #fff;
  &:hover {
    border-color: rgba(0, 0, 0, 0.09);
    box-shadow: 0 2px 8px rgb(0 0 0 / 9%);
  }
  .d-card-header {
    padding: 0 0 12px 4px;
  }
  .d-card-title {
    font-size: 14px;
    padding: 0 10px 0 10px;
    font-weight: bold;
    border-left: 3px solid @color;
    line-height: 16px;
    cursor: pointer;
  }
  .d-card-content {
    padding-bottom: 16px;
  }
  .d-loading {
    height: 420px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
