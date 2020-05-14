<template>
  <div class="table">
    <el-table :data="tableData">
      <el-table-column min-width="168" prop="sn" :label="$t('account-no')" />
      <el-table-column
        min-width="145"
        prop="num"
        :label="$t('account-number')"
      />
      <el-table-column min-width="165" :label="$t('buy-product')">
        <template slot-scope="scope">
          <span
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
      <el-table-column min-width="125" prop="money" :label="$t('buy-cost')" />
      <el-table-column min-width="120" :label="$t('pay-status')">
        <template slot-scope="scope">
          <span
            class="un-pay"
            v-if="scope.row.status === 1"
            v-text="$t('pay-status-undo')"
          />
          <span
            class="paid"
            v-if="scope.row.status === 2"
            v-text="$t('pay-status-do')"
          />
          <span
            class="pay-back"
            v-if="scope.row.status === 3"
            v-text="$t('pay-status-back')"
          />
        </template>
      </el-table-column>
      <el-table-column min-width="190" :label="$t('do')">
        <template slot-scope="scope">
          <span
            @click="routerTo(scope.row.id, scope.row.category)"
            class="accout-list item"
            v-text="$t('account-list')"
          />
          <span
            v-if="scope.row.status !== 2"
            class="put-data item"
            v-text="$t('failure-result-btn')"
            @click="rePay(scope.row.sn)"
          />
          <span
            v-else
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
import { getPay } from '@/api'
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
    },
    async rePay(e) {
      const pay = await getPay({ sn: e })
      this.$confirm(
        `${this.$t('route-to')}Paypal Pay?`,
        this.$t('route-to-tip'),
        {
          confirmButtonText: this.$t('sure'),
          cancelButtonText: this.$t('cancel'),
          type: 'warning'
        }
      )
        .then(() => {
          window.open(pay.data.payurl)
        })
        .catch(() => {})
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
.un-pay {
  color: rgba(208, 2, 27, 1);
}
.pay-back {
  color: #ff8413;
}
.paid {
  color: rgba(33, 158, 108, 1);
}
.item {
  color: #ff8413;
  cursor: pointer;
  &.accout-list {
    margin-right: 20px;
  }
}
</style>
