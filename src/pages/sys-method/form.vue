<template>
<div>
    <el-form :model="form" label-width="140px" @keyup.enter.native="$emit('onsubmit')">
      <div class="form-item-inline-box">
        <el-form-item label="项目:">
          <el-select v-model="form.projectId" placeholder="请选择项目" filterable clearable >
            <el-option
                v-for="item in projectList"
                :key="item.id"
                :value="item.id"
                :label="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类:">
          <el-select v-model="form.clzId" placeholder="请选择类" filterable clearable >
            <el-option
                v-for="item in clzList"
                :key="item.id"
                :value="item.id"
                :label="item.clz_var">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="form-item-inline-box">
        <el-form-item label="方法的全限定名:">
          <el-input v-model="form.clz" placeholder="请输入方法的全限定名" clearable/>
        </el-form-item>
        <el-form-item label="方法名:">
          <el-input v-model="form.name" placeholder="请输入方法名" clearable/>
        </el-form-item>
      </div>
      <div class="form-item-inline-box">
        <el-form-item label="参数:">
        </el-form-item>
        <el-form-item label="返回值:">
          <el-input v-model="form.result" placeholder="请输入返回值" clearable/>
        </el-form-item>
      </div>
      <div class="form-item-inline-box">
        <el-form-item label="注解:">
          <el-input v-model="form.annotations" placeholder="请输入注解" clearable/>
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
import * as api from '@/api/sys-method';
import {selectList as selectSysClzList} from '@/api/sys-clz';
import JfBtn from "@/components/jf/JfBtn.vue";
export default {
  components: {JfBtn,},
  props:['form',],
  data() {
    return {
      projectList:[],
      clzList:[],
      api
    }
  },
  watch: {
    form(val){
      this.init(val)
    }
  },
  mounted() {
    selectSysClzList().then(data=>this.clzList = data)
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