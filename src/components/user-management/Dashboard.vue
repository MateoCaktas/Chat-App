<template>
  <div>
    <h1>Admin dashboard</h1>
    <div v-for="user in users" :key="user.id">
      <UserItem
        @changeUser="changeUser"
        :user="user" />
    </div>
    <button @click="showModal = true" class="add-user-button">Add user</button>
    <transition name="view">
      <EditUserModal
        v-if="showModal"
        @close="showModal = false"
        @updateUserList="changeUser" />
    </transition>
  </div>
</template>

<script>

import EditUserModal from '../EditUserModal';
import UserItem from '../UserItem';

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
      this.sendUserRequest(user, 'post')
        .then(user => user.json())
        .then(user => {
          this.users.push(user);
        });
    },
    deleteUser(user) {
      this.sendUserRequest(user, 'delete')
        .then(() => {
          const index = this.users.findIndex(usr => usr.id === user.id);
          this.users.splice(index, 1);
        });
    },

    editUser(user) {
      this.sendUserRequest(user, 'put')
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

    changeUser(user, actionType) {
      switch (actionType) {
        case 'add': return this.addUser(user);
        case 'edit': return this.editUser(user);
        case 'delete': return this.deleteUser(user);
        default: return null;
      }
    },
    sendUserRequest(user, type) {
      const jwt = this.$cookie.get('token');
      let path = '/users';

      if (user.id) path = `/users/${user.id}`;

      return fetch(path, {
        method: `${type}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`
        },
        body: JSON.stringify(user)
      });
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
}

.view-enter-active, .view-leave-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease;
}

.view-enter, .view-leave-to {
  opacity: 0;
}

.view-enter-active {
  transition-delay: 0.3s;
}

.view-enter-to, .view-leave {
  opacity: 1;
}
</style>
