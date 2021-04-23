import Vue from 'vue'
import Router from 'vue-router'
import login from "@/pages/login/Login"
import Index from "@/pages/home/Index"
Vue.use(Router)
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      redirect: "/home",
      meta:{
        requireAuth: true
      },
      children:[
        {
          path: '/home',
          name: 'home',
          component: () => import ("@/pages/home/home/Home")
        },
        {
          path:'/home/public',
          name: "public",
          component: () => import("@/pages/home/article/components/Public")
        },
        {
          path:'/home/detail',
          name: "detail",
          component: () => import("@/pages/detail/Detail")
        },
        {
          path:'/home/changeInfo',
          name: 'changeInfo',
          component:() => import('@/pages/home/home/components/ChangeInfo')
        }
      ]
    },
  ]
})
