<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav-bar"/>
    <!-- 使用滚动组件 -->
    <scroll class="content" ref="scroll">
      <!-- 轮播图 -->
      <detail-swiper :topImages="topImages"/>
      <!-- 商品基本信息展示 -->
      <detail-base-info :goods="goods"/>
      <!-- 店铺信息展示 -->
      <detail-shop-info :shop="shop"/>
      <!-- 商品详情数据展示 -->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <!-- 商品参数展示 -->
      <detail-param-info :param-info="paramInfo"/>
    </scroll>
    
  </div>
</template>

<script>
  import DetailNavBar from './childComponents/DetailNavBar'; //引入子组件
  import DetailSwiper from './childComponents/DetailSwiper';
  import DetailBaseInfo from './childComponents/DetailBaseInfo'; 
  import DetailShopInfo from './childComponents/DetailShopInfo';
  import DetailGoodsInfo from './childComponents/DetailGoodsInfo';
  import DetailParamInfo from './childComponents/DetailParamInfo';

  import Scroll from 'components/common/scroll/Scroll'; //引入公共组件 

  import {getDetail,Goods,Shop,GoodsParam} from 'network/detail'; //网络请求
  export default {
    name:'Detail',
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      Scroll
    },
    data() {
      return {
        iid: null,
        topImages: [], //保存轮播图数据
        goods: {}, //商品基本信息
        shop: {}, // 店铺信息
        detailInfo: {}, //商品详情数据
        paramInfo: {}, //商品参数
      }
    },
    created() {
      //1.保存传入的id
      this.iid = this.$route.params.id;
      //2.根据iid请求网络数据
      getDetail(this.iid).then(res => {
        console.log(res.result);
        const data = res.result;
        //1.获取顶部的轮播数据
        this.topImages = data.itemInfo.topImages;
        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        //3.获取店铺信息
        this.shop = new Shop(data.shopInfo);
        //4.获取商品详情数据
        this.detailInfo = data.detailInfo;
        //5.获取商品参数数据
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh();
      }
    }
    
  }

</script>

<style scoped>
  /* 使详情页不被MainTabBar盖住 */
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;

    height: 100vh; /* 使用calc中100%计算高度时，父元素设置视图高度 */
  }

  /* 给better-scroll设置固定高度 */
  .content {
    height: calc(100% - 44px);
  }

  /* 滚动的元素会盖住detail-nav-bar，所以给detail-nav-bar添加相对定位 */
  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
