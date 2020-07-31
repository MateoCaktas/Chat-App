<template>
  <div>
    <h1>Admin dashboard</h1>
    <div v-for="user in users" :key="user.id">
      <UserItem
        @changeUser="changeUser"
        :user="user" />
    </div>
    <button @click="openModal" class="btn">Add user</button>
    <EditUserModal
      v-if="showModal"
      @close="showModal = false"
      @updateUserList="changeUser"
      :userslength="users.length" />
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
    openModal() {
      this.showModal = true;
    },
    addUser(user) {
      const jwt = this.$cookie.get('token');

      fetch('/users/', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`
        },
        body: JSON.stringify(user)
      })
      .then(user => user.json())
      .then(user => {
        this.users.push(user);
      });
    },
    deleteUser(user) {
      const jwt = this.$cookie.get('token');

      fetch(`/users/${user.id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`
        }
      })
      .then(() => {
        const index = this.users.findIndex(usr => usr.id === user.id);
        this.users.splice(index, 1);
      });
    },

    editUser(user) {
      const jwt = this.$cookie.get('token');
      fetch(`/users/${user.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`
        },
        body: JSON.stringify(user)
      })
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

<style scoped>
h1 {
  font-size: 30px;
}

.btn {
  width: 30%;
  height: 40px;
  margin: 20px 0;
  background-color: rgb(0,225,255);
  align-self: center;
}
</style>
