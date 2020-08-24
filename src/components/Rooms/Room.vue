<template>
  <div class="room-container">
    <div class="messages-container">
      <div class="messages-container-header">
        <button @click="$router.go('-1')" class="messages-container-back-button">Back</button>
        <h1 class="messages-container-title">Room {{ id }}</h1>
        <button class="messages-container-leave-button">Leave Room</button>
      </div>
      <div v-for="message in messages" :key="message.id" class="message">
        <div class="user">
          <img class="user-image" src="@/assets/user.png">
          <div class="user-name">{{ message.userMessage.fullName }} </div>
        </div>
        <div class="user-message-content">{{ message.content }}</div>
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

import Request from '../../services';

export default {
  name: 'room',
  data() {
    return {
      id: 0,
      httpRequest: {},
      messages: [],
      usersList: []
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.httpRequest = new Request(`/messages/${this.id}`);

    this.httpRequest.sendRequest('get')
      .then(result => result.json())
      .then(result => {
        this.messages = result;
      });

    const getUsersBelongingToRoom = new Request(`/rooms/${this.id}/users`);
    getUsersBelongingToRoom.sendRequest('get')
      .then(result => result.json())
      .then(result => {
        this.usersList = result.map(user => user);
      });
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
  width: 80%;
}

.messages-container-header {
  display: flex;
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
  margin: 10px;
  margin-right: auto;
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
  border-radius: 10px;
  background-color: $primary-color;
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
