import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import loginReducer, { mySaga } from './LoginReducer'

const sagaMiddleware = createSagaMiddleware()

export default createStore(
  combineReducers({ loginData: loginReducer }),
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(mySaga)
