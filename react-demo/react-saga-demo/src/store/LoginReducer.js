import { call, put, takeEvery } from 'redux-saga/effects'

import Api from '../api'

const initState = {
  isFetching: false,
  user: null,
  isLogin: false
}

export default (state = initState, action) => {
  console.log('action')
  console.log(action)
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, isFetching: true, isLogin: false}
    case 'LOGIN_SUCCESS':
      return { ...state, isFetching: false, user: action.payload.user,isLogin: true }
    case 'LOGIN_FAILURE':
      return { ...state, isFetching: false, isLogin: false }
    default:
      return state

  }
}


function* gLogin(action) {
  yield put({ type: 'LOGIN_REQUEST' })
  try {
    const { data, resolve } = action.payload
    const res = yield call(Api.login.loginPost, data)
    resolve(res)
    yield put({ type: 'LOGIN_SUCCESS', payload: { user: res.data } })
  } catch (e) {
    yield put({ type: 'LOGIN_FAILURE' })
  }
}

function* mySaga() {
  yield takeEvery('LOGIN', gLogin)
}


const login = (data, dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: 'LOGIN', payload: { data, resolve, reject } })
  })
}

export  { mySaga, login }
