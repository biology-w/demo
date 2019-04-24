<template>
  <div>
    <p>{{name}}</p>
    <table border="1">
      <tr>
        <td>选中</td>
        <td>课程名</td>
        <td>单价</td>
        <td>数量</td>
        <td>价格</td>
      </tr>
      <tr v-for="(c, i) in carts" :key="c.id" :class="{active:c.active}">
        <td>
          <input type="checkbox" v-model="c.active">
        </td>
        <td>{{c.name}}</td>
        <td>{{c.price}}</td>
        <td>
          <button @click="minus(i)">-</button>
          {{c.count}}
          <button @click="add(i)">+</button>
        </td>
        <td>¥{{c.price*c.count}}</td>
      </tr>
      <tr>
        <td></td>
        <td colspan="2">{{activeCount}}/{{count}}</td>
        <td colspan="2">{{total}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["name"],
  data() {
    return {
      carts: JSON.parse(localStorage.getItem("carts")) || []
    };
  },
  created() {
    this.$bus.$on("addGood", this.addGood);
  },
  methods: {
    minus(i) {
      const count = this.carts[i].count;
      if (count > 1) {
        this.carts[i].count -= 1;
      } else {
        this.remove(i);
      }
    },
    add(i) {
      this.carts[i].count += 1;
    },
    remove(i) {
      if (window.confirm("确定要删除？")) {
        this.carts.splice(i, 1);
      }
    },
    addGood(good) {
      const ret = this.carts.find(item => item.id === good.id);
      if (ret) {
        ret.count += 1;
      } else {
        this.carts.push({
          ...good,
          count: 1,
          active: true
        });
      }
    }
  },
  computed: {
    activeCount() {
      return this.carts.filter(v => v.active).length;
    },
    count() {
      return this.carts.length;
    },
    total() {
      let num = 0;
      this.carts.forEach(c => {
        if (c.active) {
          num += c.count * c.price;
        }
      });
      return num;
    }
  },
  watch: {
    carts: {
      handler(val, oldVal) {
        localStorage.setItem("carts", JSON.stringify(val));
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.active {
  color: green;
}
</style>