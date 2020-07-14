<template>
  <div class="table">
    <el-table border-spacing="100" :data="tableData">
      <el-table-column prop="username" label="用户名" min-width="130" />
      <el-table-column prop="createAt" label="添加时间" min-width="127" />
      <el-table-column prop="email" label="邮箱" min-width="185" />
      <el-table-column label="操作" min-width="205">
        <template slot-scope="scope">
          <span @click="toSee(scope.row.id)" class="item">
            查看空间
          </span>
          <span class="item" @click="toSet(scope.row.id)">
            设置空间
          </span>
          <span class="pass-change item" @click="resetPass(scope.row.id)">
            修改密码
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'ListTable',
  props: {
    tableData: Array
  },
  methods: {
    // 查看
    toSee(e) {
      window.open(e)
    },
    // 设置
    toSet(id) {
      this.$emit('setZoom', id)
    },
    // 重置密码
    resetPass(id) {
      this.$emit('resetPass', id)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-table {
  &::before {
    height: 0;
  }
  table {
    border-spacing: 0px 8px;
  }
  tr {
    background: #fff;
    th {
      padding: 15px 0;
    }
    td {
      padding: 18px 0;
    }
    &:hover {
      &.el-table__row {
        td {
          background: #f6f9fd;
          &:first-child {
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
          }
          &:last-child {
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
          }
        }
      }
    }
  }
}
.table {
  border-radius: 12px;
  padding: 0 15px 6px 15px;
  background: #fff;
  margin-bottom: 30px;
  min-width: 928px;
}
.normal {
  padding: 0 10px;
  height: 23px;
  background: rgba(33, 158, 108, 0.15);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(33, 158, 108, 1);
  line-height: 23px;
  display: inline-block;
}
.freeze {
  padding: 0 8px;
  height: 23px;
  background: rgba(208, 2, 27, 0.15);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(208, 2, 27, 1);
  line-height: 23px;
  display: inline-block;
}
.item {
  color: #409eff;
  cursor: pointer;
  margin-right: 15px;

  &.unfreeze {
    color: rgba(33, 158, 108, 1);
  }
  &.pass-change {
    margin-right: 0;
  }
  &:hover {
    opacity: 0.6;
  }
  &.disabled {
    color: #999;
    cursor: not-allowed;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
