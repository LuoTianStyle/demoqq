<template>
  <el-container class="container">
    <el-container>
      <el-header
        class="header"
        :style="{
          'box-shadow': scroll ? '0px 2px 4px 0px rgba(16,12,61,0.1)' : '',
          background: scroll ? '#fff' : ''
        }"
      >
        <el-switch
          class="allow-login"
          v-model="allowReg"
          active-text="允许注册"
          @change="change"
        >
        </el-switch>
        <div class="right">
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
import InfoSet from '@/components/InfoSet'
import { getSite, postSiteEdit } from '@/api'
export default {
  components: {
    InfoSet
  },
  data() {
    return {
      scroll: false,
      allowReg: false,
      title: ''
    }
  },
  methods: {
    async getData() {
      const res = await getSite()
      this.allowReg = res.data.register === 2 ? false : true
      this.title = res.data.title
    },
    async editData(params) {
      await postSiteEdit(params)
      this.$message({
        message: '操作成功',
        type: 'success'
      })
    },
    change(e) {
      const params = {
        title: this.title,
        register: e ? 1 : 2
      }
      this.editData(params)
    }
  },
  mounted() {
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
    this.getData()
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
  .header {
    z-index: 10;
    height: 80px !important;
    transition: all 0.3s;
    position: relative;
    color: #333;
    .right {
      position: absolute;
      right: 20px;
      top: 23px;
    }
  }
  .main {
    position: relative;
    padding: 0 24px 40px 24px;
    box-sizing: border-box;
    min-height: calc(100vh - 112px);
  }
  .allow-login {
    position: relative;
    top: 30px;
    left: 10px;
  }
}
</style>
