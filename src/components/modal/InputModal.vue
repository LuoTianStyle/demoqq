<template>
  <el-dialog
    class="pass-dialog"
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
      <el-form-item :label="label" prop="input" class="item">
        <el-input
          v-if="number"
          :placeholder="placeholder"
          v-model.number="form.input"
          autocomplete="off"
        />

        <el-input
          v-else
          :placeholder="placeholder"
          :type="passShow ? 'text' : 'password'"
          v-model="form.input"
          autocomplete="off"
        >
          <i slot="suffix" class="pass-icon" @click="showPass">
            <svg-icon :icon-class="passShow ? 'pass-show' : 'pass-hide'" /> </i
        ></el-input>
      </el-form-item>
      <el-form-item class="submit">
        <el-button @click="cancelModal" class="btn cancle">取消</el-button>
        <el-button type="primary" @click="submitForm('form')" class="btn">
          确定
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import SvgIcon from '@/components/SvgIcon'
export default {
  name: 'PassModal',
  components: {
    SvgIcon
  },
  props: {
    show: Boolean,
    title: String,
    label: String,
    placeholder: String,
    number: String,
    passIds: Array,
    rule: RegExp
  },
  data() {
    const validateInput = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(`请输入${this.title}`))
      } else if (!this.rule.test(value)) {
        callback(new Error(`${this.title}格式有误`))
      } else {
        callback()
      }
    }
    return {
      passShow: false,
      form: {
        input: ''
      },
      rules: {
        input: [
          {
            validator: validateInput,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    'form.input': {
      handler() {
        if (this.title === '设置空间') {
          if (typeof this.form.input !== 'number') {
            this.form.input = 1
          }
        }
      }
    }
  },
  methods: {
    // 显示隐藏
    showPass() {
      this.passShow = !this.passShow
    },
    cancelModal() {
      this.$emit('update:show', false)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('submitHandle', this.form.input)
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.pass-dialog {
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
    .el-form-item__label {
      font-size: 16px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 22px;
      padding-bottom: 12px;
      &:before {
        display: none;
      }
    }
    .el-form-item__error {
      top: 2px;
      right: 0;
      text-align: right;
      padding-left: 130px;
    }
  }
  .item {
    padding: 0 60px;
  }
  .submit {
    margin-bottom: 0;
  }
  .btn {
    height: 36px;
    padding: 0;
    line-height: 36px;
    width: 100px;
    text-align: center;
    display: inline-block;
    margin: 0;
    margin-top: 24px;
    &.cancle {
      margin-right: 24px;
      border-color: rgba(242, 242, 242, 1);
    }
  }
  .pass-icon {
    position: relative;
    top: 2px;
    right: 3px;
    line-height: 44px;
    display: inline-block;
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
