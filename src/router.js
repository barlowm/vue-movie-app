import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  scrollBehavior: () => ({ x: 0, y: 0 }),
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      component: () => import("./views/404.vue")
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/movie/:id",
      name: "movie",
      component: () => import("./views/Movie.vue"),
      props: true
    }
  ]
});
