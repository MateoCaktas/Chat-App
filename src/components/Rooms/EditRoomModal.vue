<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h2>{{ currentRoom.id ? 'Edit Room' : 'Add Room' }}</h2>
        </div>
        <div class="modal-body">
          <div class="modal-body-line">
            <h4>Room name:</h4>
            <input
              v-model="currentRoom.name"
              class="input-field"
              placeholder="Name">
          </div>
          <div class="modal-body-line">
            <h4>Limit: </h4>
            <input
              v-model="currentRoom.limit"
              class="input-field"
              placeholder="Limit"
              type="number">
          </div>
          <div class="modal-body-line">
            <h4>Belonging Users:</h4>
          </div>
          <div v-if="currentRoom.id" class="modal-body-line">
            <h4>Room ID: {{ currentRoom.id }}</h4>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="$emit('close')" class="cancel-button">
            Cancel
          </button>
          <button @click="saveRoom" :disabled="!validateFields" class="save-button">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'add-room-modal',
  props: {
    room: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      currentRoom: {},
      actionType: ''
    };
  },
  computed: {
    validateFields: function () {
      return this.currentRoom.name && this.currentRoom.limit;
    }
  },
  methods: {
    saveRoom() {
      this.currentRoom.usersIDs = [1, 2];
      this.currentRoom.creationTime = Date.now();
      this.$emit('updateRoomList', this.currentRoom, this.actionType);
      this.$emit('close');
    }
  },
  mounted() {
    this.currentRoom = Object.assign({}, this.room);

    if (this.currentRoom.id) {
      this.actionType = 'edit';
    } else {
      this.actionType = 'add';
    }
  }
};
</script>

<style lang="scss" scoped>

.modal-mask {
  display: table;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  height: auto;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  border: 1px solid $tertiary-color;
}

.modal-header {
  display: flex;
  flex-direction: row;
  height: 60px;
  color: $secondary-color;
  background-color: $primary-color;
  justify-content: center;
  align-items: center;

  h3 {
    margin-top: 0;
    color: #42b983;
  }
}

.modal-body-line {
  display: flex;
  flex-direction: row;
  width: 80%;
  margin: 20px;
  justify-content: space-between;
  align-items: center;
}

.input-field {
  width: 150px;
  transition: width 0.5s ease;
  margin-left: auto;
}

.input-field:hover, .input-field:focus {
  width: 180px;
}

.modal-body-line > * {
  margin: 5px;
}

.checkbox:hover {
  cursor: pointer;
}

.save-button {
  @include button;
}

.cancel-button {
  @include button;

  background-color: red;
}

.modal-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 20px;
}

@media only screen and (max-width: 600px) {
  .modal-container {
    width: 100%;
  }
}
</style>
