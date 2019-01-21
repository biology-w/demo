1.vue-route 配置
  . {path: '/login', component: Login}
  .路由出口 router-view // 路由的父类都要有。
  
2.路由传参
    . path/:id     //$route.params
    . path?id=1    // $route.query
    . {path: '/home', props: {}||Func } // 使用属性传参 获取；
        
3.子路由
    .嵌套： {children: []}
    
4.路由重定向
    .全局：router.beforeEach
    .路由级：beforeEnter
    .组件级: beforeRouteEnter  
    
5.路由守卫

6.vuex数据流 全局状态管理
    .数据共享的时候使用，组件之间共用；
    .数据修改：vueComponent --(Dispatch 异步)--> Actions --(Commit)--> Mutations --(Mutate)--> State --(Render)--> VueComponent;
     ..or vueComponent --($store.commit(funcName))即Commit 同步--> Mutations --(Mutate)--> State --(Render)--> VueComponent;
     ..组件不能直接修改state，必须通过Mutations修改；
    .{ state: {}, mutations: {}, actions: {}, getter: {}}
    . store.subscribe((mutation, state) => { console.log(mutation.type, mutation.payload)})
    .$store.state.xxx
    .commit('funcName')
    .dispatch('funcName')
    .便捷方法：mapState mapGetters mapMutations mapActions
    
7.Store
8.state
9.mutation
10.action
