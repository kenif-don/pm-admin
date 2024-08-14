<template>
  <div>
    <div class="query-box">
      <div class="query-items">
        <div class="query-item">
          <div class="query-label">资源名称：</div>
          <el-input v-model="query.name" placeholder="输入名称查询" clearable/>
        </div>
      </div>
      <div class="query-btns">
        <jf-btn icon="Refresh" text="重置" @click="$jfUtils.resetTree(this)"/>
        <jf-btn icon="Search" text="查询" @click="$jfUtils.tree(this)"/>
        <jf-btn icon="Plus" text="添加" @click="$jfUtils.openDialog(this)"/>
      </div>
    </div>
    <el-table :data="data" style="width: 100%" row-key="id">
      <el-table-column label="名称">
        <template #default="scope">
          <el-icon v-if="scope.row.icon"><component :is="scope.row.icon"></component></el-icon>
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序号"/>
      <el-table-column prop="path" label="路径/按钮接口"/>
      <el-table-column prop="fn" label="按钮函数"/>
      <el-table-column label="类型">
        <template #default="scope">
          <span v-if="scope.row.type === 1">菜单</span>
          <span v-if="scope.row.type === 2">外联菜单</span>
          <span v-if="scope.row.type === 3">内联菜单</span>
          <span v-if="scope.row.type === 4">按钮</span>
          <span v-if="scope.row.type === 5">接口</span>
        </template>
      </el-table-column>
      <el-table-column label="显示">
        <template #default="scope">
          <span v-if="scope.row.show === 1">是</span>
          <span v-if="scope.row.show === -1">否</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="scope">
          <jf-btn icon="Plus" type="text" @click="openAddChild(scope.row)"/>
          <jf-btn icon="Edit" type="text" @click="$jfUtils.openDialog(this,scope.row)"/>
          <jf-btn icon="Delete" type="text" @click="$jfUtils.delTree(this,scope.row.id,scope.row.name)"/>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        title="提示"
        v-model="dialogVisible"
        width="85%">
      <el-form :model="form" label-width="80px">
        <div class="form-item-inline-box">
          <el-form-item label="资源名称">
            <el-input v-model="form.name"/>
          </el-form-item>
          <el-form-item label="资源图标">
            <el-popover placement="bottom" :width="400" trigger="click">
              <template #reference>
                <el-input v-model="form.icon" placeholder="图标" clearable/>
              </template>
              <jf-icon-select :filter="form.icon" @select="form.icon = $event"/>
            </el-popover>
          </el-form-item>
        </div>
        <div class="form-item-inline-box">
          <el-form-item label="上级菜单">
            <el-cascader v-model="form.parentId" :options="data" :props="{value:'id',label:'name',checkStrictly: true}" clearable />
          </el-form-item>
        </div>
        <div class="form-item-inline-box">
          <el-form-item label="资源类型">
            <el-radio-group v-model="form.type">
              <el-radio-button :value="1">菜单</el-radio-button>
              <el-radio-button :value="2">外联菜单</el-radio-button>
              <el-radio-button :value="3">内联菜单</el-radio-button>
              <el-radio-button :value="4">按钮</el-radio-button>
              <el-radio-button :value="5">接口</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="form.type === 4 ? '按钮接口' : '资源路径'">
            <el-input v-model="form.path" :placeholder="form.type === 4 ? '/back/sys-resource/tree' : '/system/source/index'" clearable/>
          </el-form-item>
        </div>
        <div class="form-item-inline-box">
          <el-form-item label="是否显示">
            <el-radio-group v-model="form.show">
              <el-radio-button :value="1">是</el-radio-button>
              <el-radio-button :value="-1">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序编号">
            <el-input v-model="form.sort" clearable/>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <jf-btn type="red" text="关闭" @click="dialogVisible = false"/>
        <jf-btn text="确定" @click="$jfUtils.onsubmitTree(this,'parentId')"/>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as api from '@/api/system/resource'
import JfIconSelect from '@/components/jf/JfIconSelect.vue'
import JfBtn from "@/components/jf/JfBtn.vue";
export default {
  components: {
    JfBtn,
    JfIconSelect
  },
  data() {
    return {
      data:[],
      query: {},
      dialogVisible:false,
      form:{},
      api
    }
  },
  created() {
    this.$jfUtils.tree(this);
  },
  methods: {
    openAddChild(item){
      this.form = {parentId:item.id}
      this.dialogVisible = true
    },
  }
}
</script>
<style scoped lang="scss">

</style>