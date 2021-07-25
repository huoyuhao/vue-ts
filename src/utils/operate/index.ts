import { ref, watch, toRaw } from 'vue';
import { message } from 'ant-design-vue';
import { doppler } from '@/api/index';
import { getObjectValueByKey } from '@/js/common';

export const addFun = (props, emit, { resetFields, validate }, { formItem, api }) => {
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
        const postData = {
          api,
          method: 'post',
          data: formItem,
        };
        doppler(postData)
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
