<template>
<div>
    <el-form :model="form" label-width="125px">
      <div class="form-item-inline-box">
        <el-form-item label="分类:">
          <el-select v-model="form.typeId" placeholder="请选择分类" filterable clearable>
            <el-option
                v-for="item in typeList"
                :key="item.id"
                :value="item.id"
                :label="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字典项名称:">
          <el-input v-model="form.name" placeholder="请输入字典项名称" clearable/>
        </el-form-item>
      </div>
      <div class="form-item-inline-box">
        <el-form-item label="字典项值:">
          <el-input v-model="form.value" placeholder="请输入字典项值" clearable/>
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
import * as api from '@/api/dic/dic';
import {selectList as selectSysDicTypeList} from '@/api/dic//dic-type';
import JfBtn from "@/components/jf/JfBtn.vue";
export default {
  components: {JfBtn},
  props:['form'],
  data() {
    return {
      typeList:[],
      api,
    }
  },
  mounted() {
    selectSysDicTypeList().then(data=>this.typeList = data)
  },
  methods: {}
}
</script>
<style lang="scss">
</style>