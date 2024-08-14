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
      <el-form-item label="标签提示">
        <el-input v-model="form.label" clearable/>
      </el-form-item>
      <el-form-item label="标签宽度">
        <el-input v-model="form.labelWidth" clearable/>
      </el-form-item>
      <el-form-item label="输入宽度">
        <el-input v-model="form.inputWidth" clearable/>
      </el-form-item>
      <el-form-item label="标签字号">
        <el-input v-model="form.labelSize" clearable/>
      </el-form-item>
      <el-form-item label="标签颜色" style="margin-top: 12px">
        <el-color-picker v-model="form.labelColor" clearable/>
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