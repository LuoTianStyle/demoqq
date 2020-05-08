<template>
  <el-container class="container">
    <el-aside class="aside" width="auto">
      <div
        class="logo"
        :style="{ width: isCollapse ? 64 + 'px' : 200 + 'px' }"
      ></div>
      <el-menu class="menu" :collapse="isCollapse" default-active="0">
        <el-menu-item
          v-for="(item, index) in menu"
          :key="index"
          :index="index.toString()"
          @click="routerHandle(item.path)"
        >
          <i :class="item.icon"></i>
          <span slot="title">{{ item.meta.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <i
          :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          @click="collapseHandle"
        ></i>
        <span>修改免密</span>
        <span>英国代理商</span>
        <span>退出</span>
      </el-header>
      <el-main class="main">
        <div class="content">
          <router-view />
        </div>
        <footer class="footer">nobook</footer>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import router from '@/router'
export default {
  data() {
    return {
      isCollapse: false,
      menu: []
    }
  },
  methods: {
    collapseHandle() {
      this.isCollapse = !this.isCollapse
    },
    routerHandle(e) {
      this.$router.push(e)
    }
  },
  mounted() {
    this.menu = router.options.routes[1].children.filter(
      item => item.isShow !== false
    )
  }
}
</script>
<style lang="css"></style>
<style lang="less" scoped>
.container {
  height: 100vh;
  .aside {
    height: 100vh;
    .logo {
      height: 60px;
      background-color: #b3c0d1;
      transition: all 0.3s;
    }
    .menu {
      height: calc(100vh - 60px);
      &:not(.el-menu--collapse) {
        width: 200px;
      }
    }
  }
  .header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
  }
  .main {
    padding: 0;
    .content {
      height: calc(100vh - 100px);
    }
    .footer {
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
