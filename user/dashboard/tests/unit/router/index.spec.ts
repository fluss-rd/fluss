import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import App from '@/App.vue'
import { router } from '@/router'
import Vuetify from 'vuetify'
import Vue from 'vue'

describe('router', () => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  Vue.use(Vuetify)

  const wrapper = shallowMount(App, {
    localVue,
    router
  })

  it('goes to /home', async () => {
    wrapper.vm.$router.push({ name: 'Home' })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$route.path).toBe('/home')
  })
})