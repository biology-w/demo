export default (state = 0, action) => {
  switch (action.type) {
    case 'ADD_REQUEST':
      return -1
    case 'ADD':
      return state + 1
    case 'MINUS':
      return state - 1
    case 'LOGIN_SUCESS':
      return
    default:
      return state
  }
}


export const add = () => ({type: 'ADD'})

export const minus = () => ({type: 'MINUS'})

export const asyncAdd = () => dispatch => {
  dispatch({ type: 'ADD_REQUEST'})
  setTimeout(() => {
    dispatch({ type: 'ADD' })
  }, 2000)
}
