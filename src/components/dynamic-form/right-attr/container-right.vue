<template xmlns="">
  <div class="right-attr-container" style="padding-top: 0">
    <el-form :model="form" label-width="80px">
      <el-form-item label="上内间距">
        <el-input v-model="form.paddingTop" clearable/>
      </el-form-item>
      <el-form-item label="又内间距">
        <el-input v-model="form.paddingRight" clearable/>
      </el-form-item>
      <el-form-item label="下内间距">
        <el-input v-model="form.paddingBottom" clearable/>
      </el-form-item>
      <el-form-item label="左内间距">
        <el-input v-model="form.paddingLeft" clearable/>
      </el-form-item>
      <el-form-item label="上外间距">
        <el-input v-model="form.marginTop" clearable/>
      </el-form-item>
      <el-form-item label="又外间距">
        <el-input v-model="form.marginRight" clearable/>
      </el-form-item>
      <el-form-item label="下外间距">
        <el-input v-model="form.marginBottom" clearable/>
      </el-form-item>
      <el-form-item label="左外间距">
        <el-input v-model="form.marginLeft" clearable/>
      </el-form-item>
      <el-form-item label="宽度">
        <el-input v-model="form.width" clearable/>
      </el-form-item>
      <el-form-item label="高度">
        <el-input v-model="form.height" clearable/>
      </el-form-item>
      <el-form-item label="最小高度">
        <el-input v-model="form.minHeight" clearable/>
      </el-form-item>
      <el-form-item label="圆角">
        <el-input v-model="form.radius" clearable/>
      </el-form-item>
      <el-form-item label="背景颜色" style="margin-top: 12px">
        <el-color-picker v-model="form.background" clearable/>
      </el-form-item>
      <el-form-item label="对齐方式">
        <el-select v-model="form.align" clearable>
          <el-option label="左对齐" value="space-start"/>
          <el-option label="右对齐" value="space-end"/>
          <el-option label="居中" value="center"/>
          <el-option label="两端对齐" value="space-between"/>
          <el-option label="均等分布" value="space-around"/>
        </el-select>
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