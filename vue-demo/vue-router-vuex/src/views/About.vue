<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>msg: {{$route.params.msg}}</p>
    <p>foo: {{foo}}</p>
    <button @click="inc">increase</button>
    <button @click="asyncInc">asyncIncrease</button>
    <p>{{count}}</p>
    <p>{{money}}</p>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

  export default {
    props: {
      foo: {
        type: String,
        default: ''
      },
    },
    methods: {
      ...mapMutations(['increase']),
      ...mapActions(['asyncIncrease']),
      beforeRouteEnter(to, from, next) {
        next()
      },
      inc() {
        // or: this.$store.commit('increase')
        this.increase()
      },
      asyncInc() {
        // or: this.$store.dispatch('asyncIncrease')
        this.asyncIncrease()
      }
    },
    computed: {
      // or: count: this.$store.state.count
      ...mapState(['count']),
      ...mapGetters(['money'])
    }

  }
</script>
