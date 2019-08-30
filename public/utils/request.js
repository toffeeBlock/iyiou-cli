import axios from 'axios'
import store from '@/store'
import apiConfig from '@/../config'

const baseURL = process.env.NODE_ENV === 'development'? apiConfig.dev.baseURL: apiConfig.build.baseURL

// 创建 axios 实例
const service = axios.create({
  baseURL: baseURL,
  // 设置请求超时时间
  timeout: 5000 // request timeout
})

// 添加请求拦截器，在发送请求之前做些什么
service.interceptors.request.use(
  config => {
    // 根据实际情况，如果请求需要携带 token 则在请求之前进行配置
    if (store.getters.token) {
      // 如果存在 token 每次请求都携带 token
      // ['X-Token'] 自定义密钥 key 可根据实际情况进行修改
      // config.headers['X-Token'] = 'Bearer='+getToken()
    }
    return config
  },
  error => {
    // 请求失败
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  /**
   * 如果您想获取 http请求信息, 如 headers status 
   * 直接返回 response [return response => response]
  */

  /**
   * 通过自定义代码确定请求状态
   */
  response => {
    const res = response.data
    const status = response.status
    
    // 401: 表示用户没有权限（令牌、用户名、密码错误）;
    if (res.code === 401) {
      // 重新登陆
      window.confirm('您已退出，可以取消此页面，或者重新登录', '确认退出', {
        confirmButtonText: '重新登陆',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Promise.resolve()
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else{
      return {
        res, status
      }
    }
  },
  error => {
    const {code, message} = error
    if (code === 'ECONNABORTED' || message === 'Network Error') {
      Message.error('请求超时，将重试')
    }
    return Promise.reject(error.response)
  }
)

export default service
