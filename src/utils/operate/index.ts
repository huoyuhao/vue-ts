import { ref, watch, toRaw } from 'vue';
import { message } from 'ant-design-vue';
import { product } from '/@/api/product/index';
import { getObjectValueByKey } from '/@/utils/fun/common';
import { modalFun } from '/@/utils/operate/modal';

export const deleteFun = () => {
  const deleteModal = (postData: any, callback: any) => {
    const { confirmModal } = modalFun();
    confirmModal({ title: '删除提示', content: '此操作将永久删除该内容, 是否继续?' }, () => {
      product(postData)
        .then((res) => {
          message.success('删除成功');
          callback && callback(res);
        })
        .catch();
    });
  };
  return {
    deleteModal,
  };
};
export const addFun = (props: any, emit: any, { resetFields, validate }: { resetFields: any, validate: any }, { formItem, api }: { formItem: any, api: string }) => {
  let oldFormItemStr = '';
  const visibleModal = ref(false);
  const { formData, visible, isModify } = props;

  watch([visible, isModify], ([visible, isModify], [, prevIsModify]) => {
    visibleModal.value = visible;
    if (visible) {
      if (isModify !== prevIsModify && !isModify) {
        // 修改状态改为新增，清空数据
        resetFields();
      }
      // 覆盖表单数据
      getObjectValueByKey(formItem, toRaw(formData.value));
      oldFormItemStr = JSON.stringify(formItem);
    }
  });
  const close = () => {
    emit('update:visible', false);
  };
  const submit = () => {
    validate()
      .then(() => {
        if (isModify.value && JSON.stringify(formItem) === oldFormItemStr) {
          return message.error('没有任何修改!');
        }
        const text = isModify.value ? '修改' : '添加';
        const method = isModify.value ? 'put' : 'post';
        const data = {} as any;
        Object.keys(formItem).forEach((item) => {
          if (formItem[item]) {
            data[item] = formItem[item];
          }
        });
        const postData = { api, method, data };
        product(postData)
          .then(() => {
            message.success(`${text}成功`);
            resetFields();
            close();
            emit('update');
          })
          .catch(() => {
            // message.error(`${text}失败，请重试!`);
          });
      })
      .catch(() => {});
  };
  return {
    visibleModal,
    close,
    submit,
  };
};
