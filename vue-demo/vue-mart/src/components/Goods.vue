<template>
    <div>
        <div v-for="item in goods" :key="item.id" class="item">
            <router-link :to="`/detail/${item.id}`">
                <div class="left">
                    <img :src="item.img" alt @click.stop.prevent="imgPreview(item.img)"/>
                </div>
                <div class="right">
                    <div class="title">{{item.title}}</div>
                    <div class="info">
                        <i class="cubeic-add" @click.stop.prevent="addCart($event, item)"></i>
                        <span>{{item.count}}</span>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
  export default {
    props: ['goods'],
    methods: {
      addCart($event, item) {
        this.$store.commit('addCart', item)

        // 把点击事件派发出去
        this.$emit('addCart', $event.target)
      },
      imgPreview(img) {
        this.$createImagePreview({
          imgs: [img]
        }).show()
      }
    },
  }
</script>

<style lang="stylus" scope>
    .item {
        padding: 10px;
        overflow: hidden;

        .left {
            width: 100px;
            float: left;

            img {
                width: 100%;
            }
        }

        .right {
            margin-left: 120px;
            text-align: left;

            .title {
                line-height: 30px;
            }

            .cubeic-add {
                font-size: 22px;
            }
        }
    }
</style>
