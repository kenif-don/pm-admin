<template>
<div>
  <jf-querys>
    <jf-query-item label="中间件：">
      <el-select v-model="page.clzObj.middlewareId" placeholder="请选择中间件" filterable clearable>
        <el-option
          v-for="item in middlewareList"
          :key="item.id"
          :value="item.id"
          :label="item.name"></el-option>
      </el-select>
    </jf-query-item>
    <jf-query-item label="版本号：">
      <el-input v-model="page.clzObj.release" placeholder="请输入版本号" clearable/>
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
    <el-table-column prop="middlewareId" label="中间件">
        <template #default="scope">{{scope.row.middleware && scope.row.middleware.name}}</template>
    </el-table-column>
    <el-table-column prop="release" label="版本号"/>
    <el-table-column prop="installCodeUbuntu" label="安装命令">
      <template #default="scope"><pre>{{scope.row.installCodeUbuntu}}</pre></template>
    </el-table-column>
    <el-table-column prop="uninstallCodeUbuntu" label="卸载命令">
      <template #default="scope"><pre>{{scope.row.uninstallCodeUbuntu}}</pre></template>
    </el-table-column>
    <el-table-column label="操作" fixed="right">
      <template #default="scope">
        <jf-btn type="text" icon="Edit" @click="$jfUtils.openDialog(this,scope.row)"/>
        <jf-btn type="text" icon="Delete" @click="$jfUtils.del(this,scope.row.id,scope.row.$gen.delKey)"/>
      </template>
    </el-table-column>
  </el-table>
  <jf-pagination :page="page" @current-change="$jfUtils.handlePage($event,this)"/>
  <el-dialog title="中间件版本" v-model="dialogVisible" width="85%">
    <jf-form :form="form" @close="dialogVisible = false" @onsubmit="$jfUtils.onsubmit(this)"/>
  </el-dialog>
</div>
</template>
<script>
import * as api from '@/api/sys-middleware-release';
import {selectList as selectSysMiddlewareList} from '@/api/sys-middleware';
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
      middlewareList:[],
    }
  },
  mounted() {
    this.$jfUtils.paging(this);
    selectSysMiddlewareList().then(data=>this.middlewareList = data)
  },
  methods: {
  }
}
</script>
<style lang="scss">
</style>