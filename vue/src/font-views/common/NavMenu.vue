<template>
  <el-menu
    :default-active="'/FontHome'"
    router
    mode="horizontal"
    background-color="white"
    text-color="#222"
    active-text-color="#618FEB"
    style="width: 1000px;margin-top: -50px;margin-right: auto;margin-left: auto;">
    <a href="" style="float: left;padding: 20px;">
      <div style="height: 37px"><h1>物流管理系统</h1></div>
    </a>
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
      {{ item.navItem }}
    </el-menu-item>
    <el-submenu style="float: right" index="">
      <template slot="title">你好，{{ login_name }}</template>
      <el-menu-item @click="toAdmin()">管理员页面</el-menu-item>
      <el-menu-item @click="logout()">退出</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'NavMenu',
  data() {
    return {
      login_name:JSON.parse(localStorage.getItem("user")).nickname,
      navList: [
        {name: '/FontIncoming', navItem: '入库资料'},
        {name: '/FontOutbound', navItem: '出库资料'},
        {name: '/LogisticsInformation', navItem: '物流信息'}
      ],
    }
  },
  methods: {
    logout() {
      this.$store.commit("logout")
      this.$message.success("退出成功")
      // 重定向到登录页面
      this.$router.replace({path: '/login'})
    },
    toAdmin(){
      this.$router.replace({path: '/home'})
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

span {
  pointer-events: none;
}

</style>
