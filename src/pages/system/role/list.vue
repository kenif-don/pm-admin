<template>
	<div>
    <div class="query-box">
      <div class="query-items">
        <div class="query-item">
          <div class="query-label">角色名称：</div>
          <el-input v-model="page.clzObj.name" clearable placeholder="请输入角色名称查询"/>
        </div>
      </div>
      <div class="query-btns">
        <jf-btn icon="Refresh" text="重置" @click="$jfUtils.reset(this)"/>
        <jf-btn icon="Search" text="搜索" @click="$jfUtils.query(this)"/>
        <jf-btn icon="Plus" text="添加" @click="open"/>
      </div>
    </div>
    <el-table :data="data" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="165"/>
      <el-table-column prop="name" label="角色名称"/>
      <el-table-column label="操作" width="120" fixed="right">
        <template #default="scope">
          <jf-btn type="text" icon="Edit" @click="open(scope.row)"/>
          <jf-btn type="text" icon="Delete" @click="$jfUtils.del(this,scope.row.id,scope.row.name)"/>
        </template>
      </el-table-column>
    </el-table>
    <jf-pagination :page="page" @current-change="$jfUtils.handlePage($event,this)"/>
    <el-dialog title="角色管理" v-model="dialogVisible" width="60%">
      <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="角色名称:">
          <el-input v-model="form.name" placeholder="请输入角色名称" clearable/>
        </el-form-item>
        <el-form-item label="角色资源:">
          <el-card shadow="never">
            <el-tree
                ref="tree"
                :data="tree"
                show-checkbox
                node-key="id"
                :check-strictly="strictly"
                :props=" { children: 'children', label: 'name' }"
                :default-checked-keys="roleResources">
            </el-tree>
          </el-card>
        </el-form-item>
        <span slot="footer" class="dialog-footer">
          <jf-btn type="red" text="关闭" @click="dialogVisible = false"/>
          <jf-btn text="确定" @click="onsubmit"/>
        </span>
      </el-form>
    </el-dialog>
	</div>
</template>


<script>
	import * as api from '@/api/system/role';
  import {tree, selectIdsByRoleId} from '@/api/system/resource';
  import JfBtn from "@/components/jf/JfBtn.vue";
  import JfPagination from "@/components/jf/JfPagination.vue";
	export default {
    components: {JfPagination, JfBtn},
		data() {
			return {
        form: {},
				page:{
					page:1,
					pageSize:10,
					total:0,
          clzObj:{}
				},
				data:[],
				api,
        dialogVisible: false,
        tree: [],
        roleResources:[],
        strictly:true
			}
		},
		mounted() {
			this.$jfUtils.paging(this);
      tree({}).then(data => {
        this.tree = data
      })
		},
		methods: {
      open(item){
        this.$jfUtils.openDialog(this,item,form=>{
          this.strictly = true;
          this.$nextTick(() => {
            if (form.id) {
              selectIdsByRoleId({id: form.id}).then(data => {
                this.roleResources = data
                this.strictly = false;
              })
            } else {
              this.roleResources = []
              this.$refs.tree.setCheckedKeys(this.roleResources)
              this.strictly = false;
            }
          })
        })
      },
      onsubmit(){
        this.form.ids = this.$refs.tree.getCheckedKeys();
        this.$jfUtils.onsubmit(this);
      },
		}
	}
</script>
<style lang="scss">
</style>
