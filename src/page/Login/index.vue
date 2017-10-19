<template>
  <div class="loginForm-wrapper">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户手机">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="form.verificationCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click='getVerificationCode'>{{vfcMessage}}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click='handleLogin'>上车</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import api from '../../api';

export default {
  name: 'login',
  data () {
    return {
      form: {
        phone: this.$store.state.member.phone,
        verificationCode: '',
      },
      isVfcFetch: false,
      vfcInterval: '', // 存定时器
      vfcResetTime: 60,
    }
  },
  computed: {
    vfcMessage() {
      // 获取验证码上的文字
      return this.isVfcFetch ? `${this.vfcResetTime} s` : '获取验证码';
    },
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    getVerificationCode() {
      if (this.isVfcFetch) {
        return;
      }
      api.memberGetVfc(this.form.phone);
      this.isVfcFetch = !this.isVfcFetch;
      this.vfcInterval = setInterval(() => {
        if (this.vfcResetTime === 0) {
          this.isVfcFetch = !this.isVfcFetch;
          this.vfcResetTime = 60;
          clearInterval(this.vfcInterval);
          return
        }
        this.vfcResetTime -= 1;
      }, 1000);
    },
    handleLogin() {
      // 请求api.memberLogin
      const { dispatch } = this.$store;
      dispatch('login', {
        phone: this.form.phone,
        verificationCode: this.form.verificationCode,
      })
      this.$router.push('aboutArticle');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loginForm-wrapper {
  padding: 30px;
  width: 100%;;
  max-width: 500px;
  min-width: 250px;

}
</style>
