<template>
  <div>
    <div class="query-box">
      <div class="query-items">
        <div class="query-item" style="width: 200px">
          <div class="query-label">项目：</div>
          <el-select v-model="page.clzObj.projectId" filterable placeholder="请选择项目">
            <el-option
                v-for="item in projectList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="query-item">
          <div class="query-label">名称：</div>
          <el-input v-model="page.clzObj.name" placeholder="请输入名称" clearable/>
        </div>
        <div class="query-item">
          <div class="query-label">ip：</div>
          <el-input v-model="page.clzObj.ip" placeholder="请输入ip" clearable/>
        </div>
      </div>
      <div class="query-btns">
        <jf-btn icon="Refresh" text="重置" @click="$jfUtils.reset(this)"/>
        <jf-btn icon="Search" text="搜索" @click="$jfUtils.query(this)"/>
        <jf-btn icon="Plus" text="添加" @click="$jfUtils.openDialog(this)"/>
      </div>
    </div>
    <el-table :data="data" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="55"/>
      <el-table-column label="项目">
        <template #default="scope">{{ scope.row.project.name }}</template>
      </el-table-column>
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="ip" label="ip" width="130"/>
      <el-table-column prop="port" label="端口" width="65"/>
      <el-table-column prop="username" label="账号"/>
      <el-table-column prop="charset" label="编码" width="100"/>
      <el-table-column label="操作" width="140">
        <template #default="scope">
          <jf-btn type="text" icon="Box" tip="创建数据库" @click="create(scope.row.id)"/>
          <jf-btn type="text" icon="Edit" @click="$jfUtils.openDialog(this,scope.row)"/>
          <jf-btn type="text" icon="Delete" @click="$jfUtils.del(this,scope.row.id,scope.row.name)"/>
        </template>
      </el-table-column>
    </el-table>
    <jf-pagination :page="page" @current-change="$jfUtils.handlePage($event,this)"/>
    <el-dialog title="项目数据库" v-model="dialogVisible" width="85%">
      <el-form ref="form" :model="form" label-width="120px">
        <div class="form-item-inline-box">
          <el-form-item label="项目:">
            <el-select v-model="form.projectId" filterable placeholder="请选择项目">
              <el-option
                  v-for="item in projectList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称:">
            <el-input v-model="form.name" placeholder="请输入名称" clearable/>
          </el-form-item>
        </div>
        <div class="form-item-inline-box">
          <el-form-item label="ip:">
            <el-input v-model="form.ip" placeholder="请输入ip" clearable/>
          </el-form-item>
          <el-form-item label="端口:">
            <el-input v-model="form.port" type="number" placeholder="请输入端口" clearable/>
          </el-form-item>
        </div>
        <div class="form-item-inline-box">
          <el-form-item label="账号:">
            <el-input v-model="form.username" placeholder="请输入账号" clearable/>
          </el-form-item>
          <el-form-item label="密码:">
            <el-input v-model="form.password" placeholder="请输入密码" clearable/>
          </el-form-item>
        </div>
        <div class="form-item-inline-box">
          <el-form-item label="编码:">
            <el-select v-model="form.charset" placeholder="请输入编码">
              <el-option
                  v-for="item in charsets"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <span slot="footer" class="dialog-footer">
        <jf-btn type="red" text="关闭" @click="dialogVisible = false"/>
        <jf-btn text="确定" @click="$jfUtils.onsubmit(this)"/>
      </span>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/pm/sys-db'
import {selectList as selectProjectList} from '@/api/pm/sys-project'
import JfBtn from "@/components/jf/JfBtn.vue";

export default {
  components: {JfBtn},
  data() {
    return {
      form: {},
      page: {
        page: 1,
        pageSize: 10,
        total: 0,
        clzObj: {}
      },
      data: [],
      dialogVisible: false,
      api: api,
      projectList: [],
      charsets: ['utf8mb4','utf8mb3']
    }
  },
  mounted() {
    this.$jfUtils.paging(this);
    selectProjectList({}).then(data => {
      this.projectList = data;
    })
  },
  methods: {
    create(id){
      api.create({id:id}).then(res=>{
        this.$message.success("创建成功!");
        this.$jfUtils.paging();
      })
    }
  }
}
</script>
<style lang="scss">
</style>