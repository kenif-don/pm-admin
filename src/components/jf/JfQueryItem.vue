<template>
  <div class="query-item" :style="{width:realWidth}">
    <div class="query-label">{{label}}</div>
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'JfQueryItem',
  props:['label','width'],
  watch: {
    width() {
      //如果是纯数字
      if(!isNaN(Number(this.width))){
        this.realWidth = this.width+'px';
      }
    }
  },
  data() {
    return {
      realWidth: this.width
    }
  }
}
</script>
<style scoped lang="scss">

</style>