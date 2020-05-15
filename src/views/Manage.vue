<template>
  <div class="manage">
    <div class="buy-record" v-text="$t('account-manage')"></div>
    <div class="buy-record-line">
      <div class="buy-record-line-active"></div>
    </div>
    <manage-search
      :select="select"
      :usernameArr="usernameArr"
      @searchHandle="searchHandle"
      @rechargeHandle="rechargeHandle"
      @freezeHandle="freezeHandle"
      @resetPass="resetPass"
    />
    <list-table
      :tableData="tableData"
      @selectHandle="selectHandle"
      @rechargeHandle="rechargeHandle"
      @freezeHandle="freezeHandle"
      @resetPass="resetPass"
    />
    <pagination-bar
      :pagination="pagination"
      @changePagination="changePagination"
    />
    <pass-modal
      @submitPass="submitPass"
      :show.sync="passModalShow"
      v-if="passModalShow"
      :title="$t('reset-pass')"
    />
    <buy-modal
      :show.sync="buyModalShow"
      v-if="buyModalShow"
      :title="$t('buy-account-second')"
      :usernameArr="usernameArr"
    />
  </div>
</template>
<script>
import PassModal from '@/components/modal/PassModal.vue'
import ManageSearch from '@/components/manage/ManageSearch'
import ListTable from '@/components/manage/ListTable'
import PaginationBar from '@/components/PaginationBar'
import BuyModal from '@/components/modal/BuyModal'
import { getList, postResetPass, postLocked } from '@/api'
import { dataFormat } from '@/utils/time'
export default {
  name: 'Manage',
  components: {
    ListTable,
    ManageSearch,
    PaginationBar,
    PassModal,
    BuyModal
  },
  data() {
    return {
      buyModalShow: false,
      passModalShow: false,
      tableData: [],
      select: [],
      passIds: [],
      usernameArr: [],
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
      const pagination = {
        page: this.pagination.page,
        perPage: this.pagination.perPage
      }
      const search = {}
      if (this.params.username) {
        search.username = this.params.username
      }
      if (this.params.beginTime) {
        search.beginTime = this.params.beginTime
      }
      if (this.params.endTime) {
        search.endTime = this.params.endTime
      }
      if (this.params.endTime || this.params.beginTime) {
        search.timeCategory = this.params.timeCategory
      }
      const params = Object.assign(pagination, search)
      const res = await getList(params)
      this.tableData = res.data.data.map(item => {
        item.createAt = dataFormat(item.createAt)
        item.userVip.forEach(item => {
          item.vipEndTime = dataFormat(item.vipEndTime)
        })
        return item
      })
      this.pagination.total = res.data.total
    },
    // 搜索
    searchHandle(e) {
      this.select = []
      this.pagination.page = 1
      this.params = e
      this.getList()
    },
    // 分页变换
    changePagination(e) {
      this.select = []
      this.pagination.page = e.page
      this.pagination.perPage = e.perPage
      this.getList()
    },
    // 选中变化
    selectHandle(e, user) {
      this.select = e
      this.usernameArr = user
    },

    // 续购
    rechargeHandle(e) {
      this.usernameArr = e
      this.buyModalShow = true
    },
    // 冻结
    async freezeHandle(id, status) {
      const params = {
        userIds: id,
        status: status
      }
      await postLocked(params)
      await this.getList()
      this.$message({
        message: this.$t('do-success'),
        type: 'success'
      })
    },
    // 重置密码
    resetPass(e) {
      this.passIds = e
      this.passModalShow = true
    },
    // 重置密码提交
    async submitPass(e) {
      const params = {
        userIds: this.passIds,
        password: e
      }
      await postResetPass(params)
      this.$message({
        message: this.$t('do-success'),
        type: 'success'
      })
      this.passModalShow = false
    }
  },
  mounted() {
    this.getList()
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
      background: rgb(255, 132, 19);
      border-radius: 2px;
    }
  }
}
</style>
