<template>
  <el-container class="container">
    <el-aside class="aside" width="auto">
      <div class="logo" :style="{ width: isCollapse ? 64 + 'px' : 224 + 'px' }">
        <img
          v-if="isCollapse"
          src="@/assets/imgs/logo-small.png"
          alt="logo"
          class="logo-small"
        />
        <img v-else class="logo-big" src="@/assets/imgs/logo.png" alt="logo" />
      </div>

      <el-menu
        class="menu"
        :collapse="isCollapse"
        :default-active="menuActive.toString()"
      >
        <el-menu-item
          v-for="(item, index) in menu"
          :key="index"
          :index="index.toString()"
          @click="routerHandle(item.path)"
        >
          <svg-icon
            :icon-class="
              index.toString() === menuActive.toString()
                ? `${item.icon}-select`
                : item.icon
            "
            class="icon"
          />
          <span slot="title">{{ $t(item.meta.name) }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header
        class="header"
        :style="{
          'box-shadow': scroll ? '0px 2px 4px 0px rgba(16,12,61,0.1)' : '',
          background: scroll ? '#fff' : ''
        }"
      >
        <i
          :class="
            isCollapse ? 'el-icon-s-unfold expend' : 'el-icon-s-fold expend'
          "
          @click="collapseHandle"
        />
        <div class="right">
          <lang-header class="lang-header" />
          <info-set />
        </div>
      </el-header>
      <el-main class="main" id="contentbox">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import router from '@/router'
import LangHeader from '@/components/LangHeader'
import InfoSet from '@/components/InfoSet'
import SvgIcon from '@/components/SvgIcon'
export default {
  components: {
    LangHeader,
    InfoSet,
    SvgIcon
  },
  data() {
    return {
      scroll: false,
      menuActive: 0,
      isCollapse: false,
      menu: []
    }
  },
  watch: {
    '$route.path': 'defaultRoute'
  },
  methods: {
    // 展开折叠
    collapseHandle() {
      this.isCollapse = !this.isCollapse
    },
    // 路由改变
    routerHandle(e) {
      if (e !== this.$route.path) {
        this.$router.push(e)
      }
    },
    // 默认显示
    defaultRoute() {
      this.menu.forEach((item, index) => {
        if (item.path === this.$route.path) {
          this.menuActive = index
        }
      })
    }
  },
  mounted() {
    this.menu = router.options.routes[1].children.filter(
      item => item.isShow !== false
    )
    this.defaultRoute()
    window.addEventListener(
      'scroll',
      () => {
        const scrollTop = document.getElementById('contentbox').scrollTop
        if (scrollTop) {
          this.scroll = true
        } else {
          this.scroll = false
        }
      },
      true
    )
  }
}
</script>
<style lang="css"></style>
<style lang="less" scoped>
.container {
  height: 100vh;
  background: rgb(246, 249, 253);
  /deep/.el-tooltip {
    padding: 0 7px !important;
    text-align: center;
    .icon {
      margin-right: 0 !important;
    }
  }
  .aside {
    height: 100vh;
    background: #fff;
    .logo {
      transition: all 0.3s;
      text-align: center;
      .logo-small {
        width: 48px;
        display: inline-block;
        padding: 32px 0;
      }
      .logo-big {
        display: inline-block;
        padding: 40px 0;
        width: 138px;
        height: 32px;
      }
    }
    .menu {
      height: calc(100vh - 115px);
      border: none;
      &:not(.el-menu--collapse) {
        width: 224px;
      }

      .icon {
        margin-right: 12px;
        font-size: 20px;
      }
      .el-menu-item {
        height: 44px;
        line-height: 44px;
        padding: 0;
        margin: 0 12px 12px 12px;
        padding-left: 37px !important;
        border-radius: 8px;
        &.is-active {
          background: rgba(255, 132, 19, 1);
          color: #fff;
        }
      }
    }
  }
  .header {
    height: 112px !important;
    transition: all 0.3s;
    position: relative;
    color: #333;
    line-height: 30px;
    padding-top: 41px;
    padding-bottom: 26px;
    .expend {
      color: #ccc;
      cursor: pointer;
      font-size: 20px;
    }
    .right {
      position: absolute;
      right: 20px;
      top: 41px;
      .lang-header {
        margin-right: 20px;
      }
    }
  }
  .main {
    padding: 0 24px 40px 24px;
    box-sizing: border-box;
    min-height: calc(100vh - 112px);
  }
}
</style>
