<template>
<div>
    <el-form :model="form" label-width="60px">
      <div class="form-item-inline-box">
        <el-form-item label="名称:">
          <el-input v-model="form.name" placeholder="请输入名称" clearable/>
        </el-form-item>
        <el-form-item label="标识:">
          <el-input v-model="form.value" placeholder="请输入标识" clearable/>
        </el-form-item>
      </div>
      <span slot="footer" class="dialog-footer">
        <jf-btn type="red" text="关闭" @click="$emit('close')"/>
        <jf-btn text="确定" @click="$emit('onsubmit')"/>
      </span>
    </el-form>
</div>
</template>

<script>
import * as api from '@/api/dic/dic-type';
import JfBtn from "@/components/jf/JfBtn.vue";
export default {
  components: {JfBtn},
  props:['form'],
  data() {
    return {
      api,
    }
  },
  mounted() {
  },
  methods: {}
}
</script>
<style lang="scss">
</style>