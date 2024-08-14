<template>
  <el-tooltip
      v-if="tip"
      :content="tip"
      placement="top-start"
  >
    <el-button :type="getType()" :icon="icon" :text="type === 'text'" :size="type === 'text' ? 'small' : 'default'" @click="$emit('click')">
      {{text}}
    </el-button>
  </el-tooltip>
  <el-button v-else :type="getType()" :icon="icon" :text="type === 'text'" :size="type === 'text' ? 'small' : 'default'">
    {{text}}
  </el-button>
</template>
<script>
export default {
  name: 'JfBtn',
  /**
   * type 按钮类型
   *  default 蓝色小按钮
   *  red     红色小按钮
   *  green   绿色小按钮
   *  white   白色小按钮
   *  text    文本按钮
   * text 按钮文本
   * icon 按钮图标
   * tip: 鼠标悬停提示
   * */
  props:['type', 'text', 'icon','tip'],
  methods: {
    getType() {
      if(!this.type) {
        return 'primary';
      }else if(this.type === 'red') {
        return 'danger';
      }else if(this.type === 'green') {
        return 'success';
      }
      return '';
    }
  }
}
</script>
<style scoped lang="scss">
.el-button.is-text:not(.is-disabled):focus-visible {
  outline: none;
}
.el-button:focus-visible{
  outline: none;
}
</style>