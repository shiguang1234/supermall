<template>
  <div>
    <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index"> <!-- v-for 绑定key -->
        <a :href="item.link"> <!-- 图片可点击，所以外包a标签 -->
          <img :src="item.image" alt="" @load="imageLoad"> <!-- 动态绑定属性src -->
        </a>
      </swiper-item> <!-- v-for根据banners数组的长度确定插槽的个数 -->
    </swiper>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper" //导入两个轮播图组件

  export default {
    name:'HomeSwiper',
    props: {
      banners: {
        type: Array,
        default() { //类型是对象或数组时，默认值必须是一个函数
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem,
    },
    data() {
      return {
        isLoad: false, //变量，用于记录状态，只需发一次事件
      }
    },
    methods: {
      imageLoad() {
        if(!this.isLoad) {
          this.$emit('swiperImageLoad'); //发送图片加载完成事件给Home.vue
          this.isLoad = true;
        }
      }
    }
  }
</script>

<style scoped>

</style>
