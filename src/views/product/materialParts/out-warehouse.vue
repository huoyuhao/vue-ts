<template>
  <d-card :title="title">
    <a-form
      name="custom-validation"
      ref="formRef"
      :model="formItem"
      class="d-form"
      :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }"
    >
      <a-form-item label="物料" name="materialId">
          <a-select
            v-model:value="formItem.materialId"
            placeholder="请选择"
            show-search
            option-filter-prop="label"
            :options="materialArr"
          />
      </a-form-item>
      <a-form-item label="RF标签码" name="tagStr">
        <a-textarea v-model:value="tagStr" placeholder="请输入RF标签码" :auto-size="{ minRows: 3, maxRows: 6 }" allow-clear />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 4 }">
        <a-button class="d-button" type="primary" @click="submit">提交</a-button>
      </a-form-item>
    </a-form>

  </d-card>
</template>
<script>
import { computed, defineComponent, reactive, toRefs } from 'vue';
import { product } from '/@/api/product/index';
import { message } from 'ant-design-vue';

export default defineComponent({
  name: 'DProductEntryFactory',
  components: {  },
  setup() {
    const state = reactive({
      title: '出库',
      materialArr: [],
      tagStr: '',
    });
    const api = '/material/entity';

    const formItem = reactive({
      materialId: '',
      rfTagCodeList: [],
      materialEntityAction: 1,
    });
    const query = () => {
      product({ api: '/material', method: 'get' }).then((res) => {
        state.materialArr = res.map((item) => {
          return { value: item.materialId, label: item.materialName };
        });
      })
        .catch();
    };
    query();
    formItem.rfTagCodeList = computed(() => {
      return state.tagStr.trim().split(/[\n\s+,，；;]/g).filter((item) => {
        return item;
      });
    });
    const submit = () => {
      state.loading = true;
      product({ api, method: 'put', data: formItem }).then(() => {
        message.success(`${state.title}成功`);
      })
        .catch();
    };
    return {
      ...toRefs(state),
      formItem,
      submit,
    };
  },
});
</script>
<style lang="less" scoped>
.d-button{
  width: 200px;
}
</style>
