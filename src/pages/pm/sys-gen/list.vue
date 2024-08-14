<template>
  <div>
    <jf-querys>
      <jf-query-item label="项目:">
        <el-select v-model="page.clzObj.projectId" filterable placeholder="请选择项目">
          <el-option
              v-for="item in projectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          >
          </el-option>
        </el-select>
      </jf-query-item>
      <jf-query-item label="数据库:">
        <el-select v-model="page.clzObj.dbId" filterable placeholder="请选择数据库">
          <el-option
              v-for="item in dbList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          >
          </el-option>
        </el-select>
      </jf-query-item>
      <jf-query-item label="表名:">
        <el-input v-model="page.clzObj.name" clearable placeholder="请输入表名"/>
      </jf-query-item>
      <jf-query-item>
        <jf-btn icon="Refresh" text="重置" @click="$jfUtils.reset(this)"/>
        <jf-btn icon="Search" text="搜索" @click="$jfUtils.query(this)"/>
        <jf-btn icon="Plus" text="选择表生成" @click="open"/>
      </jf-query-item>
    </jf-querys>
    <div class="main">
      <el-table :data="data" border style="width: 100%">
        <el-table-column prop="id" label="编号" width="55"/>
        <el-table-column label="所属项目名" width="120">
          <template #default="scope">{{ scope.row.project.name }}</template>
        </el-table-column>
        <el-table-column label="所属数据库" width="120">
          <template #default="scope">{{ scope.row.db.name }}</template>
        </el-table-column>
        <el-table-column prop="name" label="表名"/>
        <el-table-column label="模块">
          <template #default="scope">{{ scope.row.moduleName }}|{{scope.row.moduleVal}}</template>
        </el-table-column>
        <el-table-column label="功能">
          <template #default="scope">{{ scope.row.fnName }}|{{scope.row.fnVal}}</template>
        </el-table-column>
        <el-table-column prop="prefix" label="分割前缀" width="100"/>
        <el-table-column prop="separator" label="分割符" width="70"/>
        <el-table-column label="类型" width="120">
          <template #default="scope">
            <el-tag v-if="scope.row.type === 1">普通表</el-tag>
            <el-tag v-if="scope.row.type === 2">树形结构表</el-tag>
            <el-tag v-if="scope.row.type === 3">父子表-父表</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.formType === 1">弹窗</el-tag>
            <el-tag v-if="scope.row.formType === 2">新开页面</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="可选操作" width="180">
          <template #default="scope">
            <div class="flex-between">
              <el-tag v-if="scope.row.hasAdd === 1">添加</el-tag>
              <el-tag v-if="scope.row.hasEdit === 1">修改</el-tag>
              <el-tag v-if="scope.row.hasDel === 1">删除</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="showKey" label="显示属性" width="110"/>
        <el-table-column label="操作" width="140" fixed="right">
          <template #default="scope">
            <jf-btn type="text" icon="Edit" @click="open(scope.row)"/>
            <jf-btn type="text" icon="Delete" @click="$jfUtils.del(this,scope.row.id,scope.row.name+'表、代码生成项、菜单sql、后台代码文件、前端代码文件')"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <jf-pagination :page="page" @current-change="$jfUtils.handlePage($event,this)"/>
  </div>
</template>

<script>
import * as api from '@/api/pm/sys-gen'
import {selectList as selectProjectList} from '@/api/pm/sys-project'
import {selectList as selectDbList} from '@/api/pm/sys-db'
import {getTables} from '@/api/pm/sys-table'
import JfBtn from "@/components/jf/JfBtn.vue";
import JfPagination from "@/components/jf/JfPagination.vue";
import JfQuerys from "@/components/jf/JfQuerys.vue";
import JfQueryItem from "@/components/jf/JfQueryItem.vue";
import JfIconSelect from "@/components/jf/JfIconSelect.vue";

export default {
  components: {JfIconSelect, JfQueryItem, JfQuerys, JfPagination, JfBtn},
  data() {
    return {
      page: {
        page: 1,
        pageSize: 10,
        total: 0,
        clzObj: {}
      },
      data: [],
      api,
      projectList:[],
      dbList: [],
      tableList: [],
    }
  },
  mounted() {
    this.$jfUtils.paging(this);
    this.init();
  },
  methods: {
    open(item){
      this.$router.push({path:'./form', query:{query:JSON.stringify({genId:item.id,name:item.name})}})
    },
    init(){
      selectProjectList().then(data =>this.projectList = data)
      selectDbList({}).then(data =>this.dbList = data)
    },
  }
}
</script>
<style lang="scss">
</style>