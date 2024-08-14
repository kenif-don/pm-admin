<template xmlns="">
  <div class="right-attr-container" style="padding-top: 0">
    <el-form :model="form" label-width="70px">
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
      <el-form-item label="提示内容">
        <el-input v-model="form.placeholder" clearable/>
      </el-form-item>
      <el-form-item label="绑定属性">
        <el-input v-model="form.attr" clearable/>
      </el-form-item>
      <el-form-item label="尺寸类型">
        <el-select v-model="form.size" clearable>
          <el-option label="medium" value="medium"/>
          <el-option label="small" value="small"/>
          <el-option label="mini" value="mini"/>
        </el-select>
      </el-form-item>
      <el-form-item label="清空按钮">
        <el-switch v-model="form.clearable" clearable/>
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-switch v-model="form.disabled" clearable/>
      </el-form-item>
      <el-form-item v-if="form.maxlength" label="字数统计">
        <el-switch v-model="form.showWordLimit" clearable/>
      </el-form-item>
      <el-form-item label="是否只读">
        <div><el-switch v-model="form.readonly" clearable/></div>
      </el-form-item>
      <el-form-item label="可搜索">
        <div><el-switch v-model="form.filterable" clearable/></div>
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