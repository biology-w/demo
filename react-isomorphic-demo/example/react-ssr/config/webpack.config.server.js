const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const baseWebpackConfig = require('./webpack.config.base')
const util = require('./util')

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: './src/entry-server.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'entry-server.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                [
                  'env',
                  // 在使用 uglify-js 压缩代码时, 由于 uglify-js 不支持任何ES2015+语法，因此浏览器运行时可能会遇到语法错误。
                  // 为了防止这些错误的发生 - 将 uglify 选项设置为 true， 它将会启用所有的翻译插件, 因此你的代码会被编译为ES5.
                  { targets: { node: 'current', uglify: true } }
                ],
                'react'
              ],
              plugins: ['dynamic-import-node', 'loadable-components/babel']
            }
          },
          {
            loader: 'eslint-loader'
          }
        ],
        exclude: /node_modules/
      },
      ...util.styleLoaders({
        sourceMap: true,
        usePostCSS: true,
        extract: true
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_ENV': JSON.stringify('server') // 指定React环境为服务端
    }),
    // 服务端不支持window document等对象，需将css外链
    new ExtractTextPlugin({
      filename: 'static/css/[name].[hash].css'
    })
  ]
})

module.exports = webpackConfig
