import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from "redux-logger";
import thunk from "redux-thunk";

import CounterReducer  from './CounterReducer'
import UserReducer  from './UserReducer'



export default createStore(
  combineReducers({ counter: CounterReducer, user: UserReducer }),
  applyMiddleware(logger, thunk)
)


// const testCombineReducers = (reducers) => (state = {}, action = {}) => {
//   const newState = {}
//   for(let key in reducers) {
//     newState[key] = reducers[key](state[key], action)
//   }
//   return newState
// }
