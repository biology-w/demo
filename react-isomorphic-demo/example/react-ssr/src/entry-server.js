import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import createStore from './redux/store'
import routes from './routes'
import App from './App'

const createApp = (context, url, store) => {
  const TempApp = () => (
    <Provider store={store}>
      <StaticRouter context={context} location={url}>
        <App setHead={(head) => { TempApp.head = head }} />
      </StaticRouter>
    </Provider>
  )
  return <TempApp />
}

module.exports = {
  routes,
  createStore,
  createApp
}
