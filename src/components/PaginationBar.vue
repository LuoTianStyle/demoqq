<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 50, 100]"
      background
      :page-size="10"
      layout="total, prev, pager, next, sizes"
      :total="400"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'myNeedDeal',
  data() {
    return {
      currentPage4: 4
    }
  },

  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
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
