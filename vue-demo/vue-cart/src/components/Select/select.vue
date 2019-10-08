<template>
  <div class="container">
    <div class="header">
      <input @focus="focus" type="text">
    </div>
    <ul v-if="visible" class="body">
      <li v-for="item in list" :key="item.id" @click="select(item)">{{item.value}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      selectItem: {},
      list: [
        {
          key: 1,
          value: 1
        },
        {
          key: 2,
          value: 2
        }
      ]
    };
  },
  methods: {
    focus() {
      this.visible = true;
    },
    blur() {
      this.visible = false;
    },
    select(item) {
      this.selectItem = item;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;

  .body {
    position: absolute;
  }
}
</style>