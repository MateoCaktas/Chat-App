<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="modal-header"></slot>
        </div>
        <div class="modal-body">
          <slot name="modal-body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="modal-footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'custom-modal-window'
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
  overflow: scroll;
}

.modal-header {
  display: flex;
  flex-direction: row;
  height: 60px;
  color: $secondary-color;
  background-color: $primary-color;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid $tertiary-color;

  h3 {
    margin-top: 0;
    color: #42b983;
  }
}

.modal-body {
  display: flex;
  flex-direction: column;
  max-height: 500px;
  overflow: scroll;
  margin-bottom: 5px;
  align-items: center;
}

.modal-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
  border-top: 1px solid $tertiary-color;
  background-color: lightgray;
}

@media only screen and (max-width: 600px) {
  .modal-container {
    width: 100%;
  }
}
</style>
