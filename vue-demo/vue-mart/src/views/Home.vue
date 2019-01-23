<template>
  <div class="home">
    <h1>Home</h1>
    <!--<img alt="Vue logo" src="../assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->

      <cube-slide
              :data="slider"
              :interval="5000"
      >
          <cube-slide-item
                  v-for="item in slider"
                  :key="item.id"
          >
              <router-link
                      :to="`/detail/${item.id}`"
              >
                  <img :src="item.img" alt="slider" />
              </router-link>
          </cube-slide-item>
      </cube-slide>

      <!--分类按钮-->
      <cube-button @click="showCatg">选择分类</cube-button>

      <!--商品列表-->
      <good-list :goods="filterGoods"></good-list>

      <!--分类列表-->
      <cube-drawer
              ref="drawer"
              title="请选择分类"
              :data="[drawerList]"
              @select="selectHandler"
      >

      </cube-drawer>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import GoodList from '../components/Goods.vue';

const labels = {
  fe: "前端",
  python: "Python",
  java: "Java",
  bigdata: "大数据",
  ai: "人工智能"
};

export default {
  name: 'home',
  components: {
    GoodList
  },
  data() {
    return {
      slider: [],
      goods: [],
      selectedKeys: [],
      keys: []
    }
  },
  async created() {
    try {
      const { data: { data: goods, slider, keys } } = await this.$axios.get('/api/goods')
      this.goods = goods;
      this.slider = slider;
      this.keys = keys;
      this.selectedKeys = [ ...keys]
    } catch (e) {
      console.log(e)
    }

  },
  methods: {
    showCatg() {
      this.$refs.drawer.show()
    },
    selectHandler(val) {
      this.selectedKeys = [...val];
    }
  },
  computed: {
    filterGoods() {
      let ret = []
      this.selectedKeys.forEach(v => {
        ret = ret.concat(this.goods[v])
      })
      return ret;
    },
    drawerList() {
      return this.keys.map(v => {
        return {
          value: v,
          text: labels[v]
        }
      })
    }
  }
}
</script>

<style scoped>
  .home {
    /*background-color: red;*/
  }
</style>
