const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
// webpack4 MiniCssExtractPlugin 不再使用 extract-text-webpack-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩 js, 主要配合 OptimizeCSSAssetsPlugin 使用, 不再使用 UglifyJsPlugins(两者功能类似)
const TerserJSPlugin = require('terser-webpack-plugin');
// 压缩 css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 分析打包依赖
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// Dll plugin
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

// 打包耗时分析
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const config = merge(baseConfig, {
  mode: 'production',
  entry: {
    app: path.join(__dirname, '../public/main.js'),
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[contenthash:5].js',
    publicPath: '/' // 设置公共访问资源路径为 /, 也可设置为 http://www.xxx.com/(根据域名来设置)
  },
  module: {
    rules: [
      // 处理 .css文件(项目中使用 less, 这里主要是处理第三方包中的css)
      {
        test: /\.css$/,
        use: [
          {
            // 去除 style-loader 使用 MiniCssExtractPlugin 内置提供的loader
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      // 处理 .less文件
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../src'
            },
          },
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
  // 开启devtool(生产环境可以去掉, 即不会打包.map文件, 但线上调试会有困难)
  externals: {
    //不打包echarts 引用cdns地址
    'element': 'element-ui',
  },
  // webpack4 提供内置分割 js 选项
  optimization: {
    // minimize: true,
    minimizer: [new TerserJSPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
    }), new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/
    })], // 主要用来压缩 js 和 css
    splitChunks: {
      chunks: "all",
      // cacheGroups 可以为配置的选项进行单独打包
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial" // 只打包初始时依赖的第三方
        }
      }
    },
    runtimeChunk: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 配置生成的 css 路径及文件名
      filename: 'public/assets/css/[name].[contenthash].css',
      chunkFilename: 'public/assets/css/[name].[contenthash:5].css',
    }),
    // new BundleAnalyzerPlugin(),
    new DllReferencePlugin({
      manifest: require(path.resolve(__dirname, '../dist/vendor-manifest.json'))
    }),
    // 该插件将把给定的 JS 或 CSS 文件添加到 webpack 配置的文件中，并将其放入资源列表 html webpack插件注入到生成的 html 中
    // new AddAssetHtmlPlugin({ 
    //   // 要添加到编译中的文件的绝对路径，以及生成的HTML文件
    //   filepath: path.resolve(__dirname, '../dist/vendor_dll.js') 
    // })
  ]
})

module.exports = config
/**
 * 需要分析打包耗时时使用
 * module.exports = smp.wrap(config)
 */
module.exports = smp.wrap(config)
