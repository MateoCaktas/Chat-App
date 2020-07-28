import App from './App.vue';
import router from './router';
import Vue from 'vue';
import VueCookie from 'vue-cookie';

Vue.config.productionTip = false;
Vue.use(VueCookie);

new Vue({
  router,
  render: function (h) { return h(App); }
}).$mount('#app');
