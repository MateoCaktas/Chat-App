<template>
  <div>
    <h1>Admin dashboard</h1>
    <div
      v-for="user in users"
      :key="user.id">
      <UserItem
        @change-user-data="changeUserData"
        :user="user" />
    </div>
    <custom-button
      @click="openModal"
      class="add-user-button">
      Add a user
    </custom-button>
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
import { mapActions, mapGetters } from 'vuex';

import Request from '../../services';
import UserItem from '../users/UserItem';
import UserModal from '../users/UserModal';

export default {
  name: 'admin-dashboard',
  data() {
    return {
      users: [],
      showModal: false,
      actionType: 'add',
      httpRequest: {}
    };
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  methods: {
    ...mapActions(['updateUser']),
    openModal() {
      this.showModal = true;
    },
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
        if (user.id === this.loggedInUser.id) {
          // Save the changes on user if (loggedInUser = changedUser) to the Vuex store
          this.updateUser(user);
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
    this.httpRequest = new Request('/users');

    this.httpRequest.sendRequest('get')
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

.fade-add-user-modal-enter-active, .fade-add-user-modal-leave-active {
  transition: opacity 1s ease-in-out, transform 1s ease;
}

.fade-add-user-modal-enter, .fade-add-user-modal-leave-to {
  opacity: 0;
}

.add-user-button {
  width: 20%;
  margin: 30px 0;
  font-size: 20px;
}

::v-deep {
  .checkbox:hover {
    cursor: pointer;
  }

  .cancel-button {
    background-color: red;
  }
}

</style>
