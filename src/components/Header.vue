<template>
  <div class="header">
    <h1 class="title">
      Chat Application
    </h1>
    <div class="navigation-bar">
      <router-link to="/" class="navigation-link">Home</router-link>
      <router-link to="/about" class="navigation-link">About</router-link>
      <router-link v-if="isAdmin" to="/admin" class="navigation-link"> Dashboard </router-link>
      <router-link v-if="!isLoggedIn" to="/login" class="navigation-link"> Login </router-link>
      <button v-if="isLoggedIn" @click="logoutUser()" to="/" class="logout-button">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'custom-header',
  props: {
    user: Object()
  },
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false
    };
  },
  methods: {
    logoutUser() {
      localStorage.removeItem('user');
      document.cookie = 'token=Expired; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      this.isAdmin = false;
      this.isLoggedIn = false;
      this.$router.push('login')
        .catch(err => console.log(err));
    }
  },
  watch: {
    user(user) {
      this.isAdmin = user.isAdmin;
      user ? (this.isLoggedIn = true) : (this.isLoggedIn = false);
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  width: 100%;
  height: auto;
  color: white;
  flex-direction: column;
  background-color: rgb(0, 225, 255);
}

.title {
  height: 45px;
  margin: 5px;
  font-size: 40px;
}

.navigation-bar {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.navigation-link {
  margin: 10px 40px;
  color: white;
}

.navigation-link:hover {
  cursor: pointer;
}

.logout-button {
  margin: 10px 40px;
  color: white;
  font-size: 16px;
  background-color: rgb(0, 225, 255);
  text-decoration: underline;
  border: none;
}

.logout-button:hover {
  cursor: pointer;
}

.navigation-bar > *:last-child {
  margin-left: auto;
}

@media only screen and (max-width: 370px) {
  .navigation-link {
    margin: 10px 15px;
  }
}
</style>
