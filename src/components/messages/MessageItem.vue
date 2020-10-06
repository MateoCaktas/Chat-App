<template>
  <transition
    v-if="isActive"
    name="fade-message">
    <div class="message">
      <div class="user">
        <img
          class="user-image"
          src="@/assets/user.png">
        <div class="user-name">{{ userName }} </div>
      </div>
      <custom-button
        v-if="isAdmin"
        @click="deleteMessage(message)"
        class="delete-message-button">
        +
      </custom-button>
      <div
        class="user-message-content"
        :class="{ 'deleted-user-message': isDeleted }">
        {{ message.content }}
      </div>
      <div class="user-likes">
        <custom-button
          @click="likeMessage"
          class="user-like-button">
          <img
            class="like-image"
            :src="likedStatusIcon">
        </custom-button>
        <span class="user-likes-number"> {{ likesCount }} likes </span>
        <div
          v-if="userLikes.length"
          class="user-likes-list"
          :class="{ 'user-like-label-left': message.FK_user === loggedInUser.id }">
          <div
            v-for="user in userLikes"
            :key="user.id">
            {{ user.fullName }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

import LikedIcon from '@/assets/liked.png';
import LikeIcon from '@/assets/like.png';
import { mapGetters } from 'vuex';
import Request from '@/services';

export default {
  name: 'message-item',
  props: {
    message: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      userName: 'Deleted User',
      isDeleted: false,
      isActive: true,
      userLikes: [],
      userLikesRequest: {},
      showUserLikes: false
    };
  },
  computed: {
    ...mapGetters(['loggedInUser', 'isAdmin']),
    isLiked() {
      return this.userLikes.find(it => it.id === this.loggedInUser.id);
    },
    likedStatusIcon() {
      return this.isLiked ? LikedIcon : LikeIcon;
    },
    likesCount() {
      return this.userLikes.length;
    }
  },
  methods: {
    sendLikesRequest(type, req) {
      return this.userLikesRequest.sendRequest(type, req)
        .then(() => {
          if (type === 'post') this.userLikes.push(this.loggedInUser);
          else this.userLikes = this.userLikes.filter(it => it.id !== this.loggedInUser.id);
        });
    },
    getMessageLikes() {
      return this.userLikesRequest.sendRequest('get', `messageId=${this.message.id}`)
        .then(result => result.json())
        .then(result => {
          this.userLikes = [...result.users];
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
      const type = this.isLiked ? 'delete' : 'post';
      req.id = this.loggedInUser.id;

      this.sendLikesRequest(type, req);
    }
  },
  mounted() {
    this.userLikesRequest = new Request(`/messages/${this.message.id}/likes`);
    this.userLikes = [...this.message.users];

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
  color: $secondary-color;
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
  color: $tertiary-color;
  background-color: $secondary-color;
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
  background-color: $secondary-color;
  border: 2px solid $tertiary-color;
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
  color: $secondary-color;
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

.user-likes-list {
  display: none;
  position: absolute;
  left: 120px;
  width: 120px;
  padding: 5px;
  color: $secondary-color;
  background-color: $tertiary-color;
  border-radius: 5px;
  z-index: 9999;
}

.user-likes-number:hover + .user-likes-list {
  display: block;
}

.user-like-label-left {
  left: -80px;
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
