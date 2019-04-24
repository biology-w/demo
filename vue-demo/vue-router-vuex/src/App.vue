<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/static">static</router-link>|
      <router-link to="/page1/page1">page1</router-link>|
      <router-link to="/about/test">About</router-link>|
      <router-link to="/page2/1/page2?foo=212">About</router-link>|
      <router-link to="/parent">parent</router-link>|
      <router-link to="/parent/children">children</router-link>|
      <router-link to="/parent/childrenTwo">children</router-link>
    </div>
    <!-- 展示子路由组件 -->
    <router-view />
  </div>
</template>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

  .router-link-active {
    color: red;
  }
</style>
