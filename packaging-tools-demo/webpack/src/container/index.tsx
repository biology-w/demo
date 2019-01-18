import * as React from 'react'
import { hot } from 'react-hot-loader'

import Hello from '../components/index'
import './Styles.scss'

class App extends React.Component {
    render() {
        return (
            <Hello name='test' />
        )
    }
}

export default hot(module)(App);
