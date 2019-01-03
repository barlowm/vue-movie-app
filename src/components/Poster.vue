<template lang="pug">
.poster
	slot(name="title")
	template(v-if="src == undefined || src == null")
		.background-image(
			:data-image-type="dataImageType")
				.no-image No image
	template(v-else)
		.background-image(
			:data-image-type="dataImageType"
			:style="`background-image: url(${base_url}${img_size}${src})`")
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  props: {
    dataImageType: {
      type: String,
      default: "thumbnail"
    },
    src: {
      type: String,
      default: "undefined"
    },
    size: {
      type: String
    },
    fadeOnHover: {
      type: Boolean,
      required: false
    }
  },
  data: () => ({
    showImg: false
  }),
  computed: {
    ...mapGetters(["base_url"]),
    ...mapState(["poster_size", "thumb_size", "logo_size"]),
    img_size() {
      let size = "";
      switch (this.size) {
        case "sm":
          size = this.thumb_size;
          break;
        case "xs":
          size = this.logo_size;
          break;
        default:
          size = this.poster_size;
      }
      return size;
    }
  },
  methods: {
    imgLoaded: function() {
      const img = new Image();
      img.src = this.base_url + this.img_size + this.src;

      this.showImg = true;
    }
  }
};
</script>

<style lang="scss">
.poster {
  position: relative;
  overflow: hidden;

  .title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1em;
    background-color: rgba(45, 52, 54, 0.9);
    color: #fff;
    transform: translateY(100%);
    transition: transform 0.3s ease-out;
    border-top: 2px solid rgba(255, 255, 255, 0.9);
    box-shadow: 0 5px 5px -5px #000;
    font-family: "Helvetica Neue", Helvetica, Sans-serif;
  }

  &:hover {
    cursor: pointer;

    .title {
      z-index: 1;
      transform: translateY(0%);
      transition-delay: 0.1s;
    }

    .poster__img {
      transform: scale(1.05);
    }
  }
}

.no-image {
  position: absolute;
  top: 50%;
  transform: translate(-50%);
  left: 50%;
  white-space: nowrap;
  color: #000;
  padding: 10px;
}

.background-image {
  width: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

  &:before {
    content: "";
    display: block;
  }
}

[data-image-type="thumbnail"] {
  padding-top: (507 / 342) * 100%;
}

[data-image-type="poster"] {
  padding-top: (720 / 1280) * 100%;
}
</style>
