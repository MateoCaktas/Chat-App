<template>
  <div id="app">
    <Header />
    <transition name="view">
      <router-view />
    </transition>
    <Footer />
  </div>
</template>

<script>

import Footer from './components/common/Footer';
import Header from './components/common/Header';

export default {
  name: 'app',
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

body {
  margin: 0;
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
