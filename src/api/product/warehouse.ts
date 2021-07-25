import http from '/@/utils/http/index';

enum Api {
  Warehouse = '/warehouse',
  WarehouseType = '/warehouse/type',
}
export const GetWarehouse = () => {
  return http.request({
    url: Api.Warehouse,
    method: 'get',
  });
};
export const UpdateWarehouse = () => {
  return http.request({
    url: Api.Warehouse,
    method: 'put',
  });
};
export const DeleteWarehouse = () => {
  return http.request({
    url: Api.Warehouse,
    method: 'delete',
  });
};
export const CreateWarehouse = () => {
  return http.request({
    url: Api.Warehouse,
    method: 'post',
  });
};

export const GetWarehouseType = () => {
  return http.request({
    url: `${Api.WarehouseType}?warehouseTypeId=1`,
    method: 'get',
  });
};
export const UpdateWarehouseType = () => {
  return http.request({
    url: Api.WarehouseType,
    method: 'put',
  });
};
export const DeleteWarehouseType = (data: any) => {
  return http.request({
    url: Api.WarehouseType,
    method: 'delete',
    data,
  });
};
export const CreateWarehouseType = () => {
  return http.request({
    url: Api.WarehouseType,
    method: 'post',
  });
};
