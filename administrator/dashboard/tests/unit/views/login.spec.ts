import { shallowMount, createLocalVue } from '@vue/test-utils'
import Login from '@/views/Login.vue'
import { VueConstructor } from 'vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

let localVue!: VueConstructor<Vue>

beforeEach(() => {
  localVue = createLocalVue()
})

describe('Login.vue', () => {
  it('renders login view', () => {
    const wrapper = shallowMount(Login, {
      localVue
    })
    expect(wrapper.text()).toMatch('Inicio de sesion')
  })
})
