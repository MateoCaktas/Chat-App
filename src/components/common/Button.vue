<template>
  <button @click="$emit('click')" class="button">
<<<<<<< HEAD
    <slot>
=======
    <slot name="value">
>>>>>>> 203be6a523037b9f038248766f375be3e7330fc3
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
