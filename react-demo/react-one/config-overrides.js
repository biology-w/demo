const { override, fixBabelImports, addDecoratorsLegacy } = require('customize-cra')

module.exports = override(
    addDecoratorsLegacy(),
    // ...addBabelPlugins(["@babel/plugin-proposal-decorators", { legacy: true }]),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'
    })
)