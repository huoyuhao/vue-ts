<template>
  <a-layout>
    <a-layout-sider class="d-sider" v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="d-logo">放置logo图片</div>
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys" @click="clickMenu">
        <template v-for="subItem in menu">
          <template v-if="!subItem.meta.hideMenu">
            <a-sub-menu v-if="subItem.children && subItem.children.length > 0" :key="subItem.name">
              <template #icon v-if="subItem.meta && subItem.meta.icon">
                <component :is="subItem.meta.icon"></component>
              </template>
              <template #title>{{ subItem.meta.title }}</template>
              <template v-for="menuItem in subItem.children">
                <template v-if="!menuItem.meta.hideMenu">
                  <a-menu-item :key="menuItem.name">{{ menuItem.meta.title }}</a-menu-item>
                </template>
              </template>
            </a-sub-menu>
            <a-menu-item v-else :key="subItem.name">{{ subItem.meta.title }}</a-menu-item>
          </template>
        </template>
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
            <a-breadcrumb-item>首页</a-breadcrumb-item>
            <a-breadcrumb-item v-for="item in breadcrumb" :key="item.name">{{ item.title }}</a-breadcrumb-item>
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
import { defineComponent, computed, reactive, toRefs, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { basicRoutes } from '/@/router/index';
export default defineComponent({
  name: 'DLayout',
  components: {
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      breadcrumb: [] as { name: string, title: string } [],
      selectedKeys: [] as string [],
      collapsed: false,
      openKeys: [] as string [],
    });
    const containerStyle = computed(() => {
      const width = state.collapsed ? '80px' : '200px';
      return {
        marginLeft: width,
      };
    });
    const clickMenu = ({ key }: { key: string}) => {
      router.push({ name: key });
    };
    const menu = [...basicRoutes];

    watchEffect(() => {
      const openKeys: string[] = [];
      const breadcrumb: { name: string, title: string }[] = [];
      let isMatchRoute = false;
      let selectedKeys = '';
      const routeList = [...route.matched];
      routeList.forEach((routeItem) => {
        const { meta } = routeItem;
        const name = String(routeItem.name);
        breadcrumb.push({ name, title: meta.title });
        openKeys.push(String(name));
        if (!isMatchRoute) {
          selectedKeys = String(name);
          if (meta.hideMenu) {
            isMatchRoute = true;
          }
        }
      });
      state.selectedKeys = [selectedKeys];
      state.breadcrumb = breadcrumb;
      state.openKeys = openKeys;
    });
    return {
      ...toRefs(state),
      containerStyle,
      menu,
      clickMenu,
    };
  },
});
</script>
<style lang="less" scoped>
@height: 46px;
.d-logo{
  display: flex;
  justify-content: center;
  align-items: center;
  height: @height;
  background: #CCC;
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
