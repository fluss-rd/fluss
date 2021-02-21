import { shallowMount, createLocalVue } from '@vue/test-utils'
import Login from '@/views/Login.vue'
import { VueConstructor } from 'vue'

let localVue!: VueConstructor<Vue>

beforeEach(() => {
  localVue = createLocalVue()
})

describe('Login.vue', () => {
  it('renders login view', () => {
    const wrapper = shallowMount(Login, {
      localVue
    })
    expect(wrapper.text()).toMatch('Add the login view')
  })
})
