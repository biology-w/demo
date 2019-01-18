<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <FormTest :title="title"></FormTest>
    <i class="el-icon-edit"></i>
    <el-button type="primary" icon="el-icon-search">search</el-button>
    <p v-if="showName">{{name}}</p>
    <ul>
      <li v-for="(good, index) in goods" :key="good.id">
        <span>{{good.text}}</span>
        <span>￥{{good.price}}</span>
        <button @click="addGood(index)">添加</button>
      </li>
    </ul>
    <Cart :name="name" />
    <KButton @testClick="handleChildren"></KButton>
  </div>
</template>

<script>
  import axios from 'axios'

  // import HelloWorld from './components/HelloWorld.vue'
  import Cart from './components/Cart'
  import FormTest from './components/UITest/FormTest'
  import KButton from './components/UITest/KButton'

export default {
  name: 'app',
  components: {
    // HelloWorld,
    Cart,
    FormTest,
    KButton
  },
  data() {
    return {
      name: 'test--购物车',
      title: 'test--购物车',
      showName: false,
      goods: [],
      text: ''
    }
  },
  async created() {
    // axios.get('/api/goods').then(res => {
    //   this.goods = res.data.list
    // }).catch(err => {
    //   console.log(err)
    // })
    // 或者
    try {
      const response = await axios.get('/api/goods')
      this.goods = response.data.list
    } catch (e) {
      // error deal
    }


  },
  methods: {
    addGood(i) {
      const good = this.goods[i];
      this.$root.$emit('addCart', good)
      // or
      // 使用Vue原型上的实例¥bus的方法
      // this.$bus.$emit('addCart', good)
    },
    handleChildren(data) {
      console.log('handleChildren--data')
      console.log(data)
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
  margin-top: 60px;
}
</style>
