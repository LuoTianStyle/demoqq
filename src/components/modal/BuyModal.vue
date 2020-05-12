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
      <el-form-item prop="number" class="item">
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
        <el-select v-model="form.product">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
        </el-select>
      </el-form-item>
      <div class="item total">
        <span class="text" v-text="$t('total')" />
        <span class="number" v-text="number" />
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
export default {
  name: 'BuyModal',

  props: {
    show: Boolean,
    title: String
  },
  data() {
    return {
      number: '￡2555.00',
      form: {
        number: '',
        year: '',
        product: '1'
      },
      rules: {
        number: [
          {
            required: true,
            message: this.$t('buy-number-required'),
            trigger: 'blur'
          },
          {
            type: 'number',
            message: this.$t('buy-number-rule'),
            trigger: 'blur'
          }
        ],
        year: [
          {
            required: true,
            message: this.$t('buy-year-required'),
            trigger: 'blur'
          },
          {
            type: 'number',
            message: this.$t('buy-year-rule'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    cancelModal() {
      this.$emit('update:show', false)
    },
    submitForm() {
      this.$emit('submit', this.pass)
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
