import React from 'react'

export default class DataProvider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: 'one'
    }
  }

  render () {
    return this.props.render(this.state)
  }
}
