<template>
  <div class="register">
    <logo/>
    <!-- <van-image fit="cover" :src="require('../assets/logo.png')"></van-image> -->
    <van-form @submit="register">
      <van-field
        v-model="form.userName"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="form.passWord"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 1rem">
        <van-button round block type="info" native-type="submit"
          >注册</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import {register} from "@/api/user"
import { encrypto } from "@/utils/crypto";
import Logo from '../components/Logo.vue';
//import Logo from '@/assets'
export default {
  data() {
    return {
      form: {
        userName: "",
        passWord: "",
      },
    };
  },
  methods: {
        async register() {
            const result = await register({
                userName:this.form.userName,
                passWord:encrypto(this.form.passWord) 
            })
            console.log(result)
            if(result.accessToken){
                this.$router.push("/login")
            }
        },
  },
  components: { Logo },
};
</script>
<style lang="less">
.register {
  padding: 2rem;
}
</style>