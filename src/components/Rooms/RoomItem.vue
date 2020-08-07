<template>
  <div>
    <div id="room-window">
      <p> {{ room.name }} </p>
      <p>Users: {{ usersLength }} / {{ room.limit }}</p>
      <button @click="showModal = true" class="edit-room-button"> Edit room </button>
    </div>
    <transition name="fade-edit-room-modal">
      <EditRoomModal
        v-if="showModal"
        @close="showModal = false"
        @update-room-list="(currentRoom, action) => $emit('change-room-data', currentRoom, action)"
        :room="room" />
    </transition>
  </div>
</template>

<script>

import EditRoomModal from './EditRoomModal';
import { sendRequest } from '../../services/index';

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
      usersLength: 0
    };
  },
  mounted() {
    sendRequest(`/rooms/${this.room.id}/users`, null, 'get')
      .then(result => result.json())
      .then(result => {
        this.usersLength = result.length;
      });
  },
  components: {
    EditRoomModal
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
  cursor: pointer;
}

.edit-room-button {
  @include button;
}

.fade-edit-room-modal-enter-active, .fade-edit-room-modal-leave-active {
  transition: opacity 1s ease-in-out, transform 1s ease;
}

.fade-edit-room-modal-enter, .fade-edit-room-modal-leave-to {
  opacity: 0;
}

.fade-edit-room-modal-enter-to, .fade-edit-room-modal-leave {
  opacity: 1;
}

</style>
