<template>
  <Modal>
    <template>
      <h1 slot="modal-header">
        {{ isEditing ? 'Edit' : 'Add' }}
        Room: {{ displayedRoom.name }}
      </h1>

      <template slot="modal-body">
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
          <h4 class="belonging-users-title">Belonging Users:</h4>
          <div class="users-input">
            <div v-for="(mail, index) in usersEmails" :key="mail" class="user-input">
              <input
                v-model="usersEmails[index]"
                class="input-field"
                placeholder="User"
                type="text">
              <custom-button
                @click="removeUserField(mail)"
                class="user-input-button delete-user-button">
                <div slot>x</div>
              </custom-button>
            </div>
            <label class="add-user-label">Add user (max {{ currentRoom.limit || '-' }})</label>
            <div>
              <input
                v-model="userEmail"
                class="input-field"
                placeholder="User"
                type="text">
              <custom-button
                @click="addUser"
                class="user-input-button">
                <div slot>+</div>
              </custom-button>
            </div>
          </div>
        </div>
        <div v-if="isEditing" class="modal-body-line">
          <h4>Room ID: {{ currentRoom.id }}</h4>
        </div>
      </template>

      <template slot="modal-footer">
        <custom-button
          @click="close"
          class="cancel-button">
          <div slot>Cancel</div>
        </custom-button>
        <custom-button
          @click="saveRoom"
          :disabled="!validateFields"
          class="save-button">
          <div slot>Save</div>
        </custom-button>
      </template>
    </template>
  </Modal>
</template>

<script>

import Modal from '../common/Modal';

export default {
  name: 'room-modal',
  props: {
    room: {
      type: Object,
      default: () => {}
    },
    emailslist: {
      type: Array,
      default: () => []
    },
    actiontype: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentRoom: {
        name: '',
        limit: 0
      },
      usersEmails: [],
      userEmail: ''
    };
  },
  computed: {
    isEditing() {
      return this.actiontype === 'edit';
    },
    displayedRoom() {
      return this.isEditing ? this.room : this.currentRoom;
    },
    validateFields() {
      return this.currentRoom.name && this.currentRoom.limit && this.usersEmails.length <= this.currentRoom.limit;
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    addUser() {
      this.usersEmails.push(this.userEmail);
      this.userEmail = '';
    },
    removeUserField(email) {
      this.usersEmails = this.usersEmails.filter(it => it !== email);
    },
    saveRoom() {
      if (this.actiontype === 'add') this.currentRoom.creationTime = Date.now();
      this.currentRoom.usersEmails = this.usersEmails;
      this.$emit('save-room-data', this.currentRoom, this.actiontype);
      this.$emit('close');
    }
  },
  mounted() {
    this.usersEmails = [...this.emailslist];
    this.currentRoom = Object.assign({}, this.room);
  },
  components: {
    Modal
  }
};
</script>

<style lang="scss" scoped>

::v-deep {
  .delete-user-button {
    background-color: red;
  }
}

.belonging-users-title {
  @include modal-body-title;

  margin-top: 5px;
  align-self: flex-start;
}
</style>
