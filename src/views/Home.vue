<template lang="pug">
section
	ul.popular.row.m-0
		li.col-6.col-sm-6.col-md-4.col-lg-3(v-for="(item, index) in popularItems")
			popular(:item="item" :key="item.id")
	spinner(:is-loading="popularLength" :is-relative="true")
</template>

<script>
import Popular from "@/components/Popular";
import Spinner from "@/components/Spinner";
import Sorting from "@/components/Sorting";
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "home",
  components: {
    Popular,
    Spinner,
    Sorting
  },
  data: () => ({
    enableLoading: true
  }),
  computed: {
    ...mapGetters(["popular", "page", "sort_options"]),
    popularItems() {
      return this.popular.filter(
        item => item.backdrop_path !== null || item.backdrop_path !== undefined
      );
    },
    popularLength() {
      return this.popular.length > 1;
    }
  },
  methods: {
    scroll() {
      const self = this;
      window.addEventListener("scroll", () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow && this.enableLoading) {
          this.nextPage(self);
        }
      });
    },

    getFilms() {
      this.$store.dispatch("GET_FILMS", {
        url: "/discover/movie",
        key: "popular",
        params: {
          ...this.sort_options
        }
      });
    },

    nextPage: _.debounce(self => {
      self.getFilms();
    }, 600)
  },
  created() {
    this.getFilms();
  },
  mounted() {
    this.scroll();
  }
};
</script>

<style lang="scss">
.popular {
  position: relative;
  padding: 0;
  padding-bottom: 100px;
  min-height: 100vh;

  .item {
    height: 100%;
  }
}

.popular > li {
  list-style: none;
  padding: 0;
  margin: 8px 0;
}

.release-date {
  position: absolute;
  transform: rotate(-45deg);
  transform-origin: center bottom;
  top: 10px;
  left: 10px;
  padding: 2px;
  color: white;
  display: inline-block;
  background-color: #2d3436;
  border: 1px solid #fff;
  display: none;
}
</style>
