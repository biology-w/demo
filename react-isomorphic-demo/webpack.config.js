var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: ['./app/index.js'],
    mode: 'production',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /.js$/,
              use: [{
                loader: 'babel-loader',
                query: {
                  presets: ['es2015', 'react']
                }
              }],
                include: path.join(__dirname, 'app'),
                exclude: /node_modules/
            }
        ]
    }

}