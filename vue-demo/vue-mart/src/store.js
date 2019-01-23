import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    carts: JSON.parse(localStorage.getItem('carts')) || []
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    addCart(state, item) {
      const tar = state.carts.find(cart => cart.id === item.id)
      if (tar) {
        tar.cartCount += 1;
      } else {
        state.carts.push({
          ...item,
          cartCount: 1
        })
      }
    },

    countMinus(state, index) {
      const tar = state.carts[index]
      if(tar.cartCount > 1) {
        tar.cartCount -= 1;
      } else {
        state.carts.splice(index, 1)
      }
    },

    countAdd(state, index) {
      state.carts[index].cartCount += 1;
    }
  },
  actions: {

  },
  getters: {
    isLogin: state => !!state.token,
    cartTotal: state => {
      let num = 0
      state.carts.forEach(cart => {
        num += cart.cartCount
      })
      return num;
    },
    total: state => state.carts.reduce((num, cart) => num += cart.cartCount * cart.price, 0)
  }
})

// 订阅store的变化，可进行一些操作；eg: follow
store.subscribe((mutations, state) => {
  switch(mutations.type) {
    case 'setToken':
      // if(state.token) {
      //   localStorage.setItem('token', JSON.stringify(state.token))
      // }
      break;
    case 'addCart':
      localStorage.setItem('carts', JSON.stringify(state.carts))
      break;
  }
})

export default store
