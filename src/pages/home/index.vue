<template>
  <div>
    <div class="charts-box">
      <div class="item">
        <h4>CPU使用率</h4>
        <water-charts :color="runtime.cpu.usage > 75 ? '#ff0000' : '#37cc5b'" :rate="parseInt((runtime.cpu.usage || 0).toFixed(0))" :size="150" id="charts-0"/>
      </div>
      <div class="item">
        <h4>内存使用率</h4>
        <water-charts :color="runtime.memory.usage > 75 ? '#ff0000' : '#37cc5b'" :rate="parseInt((runtime.memory.usage || 0).toFixed(0))" :size="150" id="charts-1"/>
      </div>
      <div class="item">
        <h4>磁盘使用率</h4>
        <water-charts :color="disk.usage > 75 ? '#ff0000' : '#37cc5b'" :rate="parseInt((disk.usage || 0).toFixed(0))" :size="150" id="charts-2"/>
      </div>
    </div>
    <div class="info-box">
      <el-card class="item" shadow="none">
        <template #header>
          <h3>CPU</h3>
        </template>
        <div class="count-table">
          <div class="header">
            <span>属性</span>
            <span>值</span>
          </div>
          <div class="body">
            <div class="item">
              <span>型号</span>
              <span>{{runtime.cpu.name}}</span>
            </div>
            <div class="item">
              <span>核心数</span>
              <span>{{runtime.cpu.core}}</span>
            </div>
            <div class="item">
              <span>线程数</span>
              <span>{{runtime.cpu.thread}}</span>
            </div>
            <div class="item">
              <span>使用率</span>
              <span>{{parseFloat((runtime.cpu.usage || 0).toFixed(2))}}%</span>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="item" shadow="none">
        <template #header>
          <h3>内存</h3>
        </template>
        <div class="count-table">
          <div class="header">
            <span>属性</span>
            <span>值</span>
          </div>
          <div class="body">
            <div class="item">
              <span>总内存</span>
              <span>{{parseFloat((runtime.memory.total / 1024 / 1024 / 1024).toFixed(2))}}GB</span>
            </div>
            <div class="item">
              <span>已用内存</span>
              <span>{{parseFloat((runtime.memory.used / 1024 / 1024 / 1024).toFixed(2))}}GB</span>
            </div>
            <div class="item">
              <span>剩余内存</span>
              <span>{{parseFloat((runtime.memory.free / 1024 / 1024 / 1024).toFixed(2))}}GB</span>
            </div>
            <div class="item">
              <span>使用率</span>
              <span>{{parseInt((runtime.memory.usage || 0).toFixed(2))}}%</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <el-card class="mt16" shadow="none">
      <template #header>
        <h3>系统信息</h3>
      </template>
      <div class="count-table">
        <div class="body">
          <div class="item">
            <div class="flex-between" style="width: 48%">
              <span>系统名称</span>
              <span>{{runtime.sys.name}}</span>
            </div>
            <div class="flex-between" style="width: 48%">
              <span>操作系统</span>
              <span>{{runtime.sys.version}}</span>
            </div>
          </div>
          <div class="item">
            <div class="flex-between" style="width: 48%">
              <span>cpu架构</span>
              <span>{{runtime.sys.arch}}</span>
            </div>
            <div class="flex-between" style="width: 48%">
              <span>本机IP</span>
              <span>{{runtime.sys.ip}}</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="mt16" shadow="none">
      <template #header>
        <h3>磁盘</h3>
      </template>
      <div class="count-table">
        <div class="body">
          <div class="item" v-for="item in runtime.disks">
            <div class="flex-between" style="width: 16%">
              <span>{{item.name}}</span>
              <span>{{parseFloat((item.used / 1024 / 1024 / 1024).toFixed(2))}}GB</span>
            </div>
            <div class="flex-between" style="width: 16%">
              <span>磁盘类型</span>
              <span>{{item.type}}</span>
            </div>
            <div class="flex-between" style="width: 16%">
              <span>使用率</span>
              <span>{{parseInt((item.usage || 0).toFixed(2))}}%</span>
            </div>
            <div class="flex-between" style="width: 16%">
              <span>总空间</span>
              <span>{{parseFloat((item.total / 1024 / 1024 / 1024).toFixed(2))}}GB</span>
            </div>
            <div class="flex-between" style="width: 16%">
              <span>已用空间</span>
              <span>{{parseFloat((item.used / 1024 / 1024 / 1024).toFixed(2))}}GB</span>
            </div>
            <div class="flex-between" style="width: 16%">
              <span>剩余空间</span>
              <span>{{parseFloat((item.free / 1024 / 1024 / 1024).toFixed(2))}}GB</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import {get} from '@/api/system/comm'
import WaterCharts from '@/components/jf/charts/WaterCharts'
export default {
  components: {
    WaterCharts
  },
  data() {
    return {
      runtime:{
        cpu:{},
        memory:{},
        sys:{},
        disks:[],
      },
      disk:{
        usage:0
      },
      timer:null
    }
  },
  mounted() {
    clearInterval(this.timer)
    this.timer = setInterval(()=>{
      this.get()
    },15000)
    this.get()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    get(){
      get().then(data=>{
        this.runtime = data
        let diskTotalUsed = 0;
        let diskTotal = 0;
        for(let item of data.disks){
          diskTotalUsed += item.used
          diskTotal += item.total
        }
        this.disk.usage = diskTotalUsed * 100 / diskTotal;
      })
    }
  }
}
</script>
<style lang="scss">
.charts-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  .item{
    width: 33%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.info-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  .item{
    width: 49%;
  }
}
.count-table{
  .header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;
    border-bottom: 1px solid #eee;
    span{
      font-weight: bold;
    }
  }
  .body{
    width: 100%;
    .item{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #eee;
    }
  }
}
</style>