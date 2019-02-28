const { override, fixBabelImports, addDecoratorsLegacy } = require('customize-cra')

module.exports = {
  webpack: override(
    addDecoratorsLegacy(),
  // ...addBabelPlugins(["@babel/plugin-proposal-decorators", { legacy: true }]),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  }),
    (config) => {
      // config.entry.splice(1, 1, './src/ManualReact/index.js')
      console.log('----config')
      console.log(config)
      return config
    }
  )
}
