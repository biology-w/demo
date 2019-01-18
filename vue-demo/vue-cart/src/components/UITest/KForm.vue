<template>
    <form :model="model" :rules="rules">
        <slot></slot>
    </form>
</template>

<script>
  export default {
    provide() {
      return {
        form: this
      }
    },
    props: {
      model: {
        type: Object,
        required: true
      },
      rules: {
        type: Object
      }
    },
    created() {
      // 缓存需要验证的表单项
      this.fields = []
      // 监听需要验证的选项；并缓存；
      this.$on('formItemAdd', item => this.fields.push(item))
    },
    methods: {
      async validate(callback) {
        const tasks = this.fields.map(item => item.validate())
        const results = await Promise.all(tasks);
        let flag = true
        results.forEach(valid => {
          if (!valid) {
            flag = false
          }
        });
        callback(flag)
      }
    },
  }
</script>

<style scoped>

</style>
