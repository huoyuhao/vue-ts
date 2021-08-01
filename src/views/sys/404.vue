<template>
  <a-result status="404" title="404" sub-title="抱歉，页面不存在！">
    <template #extra>
      <a-button type="primary" @click="routeHome">返回首页</a-button>
    </template>
  </a-result>
</template>
<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'D404',
  components: {},
  setup() {
    const router = useRouter();
    const routeHome = () => {
      router.push({ name: 'home' });
    };
    return {
      routeHome,
    };
  },
});
</script>
