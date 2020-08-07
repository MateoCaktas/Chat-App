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
      <EditRoomModal
        v-if="showModal"
        @close="showModal = false"
        @update-room-list="changeRoomData" />
    </transition>
  </div>
</template>

<script>

import EditRoomModal from './EditRoomModal';
import RoomItem from './RoomItem';
import { sendRequest } from '../../services/index';

export default {
  name: 'admin-room-list',
  data() {
    return {
      rooms: [],
      showModal: false
    };
  },
  methods: {
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
    const jwt = this.$cookie.get('token');

    fetch('/rooms', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    })
    .then(res => res.json())
    .then(res => {
      this.rooms = res;
    });
  },
  components: {
    RoomItem,
    EditRoomModal
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

</style>
