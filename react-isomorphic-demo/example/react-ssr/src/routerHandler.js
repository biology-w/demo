import React from 'react'
import { Route } from 'react-router-dom'

const NestedRoute = (route) => {
  // console.log('route')
  // console.log(route)
  return <Route
    path={route.path}
    exact={route.exact}
    render={(props) => <route.component {...props} routes={route.routes} />}
  />
}

const handleRoutes = (routes, tempRoutes) => {
  routes.map((route, index) => {
    tempRoutes.push(<NestedRoute key={route.path} {...route} />)
    if (route.routes) {
      handleRoutes(route.routes, tempRoutes)
    }
  })
}

const SwitchRoutes = (routes) => {
  const tempRoutes = []
  handleRoutes(routes, tempRoutes)
  return tempRoutes
}

const StatusRoute = (props) => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = props.code
    }
    return props.children
  }} />
)

export {
  NestedRoute,
  SwitchRoutes,
  StatusRoute
}
