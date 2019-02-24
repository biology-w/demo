import React, { Component } from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'

// import store from '../store/store'
import { add, minus, asyncAdd } from '../store/CounterReducer'

// 装饰器
@connect(
  state => ({state}),
  {
    add,
    minus,
    asyncAdd
  }
)
class ReactReduxTestThree extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
          <h1>React-Redux test-Three</h1>
        <p>{this.props.state.counter}</p>
        <Button onClick={() => this.props.minus()}>-</Button>
        <Button onClick={() => this.props.add()}>+</Button>
        <Button onClick={() => this.props.asyncAdd()}>async+</Button>
      </div>
    )
  }
}

export default ReactReduxTestThree
