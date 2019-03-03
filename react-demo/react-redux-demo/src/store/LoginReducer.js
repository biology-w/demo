import Api from '../api'

const initState = {
  isFetching: false,
  user: null,
  isLogin: false
}

export default (state = initState, action) => {
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


export const login = (data) => dispatch => {
  dispatch({ type: 'LOGIN_REQUEST' })
  return Api.login.loginPost(data).then(value => {
    if (value.data.success) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: value.data.data } })
    } else {
      dispatch({ type: 'LOGIN_FAILURE' })
    }
    return value
  }).catch((e) => {
    dispatch({ type: 'LOGIN_FAILURE' })
  })
}




