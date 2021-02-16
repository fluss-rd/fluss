import { shallowMount, createLocalVue } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import { VueConstructor } from 'vue'

let localVue!: VueConstructor<Vue>

beforeEach(() => {
  localVue = createLocalVue()
})

describe('Home.vue', () => {
  it('renders Home view', () => {
    const wrapper = shallowMount(Home, {
      localVue
    })
    expect(wrapper.text()).toMatch('Home view')
  })
})