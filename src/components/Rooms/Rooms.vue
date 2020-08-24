<template>
  <div>
    <div id="rooms-container">
      <h1> User rooms </h1>
      <div class="room-list">
        <div v-for="room in rooms" :key="room.id">
          <RoomItem
            @save-room-data="saveRoomData"
            class="room-item"
            :room="room" />
        </div>
      </div>
      <custom-button
        @click="openModal"
        class="create-room-button"
        value="Create a room">
<<<<<<< HEAD
        <div slot>Create a room</div>
=======
        <div slot="value">Create a room</div>
>>>>>>> 203be6a523037b9f038248766f375be3e7330fc3
      </custom-button>
    </div>
    <transition name="fade-add-room-modal">
      <RoomModal
        v-if="showModal"
        @close="cancel"
        @save-room-data="saveRoomData"
        :actiontype="actionType" />
    </transition>
  </div>
</template>

<script>

import Request from '../../services/index';
import RoomItem from './RoomItem';
import RoomModal from './RoomModal';

export default {
  name: 'admin-room-list',
  data() {
    return {
      rooms: [],
      showModal: false,
      addedRoom: {},
      actionType: 'add',
      httpRequest: {}
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    cancel() {
      this.addedRoom = {};
      this.showModal = false;
    },
    addRoom(room) {
      this.httpRequest.sendRequest('post', room)
        .then(room => room.json())
        .then(room => {
          this.rooms.push(room);
        });
    },
    deleteRoom(room) {
      this.httpRequest.sendRequest('delete', room)
          .then(() => {
            const index = this.rooms.findIndex(currentRoom => currentRoom.id === room.id);
            this.rooms.splice(index, 1);
          });
    },
    editRoom(room) {
      this.httpRequest.sendRequest('put', room)
        .then(room => room.json())
        .then(room => {
          const index = this.rooms.findIndex(currentRoom => currentRoom.id === room.id);
          this.rooms.splice(index, 1, room);
        });
    },
    saveRoomData(room, actionType) {
      switch (actionType) {
        case 'add': return this.addRoom(room);
        case 'edit': return this.editRoom(room);
        case 'delete': return this.deleteRoom(room);
        default: return null;
      }
    }
  },
  mounted() {
    this.httpRequest = new Request('/rooms');

    this.httpRequest.sendRequest('get')
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

::v-deep {
  .user-input-button {
    width: 50px;
    height: 30px;
    margin: 0 5px;
  }

  .cancel-button {
    background-color: red;
  }
}

</style>
