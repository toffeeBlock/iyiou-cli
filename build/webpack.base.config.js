const path = require('path')
// 必须要导入 vue-loader/lib/plugin!!!
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const config = {
  entry: {
    app: path.join(__dirname, '../public/main.js')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[hash:8].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader', // babel详细配置见 .babelrc
        exclude: /node_modules/,
      },
      {
        // 可能会 .vue 文件中使用 jsx语法
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        // 必须安装 vue-loader 和 vue-template-compiler
        loader: 'vue-loader'
      },
      {
        test: /\.(png|jpg|jpeg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 如果大于8kb, 会以base64编码形式输出
              name: '[path][name]-[hash:5].[ext]'
            }
          },
          {
            loader: 'img-loader',
            options: {
              plugins: [
                // imagemin-mozjpeg 和 imagemin-pngquant分别处理 jpg和png 图片的压缩
                require('imagemin-mozjpeg')({
                  progressive: true,
                  arithmetic: false,
                  quality: 50
                }),
                require('imagemin-pngquant')({
                  quality: [0.3, 0.5]
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'public/assets/font/[name]-[hash:5].[ext]'
        }
      }
    ]
  },
  resolve: {
    // 将 .js .vue .json视为扩展文件, 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在
    extensions: ['.js', '.vue', '.json'],
    // alias 通过别名来把原导入路径映射成一个新的导入路径
    // 引用样式文件只需要 ~@less 为前缀即可, 注意必须要带 ~ 符
    alias: {
      '@less': path.resolve(__dirname, '../public/assets/css'),
      '@': path.resolve(__dirname, '../public')
    }
  },
  plugins: [
    // 必须引入这个插件！将上面定义过的rules复制并应用到 .vue 文件里相应语言的块中
    new VueLoaderPlugin(),
    // 生成 html 文件
    new HtmlWebpackPlugin({
      "chunksSortMode": 'none',
      template: path.join(__dirname, '../public/index.html'),
      favicon: path.join(__dirname, '../favicon.ico')
    })
  ]
}

module.exports = config