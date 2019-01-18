<template>
    <div>
        <label v-if="label">{{label}}</label>
        <div>
            <slot></slot>
            <p v-if="validateStatus === 'error'">{{errorMessage}}</p>
        </div>
    </div>
</template>

<script>
    import AsyncValidate from 'async-validator'

  export default {
    inject: ["form"], // 注入form 。如下this.form
    props: ['label', 'prop'],
    data() {
      return {
        validateStatus: '',
        errorMessage: ''
      }
    },
    created() {
      this.$on('validate', this.validate)
    },
    mounted(){
      // 挂载在form上时，派发一个添加事件
      // 有些选项是不需要校验的；
      if (this.prop) {
        this.$parent.$emit('formItemAdd', this)
      }
    },
    methods: {
      validate() {
        return new Promise(resolve => {
          const descriptor = {
            [this.prop]: this.form.rules[this.prop] // 校验规则
          }

          const validator = new AsyncValidate(descriptor)
          validator.validate({[this.prop]: this.form.model[this.prop]}, errors => {
            if(errors) {
              // 校验失败!
              this.validateStatus = 'error'
              this.errorMessage = errors[0]
              resolve(false)
            } else {
              this.validateStatus = ''
              this.errorMessage = ''
              resolve(true)
            }
          })
        })
      }
    },
  }
</script>

<style scoped>

</style>
