<template>
  <el-dropdown @command="changeLang">
    <span class="el-dropdown-link">
      <svg-icon class="item-icon" :icon-class="icon" />
      {{ text }}
      <i class="el-icon-arrow-down el-icon--right" />
    </span>
    <el-dropdown-menu slot="dropdown" class="lang">
      <el-dropdown-item
        class="item"
        v-for="item in langArray"
        :command="item.value"
        :key="item.value"
        :style="
          item.value === $i18n.locale
            ? {
                backgroundColor: '#fff3e7',
                color: '#FF8413'
              }
            : {}
        "
      >
        <svg-icon class="item-icon" :icon-class="item.icon" />
        {{ item.text }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
import { setStorage, getStorage } from '@/utils/storage.js'
import SvgIcon from '@/components/SvgIcon.vue'
export default {
  name: 'LangHeader',
  components: {
    SvgIcon
  },
  data() {
    return {
      icon: '',
      text: '',
      lang: '',
      langArray: [
        {
          value: 'zhCN',
          text: '简体中文',
          icon: 'zhcn'
        },
        {
          value: 'en',
          text: 'English',
          icon: 'en'
        },
        {
          value: 'zhTW',
          text: '繁体中文',
          icon: 'zhcn'
        }
      ]
    }
  },
  methods: {
    changeLang(lang) {
      this.$i18n.locale = lang
      const item = this.langArray.find(item => item.value === lang)
      this.icon = item.icon
      this.text = item.text
      setStorage('lang', lang)
    }
  },
  mounted() {
    const item =
      this.langArray.find(item => item.value === getStorage('lang')) ||
      this.langArray[0]
    this.icon = item.icon
    this.text = item.text
  }
}
</script>
<style lang="less" scoped>
.lang {
  padding-left: 8px;
  padding-right: 8px;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.item {
  padding-left: 6px;
  padding-right: 6px;
  width: 104px;
  box-sizing: border-box;
  border-radius: 8px;

  &:hover {
    background-color: rgb(246, 249, 253);
    color: #606266;
  }
}
.item-icon {
  position: relative;
  top: 2px;
  padding-right: 5px;
}
.el-icon--right {
  color: #ccc;
  font-size: 14px;
  font-weight: bold;
}
</style>
