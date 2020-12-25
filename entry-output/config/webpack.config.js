const path = require('path')

module.exports = {
  mode: 'development', // 打包模式：development、production。默认 production。 development 启用 NamedChunksPlugin 和 NamedModulesPlugin。production 启用 FlagDependencyUsagePlugin、FlagIncludedChunksPlugin、ModuleConcatenationPlugin、NoEmitOnErrorsPlugin、OccurrenceOrderPlugin、SideEffectsFlagPlugin 和 UglifyJsPlugin

  // webpack 配置文件在根目录的时候使用 './src/index.js' 形式，不在根目录的时候需要使用 path.join(__dirname, '../src/index.js') 形式
  // 如果传入一个字符串或字符串数组，chunk 会被命名为 main。如果传入一个对象，则每个键(key)会是 chunk 的名称，该值描述了 chunk 的入口起点
  entry: path.join(__dirname, '../src/index.js'), // 字符串形式，单入口
  // entry: [path.join(__dirname, '../src/index.js')], // 数组形式，可以写多个，单入口
  // entry: {
  // index: path.join(__dirname, '../src/index.js'), // 对象形式，多入口
  // index2: path.join(__dirname, '../src/index2.js') // 对象形式，多入口
  // },

  output: {
    // webpack 配置文件在根目录的时候，可以不写，默认输出到根目录下的 dist 文件夹；不在根目录的时候需要使用 path.resolve(__dirname, '../dist') 形式。
    path: path.resolve(__dirname, '../dist'), // 绝对路径

    // 此选项不会影响那些「按需加载 chunk」的输出文件
    filename: 'bundle.js', // 指定打包输出的文件名称
    // filename: '[id].js', // 使用内部 chunk id
    // filename: '[name].js', // 使用入口名称
    // filename: '[name]-[hash].js', // 使用每次构建过程中，唯一的 hash 生成
    // filename: '[name]-[chunkhash].js', // 使用基于每个 chunk 内容的 hash。 推荐的使用方式

    // 按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）该选项值很重要。如果值错误，加载资源会报 404
    // 该选项的值是以 runtime(运行时) 或 loader(载入时) 所创建的每个 URL 为前缀，多数情况下为 /。默认值是一个空字符串 ""
    // webpack-dev-server 也会默认从 publicPath 为基准，使用它来决定在哪个目录下启用服务，来访问 webpack 输出的文件
    publicPath: '/'
  }
}
