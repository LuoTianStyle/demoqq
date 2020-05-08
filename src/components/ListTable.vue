<template>
  <div>
    <div>
      <span>搜索</span>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-date-picker v-model="value1" type="date" placeholder="选择日期">
      </el-date-picker>
      <el-date-picker v-model="value2" type="date" placeholder="选择日期">
      </el-date-picker>
      <el-button type="primary">搜索</el-button>
      <el-button type="primary">续费</el-button>
      <el-button type="primary">封号</el-button>
      <el-button type="primary">重置密码</el-button>
    </div>
    <el-table
      :data="listData"
      :span-method="objectSpanMethod"
      border
      class="table"
    >
      <el-table-column type="selection" />
      <el-table-column prop="account" label="账号" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="production" label="开通产品" />
      <el-table-column prop="expericeTime" label="VIP到期时间" />
      <el-table-column prop="status" label="账号状态" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini">续费{{ scope.row.status }}</el-button>
          <el-button size="mini" type="danger">封号</el-button>
          <el-button size="mini" type="danger">重置密码</el-button>
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
          account: 'YG00001',
          createTime: '2020-02-01',
          production: '初中物理',
          expericeTime: '2020-02-01',
          status: '正常'
        },
        {
          account: 'YG00001',
          createTime: '2020-02-01',
          production: '初中物理',
          expericeTime: '2020-02-01',
          status: '正常'
        },
        {
          account: 'YG00002',
          createTime: '2020-02-01',
          production: '初中物理',
          expericeTime: '2020-02-01',
          status: '正常'
        },
        {
          account: 'YG00003',
          createTime: '2020-02-01',
          production: '初中物理',
          expericeTime: '2020-02-01',
          status: '正常'
        },
        {
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
