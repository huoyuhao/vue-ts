<template>
<d-card title="test">
  <p>test</p>
  <a-button @click="test">test</a-button>
  </d-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { GetWarehouse } from '/@/api/product/warehouse';
export default defineComponent({
  name: 'ProductWarehouse',
  components: {
  },
  setup() {
    const test = () => {
      GetWarehouse().then((data: any) => {
        console.log(1111, data);
      });
    };
    return {
      test,
    };
  },
});
</script>

<style lang="less"></style>
