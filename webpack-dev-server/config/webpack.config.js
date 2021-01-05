const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将CSS提取到单独的文件中
const devMode = process.env.NODE_ENV === 'development' // 生产还是开发环境 生产使用MiniCssExtractPlugin，开发使用style-loader
const HtmlWebpackPlugin = require('html-webpack-plugin') // 自动将打包生成的css,js等资源引入的生成的html里
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清理 /dist 文件夹

const StyleLoader = devMode
  ? ['style-loader', 'css-loader', 'postcss-loader']
  : [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: './' // 默认是 output.publicPath
        }
      },
      'css-loader',
      'postcss-loader'
    ]

const UsePlugins = devMode
  ? [
      new CleanWebpackPlugin(),
      // new HtmlWebpackPlugin(), // 默认会生成一个index.html文件，里面引入生成的css和js
      // 配置
      new HtmlWebpackPlugin({
        // title: 'webpack5 learning', // 生成的html的title,默认是 Webpack App
        filename: 'index.html', // 输出的html文件名称
        template: path.join(__dirname, '../public/index.html'), // webpack模板的相对或绝对路径
        // inject: 'body', //默认注入到body里面，可以设为head或者body，false不注入
        favicon: path.join(__dirname, '../public/favicon.ico'), // favicon文件路径
        minify: {
          removeComments: true, //删除注释
          collapseWhitespace: true // 去除空格
        }
      })
    ]
  : [
      new CleanWebpackPlugin(),
      // new HtmlWebpackPlugin(), // 默认会生成一个index.html文件，里面引入生成的css和js
      // 配置
      new HtmlWebpackPlugin({
        // title: 'webpack5 learning', // 生成的html的title,默认是 Webpack App
        filename: 'index.html', // 输出的html文件名称
        template: path.join(__dirname, '../public/index.html'), // webpack模板的相对或绝对路径
        // inject: 'body', //默认注入到body里面，可以设为head或者body，false不注入
        favicon: path.join(__dirname, '../public/favicon.ico'), // favicon文件路径
        minify: {
          removeComments: true, //删除注释
          collapseWhitespace: true // 去除空格
        }
      }),
      new MiniCssExtractPlugin({
        filename: '[name]-[chunkhash:8].css' // 默认 main.css
      })
    ]

module.exports = {
  mode: 'development',
  entry: {
    index: path.join(__dirname, '../src/index.js'),
    index2: path.join(__dirname, '../src/index2.js')
  },
  output: {
    publicPath: './',
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]-[chunkhash:8].js'
  },
  devtool: devMode ? 'inline-source-map' : 'cheap-module-source-map', // 如何生成 source map
  devServer: {
    contentBase: '../dist'
  },
  module: {
    rules: [
      // 字体打包
      {
        test: /\.(woff|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts', // 设置打包后字体文件存放的文件夹名称
              name: '[name]-[hash:8].[ext]' // 打包后的字体文件命名
            }
          }
        ]
      },
      // css打包
      {
        test: /\.css$/,
        use: StyleLoader
      },
      // less打包
      {
        test: /\.less$/,
        use: StyleLoader.concat('less-loader')
      },
      // sass/scss 打包
      {
        test: /\.(scss|sass)$/,
        use: StyleLoader.concat('sass-loader')
      },
      // stylus打包
      {
        test: /\.styl$/,
        use: StyleLoader.concat('stylus-loader')
      },
      // 图片打包
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/, // 正则匹配图片格式名 没有用到svg图片|svg去掉
        use: [
          // file-loader
          /* {
            loader: 'file-loader',
            options: {
              outputPath: 'images', // 设置打包后图片存放的文件夹名称
              name: '[name]-[hash:8].[ext]' // 打包后的图片命名
            }
          } */
          // url-loader 和 file-loader类似，但是文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL
          {
            loader: 'url-loader',
            options: {
              limit: 20000, // 表示低于20000字节的图片会以base64编码
              name: '[name]-[hash:8].[ext]', // 打包后的图片命名
              outputPath: 'img' // 设置打包后图片存放的文件夹名称
            }
          }
        ]
      },
      // HTML里的图片打包
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },
  plugins: UsePlugins
}
