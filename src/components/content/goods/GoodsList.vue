<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'
  export default {
    name:'GoodsList',
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    /* flex布局 同时子元素要设置宽度*/
    display: flex;
    flex-wrap: wrap; /* 一行显示两个*/
    justify-content: space-around; /*两个均等分*/

    padding: 2px; /*微调左右两边的距离*/
  }
</style>
