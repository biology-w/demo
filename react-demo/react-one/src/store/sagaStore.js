import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from 'redux-saga'

import CounterReducer from './CounterReducer'
import UserReducer from './UserReducer'
import mySaga from './sagas'
// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
  combineReducers({ counter: CounterReducer, user: UserReducer }),
  applyMiddleware(sagaMiddleware)
)
// then run the saga
sagaMiddleware.run(mySaga)

export default store
