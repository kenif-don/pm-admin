<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <div class="form-item-inline-box">
        <el-form-item label="列表类型:">
          <el-radio-group v-model="form.listType">
            <el-radio-button :value="1">普通列表</el-radio-button>
            <el-radio-button :value="2">树形列表</el-radio-button>
            <el-radio-button :value="3">无列表</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="按钮组:">
          <el-checkbox-group v-model="btns">
            <el-checkbox v-for="item in btnData" :key="item" :value="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <div class="form-item-inline-box" v-if="btns.indexOf('add') !== -1 || btns.indexOf('edit') !== -1">
        <el-form-item label="表单显示:">
          <el-radio-group v-model="form.formType">
            <el-radio-button :value="1">新开页面</el-radio-button>
            <el-radio-button :value="2">弹窗显示</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="弹窗设置:" v-if="form.formType === 2">
          <div class="flex-center">
            <el-input class="w50" v-model="form.formWidth" placeholder="弹窗宽度" clearable/>%
            <el-switch class="w50 ml12" v-model="form.formCol" inactive-text="单列" active-text="双列" :inactive-value="1" :active-value="2"/>
          </div>
        </el-form-item>
      </div>
    </el-form>
    <span class="dialog-footer">
          <jf-btn type="red" text="返回" @click="$jfUtils.back(this)"/>
          <jf-btn text="确定" @click="onsubmit"/>
      </span>
  </div>
</template>
<script>
import * as api from '@/api/pm/sys-gen';
import JfBtn from "@/components/jf/JfBtn.vue";

export default {
  name: 'form-3',
  components: {JfBtn},
  props:['genId',],
  data() {
    return {
      form:{},
      api,
      btnData:['add','edit','del','doImport','export'],
      btns:['add','edit','del'],
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.init();
    })
  },
  methods: {
    onsubmit() {
      this.form.btns = JSON.stringify(this.btns)
      this.form.hasList = this.form.listType === 3 ? -1 : 1
      this.api.edit(this.form).then(() => {
        this.$jfUtils.msg("保存成功!")
      })
    },
    init() {
      api.selectOne({id:this.genId}).then(data=>{
        this.form = data
        if(this.form.type === 2){
          this.form.listType = 2
        }else{
          this.form.listType = 1
        }
        if(this.form.btns && this.form.btns !== 'null' && typeof this.form.btns === 'string'){
          this.btns = JSON.parse(this.form.btns)
        }
        this.form.formType = 2;
        this.form.formWidth = 85;
        this.form.formCol = 2;
      })
    },
  }
}
</script>
<style scoped lang="scss">

</style>