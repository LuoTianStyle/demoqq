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
        {{ $t('pass-change') }}
      </el-dropdown-item>
      <el-dropdown-item class="item" command="exit">
        <svg-icon class="item-icon" icon-class="exit" />
        {{ $t('exit') }}
      </el-dropdown-item>
    </el-dropdown-menu>
    <pass-modal
      :show.sync="modalShow"
      v-if="modalShow"
      :title="$t('pass-change')"
    />
  </el-dropdown>
</template>
<script>
import PassModal from '@/components/modal/PassModal.vue'
import SvgIcon from '@/components/SvgIcon.vue'
export default {
  name: 'InfoSet',
  data() {
    return {
      name: 'Lucy',
      modalShow: false
    }
  },
  components: {
    SvgIcon,
    PassModal
  },
  methods: {
    clickHandle(e) {
      if (e === 'exit') {
        this.$confirm(this.$t('exit-tip'), this.$t('exit'), {
          confirmButtonText: this.$t('sure'),
          cancelButtonText: this.$t('cancel'),
          type: 'warning'
        })
          .then(() => {})
          .catch(() => {})
      } else {
        this.modalShow = true
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
  width: 160px;
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
