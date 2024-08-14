<template>
  <div>
    <h3 class="flex-center">{{gen.moduleName}}-{{gen.fnName}}代码生成</h3>
    <el-table :data="genList" border style="width: 100%;" class="mt12">
      <el-table-column label="列名" width="150">
        <template #default="scope">
          <span>{{genList[scope.$index].name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="label">
        <template #default="scope">
          <el-input v-model="genList[scope.$index].label" clearable/>
        </template>
      </el-table-column>
      <el-table-column label="显示类型" width="180" v-if="gen.hasList === 1">
        <template #default="scope">
          <el-select v-model="genList[scope.$index].showType" placeholder="空则不显示" clearable>
            <el-option v-for="item in showTypes" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="查询类型" width="180" v-if="gen.hasList === 1">
        <template #default="scope">
          <el-select v-model="genList[scope.$index].queryType" placeholder="空则不作为查询条件" clearable>
            <el-option v-for="item in queryTypes" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="表单类型">
        <template #default="scope">
          <el-select v-model="genList[scope.$index].formType" placeholder="空则不生成表单项" clearable>
            <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="类型扩展" width="200">
        <template #default="scope">
          <el-input v-if="genList[scope.$index].showType === 6 || genList[scope.$index].queryType === 6 || genList[scope.$index].formType === 17" v-model="genList[scope.$index].ext" placeholder="字典分类标识" clearable/>
          <el-select filterable clearable v-if="genList[scope.$index].showType === 7 || genList[scope.$index].queryType === 7 || genList[scope.$index].formType === 18" v-model="genList[scope.$index].ext" placeholder="选择已存在的生成器">
            <el-option
                v-for="item in gens"
                :key="item.id"
                :label="item.name"
                :value="item.id+''">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="验证类型">
        <template #default="scope">
          <div class="flex-center">
          <el-select v-model="genList[scope.$index].validate" placeholder="空则不验证" clearable>
            <el-option v-for="item in validates" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
          <el-input v-if="genList[scope.$index].validate" v-model="genList[scope.$index].validateMsg" placeholder="验证失败消息" clearable/>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="排序" width="70">
        <template #default="scope">
          <el-input v-model="genList[scope.$index].sort" clearable/>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer mt12">
      <jf-btn type="red" text="返回" @click="$router.back()"/>
      <jf-btn text="同步表字段" @click="sync"/>
      <jf-btn text="预览" @click="preview"/>
      <jf-btn text="生成到项目" @click="create(1)"/>
      <jf-btn text="生成后台文件" @click="create(2)"/>
      <jf-btn text="生成前端文件" @click="create(3)"/>
      <jf-btn text="生成后台Base文件" @click="create(4)"/>
    </span>
    <el-dialog v-model="previewShow" title="预览" width="85%">
      <el-tabs v-model="tabIndex">
        <el-tab-pane :name="index" :label="item.name" v-for="(item,index) in codes">
          <highlightjs autodetect :code="item.code" style="height: 60vh;overflow-y: auto"/>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer mt12">
        <jf-btn type="red" text="关闭" @click="previewShow = false"/>
        <jf-btn text="仅生成当前文件" @click="createOne"/>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import JfBtn from "@/components/jf/JfBtn.vue";
import {selectList,save,preview,sync} from '@/api/pm/sys-gen-item'
import * as api from "@/api/pm/sys-gen";
export default {
  components: {JfBtn},
  props:['genId',],
  data() {
    return {
      gen:{},
      genList: [],
      showTypes: [
        {label: '文本', value: 1},
        {label: '年月日', value: 2},
        {label: '年月日时分秒', value: 3},
        {label: '时分秒', value: 4},
        {label: '图片', value: 5},
        {label: '字典', value: 6},
        {label: '外键select', value: 7},
        {label: '多行文本', value: 8},
      ],
      queryTypes: [
        {label: '文本模糊查询', value: 1},
        {label: '文本等值查询', value: 2},
        {label: '年月日等值查询', value: 3},
        {label: '年月日范围查询', value: 4},
        {label: '时间范围查询', value: 5},
        {label: '字典', value: 6},
        {label: '外键select', value: 7},
      ],
      types: [
        {label: '文本', value: 1},
        {label: '数字', value: 2},
        {label: '密码', value: 3},
        {label: '多行文本', value: 4},
        {label: '年月日', value: 5},
        {label: '年月日时分秒', value: 6},
        {label: '时分秒', value: 7},
        {label: '省', value: 8},
        {label: '省市', value: 9},
        {label: '省市区', value: 10},
        {label: '树-单选', value: 11},
        {label: '树-多选', value: 12},
        {label: '单图片', value: 13},
        {label: '多图片', value: 14},
        {label: '单文件', value: 15},
        {label: '多文件', value: 16},
        {label: '字典', value: 17},
        {label: '外键select', value: 18},
        {label: '动态json对象', value: 19},
        {label: '动态json数组', value: 20},
      ],
      validates:[
        {label:"非空字符串",value:"isNotNullOrEmpty"},
        {label:"空字符串",value:"isNullOrEmpty"},
        {label:"非空",value:"isNotNull"},
        {label:"是空",value:"isNull"},
        {label:"大于0",value:"isGtZero"},
        {label:"链接",value:"isUrl"},
        {label:"邮箱",value:"isEmail"},
        {label:"数字",value:"isNumber"},
        {label:"手机",value:"isPhone"},
        {label:"身份证",value:"isIdCard"},
        {label:"车牌号",value:"isCarNum"},
      ],
      previewShow:false,
      codes:null,
      gens:[],
      tabIndex:0
    }
  }
  ,
  created() {
    this.$nextTick(()=>{
      this.init();
    })
  },
  methods: {
    init() {
      api.selectOne({id: this.genId}).then(data => {
        this.gen = data;
      })
      selectList({genId: this.genId}).then(data => {
        this.genList = data
      })
      api.selectList().then(data=>{
        this.gens = data
      })
    },
    preview(){
      save(this.genList).then(res=>{
        preview({genId: this.genId}).then(data=>{
          this.previewShow = true
          this.codes = data;
        })
      })
    },
    createOne(){
      this.$jfUtils.config('危险操作，是否继续?',()=>{
        this.$jfUtils.config('是否生成当前文件?如果存在源文件会被覆盖',()=>{
          api.createOne({id: this.genId,index:this.tabIndex}).then(res=>{
            this.$message.success('生成成功')
          })
        })
      })
    },
    create(createType){
      this.$jfUtils.config('危险操作，是否继续?',()=>{
        this.$jfUtils.config('是否生成所有文件?如果存在源文件会被覆盖',()=>{
          save(this.genList).then(res=>{
            api.create({id: this.genId,createType:createType}).then(res=>{
              this.$message.success('生成成功')
              this.$router.back()
            })
          })
        })
      })
    },
    sync(){
      sync({genId: this.genId}).then(data=>{
        this.$message.success('同步成功')
        this.genList = data
      })
    }
  }
}

</script>
<style scoped lang="scss">
</style>