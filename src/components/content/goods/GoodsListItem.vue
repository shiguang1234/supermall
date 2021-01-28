<template>
  <div class="goods-item" @click="itemClick">
    <!-- 监听图片加载完成 -->
    <!-- <img :src="showImage" alt="" @load="imageLoad">  -->
    <img v-lazy="showImage" alt="" @load="imageLoad"> 
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>  <!-- 商品描述 -->
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name:'GoodsListItem',
    props:{
      goodsItem:{
        type: Object,
        default(){
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img; //计算属性，兼容详情页推荐数据展示、首页商品展示
      }
    },
    methods: {
      imageLoad() {
        this.$bus.$emit('itemImageLoad'); //事件总线，发射事件

        // 方法一，路由跳转，区分首页和详情页的图片加载完成监听事件
        // if(this.$route.path.indexOf('/home')) {
        //   this.$bus.$emit('homeItemImgLoad');
        // }else if(this.$route.path.indexOf('/detail')) {
        //   this.$bus.$emit('detailItemImgLoad');
        // }
      },
      //监听item的点击，跳转到详情页
      itemClick() {
        this.$router.push('/detail/' + this.goodsItem.iid); //路由跳转，要返回，用push
        // this.$router.push({ 
        //   path: '/detail',
        //   query: {

        //   }
        // }) //query方式传递参数,传一个对象
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    /* flex布局，设置宽度 */
    width: 48%; 
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
    border:3px solid var(--color-tint);
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>
