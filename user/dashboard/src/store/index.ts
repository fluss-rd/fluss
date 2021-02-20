import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    setCount(state) { 
      state.count += 1;
    }
  },
  actions: {
    incrementCount(context) {
      context.commit('setCount', context.state.count + 1);
    }
  }
})

export const dispatch = (output: { type: string; payload: object }) =>
  store.commit(output.type, output.payload)

export default store  