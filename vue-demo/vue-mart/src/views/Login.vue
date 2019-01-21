<template>
    <div>
        <cube-form
                :model="model"
                :schema="schema"
                @submit="login"
                @validate="handleValidate"
        ></cube-form>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        model: { // 数据模型
          username: '',
          password: ''
        },
        schema: { // 表单结构模型
          fields: [
            {
              type: 'input',
              modelKey: 'username',
              label: '用户名',
              props: {
                placeholder: '请输入用户名'
              },
              rules: {
                required: true
              },
              trigger: 'blur',
              messages: {
                required: '用户名必须填写!'
              }
            },
            {
              type: 'input',
              modelKey: 'password',
              label: '密码',
              props: {
                placeholder: '请输入密码',
                type: 'password',
                eye: {open:false}
              },
              rules: { // 校验规则
                required: true
              },
              trigger: 'blur',
              messages: {
                required: '密码为必填项'
              }
            },
            { // 登录按钮
              type: 'submit',
              label: '登录'
            }
          ]
        }
      }
    },
    methods: {
      async login(e) {
        e.preventDefault()
        const res = await this.$axios.get('/api/login', {
          params: { username: this.model.username, password: this.model.password }
        })
        console.log(res)
        const { code, token, message } = res.data
        if(code === 200) {
          localStorage.setItem('token', token)
          this.$store.commit('setToken', token)
          const { redirect } = this.$route.query

          this.$router.push(redirect || '/')
        } else {
          const toast = this.$createToast({
            time: 2000,
            txt: message || '登陆失败！',
            type: 'error'
          });
          toast.show()
        }
      },
      handleValidate(ret) {
        console.log('校验')
        console.log(ret)
      }
    },
  }
</script>

<style scoped>

</style>
