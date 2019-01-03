<template lang="pug">
header
	.container
		.d-flex.justify-content-between.align-items-center
			logo(to="/")
			sort-and-search(v-show="home")
			button.back-btn(v-show="!home" @click="back")
</template>

<script>
import Logo from "@/components/Logo";
import SortAndSearch from "@/components/SortAndSearch";

export default {
  components: {
    Logo,
    SortAndSearch
  },
  computed: {
    home() {
      return this.$route.name == "home";
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
header {
  padding: 10px 0;
  background: #fff;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 1;
}

.back-btn {
  width: 40px;
  height: 40px;
  border: none;
  background-image: url(../assets/undo.svg);
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  background-color: rgb(221, 221, 221);
  display: inline-block;
  background-size: 18px;

  &:hover {
    background-color: darken(rgb(221, 221, 221), 10%);
    cursor: pointer;
  }

  &:focus {
    outline: none;
    background-color: rgba(221, 221, 221, 0.4);
  }
}
</style>
