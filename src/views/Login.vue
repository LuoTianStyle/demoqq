<template>
  <div class="login-page">
    <div class="bg-item" />
    <div class="bg-item" />
    <div class="bg-item" />
    <div class="bg-item" />
    <div class="login-box">
      <div class="point-item" />
      <div class="point-item" />
      <div class="point-item" />
      <el-form
        label-position="top"
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="login-form"
      >
        <div class="title">云盘</div>
        <div class="account-login">登录</div>
        <div class="login-line">
          <div class="login-line-active"></div>
        </div>
        <el-form-item prop="username" label="用户名" class="item">
          <el-input
            placeholder="请输入用户名"
            v-model="loginForm.username"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item prop="password" label="密码" class="item">
          <el-input
            :type="passShow ? 'text' : 'password'"
            placeholder="请输入密码"
            v-model="loginForm.password"
            autocomplete="off"
            @keyup.enter.native="enterSubmit"
          >
            <i slot="suffix" class="pass-icon" @click="showPass">
              <svg-icon :icon-class="passShow ? 'pass-show' : 'pass-hide'" />
            </i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="sbmit-btn"
            @click="submitForm('loginForm')"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="login-bg" />
    </div>
  </div>
</template>

<script>
import { login } from '@/api'

import { setStorage } from '@/utils/storage.js'
import SvgIcon from '@/components/SvgIcon'
import rules from '@/utils/rule'
export default {
  components: {
    SvgIcon
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!this.rule.passRule.test(value)) {
        callback(new Error('密码格式有误'))
      } else {
        callback()
      }
    }
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!this.rule.userRule.test(value)) {
        callback(new Error('用户名格式有误'))
      } else {
        callback()
      }
    }
    return {
      passShow: false,
      rule: {},
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            validator: validateName,
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 密码显示隐藏
    showPass() {
      this.passShow = !this.passShow
    },
    // 登录
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login()
        } else {
          return false
        }
      })
    },
    enterSubmit(e) {
      if (e.keyCode === 13) {
        this.login()
      }
    },
    // 登录
    async login() {
      const params = {
        username: this.loginForm.username,
        password: this.loginForm.password
      }
      const res = await login(params)
      setStorage('userData', res.data)
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      let timer = setTimeout(() => {
        this.$router.push('/manage')
        clearTimeout(timer)
        timer = null
      }, 500)
    }
  },
  mounted() {
    this.rule = rules
  }
}
</script>
<style lang="less">
.login-page {
  position: relative;
  background: rgba(246, 249, 253, 1);
  height: 100vh;
  width: 100vw;
  /deep/.el-form-item__label {
    line-height: 22px;
    padding-bottom: 8px;
    &:before {
      display: none;
    }
  }
  /deep/.el-form-item__error {
    top: -29px;
    width: 250px;
    text-align: right;
    left: auto;
    right: 0;
  }
  .lang {
    position: absolute;
    top: 46px;
    right: 48px;
    z-index: 99;
  }
  .bg-item {
    z-index: 1;
    position: absolute;
    background-repeat: no-repeat;
    &:nth-child(1) {
      top: 0;
      right: 0;
      width: 519px;
      height: 409px;
      background-image: url('../assets/imgs/rtbg.png');
      background-size: 731px 629px;
      background-position: bottom left;
    }
    &:nth-child(2) {
      bottom: 0;
      right: 0;
      width: 468px;
      height: 289px;
      background-image: url('../assets/imgs/rbbg.png');
      background-size: 390px 386px;
      background-position: top left;
    }
    &:nth-child(3) {
      bottom: 0;
      left: 0;
      width: 560px;
      height: 325px;
      background-image: url('../assets/imgs/lbbg.png');
      background-size: 731px 546px;
      background-position: top right;
    }
    &:nth-child(4) {
      top: 0;
      left: 0;
      width: 560px;
      height: 325px;
      background-image: url('../assets/imgs/ltbg.png');
      background-size: 265px 263px;
      background-position: bottom right;
    }
  }
  .login-box {
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    box-shadow: 0px 15px 50px 0px rgba(16, 12, 61, 0.1);
    border-radius: 12px;
    height: 500px;
    .point-item {
      position: absolute;
      background: linear-gradient(150deg, #66b1ff 0%, #409eff 100%);
      border-radius: 100%;
      &:nth-child(1) {
        top: 22px;
        left: -31px;
        width: 38px;
        height: 38px;
      }
      &:nth-child(2) {
        bottom: -26px;
        left: 318px;
        width: 33px;
        height: 33px;
      }
      &:nth-child(3) {
        top: -104px;
        right: 0;
        width: 63px;
        height: 63px;
        background: #66b1ff;
      }
    }
    .login-bg {
      width: 480px;
      height: 500px;
      background: url('../assets/imgs/login-bg.png') no-repeat;
      background-size: 480px 500px;
    }
    .login-form {
      width: 400px;
      height: 500px;
      background: rgb(255, 255, 255);
      border-radius: 12px 0px 0px 12px;
      padding: 74px 0 0 48px;
      box-sizing: border-box;
      .title {
        font-size: 24px;
        font-weight: 500;
        color: rgb(51, 51, 51);
        line-height: 33px;
        margin-bottom: 24px;
      }
      .account-login {
        font-size: 16px;
        font-weight: 400;
        color: rgb(51, 51, 51);
        line-height: 22px;
        margin-bottom: 11px;
      }
      .login-line {
        position: relative;
        width: calc(100% - 48px);
        height: 2px;
        background: rgb(230, 230, 230);
        border-radius: 2px;
        margin-bottom: 25px;
        .login-line-active {
          position: absolute;
          top: -1px;
          left: 1px;
          width: 48px;
          height: 4px;
          background: #409eff;
          border-radius: 2px;
        }
      }
      .item {
        margin-bottom: 12px;
        margin-right: 48px;
        input {
          height: 44px;
          background: rgba(246, 249, 253, 1);
          border-radius: 8px;
          border: none;
          line-height: 44px;
        }
        .pass-icon {
          position: relative;
          top: 3px;
          right: 3px;
          line-height: 44px;
          display: inline-block;
        }
      }
      .sbmit-btn {
        margin-top: 20px;
        width: 128px;
        height: 44px;
        border-radius: 8px;
        font-size: 20px;
      }
    }
  }
}
</style>
