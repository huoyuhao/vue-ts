import http from '/@/utils/http/index';

export const product = ({ api, method, data }: { api: string, method: string, data?: any }) => {
  return http.request({
    url: api,
    method,
    data,
  });
};
