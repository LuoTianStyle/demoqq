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
        path: '/list:id:category',
        name: 'List',
        meta: {
          name: 'account-List'
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
