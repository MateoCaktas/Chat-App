<template>
  <transition v-if="isActive" name="fade-message">
    <div class="message">
      <div class="user">
        <img class="user-image" src="@/assets/user.png">
        <div class="user-name">{{ userName }} </div>
      </div>
      <custom-button
        v-if="isAdmin"
        @click="deleteMessage(message)"
        class="delete-message-button">
        +
      </custom-button>
      <div class="user-message-content" :class="{ 'deleted-user-message': isDeleted }">{{ message.content }}</div>
      <div class="user-likes">
        <custom-button
          @click="likeMessage"
          class="user-like-button">
          <img class="like-image" :src="isLiked">
        </custom-button>
        <span class="user-likes-number"> {{ likesCount }} likes</span>
      </div>
    </div>
  </transition>
</template>

<script>
import Request from '../../services';
export default {
  name: 'message-item',
  props: {
    message: {
      type: Object,
      default: () => {}
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      userName: 'Deleted User',
      isDeleted: false,
      isActive: true,
      loggedUser: {},
      usersLikes: [],
      userLikesRequest: {},
      isLikedByLoggedUser: false
    };
  },
  computed: {
    isLiked() {
      const path = this.isLikedByLoggedUser
        ? require('@/assets/liked.png')
        : require('@/assets/like.png');

      return path;
    },
    likesCount() {
      return this.usersLikes.length;
    }
  },
  methods: {
    sendLikesRequest(type, req) {
      return this.userLikesRequest.sendRequest(type, req)
        .then(() => {
          this.isLikedByLoggedUser = !this.isLikedByLoggedUser;
          this.getMessageLikes();
        });
    },
    getMessageLikes() {
      return this.userLikesRequest.sendRequest('get', `messageId=${this.message.id}`)
        .then(result => result.json())
        .then(result => {
          this.usersLikes = result;
        });
    },
    deleteMessage(message) {
      this.isActive = false;
      setTimeout(() => {
        this.$emit('delete', message);
      }, 1000);
    },
    likeMessage() {
      const req = {};
      let type = 'delete';
      req.userId = this.loggedUser.id;
      req.messageId = this.message.id;
      if (this.isLikedByLoggedUser) req.id = this.message.id;

      if (!this.isLikedByLoggedUser) type = 'post';

      this.sendLikesRequest(type, req);
    }
  },
  mounted() {
    this.userLikesRequest = new Request('/likes');

    this.getMessageLikes()
      .then(() => {
        this.isLikedByLoggedUser = this.usersLikes.filter(it => it.user_id === this.loggedUser.id).length;
      });

    this.loggedUser = JSON.parse(localStorage.loggedUser);

    if (this.message.userMessage) this.userName = this.message.userMessage.fullName;
    this.isDeleted = !this.message.userMessage;
  }
};
</script>

<style lang="scss" scoped>

.message {
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 10px;
  margin-right: auto;
}

.user {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px;
  float: left;
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
  font-size: 18px;
  background-color: $primary-color;
  float: left;
  border: 1px solid $tertiary-color;
  border-radius: 10px;
}

.user-likes {
  display: flex;
  align-items: center;
  position: absolute;
  top: 80px;
  left: 0;
  width: 110px;
  height: 25px;
  font-size: 14px;
}

.user-like-button {
  height: 30px;
  color: black;
  background-color: white;
  border-radius: 50px;
}

.like-image {
  width: 25px;
  height: 25px;
}

.user-likes-number {
  width: 150px;
  height: 20px;
  padding: 2px;
  background-color: white;
  border: 2px solid black;
  border-radius: 5px;
}

.deleted-user-message {
  background-color: gray;
}

.delete-message-button {
  position: absolute;
  top: 30px;
  right: 0;
  text-align: center;
  transform: rotate(-45deg);
  width: 30px;
  height: 30px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  transition: 1.5s;
  background-color: red;
  border-radius: 50%;
  opacity: 0;
}

.delete-message-button:hover {
  transform: rotate(135deg);
}

.message:hover .delete-message-button {
  opacity: 1;
}

.fade-message-enter-active, .fade-message-leave-active {
  transition: opacity 1s ease-in-out, transform 1s ease;
}

.fade-message-enter, .fade-message-leave-to {
  opacity: 0;
}

</style>
