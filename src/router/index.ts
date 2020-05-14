import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/sd",
    name: "sd",
    component: () =>
      import("../components/sd/sd-arithmetic.vue")
  },
  {
    path: "/sd-ele",
    name: "sd-ele",
    component: () =>
      import("../components/sd/sd-arithmetic-ele.vue")
  },
  {
    path: "/sd-chart",
    name: "sd-chart",
    component: () =>
      import("../components/sd/sd-chart.vue")
  },
  {
    path: "/echarts-map",
    name: "echarts-map",
    component: () =>
      import("../components/echarts/echarts-map.vue")
  },
  {
    path: "/query-builder",
    name: "query-builder",
    component: () =>
      import("../components/queryBuilder/index.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
