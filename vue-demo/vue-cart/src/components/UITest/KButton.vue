<template>
    <el-button @click="handleClick">children</el-button>
</template>

<script>
    export default {
      // created() {
        // this.$on('testClick', this.testCClick)
      // },
      methods: {
        handleClick() {
          this.$emit('testClick', { msg: 'children' })
        }
        // testCClick(data) {
        //   console.log('testCClick-data')
        //   console.log(data)
        // }
      }
    }
</script>
