import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from "redux-logger";
import thunk from "redux-thunk";

import CounterReducer  from './CounterReducer'
import UserReducer  from './UserReducer'



export default createStore(
  combineReducers({ counter: CounterReducer, user: UserReducer }),
  applyMiddleware(logger, thunk)
)
