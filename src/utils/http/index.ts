
// 接口响应通过格式
export interface HttpRequest {
  method: string
  url: string
  data?: any
  timeout?: number
}
// 接口响应通过格式
export interface HttpResponse {
  code: number
  detail: any
  msg: string
}
import { AxiosPromise } from "axios";
import { Interceptors } from "./axios";
import { message } from 'ant-design-vue';
// 请求配置
export class HttpServer {
  axios: any;
  // 获取axios实例
  constructor() {
    this.axios = new Interceptors().getInterceptors();
  }
  // 简单封装一下方法
  request(config: HttpRequest): AxiosPromise {
    return new Promise((resolve, reject) => {
      this.axios(config).then((res: HttpResponse) => {
        if (res.code === 0) {
          resolve(res?.detail);
        } else if (res.code === -2){ // 多次请求取消
          console.log('请求多次。');
        } else {
          const msg = res?.msg || '系统繁忙，请稍后重试';
          message.error(msg);
          reject(msg);
        }
      }).catch((err: any) => {
        err && err?.msg && message.error(err?.msg);
        console.log(err);
        reject(err);
      });
    });
  }
}

const http = new HttpServer()

export default http;
