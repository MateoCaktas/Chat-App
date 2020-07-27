import App from './App.vue';
import axios from 'axios';
import router from './router';
import Vue from 'vue';
import VueCookie from 'vue-cookie';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(VueCookie);

new Vue({
  router,
  render: function (h) { return h(App); }
}).$mount('#app');
