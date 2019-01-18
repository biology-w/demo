import { combineReducers } from 'redux'

import * as ActionTypes from './actionTypes'

const initialState = {
  clientShouldLoad: true,
  topList: [],
  topDetail: {}
}

const topList = (topList = initialState.topList, action) => {
  switch (action.type) {
    case ActionTypes.SET_TOP_LIST:
      return action.topList
    default:
      return topList
  }
}

const topDetail = (topDetail = initialState.topDetail, action) => {
  switch (action.type) {
    case ActionTypes.SET_TOP_DETAIL:
      return action.topDetail
    default:
      return topDetail
  }
}

const clientShouldLoad = (clientShouldLoad = initialState.clientShouldLoad, action) => {
  switch (action.type) {
    case ActionTypes.SET_CLIENT_LOAD:
      return action.clientShouldLoad
    default:
      return clientShouldLoad
  }
}

const reducer = combineReducers({
  topList,
  topDetail,
  clientShouldLoad
})

export default reducer
