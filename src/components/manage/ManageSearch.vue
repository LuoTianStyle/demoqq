<template>
  <div class="search">
    <el-input
      :placeholder="$t('search-input-placehold')"
      clearable
      v-model="username"
      class="search-content"
    >
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <el-select v-model="timeCategory" class="select">
      <el-option :label="$t('create-time')" value="0" />
      <el-option :label="$t('expire-time1')" value="1" />
    </el-select>
    <el-date-picker
      v-model="beginTime"
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
    <div class="put">
      <el-button
        class="btn-item"
        type="primary"
        size="medium"
        :disabled="select.length > 0 ? false : true"
        @click="rechargeHandle"
      >
        <svg-icon v-if="select.length > 0" icon-class="recharge" class="icon" />
        <svg-icon v-else icon-class="recharge-d" class="icon" />
        {{ $t('recharge') }}
      </el-button>
      <el-button
        class="btn-item"
        type="primary"
        size="medium"
        :disabled="select.length > 0 ? false : true"
        @click="freezeHandle"
      >
        <svg-icon v-if="select.length > 0" icon-class="freeze" class="icon" />
        <svg-icon v-else icon-class="freeze-d" class="icon" />
        {{ $t('freeze') }}
      </el-button>
      <el-button
        class="btn-item"
        :disabled="select.length > 0 ? false : true"
        type="primary"
        size="medium"
        @click="resetPass"
      >
        <svg-icon
          v-if="select.length > 0"
          icon-class="reset-pass"
          class="icon"
        />
        <svg-icon v-else icon-class="reset-pass-d" class="icon" />
        {{ $t('reset-pass') }}
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomeSearcch',
  props: {
    select: Array,
    usernameArr: Array
  },
  data() {
    return {
      username: '',
      timeCategory: '0',
      beginTime: '',
      endTime: ''
    }
  },
  methods: {
    // 搜索
    searchHandle() {
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
        param.endTime = parseInt(String(this.endTime).slice(0, 10))
      }
      this.$emit('searchHandle', param)
    },
    // 续购
    rechargeHandle() {
      this.$emit('rechargeHandle', this.usernameArr)
    },
    // 封号
    freezeHandle() {
      this.$confirm(this.$t('freeze-tip-content'), this.$t('freeze-tip'), {
        confirmButtonText: this.$t('sure'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      })
        .then(() => {
          this.$emit('freezeHandle', this.select, 1)
        })
        .catch(() => {})
    },
    // 重置密码
    resetPass() {
      this.$emit('resetPass', this.select)
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

  .search-btn {
    color: #ff8413;
    border-color: transparent;
    width: 100px;
    border-radius: 8px;
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
