<template>
  <el-pagination
      class="mt12"
      @current-change="$emit('current-change', $event)"
      background
      :current-page="page.page"
      :page-size="page.pageSize"
      :page-sizes="[10,20,30,50]"
      layout="total, prev, pager, next"
      :total="page.total">
  </el-pagination>
</template>
<script>
export default {
  name: 'JfPagination',
  props:['page'],
}
</script>
<style scoped lang="scss">
</style>