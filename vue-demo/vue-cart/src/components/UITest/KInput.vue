<template>
    <input
            class="input"
            :type="type"
            :value="inputValue"
            @input="handleInput"
            @blur="handleBlur"
    />
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      }
    },
    data() {
      return {
        inputValue: this.value
      }
    },
    methods: {
      handleInput(e) {
        this.inputValue = e.target.value
        //  通知父组件值更新 （父 v-model）
        this.$emit('input', this.inputValue)
        //  通知FormItem做验证
        this.$parent.$emit('validate', this.inputValue)
      },
      handleBlur(e) {
        console.log(this.inputValue)
        console.log(e.target.value)
      }
    }
  }
</script>

<style scoped>
 .input{
     border: 1px solid #000;
 }
</style>
