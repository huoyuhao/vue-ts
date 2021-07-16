<template>
  <a-layout>
    <a-layout-sider class="d-sider" v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="d-logo" />
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout class="d-container" :style="containerStyle">
      <a-layout-header class="d-header">
        <div class="d-header-left">
          <menu-unfold-outlined
            v-if="collapsed"
            class="d-trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined v-else class="d-trigger" @click="() => (collapsed = !collapsed)" />
          <a-breadcrumb class="d-breadcrumb">
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item>List</a-breadcrumb-item>
            <a-breadcrumb-item>App</a-breadcrumb-item>
          </a-breadcrumb>
        </div>

        <div class="d-header-right">admin</div>
      </a-layout-header>
      <a-layout-content class="d-content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref, computed } from 'vue';
export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  setup() {
    const collapsed = ref<boolean>(false);
    const containerStyle = computed(() => {
      const width = collapsed.value ? '80px' : '200px';
      console.log(width)
      return {
        marginLeft: width
      }
    })
    return {
      containerStyle,
      selectedKeys: ref<string[]>(['1']),
      collapsed,
    };
  },
});
</script>
<style lang="less" scoped>
@height: 46px;
.d-logo{
  height: @height;
  background: #333;
}
.d-sider{
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
}
.d-container{
  .d-trigger {
    font-size: 18px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
  .d-content{
    margin: 16px 10px;
    min-height: calc(100vh - @height - 32px);
  }
}
.d-header{
  height: @height;
  background: #FFF;
  padding: 0 20px;
  line-height: @height;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .d-breadcrumb{
    margin: 0 16px;
  }
  .d-header-left {
    display: flex;
    align-items: center;
  }
}

</style>
