import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Another from "../views/Another.vue";
import New from "../views/New.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "*",
    redirect: "Home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/another",
    name: "Another",
    component: Another,
  },
];

export default routes;

export const router = new VueRouter({
  routes,
});
