<template>
  <el-dropdown @command="clickHandle" trigger="click" :hide-on-click="false">
    <span class="el-dropdown-link">
      <img class="avatar" src="@/assets/imgs/logo-small.png" alt="" />
      {{ name }}
      <i class="el-icon-arrow-down el-icon--right" />
    </span>
    <el-dropdown-menu slot="dropdown" class="lang">
      <el-dropdown-item class="item" command="pass">
        <svg-icon class="item-icon" icon-class="pass-change" />
        {{ $t('pass-change') }}
      </el-dropdown-item>
      <el-dropdown-item class="item" command="exit">
        <svg-icon class="item-icon" icon-class="exit" />
        {{ $t('exit') }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
import SvgIcon from '@/components/SvgIcon.vue'
export default {
  name: 'InfoSet',
  data() {
    return {
      name: 'Lucy'
    }
  },
  components: {
    SvgIcon
  },
  methods: {
    clickHandle(e) {
      if (e === 'exit') {
        this.$confirm('你是否要退出登录, 是否继续?', '退出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {})
          .catch(() => {})
      }
    }
  }
}
</script>
<style lang="less" scoped>
.lang {
  padding-left: 8px;
  padding-right: 8px;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.item {
  padding-left: 6px;
  padding-right: 6px;
  width: 124px;
  box-sizing: border-box;

  &:hover {
    background-color: rgb(246, 249, 253);
    color: #606266;
  }
}
.item-icon {
  position: relative;
  top: 2px;
  padding-right: 5px;
}
.el-icon--right {
  color: #ccc;
  font-size: 14px;
  font-weight: bold;
}
.avatar {
  width: 34px;
  display: inline-block;
  vertical-align: middle;
}
</style>
