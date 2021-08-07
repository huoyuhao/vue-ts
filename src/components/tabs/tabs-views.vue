<template>
  <template v-if="list && list.length > 0">
    <d-tab-list :data="list" :activeKey="current && current.key" @change="change" />
    <template v-if="keepAlive">
      <keep-alive>
        <component :is="component"></component>
      </keep-alive>
    </template>
    <template v-else>
      <component :is="component"></component>
    </template>
  </template>
</template>
<script>
import { defineComponent, defineAsyncComponent, toRefs, ref, watchEffect, shallowRef } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import DTabList from './tab-list.vue';

export default defineComponent({
  name: 'DTabView',
  components: { DTabList },
  props: {
    list: {
      required: true,
      type: Array,
      default: () => {
        return [];
      },
    },
    active: {
      type: String,
    },
    keepAlive: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const current = ref({ key: '' });
    const component = shallowRef({});
    const componentObj = {};
    props.list.forEach((item) => {
      if (!item.file) return;
      componentObj[item.key] = defineAsyncComponent(() => {
        return item.file;
      });
    });
    watchEffect(() => {
      const [result] = props.list.filter((item) => {
        return item.key === props.active;
      });
      current.value = result ?? router.push({ name: '404' });
      if (componentObj[current.value.key]) component.value = componentObj[current.value.key];
    });
    const change = (item) => {
      return router.push({ path: item.route, query: route.query });
    };
    return {
      ...toRefs(props),
      change,
      current,
      component,
    };
  },
});
</script>
