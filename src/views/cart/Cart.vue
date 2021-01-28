<template>
  <div id="cart">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表展示 -->
    <cart-list></cart-list>
    <!-- 底部工具栏 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'; //导入公共组件

  import CartList from './childComps/CartList'; //导入子组件
  import CartBottomBar from './childComps/CartBottomBar';

  import {mapGetters} from 'vuex'

  export default {
    name:'Cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar,
    },
    computed: {
      // ...mapGetters(['cartLength'])
      ...mapGetters({
        length: 'cartLength',
      })
    }
  }
</script>

<style scoped>
  #cart {
    height: 100vh;
  }
  
  .nav-bar {
    background: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
