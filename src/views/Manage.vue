<template>
  <div class="manage">
    <manage-search @searchHandle="searchHandle" />
    <list-table
      :tableData="tableData"
      @setZoom="setZoom"
      @resetPass="resetPass"
    />
    <pagination-bar
      :pagination="pagination"
      @changePagination="changePagination"
    />
    <input-modal
      @submitHandle="submitPass"
      :show.sync="passModalShow"
      v-if="passModalShow"
      title="重置密码"
      label="新密码"
      placeholder="请输入新密码"
      :rule="rule.passRule"
    />
    <input-modal
      @submitHandle="submitZoom"
      :show.sync="zoomModalShow"
      v-if="zoomModalShow"
      title="设置空间"
      label="空间大小"
      placeholder="请输入空间大小(MB)"
      number="number"
      :rule="rule.zoomRule"
    />
  </div>
</template>
<script>
import InputModal from '@/components/modal/InputModal.vue'
import ManageSearch from '@/components/manage/ManageSearch'
import ListTable from '@/components/manage/ListTable'
import PaginationBar from '@/components/PaginationBar'
import { getList, postResetPass, postSetZoom } from '@/api'
import { dataFormat } from '@/utils/time'
import rules from '@/utils/rule'
export default {
  name: 'Manage',
  components: {
    ListTable,
    ManageSearch,
    PaginationBar,
    InputModal
  },
  data() {
    return {
      passModalShow: false,
      zoomModalShow: false,
      rule: {},
      tableData: [],
      id: '',
      pagination: {
        total: 0,
        page: 1,
        perPage: 10
      },
      params: {
        username: '',
        timeCategory: 0,
        beginTime: '',
        endTime: ''
      }
    }
  },
  methods: {
    async getList() {
      const params = {
        page: this.pagination.page,
        perPage: this.pagination.perPage,
        searchParam: []
      }
      if (this.params.username) {
        params.searchParam.push({
          searchColumn: 'username',
          searchOperator: 'like',
          searchValue: this.params.username
        })
      }
      if (this.params.beginTime) {
        params.searchParam.push({
          searchColumn: 'createAt',
          searchOperator: '<=',
          searchValue: this.params.beginTime
        })
      }
      if (this.params.endTime) {
        params.searchParam.push({
          searchColumn: 'createAt',
          searchOperator: '>=',
          searchValue: this.params.endTime
        })
      }

      const res = await getList(params)
      console.log(res)
      this.tableData = res.data.data.map(item => {
        item.createAt = item.createAt ? dataFormat(item.createAt) : '-'
        return item
      })
      this.pagination.total = res.data.total
    },
    // 搜索
    searchHandle(e) {
      this.pagination.page = 1
      this.params = e
      this.getList()
    },
    // 分页变换
    changePagination(e) {
      this.pagination.page = e.page
      this.pagination.perPage = e.perPage
      this.getList()
    },
    // 设置空间
    setZoom(e) {
      this.id = e
      this.zoomModalShow = true
    },

    // 设置空间提交

    async submitZoom(e) {
      const params = {
        id: this.id,
        space: e
      }
      await postSetZoom(params)
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      this.zoomModalShow = false
    },
    // 重置密码
    resetPass(e) {
      this.id = e
      this.passModalShow = true
    },
    // 重置密码提交
    async submitPass(e) {
      const params = {
        id: this.id,
        password: e
      }
      await postResetPass(params)
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      this.passModalShow = false
    }
  },
  mounted() {
    this.getList()
    this.rule = rules
  }
}
</script>
<style lang="less">
.manage {
  .buy-record {
    font-size: 20px;
    font-weight: 500;
    color: rgba(51, 53, 57, 1);
    line-height: 28px;
    padding: 15px 0 8px 0;
  }
  .buy-record-line {
    position: relative;
    width: 100%;
    height: 2px;
    background: rgb(230, 230, 230);
    border-radius: 2px;
    margin-bottom: 33px;
    .buy-record-line-active {
      position: absolute;
      top: -1px;
      left: 1px;
      width: 48px;
      height: 4px;
      background: #409eff;
      border-radius: 2px;
    }
  }
}
</style>
