import Vue from "vue";
import App from "./App.vue";

import regeneratorRuntime from "regenerator-runtime";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import VueGoogleCharts from 'vue-google-charts'

import Axios from "axios";

import "./assets/css/reset.css";
import "./assets/css/base.css";

Vue.prototype.$http = Axios;

library.add(faAngleRight, faAngleLeft);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(VueGoogleCharts)

new Vue({
  el: "#app",
  render: h => h(App)
});
