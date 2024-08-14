<template>
  <el-table :data="data" style="width: 100%" row-key="id">
    <el-table-column :label="opt.title" v-for="(opt,index) of options">
      <template #default="scope">
        <template v-if="!opt.fmt">{{scope.row[opt.key]}}</template>
        <component v-else is="el-icon">{{ opt.fmt(scope.row) }}</component>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import Vue from 'vue'
import JfBtn from "@/components/jf/JfBtn.vue";
export default {
  name: 'JfTable',
  computed: {
    Vue() {
      return Vue
    }
  },
  components: {
    JfBtn
  },
  props:['data','options'],
}
</script>
<style scoped lang="scss">

</style>