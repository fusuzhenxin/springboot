<template>
  <div style="margin-top: 3%">
    <nav-menu></nav-menu>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import NavMenu from './common/NavMenu'
import Footer from './common/Footer'
export default {
  name: 'FontHome',
  components: {NavMenu, Footer}
}
</script>

<style scoped>
* {
  /* 初始化 */
  margin: 0;
  padding: 0;
}
</style>
