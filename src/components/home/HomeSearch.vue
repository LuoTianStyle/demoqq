<template>
  <div class="search">
    <el-date-picker
      v-model="startTime"
      type="date"
      :placeholder="$t('search-time-start')"
      class="data-item"
      value-format="timestamp"
    />
    <el-date-picker
      v-model="endTime"
      type="date"
      :placeholder="$t('search-time-end')"
      class="data-item"
      value-format="timestamp"
    />
    <el-button
      class="search-btn"
      size="medium"
      v-text="$t('search-btn')"
      @click="searchHandle"
    />
    <el-button type="primary" size="medium" class="put" @click="putList">
      <svg-icon icon-class="put" class="icon" />
      {{ $t('put-data') }}
    </el-button>
  </div>
</template>
<script>
export default {
  name: 'HomeSearcch',
  data() {
    return {
      startTime: '',
      endTime: ''
    }
  },
  methods: {
    // 搜索
    searchHandle() {
      const param = {
        startTime: this.startTime,
        endTime: this.endTime
      }
      if (this.startTime) {
        param.beginTime = parseInt(String(this.startTime).slice(0, 10))
      }
      if (this.endTime) {
        param.endTime = parseInt(String(this.endTime).slice(0, 10))
      }
      this.$emit('searchHandle', param)
    },
    // 导出
    putList() {
      this.$emit('putList', 1)
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.el-input__inner {
  border-color: transparent;
  color: #999;
}
.search {
  margin-bottom: 24px;
  position: relative;
  min-width: 928px;
  .data-item {
    cursor: pointer;
    width: 150px;
    margin-right: 12px;
  }
  .put {
    position: absolute;
    right: 0;
    top: 0;
    .icon {
      margin-right: 5px;
    }
  }
  .search-btn {
    color: #ff8413;
    border-color: transparent;
    width: 100px;
  }
}
</style>
