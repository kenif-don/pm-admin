<template>
<div>
  <div class="query-box">
    <div class="query-items">
          <div class="query-item">
            <div class="query-label">名称：</div>
              <el-input v-model="page.clzObj.name" placeholder="请输入名称" clearable/>
          </div>
          <div class="query-item">
            <div class="query-label">注释：</div>
              <el-input v-model="page.clzObj.comment" placeholder="请输入注释" clearable/>
          </div>
          <div class="query-item">
            <div class="query-label">类型：</div>
              <el-input v-model="page.clzObj.type" placeholder="请输入类型" clearable/>
          </div>
          <div class="query-item">
            <div class="query-label">键类型：</div>
               <el-radio-group v-model="page.clzObj.keyType">
                    <el-radio-button :label="1">普通</el-radio-button>
                    <el-radio-button :label="2">主键</el-radio-button>
                    <el-radio-button :label="3">外键(逻辑外键,数据库不会生成物理外键)</el-radio-button>
              </el-radio-group>
          </div>
          <div class="query-item">
            <div class="query-label">约束：</div>
              <el-input v-model="page.clzObj.bind" placeholder="请输入约束" clearable/>
          </div>
          <div class="query-item">
            <div class="query-label">默认值：</div>
              <el-input v-model="page.clzObj.default" placeholder="请输入默认值" clearable/>
          </div>
          <div class="query-item">
            <div class="query-label">外键关联表：</div>
              <el-input v-model="page.clzObj.pkTable" placeholder="请输入外键关联表" clearable/>
          </div>
          <div class="query-item">
            <div class="query-label">外键管理字段名：</div>
              <el-input v-model="page.clzObj.pkCol" placeholder="请输入外键管理字段名" clearable/>
          </div>
          <div class="query-item">
            <div class="query-label">类型：</div>
               <el-radio-group v-model="page.clzObj.type2">
                    <el-radio-button :label="1">自定义字段</el-radio-button>
                    <el-radio-button :label="2">系统字段</el-radio-button>
              </el-radio-group>
          </div>
          <div class="query-item">
            <div class="query-label">表单类型：</div>
              <el-input v-model="page.clzObj.formType" placeholder="请输入表单类型" clearable/>
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
      <el-button type="primary" @click="open">添加表字段</el-button>
    </div>
  </div>
  <div class="main">
    <el-table :data="data" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="50"/>
          <el-table-column prop="name" label="名称"/>
          <el-table-column prop="comment" label="注释"/>
          <el-table-column prop="type" label="类型"/>
           <el-table-column label="键类型">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.keyType===1">普通</el-tag>
              <el-tag type="success" v-else-if="scope.row.keyType===2">主键</el-tag>
              <el-tag type="success" v-else-if="scope.row.keyType===3">外键(逻辑外键,数据库不会生成物理外键)</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="bind" label="约束"/>
          <el-table-column prop="default" label="默认值"/>
          <el-table-column prop="pkTable" label="外键关联表"/>
          <el-table-column prop="pkCol" label="外键管理字段名"/>
           <el-table-column label="类型">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.type2===1">自定义字段</el-tag>
              <el-tag type="success" v-else-if="scope.row.type2===2">系统字段</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="formType" label="表单类型"/>
          <el-table-column prop="createTime" label="创建时间" width="160" :formatter="rowFormatDate"/>
          <el-table-column prop="updateTime" label="更新时间" width="160" :formatter="rowFormatDate"/>
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
  <el-dialog :close-on-click-modal="false" title="表字段" :visible.sync="dialogVisible" width="60%">
    <el-form ref="form" :model="form" label-width="160px">
    <div class="form-item-inline-box">
      <el-form-item label="名称:">
          <el-input v-model="form.name" placeholder="请输入名称" clearable/>
      </el-form-item>
      <el-form-item label="注释:">
          <el-input v-model="form.comment" placeholder="请输入注释" clearable/>
      </el-form-item>
    </div>
    <div class="form-item-inline-box">
      <el-form-item label="类型:">
          <el-input v-model="form.type" placeholder="请输入类型" clearable/>
      </el-form-item>
      <el-form-item label="键类型:">
           <el-radio-group v-model="form.keyType">
              <el-radio-button :label="1">普通</el-radio-button>
            <el-radio-button :label="2">主键</el-radio-button>
            <el-radio-button :label="3">外键(逻辑外键,数据库不会生成物理外键)</el-radio-button>
          </el-radio-group>
      </el-form-item>
    </div>
    <div class="form-item-inline-box">
      <el-form-item label="约束:">
          <el-input v-model="form.bind" placeholder="请输入约束" clearable/>
      </el-form-item>
      <el-form-item label="默认值:">
          <el-input v-model="form.default" placeholder="请输入默认值" clearable/>
      </el-form-item>
    </div>
    <div class="form-item-inline-box">
      <el-form-item label="外键关联表:">
          <el-input v-model="form.pkTable" placeholder="请输入外键关联表" clearable/>
      </el-form-item>
      <el-form-item label="外键管理字段名:">
          <el-input v-model="form.pkCol" placeholder="请输入外键管理字段名" clearable/>
      </el-form-item>
    </div>
    <div class="form-item-inline-box">
      <el-form-item label="类型:">
           <el-radio-group v-model="form.type2">
              <el-radio-button :label="1">自定义字段</el-radio-button>
            <el-radio-button :label="2">系统字段</el-radio-button>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="表单类型:">
          <el-input v-model="form.formType" placeholder="请输入表单类型" clearable/>
      </el-form-item>
    </div>
    <div class="form-item-inline-box">
      <el-form-item label="创建人:">
          <el-input v-model="form.createAdmin" placeholder="请输入创建人" clearable/>
      </el-form-item>
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
import * as api from '@/api/field'
export default {
  components: {},
  data() {
    return {
      form: {
        name: null,
        comment: null,
        type: null,
        keyType: null,
        bind: null,
        default: null,
        pkTable: null,
        pkCol: null,
        type2: null,
        formType: null,
        version: null,
        createAdmin: null,
        updateAdmin: null,
      },
      page: {
        page: 1,
        pageSize: 10,
        total: 0,
        clzObj:{
          name: null,
          comment: null,
          type: null,
          keyType: null,
          bind: null,
          default: null,
          pkTable: null,
          pkCol: null,
          type2: null,
          formType: null,
          version: null,
          createAdmin: null,
          updateAdmin: null,
        }
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
              comment: null,
              type: null,
              keyType: null,
              bind: null,
              default: null,
              pkTable: null,
              pkCol: null,
              type2: null,
              formType: null,
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
          name: null,
          comment: null,
          type: null,
          keyType: null,
          bind: null,
          default: null,
          pkTable: null,
          pkCol: null,
          type2: null,
          formType: null,
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