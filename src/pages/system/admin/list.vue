<template>
	<div>
    <div class="query-box">
      <div class="query-items">
        <div class="query-item">
          <div class="query-label">用户名：</div>
          <el-input v-model="page.clzObj.username" clearable placeholder="请输入用户名查询"/>
        </div>
        <div class="query-item">
          <div class="query-label">昵称：</div>
          <el-input v-model="page.clzObj.nickname" clearable placeholder="请输入昵称查询"/>
        </div>
      </div>
      <div class="query-btns">
        <jf-btn icon="Refresh" text="重置" @click="$jfUtils.reset(this)"/>
        <jf-btn icon="Search" text="搜索" @click="$jfUtils.query(this)"/>
        <jf-btn icon="Plus" text="添加" @click="$jfUtils.openDialog(this)"/>
      </div>
    </div>
    <el-table :data="data" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="165"/>
      <el-table-column prop="username" label="账号"/>
      <el-table-column prop="nickname" label="昵称"/>
      <el-table-column label="角色">
        <template #default="scope">
          {{scope.row.role.name}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" fixed="right">
        <template #default="scope">
          <jf-btn type="text" icon="Edit" @click="$jfUtils.openDialog(this,scope.row)"/>
          <jf-btn type="text" icon="Delete" @click="$jfUtils.del(this,scope.row.id,scope.row.nickname)"/>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @current-change="handleCurrentChange"
        background
        :current-page="page.page"
        :page-size="page.pageSize"
        layout="total, prev, pager, next"
        :total="page.total">
    </el-pagination>
    <el-dialog title="管理员" v-model="dialogVisible" width="60%">
      <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="账号:">
          <el-input :disabled="form.id" v-model="form.username" placeholder="请输入账号"/>
        </el-form-item>
        <el-form-item label="昵称:">
          <el-input v-model="form.nickname" placeholder="请输入昵称"/>
        </el-form-item>
        <el-form-item label="角色:">
          <el-select v-model="form.roleId" placeholder="请选择角色">
            <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <span slot="footer" class="dialog-footer">
          <jf-btn type="red" text="关闭" @click="dialogVisible = false"/>
          <jf-btn text="确定" @click="$jfUtils.onsubmit(this)"/>
        </span>
      </el-form>
    </el-dialog>
	</div>
</template>

<script>
	import * as api from '@/api/system/admin';
  import {selectList} from '@/api/system/role'
  import JfBtn from "@/components/jf/JfBtn.vue";
	export default {
    components: {JfBtn},
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
        tree: [],
        api,
        dialogVisible: false,
        roles:[]
			}
		},
		mounted() {
			this.$jfUtils.paging(this);
      selectList({}).then(data=>{
        this.roles = data;
      })
		},
		methods: {
			handleCurrentChange(page){
        console.log(page)
			},
		}
	}
</script>
<style lang="scss">
.sys-admin-main{
  display: flex;
  justify-content: space-between;

  .main-item{
    width: 50%;
  }
}
</style>
