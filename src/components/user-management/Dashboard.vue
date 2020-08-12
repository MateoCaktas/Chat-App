<template>
  <div>
    <h1>Admin dashboard</h1>
    <div v-for="user in users" :key="user.id">
      <UserItem
        @change-user-data="changeUserData"
        :user="user" />
    </div>
    <button @click="showModal = true" class="add-user-button">Add user</button>
    <transition name="fade-add-user-modal">
      <UserModal
        v-if="showModal"
        @close="showModal = false"
        @update-user-list="changeUserData"
        :actiontype="actionType" />
    </transition>
  </div>
</template>

<script>

import { sendRequest } from '../../services/index';
import UserItem from '../Users/UserItem';
import UserModal from '../Users/UserModal';

export default {
  name: 'admin-dashboard',
  data() {
    return {
      users: [],
      showModal: false,
      actionType: 'add'
    };
  },
  methods: {
    addUser(user) {
      sendRequest('/users', user, 'post')
        .then(user => user.json())
        .then(user => {
          this.users.push(user);
        });
    },
    deleteUser(user) {
      sendRequest('/users', user, 'delete')
        .then(() => {
          const index = this.users.findIndex(usr => usr.id === user.id);
          this.users.splice(index, 1);
        });
    },

    editUser(user) {
      sendRequest('/users', user, 'put')
      .then(user => user.json())
      .then(user => {
        const index = this.users.findIndex(usr => usr.id === user.id);
        this.users.splice(index, 1, user);
        return user;
      })
      .then(user => {
        if (user.id === JSON.parse(localStorage.loggedUser).id) {
          // Save the changes on user if (loggedUser = changedUser) to the localStorage
          localStorage.setItem('loggedUser', JSON.stringify(user));
        }
      });
    },

    changeUserData(user, actionType) {
      this.showModal = false;

      switch (actionType) {
        case 'add': return this.addUser(user);
        case 'edit': return this.editUser(user);
        case 'delete': return this.deleteUser(user);
        default: return null;
      }
    }
  },
  mounted() {
    sendRequest('/users', null, 'get')
      .then(res => res.json())
      .then(res => {
        this.users = res;
      });
  },
  components: {
    UserItem,
    UserModal
  }
};
</script>

<style lang="scss" scoped>

.add-user-button {
  @include button;

  width: 20%;
  margin: 30px 0;
  font-size: 20px;
}

.fade-add-user-modal-enter-active, .fade-add-user-modal-leave-active {
  transition: opacity 1s ease-in-out, transform 1s ease;
}

.fade-add-user-modal-enter, .fade-add-user-modal-leave-to {
  opacity: 0;
}

.fade-add-user-modal-enter-to, .fade-add-user-modal-leave {
  opacity: 1;
}

::v-deep .users-input {
  @include users-input;
}

.users-input ::v-deep {
  .user-input-button {
    @include user-input-button;
  }
}

::v-deep .modal-body-line {
  @include modal-body-line;
}

.modal-body-line ::v-deep .modal-body-title {
  @include modal-body-title;
}

::v-deep .add-user-label {
  @include add-user-label;
}

::v-deep .input-field {
  @include input-field;
}

::v-deep .input-field-user {
  margin-bottom: 10px;
}

::v-deep .checkbox:hover {
  cursor: pointer;
}

::v-deep .cancel-button {
  @include button;

  background-color: red;
}

::v-deep .save-button {
  @include button;
}

</style>
