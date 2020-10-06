<template>
  <div>
    <h2> You need to log in to proceed. </h2>
    <form
      @submit.prevent="logIn"
      id="input-form">
      <p>Please enter your email</p>
      <input
        v-model="email"
        type="text"
        class="login-input-field"
        placeholder="email">
      <p>Please enter your password</p>
      <input
        v-model="password"
        type="password"
        class="login-input-field"
        placeholder="password"
        autocomplete="on">
      <custom-button
        class="login-button"
        type="submit">
        Log In
      </custom-button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      httpRequest: {}
    };
  },
  methods: {
    ...mapActions(['logUser']),
    logIn() {
      const userCredentials = {
        email: this.email,
        password: this.password
      };

      this.logUser(userCredentials)
       .then(() => {
         this.$router.push({ name: 'Dashboard' })
          .catch(() => {});
       })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss" scoped>

#input-form {
  display: flex;
  flex-direction: column;
  width: 40%;
  margin: auto;
}

.login-input-field {
  height: 40px;
  margin-bottom: 20px;
  padding: 5px 15px;
  border: 2px solid $primary-color;
  border-radius: 50px;
  box-shadow: 5px 5px;
}

.login-input-field:focus {
  outline: none;
}

.login-button {
  width: 40%;
  margin: 30px 0;
  font-size: 18px;
  align-self: center;
}

</style>
