import http from '/@/utils/http/index';

enum Api {
  Material = '/material',
  MaterialType = '/material/type',
  Warehouse = '/warehouse',
  WarehouseType = '/warehouse/type',
}
export const product = ({ api, method, data }: { api: string, method: string, data: any }) => {
  return http.request({
    url: api,
    method,
    data,
  });
};
