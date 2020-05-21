<template>
  <router-view v-wechat-title="$t($route.meta.name)" />
</template>

<script>
import { getStorage, setStorage } from '@/utils/storage.js'
export default {
  name: 'App',
  mounted() {
    const lang = navigator.language || navigator.userLanguage
    let currentCountry
    if (lang === 'zh-CN' || lang === 'zh-SG') {
      currentCountry = 'zhCN'
    } else if (
      lang === 'zh-TW' ||
      lang === 'zh-HK' ||
      lang === 'zh-MO' ||
      lang === 'zh-Hant'
    ) {
      currentCountry = 'zhTW'
    } else {
      currentCountry = 'en'
    }
    if (!getStorage('lang')) {
      setStorage('lang', currentCountry)
    }
    this.$i18n.locale = getStorage('lang') || currentCountry
  }
}
</script>
