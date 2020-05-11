<template>
  <div class="list">
    <div class="list">账号列表</div>
    <div class="return" @click="routerTo">
      返回<i class="el-icon-arrow-right el-icon--right"></i>
    </div>
    <div class="list-line">
      <div class="list-line-active"></div>
    </div>
    <list-table />
    <pagination-bar />
  </div>
</template>
<script>
import ListTable from '@/components/manage/ListTable'
import PaginationBar from '@/components/PaginationBar'
export default {
  name: 'Manage',
  components: {
    ListTable,
    PaginationBar
  },
  data() {
    return {}
  },
  methods: {
    routerTo() {
      this.$router.push('/home')
    }
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
