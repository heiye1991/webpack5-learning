const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将CSS提取到单独的文件中
const devMode = process.env.NODE_ENV === 'development' // 生产还是开发环境 生产使用MiniCssExtractPlugin，开发使用style-loader

const StyleLoader = devMode
  ? ['style-loader', 'css-loader', 'postcss-loader']
  : [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    publicPath: devMode ? 'auto' : './',
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js'
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
              outputPath: 'images' // 设置打包后图片存放的文件夹名称
            }
          }
        ]
      }
    ]
  },
  plugins: devMode
    ? []
    : [
        new MiniCssExtractPlugin({
          filename: 'main.css' // 默认 main.css
        })
      ]
}
