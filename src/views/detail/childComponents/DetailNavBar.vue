<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div class="title-item" 
             v-for="(item,index) in titles" :key="index"
             @click="titleClick(index)"
             :class="{active:currentIndex===index}">{{item}}</div>
      </div>
      <div slot="right"></div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'; //引入公共组件 

  export default {
    name:'DetailNavBar',
    components: {
      NavBar,
    },
    data() {
      return {
        titles: ['商品','参数','评论','推荐'], //navbar标题定义为数组，用遍历方式展示
        currentIndex: 0,
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index;
      },
      backClick() {
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
  }

  .title-item {
    flex: 1;
    font-size: 13px;
  }

  /* title-item被点击时颜色改变 */
  .active {
    color: var(--color-high-text);
  }

  .back img {
    margin-top: 12px;
  }
</style>
