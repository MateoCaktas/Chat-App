import Dashboard from '../components/user-management/Dashboard';
import Home from '../components/pages/Home.vue';
import Login from '../components/pages/Login.vue';
import Room from '../components/rooms/Room.vue';
import Rooms from '../components/rooms/Rooms.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/rooms/:id',
    name: 'Room',
    component: Room
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: Rooms
  },
  {
    path: '*',
    redirect: '/login'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const user = localStorage.loggedUser ? JSON.parse(localStorage.loggedUser) : null;

  if (to.name === 'Login') return next();
  // Check if token exists in the cookie
  if (document.cookie.split(';').filter(item => item.trim().startsWith('token=')).length === 0) return next('login');

  if (to.name !== 'Dashboard') return next();

  if (!user.isAdmin) return next('/');

  next();
});

export default router;
