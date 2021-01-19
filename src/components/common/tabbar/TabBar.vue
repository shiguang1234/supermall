<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name:'TabBar',
  }
</script>

<style scoped>
  #tab-bar {
    position: fixed; /* 固定位置 */
    left: 0;
    right: 0;
    bottom: 0;
    display: flex; /* 水平分布 */
    background-color: #f6f6f6;
    box-shadow: 0 -1px 1px rgba(100, 100, 100, .1);
  }

  
</style>
