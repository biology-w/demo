<template>
    <div>
        <button @click="login">login</button>
    </div>
</template>

<script>
  export default {
    created() {
      console.log(this)
    },
    methods: {
      async login() {
        console.log('this')
        console.log(this)
        const res = await this.$store.dispatch('submitLogin')
        // 可以使用res 或者 this.$store.state.isLogin
        if (this.$store.state.isLogin) {
          const { redirect } = this.$route.query
          console.log(redirect)
          if (redirect) {
            this.$router.push(redirect)
          } else {
            this.$router.push('/')
          }
        } else {
          alert('登陆失败！请重试！')
        }
      }
    },
  }
</script>

<style scoped>

</style>
