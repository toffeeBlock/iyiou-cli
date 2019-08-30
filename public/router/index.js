import Vue from "vue";
import Router from "vue-router";
/* Layout 基础组件 包含头部和左侧导航 */
import Layout from '@/layout/index.vue'
Vue.use(Router)

/* Router Modules 所有路由表 */
import user from './modules/user'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index'),
      }
    ]
  },
  user,
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export default router