import 'normalize.css';
import './assets/style/common.scss';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'lib-flexible/flexible';
import { get, post } from './utils/fetch';
Vue.prototype.$get = get;
Vue.prototype.$post = post;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
