<template>
<div>
    <el-form :model="form" label-width="160px" @keyup.enter.native="$emit('onsubmit')">
      <div class="form-item-inline-box">
        <el-form-item label="服务器名称:">
          <el-input v-model="form.name" placeholder="请输入服务器名称" clearable/>
        </el-form-item>
        <el-form-item label="服务器IP:">
          <el-input v-model="form.ip" placeholder="请输入服务器IP" clearable/>
        </el-form-item>
      </div>
      <div class="form-item-inline-box">
        <el-form-item label="服务器ssh端口:">
          <el-input type="number" v-model="form.port" placeholder="请输入服务器ssh端口" clearable/>
        </el-form-item>
        <el-form-item label="服务器ssh账号:">
          <el-input v-model="form.username" placeholder="请输入服务器ssh账号" clearable/>
        </el-form-item>
      </div>
      <div class="form-item-inline-box">
        <el-form-item label="服务器密码:">
          <el-input type="password" v-model="form.password" placeholder="请输入服务器密码" clearable/>
        </el-form-item>
        <el-form-item label="操作系统:">
          <el-select v-model="form.system" placeholder="请选择操作系统" filterable clearable>
            <el-option
                v-for="item in systemDices"
                :key="item.value"
                :value="item.value"
                :label="item.name">
            </el-option>
          </el-select>
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
import * as api from '@/api/sys-server';
import {selectDices} from '@/api/dic/dic'
import JfBtn from "@/components/jf/JfBtn.vue";
export default {
  components: {JfBtn,},
  props:['form',],
  data() {
    return {
      systemDices:[],
      api
    }
  },
  watch: {
    form(val){
      this.init(val)
    }
  },
  mounted() {
    selectDices({'value':'sys_server_system'}).then(data=>this.systemDices = data)
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