export const type = [
  { title: '唯一标识', dataIndex: 'warehouseTypeId', rowKey: true, hideTable: true, hideForm: true },
  { title: '仓库类型代码', dataIndex: 'warehouseTypeCode', required: true },
  { title: '仓库类型名称', dataIndex: 'warehouseTypeName', required: true  },
  { title: '助记码', dataIndex: 'warehouseTypeMnemonic', required: true  },
  { title: '备注', dataIndex: 'description' },
];
export const list = [
  { title: '唯一标识', dataIndex: 'warehouseId', rowKey: true, hideForm: true },
  { title: '仓库代码', dataIndex: 'warehouseCode', required: true },
  { title: '仓库名', dataIndex: 'warehouseName', required: true  },
  { title: '仓库管理员id', dataIndex: 'warehouseManagerId', required: true  },
  { title: '仓库地址', dataIndex: 'warehouseAddress', required: true  },
  { title: '仓库座机号码', dataIndex: 'warehouseLandlineNumber', required: true },
  { title: '仓库类型', dataIndex: 'warehouseTypeId', hideTable: true, hideForm: true, required: true },
  { title: '仓库类型', dataIndex: 'warehouseTypeName', hideForm: true  },
  { title: '助记码', dataIndex: 'warehouseMnemonic', required: true  },
  { title: '备注', dataIndex: 'description' },
];
