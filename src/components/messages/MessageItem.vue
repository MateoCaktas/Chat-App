<template>
  <transition v-if="isActive" name="fade-message">
    <div class="message">
      <div class="user">
        <img class="user-image" src="@/assets/user.png">
        <div class="user-name">{{ userName }} </div>
      </div>
      <button v-if="isAdmin" @click="deleteMessage(message)" class="delete-message-button">+</button>
      <div class="user-message-content" :class="{ 'deleted-user-message': isDeleted}">{{ message.content }}</div>
    </div>
  </transition>
</template>

<script>
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
      isActive: true
    };
  },
  methods: {
    deleteMessage(message) {
      this.isActive = false;
      setTimeout(() => {
        this.$emit('delete', message);
      }, 1000);
    }
  },
  mounted() {
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
  border-radius: 10px;
  background-color: $primary-color;
  float: left;
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
