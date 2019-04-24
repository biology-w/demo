<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <p v-if="showName">{{name}}</p>
    <ul>
      <li v-for="(good, index) in goods" :key="good.id">
        <span>{{good.name}}</span>
        <span>¥{{good.price}}</span>
        <button @click="addGood(index)">+</button>
      </li>
    </ul>

    <el-button>el-button</el-button>
    <Cart :name="name"/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Cart from "./components/Cart.vue";

export default {
  name: "app",
  data() {
    return {
      name: "购物车",
      showName: true,
      goods: []
    };
  },
  components: {
    // HelloWorld
    Cart
  },
  async created() {
    setTimeout(() => {
      this.showName = false;
    }, 3000);
    const value = await this.$axios.get("/api/goods");
    this.goods = value.data.data;
  },
  methods: {
    addGood(i) {
      const good = this.goods[i];
      this.$bus.$emit("addGood", good);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
