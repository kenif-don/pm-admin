<template>
<div>
  <jf-querys>
    <jf-query-item label="分类：">
       <el-select v-model="page.clzObj.typeId" placeholder="请选择分类" filterable clearable>
        <el-option
          v-for="item in typeList"
          :key="item.id"
          :value="item.id"
          :label="item.name"></el-option>
      </el-select>
    </jf-query-item>
    <jf-query-item label="字典项名称：">
       <el-input v-model="page.clzObj.name" placeholder="请输入字典项名称" clearable/>
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
     <el-table-column prop="id" label="编号"/>
     <el-table-column prop="typeId" label="分类">
      <template #default="scope">{{scope.row.type.name}}</template>
    </el-table-column>
     <el-table-column prop="name" label="字典项名称"/>
     <el-table-column prop="value" label="字典项值"/>
     <el-table-column label="操作" fixed="right">
      <template #default="scope">
        <jf-btn type="text" icon="Edit" @click="$jfUtils.openDialog(this,scope.row)"/>
        <jf-btn type="text" icon="Delete" @click="$jfUtils.del(this,scope.row.id,scope.row.$gen.delKey)"/>
      </template>
     </el-table-column>
  </el-table>
   <jf-pagination :page="page" @current-change="$jfUtils.handlePage($event,this)"/>
    <el-dialog title="字典项" v-model="dialogVisible" width="85%">
      <jf-form :form="form" @close="dialogVisible = false" @onsubmit="$jfUtils.onsubmit(this)"/>
    </el-dialog>
</div>
</template>

<script>
import * as api from '@/api/dic/dic';
import {selectList as selectSysDicTypeList} from '@/api/dic//dic-type';
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
      typeList:[],
    }
  },
  mounted() {
      this.$jfUtils.paging(this);
      selectSysDicTypeList().then(data=>this.typeList = data)
  },
  methods: {
  }
}
</script>
<style lang="scss">
</style>