<template>
  <div>
    <header class="d-table-header">
      <a-row type="flex" justify="space-between">
        <a-col>
          <a-row>
            <slot name="left"></slot>
            <a-col v-if="isSearch">
              <div :style="isSearch.style ? isSearch.style : 'width: 500px'"></div>
              <a-textarea
                v-model:value="searchInput"
                placeholder="多条件查询：并集以'，'或'；'分隔；交集以'+'分隔"
                allow-clear
                :autoSize="{ minRows: 1, maxRows: 10 }"
                :style="`position: absolute; z-index: 99; border-radius: 4px 0px 0px 4px;${
                  isSearch.style ? isSearch.style : 'width: 500px'
                }`"
              />
            </a-col>
            <a-col v-if="isSearch">
              <a-button type="primary" @click="search" style="border-radius: 0px 4px 4px 0px">
                <template #icon>
                  <SearchOutlined />
                </template>
              </a-button>
            </a-col>
            <a-col>
              <slot name="header"></slot>
            </a-col>
            <a-col>
              <a-button type="primary" shape="round" v-if="exportTitle !== ''" @click="onExport">
                <template #icon>
                  <CloudDownloadOutlined />
                  导出
                </template>
              </a-button>
            </a-col>
            <a-col>
              <slot name="final"></slot>
            </a-col>
          </a-row>
        </a-col>
        <a-col>
          <slot name="right"></slot>
        </a-col>
      </a-row>
    </header>
    <a-table
      class="d-table-content"
      :columns="tableColumns"
      :dataSource="tableList"
      :pagination="page"
      :rowKey="rowKey"
      :rowSelection="rowSelection"
      :showHeader="showHeader"
      :loading="loading"
      :defaultExpandAllRows="defaultExpandAllRows"
      :locale="{ filterConfirm: '确定', filterReset: '重置', emptyText: '暂无数据' }"
      size="small"
      bordered
      @expand="expand"
      @change="change"
    >
      <template v-for="item in Object.keys($slots)" #[item]="data">
        <slot :name="item" v-bind="data" />
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { CloudDownloadOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, toRefs, computed, watchEffect, watch, ref, onMounted, PropType } from 'vue';
import { useRoute } from 'vue-router';
import { sortArrByKey } from '/@/utils/fun/common';
import XLSX from 'xlsx';

export default defineComponent({
  name: 'DTable',
  components: { CloudDownloadOutlined, SearchOutlined },
  props: {
    rowKey: {
      type: [String, Function],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    isSearch: {
      type: [Boolean, Object],
      default: false,
    },
    searchValue: {
      type: String,
      default: '',
    },
    exportTitle: {
      type: String,
      default: '',
    },
    pagination: {
      type: Boolean,
      default: true,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    defaultExpandAllRows: {
      type: Boolean,
      default: false,
    },
    rowSelection: Object,
    columns: {
      type: Array as PropType<any[]>,
      default: () => {
        return [];
      },
    },
    dataSource: {
      type: Array,
      default: () => {
        return [];
      },
    },
    mergeKey: {
      type: Array as PropType<string[]>,
      default: () => {
        return [];
      },
    },
  },
  setup(props, { slots, emit }) {
    const route = useRoute();
    const searchInput = ref<string>('');
    const state = reactive({
      dataList: [] as any[],
      currentTable: [] as any[],
      isMerge: props.mergeKey?.length > 0, // 是否合并
    });
    state.dataList = props.dataSource;
    // 分页设置
    const page = computed(() => {
      if (props.pagination === false || props.dataSource.length < 10) {
        return false;
      }
      return {
        showSizeChanger: true,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '100'],
        showTotal: (total:number, range:number[]) => {
          return `显示${range[0]}-${range[1]}  总计 ${total} 条数据   `;
        },
      };
    });
    // ant-table组件分页、排序、筛选变化时触发
    const change = ({ current, pageSize }: { current: number, pageSize: number}, _filters: any, sorter: string[], { currentDataSource }: { currentDataSource: [] }) => {
      const isSorter = 'order' in sorter;
      if (isSorter) {
        state.isMerge = false; // 使用排序不进行合并
      } else {
        state.isMerge = true;
        state.currentTable = currentDataSource.splice((current - 1) * pageSize, pageSize);
      }
    };
    watch(
      () => {
        return props.dataSource;
      },
      () => {
        state.dataList = props.dataSource;
        search();
      },
    );

    // 搜索功能
    const search = () => {
      const searchData = searchInput.value.trim();
      emit('update:searchValue', searchData);
      let result = [];
      if (!searchData) {
        result = props.dataSource as [];
      } else {
        let searchMatch = searchData.trim().replace(/\s+/g, '')
          .split(/\+/);
        if (searchMatch.length > 1) {
          // and +
          result = props.dataSource.filter((item) => {
            return searchMatch.every((search) => {
              return JSON.stringify(Object.values(item as any)).indexOf(search) > -1;
            });
          });
        } else {
          // or , ， ; ；空格
          searchMatch = searchData
            .trim()
            .replace(/[\r\n]/g, '')
            .split(/\s+|,|，|；|;/);
          result = props.dataSource.filter((item) => {
            return searchMatch.some((search) => {
              return JSON.stringify(Object.values(item as any)).indexOf(search) > -1;
            });
          });
        }
      }
      state.dataList = result;
      emit('getList', result);
    };
    watch(
      () => {
        return props.searchValue;
      },
      () => {
        searchInput.value = props.searchValue;
        search();
      },
    );
    onMounted(() => {
      if (route.query.searchTable) {
        searchInput.value = String(route.query.searchTable);
        search();
      }
    });
    // 数据处理
    const tableList = computed(() => {
      const merge = props.mergeKey;
      // 如果有合并，将数据根据合并列排序
      if (props.mergeKey?.length <= 0) return state.dataList;
      let result = state.dataList;
      // 根据merge数组倒序的值依次进行排序
      merge.reverse().forEach((element) => {
        result = sortArrByKey(result, element as string);
      });
      return result;
    });

    watchEffect(() => {
      if (page.value) {
        state.currentTable = (tableList.value && tableList.value.slice(0, page.value.pageSize)) || [];
      } else {
        state.currentTable = tableList.value;
      }
    });
    const mergeData = computed(() => {
      if (!state.isMerge) return null;
      // 因为初始化已经排序，所以根据列表获取连续相同列
      // 比如[a1,a2,a2,a3,a3,a2,a3] => [1,2,0,2,0,1,1]
      const mergeData = {} as any;
      props.mergeKey.forEach((key:string) => {
        mergeData[key] = new Array(state.currentTable.length);
      });
      const reverseList = [...state.currentTable].reverse();
      if (reverseList.length !== 0) {
        reverseList.reduce((pre, next, index) => {
          props.mergeKey.forEach((key) => {
            if (index === 1) mergeData[key][0] = 1;
            mergeData[key][index] = 1;
            if (pre[key] === next[key]) {
              mergeData[key][index] = mergeData[key][index - 1] + 1;
              mergeData[key][index - 1] = 0;
            }
          });
          return next;
        });
        return mergeData;
      }
      return null;
    });

    const tableColumns = computed(() => {
      const column = props.columns;
      return column.map((element) => {
        const result = { ...element };
        // 处理筛选
        if (result.filter) {
          const filters: { text: string; value: string; }[] = [];
          const set = new Set();
          tableList.value.forEach((item) => {
            if (item[result.dataIndex]) {
              set.add(item[result.dataIndex]);
            }
          });
          // 对筛选列表进行排序
          const setSort = Array.from(set).sort() as string[];
          setSort.forEach((value) => {
            filters.push({
              text: value,
              value,
            });
          });
          if (set.size > 1) {
            result.filters = filters;
            result.onFilter = (value:string, record:any) => {
              return record[result.dataIndex] === value;
            };
          }
        }

        // 处理排序sort默认封装
        if (result.sort) {
          if (result.sort === 'string') {
            result.sorter = (a : any, b : any) => {
              // 根据JSON之后的字符串大小进行比较
              const str1 = JSON.stringify(a[result.dataIndex] || '').toUpperCase();
              const str2 = JSON.stringify(b[result.dataIndex] || '').toUpperCase();
              if (str1 < str2) return -1;
              if (str1 > str2) return 1;
              return 0;
            };
          } else if (result.sort === 'number') {
            result.sorter = (a : any, b : any) => {
              return parseFloat(a[result.dataIndex]) - parseFloat(b[result.dataIndex]);
            };
          }
        }
        // 处理合并
        if (state.isMerge && mergeData.value) {
          const key = result.mergeKey || result.dataIndex;
          if (props.mergeKey.includes(key)) {
            // 当前是合并列
            result.customRender = ({ text, index, record }:{ text:any, index:number, record:any }) => {
              const obj = {
                children: text,
                props: {} as { rowSpan: number },
              };
              if (slots[result.dataIndex]) {
                obj.children = (slots[result.dataIndex] as any)({ text, index, record });
              }
              const mergeIndex = state.currentTable.length - index - 1;
              obj.props.rowSpan = mergeData.value[key][mergeIndex] as number;
              return obj;
            };
          }
        }
        return result;
      });
    });

    // 导出excel表格
    const { exportTitle } = props;
    let exportList = [] as any[];
    watch(
      tableList,
      () => {
        exportList = tableList.value;
      },
      { immediate: true },
    );
    const onExport = () => {
      const wb = XLSX.utils.book_new(); // 新建工作簿
      const header:any = {};
      const index:any = {};
      const list: any[] = [];
      let sheet = {};
      tableColumns.value.forEach((item) => {
        if (item.dataIndex !== 'action') {
          header[item.dataIndex] = item.title;
          index[item.dataIndex] = item.dataIndex;
        }
      });
      exportList.forEach((item) => {
        const dataItem:any = {};
        Object.keys(header).forEach((key) => {
          dataItem[key] = item[key];
        });
        list.push(dataItem);
      });
      sheet = XLSX.utils.json_to_sheet([...[header], ...[index], ...list], { skipHeader: true }); // 新建工作表
      XLSX.utils.book_append_sheet(wb, sheet, 'name'); // 工作表添加到工作簿中
      XLSX.writeFile(wb, `${exportTitle}.xlsx`);
    };
    const expand = (expanded:any, record:any) => {
      emit('expand', expanded, record);
    };

    return {
      ...toRefs(props),
      searchInput,
      tableList,
      tableColumns,
      state,
      page,
      change,
      expand,
      search,
      onExport,
    };
  },
});
</script>
<style lang="less" scoped>
.d-table-header {
  margin-bottom: 10px;

  ::v-deep(button) {
    margin-right: 10px;
  }

  .d-table-search {
    min-width: 520px;
    width: 30%;
    min-width: 400px;
  }
}

.d-table-content {
  // table字体大小重置
  & ::v-deep(table) {
    font-size: 12px;
  }

  // 排序icon位置、大小重置
  & ::v-deep(.ant-table-column-sorter-inner) {
    font-size: 14px;
  }

  & ::v-deep(.ant-table-column-sorter svg) {
    font-size: 10px;
  }
}
</style>
