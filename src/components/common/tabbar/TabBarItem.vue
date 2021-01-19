<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name:'TabBarItem',
    props:{
      path: String,
      activeColor:{
        type: String,
        default: 'red'
      }
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path) !== -1;
      },
      activeStyle(){
        return this.isActive ? {color:this.activeColor} : {};
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path);
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;  /* 均等分 */
    text-align: center; /* 水平居中 */
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle; /* 消除图片与文字之间的间距 */
    margin-bottom: 2px;
  }

  
</style>
