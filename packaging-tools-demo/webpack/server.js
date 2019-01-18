const express = require('express')
const webpack = require('webpack')
// webpack-dev-middleware 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express()
const config = require('./webpack.config')
const compileer =webpack(config)

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compileer, {
  publicPath: config.output.publicPath
}))

// Serve the files on port 3000.
app.listen(5000, function () {
  console.log('Example app listening on port 5000!\n');
});
