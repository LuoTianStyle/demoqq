<template>
  <div class="search">
    <el-input
      placeholder="请输入要搜索的账号"
      clearable
      v-model="input"
      class="search-content"
    >
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <el-select v-model="value" placeholder="请选择" class="select">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
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
      options: [
        {
          value: '1',
          label: '创建时间'
        },
        {
          value: '2',
          label: '到期时间'
        }
      ],
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
}
.search {
  margin-bottom: 24px;
  position: relative;
  .data-item {
    cursor: pointer;
    width: 150px;
    margin-right: 12px;
  }
  .search-content {
    width: 200px;
    margin-right: 12px;
  }
  .select {
    width: 120px;
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
  .search-btn {
    color: #ff8413;
    border-color: transparent;
    width: 100px;
  }
}
</style>
