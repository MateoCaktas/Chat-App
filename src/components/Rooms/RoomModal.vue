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
            <div v-for="(mail, index) in usersEmails" :key="mail">
              <input
                v-model="usersEmails[index]"
                class="input-field-user"
                placeholder="User"
                type="text">
              <button @click="removeUserField(mail)" class="user-input-button delete-user-button"><span>x</span></button>
            </div>
            <label class="add-user-label">Add user (max {{ currentRoom.limit ? currentRoom.limit : '-' }})</label>
            <div>
              <input
                v-model="userEmail"
                class="input-field-user"
                placeholder="User"
                type="text">
              <button @click="addUser" class="user-input-button"><span>+</span></button>
            </div>
          </div>
        </div>
        <div v-if="actiontype === 'edit'" class="modal-body-line">
          <h4>Room ID: {{ currentRoom.id }}</h4>
        </div>
      </template>

      <template slot="modal-footer">
        <button @click="cancel" class="cancel-button">
          Cancel
        </button>
        <button @click="saveRoom" :disabled="!validateFields" class="save-button">
          Save
        </button>
      </template>
    </template>
  </Modal>
</template>

<script>

import Modal from '../Modal';

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
    cancel() {
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
      this.currentRoom.usersEmails = this.usersEmails;
      this.$emit('save-room-data', this.currentRoom);
    }
  },
  mounted() {
    this.usersEmails = this.emailslist;
    this.currentRoom = Object.assign({}, this.room);
  },
  components: {
    Modal
  }
};
</script>

<style lang="scss" scoped>

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

  .input-field-user {
    @include input-field;
  }
}

.modal-body-line ::v-deep {
  .modal-body-title {
    @include modal-body-title;
  }

  .belonging-users-title {
    @include modal-body-title;

    align-self: flex-start;
  }
}

</style>
