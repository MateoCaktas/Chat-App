<template>
  <div class="room-container">
    <div class="messages-container">
      <div class="messages-container-header">
        <button @click="$router.go('-1')" class="messages-container-back-button">Back</button>
        <h1 class="messages-container-title">Room {{ roomId }}</h1>
        <button class="messages-container-leave-button">Leave Room</button>
      </div>
      <div v-for="message in messages" :key="message.id">
        <MessageItem
          @delete="deleteMessage"
          :message="message"
          :is-admin="isAdmin" />
      </div>
    </div>

    <div class="users-list">
      <h3>Users:</h3>
      <div v-for="user in usersList" :key="user.email" class="user-list-item">
        <img class="user-list-image" src="@/assets/user.png">
        <div class="user-list-name">{{ user.fullName }}</div>
      </div>
    </div>
  </div>
</template>

<script>

import MessageItem from '../messages/MessageItem';
import Request from '../../services';

export default {
  name: 'room',
  data() {
    return {
      roomId: 0,
      httpRequest: {},
      messages: [],
      usersList: [],
      isAdmin: false
    };
  },
  methods: {
    deleteMessage(message) {
      this.httpRequest.sendRequest('delete', message)
        .then(() => {
          const index = this.messages.findIndex(msg => msg.id === message.id);
          this.messages.splice(index, 1);
        });
    }
  },
  mounted() {
    this.isAdmin = JSON.parse(localStorage.loggedUser).isAdmin;
    this.roomId = this.$route.params.id;
    this.httpRequest = new Request('/messages');

    this.httpRequest.sendRequest('get', `roomId=${this.roomId}`)
      .then(result => result.json())
      .then(result => {
        this.messages = result;
      });

    const getUsersBelongingToRoom = new Request(`/rooms/${this.roomId}/users`);
    getUsersBelongingToRoom.sendRequest('get')
      .then(result => result.json())
      .then(result => {
        this.usersList = result.map(user => user);
      });
  },
  components: {
    MessageItem
  }
};
</script>

<style lang="scss" scoped>

.room-container {
  display: flex;
  flex-direction: row;
}

.messages-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
}

.messages-container-header {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.messages-container-title {
  font-size: 25px;
  flex: 1;
}

.messages-container-back-button {
  @include button;
}

.messages-container-leave-button {
  @include button;

  width: 100px;
  background-color: red;
}

.message {
  position: relative;
  margin: 10px;
  margin-right: auto;
}

.users-list {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  width: 20%;
  height: 80%;
  margin-bottom: 50px;
  border-left: 1px solid $primary-color;
}

.user-list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px;
}

.user-list-image {
  width: 20px;
  height: 20px;
}

.user-list-name {
  margin: 5px;
}
</style>
