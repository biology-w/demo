const path = require('path')
// const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const baseWebpackConfig = require('./webpack.config.base')
const util = require('./util')

const isProd = process.env.NODE_ENV === 'production'

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: './src/entry-client.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[chunkhash].js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      ...util.styleLoaders({
        sourceMap: isProd,
        usePostCSS: true,
        extract: isProd
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    }),
    new BundleAnalyzerPlugin()
  ],

  optimization: {
    splitChunks: {
      chunks: 'all'
      // cacheGroups: {
      //   commons: {
      //     name: 'commons',
      //     chunks: 'initial',
      //     minChunks: 2
      //   },
      //   vendors: {
      //     test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
      //     name: 'vendors',
      //     chunks: 'all'
      //   },
      //   default: {
      //     minChunks: 2,
      //     priority: -20,
      //     reuseExistingChunk: true
      //   }
      // }
    }
  }
})

if (isProd) {
  webpackConfig.plugins.push(
    new ExtractTextPlugin({
      filename: 'static/css/[name].[hash].css'
    })
  )
}

module.exports = webpackConfig
