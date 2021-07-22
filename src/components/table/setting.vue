<template>
  <a-modal
    v-model:visible="settingModel"
    title="显示设置"
    width="800px"
    cancelText="取消"
    okText="提交"
    @cancel="close"
  >
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
      <a-checkbox-group v-model:value="selectValue">
        <a-row>
          <a-col :span="6" v-for="(item, index) in sourceColumns" :key="item.dataIndex + index">
            <a-checkbox :value="item.dataIndex">{{ item.title }}</a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </a-form>
    <div style="color: red" v-if="showWarning">请至少选择一项展示！</div>
    <template #footer>
      <a-button @click="close">取消</a-button>
      <a-button @click="onCheckAllChange">全选</a-button>
      <a-button @click="onReverseChange">清空</a-button>
      <a-button type="primary" @click="submit">确定</a-button>
    </template>
  </a-modal>
</template>
<script>
import { defineComponent, reactive, toRefs, watch } from 'vue';

export default defineComponent({
  name: 'DSetting',
  components: {},
  props: {
    visible: {
      required: true,
      type: Boolean,
      default: false,
    },
    sourceCols: {
      type: Array,
      default() {
        return [];
      },
    },
    initCols: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      settingModel: false,
      sourceColumns: [],
      selectValue: [],
      showWarning: false,
    });
    watch(
      () => {
        return props.visible;
      },
      () => {
        state.settingModel = props.visible;
        if (props.visible) {
          state.showWarning = false;
          state.sourceColumns = props.sourceCols.filter((item) => {
            return item.dataIndex !== 'action';
          });
          state.selectValue = props.initCols;
        }
      },
    );

    const submit = () => {
      const selectCols = props.sourceCols.filter((item) => {
        return [...state.selectValue, ...['action']].includes(item.dataIndex);
      });
      if (state.selectValue && state.selectValue.length > 0) {
        close();
        emit('getSetting', selectCols);
      } else {
        state.showWarning = true;
      }
    };
    const close = () => {
      emit('update:visible', false);
    };
    const onCheckAllChange = () => {
      state.selectValue = props.sourceCols
        .filter((item) => {
          return item.dataIndex !== 'action';
        })
        .map((item) => {
          return item.dataIndex;
        });
    };
    const onReverseChange = () => {
      state.selectValue = [];
    };
    return {
      ...toRefs(props),
      ...toRefs(state),
      submit,
      close,
      onCheckAllChange,
      onReverseChange,
    };
  },
});
</script>
<style lang="less" scoped></style>
