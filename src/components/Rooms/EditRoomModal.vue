<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h2>{{ currentRoom.id ? 'Edit Room' : 'Add Room' }}</h2>
        </div>
        <div class="modal-body">
          <div class="modal-body-line">
            <h4 class="modal-body-title">Room name:</h4>
            <input
              v-model="currentRoom.name"
              class="input-field"
              placeholder="Name">
          </div>
          <div class="modal-body-line">
            <h4 class="modal-body-title">Limit: </h4>
            <input
              v-model.number="currentRoom.limit"
              class="input-field"
              placeholder="Limit"
              type="number">
          </div>
          <div class="modal-body-line">
            <h4 class="modal-body-title">Belonging Users:</h4>
            <div class="users-input">
              <div v-for="user in users" :key="user.email">
                <input
                  v-model.number="user.email"
                  class="input-field-user"
                  placeholder="User"
                  type="text">
                <button @click="removeUserField(user.email)" class="delete-user-button"><span>x</span></button>
              </div>
              <label class="add-user-label">Add user (max {{ currentRoom.limit ? currentRoom.limit : '-' }})</label>
              <div>
                <input
                  v-model.number="userEmail"
                  class="input-field-user"
                  placeholder="User"
                  type="text">
                <button @click="addUser(userEmail)" class="add-user-button"><span>+</span></button>
              </div>
            </div>
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
  name: 'edit-room-modal',
  props: {
    room: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      currentRoom: {},
      actionType: '',
      users: [],
      userEmail: ''
    };
  },
  computed: {
    validateFields() {
      return this.currentRoom.name && this.currentRoom.limit && this.users.length <= this.currentRoom.limit;
    }
  },
  methods: {
    saveRoom() {
      this.currentRoom.usersEmails = this.users.map(user => user.email);

      if (this.actionType === 'add') this.currentRoom.creationTime = Date.now();

      this.$emit('update-room-list', this.currentRoom, this.actionType);
      this.$emit('close');
    },
    addUser(email) {
      this.users.push({ email });
      this.userEmail = '';
    },
    removeUserField(email) {
      this.users = this.users.filter(user => user.email !== email);
    }
  },
  mounted() {
    this.currentRoom = Object.assign({}, this.room);
    this.actionType = this.currentRoom.id ? 'edit' : 'add';
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
  width: 90%;
  margin: 20px;
}

.modal-body-title {
  width: 150px;
  justify-self: flex-start;
  margin-right: auto;
  text-align: start;
}

.input-field {
  flex: 2;
}

.users-input {
  display: flex;
  flex-direction: column;
  flex: 2;
}

.add-user-label {
  margin-left: 40px;
  font-size: 12px;
  align-self: start;
}

.add-user-button, .delete-user-button {
  @include button;

  width: 50px;
  height: 25px;
  margin: 0 5px;
}

.delete-user-button {
  background-color: red;
}

.input-field-user {
  margin-bottom: 10px;
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
