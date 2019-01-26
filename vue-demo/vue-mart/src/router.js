import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Login from './views/Login.vue';
import Cart from './views/Cart.vue';

import History from './utils/history'

import store from './store'

Vue.use(History)
Vue.use(Router)

// 实例化之前，扩展Router
Router.prototype.goBack = function() {
  this.isBack = true
  this.back()
}

const router = new Router({
  mode: 'history', // 使用历史模式
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      meta: { auth: true },
      component: Login
    },
    {
      path: '/cart',
      name: 'cart',
      // meta: { auth: true },
      component: Cart
    },
    {
      path: '/about',
      name: 'about',
      meta: { auth: true }, // 用于将来验证 判断路由是否要保护等；这只是一种方式
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

// 守卫
router.beforeEach((to, from, next) => {
  if(to.meta.auth) { // 需要认证，则检查令牌
    if(store.state.token) { // 是否有令牌 或者其他的一些判断
      if (to.path === '/login') {
        next('/')
      } else {
        next()
      }
    } else {
      // 去登陆
      if (to.path !== '/login') {
        next({
          path: '/login',
          query: { redirect: to.path }
        })
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

// 记录历史记录
router.afterEach((to, from) => {
  if(router.isBack) { // 后退
    History.pop()
    router.isBack = false
    router.transitionName = 'route-back'
  } else {
    History.push(to.path)
    router.transitionName = 'route-forward'
  }
})

export default router
