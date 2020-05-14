<template>
  <div class="table">
    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        type="selection"
        width="55"
        v-if="$route.path === '/manage'"
      />
      <el-table-column
        prop="username"
        :label="$t('username')"
        min-width="130"
      />
      <el-table-column
        prop="createAt"
        :label="$t('create-time')"
        min-width="115"
      />
      <el-table-column :label="$t('open-product')" min-width="140">
        <template slot-scope="scope">
          <div
            v-for="item in scope.row.userVip"
            :key="item.id"
            v-text="
              $i18n.locale === 'en'
                ? scope.row.productEnglishName
                : $i18n.locale === 'zhCN'
                ? scope.row.productName
                : scope.row.productTcName
            "
          />
        </template>
      </el-table-column>
      <el-table-column :label="$t('expire-time')" min-width="130">
        <template slot-scope="scope">
          <div
            v-for="item in scope.row.userVip"
            :key="item.id"
            v-text="item.vipEndTime"
          />
        </template>
      </el-table-column>
      <el-table-column :label="$t('status')" min-width="100">
        <template slot-scope="scope">
          <span
            v-if="scope.row.status === 0"
            class="normal"
            v-text="$t('normal')"
          />
          <span v-else class="freeze" v-text="$t('freeze')" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('do')" min-width="255">
        <template slot-scope="scope">
          <span
            @click="rechargeHandle(scope.row.username)"
            class="item"
            v-text="$t('recharge')"
          />
          <span
            :class="scope.row.status === 0 ? 'item' : 'item unfreeze'"
            v-text="scope.row.status === 0 ? $t('freeze') : $t('un-freeze')"
            @click="freezeHandle(scope.row.id, scope.row.status)"
          />
          <span
            class="pass-change item"
            v-text="$t('reset-pass')"
            @click="resetPass(scope.row.id)"
          />
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
  data() {
    return {
      select: [],
      username: []
    }
  },

  methods: {
    // 表格选中
    tableRowClassName(obj) {
      if (this.select.indexOf(obj.rowIndex) !== -1) {
        return 'warning-row'
      }
      return ''
    },

    // 表格选中
    handleSelectionChange(val) {
      this.select = []
      this.username = []
      this.tableData.forEach(item => {
        val.forEach(itemIn => {
          if (itemIn.id === item.id) {
            this.select.push(item.id)
            this.username.push(item.username)
          }
        })
      })
      this.$emit('selectHandle', this.select, this.username)
    },
    // 续购
    rechargeHandle(e) {
      this.$emit('rechargeHandle', [e])
    },
    // 封号
    freezeHandle(id, status) {
      const text =
        status === 0
          ? this.$t('freeze-tip-content')
          : this.$t('freeze-tip2-content')
      const tip = status === 0 ? this.$t('freeze-tip') : this.$t('freeze-tip1')
      this.$confirm(text, tip, {
        confirmButtonText: this.$t('sure'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      })
        .then(() => {
          const st = status === 1 ? 0 : 1
          this.$emit('freezeHandle', [id], st)
        })
        .catch(() => {})
    },
    // 重置密码
    resetPass(id) {
      this.$emit('resetPass', [id])
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
  margin-right: 15px;
  &.unfreeze {
    color: rgba(33, 158, 108, 1);
  }
  &.pass-change {
    margin-right: 0;
  }
}
</style>
