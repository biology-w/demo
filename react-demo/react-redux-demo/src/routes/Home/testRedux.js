import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import ReactDom from 'react-dom'

const counterReducer = (state = 0, action) => {
  switch(action.type) {
    case 'add':
      return state + 1
    case 'minus':
      return state - 1
    default:
      return state
  }
}

const store = createStore(counterReducer)


// class Tempxxx extends Component {
//   componentDidMount() {
//     store.subscribe(this.setState)
//   }
//
//   render () {
//     return (
//       <div>
//         <p>{store.getState()}</p>
//         <button onClick={() => store.dispatch({ type: 'add' })}>+</button>
//         <button onClick={() => store.dispatch({ type: 'minus' })}>-</button>
//       </div>
//     )
//   }
// }


class TestItemCom extends Component{
  constructor(props) {
    super(props)
    console.log('one', this.props.item)
  }

  componentWillMount() {
    console.log('will-mount', this.props.item)
  }

  componentDidMount() {
    console.log('did-mount', this.props.item)
  }

  render(){
    return <div>{this.props.item}</div>
  }
}


class TempApp extends Component{
  constructor(props) {
    super(props)
    this.state = {
      data: ['one', 'two', 'three']
    }
  }

  handleClick = () => {
    this.setState({data: this.state.unshift('beforeOne')})
  }



  render() {
    return (
      <div>
        <button onClick={this.handleClick}>click</button>
        {
          this.state.data.map((item, index) => {
            return <TestItemCom item={item} key={index} />
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { count: state }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAction: () => dispatch({ type: 'add' }),
    minuAction: () => dispatch({ type: 'minus' })
  }
}

connect(mapStateToProps,mapDispatchToProps)(TempApp)

ReactDom.render(
  <Provider store={store}>
    <TempApp/>
  </Provider>,document.querySelector('#root'))




const reduxThunk = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState)
  }
  return next(action)
}























