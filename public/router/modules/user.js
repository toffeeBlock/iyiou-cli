/* Layout 基础组件 包含头部和左侧导航 */
import Layout from '@/layout/index.vue'

const user = {
  path: '/user',
  component: Layout,
  redirect: '/user/info',
  children: [
    {
      path: '/user/info',
      component: () => import(/* webpackChunkName: "user-chunk" */'@/views/user/index'),
      meta: {
        title: '用户'
      }
    }
  ]
}

export default user
