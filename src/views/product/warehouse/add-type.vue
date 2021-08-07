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
      <template v-for="item in type">
        <a-form-item v-if="!item.hideForm" :key="item.dataIndex" :label="item.title" v-bind="validateInfos[item.dataIndex]">
          <a-input v-model:value="formItem[item.dataIndex]" />
        </a-form-item>
      </template>
    </a-form>
  </a-modal>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue';
import { addFun } from '/@/utils/operate/index';
import { type } from './config';
import { Form } from 'ant-design-vue';

export default defineComponent({
  name: 'DAddWarehouseType',
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
        return {};
      },
    },
    isModify: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const api = '/warehouse/type';
    const formItem = reactive({});
    const ruleValidate = reactive({});
    const title = props.isModify ? '修改' : '新增';
    type.forEach((item) => {
      const { title, dataIndex } = item;
      if (item.required) {
        ruleValidate[dataIndex] = [{ required: true, message: `${title}不能为空！` }];
      }
      formItem[dataIndex] = '';
    });
    const { useForm } = Form;
    const { resetFields, validate, validateInfos } = useForm(formItem, ruleValidate);

    const { visibleModal, close, submit } = addFun(toRefs(props), emit, { resetFields, validate }, { formItem, api });

    return {
      title,
      type,
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
