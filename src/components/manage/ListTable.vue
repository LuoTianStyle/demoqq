<template>
  <div class="table">
    <el-table
      :data="listData"
      @selection-change="handleSelectionChange"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        type="selection"
        width="55"
        v-if="$route.path === '/manage'"
      />
      <el-table-column prop="account" :label="$t('username')" />
      <el-table-column prop="createTime" :label="$t('create-time')" />
      <el-table-column prop="production" :label="$t('open-product')" />
      <el-table-column prop="expericeTime" :label="$t('expire-time')" />
      <el-table-column prop="status" :label="$t('status')">
        <template slot-scope="scope">
          <span
            v-if="scope.row.id === 1"
            class="normal"
            v-text="$t('normal')"
          />
          <span v-else class="freeze" v-text="$t('freeze')" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('do')">
        <template slot-scope="scope">
          <span
            @click="routerTo(scope.row.id)"
            class="item"
            v-text="$t('recharge')"
          />
          <span class=" item" v-text="$t('freeze')" @click="freezeHandle" />
          <span class="pass-change item" v-text="$t('pass-change')" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'ListTable',
  data() {
    return {
      select: [],
      listData: []
    }
  },

  methods: {
    tableRowClassName(obj) {
      if (this.select.indexOf(obj.rowIndex) !== -1) {
        return 'warning-row'
      }
      return ''
    },
    routerTo(e) {
      this.$router.push({
        name: 'List',
        params: {
          id: e
        }
      })
    },
    handleSelectionChange(val) {
      this.select = []
      this.listData.forEach((item, index) => {
        val.forEach(itemIn => {
          if (itemIn.id === item.id) {
            this.select.push(index)
          }
        })
      })
    },
    freezeHandle() {
      this.$confirm(this.$t('freeze-tip-content'), this.$t('freeze-tip'), {
        confirmButtonText: this.$t('sure'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      })
        .then(() => {})
        .catch(() => {})
    }
  }
}
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}
</style>
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
.normal {
  width: 58px;
  height: 24px;
  background: rgba(33, 158, 108, 0.15);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(33, 158, 108, 1);
  line-height: 24px;
  display: inline-block;
}
.freeze {
  width: 58px;
  height: 24px;
  background: rgba(208, 2, 27, 0.15);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(208, 2, 27, 1);
  line-height: 24px;
  display: inline-block;
}
.item {
  color: #ff8413;
  cursor: pointer;
  margin-right: 10px;
  &.pass-change {
    margin-right: 0;
  }
}
</style>
