import React, { Component } from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'

// import store from '../store/store'

// 装饰器
@connect(
  state => state,
  {
    add: () => ({type: 'ADD'}),
    minus: () => ({type: 'MINUS'})
  }
)

// or
// @connect(
//   state => ({state}),
//   dispatch => ({
//     add: () => dispatch({ type: 'ADD' }),
//     minus: () => dispatch({ type: 'MINUS' })
//   })
// )
class ReactReduxTestTwo extends Component {
  render() {
    return (
      <div>
          <h1>React-Redux test-Two</h1>
        <p>{this.props.state}</p>
        <Button onClick={() => this.props.minus()}>-</Button>
        <Button onClick={() => this.props.add()}>+</Button>
      </div>
    )
  }
}

export default ReactReduxTestTwo
