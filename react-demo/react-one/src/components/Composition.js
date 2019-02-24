import React, { Component } from 'react'
// 组件复合而非组件继承 实例：
function Dialog (props) {
  return (
    <div>{props.children}</div>
  )
}

function WelcomDialog(props) {
  return (
    <Dialog {...props}>
      <h1>你好</h1>
      <p>welcom!</p>
    </Dialog>
  )
}

export default class Composition extends Component {
  render() {
    return (
      <div>
        <WelcomDialog />
      </div>
    )
  }
}
