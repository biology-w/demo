const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

let tempEnv = 'dev'
// let isProd = false
let prodPlugins = []
//
// if (process.env.NODE_ENV === 'production') {
//   env = 'prod'
//   isProd = true
//   prodPlugins = [
//     new UglifyJsPlugin({ sourceMap: true })
//   ]
// }

const baseWebpackConfig = {
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  }
  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env': require('./' + env + '.env')
  //   }),
  //   ...prodPlugins
  // ]
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    baseWebpackConfig.devtool = 'cheap-module-source-map'
  }

  if (argv.mode === 'production') {
    baseWebpackConfig.devtool = 'source-map'
    tempEnv = 'prod'
    prodPlugins = [
      new UglifyJsPlugin({ sourceMap: true })
    ]
  }

  baseWebpackConfig.plugins = [
    new webpack.DefinePlugin({
      'process.env': require('./' + tempEnv + '.env')
    }),
    ...prodPlugins
  ]

  return baseWebpackConfig
}
