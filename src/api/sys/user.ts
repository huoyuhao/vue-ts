import http from '/@/utils/http/index';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/hello?name=Jaunte',
  GetPermCode = '/getPermCode',
}

export const GetUserInfo = () => {
  return http.request({
    url: Api.GetUserInfo,
    method: 'get',
  });
};
