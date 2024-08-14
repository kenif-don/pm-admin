<template>
  <el-dropdown>
    <span class="login-user-container">
      <el-avatar :size="36" :src="loginUser.avatar || Avatar"/>
      <span class="login-user-name">{{ loginUser.nickname }}</span>
      <el-icon class="el-icon--right"><arrow-down/></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="$router.push('/system/admin/info')">个人中心</el-dropdown-item>
        <el-dropdown-item @click="exit">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script>
import {mapActions, mapState} from "vuex";
import Avatar from "@/assets/img/avatar.png";
export default {
  name: "MenuUser",
  data() {
    return {
      Avatar
    }
  },
  computed: {
    ...mapState(['loginUser'])
  },
  methods:{
    ...mapActions(['logout']),
    exit(){
      this.logout().then(()=>{
        this.$router.push('/login');
      })
    }
  }
}
</script>