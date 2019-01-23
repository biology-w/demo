<template>
    <div id="app">
        <!--<div id="nav">-->
        <!--<router-link to="/">Home</router-link> |-->
        <!--<router-link to="/about">About</router-link> |-->
        <!--<router-link to="/login">login</router-link> |-->
        <!--<router-link to="/goods">goods</router-link> |-->
        <!--</div>-->
        <!--<button v-if="isLogin" @click="logout">登出</button>-->
        <!--<router-view/>-->
        <transition name="move-route">
            <router-view class="child-view"></router-view>
        </transition>

        <cube-tab-bar
                show-slider
                :data="tabs"
                v-model="selectLabel"
                @change="changeHandler"
        >
            <cube-tab
                    v-for="(item, index) in tabs"
                    :key="index"
                    :icon="item.icon"
                    :label="item.value"
            >
                <span >{{item.label}}</span>
                <span class="badge" v-if="showBadge(item.label)">{{cartTotal}}</span>
            </cube-tab>
        </cube-tab-bar>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        selectLabel: '/',
        tabs: [
          {label: "Home", value: "/", icon: "cubeic-home"},
          {label: "Cart", value: "/cart", icon: "cubeic-mall"},
          {label: "Me", value: "/login", icon: "cubeic-person"}
        ]
      }
    },
    created() {
      // 初始化：eg:在浏览器输入地址
      this.selectLabel = this.$route.path
    },
    methods: {
      logout() {
        this.$axios.get('/api/logout')
      },
      changeHandler(value) {
        this.$router.push(value)
      },

      showBadge(label){
        return label === 'Cart' && this.cartTotal > 0;
      }

    },
    computed: {
      ...mapGetters(['isLogin', 'cartTotal'])
    },
    watch: {
      // 路由变化时，同步tabs选中
      $route(route) {
        this.selectLabel = route.path
      }
    }
  }
</script>
<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

    .cube-tab-bar {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
    }

    .cube-tab-bar-slider {
        top: 0;
    }

    /*页面滑动动画*/
    /*入场前*/
    .move-route-enter {
        transform: translate3d(-100%, 0, 0);
    }

    /*出场后*/
    .move-route-leave-to {
        transform: translate3d(100%, 0, 0);
    }

    .move-route-enter-active,
    .move-route-leave-active {
        transition: transform 0.3s;
    }

    .child-view {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        padding-bottom: 36px;
    }

    span.badge {
        display: inline-block;
        background: #de3529;
        color: white;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
    }
</style>
