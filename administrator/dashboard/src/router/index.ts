import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '*',
    redirect: 'Login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  }
]

export default routes

export const router = new VueRouter({
  routes
})
