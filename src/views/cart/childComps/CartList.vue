<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item 
        v-for="(item,index) in cartList" 
        :key="index"
        :item-info="item"/>
    </scroll>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import scroll from 'components/common/scroll/Scroll'; //导入公共组件

  import CartListItem from './CartListItem';//导入子组件

  export default {
    name:'CartList',
    computed: {
      ...mapGetters(['cartList'])
    },
    components: {
      scroll,
      CartListItem,
    },
    activated() {
      this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
