<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <div class="cost">
          <div class="text">消费累计</div>
          <div class="number">{{ number }}</div>
        </div>
        <div class="cost-img">
          <img src="@/assets/imgs/cost.png" alt="" />
        </div>
      </div>
      <div class="buy">
        <div class="context">
          <div class="welcome">欢迎使用</div>
          <div class="here">NOBOOK海外代理商管理后台</div>
          <el-button type="primary" class="to-buy">
            <svg-icon icon-class="buy" class="buy-icon" />
            购买账号
          </el-button>
        </div>
        <div class="buy-img">
          <img src="@/assets/imgs/to-buy.png" alt="" />
        </div>
      </div>
    </div>
    <div class="buy-record">购买记录</div>
    <div class="buy-record-line">
      <div class="buy-record-line-active"></div>
    </div>
    <home-search />
    <buy-table />
    <pagination-bar />
  </div>
</template>
<script>
import HomeSearch from '@/components/home/HomeSearch'
import BuyTable from '@/components/home/BuyTable'
import PaginationBar from '@/components/PaginationBar'
import SvgIcon from '@/components/SvgIcon'
export default {
  name: 'Home',
  components: {
    BuyTable,
    HomeSearch,
    PaginationBar,
    SvgIcon
  },
  data() {
    return {
      number: '￡2555.00'
    }
  }
}
</script>
<style lang="less">
.home {
  .header {
    display: flex;
    .left {
      min-width: 380px;
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
      min-width: 592px;
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
          width: 128px;
          height: 40px;
          line-height: 40px;
          padding: 0;
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
        right: 50px;
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
