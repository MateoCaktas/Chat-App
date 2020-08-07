<template>
  <transition name="fade-user-item">
    <div v-if="isActive" class="user-window">
      <div class="user-info">
        <h1> {{ user.fullName }}</h1>
        <p> {{ user.email }}</p>
      </div>
      <div class="button-options">
        <button @click="showModal = true" class="edit-button"> Edit user </button>
        <button v-if="!loggedUser" @click="deleteUser" class="delete-button"> Delete user </button>
        <transition name="view-edit-user-modal">
          <EditUserModal
            v-if="showModal"
            @close="showModal = false"
            @update-user-list="(currentUser, action) => $emit('change-user-data', currentUser, action)"
            :user="user" />
        </transition>
      </div>
    </div>
  </transition>
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
      showModal: false,
      isActive: true
    };
  },
  computed: {
    loggedUser() {
      return this.user.id === JSON.parse(localStorage.loggedUser).id;
    }
  },
  methods: {
    deleteUser() {
      this.isActive = false;
      setTimeout(() => {
        this.$emit('change-user-data', this.user, 'delete');
      }, 500);
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
  flex: 2;
}

.button-options {
  display: flex;
  justify-content: space-around;
  flex: 1;
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

.fade-user-item-enter-active, .fade-user-item-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease;
}

.fade-user-item-enter, .fade-user-item-leave-to {
  opacity: 0;
}

.fade-user-item-enter-to, .fade-user-item-leave {
  opacity: 1;
}

.view-edit-user-modal-enter-active, .view-edit-user-modal-leave-active {
  transition: opacity 1s ease-in-out, transform 1s ease;
}

.view-edit-user-modal-enter, .view-edit-user-modal-leave-to {
  opacity: 0;
}

.view-edit-user-modal-enter-to, .view-edit-user-modal-leave {
  opacity: 1;
}
</style>
