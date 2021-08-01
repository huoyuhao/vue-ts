import http from '/@/utils/http/index';

enum Api {
  Login = '/login',
}

export const sys = ({ api, method, data }: { api: string, method: string, data: any }) => {
  return http.request({
    url: api,
    method,
    data,
  });
};
