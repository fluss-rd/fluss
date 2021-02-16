import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import { dispatch } from '@/store'

const Vue = createLocalVue()
Vue.use(Vuex)

jest.mock('vuex', () => ({
  Store: function () {
    return {
      commit: () => 'called'
    }
  },
  mapState: jest.fn(),
  mapGetters: jest.fn(),
  mapActions: jest.fn()
}))

describe('loads store', () => {
  it('dispatches and commits to store', () => {
    expect(dispatch({ type: 'test', payload: JSON.parse('{"name": "dummy"}') })).toBe('called')
  })
})