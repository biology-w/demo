<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>msg: {{$route.params.msg}}</p>
    <p>foo: {{foo}}</p>
  </div>
</template>

<script>
  export default {
    props: {
      foo: {
        type: String,
        default: ''
      },
    },
    methods: {
      beforeRouteEnter(to, from, next) {
        next()
      }
    },

  }
</script>
