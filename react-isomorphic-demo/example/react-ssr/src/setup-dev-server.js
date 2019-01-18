const path = require('path')
const webpack = require('webpack')
const MFS = require('memory-fs')

const clientConfig = require('../config/webpack.config.client')
const serverConfig = require('../config/webpack.config.server')

clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
clientConfig.output.filename = 'static/js/[name].[hash].js'
clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())

module.exports = (app, callback) => {
  let template
  let serverEntry
  let resolve
  const mfs = new MFS()
  const readyPromise = new Promise(r => { resolve = r })

  const clientCompiler = webpack(clientConfig)
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true
  })
  app.use(devMiddleware)

  clientCompiler.plugin('done', stats => {
    const info = stats.toJson()
    if (stats.hasWarnings()) {
      console.log('clientCompiler--hasWarnings')
      console.warn(info.warnings)
    }

    if (stats.hasErrors()) {
      console.log('clientCompiler--hasErrors')
      console.error(info.errors)
      return
    }
    template = devMiddleware.fileSystem.readFileSync(path.join(clientConfig.output.path, 'index.html'), 'utf-8')
    if (serverEntry && template) {
      callback(serverEntry, template)
      resolve()
    }
  })
  app.use(require('webpack-hot-middleware')(clientCompiler))

  const serverCompiler = webpack(serverConfig)
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    const info = stats.toJson()
    if (stats.hasWarnings()) {
      console.log('serverCompiler--watch--hasWarnings')

      console.warn(info.warnings)
    }
    if (stats.hasErrors()) {
      console.log('serverCompiler--watch---hasErrors')

      console.error(info.error)
      return
    }
    const bundle = mfs.readFileSync(path.join(clientConfig.output.path, 'entry-server.js'), 'utf-8')
    const mInstance = new module.constructor()
    mInstance._compile(bundle, 'entry-server.js')

    serverEntry = mInstance.exports

    if (serverEntry && template) {
      callback(serverEntry, template)
      resolve() // resolve Promise让服务端进行render
    }
  })
  return readyPromise
}
