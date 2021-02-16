import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {}
})

export const dispatch = (output: { type: string; payload: object }) =>
  store.commit(output.type, output.payload)

export default store