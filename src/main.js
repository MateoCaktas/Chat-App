import App from './App.vue';
import CustomButton from './components/common/Button';
import router from './router';
import Vue from 'vue';
import VueCookie from 'vue-cookie';

Vue.config.productionTip = false;
Vue.use(VueCookie);
Vue.component('custom-button', CustomButton);
new Vue({
  router,
  render: function (h) { return h(App); }
}).$mount('#app');
