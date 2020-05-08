import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('../views/Index.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        icon: 'el-icon-s-home',
        meta: {
          name: '首页'
        },
        component: () => import('../views/Home.vue')
      },
      {
        path: '/manage',
        name: 'Manage',
        icon: 'el-icon-menu',
        meta: {
          name: '账号管理'
        },
        component: () => import('../views/Manage.vue')
      },
      {
        path: '/list:id',
        name: 'List',
        meta: {
          name: '账号列表'
        },
        isShow: false,
        component: () => import('../views/List.vue')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes
})

export default router
