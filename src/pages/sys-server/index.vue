<template>
<div>
  <el-card class="item" shadow="none">
    <template #header>
      <h3>软件安装</h3>
    </template>
    <el-tabs type="border-card">
      <el-tab-pane label="未安装">
        <el-table :data="noInstalls">
          <el-table-column prop="name" label="名称"/>
          <el-table-column label="操作" fixed="right" width="150">
            <template #default="scope">
              <jf-btn type="text" icon="Plus" @click="openInstall(scope.row.id)"/>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已安装">
        <el-table :data="installs">
          <el-table-column prop="name" label="名称"/>
          <el-table-column label="操作" fixed="right" width="150">
            <template #default="scope">
              <jf-btn type="text" icon="Delete" @click="unInstall"/>
              <jf-btn type="text" icon="Setting" @click="openSetting"/>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
  <el-dialog title="安装软件" v-model="releaseDialog" width="85%">
    <el-form>
      <el-form-item label="软件版本:">
        <el-select v-model="form.middlewareReleaseId" placeholder="请选择软件版本">
          <el-option v-for="item in releases" :key="item.id" :label="item.release" :value="item.id"/>
        </el-select>
      </el-form-item>
      <div class="flex-center"><jf-btn text="安装" @click="install"/></div>
    </el-form>
  </el-dialog>
  <el-dialog title="安装软件终端" v-model="installDialog" width="85%">
    <div class="command">
      <div v-for="item in commands" :key="item">{{item}}</div>
    </div>
    <div class="flex-between mt12">
      <el-input v-model="cmd" placeholder="键入命令" @keyup.enter.native="sendCmd"/>
      <jf-btn text="发送" @click="sendCmd" style="margin-left: 12px"/>
    </div>
  </el-dialog>
</div>
</template>

<script>
import * as api from '@/api/sys-server';
import {selectList as selectMidds} from '@/api/sys-middleware'
import {selectList as selectInstalls,add as install,enterCmd} from '@/api/sys-server-middleware'
import {selectList as selectMiddReleases} from '@/api/sys-middleware-release'
import JfBtn from "@/components/jf/JfBtn.vue";
export default {
  components: {JfBtn,},
  data() {
    return {
      installs:[],
      noInstalls:[],
      releases:[],
      releaseDialog:false,
      form:{
        serverId:null,
        middlewareId:null,
        middlewareReleaseId:null,
      },
      installDialog:false,
      commands:[],
      cmd:null,
      api
    }
  },
  mounted() {
    this.form.serverId = this.$route.query.id
    selectMidds().then(data=>{
      selectInstalls({serverId:this.form.serverId,state:3}).then(installs=>{
        for(let midd of data){
          if(this.$jfUtils.indexOf(installs,"middlewareId",midd.id) !== -1){
            this.installs.push(midd)
          }else{
            this.noInstalls.push(midd)
          }
        }
      })
    })
    this.$jfUtils.eventSource && this.$jfUtils.eventSource.close()
    this.$jfUtils.initEvent("/back/sys-server-middleware/events?serverId="+this.form.serverId,msg=>{
      this.commands.push(msg)
    })
  },
  beforeRouteLeave(to, from, next) {
    this.$jfUtils.eventSource && this.$jfUtils.eventSource.close()
    next()
  },
  methods: {
    sendCmd(){
      console.log("发送内容")
      enterCmd({serverId:this.form.serverId,cmd:this.cmd}).then(data=>this.commands.push("输入:"+this.cmd));
    },
    install(){
      install(this.form).then(data=>{
        this.releaseDialog = false
        this.installDialog = true
      })
    },
    openInstall(middlewareId){
      this.form.middlewareId = middlewareId;
      this.releaseDialog = true
      selectMiddReleases({middlewareId:this.form.middlewareId}).then(data=>this.releases = data)
    },
    unInstall(){

    },
    openSetting(){

    },
  }
}
</script>
<style lang="scss">
.command{
  padding: 4px;
  background: #121212;
  color: white;
  height: 500px;
  overflow-y: auto;
}
</style>