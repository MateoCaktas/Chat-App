<template>
  <div class="room-container">
    <div class="background-image"></div>
    <div class="messages-container">
      <div class="messages-container-header">
        <button @click="$router.go('-1')" class="messages-container-back-button">Back</button>
        <h1 class="messages-container-title">Room {{ roomID }}</h1>
        <button v-if="belongsToRoom" @click="leaveRoom()" class="messages-container-leave-button">Leave Room</button>
      </div>

      <div ref="messages" class="messages">
        <div
          v-for="message in messages"
          :key="message.id" class="message"
          :class="{ loggedUserMessage: message.userMessage.id === loggedUser.id }">
          <div class="user">
            <img class="user-image" src="@/assets/user.png">
            <div class="user-name">{{ message.userMessage.fullName }} </div>
          </div>
          <div class="user-message-content">{{ message.content }}</div>
        </div>
      </div>

      <form v-show="belongsToRoom" @submit.prevent="sendMessage" id="input-message-form">
        <input v-model="inputMessage" type="text" class="input-message-window">
        <button type="submit" :disabled="!inputMessage" class="send-message-button">Send</button>
      </form>
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

import Request from '../../services';

export default {
  name: 'room',
  data() {
    return {
      roomID: 0,
      messages: [],
      usersList: [],
      httpRequest: {},
      getUsersBelongingToRoom: {},
      inputMessage: '',
      loggedUser: {},
      isAdmin: false
    };
  },
  computed: {
    belongsToRoom() {
      // Checks if the user is part of the room (admins can go to a room which they are not part of)
      return this.usersList.filter(user => user.email === this.loggedUser.email).length;
    }
  },
  methods: {
    getMessages() {
      return this.httpRequest.sendRequest('get')
        .then(result => result.json())
        .then(result => {
          this.messages = result;
        });
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
    },
    sendMessage() {
      const message = {};
      message.content = this.inputMessage;
      message.time = Date.now();
      message.fkRoom = parseInt(this.$route.params.id);
      message.fkUser = this.loggedUser.id;

      this.httpRequest.sendRequest('post', message)
        .then(() => {
          this.getMessages()
            .then(() => {
              this.inputMessage = '';
              this.scrollToEnd();
            });
        });
    },
    scrollToEnd() {
      var container = this.$refs.messages;
      container.scrollTop = container.scrollHeight;
    }
  },
  mounted() {
    this.isAdmin = JSON.parse(localStorage.loggedUser).isAdmin;
    this.loggedUser = JSON.parse(localStorage.loggedUser);
    this.roomID = this.$route.params.id;
    this.httpRequest = new Request(`/messages/${this.roomID}`);

    this.getMessages();

    this.getUsersBelongingToRoom = new Request(`/rooms/${this.roomID}/users`);
    this.getUsersBelongingToRoom.sendRequest('get')
      .then(result => result.json())
      .then(result => {
        this.usersList = result.map(user => user);
      });
  }
};
</script>

<style lang="scss" scoped>

#input-message-form {
  display: flex;
  flex-direction: row;
}

.input-message-window {
  margin: 5px;
  flex: 1;
  resize: none !important;
}

.send-message-button {
  @include button;

  margin: 5px;
}

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
  width: 80%;
}

.messages-container-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0;
  border-bottom: 1px solid $tertiary-color;
}

.messages-container-title {
  font-size: 20px;
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
  height: 60vh;
  flex-direction: column;
  overflow: scroll;
  border-bottom: 1px solid $tertiary-color;
  padding-right: 10px;
}

.message {
  max-width: 60%;
  margin: 10px;
  margin-right: auto;
}

.loggedUserMessage {
  margin-right: 0;
  margin-left: auto;
}

.user {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px;
}

.user-name {
  margin: 5px;
}

.user-image {
  width: 30px;
  height: 30px;
}

.user-message-content {
  padding: 10px;
  color: white;
  font-size: 20px;
  background-color: $primary-color;
  border: 1px solid $tertiary-color;
  border-radius: 10px;
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
