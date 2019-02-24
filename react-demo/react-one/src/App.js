import React, { Component } from 'react';
import { Button } from 'antd'

import HOC from './components/HOC'
import Composition from './components/Composition'
import ProviderContext from './components/ProviderContext'
import CrossLayProvider from './components/CrossLayProvider'
import CrossLayProviderFn from './components/CrossLayProviderFn'
// import ReduxTest from './components/ReduxTest'
import ReactReduxTest from './components/ReactReduxTest'
import ReactReduxTestTwo from './components/ReactReduxTestTwo'
import ReactReduxTestThree from './components/ReactReduxTestThree'
// import RouteOne from './components/RouteSample/RouteOne'
import RouteSwitch from './components/RouteSample/RouteSwitch'


// import logo from './logo.svg';

import './App.css';

class App extends Component {

  test = () => {
    console.log('script start')

    async function async1 () {
      console.log('async1 start')
      await async2()
      console.log('async1 end')
    }

    async function async2 () {
      console.log('async2 end')
    }

    async1()

    setTimeout(() => {
    console.log('setTimeout')
    }, 0)

    new Promise(resolve => {
      console.log('promise')
      resolve()
    }).then(() => {
      console.log('promise1')
    }).then(() => {
      console.log('promise2')
    })

    // Promise.resolve().then(() => {
    //   console.log('promise1')
    // }).then(() => {
    //   console.log('promise2')
    // })

    console.log('script end')
  }

  render() {
    // this.test()
    return (
      <div className="App">
        <header className="App-header">
          <RouteSwitch />
          {/*<RouteOne />*/}
          <ReactReduxTestThree />
          <ReactReduxTestTwo />
          <ReactReduxTest />
          {/*<ReduxTest />*/}
          <HOC tempName='hoc' />
          <Composition />
          <ProviderContext />
          <CrossLayProvider />
          <CrossLayProviderFn />
          <p>
            <Button>btn</Button>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      </div>
    );
  }
}

export default App;
