import React from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router
} from 'react-router-dom'

import createStore from './redux/store'
import App from './App'

const initialState = window.__INITIAL_STATE__
const store = createStore(initialState)

export default () => {
  console.log('AppClient-------------AppClientAppClientAppClient=====')
  console.log(initialState)

  return <Provider store={store}>
    <Router><App /></Router>
  </Provider>
}
