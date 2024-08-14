<template>
  <div class="page">
    <div class="ms-login">
      <div class="ms-title">{{ title }}</div>
      <el-form :model="form" ref="login" label-width="0px" class="ms-content">
        <el-form-item>
          <el-input v-model="form.username" placeholder="输入账号">
            <template #prefix><el-icon><UserFilled /></el-icon></template>
          </el-input>
        </el-form-item>
        <el-form-item class="mt16">
          <el-input type="password" placeholder="登录密码" v-model="form.password"
                    @keyup.enter.native="submitForm()">
            <template #prefix><el-icon><Lock /></el-icon></template>
          </el-input>
        </el-form-item>
        <el-form-item class="mt16">
          <div class="flex-center">
            <el-input placeholder="验证码" v-model="form.code" style="width: calc(100% - 150px)" @keyup.enter.native="submitForm()">
              <template #prefix><el-icon><WarnTriangleFilled /></el-icon></template>
            </el-input>
            <el-image :src="validate.img" style="width: 150px;height: 30px;cursor: pointer" @click="getValidateCode"/>
          </div>
        </el-form-item>
        <div class="login-btn" style="display: flex;justify-content: space-between;">
          <el-button size="small" type="primary" @click="submitForm()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {login, getInfo,getValidateCode} from '@/api/system/admin'
import {mapMutations} from "vuex";
import {UserFilled} from "@element-plus/icons-vue";

export default {
  components: {UserFilled},
  data: function () {
    return {
      form: {
        username: '',
        password: '',
        key:'',
        code:''
      },
      title: import.meta.env.VITE_TITLE,
      validate:{}
    };
  },
  mounted() {
    this.getValidateCode()
  },
  methods: {
    ...mapMutations(['setLoginUser', 'setToken']),
    getValidateCode(){
      getValidateCode().then(data=>{
        this.validate = data
        this.form.key = this.validate.key
        this.form.code = null
      });
    },
    async submitForm() {
      let token = await login(this.form);
      this.$message.success("登录成功！");
      this.setToken(token);
      getInfo().then(user=>{
        this.setLoginUser(user);
        this.$router.push('/index');
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/login";
</style>
