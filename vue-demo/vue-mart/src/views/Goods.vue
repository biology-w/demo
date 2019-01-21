<template>
  <div>
    <h1>This is an about goods</h1>
    <ul>
      <li v-for="item in list" :key="item.id">{{item.text}}: {{item.price}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: []
      }
    },
    async created() {
      const res = await this.$axios.get('/api/goods')
      const { code, list } = res.data
      if (code === 200) {
        this.list = list
      }
    }
  }
</script>
