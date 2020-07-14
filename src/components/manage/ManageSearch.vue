<template>
  <div class="search">
    <el-input
      placeholder="请输入用户名"
      clearable
      v-model="username"
      class="search-content"
    >
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <el-date-picker
      v-model="beginTime"
      type="date"
      placeholder="开始时间"
      class="data-item"
      value-format="timestamp"
    />
    <el-date-picker
      v-model="endTime"
      type="date"
      placeholder="结束时间"
      class="data-item"
      value-format="timestamp"
    />
    <el-button type="primary" size="medium" @click="searchHandle">
      搜索
    </el-button>
  </div>
</template>
<script>
export default {
  name: 'ManageSearcch',
  data() {
    return {
      error: false,
      username: '',
      timeCategory: '0',
      beginTime: '',
      endTime: ''
    }
  },
  watch: {
    username() {
      if (this.username !== '') {
        this.error =
          !/^[0-9a-zA-Z]+$/.test(this.username) || this.username.length > 30
      } else {
        this.error = false
      }
    }
  },
  methods: {
    // 搜索
    searchHandle() {
      if (this.error) {
        this.$message({
          message: '用户名输入过长',
          type: 'warning'
        })
        return
      }
      const param = {
        timeCategory: parseInt(this.timeCategory),
        beginTime: '',
        endTime: '',
        username: this.username
      }
      if (this.beginTime) {
        param.beginTime = parseInt(String(this.beginTime).slice(0, 10))
      }
      if (this.endTime) {
        param.endTime = parseInt(
          String(this.endTime + (24 * 60 * 60 - 1) * 1000).slice(0, 10)
        )
      }
      this.$emit('searchHandle', param)
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.el-input__inner {
  border-color: transparent !important;
  color: #999;
  border-radius: 8px;
}
.search {
  min-width: 928px;
  margin-bottom: 24px;
  position: relative;
  .data-item {
    cursor: pointer;
    width: 150px;
    margin-right: 12px;
  }
  .search-content {
    width: 225px;
    margin-right: 12px;
  }
  .select {
    width: 130px;
    margin-right: 12px;
    border-radius: 8px;
  }
  .put {
    position: absolute;
    height: 36px;
    line-height: 36px;
    padding: 0 15px;
    right: 0;
    top: 0;
    border-radius: 8px;
    .icon {
      position: relative;
      top: 1px;
      margin-right: 5px;
    }
  }
  @media screen and (max-width: 1560px) {
    .put {
      position: static;
      margin-top: 24px;
    }
  }

  .btn-item {
    border-radius: 8px;
    height: 36px;
    line-height: 36px;
    padding: 0 15px;
    &.is-disabled {
      background: #e6e6e6;
      color: #999999;
      border-color: #e6e6e6;
      .icon {
        color: #999999;
      }
    }
  }
}
</style>
