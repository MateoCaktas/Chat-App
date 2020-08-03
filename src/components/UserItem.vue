<template>
  <div class="user-window">
    <div class="user-info">
      <h1> {{ user.fullName }}</h1>
      <p> {{ user.email }}</p>
    </div>
    <div class="button-options">
      <button @click="showModal = true" class="edit-button"> Edit user </button>
      <button v-if="!loggedUser" @click="$emit('changeUser', user, 'delete')" class="delete-button"> Delete user </button>
      <transition name="view">
        <EditUserModal
          v-if="showModal"
          @close="showModal = false"
          @updateUserList="(currentUser, action) => $emit('changeUser', currentUser, action)"
          :user="user" />
      </transition>
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
  computed: {
    loggedUser: function () {
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

.edit-button {
  @include button;

  background-color: $primary-color;
}

.delete-button {
  @include button;

  background-color: red;
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
