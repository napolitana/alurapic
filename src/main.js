import Vue from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrashAlt,
  faEdit,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import { routes } from "./routes";
import "./directives/Transform";
import VeeValidade from "vee-validate";
import msg from "./pt_BR";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/reset.css";
import "./assets/css/styles.css";

Vue.use(VueResource);
Vue.http.options.root = "http://localhost:3000";

Vue.use(VueRouter);
const router = new VueRouter({
  routes: routes,
  mode: "history"
});

Vue.use(VeeValidade, {
  locale: "pt_BR",
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
});

library.add([faTrashAlt, faEdit, faSearch]);

Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
});
