import Vue from 'vue'
import axios from 'axios'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import './HttpInterceptor'

import notice from './utils/notice'
import CHeader from './components/Header'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$notice = notice

// 全局引入Header.vue
Vue.component('c-header', CHeader)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
