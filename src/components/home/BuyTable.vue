<template>
  <div class="table">
    <el-table :data="tableData">
      <el-table-column min-width="248" prop="sn" :label="$t('account-no')" />
      <el-table-column
        min-width="145"
        prop="num"
        :label="$t('account-number')"
      />
      <el-table-column
        min-width="185"
        prop="productName"
        :label="$t('buy-product')"
      />
      <el-table-column min-width="165" prop="money" :label="$t('buy-cost')" />
      <el-table-column min-width="185" :label="$t('do')">
        <template slot-scope="scope">
          <span
            @click="routerTo(scope.row.id, scope.row.category)"
            class="accout-list item"
            v-text="$t('account-list')"
          />
          <span
            class="put-data item"
            v-text="$t('put-data')"
            @click="putList(scope.row.id, scope.row.category)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'BuyTable',
  props: {
    tableData: Array
  },
  methods: {
    // 导出
    putList(id, category) {
      this.$emit('putList', 2, id, category)
    },
    // 账号列表
    routerTo(id, category) {
      this.$router.push({
        name: 'List',
        params: {
          id,
          category
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.el-table {
  border-radius: 12px;
  &::before {
    height: 0;
  }
  .cell {
    text-align: center;
  }
  th {
    padding: 23px 0;
  }
  td {
    padding: 18px 0;
  }
}
.table {
  margin-bottom: 30px;
  min-width: 928px;
}
.item {
  color: #ff8413;
  cursor: pointer;
  &.accout-list {
    margin-right: 20px;
  }
}
</style>
