<template lang="pug">
router-link(class="logo" :to="to" @click.native="logoClick")
	img(class="logo__img" src="@/assets/logo.svg")
	span.logo__text Only movies
</template>

<script>
export default {
  name: "logo",
  props: ["to"],
  methods: {
    logoClick() {
      this.$store.dispatch("GET_FILMS", {
        url: "/discover/movie",
        key: "popular",
        clear: true
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.logo {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  position: relative;
  z-index: 0;

  @media (min-width: 992px) {
    z-index: 1;
  }

  &__img {
    height: 2.4em;
    position: absolute;
    display: block;
    left: 0;
    top: 4px;
    transition: all 0.3s ease-in-out;
    transform: scale(1);
  }

  &__text {
    font-size: 2em;
    color: #000;
    font-weight: 500;
    white-space: nowrap;

    &:after {
      content: "O";
      display: block;
      position: absolute;
      left: 0;
      bottom: -4px;
      font-size: 1.6em;
      line-height: 1.2;
      width: 0.8em;
      text-align: center;
      transform: scale(0);
      transition: all 0.3s ease-in-out;
      color: #636e72;
    }

    &:first-letter {
      display: block;
      margin-right: 0.4em;
      opacity: 0;
      letter-spacing: 0.15em;
    }
  }

  &:hover {
    color: #000;
    text-decoration: none;

    .logo__img {
      transform: scale(0);
    }

    .logo__text {
      &:after {
        transform: scale(1);
      }
    }
  }
}
</style>
