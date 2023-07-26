<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    window.$router = this.$router
  },
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,
body,
#app {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100vh;
}
</style>
