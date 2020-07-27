<template>
  <div class="header">
    <h1 class="title">
      Chat Application
    </h1>
    <div class="navigation-bar">
      <router-link to="/" class="navigation-link">Home</router-link>
      <router-link to="/hello-world" class="navigation-link">Hello World</router-link>
      <button @click="deleteCookie" to="/" class="navigation-link"> Logout</button>
      <router-link to="/login" class="navigation-link"> Login </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'custom-header',
  methods: {
    deleteCookie() {
      document.cookie = 'token=Expired; Expires=expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      if (this.$router.currentRoute.path !== '/login') {
        this.$router.push('login');
      }
    }
  }
};
</script>

<style scoped>
.header {
    height: auto;
    display:flex;
    flex-direction: column;
    width: 100%;
    background-color: rgb(0, 225, 255);
    color: white;
}
.title {
    height: 45px;
    margin: 5px;
    font-size: 40px;
}
.navigation-bar {
    display: flex;
    flex-direction: row;
    width:100%;
}
.navigation-link {
    color:white;
    margin: 10px 40px;
}
.navigation-link:hover {
    cursor: pointer;
}

.navigation-link:last-child {
    margin-left: auto;
}

@media only screen and (max-width: 370px) {
    .navigation-link {
        margin: 10px 15px;
    }
}
</style>
