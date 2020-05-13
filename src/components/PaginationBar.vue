<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.page"
      :page-sizes="[1, 10, 20, 50, 100]"
      background
      :page-size="pagination.perPage"
      layout="total, prev, pager, next, sizes"
      :total="pagination.total"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'PaginationBar',
  props: {
    pagination: Object
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('changePagination', {
        page: 1,
        perPage: val
      })
    },
    handleCurrentChange(val) {
      this.$emit('changePagination', {
        page: val,
        perPage: this.pagination.perPage
      })
    }
  }
}
</script>
<style lang="less" scoped>
.pagination {
  text-align: right;
  /deep/ .el-pagination {
    .el-pager {
      li {
        min-width: 32px;
        color: #999;
        background: #fff;
      }
    }
    .btn-prev {
      min-width: 32px;
      color: #999;
      background: #fff;
      border-radius: 8px;
    }
    .btn-next {
      min-width: 32px;
      color: #999;
      background: #fff;
      border-radius: 8px;
    }
    .el-pagination__total {
      color: #999;
    }
    .el-input__inner {
      height: 32px;
      line-height: 32px;
      color: #999;
      border-color: transparent;
    }
  }
}
</style>
