<template>
<div>
  <div class="query-box">
    <div class="query-items">
          <div class="query-item">
            <div class="query-label">项目名称：</div>
              <el-input v-model="page.name" placeholder="请输入项目名称" clearable/>
          </div>
          <div class="query-item">
            <div class="query-label">项目标志：</div>
              <el-input v-model="page.value" placeholder="请输入项目标志" clearable/>
          </div>
          <div class="query-item">
            <div class="query-label">基础包名：</div>
              <el-input v-model="page.basePackage" placeholder="请输入基础包名" clearable/>
          </div>
          <div class="query-item">
            <div class="query-label">项目文件路径：</div>
              <el-input v-model="page.path" placeholder="请输入项目文件路径" clearable/>
          </div>
          <div class="query-item">
            <div class="query-label">状态：</div>
               <el-radio-group v-model="page.status">
                    <el-radio-button :label="1">开发中</el-radio-button>
                    <el-radio-button :label="2">正在启动</el-radio-button>
                    <el-radio-button :label="3">运行中</el-radio-button>
              </el-radio-group>
          </div>
          <div class="query-item">
            <div class="query-label">创建人：</div>
              <el-input v-model="page.createAdmin" type="number" placeholder="请输入创建人" clearable/>
          </div>
          <div class="query-item">
            <div class="query-label">更新人：</div>
              <el-input v-model="page.updateAdmin" type="number" placeholder="请输入更新人" clearable/>
          </div>
    </div>
    <div class="query-btns">
      <el-button type="primary" @click="query">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
      <el-button type="primary" @click="open">添加项目</el-button>
    </div>
  </div>
  <div class="main">
    <el-table :data="data" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="50"/>
          <el-table-column prop="name" label="项目名称"/>
          <el-table-column prop="value" label="项目标志"/>
          <el-table-column prop="basePackage" label="基础包名"/>
          <el-table-column prop="path" label="项目文件路径"/>
           <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status===1">开发中</el-tag>
              <el-tag type="success" v-else-if="scope.row.status===2">正在启动</el-tag>
              <el-tag type="success" v-else-if="scope.row.status===3">运行中</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createAdmin" label="创建人"/>
          <el-table-column prop="updateAdmin" label="更新人"/>
          <el-table-column prop="createTime" label="创建时间" width="160" :formatter="rowFormatDate"/>
          <el-table-column prop="updateTime" label="修改时间" width="160" :formatter="rowFormatDate"/>
          <el-table-column prop="version" label="乐观锁"/>
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
  <el-dialog :close-on-click-modal="false" title="项目" :visible.sync="dialogVisible" width="60%">
    <el-form ref="form" :model="form" label-width="160px">
    <div class="form-item-inline-box">
      <el-form-item label="项目名称:">
          <el-input v-model="form.name" placeholder="请输入项目名称" clearable/>
      </el-form-item>
      <el-form-item label="项目标志:">
          <el-input v-model="form.value" placeholder="请输入项目标志" clearable/>
      </el-form-item>
    </div>
    <div class="form-item-inline-box">
      <el-form-item label="基础包名:">
          <el-input v-model="form.basePackage" placeholder="请输入基础包名" clearable/>
      </el-form-item>
      <el-form-item label="项目文件路径:">
          <el-input v-model="form.path" placeholder="请输入项目文件路径" clearable/>
      </el-form-item>
    </div>
    <div class="form-item-inline-box">
      <el-form-item label="状态:">
           <el-radio-group v-model="form.status">
              <el-radio-button :label="1">开发中</el-radio-button>
            <el-radio-button :label="2">正在启动</el-radio-button>
            <el-radio-button :label="3">运行中</el-radio-button>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="创建人:">
          <el-input v-model="form.createAdmin" type="number" placeholder="请输入创建人" clearable/>
      </el-form-item>
    </div>
    <div class="form-item-inline-box">
      <el-form-item label="更新人:">
          <el-input v-model="form.updateAdmin" type="number" placeholder="请输入更新人" clearable/>
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
import * as api from '@/api/project/project'
export default {
  components: {},
  data() {
    return {
      form: {
        name: null,
        value: null,
        basePackage: null,
        path: null,
        status: null,
        createAdmin: null,
        updateAdmin: null,
        version: null,
      },
      page: {
        page: 1,
        pageSize: 10,
        total: 0,
              name: null,
              value: null,
              basePackage: null,
              path: null,
              status: null,
              createAdmin: null,
              updateAdmin: null,
              version: null,
      },
      data: [],
      dialogVisible: false,
      api: api,
    }
  },
  mounted() {
    this.paging();
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
              name: null,
              value: null,
              basePackage: null,
              path: null,
              status: null,
              createAdmin: null,
              updateAdmin: null,
              createTime: null,
              updateTime: null,
              version: null,
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
        name: null,
        value: null,
        basePackage: null,
        path: null,
        status: null,
        createAdmin: null,
        updateAdmin: null,
        version: null,
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