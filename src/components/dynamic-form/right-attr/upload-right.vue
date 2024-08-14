<template xmlns="">
  <div class="right-attr-container" style="padding-top: 0">
    <el-form :model="form" label-width="80px">
      <el-form-item label="内间距">
        <el-input v-model="form.paddingTop" clearable/>
        <el-input v-model="form.paddingRight" clearable/>
        <el-input v-model="form.paddingBottom" clearable/>
        <el-input v-model="form.paddingLeft" clearable/>
      </el-form-item>
      <el-form-item label="外间距">
        <el-input v-model="form.marginTop" clearable/>
        <el-input v-model="form.marginRight" clearable/>
        <el-input v-model="form.marginBottom" clearable/>
        <el-input v-model="form.marginLeft" clearable/>
      </el-form-item>
      <el-form-item label="宽度">
        <el-input v-model="form.width" clearable/>
      </el-form-item>
      <el-form-item label="高度">
        <el-input v-model="form.height" clearable/>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    props: ['form'],
    created() {
    }
  }

</script>