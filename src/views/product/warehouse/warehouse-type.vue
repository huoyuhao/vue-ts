<template>
  <d-card title="仓库类型">
    <d-table
      :loading="loading"
      :columns="columns"
      :data-source="data"
      :rowKey="(record, index) => index"
      :isSearch="true"
    >
      <template #header>
        <a-button type="primary" @click="query">刷新</a-button>
        <a-button type="primary" @click="add">新增</a-button>
      </template>
      <template #action="{ record }">
        <a-dropdown placement="bottomCenter">
          <a @click.prevent>
            操作
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item key="modify"><a @click="modify(record)">修改</a></a-menu-item>
              <a-menu-item key="delete"><a @click="deleteData(record)">删除</a></a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </d-table>
  </d-card>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { GetWarehouseType, DeleteWarehouseType } from '/@/api/product/warehouse';
import { GetUserInfo } from '/@/api/sys/user';
import { modalFun } from '/@/utils/operate/modal';

export default defineComponent({
  name: 'DProductWarehouseType',
  components: {
  },
  setup() {
    const state = reactive({
      loading: false,
      data: [],
      showModal: false,
      formData: null,
    });
    const columns = [
      { title: '仓库类型代码', dataIndex: 'warehouseTypeCode' },
      { title: '仓库类型名称', dataIndex: 'warehouseTypeName' },
      { title: '助记码', dataIndex: 'warehouseTypeMnemonic', sort: true },
      { title: '备注', dataIndex: 'description' },
      { title: '操作', dataIndex: 'action', align: 'center', width: '80px', slots: { customRender: 'action' } },
    ];
    const query = () => {
      state.loading = true;
      GetUserInfo().then((res) => {
        state.loading = false;
        res = {
          code: 0,
          msg: 'success',
          detail: [{
            warehouseTypeId: 5,
            warehouseTypeCode: 'CangKuLeiXing102',
            warehouseTypeName: '仓库类型102',
            warehouseTypeMnemonic: 'CKLX102',
            description: '第102个仓库类型',
            createTime: 1626561110000,
            updateTime: 1626561110000,
          }, {
            warehouseTypeId: 4,
            warehouseTypeCode: 'CangKuLeiXing103',
            warehouseTypeName: '仓库类型103',
            warehouseTypeMnemonic: 'CKLX103',
            description: '第103个仓库类型',
            createTime: 1626561110001,
            updateTime: 1626561110001,
          }],
        };
        state.data = res.detail;
      })
        .catch();
    };
    const add = () => {
      state.showModal = true;
      state.formData = {};
    };
    const deleteData = (item) => {
      const { warehouseTypeId } = item;
      const { confirmModal } = modalFun();
      confirmModal({ title: '删除提示', content: '此操作将永久删除该内容, 是否继续?' }, () => {
        DeleteWarehouseType({ warehouseTypeId }).then((res) => {
          message.success('删除成功');
          query();
        })
          .catch();
      });
    };
    const modify = (item) => {
      state.showModal = true;
      state.formData = item;
    };
    query();
    return {
      ...toRefs(state),
      columns,
      query,
      add,
      deleteData,
      modify,
    };
  },
});
</script>
<style lang="less" scoped></style>
