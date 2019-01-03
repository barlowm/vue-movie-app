<template lang="pug">
transition(name="fade")
  .error(v-if="showError")
    h4.animated.fadeInDown {{ message }}
</template>

<script>
export default {
  props: {
    showError: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: "Something went wrong..."
    }
  },
  watch: {
    showError(val) {
      this.toggleScroll(val);
    }
  },
  methods: {
    toggleScroll(val) {
      document.body.style.overflow = val ? "hidden" : "visible";
    }
  }
};
</script>

<style lang="scss" scoped>
.error {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-size: 4em;
  background-color: #fff;
  z-index: 2;
  overflow: hidden;
}

h4 {
  font-size: 50px;
  letter-spacing: 4px;
}
</style>
