import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import loginReducer from './LoginReducer'

export default createStore(
  combineReducers({ loginData: loginReducer }),
  applyMiddleware(thunk)
)
