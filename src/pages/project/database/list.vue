<template>
  <div>
    <div class="query-box">
      <div class="query-items">
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
          <div class="query-label">数据库名称：</div>
          <el-input v-model="page.clzObj.name" placeholder="请输入数据库名称" clearable/>
        </div>
        <div class="query-item">
          <div class="query-label">数据库所在IP：</div>
          <el-input v-model="page.clzObj.ip" placeholder="请输入数据库所在IP" clearable/>
        </div>
        <div class="query-item">
          <div class="query-label">数据库账号：</div>
          <el-input v-model="page.clzObj.username" placeholder="请输入数据库账号" clearable/>
        </div>
        <div class="query-item">
          <div class="query-label">数据库密码：</div>
          <el-input v-model="page.clzObj.password" placeholder="请输入数据库密码" clearable/>
        </div>
        <div class="query-item">
          <div class="query-label">状态：</div>
          <el-radio-group v-model="page.clzObj.status">
            <el-radio-button :label="1">未创建</el-radio-button>
            <el-radio-button :label="2">已创建</el-radio-button>
          </el-radio-group>
        </div>
        <div class="query-item">
          <div class="query-label">编码：</div>
          <el-input v-model="page.clzObj.charset" placeholder="请输入编码" clearable/>
        </div>
        <div class="query-item">
          <div class="query-label">排序规则：</div>
          <el-input v-model="page.clzObj.sortRule" placeholder="请输入排序规则" clearable/>
        </div>
      </div>
      <div class="query-btns">
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
        <el-button type="primary" @click="open">添加数据库</el-button>
      </div>
    </div>
    <div class="main">
      <el-table :data="data" border style="width: 100%">
        <el-table-column prop="id" label="编号" width="50"/>
        <el-table-column label="所属项目">
          <template slot-scope="scope">{{ scope.row.project.name }}</template>
        </el-table-column>
        <el-table-column prop="name" label="数据库名称"/>
        <el-table-column prop="ip" label="数据库所在IP"/>
        <el-table-column prop="username" label="数据库账号"/>
        <el-table-column prop="password" label="数据库密码"/>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===1">未创建</el-tag>
            <el-tag type="success" v-else-if="scope.row.status===2">已创建</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="charset" label="编码"/>
        <el-table-column prop="sortRule" label="排序规则"/>
        <el-table-column prop="createTime" label="创建时间" width="160" :formatter="rowFormatDate"/>
        <el-table-column prop="updateTime" label="修改时间" width="160" :formatter="rowFormatDate"/>
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
    <el-dialog :close-on-click-modal="false" title="数据库" :visible.sync="dialogVisible" width="60%">
      <el-form ref="form" :model="form" label-width="120px">
        <div class="form-item-inline-box">
          <el-form-item label="所属项目:">
            <el-select v-model="form.projectId" filterable placeholder="请选择所属项目" @change="projectChange">
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
          <el-form-item label="数据库名称:">
            <el-input v-model="form.name" placeholder="请输入数据库名称" clearable/>
          </el-form-item>
          <el-form-item label="数据库所在IP:">
            <el-input v-model="form.ip" placeholder="请输入数据库所在IP" clearable/>
          </el-form-item>
        </div>
        <div class="form-item-inline-box">
          <el-form-item label="数据库账号:">
            <el-input v-model="form.username" placeholder="请输入数据库账号" clearable/>
          </el-form-item>
          <el-form-item label="数据库密码:">
            <el-input v-model="form.password" placeholder="请输入数据库密码" clearable/>
          </el-form-item>
        </div>
        <div class="form-item-inline-box">
          <el-form-item label="编码:">
            <el-select v-model="form.charset" filterable placeholder="请选择编码">
              <el-option
                  v-for="item in dicItemCodes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序规则:">
            <el-select v-model="form.sortRule" filterable placeholder="请选择排序规则">
              <el-option
                  v-for="item in dicItemSortRules"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value"
              >
              </el-option>
            </el-select>
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
import * as api from '@/api/project/database'
import {selectList as selectProjectList} from '@/api/project/project'
import {selectList as selectDicList} from '@/api/dic/dic-item'

export default {
  components: {},
  data() {
    return {
      form: {
        projectId: null,
        name: null,
        ip: null,
        username: null,
        password: null,
        status: null,
        charset: null,
        sortRule: null,
      },
      page: {
        page: 1,
        pageSize: 10,
        total: 0,
        clzObj:{
          projectId: null,
          name: null,
          ip: null,
          username: null,
          password: null,
          status: null,
          charset: null,
          sortRule: null,
        }
      },
      data: [],
      dialogVisible: false,
      api: api,
      projectList: [],
      dicItemCodes: [],
      dicItemSortRules: [],
    }
  },
  mounted() {
    this.paging();
    selectProjectList({}).then(data => {
      this.projectList = data;
    })
    selectDicList({value: 'DATABASE_CODE'}).then(data => {
      this.dicItemCodes = data;
    })
    selectDicList({value: 'DATABASE_SORT_RULE'}).then(data => {
      this.dicItemSortRules = data;
    })
  },
  methods: {
    projectChange(e){
      this.form.name = this.findObjByArr(this.projectList, 'id', e).value
    },
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
            projectId: null,
            name: null,
            ip: null,
            username: null,
            password: null,
            status: null,
            charset: null,
            sortRule: null,
            createTime: null,
            updateTime: null,
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
        clzObj:{
          projectId: null,
          name: null,
          ip: null,
          username: null,
          password: null,
          status: null,
          charset: null,
          sortRule: null,
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