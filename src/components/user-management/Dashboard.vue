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
      <EditUserModal
        v-if="showModal"
        @close="showModal = false"
        @update-user-list="changeUserData" />
    </transition>
  </div>
</template>

<script>

import EditUserModal from '../Users/EditUserModal';
import Request from '../../services/index';
import UserItem from '../Users/UserItem';

export default {
  name: 'admin-dashboard',
  data() {
    return {
      users: [],
      showModal: false,
      httpRequest: {}
    };
  },
  methods: {
    addUser(user) {
      this.httpRequest.sendRequest('post', user)
        .then(user => user.json())
        .then(user => {
          this.users.push(user);
        });
    },
    deleteUser(user) {
      this.httpRequest.sendRequest('delete', user)
        .then(() => {
          const index = this.users.findIndex(usr => usr.id === user.id);
          this.users.splice(index, 1);
        });
    },

    editUser(user) {
      this.httpRequest.sendRequest('put', user)
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
      switch (actionType) {
        case 'add': return this.addUser(user);
        case 'edit': return this.editUser(user);
        case 'delete': return this.deleteUser(user);
        default: return null;
      }
    }
  },
  mounted() {
    this.httpRequest = new Request('/users');

    this.httpRequest.sendRequest('get')
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
