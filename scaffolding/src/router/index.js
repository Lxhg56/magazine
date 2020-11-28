import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Button from '../testing/Button.vue';
//测试案例
import Header from '../testing/Header.vue';
import Field from '../testing/Field.vue';
//import { component } from 'vue/types/umd';
//import Button from 'vue/types/umd';
import Navbar from '../testing/Navbar.vue';


import Swiper from '../testing/Swiper.vue';
import Infinite from '../testing/Infinite.vue';
import Access1 from '../testing/Access1.vue';
import Access2 from '../testing/Access2.vue';
import Ajax from '../testing/Ajax.vue';






import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Article from '../views/Article.vue';
import Me from '../views/Me.vue';
import Cart from '../views/Cart.vue';
Vue.use(VueRouter)

const routes = [
  {
    path:'/header',
    component:Header
  },
  {
    path:'/ajax',
    component:Ajax
  },
  {
    path:'/access1',
    component:Access1
  },
  {
    path:'/access2',
    component:Access2
  },
  {
    path:'/article/:id',
    component:Article
  },
  {
    path:'/infinite',
    component:Infinite
  },
  {
    path:'/swiper',
    component:Swiper
  },
  {
    path:'/navbar',
    component:Navbar
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/me',
    component:Me
  },
  {
    path:'/register',
    component:Register
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/field',
    component:Field
  },
  {
    path:'/button',
    component:Button
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
