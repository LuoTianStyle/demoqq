import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      name: 'login'
    },
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
        icon: 'home',
        meta: {
          name: 'home'
        },
        component: () => import('../views/Home.vue')
      },
      {
        path: '/manage',
        name: 'Manage',
        icon: 'account',
        meta: {
          name: 'account-manage'
        },
        component: () => import('../views/Manage.vue')
      },
      {
        path: '/list/:id/:category',
        name: 'List',
        meta: {
          name: 'account-List'
        },
        isShow: false,
        component: () => import('../views/List.vue')
      },
      {
        path: '/result/:orderId/:status/:category',
        name: 'Result',
        meta: {
          name: 'result-success'
        },
        isShow: false,
        component: () => import('../views/Result.vue')
      },
      {
        path: '/result/:orderSn/:status',
        name: 'Result',
        meta: {
          name: 'result-failure'
        },
        isShow: false,
        component: () => import('../views/Result.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: '/home'
  }
]

const router = new VueRouter({
  routes
})

export default router
