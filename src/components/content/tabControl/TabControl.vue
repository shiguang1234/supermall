<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index" 
         class="tab-control-item" :class="{active: index===currentIndex}"
         @click="itemClick(index)"> <!-- 动态绑定class，对象语法 -->
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name:'TabControl',
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data(){
      return{
        currentIndex: 0, //默认值
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('tabClick',index); //将点击的数组下标传给父组件
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    /* flex布局 */
    display: flex; 
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }
  
  .tab-control-item span {
    padding: 5px;
  }
  /* 动态绑定class，对象语法，active为类名 */
  .active {
    color: var(--color-high-text)
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
