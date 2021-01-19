<template>
  <!-- div根，首页只有一个，加id -->
  <div id="home">
    <!-- 设置navbar的背景颜色 -->
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>

    <!-- 使用滚动组件 -->
    <scroll class="content" 
            ref="scroll" 
            :probeType="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!-- 使用轮播图 -->
      <home-swiper :banners="banners"/>
      <!-- 推荐模块 -->
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <!-- 控制选项卡 -->
      <tab-control class="tab-control" 
                    :titles="['流行','新款','精选']"
                    @tabClick="tabClick"/>
      <!-- 商品展示 -->
      <goods-list :goods="showGoods"/>
    </scroll>

    <!-- 回到顶部按钮,.native监听组件点击事件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'; //导入子组件
  import RecommendView from './childComps/RecommendView';
  import FeatureView from './childComps/FeatureView';

  import NavBar from 'components/common/navbar/NavBar'; //导入公共组件
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl';
  import GoodsList from 'components/content/goods/GoodsList';
  import BackTop from 'components/content/backTop/BackTop';

  import { getHomeMultidata,getHomeGoods } from "network/home"; //导入方法，封装的网络请求模块,url
  

  export default { 
    name:'Home',
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop
    },
    data(){ 
      return{
        banners: [],//b.新建变量用于保存数据
        recommends: [],
        goods: {
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []}
        },
        currentIndex: 'pop',
        isShowBackTop: true,
      }
    },
    computed: { //计算属性
      showGoods() {
        return this.goods[this.currentIndex].list;
      }
    },
    created(){ //发送网络请求
      this.getHomeMultidata();

      //请求商品数据，调用methods中的函数
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
      

    },
    methods: {
      /** 
       * 事件监听相关方法
       */
      tabClick(index) {
        switch (index) {
          case 0:{
            this.currentIndex = 'pop';
            break;
          }
          case 1:{
            this.currentIndex = 'new';
            break;
          }
          case 2:{
            this.currentIndex = 'sell';
            break;
          }
        } 
      },
      //点击按钮，回到首页
      backClick() {
        //调用scroll组件的scrollTo方法
        this.$refs.scroll.scrollTo(0, 0, 500);
      },
      //回到首页按钮的显示与隐藏
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000
      },
      //上拉加载更多
      loadMore(){
        this.getHomeGoods(this.currentIndex);

        this.$refs.scroll.scroll.refresh();
      },
      /** 
       * 网络请求相关方法
       */
      getHomeMultidata() {
        // a.请求多个数据,函数调用,.then拿到数据
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list; //c.保存请求的数据至变量
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        //页面加1
        const page = this.goods[type].page + 1;
        //请求商品数据,调用网络请求函数
        getHomeGoods(type,page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list);//将多个数据推入数组
          this.goods[type].page += 1;//将保存的页码加1

          setTimeout(() => {
            this.$refs.scroll.finishPullUp(); //数据请求完成后可以做下一次的上拉加载更多
          },1000)
        }) 
      }
    }
  }
</script>

<style scoped>
  /* tabbar使用fixed固定定位脱离标准流，所以给home加padding-top */
  #home {
    position: relative;
    padding-top: 44px;
    height: 100vh; /* vh视口高度 */
  }

  .home-nav {
    /* 使用变量 */
    background-color: var(--color-tint);
    color: #fff;

    /* 固定定位 */
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  
  /* 粘性定位 */
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;

    overflow: hidden;
  }
  /* 计算窗口高度 */
  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
