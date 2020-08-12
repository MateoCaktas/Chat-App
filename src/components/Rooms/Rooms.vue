<template>
  <div>
    <div id="rooms-container">
      <h1> User rooms </h1>
      <div class="room-list">
        <div v-for="room in rooms" :key="room.id">
          <RoomItem
            @change-room-data="changeRoomData"
            class="room-item"
            :room="room" />
        </div>
      </div>
      <button @click="showModal = true" class="create-room-button">Create a room</button>
    </div>
    <transition name="fade-add-room-modal">
      <RoomModal
        v-if="showModal"
        @close="cancel"
        @save-room-data="saveRoom"
        :actiontype="actionType" />
    </transition>
  </div>
</template>

<script>

import RoomItem from './RoomItem';
import RoomModal from './RoomModal';
import { sendRequest } from '../../services/index';

export default {
  name: 'admin-room-list',
  data() {
    return {
      rooms: [],
      showModal: false,
      addedRoom: {},
      actionType: 'add'
    };
  },
  methods: {
    cancel() {
      this.addedRoom = {};
      this.showModal = false;
    },
    saveRoom(saveRoom) {
      this.addedRoom = saveRoom;
      this.addedRoom.creationTime = Date.now();
      this.addRoom(this.addedRoom);
      this.cancel();
    },
    addRoom(room) {
      sendRequest('/rooms', room, 'post')
        .then(room => room.json())
        .then(room => {
          this.rooms.push(room);
        });
    },
    deleteRoom(room) {
      sendRequest('/rooms', room, 'delete')
          .then(() => {
            const index = this.rooms.findIndex(currentRoom => currentRoom.id === room.id);
            this.rooms.splice(index, 1);
          });
    },
    editRoom(room) {
      sendRequest('/rooms', room, 'put')
        .then(room => room.json())
        .then(room => {
          const index = this.rooms.findIndex(currentRoom => currentRoom.id === room.id);
          this.rooms.splice(index, 1, room);
        });
    },
    changeRoomData(room, actionType) {
      switch (actionType) {
        case 'add': return this.addRoom(room);
        case 'edit': return this.editRoom(room);
        case 'delete': return this.deleteRoom(room);
        default: return null;
      }
    }
  },
  mounted() {
    sendRequest('/rooms', null, 'get')
      .then(res => res.json())
      .then(res => {
        this.rooms = res;
      });
  },
  components: {
    RoomItem,
    RoomModal
  }
};
</script>

<style lang="scss" scoped>

#rooms-container {
  margin: 30px;
}

.room-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.room-item {
  padding: 10px;
}

.create-room-button {
  @include button;

  width: 30%;
  margin-top: 50px;
  font-size: 20px;
}

.fade-add-room-modal-enter-active, .fade-add-room-modal-leave-active {
  transition: opacity 1s ease-in-out, transform 1s ease;
}

.fade-add-room-modal-enter, .fade-add-room-modal-leave-to {
  opacity: 0;
}

.fade-add-room-modal-enter-to, .fade-add-room-modal-leave {
  opacity: 1;
}

::v-deep .users-input {
  @include users-input;
}

.users-input ::v-deep {
  .user-input-button {
    @include user-input-button;
  }

  .delete-user-button {
    background-color: red;
  }
}

::v-deep .modal-body-line {
  @include modal-body-line;
}

.modal-body-line ::v-deep .modal-body-title {
  @include modal-body-title;
}

::v-deep .add-user-label {
  @include add-user-label;
}

::v-deep .input-field {
  @include input-field;
}

::v-deep .input-field-user {
  margin-bottom: 10px;
}

::v-deep .cancel-button {
  @include button;

  background-color: red;
}

::v-deep .save-button {
  @include button;
}

</style>
