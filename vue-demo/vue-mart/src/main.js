import Vue from 'vue'
import axios from 'axios'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import './HttpInterceptor'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
