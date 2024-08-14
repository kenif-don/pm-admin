<template>
<div>
  <jf-querys>
    <jf-query-item label="组件名称：">
      <el-input v-model="page.clzObj.name" placeholder="请输入组件名称" clearable/>
    </jf-query-item>
    <jf-query-item label="组件分组：">
      <el-input v-model="page.clzObj.group" placeholder="请输入组件分组" clearable/>
    </jf-query-item>
    <jf-query-item label="类型：">
      <el-select v-model="page.clzObj.type" placeholder="请选择类型" filterable clearable>
        <el-option
          v-for="item in typeDices"
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
    <el-table-column prop="id" label="" width="60"/>
    <el-table-column prop="name" label="组件名称"/>
    <el-table-column prop="group" label="组件分组"/>
    <el-table-column prop="release" label="组件版本"/>
    <el-table-column prop="type" label="类型">
      <template #default="scope">
        <el-tag>
          <span>{{scope.row.typeDic && scope.row.typeDic.name}}</span>
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="logo" label="组件logo" width="130">
      <template #default="scope">
        <el-image :src="scope.row.logo" style="width: 100px" :preview-src-list="[scope.row.logo]"/>
      </template>
    </el-table-column>
    <el-table-column prop="remark" label="说明">
      <template #default="scope"><pre>{{scope.row.remark}}</pre></template>
    </el-table-column>
    <el-table-column label="操作" fixed="right">
      <template #default="scope">
        <jf-btn type="text" icon="Edit" @click="$jfUtils.openDialog(this,scope.row)"/>
        <jf-btn type="text" icon="Delete" @click="$jfUtils.del(this,scope.row.id,scope.row.$gen.delKey)"/>
      </template>
    </el-table-column>
  </el-table>
  <jf-pagination :page="page" @current-change="$jfUtils.handlePage($event,this)"/>
  <el-dialog title="组件库" v-model="dialogVisible" width="85%">
    <jf-form :form="form" @close="dialogVisible = false" @onsubmit="$jfUtils.onsubmit(this)"/>
  </el-dialog>
</div>
</template>
<script>
import * as api from '@/api/pm/sys-component';
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
      typeDices:[],
    }
  },
  mounted() {
    this.$jfUtils.paging(this);
    selectDices({'value':'component-type'}).then(data=>this.typeDices = data)
  },
  methods: {
  }
}
</script>
<style lang="scss">
</style>