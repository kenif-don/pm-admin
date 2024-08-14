<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="5" style="margin-bottom: 10px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div class="flex-center p16">
            <jf-img-uploader circle :urls="[loginUser.avatar || Avatar]"/>
          </div>
          <ul class="user-info">
            <li>登录账号<div class="user-right">{{ loginUser.username }}</div></li>
            <li>用户昵称 <div class="user-right">{{ loginUser.nickname }}</div></li>
          </ul>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="19">
        <el-card class="box-card">
          <div slot="header" class="flex-between">
            <span>信息修改</span>
            <jf-btn text="保存" @click="save"/>
          </div>
          <el-form class="p16" :model="form" label-width="80px">
            <el-form-item label="用户昵称">
              <el-input v-model="form.nickname" placeholder="请输入用户昵称"/>
            </el-form-item>
            <el-form-item label="旧密码">
              <el-input type="password" v-model="form.oldPassword" placeholder="请输入旧密码"/>
            </el-form-item>
            <el-form-item label="新密码">
              <el-input type="password" v-model="form.password" placeholder="请输入新密码"/>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input type="password" v-model="form.confirmPassword" placeholder="请输入确认密码"/>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapState} from "vuex";
import JfImgUploader from "@/components/jf/JfImgUploader.vue";
import Avatar from "@/assets/img/avatar.png";
import JfBtn from "@/components/jf/JfBtn.vue";
import {editInfo} from "@/api/system/admin";
export default {
  components:{JfBtn, JfImgUploader},
  computed: {
    ...mapState(['loginUser'])
  },
  data() {
    return {
      Avatar,
      activeName: 'first',
      saveLoading: false,
      form: {},
    }
  },
  created() {
    this.form.nickname = this.loginUser.nickname;
  },
  methods: {
    save() {
      if (this.form.password !== this.form.confirmPassword) {
        this.$message.error("两次密码不一致")
        return
      }
      editInfo(this.form);
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.box-card{
  height: 275px;
}
.user-info {
  padding-left: 0;
  list-style: none;
  li{
    border-bottom: 1px solid #F0F3F4;
    padding: 11px 0;
    font-size: 13px;
  }
  .user-right {
    float: right;

    a{
      color: #317EF3;
    }
  }
}
</style>
