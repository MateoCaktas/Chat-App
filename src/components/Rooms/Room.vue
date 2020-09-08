<template>
  <div class="room-container">
    <div class="background-image"></div>
    <div class="messages-container">
      <div class="messages-container-header">
        <custom-button
          @click="goBack"
          class="messages-container-back-button">
          Back
        </custom-button>
        <h1 class="messages-container-title">Room {{ roomId }}</h1>
        <custom-button
          v-if="belongsToRoom"
          @click="leaveRoom()"
          class="messages-container-leave-button">
          Leave Room
        </custom-button>
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
        <div v-if="isAdmin" @click="leaveRoom(user)" class="delete-user-button">+</div>
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
      isAdmin: false,
      getUsersBelongingToRoom: {}
    };
  },
  computed: {
    belongsToRoom() {
      // Checks if the user is part of the room (admins can go to a room which they are not part of)
      const loggedUserEmail = JSON.parse(localStorage.loggedUser).email;
      return this.usersList.filter(user => user.email === loggedUserEmail).length;
    }
  },
  methods: {
    deleteMessage(message) {
      this.httpRequest.sendRequest('delete', message)
        .then(() => {
          const index = this.messages.findIndex(msg => msg.id === message.id);
          this.messages.splice(index, 1);
        });
    },
    goBack() {
      this.$router.go('-1');
    },
    leaveRoom(user) {
      if (!user) user = JSON.parse(localStorage.loggedUser);

      this.getUsersBelongingToRoom.sendRequest('delete', user)
        .then(() => {
          const index = this.usersList.findIndex(currentUser => currentUser.id === user.id);
          this.usersList.splice(index, 1);
          // If the user himself leaves the room, redirect him to Home page
          if (user.id === JSON.parse(localStorage.loggedUser).id) this.$router.push({ name: 'Home' });
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

    this.getUsersBelongingToRoom = new Request(`/rooms/${this.roomId}/users`);
    this.getUsersBelongingToRoom.sendRequest('get')
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

.background-image {
  position: absolute;
  z-index: -5;
  opacity: 0.5;
  width: 100%;
  height: 80%;
  background-image: url("../../assets/background-image.jpg");
}

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
  border-bottom: 1px solid $tertiary-color;
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

.messages {
  display: flex;
  height: 350px;
  flex-direction: column;
  overflow: scroll;
  border-bottom: 1px solid $tertiary-color;
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

.delete-user-button {
  @include button;

  text-align: center;
  transform: rotate(-45deg);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
  margin-left: auto;
  font-size: 15px;
  font-weight: bold;
  transition: 1.5s;
  background-color: red;
}

.delete-user-button:hover {
  transform: rotate(135deg);
}

</style>
