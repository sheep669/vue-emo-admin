/*
 * @Author: sheep669
 * @Description: 路由文件
 * @Date: 2022-06-26 21:46:01
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { getMenuData } from "@/api/index"
import store from '@/store/index.js'
import Layout from '@/components/layout/index.vue'
import EmoLogin from '@/views/login/index.vue'
import EmoRegister from '@/views/register/index.vue'
import EmoHome from '@/views/home/index.vue'

Vue.use(VueRouter)

// 捕获导航跳转错误 Error: Redirected when going from “/login” to “/home” via a navigation guard
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/home',
        component: EmoHome,
        meta: {
          title: ' 欢迎您 💖'
        }
      }
    ],
    meta: {
      isLogin: true,
      title: '首页'
    }
  },
  {
    path: '/login',
    component: EmoLogin
  },
  {
    path: '/register',
    component: EmoRegister
  }
]

const router = new VueRouter({
  routes,
})

//路由守卫
router.beforeEach(async (to, from, next) => {
  //判断是否需要登录
  if (to.matched.some(v => v.meta.isLogin)) {
    //获取token
    let token = store.state.loginModule.userinfo.token;
    //判断是否已经登录
    if (token) {
      //判断是否第一次发送请求
      if (store && store.state.nav.length == 0) {
        // 异步请求，拿到数据后再处理 await
        // 发送请求
        let res = await getMenuData("/get_menu_data");
        // 动态添加路由
        let dynamicRoutes = addR(res.data);
        dynamicRoutes.forEach(v => {
          router.addRoute(v);
        })
        //router.addRoutes(dynamicRoutes); ===> router.addRoutes() is deprecated
        //缓存数据到vuex
        store.dispatch('SETNAV', res.data);
        //阻止用户在addRoutes()还没有完成的时候，就点击浏览器回退按钮,返回上一级路由
        next({ ...to, replace: true })
      }
      //放行
      next()
    } else {
      //拦截重定向到/login
      next('/login')
    }
  } else {
    // 不需要登录的路由则直接放行
    next()
  }
})

//防止重复发起请求
let data = store.state.nav;
if (data) {
  let dynamicRoutes = addR(data);
  dynamicRoutes.forEach(v => {
    router.addRoute(v);
  })
}


/**
 * 动态添加路由方法
 */
function addR(data) {
  data.forEach(v => {
    routes[0].children.push({
      path: v.path,
      name: v.name,
      component: () => import("../views" + v.component + "/index.vue"),
      meta: { title: v.title }
    })
  })
  return routes
}

export default router
