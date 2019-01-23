<template>
    <div>
        <div class="carts" v-for="(item, index) in carts" :key="item.id">
            {{item.title}}
            <div class="right">
                <i class="cubeic-remove" @click="countMinus(index)"></i>
                {{item.cartCount}}
                <i class="cubeic-add" @click="countAdd(index)"></i>
            </div>
        </div>
        <div>总价: {{total}}</div>
        <cube-button :disabled="true" v-if="total<minTotal">
            还差{{minTotal - total }}可以购买
        </cube-button>
        <cube-button :disabled="!token" v-else>
            下单
            <span v-if="!token">
                （需要登陆）
            </span>
        </cube-button>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'
  export default {
    data() {
      return {
        minTotal: 1000
      }
    },

    computed: {
      ...mapState({
        carts: state => state.carts,
        token: state => state.token
      }),
      ...mapGetters({
        total: 'total'
      })
    },

    methods: {
      countMinus(index) {
        this.$store.commit('countMinus', index)
      },

      countAdd(index) {
        this.$store.commit('countAdd', index)
      }
    },
  }
</script>

<style lang="stylus" scoped>
.carts
    padding 10px
    text-align left
    .right
        float right
    i
        font-size 18px
</style>
