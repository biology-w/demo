const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  // entry: './src/index.js',
  entry: {
    app: './src/index.js'
  },
  // 更容易地追踪错误和警告
  // source map 功能，将编译后的代码映射回原始源代码
  devtool: 'inline-source-map',
  devServer: {
    // 告诉开发服务器(dev server)，在哪里查找文件
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 9000
  },
  mode: 'production',
  output: {
    // 根据入口起点名称动态生成 bundle 名称
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath 也会在服务器脚本用到，以确保文件资源能够在 http://localhost:9000 下正确访问
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    //在每次构建前清理 /dist 文件夹
    new CleanWebpackPlugin(['dist']),
    // HtmlWebpackPlugin 构建index.html。
    // 创建了一个全新的文件，所有的 bundle 会自动添加到 html 中
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
