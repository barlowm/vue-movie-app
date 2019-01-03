<template lang="pug">
.item
	router-link(class="popular-item__title" :to="{ name: 'movie', path: '/movie/', params: { id: item.id } }")
		poster(:src="item.poster_path" size="sm" data-image-type="thumbnail")
			.title(slot="title") {{ item.title }}
	.vote
		span {{ item.vote_average }}
	.release-date {{ item.release_date | formatDate }}
</template>
<script>
import Poster from "@/components/Poster";
import filters from "@/filters";

export default {
  name: "popular",
  props: ["item"],
  components: {
    Poster
  },
  filters
};
</script>

<style scoped lang="scss">
.item {
  margin: 0 8px;
  position: relative;
  transition: all 0.3s ease;
  position: relative;
  z-index: 0;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.117647);
}

.vote {
  background-image: url(../assets/star.svg);
  background-repeat: no-repeat;
  background-position: center;
  height: 4em;
  width: 4em;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0.2em;
  right: 0.2em;
  background-size: cover;
  color: #fff;
}

.vote > span {
  padding-top: 0.6em;
  color: #fff;
  font-weight: 500;
}

.popular-item__title {
  display: block;
  overflow: hidden;
}
.popular-item__title {
  .poster {
    transition: transform 0.3s;
    transform: scale(1);
  }
}

.popular-item__title:hover {
  .poster {
    transform: scale(1.04);
  }
}
</style>
