<template>
<div>
  <jf-querys>
    <jf-query-item label="服务器名称：">
      <el-input v-model="page.clzObj.name" placeholder="请输入服务器名称" clearable/>
    </jf-query-item>
    <jf-query-item label="服务器IP：">
      <el-input v-model="page.clzObj.ip" placeholder="请输入服务器IP" clearable/>
    </jf-query-item>
    <jf-query-item label="操作系统：">
      <el-select v-model="page.clzObj.system" placeholder="请选择操作系统" filterable clearable>
        <el-option
          v-for="item in systemDices"
          :key="item.value"
          :value="item.value"
          :label="item.name">
        </el-option>
      </el-select>
    </jf-query-item>
    <jf-query-item>
      <jf-btn icon="Refresh" text="重置" @click="$jfUtils.reset(this)"/>
      <jf-btn icon="Search" text="搜索" @click="$jfUtils.query(this)"/>
      <jf-btn icon="Plus" text="添加" @click="$jfUtils.openDialog(this)"/>
    </jf-query-item>
  </jf-querys>
  <el-table
    :data="data"
    border style="width: 100%">
    <el-table-column prop="id" label="编号" width="60"/>
    <el-table-column prop="name" label="服务器名称"/>
    <el-table-column prop="ip" label="服务器IP"/>
    <el-table-column prop="port" label="服务器ssh端口"/>
    <el-table-column prop="username" label="服务器ssh账号"/>
    <el-table-column prop="password" label="服务器密码"/>
    <el-table-column prop="system" label="操作系统">
      <template #default="scope">
        <el-tag>
          <span>{{scope.row.systemDic && scope.row.systemDic.name}}</span>
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" fixed="right">
      <template #default="scope">
        <jf-btn type="text" icon="Edit" @click="$jfUtils.openDialog(this,scope.row)"/>
        <jf-btn type="text" icon="Delete" @click="$jfUtils.del(this,scope.row.id,scope.row.$gen.delKey)"/>
        <jf-btn type="text" tip="进入服务器" icon="Platform" @click="into(scope.row)"/>
      </template>
    </el-table-column>
  </el-table>
  <jf-pagination :page="page" @current-change="$jfUtils.handlePage($event,this)"/>
  <el-dialog title="服务器" v-model="dialogVisible" width="85%">
    <jf-form :form="form" @close="dialogVisible = false" @onsubmit="$jfUtils.onsubmit(this)"/>
  </el-dialog>
</div>
</template>
<script>
import * as api from '@/api/sys-server';
import {selectDices} from '@/api/dic/dic'
import JfBtn from "@/components/jf/JfBtn.vue";
import JfPagination from "@/components/jf/JfPagination.vue";
import JfForm from './form.vue'
export default {
  components: {JfPagination, JfBtn,JfForm},
  data() {
    return {
      form:{},
      page: {
        page: 1,
        pageSize: 10,
        total: 0,
        clzObj:{}
      },
      data: [],
      dialogVisible: false,
      api,
      systemDices:[],
    }
  },
  mounted() {
    this.$jfUtils.paging(this);
    selectDices({'value':'sys_server_system'}).then(data=>this.systemDices = data)
  },
  methods: {
    into(item){
      this.$router.push({path:`/sys-server/index`,query:item})
    }
  }
}
</script>
<style lang="scss">
</style>