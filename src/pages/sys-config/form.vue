<template>
<div>
    <el-form :model="form" label-width="100px">
      <div class="form-item-inline-box">
        <el-form-item label="菜单模式:">
          <el-select v-model="form.menuModel" placeholder="请选择菜单模式" filterable clearable>
            <el-option
                v-for="item in menuModelDices"
                :key="item.value"
                :value="parseInt(item.value)"
                :label="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="窗口模式:">
          <el-select v-model="form.framModel" placeholder="请选择窗口模式" filterable clearable>
            <el-option
                v-for="item in framModelDices"
                :key="item.value"
                :value="parseInt(item.value)"
                :label="item.name">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <span slot="footer" class="dialog-footer">
        <jf-btn text="确定" @click="$jfUtils.editOne(this)"/>
      </span>
    </el-form>
</div>
</template>

<script>
import * as api from '@/api/sys-config';
import {selectDices} from '@/api/dic/dic'
import JfBtn from "@/components/jf/JfBtn.vue";
export default {
  components: {JfBtn,},
  data() {
    return {
      form:{},
      menuModelDices:[],
      framModelDices:[],
      api
    }
  },
  mounted() {
    selectDices({'value':'config_menu_model'}).then(data=>this.menuModelDices = data)
    selectDices({'value':'config_fram_model'}).then(data=>this.framModelDices = data)
    this.$jfUtils.get(this)
  },
  methods: {
  }
}
</script>
<style lang="scss">
</style>