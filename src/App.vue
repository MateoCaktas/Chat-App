<template>
  <div id="app">
    <Header
      @logout="logOutUser"
      :user="user" />
    <transition name="view">
      <router-view
        @logIn="logInUser" />
    </transition>
    <Footer />
  </div>
</template>

<script>

import Footer from './components/Footer';
import Header from './components/Header';

export default {
  name: 'app',
  data() {
    return {
      user: {}
    };
  },
  methods: {
    logInUser(response) {
      this.user = response.user;
      localStorage.user = JSON.stringify(response.user);

      this.$cookie.set('token', response.jwt);
      this.$router.push({ name: 'Dashboard' })
      .catch(() => {});
    },
    logOutUser() {
      localStorage.removeItem('user');
      document.cookie = 'token=Expired; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      this.$router.push({ name: 'Login' })
      .catch(err => console.log(err));
    }
  },
  components: {
    Header,
    Footer
  }
};
</script>

<style>
#app {
  margin-bottom: 60px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.view-enter-active, .view-leave-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease;
}

.view-enter-active {
  transition-delay: 0.3s;
}

.view-enter, .view-leave-to {
  opacity: 0;
}

.view-enter-to, .view-leave {
  opacity: 1;
}
</style>
