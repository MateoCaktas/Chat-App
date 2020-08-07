import About from '../components/Pages/About';
import Dashboard from '../components/user-management/Dashboard';
import Home from '../components/Pages/Home.vue';
import LoginForm from '../components/Pages/LoginForm.vue';
import Rooms from '../components/Rooms/Rooms.vue';
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
    name: 'Login',
    component: LoginForm
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/admin/rooms',
    name: 'Rooms',
    component: Rooms
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name === 'Login') return next();
  // Check if token exists in the cookie
  if (document.cookie.split(';').filter(item => item.trim().startsWith('token=')).length === 0) return next('login');
  const user = JSON.parse(localStorage.loggedUser);

  if (to.name !== 'Dashboard' && to.name !== 'Rooms') return next();
  if (!user.isAdmin) return next('/');

  next();
});

export default router;
