<template>
  <div>
    <h1>Admin dashboard</h1>
    <div v-for="user in users" :key="user.id">
      <UserItem
        @changeUserData="changeUserData"
        :user="user" />
    </div>
    <button @click="showModal = true" class="add-user-button">Add user</button>
    <transition name="fade-add-user-modal">
      <EditUserModal
        v-if="showModal"
        @close="showModal = false"
        @updateUserList="changeUserData" />
    </transition>
  </div>
</template>

<script>

import EditUserModal from '../Users/EditUserModal';
import { sendRequest } from '../../services/index';
import UserItem from '../Users/UserItem';

export default {
  name: 'admin-dashboard',
  data() {
    return {
      users: [],
      showModal: false
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
        const loggedUser = JSON.parse(localStorage.user);
        if (user.id === loggedUser.id) {
          // Save the changes on user if (loggedUser = changedUser) to the localStorage
          const saveUser = JSON.stringify(user);
          localStorage.setItem('user', saveUser);
        }
      });
    },

    changeUserData(user, actionType) {
      switch (actionType) {
        case 'add': return this.addUser(user);
        case 'edit': return this.editUser(user);
        case 'delete': return this.deleteUser(user);
        default: return null;
      }
    }
  },
  mounted() {
    const jwt = this.$cookie.get('token');

    fetch('/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    })
    .then(res => res.json())
    .then(res => {
      this.users = res;
    });
  },
  components: {
    UserItem,
    EditUserModal
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 30px;
}

.add-user-button {
  @include button;

  width: 20%;
  margin: 30px 0;
  font-size: 20px;
}

.fade-add-user-modal-enter-active, .fade-add-user-modal-leave-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease;
}

.fade-add-user-modal-enter, .fade-add-user-modal-leave-to {
  opacity: 0;
}

.fade-add-user-modal-enter-active {
  transition-delay: 0.3s;
}

.fade-add-user-modal-enter-to, .fade-add-user-modal-leave {
  opacity: 1;
}
</style>
