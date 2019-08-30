const path = require('path')
const webpack = require('webpack')
module.exports = {
  mode: 'production',
  entry: {
    vendor: ['vue', 'vue-router', 'vuex', 'axios', 'element-ui'],
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name]_dll.js',
    library: '[name]_dll'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../', 'dist/[name]-manifest.json'),
      name: '[name]_dll'
    })
  ],
  optimization: {
    minimize: true
  },
  performance: {
    // false | "error" | "warning" // 不显示性能提示 | 以错误形式提示 | 以警告...
    hints: "warning",        // 开发环境设置较大防止警告
    // 根据入口起点的最大体积，控制webpack何时生成性能提示,整数类型,以字节为单位
    maxEntrypointSize: 5000000,         // 最大单个资源体积，默认250000 (bytes)
    maxAssetSize: 3000000
  }
}