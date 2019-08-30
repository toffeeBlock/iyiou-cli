// axios中请求配置有baseURL选项，表示请求URL公共部分。
// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
module.exports = {
  dev: {
    baseURL: '/api',
    proxyTable: 'http://dev.auths-server.iyiou.com'
  },
  build: {
    baseURL: "http://dev.auths-server.iyiou.com"
  }
}