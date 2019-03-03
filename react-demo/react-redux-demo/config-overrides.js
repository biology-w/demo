const {
  override,
  fixBabelImports,
  addDecoratorsLegacy,
  overrideDevServer,
  watchAll
} = require('customize-cra')


module.exports = {
  webpack: override(
    addDecoratorsLegacy(),
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css'
    }),
    (config) => {
      // console.log(config)
      return config
    }
  ),
  devServer: overrideDevServer(
    (devConfig) => {
      devConfig.before = (app, server) => {
        app.post('/api/login', (req, res) => {
          let body = []
          req.on('data', chunk => {
            body.push(chunk)
          }).on('end', () => {
            body = Buffer.concat(body).toString()
            const { userName, password } = JSON.parse(body)
            if (userName === 'abc' && password === '123') {
              res.json({ success: true, data: { token: 'dbc' + Math.random()*1000 } })
            } else {
              res.json({ success: false, message: '用户名或者密码错误!' })
            }
          })
        })
      }
      return devConfig
    },
    watchAll()
  )
}
