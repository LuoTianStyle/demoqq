<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <div class="cost">
          <div class="text" v-text="$t('cost-total')" />
          <div class="number">{{ number }}</div>
        </div>
        <div class="cost-img">
          <img src="@/assets/imgs/cost.png" alt="" />
        </div>
      </div>
      <div class="buy">
        <div class="context">
          <div class="welcome" v-text="$t('welcome')" />
          <div class="here" v-text="$t('come-to')" />
          <el-button type="primary" class="to-buy" @click="modalShow = true">
            <svg-icon icon-class="buy" class="buy-icon" />
            {{ $t('buy-account') }}
          </el-button>
        </div>
        <div class="buy-img">
          <img src="@/assets/imgs/to-buy.png" alt="" />
        </div>
      </div>
    </div>
    <div class="buy-record" v-text="$t('buy-record')" />
    <div class="buy-record-line">
      <div class="buy-record-line-active"></div>
    </div>
    <home-search @searchHandle="searchHandle" @putList="putList" />
    <buy-table :tableData="tableData" @putList="putList" />
    <pagination-bar
      :pagination="pagination"
      @changePagination="changePagination"
    />
    <buy-modal
      :show.sync="modalShow"
      v-if="modalShow"
      :title="$t('buy-account')"
    />
  </div>
</template>
<script>
import { getOrder, getPutList, getPutAccount } from '@/api'
import { getStorage } from '@/utils/storage'
import HomeSearch from '@/components/home/HomeSearch'
import BuyModal from '@/components/modal/BuyModal'
import BuyTable from '@/components/home/BuyTable'
import PaginationBar from '@/components/PaginationBar'
import SvgIcon from '@/components/SvgIcon'
export default {
  name: 'Home',
  components: {
    BuyTable,
    HomeSearch,
    PaginationBar,
    SvgIcon,
    BuyModal
  },
  data() {
    return {
      modalShow: false,
      number: '￡2555.00',
      tableData: [],
      pagination: {
        total: 0,
        page: 1,
        perPage: 10
      },
      time: {
        beginTime: 0,
        endTime: 0
      }
    }
  },
  methods: {
    // 导出
    async putList(e, id, category) {
      if (e === 1) {
        const params = {}
        if (this.time.beginTime) {
          params.beginTime = this.time.beginTime
        }
        if (this.time.endTime) {
          params.endTime = this.time.endTime
        }
        const res = await getPutList(params)
        window.open(res.data.fileUrl)
      } else {
        const params = {
          orderId: id,
          orderCategory: category
        }
        const res = await getPutAccount(params)
        window.open(res.data.fileUrl)
      }
    },
    // 获取数据
    async getList() {
      const params = {
        page: this.pagination.page,
        perPage: this.pagination.perPage
      }
      if (this.time.beginTime) {
        params.beginTime = this.time.beginTime
      }
      if (this.time.endTime) {
        params.endTime = this.time.endTime
      }
      const res = await getOrder(params)
      this.tableData = res.data.data.map(item => {
        item.money = getStorage('userData').unit + item.money
        return item
      })
      this.pagination.total = res.data.total
    },
    // 搜索
    searchHandle(e) {
      this.pagination.page = 1
      this.time.beginTime = e.beginTime
      this.time.endTime = e.endTime
      this.getList()
    },
    // 分页变换
    changePagination(e) {
      this.pagination.page = e.page
      this.pagination.perPage = e.perPage
      this.getList()
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
<style lang="less">
.home {
  .header {
    display: flex;
    .left {
      min-width: 445px;
      margin-top: 15px;
      margin-right: 32px;
      display: flex;
      position: relative;
      padding: 40px 115px 0 32px;
      box-sizing: border-box;
      height: 160px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 10px 0px rgba(16, 12, 61, 0.05);
      border-radius: 12px;
      .cost {
        .text {
          font-size: 16px;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
          line-height: 22px;
        }
        .number {
          font-size: 42px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 59px;
          word-break: break-all;
        }
      }
      .cost-img {
        position: absolute;
        top: 44px;
        right: 32px;
        width: 72px;
        img {
          width: 72px;
        }
      }
    }
    .buy {
      min-width: 475px;
      position: relative;
      flex: 1;
      display: flex;
      box-sizing: border-box;
      padding-left: 53px;
      height: 160px;
      margin-top: 15px;
      background: rgba(242, 226, 213, 1);
      box-shadow: 0px 2px 10px 0px rgba(16, 12, 61, 0.1);
      border-radius: 12px;
      .context {
        .welcome {
          font-size: 20px;
          font-weight: 500;
          color: #333;
          margin-top: 28px;
        }
        .here {
          margin-top: 8px;
          font-size: 18px;
          font-weight: 400;
          color: #666;
        }
        .to-buy {
          margin-top: 24px;
          height: 40px;
          line-height: 40px;
          padding: 0 10px;
          font-size: 18px;
          font-weight: 300;
          border-radius: 12px;
          .buy-icon {
            position: relative;
            top: 2px;
            margin-right: 5px;
          }
        }
      }
      .buy-img {
        position: absolute;
        top: -15px;
        right: 10%;
        img {
          width: 249px;
        }
      }
    }
  }
  .buy-record {
    font-size: 20px;
    font-weight: 500;
    color: rgba(51, 53, 57, 1);
    line-height: 28px;
    padding: 32px 0 8px 0;
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
