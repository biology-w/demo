const path = require('path')
const glob = require('glob')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function getEntries(globalPath) {
  const files = glob.sync(globalPath)
  const entries = {}
  
  files.forEach(filepath => {
    const paths = filepath.split('/');
    const name = paths[paths.length - 2];
    entries[name] = `./src/pages/${name}/index.tsx`
  })
  return entries;
}

/**
 *eg: { about: './src/pages/about/index.tsx',
 *      contact: './src/pages/contact/index.tsx',
  *     join: './src/pages/join/index.tsx' }
 */
const entries = getEntries('src/pages/**/index.tsx');

module.exports = {
  entry: entries,
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: './index.html'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.js$/,
        use: ['babel-loader']
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
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}
