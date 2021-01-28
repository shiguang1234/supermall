<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"/>
    <!-- 使用滚动组件 -->
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <!-- 轮播图 -->
      <detail-swiper :topImages="topImages"/>
      <!-- 商品基本信息展示 -->
      <detail-base-info :goods="goods"/>
      <!-- 店铺信息展示 -->
      <detail-shop-info :shop="shop"/>
      <!-- 商品详情数据展示 -->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <!-- 商品参数展示 -->
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <!-- 评论信息展示 -->
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <!-- 推荐数据展示 -->
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>

    <!-- 底部工具栏 -->
    <detail-bottom-bar @addCart="addToCart"/>
    
    <!-- 回到顶部按钮,.native监听组件点击事件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

    <!-- <toast :message="message"
      :show="show"/> -->
  </div>
</template>

<script>
  import DetailNavBar from './childComponents/DetailNavBar'; //引入子组件
  import DetailSwiper from './childComponents/DetailSwiper';
  import DetailBaseInfo from './childComponents/DetailBaseInfo'; 
  import DetailShopInfo from './childComponents/DetailShopInfo';
  import DetailGoodsInfo from './childComponents/DetailGoodsInfo';
  import DetailParamInfo from './childComponents/DetailParamInfo';
  import DetailCommentInfo from './childComponents/DetailCommentInfo';
  import DetailBottomBar from './childComponents/DetailBottomBar';

  import Scroll from 'components/common/scroll/Scroll'; //引入公共组件 
  import GoodsList from 'components/content/goods/GoodsList';
  // import Toast from 'components/common/toast/Toast';
  
  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'; //网络请求
  
  import {itemListenerMixin, backTopMixin} from "common/mixin" //混入
  import { debounce } from "common/utils"; //防抖函数

  import {mapActions} from 'vuex'; //映射vuex中的actions到本地中

  export default {
    name:'Detail',
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      // Toast
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null, //商品id
        topImages: [], //保存轮播图数据
        goods: {}, //商品基本信息
        shop: {}, // 店铺信息
        detailInfo: {}, //商品详情数据
        paramInfo: {}, //商品参数
        commentInfo: {}, //评论信息
        recommends: [], //推荐数据
        themeTopYs: [], //联动效果，保存y值
        getThemeTopY: null, //防抖函数
        currentIndex: 0, //记录，滚动内容显示对应标题
        // message: '',
        // show: false,
      }
    },
    created() {
      //1.保存传入的id
      this.iid = this.$route.params.id;
      //2.根据iid请求网络数据
      getDetail(this.iid).then(res => {
        // console.log(res.result);
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
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        //6.获取评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
      });

      //获取推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list;
      });

      //联动效果，防抖
      this.getThemeTopY = debounce(() => {
        //联动效果，添加防抖
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE); //无穷大

        // console.log(this.themeTopYs);
      }, 200)
    },
    mounted() {
      
    },
    destroyed() {
      //取消事件总线的监听
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        //滚动，better-scroll刷新，商品详情数据
        this.$refs.scroll.refresh();

        //联动效果，防抖
        this.getThemeTopY();
      },
      //联动效果，点击标题滚动到对应内容
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index]+44, 200);
      },
      //联动效果，滚动内容显示对应标题
      contentScroll(position) {
        const positionY = -position.y;
        //positionY和主题中的值做对比，决定当前显示哪一个标题
        let length = this.themeTopYs.length;
        for(let i=0; i<length-1; i++) {
          // if(this.currentIndex!==i && ((i<length-1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])
          //  || (i===length-1 && positionY>=this.themeTopYs[i]))) {
          //    //currentIndex 记录频繁
          //    this.currentIndex = i;
          //    this.$refs.nav.currentIndex = this.currentIndex; //组件访问
          // }

          if(this.currentIndex!==i && (positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])) {
             //currentIndex 记录频繁
             this.currentIndex = i;
             this.$refs.nav.currentIndex = this.currentIndex; //组件访问
          }
        }

        this.isShowBackTop = (-position.y) > 1000 ; //回到首页按钮的显示与隐藏
      },

      //加入购物车
      addToCart() {
        //1.获取需要展示的商品信息：图片、标题、描述、价格、id、数量
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //2.将商品添加到购物车
        // this.$store.commit('addCart',product); //mutations
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res);
        // }); //actions
        this.addCart(product).then(res => {
          // this.message = res;
          // this.show = true;
          
          // setTimeout(() => {
          //   this.show = false;
          //   this.message = '';
          // },2000)

          this.$toast.show(res,2000);
        }); //actions
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
    height: calc(100% - 44px - 58px);
  }

  /* 滚动的元素会盖住detail-nav-bar，所以给detail-nav-bar添加相对定位 */
  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
