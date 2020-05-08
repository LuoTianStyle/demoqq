<template>
  <div class="list">
    <div><el-button>返回</el-button><span>账号列表</span></div>
    <list-table />
  </div>
</template>
<script>
import ListTable from '@/components/ListTable'
export default {
  name: 'Manage',
  components: {
    ListTable
  },
  data() {
    return {}
  }
}
</script>
