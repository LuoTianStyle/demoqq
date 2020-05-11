<template>
  <div class="table">
    <el-table :data="buyData">
      <el-table-column prop="account" :label="$t('account-no')" />
      <el-table-column prop="createTime" :label="$t('account-number')" />
      <el-table-column prop="production" :label="$t('buy-product')" />
      <el-table-column prop="expericeTime" :label="$t('buy-cost')" />
      <el-table-column :label="$t('do')">
        <template slot-scope="scope">
          <span
            @click="routerTo(scope.row.id)"
            class="accout-list item"
            v-text="$t('account-list')"
          />
          <span class="put-data item" v-text="$t('put-data')" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'BuyTable',
  data() {
    return {
      buyData: [
        {
          id: 1,
          account: 'YG00001',
          createTime: '2020-02-01',
          production: '初中物理',
          expericeTime: '2020-02-01',
          status: '正常'
        },
        {
          id: 2,
          account: 'YG00001',
          createTime: '2020-02-01',
          production: '初中物理',
          expericeTime: '2020-02-01',
          status: '正常'
        },
        {
          id: 3,
          account: 'YG00002',
          createTime: '2020-02-01',
          production: '初中物理',
          expericeTime: '2020-02-01',
          status: '正常'
        },
        {
          id: 4,
          account: 'YG00003',
          createTime: '2020-02-01',
          production: '初中物理',
          expericeTime: '2020-02-01',
          status: '正常'
        },
        {
          id: 5,
          account: 'YG00003',
          createTime: '2020-02-01',
          production: '初中物理',
          expericeTime: '2020-02-01',
          status: '正常'
        }
      ]
    }
  },

  methods: {
    routerTo(e) {
      this.$router.push({
        name: 'List',
        params: {
          id: e
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
}
.item {
  color: #ff8413;
  cursor: pointer;
  &.accout-list {
    margin-right: 20px;
  }
}
</style>
