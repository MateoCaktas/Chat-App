<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h2> Edit user</h2>
          </div>
          <div class="modal-body">
            <div class="modal-body-line">
              <h4>First name:</h4>
              <input
                v-model="currentUser.firstName"
                class="input-field"
                placeholder="FirstName">
            </div>
            <div class="modal-body-line">
              <h4>Last name:</h4>
              <input
                v-model="currentUser.lastName"
                class="input-field"
                placeholder="LastName">
            </div>
            <div class="modal-body-line">
              <h4>Email:</h4>
              <input
                v-model="currentUser.email"
                class="input-field"
                placeholder="Email">
            </div>
            <div
              v-if="actionType === 'add'"
              class="modal-body-line">
              <h4>Password:</h4>
              <input
                v-model="currentUser.password"
                class="input-field"
                placeholder="Password">
            </div>
            <div>
              <input v-model="currentUser.isAdmin" class="checkbox" type="checkbox">
              <label for="checkbox"> Admin </label>
            </div>
            <div v-if="!!currentUser.id" class="modal-body-line">
              <h4>User ID: {{ currentUser.id }}</h4>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="close" class="cancel-button">
              Cancel
            </button>
            <button @click="saveUser" :disabled="!validateFields()" class="save-button">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'edit-user-modal',
  props: {
    user: {
      type: Object,
      default: function () {
        return {};
      }
    },
    userslength: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentUser: {},
      firstLoad: true,
      actionType: ''
    };
  },
  methods: {
    close() {
      this.$emit('close');
      this.setData();
    },
    saveUser() {
      this.$emit('updateUserList', this.currentUser, this.actionType);
      this.close();
    },
    setData() {
      this.currentUser = Object.assign({}, this.user);
    },
    validateFields() {
      // Check if there are no empty fields
      return this.currentUser.firstName && this.currentUser.lastName && this.currentUser.email;
    }
  },
  watch: {
    user: {
      handler: 'setData',
      immediate: true
    }
  },
  mounted() {
    if (this.currentUser.id) {
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
}

.modal-header {
  display: flex;
  flex-direction: row;
  height: 60px;
  background-color: rgb(0,225,255);
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

%modal-default-button {
  width: 80px;
  height: 40px;
  margin: 5px;
  background-color: rgb(0,225,255);
  border: 1px solid gray;
}

%modal-default-button:hover {
  cursor: pointer;
}

.save-button {
  @extend %modal-default-button;
}

.cancel-button {
  @extend %modal-default-button;

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
