<template>
  <el-dialog
    class="result-dialog"
    :visible.sync="show"
    destroy-on-close
    :before-close="cancelModal"
    :lock-scroll="false"
    :append-to-body="provide"
    title=""
  >
    <div class="result-box" v-if="type === 1">
      <div>
        <img class="result-img" src="@/assets/imgs/success.png" alt="" />
      </div>
      <div class="result-text" v-text="$t('success-result')" />
      <div>
        <el-button
          type="primary"
          @click="submitForm('form')"
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
          @click="submitForm('form')"
          v-text="$t('failure-result-btn')"
        />
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'ResultModal',
  props: {
    show: Boolean,
    type: Number
  },
  data() {
    return {
      provide: true
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
.result-dialog {
  /deep/.el-dialog {
    width: 540px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 !important;
    transform: translate(-50%, -50%);
    border-radius: 12px;
    .el-form-item__content {
      text-align: center;
    }
    .el-dialog__body {
      padding-bottom: 68px;
    }
  }
  .result-box {
    text-align: center;
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
