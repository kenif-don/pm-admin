<template xmlns="">
  <div class="right-attr-container" style="padding-top: 0">
    <el-form :model="form" label-width="80px">
      <el-form-item label="列数">
        <el-slider v-model="tempCol" :min="1" :max="6" v style="width: 80%"/>
      </el-form-item>
      <el-form-item label="列宽">
        <el-input v-model="tempSpans" clearable/>
      </el-form-item>
      <div style="display: flex;justify-content: center;">
        <el-button @click="update">修改</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  export default {
    props: ['form'],
    data() {
      return {
        tempCol:1,
        tempSpans: 24
      }
    },
    methods:{
      update(){
        this.form.col = this.tempCol
        this.form.spans = this.tempSpans.split(',')
      }
    }
  }

</script>