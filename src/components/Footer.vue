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
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  bottom: 0;
  width: 100%;
  height: 50px;
  color: $secondary-color;
  font-size: 18px;
  background-color: $primary-color;
  border-top: 1px solid $tertiary-color;
  border-bottom: 1px solid $tertiary-color;
}
</style>
