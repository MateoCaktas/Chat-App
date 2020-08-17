<template>
  <button @click="onclick" class="button">
    {{ value }}
  </button>
</template>

<script>
export default {
  name: 'custom-button',
  props: {
    value: {
      type: String,
      required: true
    },
    onclick: {
      type: Function,
      default: () => {}
    }
  }
};
</script>

<style lang="scss" scoped>

.button {
  @include button;
}

</style>
