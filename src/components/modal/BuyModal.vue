<template>
  <el-dialog
    class="buy-dialog"
    :title="title"
    :visible.sync="show"
    width="540px"
    destroy-on-close
    :before-close="cancelModal"
    :modal-append-to-body="false"
    :lock-scroll="false"
  >
    <el-form :model="form" :rules="rules" ref="form">
      <div class="buy-record-line">
        <div class="buy-record-line-active"></div>
      </div>
      <el-form-item class="item" v-if="usernameArr">
        <el-input v-model="ids" disabled />
      </el-form-item>
      <el-form-item prop="number" class="item" v-if="!usernameArr">
        <el-input
          :placeholder="$t('buy-number-required')"
          v-model.number="form.number"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="year" class="item">
        <el-input
          :placeholder="$t('buy-year-required')"
          v-model.number="form.year"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="product" class="item">
        <el-select v-model="form.product" value-key="id">
          <el-option
            v-for="item in product"
            :key="item.id"
            :label="item.nameTmp"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <div class="item total">
        <span class="text" v-text="$t('total')" />
        <span class="number">{{ unit }}{{ number || 0 }}</span>
      </div>
      <el-form-item class="submit">
        <el-button
          type="primary"
          @click="submitForm('form')"
          v-text="$t('pay')"
          class="btn"
        />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { createOrder, getProduct, createRenew, getPay } from '@/api'
import { getStorage } from '@/utils/storage'

export default {
  name: 'BuyModal',
  props: {
    show: Boolean,
    title: String,
    usernameArr: Array
  },

  data() {
    const checkNumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('buy-number-required')))
      } else if (value <= 0 || !value) {
        callback(new Error(this.$t('buy-number-rule')))
      } else if (value > 500 || value === Infinity) {
        callback(new Error(this.$t('buy-number-rule-max')))
      } else {
        callback()
      }
    }
    const checkYear = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('buy-year-required')))
      } else if (value <= 0 || !value) {
        callback(new Error(this.$t('buy-year-rule')))
      } else if (value > 30 || value === Infinity) {
        callback(new Error(this.$t('buy-year-rule-max')))
      } else {
        callback()
      }
    }
    return {
      resultShow: false,
      price: 0,
      unit: '',
      product: [],
      ids: '',
      idLength: 1,
      form: {
        number: '',
        year: '',
        product: {}
      },
      rules: {
        number: [
          {
            type: 'number',
            message: this.$t('buy-number-rule'),
            trigger: 'blur'
          },
          {
            validator: checkNumber,
            trigger: 'blur'
          }
        ],
        year: [
          {
            type: 'number',
            message: this.$t('buy-year-rule'),
            trigger: 'blur'
          },
          {
            validator: checkYear,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    number() {
      return this.form.number * this.form.year * this.price
    }
  },
  watch: {
    usernameArr: {
      handler() {
        if (this.usernameArr) {
          this.ids = this.usernameArr.join(',')
          this.form.number = this.usernameArr.length
        }
      },
      deep: true
    },
    'form.product': {
      handler() {
        this.price = this.form.product.price
      },
      deep: true
    },
    'form.number': {
      handler() {
        if (this.form.number > 500) {
          this.form.number = 500
        }
      }
    },
    'form.year': {
      handler() {
        if (this.form.year > 30) {
          this.form.year = 30
        }
      }
    }
  },
  methods: {
    cancelModal() {
      this.$emit('update:show', false)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.usernameArr) {
            this.createOrderThen()
            return
          }
          this.createOrder()
        } else {
          return false
        }
      })
    },
    async pay(e) {
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
          this.$emit('update:show', false)
          window.open(pay.data.payurl)
        })
        .catch(() => {
          this.$emit('update:show', false)
        })
    },
    async createOrder() {
      const parmas = {
        times: this.form.year,
        num: this.form.number,
        productId: this.form.product.id
      }
      const res = await createOrder(parmas)
      this.pay(res.data.sn)
    },
    async createOrderThen() {
      const parmas = {
        times: this.form.year,
        usernameArr: this.usernameArr,
        productId: this.form.product.id
      }
      const res = await createRenew(parmas)
      this.pay(res.data.sn)
    },
    async getList() {
      if (!this.$store.state.product.length) {
        const res = await getProduct()
        this.$store.commit('setProduct', res.data)
      }
      this.product = this.$store.state.product.map(item => {
        const lang = getStorage('lang')
        const name =
          lang === 'zhCN'
            ? item.name
            : lang === 'zhTW'
            ? item.tcName
            : item.englishName
        item.nameTmp = name
        return item
      })
      this.form.product = this.product[0]
      this.price = this.form.product.price
    }
  },
  mounted() {
    this.unit = getStorage('userData').unit
    this.getList()
    if (this.usernameArr) {
      this.ids = this.usernameArr.join(',')
      this.form.number = this.usernameArr.length
    }
  }
}
</script>
<style lang="less" scoped>
.buy-dialog {
  /deep/.el-select {
    width: 380px;
  }
  /deep/.el-input__inner {
    height: 44px;
    line-height: 44px;
  }
  /deep/.el-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 !important;
    transform: translate(-50%, -50%);
    border-radius: 12px;
    .el-dialog__header {
      padding: 20px 24px;
    }
    .el-dialog__body {
      padding-top: 0;
      padding-bottom: 26px;
    }
    .el-dialog__title {
      font-size: 18px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 25px;
    }
    .el-form-item__content {
      text-align: center;
    }
    .el-form-item__error {
      top: -20px;
      left: 0px;
    }
  }
  .item {
    padding: 0 60px;
    margin-bottom: 32px;
  }
  .submit {
    margin-bottom: 0;
  }
  .total {
    margin-bottom: 3px;
    .text {
      font-size: 14px;
      color: #333;
    }
    .number {
      font-size: 24px;
      color: #ff8413;
      margin-left: 5px;
    }
  }
  .btn {
    height: 36px;
    padding: 0;
    line-height: 36px;
    width: 120px;
    text-align: center;
    display: inline-block;
    margin: 0;
    margin-top: 24px;
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
