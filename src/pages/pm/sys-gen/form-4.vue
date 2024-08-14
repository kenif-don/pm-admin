<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px">
      <div class="form-item-inline-box">
        <el-form-item label="是否需要菜单:">
          <el-switch class="w50 ml12" v-model="hasMenu" inactive-text="不需要" active-text="需要" :inactive-value="false" :active-value="true"/>
        </el-form-item>
        <el-form-item label="按钮组:">
          <el-popover placement="bottom" :width="400" trigger="click">
            <template #reference>
              <el-input v-model="form.icon" placeholder="图标" clearable/>
            </template>
            <jf-icon-select :filter="form.icon" @select="form.icon = $event"/>
          </el-popover>
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
import JfIconSelect from "@/components/jf/JfIconSelect.vue";

export default {
  name: 'form-4',
  components: {JfIconSelect, JfBtn},
  props:['genId',],
  data() {
    return {
      form:{},
      api,
      hasMenu:true,
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
      this.api.edit(this.form).then(() => {
        this.$jfUtils.msg("保存成功!")
      })
    },
    init() {
      api.selectOne({id:this.genId}).then(data=>{
        this.form = data
      })
    },
  }
}
</script>
<style scoped lang="scss">

</style>