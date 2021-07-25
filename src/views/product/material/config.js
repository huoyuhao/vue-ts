export const type = [
  { title: '唯一标识', dataIndex: 'materialTypeId', rowKey: true, hideTable: true, hideForm: true },
  { title: '物料组别代码', dataIndex: 'materialTypeCode', required: true },
  { title: '物料组别名称', dataIndex: 'materialTypeName', required: true  },
  { title: '助记码', dataIndex: 'materialTypeMnemonic', required: true  },
  { title: '备注', dataIndex: 'description' },
];
export const unit = [
  { title: '唯一标识', dataIndex: 'materialUnitId', rowKey: true, hideForm: true },
  { title: '物料计量单位代码', dataIndex: 'materialUnitCode', required: true },
  { title: '物料计量单位名称', dataIndex: 'materialUnitName', required: true  },
  { title: '助记码', dataIndex: 'materialUnitMnemonic', required: true  },
  { title: '备注', dataIndex: 'description' },
];

export const list = [
  { title: '唯一标识', dataIndex: 'materialId', rowKey: true, hideForm: true },
  { title: '物料代码', dataIndex: 'materialCode', required: true },
  { title: '物料名称', dataIndex: 'materialName', required: true  },
  { title: '规格型号', dataIndex: 'materialSap', required: true  },
  { title: '物料属性', dataIndex: 'materialProperties', required: true  },
  { title: '物料类型', dataIndex: 'materialTypeId', hideTable: true, required: true, hideForm: true },
  { title: '物料类型', dataIndex: 'materialTypeName', hideForm: true, required: true },
  { title: '物料计量单位', dataIndex: 'materialUnitId', hideTable: true, required: true, hideForm: true  },
  { title: '物料计量单位', dataIndex: 'materialUnitName', required: true, hideForm: true  },
  { title: '数量显示精度', dataIndex: 'accuracy', required: true  },
  { title: '备注', dataIndex: 'description' },
];
