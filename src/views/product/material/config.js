export const type = [
  { title: '唯一标识', dataIndex: 'materialTypeId', rowKey: true, hideTable: true, hideForm: true },
  { title: '物料组别代码', dataIndex: 'materialTypeCode', required: true },
  { title: '物料组别名称', dataIndex: 'materialTypeName', required: true  },
  { title: '助记码', dataIndex: 'materialTypeMnemonic', sort: 'string', required: true  },
  { title: '备注', dataIndex: 'description' },
];
export const list = [
  { title: '唯一标识', dataIndex: 'materialId', rowKey: true, hideForm: true },
  { title: '物料代码', dataIndex: 'materialCode', required: true },
  { title: '物料名称', dataIndex: 'materialName', required: true  },
  { title: '规格型号', dataIndex: 'materialSap', sort: 'string', required: true  },
  { title: '物料属性', dataIndex: 'materialProperties', sort: 'string', required: true  },
  { title: '物料类型', dataIndex: 'materialTypeId', sort: 'string', required: true, hideForm: true },
  { title: '物料类型', dataIndex: 'materialName', sort: 'string', hideTable: true, hideForm: true, required: true },
  { title: '物料计量单位id', dataIndex: 'materialUnitId', sort: 'string', required: true  },
  { title: '数量显示精度', dataIndex: 'accuracy', sort: 'string', required: true  },
  { title: '备注', dataIndex: 'description' },
];
