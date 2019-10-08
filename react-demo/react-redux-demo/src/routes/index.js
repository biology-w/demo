import Root from './Root'

import Home from './Home/testOne/testMenus'
import About from './About'
import Login from './Login'


const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/about',
        exact: true,
        component: About
      },
      {
        path: '/login',
        exact: true,
        component: Login
      }
    ]
  }
]

export default routes
