<template>
  <div class="about">
    <div>
      <div>消费累计：</div>
      <div>135.00英镑</div>
    </div>
    <div>
      <el-button>购买账号</el-button>
    </div>
    <div>购买记录</div>
    <buy-table />
  </div>
</template>
<script>
import BuyTable from '@/components/BuyTable'
export default {
  name: 'Home',
  components: {
    BuyTable
  }
}
</script>
<style lang="less"></style>
