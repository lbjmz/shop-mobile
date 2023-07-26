<template>
  <div>
    <!-- <router-view /> -->
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item replace to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/cateGory" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item replace to="/shopCart" :badge="count" icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/me" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { prodCount } from "@/api/shopcart";
import emitter from '@/utils/mitt'
export default {
  data() {
    return {
      active: 0,
      count: 0,
    };
  },
  created() {
    this.onChange()
    //监听订阅事件 
    emitter.on('changeItem', e => this.onChange())
  },
  mounted() {
    // console.log(this.$route);
    switch (this.$route.path) {
      case "/home":
        return (this.active = 0);
      case "/cateGory":
        return (this.active = 1);
      case "/shopCart":
        return (this.active = 2);
      case "/me":
        return (this.active = 3);
      default:
        return (this.active = 0);
    }
  },
  methods: {
    async onChange() {
      this.count = await prodCount();
    },
  }
};
</script>
<style lang="less"></style>