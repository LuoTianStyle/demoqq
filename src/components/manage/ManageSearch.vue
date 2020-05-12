<template>
  <div class="search">
    <el-input
      :placeholder="$t('search-input-placehold')"
      clearable
      v-model="input"
      class="search-content"
    >
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <el-select v-model="value" class="select">
      <el-option :label="$t('create-time')" value="1" />
      <el-option :label="$t('expire-time1')" value="2" />
    </el-select>
    <el-date-picker
      v-model="startTime"
      type="date"
      :placeholder="$t('search-time-start')"
      class="data-item"
    />
    <el-date-picker
      v-model="endTime"
      type="date"
      :placeholder="$t('search-time-end')"
      class="data-item"
    />
    <el-button class="search-btn" size="medium" v-text="$t('search-btn')" />
    <div class="put">
      <el-button type="primary" size="medium">
        <svg-icon icon-class="recharge" class="icon" />
        {{ $t('recharge') }}
      </el-button>
      <el-button type="primary" size="medium">
        <svg-icon icon-class="freeze" class="icon" />
        {{ $t('freeze') }}
      </el-button>
      <el-button type="primary" size="medium">
        <svg-icon icon-class="reset-pass" class="icon" />
        {{ $t('reset-pass') }}
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomeSearcch',
  data() {
    return {
      input: '',
      value: '1',
      startTime: '',
      endTime: ''
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
  }
  .put {
    position: absolute;
    right: 0;
    top: 0;
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
  }
}
</style>
