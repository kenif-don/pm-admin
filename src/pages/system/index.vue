<template>
  <div>
    <div class="menu-container">
      <el-menu
          :default-active="curRoute.index"
          :class="config.menuModel === 1 ? 'resource-container-left' : 'resource-container-top'"
          :style="{'width':getMenuWidth()}"
          :mode="config.menuModel === 1 ? 'vertical' : 'horizontal'"
          :background-color="config.menuModel === 1 ? '#2a3044' : '#fff'"
          :text-color="config.menuModel === 1 ? '#7d97b2' : '#2a3044'"
          :active-text-color="config.menuModel === 1 ? '#499eff' : '#2a3044'"
          unique-opened
          @select="selectMenu"
          :collapse="isCollapse">
        <menu-item v-for="(item,index) in routes" :key="index" :menu="item" :index="index"/>
      </el-menu>
      <div
          :class="config.menuModel === 1 ? 'breadcrumb-container-left' : 'breadcrumb-container-top'"
          :style="{'margin-left':getMenuWidth()}"
      >
        <menu-header :model="config.menuModel" :is-collapse="isCollapse" @changeCollapse="changeCollapse"/>
        <menu-user/>
      </div>
    </div>
    <div class="app-main" :style="{'margin-left':getMenuWidth()}" :class="{'app-main-top':config.menuModel === 2}">
      <router-view/>
    </div>
  </div>
</template>
<script>
import {mapActions, mapState} from "vuex";
import MenuItem from "../../components/layout/MenuItem.vue";
import MenuHeader from "../../components/layout/MenuHeader.vue";
import MenuUser from "../../components/layout/MenuUser.vue";
export default {
  components: {MenuHeader, MenuItem,MenuUser},
  data() {
    return {
      config:{menuModel:1},
      routes:[],
      isRouterAlive: true,
      isCollapse: false, //菜单收缩状态
    }
  },
  computed:{
    ...mapState(['curRoute'])
  },
  mounted() {
    this.getRoutes().then(routes => {
      this.routes = routes;
      if(this.curRoute.index){
        this.selectMenu(this.curRoute.index)
      }else{
        this.selectMenu("0-0")
      }
    })
  },
  methods: {
    ...mapActions(['getRoutes','selectMenu']),
    getMenuWidth(){
      if(this.config.menuModel === 1 ){
        if(this.isCollapse){
          return '64px'
        }
        return '200px'
      }
      return '100%'
    },
    /**
     * 菜单收缩状态
     */
    changeCollapse: function () {
      this.isCollapse = !this.isCollapse;
    },
  }
}
</script>