<template>
  <div>
    <h2> You need to log in to proceed. </h2>
    <form @submit.prevent="logIn" id="input-form">
      <p>Please enter your email</p>
      <input v-model="email" type="text" class="login-input-field" placeholder="email">
      <p>Please enter your password</p>
      <input v-model="password" type="password" class="login-input-field" placeholder="password" autocomplete="on">
      <CustomButton
        class="login-button"
        value="Log In"
        type="submit" />
    </form>
  </div>
</template>

<script>

import CustomButton from '../common/Button';
import Request from '../../services';

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
      this.httpRequest = new Request('/login');
      this.httpRequest.sendRequest('post', userCredentials)
        .then(res => res.json())
        .then(res => this.$emit('logIn', res))
        .catch(err => console.log(err));
    }
  },
  components: {
    CustomButton
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
