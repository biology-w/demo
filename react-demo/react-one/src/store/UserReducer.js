const initialState = {
  isLogin: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case 'LOGIN':
    return { ...state, isLogin: true }

  default:
    return state
  }
}

export const login = () => dispatch => {
  setTimeout(()=>{
    dispatch({type:'LOGIN'})
  }, 1000)
}
