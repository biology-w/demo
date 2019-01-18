import {
  SET_TOP_DETAIL,
  SET_TOP_LIST,
  SET_CLIENT_LOAD
} from './actionTypes'

import { getTopList, getTopDetail } from '../api'

export const setTopList = (topList) => {
  return { type: SET_TOP_LIST, topList }
}

export const setTopDetail = (topDetail) => {
  return { type: SET_TOP_DETAIL, topDetail }
}

export const setClientLoad = (clientShouldLoad) => {
  return { type: SET_CLIENT_LOAD, clientShouldLoad }
}

export const fetchTopList = () => (dispatch, getState) => {
  return getTopList().then(res => {
    const data = res.data
    if (data.code === 0) {
      console.log('getTopList-----------------fetchtopList----')
      console.log(data)
      dispatch(setTopList(data.data.topList))
    }
    if (process.env.REACT_ENV === 'server') {
      dispatch(setClientLoad(false))
    }
  })
}

export const fetchTopDetail = (id) => (dispatch, getSTate) => {
  return getTopDetail(id).then(res => {
    const data = res.data
    if (data.code === 0) {
      const topInfo = data.topinfo
      const top = {
        id: topInfo.topID,
        name: topInfo.topTitle,
        pic: topInfo.picUrl,
        info: topInfo.info
      }
      dispatch(setTopDetail(top))
    }
  })
}
