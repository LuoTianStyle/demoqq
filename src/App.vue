<template>
  <router-view v-wechat-title="$t($route.meta.name)" />
</template>

<script>
import { getStorage, setStorage } from '@/utils/storage.js'
export default {
  name: 'App',
  mounted() {
    const lang = navigator.language || navigator.userLanguage
    if (lang === 'zh-CN' || lang === 'zh-SG') {
      setStorage('lang', 'zhCN')
    } else if (
      lang === 'zh-TW' ||
      lang === 'zh-HK' ||
      lang === 'zh-MO' ||
      lang === 'zh-Hant'
    ) {
      setStorage('lang', 'zhTW')
    } else {
      setStorage('lang', 'en')
    }

    this.$i18n.locale = getStorage('lang') || 'en'
  }
}
</script>
