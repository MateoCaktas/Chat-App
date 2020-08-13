<template>
  <div>
    <h2> You need to log in to proceed. </h2>
    <form @submit.prevent="logIn" id="input-form">
      <p>Please enter your email</p>
      <input v-model="email" type="text" class="input-field" placeholder="email">
      <p>Please enter your password</p>
      <input v-model="password" type="password" class="input-field" placeholder="password" autocomplete="on">
      <input class="submit-button" value="Log in" type="submit">
    </form>
  </div>
</template>

<script>

import { Request } from '../../services';

export default {
  data() {
    return {
      email: '',
      password: '',
      httpRequest: {}
    };
  },
  methods: {
    logIn() {
      const userCredentials = {
        email: this.email,
        password: this.password
      };

      this.httpRequest.sendRequest(userCredentials, 'post')
        .then(res => res.json())
        .then(res => this.$emit('logIn', res))
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.httpRequest = new Request('/login');
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

.input-field {
  height: 40px;
  margin-bottom: 20px;
  padding: 5px 15px;
  border: 2px solid $primary-color;
  border-radius: 50px;
  box-shadow: 5px 5px;
}

.input-field:focus {
  outline: none;
}

.submit-button {
  @include button;

  width: 40%;
  margin: 30px 0;
  font-size: 18px;
  align-self: center;
}
</style>
