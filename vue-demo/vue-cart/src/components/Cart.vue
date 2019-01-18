<template>
   <div>
       <p>{{name}}</p>
       <table border="1">
           <tr>
               <th>#</th>
               <th>课程名</th>
               <th>单价</th>
               <th>数量</th>
               <th>价格</th>
           </tr>
           <tr v-for="(cart, index) in carts" :key="cart.id" :class="{active:cart.active}">
               <td>
                   <input type="checkbox" v-model="cart.active"/>
               </td>
               <td>{{cart.text}}</td>
               <td>￥{{cart.price}}</td>
               <td>
                   <button @click="minus(index)">-</button>
                   {{cart.count}}
                   <button @click="add(index)">+</button>
               </td>
               <td>￥{{cart.price*cart.count}}</td>
           </tr>
           <tr>
               <td>#</td>
               <td colspan="2">{{activeCount}}/{{count}}</td>
               <td colspan="2">￥{{total}}</td>
           </tr>
       </table>
   </div>
</template>

<script>
    export default {
      name: 'Cart',
      props: ['name'],
      data() {
        return {
          carts: JSON.parse(localStorage.getItem('carts')) || []
        }
      },
      watch: {
        carts: {
          handler(val) {
            localStorage.setItem('carts', JSON.stringify(val))
          },
          deep: true
        }
      },
      created() {
        this.$root.$on('addCart', good => {
          const tar = this.carts.find(item => item.id === good.id)
          if (tar) {
            tar.count += 1
          } else {
            this.carts.push({
              ...good,
              count: 1,
              active: true
            })
          }
        })
      },
      methods: {
        minus(i) {
          const count = this.carts[i].count
          if (count > 1) {
            this.carts[i].count -= 1
          } else {
            this.remove(i)
          }
        },
        add(i) {
          this.carts[i].count += 1
        },
        remove(i) {
          if (window.confirm('确定删除？')) {
            this.carts.splice(i, 1)
          }
        }
      },
      computed: {
        activeCount() {
          return this.carts.filter(c => c.active).length
        },
        count() {
          return this.carts.length
        },
        total() {
          let sum = 0
          this.carts.forEach(c => {
            if (c.active) {
              sum += c.price * c.count;
            }
          });
          return sum;
        }
      }
    }
</script>

<style>

</style>
