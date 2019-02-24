import React, { Component } from 'react'
import { Button } from 'antd'

import store from '../store/store'

export default class ReactReduxTestReduxTest extends Component {
  render() {
    return (
      <div>
          <h1>Redux test</h1>
        <p>{store.getState()}</p>
        <Button onClick={() => store.dispatch({type: 'MINUS'})}>-</Button>
        <Button onClick={() => store.dispatch({type: 'ADD'})}>+</Button>
      </div>
    )
  }
}
