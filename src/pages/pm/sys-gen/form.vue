<template>
  <div>
    <div class="flex-center">
      <h3>{{query.name}} 生成器配置</h3>
    </div>
    <div class="flex-center">
      <el-tabs v-model="active">
        <el-tab-pane label="①基础配置" :name="1"/>
        <el-tab-pane label="②后台配置" :name="2"/>
        <el-tab-pane label="③前端配置" :name="3"/>
        <el-tab-pane label="④sql配置" :name="4"/>
        <el-tab-pane label="⑤生成项配置" :name="5"/>
      </el-tabs>
    </div>
    <form1 v-if="active === 1" :genId="query.genId" @onsubmit="query.genId = $event"/>
    <form2 v-if="active === 2" :genId="query.genId"/>
    <form3 v-if="active === 3" :genId="query.genId"/>
    <form4 v-if="active === 4" :genId="query.genId"/>
    <form5 v-if="active === 5" :genId="query.genId"/>
  </div>
</template>
<script>
import Form1 from './form-1.vue'
import Form2 from './form-2.vue'
import Form3 from './form-3.vue'
import Form4 from './form-4.vue'
import Form5 from './form-5.vue'

export default {
  components: {Form1,Form2,Form3,Form4,Form5},
  data() {
    return {
      active: 1,
      query:{}
    }
  },
  mounted() {
    this.query = JSON.parse(this.$route.query.query)
  }
}
</script>
<style scoped lang="scss">

</style>