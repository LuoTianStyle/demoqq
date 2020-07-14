import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '../theme/index.css'
import 'normalize.css'
import './assets/icons'
import '@/assets/styles/variable.less'
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)
Vue.config.productionTip = false
router.beforeEach((to, _, next) => {
  const isLogin = localStorage.userData ? true : false
  if (!isLogin && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
