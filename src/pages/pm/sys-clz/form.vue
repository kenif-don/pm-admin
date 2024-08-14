<template>
<div>
    <el-form :model="form" label-width="200px" @keyup.enter.native="$emit('onsubmit')">
      <div class="form-item-inline-box">
        <el-form-item label="项目:">
          <el-select v-model="form.projectId" placeholder="请选择项目" filterable clearable >
            <el-option
                v-for="item in projectList"
                :key="item.id"
                :value="item.id"
                :label="item.clz_var">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类文件所在的绝对路径:">
          <el-input v-model="form.path" placeholder="请输入类文件所在的绝对路径" clearable/>
        </el-form-item>
      </div>
      <div class="form-item-inline-box">
        <el-form-item label="类全限定名:">
          <el-input v-model="form.clz" placeholder="请输入类全限定名" clearable/>
        </el-form-item>
        <el-form-item label="类的变量名:">
          <el-input v-model="form.clzVar" placeholder="请输入类的变量名" clearable/>
        </el-form-item>
      </div>
      <div class="form-item-inline-box">
        <el-form-item label="注解:">
        </el-form-item>
        <el-form-item label="功能名称:">
          <el-input v-model="form.fn" placeholder="请输入功能名称" clearable/>
        </el-form-item>
      </div>
      <span slot="footer" class="dialog-footer">
        <jf-btn type="red" text="关闭" @click="$emit('close')"/>
        <jf-btn text="确定" @click="save"/>
      </span>
    </el-form>
</div>
</template>

<script>
import * as api from '@/api/sys-clz';
import JfBtn from "@/components/jf/JfBtn.vue";
export default {
  components: {JfBtn,},
  props:['form',],
  data() {
    return {
      projectList:[],
      api
    }
  },
  watch: {
    form(val){
      this.init(val)
    }
  },
  mounted() {
    this.init(this.form)
  },
  methods: {
    save(){
      this.$emit('onsubmit',this.form)
    },
    init(val){
      if(!val.id){
        //添加时在这里设置默认值
      }
    }
  }
}
</script>
<style lang="scss">
</style>