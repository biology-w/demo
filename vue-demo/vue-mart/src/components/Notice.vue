<template>
    <div>
        <div
                class="alerts"
                v-for="(item, index) in alerts"
                :key="item.id"
                :style="{top: item.top + 'px'}"
        >
            <div class="alert-content">{{item.content}}</div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        alerts: []
      }
    },

    created() {
      // id自增控制
      this.id = 0
    },
    methods: {
      add(options) {
        const _id = 'id_' + this.id++
        console.log(this.id)
        this.alerts.push({...options, id: _id, top: this.alerts.length * 30 })

        //自动关闭
        const duration = options.duration || 1 // 秒
        setTimeout(() => {
          this.del(_id)
        }, duration*1000 )
      },

      del(id) {
        for (let i = 0, len = this.alerts.length; i < len; i++) {
          const tar = this.alerts[i]
          if (tar.id === id) {
            this.alerts.splice(i, 1)
            break;
          }
        }
      }
    },

  }
</script>

<style scoped lang="stylus">
.alerts {
    position: fixed;
    width: 100%;
    top: 30px;
    left: 0;
    text-align: center
}
    .alert-content {
        display: inline-block;
        paddding: 8px;
        background #ffffff;
        margin-bottom: 10px;
    }
</style>
