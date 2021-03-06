import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLazyload from "vue-lazyload";

import "bootstrap-css-only/css/bootstrap-reboot.css";
import "bootstrap-css-only/css/bootstrap-grid.css";
import "animate.css/animate.css";
import "hover.css/css/hover.css";

Vue.use(VueLazyload);
Vue.config.productionTip = false;

new Vue({ router, store, render: h => h(App) }).$mount("#app");
