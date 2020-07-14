<template>
  <el-dropdown @command="clickHandle" trigger="click">
    <span class="el-dropdown-link">
      <img class="avatar" src="@/assets/imgs/logo-small.png" alt="" />
      {{ name }}
      <i class="el-icon-arrow-down el-icon--right" />
    </span>
    <el-dropdown-menu slot="dropdown" class="lang">
      <el-dropdown-item class="item" command="pass">
        <svg-icon class="item-icon" icon-class="pass-change" />
        修改密码
      </el-dropdown-item>
      <el-dropdown-item class="item" command="exit">
        <svg-icon class="item-icon" icon-class="exit" />
        退出
      </el-dropdown-item>
    </el-dropdown-menu>
    <input-modal
      @submitHandle="submitHandle"
      :show.sync="modalShow"
      v-if="modalShow"
      title="修改密码"
      label="新密码"
      placeholder="请输入新密码"
      :rule="passRule"
    />
  </el-dropdown>
</template>
<script>
import InputModal from '@/components/modal/InputModal.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { getStorage, removeStorage } from '@/utils/storage'
import { logout, postChangePass } from '@/api'
import rules from '@/utils/rule'
export default {
  name: 'InfoSet',
  data() {
    return {
      name: '',
      modalShow: false,
      passRule: ''
    }
  },
  components: {
    SvgIcon,
    InputModal
  },
  methods: {
    clickHandle(e) {
      if (e === 'exit') {
        this.$confirm('是否退出当前账号？', '退出提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.logout()
          })
          .catch(() => {})
      } else {
        this.modalShow = true
      }
    },
    // 重置密码提交
    async submitHandle(e) {
      const params = {
        password: e
      }
      await postChangePass(params)
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      this.modalShow = false
    },
    async logout() {
      await logout()
      removeStorage('userData')
      this.$router.push('/login')
      this.$message({
        message: '操作成功',
        type: 'success'
      })
    }
  },
  mounted() {
    this.name = getStorage('userData').username
    this.passRule = rules.passRule
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
  box-sizing: border-box;
  border-radius: 8px;

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
  border-radius: 100%;
  display: inline-block;
  vertical-align: middle;
}
</style>
