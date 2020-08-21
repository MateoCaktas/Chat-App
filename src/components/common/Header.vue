<template>
  <div class="header">
    <h1 class="title">
      Chat Application
    </h1>
    <div class="navigation-bar">
      <router-link to="/" class="navigation-link">Home</router-link>
      <router-link to="/about" class="navigation-link" class-active="navigation-link-active">About</router-link>
      <div v-if="isAdmin" class="admin-navigation-links">
        <router-link to="/admin" class="navigation-link"> Dashboard </router-link>
        <router-link to="/admin/rooms" class="navigation-link"> Rooms </router-link>
      </div>
      <router-link v-if="!isLoggedIn" to="/login" class="navigation-link"> Login </router-link>
      <div v-else>
        <span class="user-label">Hello, {{ user.fullName }}</span>
        <custom-button
          @click="logoutUser"
          class="logout-button">
          <div slot="value">Logout</div>
        </custom-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'custom-header',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false
    };
  },
  methods: {
    logoutUser() {
      this.isAdmin = false;
      this.isLoggedIn = false;
      return this.$emit('logout');
    }
  },
  watch: {
    user(user) {
      this.isAdmin = user.isAdmin;
      this.isLoggedIn = !!user;
    }
  }
};
</script>

<style lang="scss" scoped>

.header {
  display: flex;
  width: 100%;
  height: auto;
  color: $secondary-color;
  flex-direction: column;
  background-color: $primary-color;
  border-top: 1px solid $tertiary-color;
  border-bottom: 1px solid $tertiary-color;
}

.title {
  height: 45px;
  margin: 5px;
  font-size: 40px;
}

.navigation-bar {
  display: flex;
  flex-direction: row;
  flex: 1;
}

.navigation-link, .admin-navigation-links {
  margin: 10px 30px;
  color: $secondary-color;
  font-size: 20px;
  text-decoration: none;
}

.navigation-link:hover {
  transform: scale(1.1);
  cursor: pointer;
}

.navigation-link.router-link-exact-active {
  transform: scale(1.25);
  font-weight: bold;
}

.user-label {
  position: absolute;
  top: 40px;
  margin-left: 20px;
  font-size: 14px;
}

.logout-button {
  margin: 10px 40px;
  font-size: 20px;
  border: none;
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
