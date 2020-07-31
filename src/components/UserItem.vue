<template>
  <div class="user-window">
    <div class="user-info">
      <h1> {{ user.fullName }}</h1>
      <p> {{ user.email }}</p>
    </div>
    <div class="button-options">
      <button @click="showModal = true" class="edit-button"> Edit user </button>
      <button v-if="!loggedUser()" @click="$emit('changeUser', user, 'delete')" class="delete-button"> Delete user </button>
      <EditUserModal
        v-if="showModal"
        @close="showModal = false"
        @updateUserList="(currentUser, action) => $emit('changeUser', currentUser, action)"
        :user="user" />
    </div>
  </div>
</template>

<script>

import EditUserModal from './EditUserModal';

export default {
  name: 'user-item',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    loggedUser() {
      const loggedUser = JSON.parse(localStorage.user);
      return this.user.id === loggedUser.id;
    }
  },
  components: {
    EditUserModal
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 20px;
}

.user-window {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.user-info {
  display: flex;
  justify-content: space-around;
  width: 60%;
}

.button-options {
  display: flex;
  justify-content: space-around;
  width: 40%;
  margin-left: auto;
}

%button {
  width: 80px;
  height: 40px;
  margin: 5px;
  border: 1px solid gray;
}

.edit-button {
  @extend %button;

  background-color: rgb(0, 225, 255);
}

.delete-button {
  @extend %button;

  background-color: red;
}
</style>
