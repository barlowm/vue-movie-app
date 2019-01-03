<template lang="pug">
.sort-and-search
	.controls
		button.toggle-btn.toggle-btn--sort(v-show="!showSort && !showSearch" :class="{ active : showSort && !showSearch }" @click="toggleSort")
		button.toggle-btn.toggle-btn--search(v-show="!showSearch && !showSort" :class="{ active : showSearch && !showSort }" @click="toggleSearch")
		button.toggle-btn.toggle-btn--close(@click.prevent="setDefaults" v-show="showSort || showSearch")
	transition-group(name="fadeHeight" key="div" tag="div" class="expand")
		div(key="search" v-if="showSearch" class="d-flex align-items-start search-panel")
			search
		div(key="sorting" v-if="showSort" class="d-flex align-items-start sort-panel")
			sorting
</template>

<script>
import Sorting from "@/components/Sorting";
import Search from "@/components/Search";

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Sorting,
    Search
  },
  data: () => ({
    sort: false,
    search: false,
    showSort: false,
    showSearch: false,
    selectsVisible: false
  }),
  methods: {
    toggleSort() {
      this.showSort = true;
      this.showSearch = false;
      if (this.mode == "mobile") this.$store.dispatch("APP_PADDING", "114px");
    },
    toggleSearch() {
      this.showSearch = true;
      this.showSort = false;
    },
    setDefaults() {
      this.showSort = false;
      this.showSearch = false;
      if (this.mode == "mobile") this.$store.dispatch("APP_PADDING", "64px");
    },

    onResize() {
      const TABLETS = 992;
      if (window.innerWidth <= TABLETS && !this.selectsVisible) {
        this.setDefaults();
        this.mode = "mobile";
      } else {
        this.mode = "desktop";
      }
    }
  },

  mounted() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  }
};
</script>

<style lang="scss">
.sort-and-search {
  display: flex;
  flex-direction: row-reverse;
}

.sort-btn,
.close-sort-btn {
  width: 40px;
  height: 40px;
  display: inline-block;
  background-repeat: no-repeat;
  background-size: 24px;
  background-position: center;
}

.close-sort-btn {
  align-self: flex-end;
  justify-content: center;
  align-items: center;
}

.sort-btn {
  margin-right: 10px;
  background-image: url(../assets/sort.svg);
}

.sort-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  z-index: 5;

  &:before {
    background-color: #212121;
    bottom: 0;
    content: "";
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: inherit;
    transition-delay: 150ms;
    width: 100%;
  }

  &--active {
    pointer-events: auto;
    touch-action: none;

    &:before {
      opacity: 0.46;
    }
  }
}

.sort-panel {
  position: absolute;
  right: 64px;
  top: 2px;
  background-color: #fff;
  left: 10px;

  @media (min-width: 992px) {
    background-color: transparent;
  }
}

.search-panel {
  position: absolute;
  background: #fff;
  right: 64px;
  top: 2px;
  left: 10px;

  @media (min-width: 992px) {
    left: auto;
    width: 100%;
    max-width: 44%;
  }
}

.toggle-btn {
  background-position: center;
  background-repeat: no-repeat;
  min-width: 40px;
  min-height: 40px;
  display: inline-block;
  margin-left: 10px;
  border: 0;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c4c4c4;
    cursor: pointer;
  }

  &.active:not(.toggle-btn--close) {
    background-color: lightgray;
  }

  &:focus {
    outline: none;
  }

  &--sort {
    background-image: url(../assets/sort.svg);
  }

  &--search {
    background-image: url(../assets/search.svg);
    background-size: 16px;
  }

  &--close {
    background-image: url(../assets/cancel.svg);
    background-size: 20px;
    background-color: lightgray;
  }
}

.expand {
  .sort-selects {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 992px) {
    .sort-selects {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;

      .dropdown {
        margin-left: 10px;
      }
    }
  }
}

.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: opacity 0.5s;
  //max-height: 230px;
  //opacity: 1
}
.fadeHeight-enter,
.fadeHeight-leave-to {
  opacity: 0;
  //max-height: 0px;
}
</style>
