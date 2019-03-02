const initialState = {
  isFetching: false,
  isLogin: false
}

export default (state = initialState, action) => {
  console.log('payload')
  console.log(action)
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, isFetching: true }
  case 'LOGIN_SUCCESS':
    return { ...state, isLogin: true, isFetching: false }
    case 'LOGIN_FAILED':
      return { ...state, isLogin: false, isFetching: false }
  default:
    return state
  }
}


// redux login
export const login = () => dispatch => {
  setTimeout(()=>{
    dispatch({type:'LOGIN_SUCCESS'})
  }, 1000)
}


// sage login
export const sagaLogin = (userId) => {
  return { type: 'LOGIN_SAGA_FN', payload: { userId } }
}
