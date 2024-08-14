<template>
<div>
    <el-form :model="form" label-width="160px">
      <div class="form-item-inline-box">
        <el-form-item label="组件名称:">
          <el-input v-model="form.name" placeholder="请输入组件名称" clearable/>
        </el-form-item>
        <el-form-item label="组件分组:">
          <el-input v-model="form.group" placeholder="请输入组件分组" clearable/>
        </el-form-item>
      </div>
      <div class="form-item-inline-box">
        <el-form-item label="组件版本:">
          <el-input v-model="form.release" placeholder="请输入组件版本" clearable/>
        </el-form-item>
        <el-form-item label="类型:">
          <el-select v-model="form.type" placeholder="请选择类型" filterable clearable>
            <el-option
                v-for="item in typeDices"
                :key="item.value"
                :value="parseInt(item.value)"
                :label="item.name">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="form-item-inline-box">
        <el-form-item label="说明:">
          <el-input type="textarea" :rows="10" v-model="form.remark" placeholder="请输入说明" clearable/>
        </el-form-item>
        <el-form-item label="init sql:">
          <el-input type="textarea" :rows="10" v-model="form.sql" placeholder="请输入init sql" clearable/>
        </el-form-item>
      </div>
      <div class="form-item-inline-box">
        <el-form-item label="组件logo:">
          <jf-img-uploader :urls="form.logo?[form.logo]:[]" @upload="form.logo=$event"/>
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
import JfImgUploader from "@/components/jf/JfImgUploader.vue";
import * as api from '@/api/pm/sys-component';
import {selectDices} from '@/api/dic/dic'
import JfBtn from "@/components/jf/JfBtn.vue";
export default {
  components: {JfBtn,JfImgUploader,},
  props:['form',],
  data() {
    return {
      typeDices:[],
      api
    }
  },
  watch: {
    form(val){
      this.init(val)
    }
  },
  mounted() {
    selectDices({'value':'component-type'}).then(data=>this.typeDices = data)
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