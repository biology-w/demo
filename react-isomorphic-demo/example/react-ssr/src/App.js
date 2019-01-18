import React from 'react'
import {
  NavLink,
  Switch,
  Redirect
} from 'react-router-dom'
import { Helmet } from 'react-helmet'

import routes from './routes'

import {
  StatusRoute,
  SwitchRoutes
} from './routerHandler'

import './assets/app.css'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    if (process.env.REACT_ENV === 'server') {
      this.props.setHead(Helmet)
    }
  }
  render () {
    const tempRoutes = SwitchRoutes(routes)
    return (
      <div>
        <Helmet>
          <title>app</title>
          <meta name='keywords' content='react ssr' />
        </Helmet>
        <div className='title'>This is a react ssr demo</div>
        <ul className='nav'>
          <li><NavLink to='/one'>one</NavLink></li>
          <li><NavLink to='/two'>two</NavLink></li>
          <li><NavLink to='/three'>three</NavLink></li>
          <li><NavLink to='/three/three-two'>three-two</NavLink></li>
        </ul>
        <div>
          <Switch>
            {tempRoutes}
            <Redirect from='/' to='/one' exact />
            <StatusRoute code={404}>
              <div>
                <h1>Not Found</h1>
              </div>
            </StatusRoute>
          </Switch>
        </div>
      </div>
    )
  }
}
