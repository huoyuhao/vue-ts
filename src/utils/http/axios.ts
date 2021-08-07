import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
// import { setToken, getToken, getTokenKey, removeToken, } from "./cookie";

import { addPending, removePending } from './pending';

const showStatus = (status: number) => {
  let message = '';
  switch (status) {
    case 400:
      message = '请求错误(400)';
      break;
    case 401:
      message = '未授权，请重新登录(401)';
      break;
    case 403:
      message = '拒绝访问(403)';
      break;
    case 404:
      message = '请求出错(404)';
      break;
    case 408:
      message = '请求超时(408)';
      break;
    case 500:
      message = '服务器错误(500)';
      break;
    case 501:
      message = '服务未实现(501)';
      break;
    case 502:
      message = '网络错误(502)';
      break;
    case 503:
      message = '服务不可用(503)';
      break;
    case 504:
      message = '网络超时(504)';
      break;
    case 505:
      message = 'HTTP版本不受支持(505)';
      break;
    default:
      message = `连接出错(${status})!`;
  }
  return `${message}，请检查网络或联系管理员！`;
};

export class Interceptors {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL as string,
      timeout: 30 * 1000,
      withCredentials: true, // 跨域请求
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;',
      },
    });
    this.setupInterceptors();
  }
  // 初始化拦截器
  setupInterceptors() {
    // 请求接口拦截器
    this.instance.interceptors.request.use(
      (config:AxiosRequestConfig) => {
        removePending(config); // 在请求开始前，对之前的请求做检查取消操作
        addPending(config); // 将当前请求添加到 pending 中
        // 判断一下是否有cookie 如果有的话则把cookie放入请求头中
        // if (getToken()) {
        //   config.headers[getTokenKey()] = getToken();
        // }
        return config;
      },
      () => {
        // 错误抛到业务代码
        const error = { data: { msg: '服务器异常，请联系管理员！' } };
        return Promise.resolve(error);
      },
    );
    // 响应拦截器
    this.instance.interceptors.response.use((response:AxiosResponse) => {
      removePending(response); // 在请求结束后，移除本次请求
      return response.data;
    }, (error: any) => {
      let msg;
      let code = -1;
      if (axios.isCancel(error)) {
        msg = '';
        code = -2;
      } else {
        const { status } = error.response;
        if (status < 200 || status >= 300) {
          // 处理http错误，抛到业务代码
          msg = showStatus(status);
        }
      }
      return Promise.resolve({ msg, code });
    });
  }
  // 返回一下
  getInterceptors() {
    return this.instance;
  }
}
