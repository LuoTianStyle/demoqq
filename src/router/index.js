import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      name: '登录'
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    redirect: '/manage',
    component: () => import('../views/Index.vue'),
    children: [
      {
        path: '/manage',
        name: 'Manage',
        icon: 'account',
        meta: {
          name: '账号管理'
        },
        component: () => import('../views/Manage.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: '/manage'
  }
]

const router = new VueRouter({
  routes
})

export default router
