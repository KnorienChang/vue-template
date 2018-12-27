import axios from 'axios';
// 因本身业务的影响，如果需要在这里统一处理一些错误的toast信息，而要引入组件的话
// 可以在这里单独按需引入所需要的组件，然后在.babel.config.js配置文件里配置按需引入插件
// 因加样式加载顺序会覆盖样式的问题，这里单独引入处理该组件的样式文件。主要针对于自身样式需求处理
// 如果不需要可以直接删除这两个组件和样式的引入，然后删除.babel.config.js的plugin的相关配置
import { Message } from 'element-ui';
import './../assets/style/toast.scss';

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.VUE_APP_HTTP
      : process.env.BASE_URL,
  timeout: 20000,
  withCredentials: true
});

instance.interceptors.request.use(
  config => {
    Message({
      type: 'success',
      message: 'success',
      duration: 0
    });
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
