<template>
<div>
    <el-form :model="form" label-width="100px" @keyup.enter.native="$emit('onsubmit')">
      <div class="form-item-inline-box">
        <el-form-item label="中间件名称:">
          <el-input v-model="form.name" placeholder="请输入中间件名称" clearable/>
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
import * as api from '@/api/sys-middleware';
import JfBtn from "@/components/jf/JfBtn.vue";
export default {
  components: {JfBtn,},
  props:['form',],
  data() {
    return {
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