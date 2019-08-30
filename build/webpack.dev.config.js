const webpack = require('webpack')
const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const proxyTable = require('../config')

module.exports = merge(baseConfig, {
  mode: 'development',
  module: {
    // 后期会将处理css less进行拆分
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'less-loader',
        ]
      }
    ]
  },
  // 开发环境下资源映射, 便于调试
  devtool: '#cheap-module-eval-source-map',
  externals: {//不打包的
    'echarts': 'echarts'
  },
  devServer: {
    port: 3000, // 端口号
    host: '0.0.0.0', // 本地局域网访问当前 ip 即可访问
    overlay: {
      // 是否将错误信息提示在浏览器中
      errors: true
    },
    // 对所有的资源采用gzip压缩
    compress: true,
    // 使用 vue-router 时如果设置了 mode: 'history'
    // 刷新页面会出现 404, 原因是服务端在开发环境下, webpack-dev-server匹配不到当前经过history处理过的路径
    // 此时通过设置 historyApiFallback 将其跳转为 打包后的index.html页面 
    historyApiFallback: {
      index: '/index.html'
    },
    // 设置接口代理 本地跨域访问请求资源
    // 在 axios 封装后，直接将 baseURL 设置为 /api 即可
    proxy: {
      '/api': {
        target: proxyTable.dev.proxyTable,
        changeOrigin: true
      }
    },
  },
  plugins: [
    // 启用模块热更新
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
})