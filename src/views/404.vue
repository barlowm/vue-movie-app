<template lang="pug">
.not-found
  h4.animated.fadeInDown PaGe iS NoT FoUnd!
</template>

<script>
export default {
  created() {
    this.$store.dispatch("TOGGLE", { main_spinner: false });
  }
};
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  background-color: #fff;
}

h4 {
  font-size: 50px;
  letter-spacing: 4px;
  font-weight: 300;
  &:first-letter {
    display: inline-block;
    font-size: 60px;
    color: #636e72;
    font-weight: 500;
  }
}
</style>
