const merge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // Minimizing For Production

const common = require('./webpack.common')

module.exports = merge(common, {
  // mode: development | production | none
  //development: 会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。
  // production:
  // 会将 process.env.NODE_ENV 的值设为 production。
  // 启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin,
  // NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin
  // none: 不选用任何默认优化选项
  mode: 'production',
  // 避免在生产中使用 inline-*** 和 eval-***，因为它们可以增加 bundle 大小，并降低整体性能
  // 此选项控制是否生成，以及如何生成 source map。
  devtool: 'source-map',
  optimization: {
    // Tell webpack to minimize the bundle using the UglifyjsWebpackPlugin.
    //This is true by default in production mode.
    // minimize: true,
    // Tells webpack to set process.env.NODE_ENV to a given string value
    // nodeEnv: 'production',
    // webpack will automatically split chunks based on these conditions
    // (https://webpack.js.org/plugins/split-chunks-plugin/)
    // splitChunks: {
    //     chunks: 'all'
    // }
    minimizer: [
      new UglifyJsPlugin({}),
      new OptimizeCssAssetsPlugin({})
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        sideEffects: true,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              // resolve: ERROR in app.bundle.js from UglifyJs
              // Unexpected token: operator (>) [app.bundle.js:268,111]
              '@babel/preset-env',
            ],
            // resolve: Support for the experimental syntax 'dynamicImport' isn't currently enabled
            plugins: ['@babel/plugin-syntax-dynamic-import']
          }
        }]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  }
})
