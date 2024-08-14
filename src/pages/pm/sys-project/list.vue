<template>
<div>
  <div class="query-box">
    <div class="query-items">
          <div class="query-item">
            <div class="query-label">中文名称：</div>
              <el-input v-model="page.clzObj.name" placeholder="请输入中文名称" clearable/>
          </div>
          <div class="query-item">
            <div class="query-label">唯一标志：</div>
              <el-input v-model="page.clzObj.value" placeholder="请输入唯一标志" clearable/>
          </div>
    </div>
    <div class="query-btns">
      <jf-btn icon="Search" text="查询" @click="$jfUtils.paging(this)"/>
      <jf-btn icon="Refresh" text="重置" @click="$jfUtils.reset(this)"/>
      <jf-btn icon="Plus" text="新增" @click="$jfUtils.openDialog(this)"/>
    </div>
  </div>
  <div class="main">
    <el-table :data="data" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="55"/>
          <el-table-column prop="name" label="中文名称"/>
          <el-table-column prop="value" label="标志"/>
          <el-table-column prop="basePackage" label="基础包名"/>
          <el-table-column prop="port" label="启动端口" width="85"/>
           <el-table-column label="状态" width="85">
            <template #default="scope">
              <el-tag v-if="scope.row.devStatus===1">未创建</el-tag>
              <el-tag type="success" v-else-if="scope.row.devStatus===2">开发中</el-tag>
              <el-tag type="success" v-else-if="scope.row.devStatus===3">运营中</el-tag>
            </template>
          </el-table-column>
           <el-table-column label="启动状态" width="85">
            <template #default="scope">
              <el-tag v-if="scope.row.runStatus===1">未启动</el-tag>
              <el-tag type="success" v-else-if="scope.row.runStatus===2">已启动</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="git" label="仓库地址"/>
          <el-table-column prop="createTime" label="创建时间" width="160" :formatter="$jfUtils.rowFormatDatetime"/>
      <el-table-column label="操作" width="178" fixed="right">
        <template #default="scope">
          <el-tooltip content="创建项目文件" placement="top">
            <jf-btn type="text" icon="Box" @click="create(scope.row.id)"/>
          </el-tooltip>
          <el-dropdown>
            <jf-btn type="text" icon="Share"/>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="git(scope.row,1)">推送</el-dropdown-item>
                <el-dropdown-item @click="git(scope.row,2)">更新</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <jf-btn type="text" icon="Edit" @click="$jfUtils.openDialog(this,scope.row)"/>
          <jf-btn type="text" icon="Delete" @click="$jfUtils.del(this,scope.row.id,scope.row.name)"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <jf-pagination :page="page" @current-change="$jfUtils.handlePage($event,this)"/>
  <el-dialog title="项目" v-model="dialogVisible" width="85%">
    <el-form ref="form" :model="form" label-width="120px">
    <div class="form-item-inline-box">
      <el-form-item label="中文名称:">
          <el-input v-model="form.name" placeholder="请输入中文名称" clearable/>
      </el-form-item>
      <el-form-item label="唯一标志:">
          <el-input v-model="form.value" placeholder="请输入唯一标志" clearable/>
      </el-form-item>
    </div>
    <div class="form-item-inline-box">
      <el-form-item label="基础包名:">
          <el-input v-model="form.basePackage" placeholder="请输入基础包名" clearable/>
      </el-form-item>
      <el-form-item label="启动端口:">
          <el-input v-model="form.port" type="number" placeholder="请输入启动端口" clearable/>
      </el-form-item>
    </div>
    <div class="form-item-inline-box">
      <el-form-item label="路径(服务器):">
        <el-input v-model="form.path" placeholder="不填写将自动生成" clearable/>
      </el-form-item>
      <el-form-item label="路径(管理端):">
        <el-input v-model="form.adminPath" placeholder="不填写将自动生成" clearable/>
      </el-form-item>
    </div>
    <div class="form-item-inline-box">
      <el-form-item label="仓库地址:">
        <el-input v-model="form.git" placeholder="请输入远程仓库地址" clearable/>
      </el-form-item>
      <el-form-item label="依赖组件:">
        <el-select v-model="form.ids" multiple placeholder="请选择依赖组件" clearable>
          <el-option v-for="item in comps" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
import * as api from '@/api/pm/sys-project'
import JfPagination from "@/components/jf/JfPagination.vue";
import JfBtn from "@/components/jf/JfBtn.vue";
import {selectList as selectComponentList} from '@/api/pm/sys-component'
export default {
  components: {JfBtn, JfPagination},
  data() {
    return {
      form: {},
      page: {
        page: 1,
        pageSize: 10,
        total: 0,
        clzObj:{}
      },
      data: [],
      dialogVisible: false,
      api,
      comps: []
    }
  },
  mounted() {
    this.$jfUtils.paging(this);
    selectComponentList().then(data => {
      this.comps = data
    })
  },
  methods: {
    git(item,type) {
      if(type === 1){
        api.push({id:item.id}).then(res=>{
          this.$message.success("推送成功!");
        })
      }else{
        api.pull({id:item.id}).then(res=>{
          this.$message.success("更新成功!");
        })
      }
    },
    create(id) {
      api.create({id:id}).then(res=>{
        this.$message.success("创建成功!");
        this.$jfUtils.paging();
      })
    },
  }
}
</script>
<style lang="scss">
</style>