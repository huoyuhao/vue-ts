import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

export const modalFun = () => {
  const confirmModal = ({ title, content, width } :{title:string, content:any, width?:string}, confirm:any, cancel?:any) => {
    Modal.confirm({
      title: title || '提示',
      icon: createVNode(ExclamationCircleOutlined),
      width,
      content: content || '执行该操作后不可回退，是否继续？',
      cancelText: '取消',
      okText: '确定',
      closable: true,
      maskClosable: true,
      onOk() {
        confirm && confirm();
      },
      onCancel() {
        cancel && cancel();
      },
    });
  };
  const infoModal = ({ title, content, width } :{title:string, content:any, width:string}, confirm:any) => {
    Modal.info({
      title: title || '提示',
      icon: createVNode(ExclamationCircleOutlined),
      width,
      content,
      cancelText: '',
      okText: '确定',
      closable: true,
      maskClosable: true,
      onOk() {
        confirm && confirm();
      },
    });
  };
  return {
    confirmModal,
    infoModal,
  };
};
