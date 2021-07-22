# Table使用

## 介绍

由于所有数据和slot都进行的透传，所以基本支持ant-table组件的功能

## 功能

### table新增mergeKeys属性合并列

+ 参数：mergeKeys
+ 说明：根据mergeKeys的值，依次进行分组合并单元格
+ 数据类型：Array
+ 默认值：为空，不进行合并

注意：使用排序和筛选默认不进行合并

### Column新增sort属性

+ 参数：sort
+ 说明：封装函数，设置排序函数
+ 数据类型：String
+ 类型说明
  + 设置为 `number`，转换为数字进行排序
  + 设置为 `string`，根据字符串大小进行排序
+ 默认值：为空，不进行排序

### Column新增mergeKeys属性

+ 参数：mergeKeys
+ 说明：与该值所对应的列使用相同的合并规则
+ 数据类型：String
+ 默认值：为空，不进行合并

注意：其值必须在table的mergeKeys数组中存在，否则无效

### 集成筛选函数

+ 对于要筛选的列，对应columns中设置filter为true
+ 支持组合筛选

### 集成搜索框

+ 参数：isSearch
+ 说明：开放搜索功能
+ 数据类型：Boolean
+ 默认值：false，不开放导出功能

### 集成导出

+ 参数：exportTitle
+ 说明：导出的excel表格标题，传入exportTitle则开放导出功能
+ 数据类型：String
+ 默认值：空，不开放导出功能

### 集成显示设置

+ 参数：setting
+ 说明：设置表格展示的列，实现PC记忆
+ 数据类型：Boolean
+ 默认值：false，不开发设置按钮

## 插槽

header

### 其他

+ 搜索标红
+ 支持表格数据导出

## 使用事例

```vue
<template>
  <d-table :loading="loading" :columns="columns" :data-source="data" bordered :mergeKey="['area', 'az']" rowKey="asset_id">
    <template #asset_id="{ text }">
      <a :href="'http://config2.itil.com/server/server/view/428732721' + text" target="_blank">{{ text }}</a>
    </template>
    <template #action="{ record }">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          Hover me
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;" @click="test(record)">1st menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">2nd menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">3rd menu item</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </template>
  </d-table>
</template>
<script>

import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Test',
  components: {
  },
  setup () {
    const columns = [
      {
        title: 'region',
        dataIndex: 'area',
      },
      {
        title: 'AZ',
        dataIndex: 'az',
        filters: [
          {
            text: '南山',
            value: '南山',
          },
          {
            text: '龙华',
            value: '龙华',
          },
        ],
        onFilter: (value, record) => record.az.indexOf(value) > -1,
      },
      {
        title: '固资号',
        dataIndex: 'asset_id',
        slots: { customRender: 'asset_id' },
        sort: 'string',
      },
      {
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
        mergeKey: 'az',
      },
    ];
    const data = [
      {
        asset_id: 'a-1',
        area: '南京',
        az: '南京鼓楼',
        type: 'Virtual',
      },
      {
        asset_id: 'a-2',
        area: '深圳',
        az: '深圳龙华',
        type: 'Virtual1',
      },
      {
        asset_id: '13',
        area: '南京',
        az: '南京雨花台',
        type: 'Virtual',
      },
      {
        asset_id: '20',
        area: '深圳',
        az: '深圳龙华',
        type: 'Virtual',
      },
      {
        asset_id: '12',
        area: '南京',
        az: '南京浦口',
        type: 'Virtual',
      },
      {
        asset_id: '4',
        area: '深圳',
        az: '深圳宝安',
        type: 'Virtual1',
      },
      {
        asset_id: '21',
        area: '南京',
        az: '南京浦口',
        type: 'Virtual',
      },
      {
        asset_id: '8',
        area: '深圳',
        az: '深圳宝安',
        type: 'Virtual',
      },
      {
        asset_id: '19',
        area: '南京',
        az: '南京雨花台',
        type: 'Virtual',
      },
      {
        asset_id: '24',
        area: '深圳',
        az: '深圳宝安',
        type: 'Virtual',
      },
    ];
    return {
      data,
      columns,
      test: (record) => {
        console.log(record);
      },
    };
  },
});
</script>
```
