<template lang="pug">
.details
	h2 {{ details.title }}

	.info
		dl.vote-average
			dt Vote average
			dd {{ details.vote_average }}

		dl.vote-count
			dt Vote count
			dd {{ details.vote_count }}

		dl.vote-count
			dt Popularity
			dd {{ details.popularity }}

		dl.details-release-date
			dt Release date
			dd {{ details.release_date | formatDate }}

	template(v-if="details.backdrop_path == null")
	template(v-else)
		poster(:src="details.backdrop_path" data-image-type="poster")

	ul.description-list
		li
			p {{ details.overview }}

	ul.genres-list(v-show="details.genres")
		li.title
			b Genres
		li(v-for="item in details.genres")
			span.tag {{ item.name }}

	similar(:id="id")

	ul.production-list(v-show="details.production_companies")
		li.title
			b Production companies
		li(v-for="item in details.production_companies")
			template(v-if="item.logo_path")
				poster(:src="item.logo_path" size="xs" :fade-on-hover="false" class="thumb")
			template(v-else)
				.name {{ item.name }}
</template>

<script>
import Poster from "@/components/Poster";
import Similar from "@/components/Similar";
import { mapState } from "vuex";
import filters from "@/filters";

export default {
  name: "movie",
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  components: {
    Poster,
    Similar
  },
  watch: {
    id() {
      this.$store.dispatch("GET_DETAILS", this.id);
    }
  },
  filters,
  computed: {
    ...mapState(["details"])
  },

  created() {
    this.$store.dispatch("GET_DETAILS", this.id);
  },

  mounted() {
    this.$store.dispatch("TOGGLE", { main_spinner: true });
  }
};
</script>

<style lang="scss">
.details {
  h2 {
    padding: 0;
    font-size: 2em;
    @media (min-width: 992px) {
      padding-top: 1em;
      padding-bottom: 1em;
    }
  }
  margin-bottom: 100px;
}
.production-list,
.genres-list,
.description-list {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  padding: 0;

  > li {
    list-style: none;
    text-align: center;
    padding: 0;
    margin: 0;
    position: relative;
  }

  > .title {
    text-align: center;
    font-size: 1em;
  }

  > .name {
    font-size: 14px;
  }
}

.production-list {
  li {
    padding: 15px;
  }
}

.genres-list {
  li {
    margin: 10px;
  }
}

.description-list p {
  padding: 1em 0 0;
  text-align: left;
  margin-bottom: 0;
  font-size: 1em;
  @media (min-width: 992px) {
    font-size: 1.4em;
  }
}

.info {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  dl {
    //padding: 0 1em;
    padding: 0;
    color: rgba(99, 110, 114, 1);
  }

  dt {
    padding: 0 1em;
    font-size: 1em;
  }

  dd {
    padding: 0 1em;
    font-size: 1.5em;
    display: inline-block;
    letter-spacing: 2px;
    font-weight: 700;
  }
}

.movie-similar {
  margin-bottom: 20px;
}

.thumb {
  width: 60px;
  .background-image {
    background-color: transparent;
  }
}

.production-list {
  &:before {
    background-color: #fff;
  }
}

.tag {
  background-color: #636e72;
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
}
</style>
