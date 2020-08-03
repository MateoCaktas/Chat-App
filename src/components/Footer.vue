<template>
  <div class="footer">
    <p> This is the footer </p>
  </div>
</template>

<script>
export default {
  name: 'custom-footer'
};
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: $primary-color;
}
</style>
