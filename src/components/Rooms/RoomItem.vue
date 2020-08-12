<template>
  <div>
    <transition name="fade-room-item">
      <div id="room-window">
        <p> {{ currentRoom.name }} </p>
        <p>Users: {{ usersLength }} / {{ currentRoom.limit }}</p>
        <button @click="showModal = true" class="edit-room-button"> Edit Room </button>
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

import RoomModal from './RoomModal';
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
      usersLength: 0,
      usersEmails: [],
      currentRoom: {},
      actionType: 'edit'
    };
  },
  methods: {
    saveRoom(newRoom) {
      this.currentRoom = newRoom;
      this.$emit('change-room-data', this.currentRoom, this.actionType);
      this.showModal = false;
    },
    getUsers() {
      sendRequest(`/rooms/${this.room.id}/users`, null, 'get')
        .then(result => result.json())
        .then(result => {
          this.usersLength = result.length;
          this.usersEmails = result.map(user => user.email);
        });
    }
  },
  watch: {
    room: {
      handler: 'getUsers',
      immediate: true
    },
    currentRoom: {
      handler: 'getUsers',
      immediate: true
    }
  },
  mounted() {
    this.currentRoom = this.room;
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
  cursor: pointer;
}

.edit-room-button {
  @include button;
}

.fade-edit-room-modal-enter-active, .fade-edit-room-modal-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease;
}

.fade-edit-room-modal-enter, .fade-edit-room-modal-leave-to {
  opacity: 0;
}

.fade-edit-room-modal-enter-to, .fade-edit-room-modal-leave {
  opacity: 1;
}

.fade-room-item-enter-active, .fade-room-item-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-room-item-enter {
  opacity: 0;
}

.fade-room-item-leave {
  opacity: 1;
}

::v-deep {
  .users-input {
    @include users-input;
  }

  .user-input-button {
    @include user-input-button;
  }

  .delete-user-button {
    background-color: red;
  }
}

.modal-body-line ::v-deep .modal-body-title {
  @include modal-body-title;
}

</style>
