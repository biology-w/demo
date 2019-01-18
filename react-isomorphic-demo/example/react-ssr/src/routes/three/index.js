import React from 'react'
// import Loadable from 'loadable-components'

import { route as ThreeTwo } from './routes/three-two'

// import { SwitchRoutes } from '../../routerHandler'

const ThreeComponent = (props) => (
  <div>
    three
  </div>
)

export const route = {
  path: '/three',
  exact: true,
  component: ThreeComponent,
  routes: [
    ThreeTwo
  ]
}
