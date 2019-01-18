import Loadable from 'loadable-components'

// import { route as Three } from './three'

// export default [
//   {
//     path: '/one',
//     component: Loadable(() => import('./one'))
//   },
//   {
//     path: '/two',
//     component: Loadable(() => import('./two'))
//   }
// ]

export default [
  {
    path: '/one',
    component: Loadable(() => import('./one'))
  }
]
