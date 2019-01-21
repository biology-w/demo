<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">login</router-link> |
      <router-link to="/goods">goods</router-link> |
    </div>
    <button v-if="isLogin" @click="logout">登出</button>
    <router-view/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    methods: {
      logout() {
        this.$axios.get('/api/logout')
      },
    },
    computed: {
      ...mapGetters(['isLogin'])
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
</style>
