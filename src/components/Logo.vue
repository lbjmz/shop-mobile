<template>
  <div class="logo">
    <van-image fit="cover" :src="logo" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      logo: require("../assets/logo.png"),
    };
  },
};
</script>
<style lang="less">
.logo {
  .vant-image {
    img {
      width: 40vw;
      padding-bottom: 8vh;
      padding-top: 20vh;
    }
  }
}
</style>