<style lang="less">
  @import url("~@/consts/index.less");

  .ex-button {
    background-color: @color-white;
    color: @color-black;
  }
</style>

<template>
  <button class="ex-button">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'ex-button'
  };
</script>
