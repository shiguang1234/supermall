<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    name:'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true, //使得可以监听better-scroll组件中div元素的点击
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      //2.监听滚动区域
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll',position); //通过自定义事件将参数position传出
      })
      //3.监听上拉事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp');   
      })
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp();
      }
    }
  }
</script>

<style scoped>

</style>
