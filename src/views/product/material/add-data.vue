<template>
  <a-modal
    v-model:visible="visibleModal"
    :title="title"
    width="800px"
    cancelText="取消"
    okText="提交"
    @ok="submit"
    @cancel="close"
  >
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
      <template v-for="item in list">
        <a-form-item v-if="item.dataIndex === 'materialTypeId'" :key="item.dataIndex" :label="item.title" v-bind="validateInfos[item.dataIndex]">
          <a-select
            v-model:value="formItem[item.dataIndex]"
            placeholder="请选择"
            show-search
            option-filter-prop="label"
            :options="dataType"
          />
        </a-form-item>
        <a-form-item v-else-if="item.dataIndex === 'materialUnitId'" :key="item.dataIndex" :label="item.title" v-bind="validateInfos[item.dataIndex]">
          <a-select
            v-model:value="formItem[item.dataIndex]"
            placeholder="请选择"
            show-search
            option-filter-prop="label"
            :options="dataUnit"
          />
        </a-form-item>
        <a-form-item v-else-if="!item.hideForm" :key="item.dataIndex" :label="item.title" v-bind="validateInfos[item.dataIndex]">
          <a-input v-model:value="formItem[item.dataIndex]" />
        </a-form-item>
      </template>
    </a-form>
  </a-modal>
</template>
<script>
import { defineComponent, reactive, toRefs, ref } from 'vue';
import { product } from '/@/api/product/index';
import { addFun } from '/@/utils/operate/index';
import { list } from './config';
import { Form } from 'ant-design-vue';

export default defineComponent({
  name: 'DAddMaterialData',
  components: {},
  props: {
    visible: {
      required: true,
      type: Boolean,
      default: false,
    },
    formData: {
      type: Object,
      default() {
        return null;
      },
    },
    isModify: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const api = '/material';
    const formItem = reactive({});
    const ruleValidate = reactive({});
    const title = props.isModify ? '修改' : '新增';
    list.forEach((item) => {
      const { title, dataIndex } = item;
      if (item.required) {
        ruleValidate[dataIndex] = [{ required: true, message: `${title}不能为空！` }];
      }
      formItem[dataIndex] = '';
    });
    const { useForm } = Form;
    const { resetFields, validate, validateInfos } = useForm(formItem, ruleValidate);

    const { visibleModal, close, submit } = addFun(toRefs(props), emit, { resetFields, validate }, { formItem, api });

    const dataType = ref([]);
    const dataUnit = ref([]);
    const queryType = () => {
      product({ api: '/material/type', method: 'get' }).then((res) => {
        dataType.value = res.map((item) => {
          return { value: item.materialTypeId, label: item.materialTypeName };
        });
      })
        .catch();
      product({ api: '/material/unit', method: 'get' }).then((res) => {
        dataUnit.value = res.map((item) => {
          return { value: item.materialUnitId, label: item.materialUnitName };
        });
      })
        .catch();
    };
    queryType();
    return {
      title,
      dataType,
      dataUnit,
      list,
      formItem,
      visibleModal,
      validateInfos,
      close,
      submit,
    };
  },
});
</script>
<style lang="less" scoped></style>
