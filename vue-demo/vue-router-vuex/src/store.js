import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1000000000,
    isLogin: false
  },
  // 修改数据
  mutations: {
    login(state) {
      state.isLogin = true
    },
    logout(state) {
      state.isLogin = false
    },
    increase(state) {
      state.count += 1
    }
  },

  // 对state中的数据进行加工处理
  getters: {
    money: state => {
      return state.count + '元'
    }
  },

  // 异步操作时使用
  actions: {
    submitLogin({commit}, payload) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('login')
          resolve(true)
        }, 2000)
      })
    },

    // 第一个参数 store 对象
    asyncIncrease({ state, commit }, payload) {
      setTimeout(() => {
        // 使用commit 调用increase
        commit('increase');
      }, 1000)
    }
  }
})
