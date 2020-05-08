<template>
  <div>
    <div>
      <span>搜索</span>
      <el-date-picker v-model="value1" type="date" placeholder="选择日期">
      </el-date-picker>
      <el-date-picker v-model="value2" type="date" placeholder="选择日期">
      </el-date-picker>
      <el-button type="primary">搜索</el-button>
      <el-button type="primary">导出</el-button>
    </div>
    <el-table
      :data="listData"
      :span-method="objectSpanMethod"
      border
      class="table"
    >
      <el-table-column prop="account" label="订单编号" />
      <el-table-column prop="createTime" label="账号数量" />
      <el-table-column prop="production" label="购买产品" />
      <el-table-column prop="expericeTime" label="购买金额" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="routerTo(scope.row.id)"
            >账号列表</el-button
          >
          <el-button size="mini" type="danger">导出</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
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
      value: '',
      value1: '',
      value2: '',
      currentPage4: 4,
      rowList: [],
      spanArr: [],
      position: 0,
      listData: [
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    rowspan() {
      this.listData.forEach((item, index) => {
        if (index === 0) {
          this.spanArr.push(1)
          this.position = 0
        } else {
          if (
            this.listData[index].account === this.listData[index - 1].account
          ) {
            this.spanArr[this.position] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.position = index
          }
        }
      })
    },
    objectSpanMethod(obj) {
      if (obj.columnIndex !== 3 && obj.columnIndex !== 4) {
        const rowspan = this.spanArr[obj.rowIndex]
        const colspan = rowspan > 0 ? 1 : 0
        return {
          rowspan,
          colspan
        }
      }
    },
    routerTo(e) {
      this.$router.push({
        name: 'List',
        params: {
          id: e
        }
      })
    }
  },
  mounted() {
    this.rowspan()
  }
}
</script>
<style lang="less" scoped>
/deep/.el-table {
  .cell {
    text-align: center;
  }
}
</style>
