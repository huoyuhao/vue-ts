/**
 * 将一维数组根据key的值转换为对象数组
 * @param {Array} arr 对象数组
 * @param {String} key 排序的根据
 * ['sex'， [{ name: 'liam', sex: 'man' }, { name: 'william', sex: 'man' },
 * { name: 'lucy', sex: 'woman' }, { name: 'lisa', sex: 'woman' }]]
 * { man: [{ name: 'liam', sex: 'man' }, { name: 'william', sex: 'man' }]
 *   woman: [{ name: 'lucy', sex: 'woman' }, { name: 'lisa', sex: 'woman' }]}
 */

export const transArrByKey = (data: any[], key: string) => {
  const result: {[k:string]: any } = {};
  data.forEach((item) => {
    const content = item[key];
    if (!Object.prototype.hasOwnProperty.call(result, content)) {
      (result[content] as []) = [];
    }
    result[content].push(item);
  });
  return result;
};
/**
 * @param {Array} data 对象数组
 * @param {String} key 排序的根据
 * @description 根据数组中的key来对数组对象排序
 */
export const sortArrByKey = (data: any[], key: string) => {
  const result: {[k:string]: any } = {};
  data.forEach((element) => {
    const type = element[key];
    if (!result[type]?.length) {
      result[type] = [];
    }
    result[type].push(element);
  });
  return Object.values(result).flat();
};
