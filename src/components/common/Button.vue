<template>
  <button @click="$emit('click')" class="button">
    <slot>
      Default value
    </slot>
  </button>
</template>

<script>
export default {
  name: 'custom-button'
};
</script>

<style lang="scss" scoped>

.button {
  @include button;
}

</style>
