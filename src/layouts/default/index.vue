<template>
  <a-layout class="d-box">
    <a-layout-header class="d-header">
    </a-layout-header>
    <a-layout>
      <a-layout class="d-container">
        <a-layout-content >
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, computed, unref } from 'vue';
export default defineComponent({
  name: 'DefaultLayout',
  components: {
  },
  setup() {
    return {
    };
  },
  });
</script>
<style lang="less"></style>
