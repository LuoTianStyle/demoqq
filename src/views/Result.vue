<template>
  <div class="reslut">
    <div class="result-box" v-if="$route.params.status === 'true'">
      <div>
        <img class="result-img" src="@/assets/imgs/success.png" alt="" />
      </div>
      <div class="result-text" v-text="$t('success-result')" />
      <div>
        <el-button
          type="primary"
          @click="putList()"
          v-text="$t('success-result-btn')"
        />
      </div>
    </div>
    <div class="result-box" v-else>
      <div>
        <img class="result-img" src="@/assets/imgs/failure.png" alt="" />
      </div>
      <div class="result-text" v-text="$t('failure-result')" />
      <div>
        <el-button
          type="primary"
          v-text="$t('failure-result-btn')"
          @click="rePay"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { getPutAccount, getPay } from '@/api'
import { getStorage } from '@/utils/storage'
export default {
  name: 'Result',
  data() {
    return {
      orderSn: '',
      orderId: '',
      category: ''
    }
  },
  watch: {
    '$route.params.id': 'routerHandle'
  },
  methods: {
    routerHandle() {
      if (this.$route.params.status === 'true') {
        this.orderId = this.$route.params.orderId
        this.category = this.$route.params.category
      } else {
        this.orderSn = this.$route.params.orderSn
      }
    },
    async putList() {
      const params = {
        lang: getStorage('lang') || 'en',
        orderId: this.orderId,
        orderCategory: this.category
      }
      const res = await getPutAccount(params)
      window.open(res.data.fileUrl)
    },
    async rePay() {
      const pay = await getPay({ sn: this.orderSn })
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
  },
  mounted() {
    this.routerHandle()
  }
}
</script>
<style lang="less" scoped>
.reslut {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .result-box {
    padding-bottom: 82px;
    .result-img {
      width: 180px;
    }
    .result-text {
      margin: 12px 0 26px 0;
      font-size: 24px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 33px;
    }
  }
}
</style>
