import React, { Component } from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'

import store from '../store/store'

class ReactReduxTest extends Component {
  render() {
    return (
      <div>
          <h1>React-Redux test</h1>
        <p>{this.props.state}</p>
        <Button onClick={() => this.props.minus()}>-</Button>
        <Button onClick={() => this.props.add()}>+</Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({state})

const mapDispatchToProps = dispatch => ({
add: () => dispatch({ type: 'ADD' }),
minus: () => dispatch({ type: 'MINUS' })
})

export default connect(mapStateToProps, mapDispatchToProps)(ReactReduxTest)
