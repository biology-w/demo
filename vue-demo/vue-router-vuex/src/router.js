import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Parent from './views/Parent.vue'
import Children from './views/Children.vue'
import ChildrenTwo from './views/ChildrenTwo.vue'

import store from './store.js';

Vue.use(Router)
function func({ params, query }) {
  return {
    id: params.id,
    msg: params.msg,
    foo: query.foo
  }
}
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      // redirect: '/about'
      // beforeEnter(to, from, next) {
      //   next()
      // }
    },
    {
      path: '/about/:msg',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      beforeEnter(to, from, next) {
        if (store.state.isLogin) {
          next()
        } else {
          next('/login?redirect=' + to.path)
        }
      }
    },
    {
      path: '/static',
      props: { foo: 'static' }, //给组件传静态值
      component: () => import(/* webpackChunkName: "static"*/ './views/About.vue')
    },
    {
      path: '/page1/:foo',
      props: true, // 将route.params 传值 ({foo})
      component: () => import(/* webpackChunkName: "page1"*/ './views/About.vue')
    },
    {
      path: '/page2/:id/:msg',
      props: func,
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/parent',
      component: Parent,
      // redirect: '/about'
      // beforeEnter(to, from, next) {
      //   next()
      // }
      children: [
        {
          path: 'children',
          component: Children
        },
        {
          path: 'childrenTwo',
          component: ChildrenTwo
        }
      ]
    }
  ]
})
//
// router.beforeEach((to, from, next) => {
//   // if (to.path !== '/login') {
//   //  if (!localStorage.isLogin) {
//   //    next('/login?redirect=' + to.path)
//   //  }
//   //
//   // }
//   next()
// })

export default router
