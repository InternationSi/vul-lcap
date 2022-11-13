/*
 * @Author: sfy
 * @Date: 2022-11-12 23:32:25
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-13 15:35:20
 * @FilePath: /vulture/src/api/index.ts
 * @Description: update here
 */
import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { Config } from './type';
import { BASE_URL, TIME_OUT } from './env';
import qs from 'qs';

// 导出的属性和方法比较多 所以使用类来进行封装
// 因为类具有比较好的封装性
class Api {
  instance: AxiosInstance;

  constructor(config: Config) {
    // 每次创建实例的时候，都调用axios.create方法
    // axios.create可以返回一个axios实例
    // 这样保证我们可以使用不同的配置创建多个axios实例
    this.instance = axios.create(config);
    this.instance.defaults.transformRequest = [
      function (data, headers) {
        if (headers) {
          const contentType: any =
            headers['Content-Type'] || headers['content-type'];
          if (contentType?.indexOf('application/x-www-form-urlencoded') >= 0) {
            return qs.stringify(data);
          }
        }
      },
      // Do whatever you want to transform the data
    ];

    // 如果存在实例级别的拦截器 就使用拦截器
    // 这是针对于每一个请求特有的拦截器 --- 实例拦截
    // 这里的操作也可以通过transformRequest和transformResponse配置项来进行实现
    if (config.interceptor) {
      const { interceptor } = config;
      this.instance.interceptors.request.use(
        interceptor.requestInterceptor,
        interceptor.requestInterceptorCatch
      );
      this.instance.interceptors.response.use(
        interceptor.responseInterceptor,
        interceptor.responseInterceptorCatch
      );
    }

    // 访问私有方法
    this.registerGlobalInterceptor(config);
  }

  // 这是所有实例共有的拦截器 --- 全局拦截
  // 如果存在多个拦截器，那么多个拦截器都会被执行
  registerGlobalInterceptor(option: Config) {
    this.instance.interceptors.request.use(
      (config) => config,
      (err) => err
    );
    this.instance.interceptors.response.use(
      (res) => res.data,
      (err) => err
    );
  }

  request(config: AxiosRequestConfig) {
    return this.instance.request(config);
  }
}

export default new Api({
  baseURL: BASE_URL,
  // timeout: TIME_OUT,

  // 不同的实例可能有不同的拦截器
  // 所以我们将拦截器封装成一个扩展属性进行传入
  // interceptor: {
  //   requestInterceptor: config => {
  //     console.log('请求成功')
  //     return config
  //   },
  //   requestInterceptorCatch: err => console.error(err),
  //   responseInterceptor: res => res.data,
  //   responseInterceptorCatch:  err => console.error(err)
  // }
});
