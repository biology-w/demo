import React from 'react'

import DataProvider from './DataProvider'

export default class Container extends React.Components {
  render () {
    return <DataProvider>
      {state => {
        return <p>{state.name}</p>
      }}
    </DataProvider>
  }
}
