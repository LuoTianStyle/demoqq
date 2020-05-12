<template>
  <div class="manage">
    <div class="buy-record" v-text="$t('account-manage')"></div>
    <div class="buy-record-line">
      <div class="buy-record-line-active"></div>
    </div>
    <manage-search />
    <list-table />
    <pagination-bar />
  </div>
</template>
<script>
import ManageSearch from '@/components/manage/ManageSearch'
import ListTable from '@/components/manage/ListTable'
import PaginationBar from '@/components/PaginationBar'

export default {
  name: 'Manage',
  components: {
    ListTable,
    ManageSearch,
    PaginationBar
  },
  data() {
    return {
      number: '￡2555.00'
    }
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
