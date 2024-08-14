<template>
  <el-scrollbar :height="height?height:'200px'">
    <div class="jf-icon-select-container">
      <span v-for="item in icons" :key="item" class="jf-icon-select-item" @click="$emit('select',item)">
      <el-icon :size="20"><component :is="item"/></el-icon>
      {{item}}
    </span>
    </div>
  </el-scrollbar>
</template>
<script>
import * as components from '@element-plus/icons-vue'
export default {
  name: 'JfIconSelect',
  props:['height','filter'],
  data() {
    return {
      icons:[],
      all:[]
    }
  },
  watch: {
    filter(val) {
      if (!val) {
        this.icons = this.all
        return
      }
      this.icons = this.all.filter(item => item.indexOf(val) > -1)
    }
  },
  created() {
    for (const [key, component] of Object.entries(components)) {
      this.icons.push(key);
      this.all.push(key)
    }
  }
}
</script>
<style scoped lang="scss">
.jf-icon-select-container{
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .jf-icon-select-item{
    width: 25%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 12px;
  }
}
</style>