<template>
  <div class="home">
      <!-- 页头 -->
      <c-header title="HOME"></c-header>

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
      <good-list :goods="filterGoods" @addCart="onAddCart"></good-list>

      <!--分类列表-->
      <cube-drawer
              ref="drawer"
              title="请选择分类"
              :data="[drawerList]"
              @select="selectHandler"
      >

      </cube-drawer>

      <div class="ball-wrap">
          <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
              <div class="ball" v-show="ball.show">
                  <div class="inner">
                      <div class="cubeic-add"></div>
                  </div>
              </div>
          </transition>
      </div>
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
      ball: {
        show: false, // 显示控制
        el: null // 目标dom引用
      },
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

      this.$notice.info({
        duration: 2,
        content: "一些消息内容"
      });
    },

    selectHandler(val) {
      this.selectedKeys = [...val];
    },

    onAddCart(el) {
      this.ball.el = el;
      this.ball.show = true // 触发动画钩子
    },

    beforeEnter(el) { // el 是小球dom
      // targetDom  获取点击的dom位置
      const clickDom = this.ball.el;
      // getBoundingClientRect用于获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left等属性
      const clickRect = clickDom.getBoundingClientRect();
      // el.getBoundingClientRect(); 获取小球位置集合均为0，因为是绝对定位;所以不能使用这个来计算小球移距离;
      // 获取小球移动的距离（小球位置是 left: 50%, bottom: 0px;）
      // 2. 把小球移动到点击的位置
      const x =  -(window.innerWidth / 2 -clickRect.left);
      const y = -(window.innerHeight - clickRect.top - 20);
      // el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      const inner = el.querySelector('.inner');
      el.style.transform = `translate3d(0, ${y}px, 0)`;
      inner.style.transform =  `translate3d(${x}px, 0, 0)`;

    },

    enter(el, done) {
      // 把小球移动到初始位置 加上动画
      // 获取offsetHeight就会重绘，前面的变量名随意 主要为了eslint校验
      document.body.offsetHeight;
      // 动画开始，移动到初始位置
      // 小球移动到购物车位置
      el.style.transform = `translate3d(0,0,0)`;
      const inner = el.querySelector('.inner');
      inner.style.transform = `translate3d(0, 0, 0)`
      el.addEventListener("transitionend", done);
    },

    afterEnter(el) {
      // 结束 隐藏小球
      this.ball.show =false;
      el.style.display = 'none'

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

<style scoped lang="stylus">
  .ball-wrap {
      .ball {
          position: fixed;
          left: 50%;
          z-index: 100000;
          bottom: 0px;
          color: red;
          transition: all 0.3s cubic-bezier(0.49, -0.29, 0.75, 0.41)
          .inner {
              height: 20px;
              width: 20px;
              transition: all 0.3s linear;
              .cubeic-add {
                  font-size: 22px;
              }
          }
      }
  }
</style>
