<template>
  <div class="about">
    <h1>This is an about page</h1>
    <van-button @click="test" type="primary">主要按钮</van-button>
  </div>
</template>

<script>
import {post,get} from '../utils/request';
import Vue from 'vue';
import {Button} from 'vant'
Vue.use(Button)
export default{
  methods:{
    test(){
      console.log(
        post("/login")
      )
     console.log(process.env.VUE_APP_URL, "VUE_APP_URL")
    }
  }
}
</script>