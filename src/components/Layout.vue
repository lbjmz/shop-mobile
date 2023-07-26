<template>
  <div class="layout">
    <router-view />
    <Tabber/>
  </div>
</template>
<script>
import Tabber from './Tabber.vue';
export default {
  components: { Tabber },
  data() {
    return {};
  },
};
</script>
<style lang="less">
.layout{
    height: 100vh;
}
</style>