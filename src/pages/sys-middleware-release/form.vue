<template>
<div>
    <el-form :model="form" label-width="80px">
      <div class="form-item-inline-box">
        <el-form-item label="中间件:">
          <el-select v-model="form.middlewareId" placeholder="请选择中间件" filterable clearable >
            <el-option
                v-for="item in middlewareList"
                :key="item.id"
                :value="item.id"
                :label="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本号:">
          <el-input v-model="form.release" placeholder="请输入版本号" clearable/>
        </el-form-item>
      </div>
      <div class="form-item-inline-box">
        <el-form-item label="安装命令:">
          <el-input type="textarea" :rows="10" v-model="form.installCodeUbuntu" placeholder="请输入安装命令" clearable/>
        </el-form-item>
        <el-form-item label="卸载命令:">
          <el-input type="textarea" :rows="10" v-model="form.uninstallCodeUbuntu" placeholder="请输入卸载命令" clearable/>
        </el-form-item>
        <el-form-item label="验证命令:">
          <el-input type="textarea" :rows="10" v-model="form.validateCodeUbuntu" placeholder="请输入验证命令" clearable/>
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
import * as api from '@/api/sys-middleware-release';
import {selectList as selectSysMiddlewareList} from '@/api/sys-middleware';
import JfBtn from "@/components/jf/JfBtn.vue";
export default {
  components: {JfBtn,},
  props:['form',],
  data() {
    return {
      middlewareList:[],
      api
    }
  },
  watch: {
    form(val){
      this.init(val)
    }
  },
  mounted() {
    selectSysMiddlewareList().then(data=>this.middlewareList = data)
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