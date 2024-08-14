<template>
  <el-sub-menu v-if="menu.children && menu.children.length" :index="index+''">
    <!--这里为什么把icon设置为17，请参考https://github.com/element-plus/element-plus/issues/6792-->
    <template #title><el-icon size="17"><component :is="menu.icon"/></el-icon><span>{{menu.name}}</span></template>
    <menu-item  v-for="(item,i) in menu.children" :key="i" :menu="item" :index="index+'-'+i"/>
  </el-sub-menu>
  <el-menu-item v-else :index="index+''"><el-icon size="17"><component :is="menu.icon"/></el-icon>{{menu.name}}</el-menu-item>
</template>
<script>
export default {
  name: "MenuItem",
  props: ['menu', 'index']
}
</script>
<style scoped lang="scss">

</style>
<script setup>
</script>