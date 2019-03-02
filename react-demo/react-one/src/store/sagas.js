import { call, put, takeEvery } from 'redux-saga/effects';


const api = {
  login(userId) {
    console.log(userId)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve('sucess')
        } else {
          reject('fail')
        }
      }, 1000)
    })
  }
}

// work saga
function* login(action) {
  try {
    yield put({ type: 'LOGIN_REQUEST' })
    const result = yield call(api.login, action.payload.userId)
    yield put({ type: 'LOGIN_SUCCESS', user: result })
  } catch (e) {
    yield put({ type: 'LOGIN_FAILED', message: e.message })
  }

}

function* mySaga() {
  yield takeEvery('LOGIN_SAGA_FN', login)
}

export default mySaga
