<template>
  <div>
    <h2> You need to log in to proceed. </h2>
    <form @submit.prevent="logIn" id="input-form">
      <p>Please enter your email</p>
      <input v-model="email" type="text" class="input-field" placeholder="email">
      <p>Please enter your password</p>
      <input v-model="password" type="password" class="input-field" placeholder="password">
      <input class="submit-button" value="Log in" type="submit">
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    logIn() {
      fetch('/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      })
        .then(res => res.json())
        .then(res => this.$emit('logIn', res))
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

.input-field {
  height: 40px;
  margin-bottom: 20px;
  padding: 0 5px;
  border: 1px solid $primary-color;
  border-radius: 50;
}

.submit-button {
  @include button;

  width: 40%;
  margin: 30px 0;
  align-self: center;
}
</style>
