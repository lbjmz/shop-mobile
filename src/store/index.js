import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { isCollection: false },
  getters: {},
  mutations: {
    setIsCollection(state, value) {
      state.isCollection = value;
    },
  },
  actions: {
    fetchCollection({ commit }) {
      // 异步获取isCollection的值，例如使用async/await或者发起Ajax请求
      // 然后通过commit触发mutation更新isCollection的值
    },
    toggleCollection({ commit, state }) {
      const newValue = !state.isCollection;
      // 异步将newValue保存到服务器，例如使用async/await或者发起Ajax请求
      // 成功后通过commit触发mutation更新isCollection的值
      commit("setIsCollection", newValue);
    },
  },
  modules: {},
  
});
