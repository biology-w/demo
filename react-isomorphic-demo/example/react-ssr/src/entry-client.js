import React from 'react'
import ReactDom from 'react-dom'
import { loadComponents } from 'loadable-components'

import AppClient from './AppClient'

// 开始渲染之前加载所需的组件
loadComponents().then(() => {
  ReactDom.hydrate(<AppClient />, document.getElementById('app'))
})

if (module.hot) {
  module.hot.accept('./AppClient.js', () => {
    const NewApp = require('./AppClient').default
    ReactDom.hydrate(<NewApp />, document.getElementById('app'))
  })
}
