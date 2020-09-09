<template>
  <div>
    <transition name="fade-room-item">
      <div id="room-window">
        <p> {{ room.name }} </p>
        <p>Users: {{ usersLength }} / {{ room.limit }}</p>
        <custom-button
          @click="goToRoom"
          class="edit-room-button">
          Enter
        </custom-button>
        <custom-button
          v-if="isAdmin"
          @click="openModal"
          class="edit-room-button">
          Edit
        </custom-button>
      </div>
    </transition>
    <transition name="fade-edit-room-modal">
      <RoomModal
        v-if="showModal"
        @close="showModal = false"
        @save-room-data="saveRoom"
        :room="room"
        :emailslist="usersEmails"
        :actiontype="actionType" />
    </transition>
  </div>
</template>

<script>

import Request from '../../services/index';
import RoomModal from './RoomModal';

export default {
  name: 'room-item',
  props: {
    room: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showModal: false,
      usersEmails: [],
      actionType: 'edit',
      httpRequest: {},
      isAdmin: false
    };
  },
  computed: {
    usersLength() {
      return this.usersEmails.length;
    }
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    goToRoom() {
      this.$router.push({ name: 'Room', params: { id: this.room.id } });
    },
    saveRoom(newRoom, actionType) {
      this.$emit('save-room-data', newRoom, actionType);
      this.showModal = false;
    },
    getUsers() {
      this.httpRequest.sendRequest('get')
        .then(result => result.json())
        .then(result => {
          this.usersEmails = result.map(user => user.email);
        });
    }
  },
  watch: {
    room: {
      handler: 'getUsers'
    }
  },
  mounted() {
    this.isAdmin = JSON.parse(localStorage.loggedUser).isAdmin;
    this.httpRequest = new Request(`/rooms/${this.room.id}/users`);

    this.getUsers();
  },
  components: {
    RoomModal
  }
};
</script>

<style lang="scss" scoped>

#room-window {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  color: $secondary-color;
  font-size: 20px;
  font-weight: bold;
  background: linear-gradient($primary-color, $secondary-color);
  border: 2px solid $tertiary-color;
  transition: transform 0.5s;
  border-radius: 10px;
  z-index: -1;
}

#room-window:hover {
  transform: scale(1.1);
}

.fade-edit-room-modal-enter-active, .fade-edit-room-modal-leave-active {
  transition: opacity 1s ease-in-out, transform 1s ease;
}

.fade-edit-room-modal-enter, .fade-edit-room-modal-leave-to {
  opacity: 0;
}

.fade-room-item-enter-active, .fade-room-item-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-room-item-enter {
  opacity: 0;
}

</style>
