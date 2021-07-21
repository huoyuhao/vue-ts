<template>
  <p>test</p>
  <a-button @click="test">test</a-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { GetUserInfo } from '/@/api/sys/user';
export default defineComponent({
  name: 'ProductWarehouse',
  components: {
  },
  setup() {
    const test = () => {
      GetUserInfo().then((data) => {
        console.log(1111, data);
      });
    };
    return {
      test,
    };
  },
});
</script>

<style lang="less">
.test {

}

</style>
