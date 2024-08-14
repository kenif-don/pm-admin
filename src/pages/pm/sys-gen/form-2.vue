<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <div class="form-item-inline-box">
        <el-form-item label="表类型:">
          <div class="flex-center">
            <el-radio-group v-model="form.type" @change="changeType">
              <el-radio-button :value="1">子表</el-radio-button>
              <el-radio-button :value="2">树形结构表</el-radio-button>
              <el-radio-button :value="3">父表</el-radio-button>
            </el-radio-group>
            <el-input class="ml12" style="width: 160px" v-if="form.type === 2" v-model="form.treeKey" placeholder="树形关联属性,如parent_id" clearable/>
          </div>
        </el-form-item>
        <el-form-item label="基础api:">
          <el-input v-model="form.fnVal" placeholder="接口前缀" clearable/>
        </el-form-item>
      </div>
      <div class="form-item-inline-box">
        <el-form-item label="接口列表:">
          <el-checkbox-group v-model="uris" @change="changeApi">
            <div v-for="item in apiData" :key="item.id">
              <el-checkbox :value="item.value">{{item.name}}({{item.value}})-{{item.remark}}</el-checkbox>
            </div>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="日志记录:">
          <el-checkbox-group v-model="logs">
            <div v-for="item in selectUris" :key="item.id">
              <el-checkbox :value="item.value">{{item.name}}</el-checkbox>
            </div>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <div class="form-item-inline-box">
        <el-form-item label="删除选项:">
          <el-switch v-model="form.del" inactive-text="仅删除自己" active-text="递归删除自己及下级" :inactive-value="1" :active-value="2"/>
        </el-form-item>
      </div>
      <el-form-item label="级联删除:">
        <div class="w100">
          <jf-btn text="添加级联删除" @click="linkDels.push({genLinkId:null,name:null,recursive:1})"/>
          <div class="flex w75 mt12" v-for="(link,index) in linkDels" :key="link.genLinkId">
            <el-select class="w33" v-model="link.genLinkId" placeholder="请选择生成器" clearable filterable @change="changeGen($event,index)">
              <el-option v-for="item in gens" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
            <el-select class="w33 ml12" v-model="link.name" placeholder="请选择关联列" clearable filterable>
              <el-option v-for="item in genItems[index]" :key="item.id" :label="item.name" :value="item.name"/>
            </el-select>
            <div class="w10 ml12 nowrap">递归删除下级：</div>
            <el-switch v-model="link.recursive" inactive-text="否" active-text="是" :inactive-value="-1" :active-value="1"/>
            <jf-btn class="ml12" icon="Delete" @click="linkDels.splice(index,1)"/>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <span class="dialog-footer">
          <jf-btn type="red" text="返回" @click="$jfUtils.back(this)"/>
          <jf-btn text="确定" @click="onsubmit"/>
      </span>
  </div>
</template>
<script>
import * as api from '@/api/pm/sys-gen';
import {selectList as selectApis} from '@/api/pm/sys-gen-apis';
import JfBtn from "@/components/jf/JfBtn.vue";
import {selectList as selectGenItems} from "@/api/pm/sys-gen-item";

export default {
  name: 'form-2',
  components: {JfBtn},
  props:['genId',],
  data() {
    return {
      form:{},
      api,
      apiData:[],
      uris:[],
      selectUris:[],
      logs:[],
      gens:[],
      linkDels:[],
      genItems:[]
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.init();
    })
  },
  methods: {
    onsubmit() {
      for(let item of this.selectUris) {
        if(this.logs.includes(item.value)) {
          item.hasLog = 1
        }
      }
      this.form.apis = this.selectUris
      this.form.linkDels = this.linkDels
      this.api.edit(this.form).then(() => {
        this.$jfUtils.msg("保存成功!")
      })
    },
    changeApi(ids) {
      this.selectUris = this.apiData.filter(item=>ids.includes(item.value));
      for(let item of this.selectUris){
        item.hasLog = -1;
      }
    },
    changeType(type) {
      switch (type) {
        case 1:
          //寻找add edit del
          let type1Arr = ['/add','/edit','/del','/paging'];
          this.uris = this.apiData.filter(item=>type1Arr.includes(item.value)).map(item=>item.value);
          break;
        case 2:
          let type2Arr = ['/add','/edit','/del','/tree'];
          this.form.treeKey = 'parent_id';
          this.uris = this.apiData.filter(item=>type2Arr.includes(item.value)).map(item=>item.value);
          break;
        case 3:
          let type3Arr = ['/add','/edit','/del','/selectList','/paging'];
          this.uris = this.apiData.filter(item=>type3Arr.includes(item.value)).map(item=>item.value);
          break;
      }
      this.changeApi(this.uris);
    },
    changeGen(genId,index){
      selectGenItems({genId: genId}).then(data => {
        this.genItems[index] = data
      })
    },
    init() {
      api.selectOne({id:this.genId}).then(data=>{
        this.form = data
        this.linkDels = data.linkDels
        api.selectList({projectId:this.form.projectId}).then(data=>{
          this.gens = data
          for(let index in this.linkDels){
            this.changeGen(this.linkDels[index].genLinkId,index)
          }
        })
        selectApis().then(apis => {
          this.apiData = apis
          if(!this.form.id)return
          let data = this.form.apis
          //获取已存在的接口--这里可能有一些额外的接口(自定义的)
          if(!data || data.length === 0)return
          this.apiData = data
          this.selectUris = data
          //组装关联的接口
          this.uris = this.apiData.map(item=>item.value)
          //组装勾选了日志的接口
          this.logs = data.filter(item=>item.hasLog === 1).map(item=>item.value)
          //如果有些系统接口 不在生成器关联的接口中 要添加进去
          for(let apiItem of apis) {
            if(this.$jfUtils.indexOf(data,"value",apiItem.value) === -1) {
              this.apiData = [...this.apiData,apiItem]
            }
          }
        })
      })
    },
  }
}
</script>
<style scoped lang="scss">

</style>