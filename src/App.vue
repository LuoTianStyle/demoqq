<template>
  <router-view v-wechat-title="$t($route.meta.name)" />
</template>

<script>
import { getStorage } from '@/utils/storage.js'
export default {
  name: 'App',
  mounted() {
    this.$i18n.locale = getStorage('lang') || 'en'
  }
}
</script>

<style></style>
