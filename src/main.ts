import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Chart } from "@antv/g2"
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import 'echarts-gl'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;
Vue.prototype.$http = axios;

Vue.use(ElementUI)

import store from "./store";

Vue.prototype.Chart = Chart;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
