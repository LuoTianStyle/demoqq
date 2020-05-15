<template>
  <div class="list">
    <div class="list" v-text="$t('account-list')" />
    <div class="return" @click="routerTo">
      {{ $t('return') }}<i class="el-icon-arrow-right el-icon--right"></i>
    </div>
    <div class="list-line">
      <div class="list-line-active"></div>
    </div>
    <list-table
      :tableData="tableData"
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
import BuyModal from '@/components/modal/BuyModal.vue'
import ListTable from '@/components/manage/ListTable'
import PaginationBar from '@/components/PaginationBar'
import { getList, postResetPass, postLocked } from '@/api'
import { dataFormat } from '@/utils/time'
export default {
  name: 'Manage',
  components: {
    ListTable,
    PaginationBar,
    BuyModal,
    PassModal
  },
  data() {
    return {
      passModalShow: false,
      buyModalShow: false,
      tableData: [],
      usernameArr: [],
      pagination: {
        total: 0,
        page: 1,
        perPage: 10
      }
    }
  },
  methods: {
    routerTo() {
      this.$router.push('/home')
    },
    async getList(e = {}) {
      const pagination = {
        page: this.pagination.page,
        perPage: this.pagination.perPage
      }
      const params = Object.assign(pagination, e)
      params.orderId = this.$route.params.id
      params.orderCategory = this.$route.params.category
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
    changePagination(e) {
      this.pagination.page = e.page
      this.pagination.perPage = e.perPage
      this.getList()
    },
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
<style lang="less" scoped>
.list {
  position: relative;
  font-size: 20px;
  font-weight: 500;
  color: rgba(51, 53, 57, 1);
  line-height: 28px;
  padding: 15px 0 8px 0;
  .return {
    position: absolute;
    top: 34px;
    right: 0;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 20px;
  }
}
.list-line {
  position: relative;
  width: 100%;
  height: 2px;
  background: rgb(230, 230, 230);
  border-radius: 2px;
  margin-bottom: 33px;
  .list-line-active {
    position: absolute;
    top: -1px;
    left: 1px;
    width: 48px;
    height: 4px;
    background: rgb(255, 132, 19);
    border-radius: 2px;
  }
}
</style>
