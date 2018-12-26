import axios from 'axios';

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
