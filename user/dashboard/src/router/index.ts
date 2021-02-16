import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '*',
    redirect: 'Home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  }
]

export default routes

export const router = new VueRouter({
  routes
})
