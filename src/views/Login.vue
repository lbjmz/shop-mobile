<template>
  <div class="login">
    <logo />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 1rem">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <span>
      <router-link to="/register"> <span class="message">注册</span> </router-link>
    </span>
  </div>
</template>
<script>
import { encrypto } from "../utils/crypto";
import { login } from "../api/user";
import Logo from "../components/Logo.vue";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onSubmit() {
      const result = await login({
        userName: this.username,
        passWord: encrypto(this.password),
      });
      if (result.accessToken) {
        sessionStorage.setItem("token", result.accessToken);
        this.$router.push("/home");
      }
      //  console.log('submit', values);
    },
  },
  components: {
    Logo,
  },
};
</script>

<style type="less">
.login {
  padding: 2rem;
}
.message{
  color:red;
}
</style>