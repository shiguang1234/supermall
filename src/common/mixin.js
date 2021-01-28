import { debounce } from "./utils"; //防抖函数

import BackTop from 'components/content/backTop/BackTop'; //回到顶部

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null, //事件总线，监听GoodsListItem图片加载完成
    }
  },
  mounted() {
    //监听GoodsListItem图片加载完成事件

    //1.调用防抖函数
    const refresh = debounce(this.$refs.scroll.refresh, 200);

    //2.对监听的事件进行保存
    this.itemImgListener = () => {
      refresh();
    };

    //3.事件总线，监听item中图片加载完成
    this.$bus.$on('itemImageLoad', this.itemImgListener)

  }
}

//回到顶部
export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: true,
    }
  },
  methods: {
    //点击按钮，回到首页
    backClick() {
      //调用scroll组件的scrollTo方法
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  }
}