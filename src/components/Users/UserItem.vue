<template>
  <transition name="fade-user-item">
    <div
      v-if="isActive"
      class="user-window">
      <div class="user-info">
        <h1> {{ user.fullName }}</h1>
        <p> {{ user.email }}</p>
      </div>
      <div class="button-options">
        <custom-button
          @click="openModal"
          class="edit-button">
          Edit User
        </custom-button>
        <custom-button
          v-if="!loggedInUser"
          @click="deleteUser"
          class="delete-button">
          Delete User
        </custom-button>
        <transition name="view-edit-user-modal">
          <UserModal
            v-if="showModal"
            @close="showModal = false"
            @update-user-list="saveUser"
            :user="user"
            :actiontype="actionType" />
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>

import { mapGetters } from 'vuex';
import UserModal from './UserModal';

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
      isActive: true,
      actionType: 'edit'
    };
  },
  computed: {
    ...mapGetters(['loggedUser']),
    loggedInUser() {
      return this.user.id === this.loggedUser.id;
    },
    validateFields() {
      return this.user.firstName && this.user.lastName && this.user.email && this.user.password;
    }
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    deleteUser() {
      this.isActive = false;
      setTimeout(() => {
        this.$emit('change-user-data', this.user, 'delete');
      }, 500);
    },
    saveUser(currentUser) {
      this.$emit('change-user-data', currentUser, 'edit');
      this.showModal = false;
    }
  },
  components: {
    UserModal
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

.delete-button {
  background-color: red;
}

.fade-user-item-enter-active, .fade-user-item-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease;
}

.fade-user-item-enter, .fade-user-item-leave-to {
  opacity: 0;
}

.view-edit-user-modal-enter-active, .view-edit-user-modal-leave-active {
  transition: opacity 1s ease-in-out, transform 1s ease;
}

.view-edit-user-modal-enter, .view-edit-user-modal-leave-to {
  opacity: 0;
}

</style>
