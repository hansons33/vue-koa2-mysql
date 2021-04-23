// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import {  Switch,Sidebar, SidebarItem ,Tab,Tabs,Dialog,Cell,CellGroup,Field,Button,Toast,Uploader,Skeleton,Pagination} from "vant"
import 'vant/lib/icon/local.css'
import '@/assets/styles/common.css'
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(Field)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Button)
Vue.use(Toast)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Skeleton)
Vue.use(Pagination)
Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(Switch)
/* eslint-disable no-new */

import Flex from "@/components/layout/Flex" // flex布局组件和样式
import FlexItem from "@/components/layout/FlexItem"
import HeaderBar from "@/components/header/HeaderBar"

Vue.component('Flex', Flex)
Vue.component('FlexItem', FlexItem)
Vue.component('HeaderBar', HeaderBar)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to,from,next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {
    let token = localStorage.getItem('token')
    if (token){
      next();
    }else {
      if(from == '/login'){
        next()
      }else{
        next({
          path: '/login',
          query:{
            redirect: to.fullPath
          }
        })
      }
    }
  } else {
    next();
  }
})
