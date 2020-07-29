<template>
  <div>
    <h2> You need to log in to proceed. </h2>
    <div class="input-form">
      <p>Please enter your email</p>
      <input v-model="email" type="text" class="input-field" placeholder="email">
      <p>Please enter your password</p>
      <input v-model="password" type="password" class="input-field" placeholder="password">
      <button @click="logIn" class="input-button"> Log in</button>
    </div>
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
        .then(res => {
          localStorage.user = JSON.stringify(res.user);
          this.$cookie.set('token', res.jwt);
          return this.$emit('logIn', res.user);
        })
        .then(() => this.$router.push('/admin').catch(() => {}))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss" scoped>

$color-teal: rgb(0,225,255);

.input-form {
  display: flex;
  flex-direction: column;
  width: 40%;
  margin: auto;
}

.input-field {
  height: 40px;
  margin-bottom: 20px;
  padding: 0 5px;
  border: 1px solid $color-teal;
  border-radius: 50;
}

.input-button {
  width: 60%;
  height: 40px;
  margin-top: 10px;
  color: white;
  background-color: $color-teal;
  border: none;
  align-self: center;
}
</style>
