<template>
  <div>
    <div class="query-box">
      <div class="query-items">
        <div class="query-item" style="width: 200px;">
          <div class="query-label">数据库：</div>
          <el-select v-model="page.clzObj.dbId" filterable placeholder="请选择数据库">
            <el-option
                v-for="item in dbList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="query-item">
          <div class="query-label">表名：</div>
          <el-input v-model="page.clzObj.name" placeholder="请输入表名" clearable/>
        </div>
        <div class="query-item">
          <div class="query-label">表注释：</div>
          <el-input v-model="page.clzObj.comment" placeholder="请输入表注释" clearable/>
        </div>
      </div>
      <div class="query-btns">
        <jf-btn icon="Refresh" text="重置" @click="$jfUtils.reset(this)"/>
        <jf-btn icon="Search" text="搜索" @click="$jfUtils.query(this)"/>
        <jf-btn icon="Plus" text="添加" @click="$jfUtils.openDialog(this)"/>
        <jf-btn icon="Refresh" text="同步" @click="sync"/>
        <jf-btn icon="Box" text="生成系统表" @click="createShow = true"/>
      </div>
    </div>
    <div class="main">
      <el-table :data="data" border style="width: 100%">
        <el-table-column prop="id" label="编号" width="55"/>
        <el-table-column label="所属项目名" width="120">
          <template #default="scope">{{ scope.row.project.name }}</template>
        </el-table-column>
        <el-table-column label="所属数据库" width="120">
          <template #default="scope">{{ scope.row.db.name }}</template>
        </el-table-column>
        <el-table-column prop="name" label="表名"/>
        <el-table-column prop="comment" label="表注释"/>
        <el-table-column label="操作" width="110">
          <template #default="scope">
            <jf-btn type="text" icon="Edit" @click="$jfUtils.openDialog(this,scope.row)"/>
            <jf-btn type="text" icon="Delete" @click="$jfUtils.del(this,scope.row.id,scope.row.name)"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <jf-pagination :page="page" @current-change="$jfUtils.handlePage($event,this)"/>
    <el-dialog title="生成系统表" v-model="createShow" width="85%">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="form-item-inline-box">
          <el-form-item label="数据库:">
            <el-select v-model="form.dbId" filterable placeholder="请选择数据库">
              <el-option
                  v-for="item in dbList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>

        </div>
        <span slot="footer" class="dialog-footer">
          <jf-btn type="red" text="关闭" @click="createShow = false"/>
          <jf-btn text="确定" @click="create"/>
        </span>
      </el-form>
    </el-dialog>
    <el-dialog title="数据库表" v-model="dialogVisible" width="85%">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="form-item-inline-box">
          <el-form-item label="数据库:">
            <el-select v-model="form.dbId" filterable placeholder="请选择数据库">
              <el-option
                  v-for="item in dbList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="表名:">
            <el-input v-model="form.name" placeholder="请输入表名" clearable/>
          </el-form-item>
        </div>
        <div class="form-item-inline-box">
          <el-form-item label="表注释:">
            <el-input v-model="form.comment" placeholder="请输入表注释" clearable/>
          </el-form-item>
          <el-form-item label="操作:">
            <jf-btn text="添加字段" @click="addField"/>
          </el-form-item>
        </div>
        <div style="height: 50vh;overflow-y: auto">
          <el-table :data="form.cols" border style="width: 100%">
            <el-table-column label="名" width="180">
              <template #default="scope">
                <el-input v-model="form.cols[scope.$index].name" placeholder="字段名" clearable/>
              </template>
            </el-table-column>
            <el-table-column label="注释">
              <template #default="scope">
                <el-input v-model="form.cols[scope.$index].comment" placeholder="字段注释" clearable/>
              </template>
            </el-table-column>
            <el-table-column label="字段类型" width="120">
              <template #default="scope">
                <el-select v-model="form.cols[scope.$index].dbType" placeholder="请选择" filterable @change="changeDbType($event,scope.$index)">
                  <el-option v-for="item in dbTypeList" :key="item" :label="item" :value="item"/>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="完整类型" width="140">
              <template #default="scope">
                <el-input v-model="form.cols[scope.$index].colType" placeholder="完整类型"/>
              </template>
            </el-table-column>
            <el-table-column label="主键" width="55">
              <template #default="scope">
                <el-checkbox v-model="form.cols[scope.$index].key" true-value="PRI" false-value="MUL"/>
              </template>
            </el-table-column>
            <el-table-column label="不是null" width="80">
              <template #default="scope">
                <el-checkbox v-model="form.cols[scope.$index].required" :true-value="1" :false-value="-1"/>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
              <template #default="scope">
                <jf-btn type="text" icon="Top" content="上移" @click="move(scope.$index,scope.$index-1)"/>
                <jf-btn type="text" icon="Bottom" content="下移" @click="move(scope.$index,scope.$index+1)"/>
                <jf-btn type="text" icon="Plus" content="向下插入"  @click="form.cols.splice(scope.$index+1,0,{})"/>
                <jf-btn type="text" icon="Minus" content="删除" @click="form.cols.splice(scope.$index,1)"/>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <jf-btn type="red" text="关闭" @click="dialogVisible = false"/>
          <jf-btn text="确定" @click="$jfUtils.onsubmit(this)"/>
        </span>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/pm/sys-table'
import {selectList as selectDbList} from '@/api/pm/sys-db'
import JfBtn from "@/components/jf/JfBtn.vue";
import JfPagination from "@/components/jf/JfPagination.vue";

export default {
  components: {JfPagination, JfBtn},
  data() {
    return {
      dbTypeList:[
          "varchar",
          "int",
          "bigint",
          "text",
          "datetime",
          "date",
          "time",
          "decimal",
          "tinyint",
          "smallint",
          "float",
          "double",
          "tinyblob",
          "blob",
          "mediumblob",
          "longblob",
          "tinytext",
          "mediumtext",
          "longtext",
          "json",
          "enum",
          "set",
          "char",
          "tinyint unsigned",
          "smallint unsigned",
          "int unsigned",
          "bigint unsigned",
          "decimal unsigned",
          "float unsigned",
          "double unsigned",
          "bit",
          "binary",
          "varbinary",
      ],
      form: {},
      page: {
        page: 1,
        pageSize: 10,
        total: 0,
        clzObj: {}
      },
      data: [],
      dialogVisible: false,
      api: api,
      dbList: [],
      createShow:false
    }
  },
  mounted() {
    this.$jfUtils.paging(this);
    selectDbList({}).then(data => {
      this.dbList = data;
    })
  },
  methods: {
    create(){

    },
    changeDbType(val,index){
      this.form.cols[index].colType = val;
    },
    addField(){
      if(this.form.cols){
        this.form.cols.push({});
      }else{
        this.form.cols = [{}]
      }
    },
    move(from, to) {
      if (from === to) {
        return;
      }
      if(from < 0 || to < 0 || from >= this.form.cols.length || to >= this.form.cols.length) {
        return
      }
      let item = this.form.cols[from];
      this.form.cols.splice(from, 1);
      this.form.cols.splice(to, 0, item);
    },
    sync() {
      api.sync({dbId: this.form.dbId}).then(() => {
        this.$message.success("同步成功!");
        this.$jfUtils.paging(this);
        this.syncShow = false;
      })
    }
  }
}
</script>
<style lang="scss">
</style>