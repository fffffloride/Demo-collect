import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Chart } from "@antv/g2"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(ElementUI)

import store from "./store";

Vue.config.productionTip = false;
Vue.prototype.Chart = Chart;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
