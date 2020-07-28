import About from '../components/About';
import Home from '../components/Home.vue';
import LoginForm from '../components/LoginForm.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'login',
    component: LoginForm
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    // Check if token exists in the cookie
    if (document.cookie.split(';').filter(item => item.trim().startsWith('token=')).length) {
      next();
    } else {
      next('login');
    }
  } else {
    next();
  }
});

export default router;
