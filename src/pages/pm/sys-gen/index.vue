<template>
  <div>
    <div class="query-box">
      <div class="query-items">
        <div class="query-item">
          <div class="query-label">代码名称：</div>
          <el-input v-model="page.clzObj.name" placeholder="请输入分类名称" clearable/>
        </div>
      </div>
      <div class="query-btns">
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
        <el-button type="primary" @click="open">添加</el-button>
      </div>
    </div>
    <div class="main">
      <el-table :data="data" border style="width: 100%">
        <el-table-column prop="id" label="编号" width="50"/>
        <el-table-column prop="name" label="代码名称"/>
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
    <el-dialog :close-on-click-modal="false" title="界面设计" :visible.sync="dialogVisible" fullscreen>
      <dynamic-form @save="saveCode" :rules="form.rules" height="calc(100vh - 150px)"></dynamic-form>
    </el-dialog>
    <el-dialog width="85%" title="代码" :visible.sync="codeViewShow">
      <div slot="title" style="display: flex;justify-content: space-between;align-items: center">
        <div>代码</div>
        <div style="display: flex;justify-content: space-between;align-items: center">
          <el-button type="primary" size="mini" @click="onSubmit">确认保存</el-button>
          <el-button type="primary" size="mini" @click="codeViewShow = false">关闭</el-button>
        </div>
      </div>
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-form>
      </div>
      <vue-code-highlight language="JavaScript" style="width: 86%">
        {{content }}
      </vue-code-highlight>
    </el-dialog>
  </div>
</template>

<script>
import dynamicForm from "../../../components/dynamic-form/index.vue";
import "vue-code-highlight/themes/prism-tomorrow.css"
import "vue-code-highlight/themes/window.css";
import {component as VueCodeHighlight} from 'vue-code-highlight'
import * as api from '../../../api/generator'
export default {
  components: {dynamicForm,VueCodeHighlight},
  data() {
    return {
      dialogVisible: false,
      form: {
        name: null,
        rules: null,
      },
      page: {
        clzObj: {
          name: ''
        },
        page: 1,
        pageSize: 10
      },
      data: [],
      api,
      codeViewShow:false,
      content:null
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
            rules: null,
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
        name: null,
        value: null,
      }
      this.page = {...page};
      this.paging();
    },
    onSubmit() {
      this.form.rules = JSON.stringify(this.form.rules);
      this.save(()=>{
        this.codeViewShow = false;
        this.paging()
      });

    },
    handleCurrentChange(page) {
      this.page.page = page;
      this.paging();
    },
    saveCode(rules,data) {
      this.content = data;
      this.codeViewShow = true;
      this.dialogVisible = false;
      this.form.rules = rules;
    }
  }
}
</script>

<style lang="sass">

</style>