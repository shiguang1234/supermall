<template>
  <!-- div根，首页只有一个，加id -->
  <div id="home">
    <!-- 设置navbar的背景颜色 -->
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>

    <!-- 控制选项卡 -->
      <tab-control  :titles="['流行','新款','精选']"
                    @tabClick="tabClick"
                    ref="tabControl1"
                    class="tab-control"
                    v-show="isTabFixed"/>

    <!-- 使用滚动组件 -->
    <scroll class="content" 
            ref="scroll" 
            :probeType="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!-- 使用轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <!-- 推荐模块 -->
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <!-- 控制选项卡 -->
      <tab-control  :titles="['流行','新款','精选']"
                    @tabClick="tabClick"
                    ref="tabControl2"/>
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
  import {debounce} from "common/utils";

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
        currentType: 'pop',
        isShowBackTop: true,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0, //记录Home离开时状态和位置信息
      }
    },
    computed: { //计算属性
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    //router 进入页面时调用activate()
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0);
      this.$refs.scroll.refresh();
    },
    //router 离开页面时调用deactivate()
    deactivated() {
      //离开时保存位置信息
      this.saveY = this.$refs.scroll.getScrollY();
    },
    created(){ //发送网络请求
      this.getHomeMultidata();

      //请求商品数据，调用methods中的函数
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
      
    },
    mounted() {
      //调用防抖函数
      const refresh = debounce(this.$refs.scroll.refresh, 200);
      //事件总线，监听item中图片加载完成
      this.$bus.$on('itemImageLoad',() => {
        refresh();
      })

    },
    methods: {
      /** 
       * 事件监听相关方法
       */
      //监听tabControl的点击
      tabClick(index) {
        switch (index) {
          case 0:{
            this.currentType = 'pop';
            break;
          }
          case 1:{
            this.currentType = 'new';
            break;
          }
          case 2:{
            this.currentType = 'sell';
            break;
          }
        }
        //吸顶效果，让两个tabControl的currentIndex一样
        this.$refs.tabControl1.currentIndex = index; // index为最新点击 
        this.$refs.tabControl2.currentIndex = index; // index为最新点击 
      },
      //点击按钮，回到首页
      backClick() {
        //调用scroll组件的scrollTo方法
        this.$refs.scroll.scrollTo(0, 0, 500);
      },
      //监听滚动
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000 ; //回到首页按钮的显示与隐藏
        this.isTabFixed = (-position.y) > this.tabOffsetTop; //决定tabControl是否吸顶
      },
      //上拉加载更多
      loadMore(){
        this.getHomeGoods(this.currentType);
      },
      //轮播图加载完成，获取tabControl的offsetTop
      swiperImageLoad() {
        //获取tabControl的offsetTop,保存至变量tabOffsetTop中
        //所有的组件有$el属性，用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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

          this.$refs.scroll.finishPullUp(); //数据请求完成后可以做下一次的上拉加载更多

        }) 
      }
    }
  }
</script>

<style scoped>
  /* tabbar使用fixed固定定位脱离标准流，所以给home加padding-top */
  #home {
    position: relative;
    height: 100vh; /* vh视口高度 */
  }

  .home-nav {
    /* 使用变量 */
    background-color: var(--color-tint);
    color: #fff;

    /* 由于使用better-scroll，所以nav-bar可以不采用fixed布局 */
    /* 固定定位，在使用浏览器原生滚动时，为了让nav-bar不跟随一起滚动，所以使用fixed布局 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  
  /* 粘性定位，吸顶效果 ,用better-scroll时，不起效果 */
  /* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  } */
  .tab-control {
    position: relative;
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
