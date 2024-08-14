<template>
<div>
  <div class="query-box">
    <div class="query-items">
          <div class="query-item">
            <div class="query-label">关联表：</div>
              <el-input v-model="page.clzObj.tables" placeholder="请输入关联表" clearable/>
          </div>
          <div class="query-item">
            <div class="query-label">名称：</div>
              <el-input v-model="page.clzObj.name" placeholder="请输入名称" clearable/>
          </div>
          <div class="query-item">
            <div class="query-label">备注：</div>
              <el-input v-model="page.clzObj.remark" placeholder="请输入备注" clearable/>
          </div>
          <div class="query-item">
            <div class="query-label">所属项目：</div>
               <el-select v-model="page.clzObj.projectId" filterable placeholder="请选择所属项目">
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
            <div class="query-label">类型：</div>
               <el-radio-group v-model="page.clzObj.type">
                    <el-radio-button :label="1">定制模块</el-radio-button>
                    <el-radio-button :label="2">系统模块</el-radio-button>
              </el-radio-group>
          </div>
          <div class="query-item">
            <div class="query-label">创建人：</div>
              <el-input v-model="page.clzObj.createAdmin" placeholder="请输入创建人" clearable/>
          </div>
          <div class="query-item">
            <div class="query-label">更新人：</div>
              <el-input v-model="page.clzObj.updateAdmin" placeholder="请输入更新人" clearable/>
          </div>
    </div>
    <div class="query-btns">
      <el-button type="primary" @click="query">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
      <el-button type="primary" @click="open">添加项目模块</el-button>
    </div>
  </div>
  <div class="main">
    <el-table :data="data" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="50"/>
          <el-table-column prop="tables" label="关联表"/>
          <el-table-column prop="name" label="名称"/>
          <el-table-column prop="remark" label="备注"/>
          <el-table-column label="所属项目">
            <template slot-scope="scope">{{scope.row.project.name}}</template>
          </el-table-column>
           <el-table-column label="类型">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.type===1">定制模块</el-tag>
              <el-tag type="success" v-else-if="scope.row.type===2">系统模块</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="160" :formatter="rowFormatDate"/>
          <el-table-column prop="updateTime" label="" width="160" :formatter="rowFormatDate"/>
          <el-table-column prop="version" label="乐观锁"/>
          <el-table-column prop="createAdmin" label="创建人"/>
          <el-table-column prop="updateAdmin" label="更新人"/>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="open(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="pagination">
    <el-pagination
        @current-change="handleCurrentChange"
        background
        :current-page="page.page"
        :page-size="page.pageSize"
        layout="total, prev, pager, next"
        :total="page.total">
    </el-pagination>
  </div>
  <el-dialog :close-on-click-modal="false" title="项目模块" :visible.sync="dialogVisible" width="60%">
    <el-form ref="form" :model="form" label-width="160px">
    <div class="form-item-inline-box">
      <el-form-item label="关联表:">
          <el-input v-model="form.tables" placeholder="请输入关联表" clearable/>
      </el-form-item>
      <el-form-item label="名称:">
          <el-input v-model="form.name" placeholder="请输入名称" clearable/>
      </el-form-item>
    </div>
    <div class="form-item-inline-box">
      <el-form-item label="备注:">
          <el-input v-model="form.remark" placeholder="请输入备注" clearable/>
      </el-form-item>
      <el-form-item label="所属项目:">
           <el-select v-model="form.projectId" filterable placeholder="请选择所属项目">
            <el-option
              v-for="item in projectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
      </el-form-item>
    </div>
    <div class="form-item-inline-box">
      <el-form-item label="类型:">
           <el-radio-group v-model="form.type">
              <el-radio-button :label="1">定制模块</el-radio-button>
            <el-radio-button :label="2">系统模块</el-radio-button>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="创建人:">
          <el-input v-model="form.createAdmin" placeholder="请输入创建人" clearable/>
      </el-form-item>
    </div>
    <div class="form-item-inline-box">
      <el-form-item label="更新人:">
          <el-input v-model="form.updateAdmin" placeholder="请输入更新人" clearable/>
      </el-form-item>
    </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
import * as api from '@/api/model'
import {selectList as selectProjectList} from '@/api/project_id'
export default {
  components: {},
  data() {
    return {
      form: {
        tables: null,
        name: null,
        remark: null,
        projectId: null,
        type: null,
        version: null,
        createAdmin: null,
        updateAdmin: null,
      },
      page: {
        page: 1,
        pageSize: 10,
        total: 0,
        clzObj:{
          tables: null,
          name: null,
          remark: null,
          projectId: null,
          type: null,
          version: null,
          createAdmin: null,
          updateAdmin: null,
        }
      },
      data: [],
      dialogVisible: false,
      api: api,
      projectList:[],
    }
  },
  mounted() {
    this.paging();
    selectProjectList({}).then(data=>{
      this.projectList = data;
    })
  },
  methods: {
    del(id) {
      this.$confirm("确定删除编号为[" + id + "]的数据吗?", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.del({id: id}).then(() => {
          this.$message.success("删除成功!");
          this.paging();
          this.closeDialog();
        })
      });
    },
    open(item) {
      item = item instanceof PointerEvent ? null : item;
      this.openDialog(item, () => {
        if (!item) {
          this.form = {
              tables: null,
              name: null,
              remark: null,
              projectId: null,
              type: null,
              createTime: null,
              updateTime: null,
              version: null,
              createAdmin: null,
              updateAdmin: null,
          }
        }
      });
    },
    paging: function () {
      this.queryPage(data=>{});
    },
    query: function () {
      this.page.page = 1;
      this.paging();
    },
    reset: function () {
      let page = {
        page: 1,
        pageSize: 10,
        total: 0,
        clzObj:{
          tables: null,
          name: null,
          remark: null,
          projectId: null,
          type: null,
          version: null,
          createAdmin: null,
          updateAdmin: null,
        }
      }
      this.page = {...page};
      this.paging();
    },
    onSubmit() {
      this.save();
    },
    handleCurrentChange(page) {
      this.page.page = page;
      this.paging();
    }
  }
}
</script>
<style lang="scss">
</style>