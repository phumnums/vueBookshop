import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path:'',
    name:'toolbar',
    component: () => import('../views/Toolbar.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('../views/Register.vue')
      },
      {
        path: '/admin',
        name: 'productAdmin',
        component: () => import('../views/ProductAdmin.vue')
      },
      {
        path: '/product/:id',
        name: 'productDetail',
        component: () => import('../views/ProductDetail.vue')
      },


    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
