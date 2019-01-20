<template>
    <div>
        parent
        <router-link to="/parent/children">children</router-link>|
        <router-link to="/parent/childrenTwo">children</router-link>
        <!-- 要是存在子路有，必须有 router-view -->
        <router-view></router-view>
    </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>

</style>
