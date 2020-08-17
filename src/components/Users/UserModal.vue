<template>
  <Modal>
    <template>
      <h1 slot="modal-header">
        {{ isEditing ? 'Edit' : 'Add' }}
        User: {{ displayedUser.firstName }}
        {{ displayedUser.lastName }}
      </h1>
      <template slot="modal-body">
        <div class="modal-body-line">
          <h4 class="modal-body-title">First name:</h4>
          <input
            v-model="currentUser.firstName"
            class="input-field"
            placeholder="FirstName">
        </div>
        <div class="modal-body-line">
          <h4 class="modal-body-title">Last name:</h4>
          <input
            v-model="currentUser.lastName"
            class="input-field"
            placeholder="LastName">
        </div>
        <div class="modal-body-line">
          <h4 class="modal-body-title">Email:</h4>
          <input
            v-model="currentUser.email"
            class="input-field"
            placeholder="Email">
        </div>
        <div v-if="!isEditing" class="modal-body-line">
          <h4 class="modal-body-title">Password:</h4>
          <input
            v-model="currentUser.password"
            class="input-field"
            placeholder="Password">
        </div>
        <div>
          <input v-model="currentUser.isAdmin" class="checkbox" type="checkbox">
          <label for="checkbox"> Admin </label>
        </div>
        <div v-if="currentUser.id" class="modal-body-line">
          <h4 class="modal-body-title">User ID: {{ currentUser.id }}</h4>
        </div>
      </template>

      <template slot="modal-footer">
        <CustomButton
          :onclick="close"
          class="cancel-button"
          value="Cancel" />
        <CustomButton
          :onclick="saveUser"
          :disabled="!validateFields"
          class="save-button"
          value="Save" />
      </template>
    </template>
  </Modal>
</template>

<script>

import CustomButton from '../common/Button';
import Modal from '../common/Modal';

export default {
  name: 'user-modal',
  props: {
    user: {
      type: Object,
      default: () => {}
    },
    actiontype: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentUser: {
        firstName: '',
        lastName: '',
        email: ''
      }
    };
  },
  computed: {
    isEditing() {
      return this.actiontype === 'edit';
    },
    displayedUser() {
      return this.isEditing ? this.user : this.currentUser;
    },
    validateFields() {
      return this.currentUser.firstName && this.currentUser.lastName && this.currentUser.email && this.currentUser.password;
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    saveUser() {
      this.$emit('update-user-list', this.currentUser, this.actiontype);
    }
  },
  mounted() {
    this.currentUser = Object.assign({}, this.user);
  },
  components: {
    CustomButton,
    Modal
  }
};
</script>
