import React, {Component} from 'react'
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

@connect(
  state => state
)
class Root extends Component {
  render() {
    const user = JSON.parse(localStorage.user || '{}')
    const { route, location } = this.props
    if (!user.token &&  location.pathname !== '/login') {
      return <Redirect to={{ pathname: '/login', state: location }} />
    }
    if (user.token &&  location.pathname === '/login') {
      return <Redirect to={{ pathname: '/' }} />
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Root</h1>
        {renderRoutes(route.routes)}
      </div>
    );
  }
}

export default Root;
