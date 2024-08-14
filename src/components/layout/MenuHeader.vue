<template>
  <div class="flex-center">
     <el-icon @click="changeCollapse" class="collapse-icon" v-if="model === 1">
       <Fold v-if="!isCollapse"/>
       <Expand v-else/>
     </el-icon>
    <el-breadcrumb separator="/" v-if="model === 1">
      <el-breadcrumb-item v-for="name in curRoute.names" :key="name">
        {{ name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
import {mapState} from "vuex";

export default {
  name: "MenuHeader",
  props: ['model', 'isCollapse'],
  computed: {
    ...mapState(['curRoute'])
  },
  methods: {
    changeCollapse() {
      this.$emit('changeCollapse')
    }
  }
}
</script>
<style scoped lang="scss">

</style>