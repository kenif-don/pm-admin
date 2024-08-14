<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <div class="form-item-inline-box">
        <el-form-item label="所属项目:">
          <el-select v-model="form.projectId" filterable placeholder="请选择项目" @change="changeProject"
                     :disabled="!!form.id">
            <el-option
                v-for="item in projectList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据库:">
          <el-select v-model="form.dbId" filterable placeholder="请选择数据库" @change="changeDb" :disabled="!!form.id">
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
      <div class="form-item-inline-box">
        <el-form-item label="数据库表:">
          <el-select v-model="form.name" filterable placeholder="请选择表" :disabled="!!form.id" @change="changeTable">
            <el-option
                v-for="item in tableList"
                :key="item.name"
                :label="item.name"
                :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="表说明:">
          <el-input v-model="form.comment" placeholder="请输入表注释"/>
        </el-form-item>
      </div>
      <div class="form-item-inline-box">
        <el-form-item label="列分割符:">
          <el-input v-model="form.separator" placeholder="请输入列的分割符，如'_'"/>
        </el-form-item>
        <el-form-item label="类名:">
          <el-input v-model="form.clz" placeholder="请输入类名,驼峰命名法"/>
        </el-form-item>
      </div>
      <div class="form-item-inline-box">
        <el-form-item label="模块名称:">
          <el-input v-model="form.moduleName" placeholder="请输入模块名称,有值会创建菜单作为父级"/>
        </el-form-item>
        <el-form-item label="功能名称:">
          <el-input v-model="form.fnName" placeholder="请输入功能名称"/>
        </el-form-item>
      </div>
      <div class="form-item-inline-box">
        <el-form-item label="模块标识:">
          <el-input v-model="form.moduleVal" placeholder="请输入模块名称，有值接口会包含模块-功能"/>
        </el-form-item>
        <el-form-item label="功能标识:">
          <el-input v-model="form.fnVal" placeholder="请输入功能名称"/>
        </el-form-item>
      </div>
      <div class="form-item-inline-box">
        <el-form-item label="显示列:">
          <el-input v-model="form.showKey" placeholder="请输入显示列,如:name"/>
        </el-form-item>
      </div>
    </el-form>
    <span class="dialog-footer">
          <jf-btn type="red" text="返回" @click="$jfUtils.back(this)"/>
          <jf-btn text="确定" @click="onsubmit"/>
      </span>
  </div>
</template>
<script>
import * as api from '@/api/pm/sys-gen'
import {selectList as selectProjectList} from '@/api/pm/sys-project'
import {selectList as selectDbList} from '@/api/pm/sys-db'
import {getTables} from "@/api/pm/sys-table";
import JfBtn from "@/components/jf/JfBtn.vue";

export default {
  name: 'form-1',
  components: {JfBtn},
  props:['genId',],
  data() {
    return {
      form:{},
      projectList: [],
      dbList: [],
      tableList: [],
      api,
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.init();
    })
  },
  methods: {
    onsubmit() {
      if (this.form.id) {
        this.api.edit(this.form).then(() => {
          this.$jfUtils.msg("保存成功!")
        })
        return;
      }
      this.api.add(this.form).then(id => {
        this.$jfUtils.msg("保存成功!")
        this.$emit('onsubmit', id)
      })
    },
    changeTable(name){
      let tables = this.tableList.filter(item=>item.name === name)
      if(tables && tables.length > 0){
        this.form.moduleName = tables[0].comment
        this.form.fnName = tables[0].comment
        this.form.comment = tables[0].comment
        //自动设置基础接口 和 前端文件夹
        if(!this.form.fnVal){
          this.form.fnVal = tables[0].name.replaceAll("_","-")
        }
        this.form.separator = "_"
        api.getClassName({name:name}).then(data => {
          this.form.clz = data
        })
      }
    },
    changeProject() {
      selectDbList({projectId: this.form.projectId}).then(data => {
        this.dbList = data;
      })
    },
    changeDb() {
      getTables({dbId: this.form.dbId}).then(data => {
        this.tableList = data;
      })
    },
    init() {
      if(this.genId){
        api.selectOne({id:this.genId}).then(data=>{
          this.form = data
        })
      }
      selectProjectList().then(data => {
        this.projectList = data
        this.$forceUpdate()
      })
      selectDbList({}).then(data => {
        this.dbList = data
        this.$forceUpdate()
      })
    },
  }
}
</script>
<style scoped lang="scss">

</style>