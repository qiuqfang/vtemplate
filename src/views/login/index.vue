<template>
  <div class="login">
    <el-form
      ref="loginForm"
      size="medium"
      :model="loginForm"
      class="login-form"
      label-position="left"
    >
      <h3 class="login-form-title">{{ title }}</h3>

      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          prefix-icon="el-icon-user"
          type="text"
          tabindex="1"
          placeholder="用户名"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          prefix-icon="el-icon-lock"
          type="text"
          show-password
          tabindex="2"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <el-row :gutter="5">
        <el-col :span="16">
          <el-form-item>
            <el-input
              prefix-icon="el-icon-message"
              type="text"
              placeholder="请输入验证码"
              v-model="loginForm.code"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-image
            :src="captchaUrl + timeStamp"
            style="height: 36px; cursor: pointer"
            @click="timeStamp = Date.now()"
          />
        </el-col>
      </el-row>

      <el-form-item>
        <el-button :loading="loading" round type="primary" style="width: 100%" @click="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
    <div class="login-footer">
      <span>Copyright © {{ title }} All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
        code: "",
      },
      loading: false,
      redirect: undefined,
      captchaUrl: process.env.VUE_APP_TARGET_URL + process.env.VUE_APP_CAPTCHA_URL,
      timeStamp: Date.now(),
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      try {
        await this.$store.dispatch("user/login", this.loginForm);
      } catch (error) {
        console.log(error);
        this.timeStamp = Date.now();
      }
      this.loading = false;
      this.$router.push({ path: this.redirect || "/" });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  min-height: 100%;
  width: 100%;
  background-image: url(../../assets/login_images/background.f9f49138.jpg);
  background-size: 100% 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    margin-top: -100px;
    background-color: #fff;
    border-radius: 6px;
    width: 400px;
    max-width: 100%;
    padding: 22px 22px 0;
    overflow: hidden;
    .login-form-title {
      color: #707070;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 12px;
    letter-spacing: 1px;
  }
}
</style>
