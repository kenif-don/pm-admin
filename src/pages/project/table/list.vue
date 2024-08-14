<template>
  <div>
    <div class="query-box">
      <div class="query-items">
        <div class="query-item">
          <div class="query-label">表名称：</div>
          <el-input v-model="page.clzObj.name" placeholder="请输入表名称" clearable/>
        </div>
        <div class="query-item">
          <div class="query-label">表注释：</div>
          <el-input v-model="page.clzObj.remark" placeholder="请输入表注释" clearable/>
        </div>
        <div class="query-item">
          <div class="query-label">所属数据库：</div>
          <el-select v-model="page.clzObj.databaseId" filterable placeholder="请选择所属数据库">
            <el-option
                v-for="item in databaseList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            >
            </el-option>
          </el-select>
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
      </div>
      <div class="query-btns">
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
        <el-button type="primary" @click="open">添加项目表</el-button>
      </div>
    </div>
    <div class="main">
      <el-table :data="data" border style="width: 100%">
        <el-table-column prop="id" label="编号" width="50"/>
        <el-table-column prop="name" label="表名称"/>
        <el-table-column prop="remark" label="表注释"/>
        <el-table-column label="所属数据库">
          <template slot-scope="scope">{{ scope.row.database.name }}</template>
        </el-table-column>
        <el-table-column label="所属项目">
          <template slot-scope="scope">{{ scope.row.project.name }}</template>
        </el-table-column>
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
    <el-dialog :close-on-click-modal="false" title="项目表" :visible.sync="dialogVisible" width="90%">
      <el-form ref="form" :model="form" label-width="120px">
        <div class="form-item-inline-box">
          <el-form-item label="表名称:">
            <el-input v-model="form.name" placeholder="请输入表名称" clearable/>
          </el-form-item>
          <el-form-item label="表注释:">
            <el-input v-model="form.remark" placeholder="请输入表注释" clearable/>
          </el-form-item>
        </div>
        <div class="form-item-inline-box">
          <el-form-item label="所属数据库:">
            <el-select v-model="form.databaseId" filterable placeholder="请选择所属数据库">
              <el-option
                  v-for="item in databaseList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              >
              </el-option>
            </el-select>
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
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="form.fields.push({name:null,comment:null,type:null,key_type:2,bind:null,def:'null',pk_table:null,pk_col:null,type2:2,form_type:1,form_value:null})"><i class="el-icon-plus"/></el-button>
          </div>
          <el-table :data="form.fields" style="width: 100%">
            <el-table-column label="字段名称" width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" placeholder="请输入字段名称" clearable/>
              </template>
            </el-table-column>
            <el-table-column label="字段注释">
              <template slot-scope="scope">
                <el-input v-model="scope.row.comment" placeholder="请输入字段注释" clearable/>
              </template>
            </el-table-column>
            <el-table-column label="字段类型" width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.type" placeholder="请输入字段类型" clearable/>
              </template>
            </el-table-column>
            <el-table-column label="键类型">
              <template slot-scope="scope">
                <el-input v-model="scope.row.key_type" placeholder="请选择键类型" clearable/>
              </template>
            </el-table-column>
            <el-table-column label="字段精度">
              <template slot-scope="scope">
                <el-input v-model="scope.row.bind" placeholder="请输入字段精度" clearable/>
              </template>
            </el-table-column>
            <el-table-column label="默认值">
              <template slot-scope="scope">
                <el-input v-model="scope.row.def" placeholder="请输入默认值" clearable/>
              </template>
            </el-table-column>
            <el-table-column label="是否主键">
              <template slot-scope="scope">
                <el-input v-model="scope.row.pk_table" placeholder="请输入是否主键" clearable/>
              </template>
            </el-table-column>
            <el-table-column label="是否自增">
              <template slot-scope="scope">
                <el-input v-model="scope.row.pk_col" placeholder="请输入是否自增" clearable/>
              </template>
            </el-table-column>
            <el-table-column label="是否唯一">
              <template slot-scope="scope">
                <el-input v-model="scope.row.type2" placeholder="请输入是否唯一" clearable/>
              </template>
            </el-table-column>
            <el-table-column label="是否注释">
              <template slot-scope="scope">
                <el-input v-model="scope.row.form_type" placeholder="请输入是否注释" clearable/>
              </template>
            </el-table-column>
            <el-table-column label="是否索引">
              <template slot-scope="scope">
                <el-input v-model="scope.row.form_value" placeholder="请输入是否索引" clearable/>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="50px">
              <template slot-scope="scope">
                <el-button type="text" @click="form.fields.splice(scope.$index, 1)"><i class="el-icon-delete-solid"/></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/project/table'
import {selectList as selectDatabaseList} from '@/api/project/database'
import {selectList as selectProjectList} from '@/api/project/project'
import {selectList as selectItemList} from '@/api/dic/dic-item'

export default {
  components: {},
  data() {
    return {
      form: {
        name: null,
        remark: null,
        databaseId: null,
        projectId: null,
        fields: [
          {
            name: 'id',
            comment: '主键',
            type: 'bigint',
            key_type: 2,
            bind: '["not null","unique"]',
            def: 'null',
            pk_table: null,
            pk_col: null,
            type2: 2,
            form_type: 1,
            form_value: null
          },
        ]
      },
      page: {
        page: 1,
        pageSize: 10,
        total: 0,
        clzObj: {
          name: null,
          remark: null,
          databaseId: null,
          projectId: null,
        }
      },
      data: [],
      dialogVisible: false,
      api: api,
      databaseList: [],
      projectList: [],
    }
  },
  mounted() {
    this.paging();
    selectDatabaseList({}).then(data => {
      this.databaseList = data;
    })
    selectProjectList({}).then(data => {
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
            name: null,
            remark: null,
            databaseId: null,
            projectId: null,
            fields: [
              {
                name: 'id',
                comment: '主键',
                type: 'bigint',
                key_type: 2,
                bind: '["not null","unique"]',
                def: 'null',
                pk_table: null,
                pk_col: null,
                type2: 2,
                form_type: 1,
                form_value: null
              },
            ]
          }
        }
      });
    },
    paging: function () {
      this.queryPage(data => {
      });
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
        clzObj: {
          name: null,
          remark: null,
          databaseId: null,
          projectId: null,
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
<style lang="scss" scoped>
.box-card{
  ::v-deep .el-card__body{
    padding: 0;
  }
}
</style>