import React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';

import Home from './Home/index';

export default function App(props) {
    const { dataSource } = props
    return (
        <div>
             Your React Node app is set up！
            <Switch>
                <Route path='/' render={(location) => (<Home dataSource={dataSource} location={location} />)}/>
            </Switch>
        </div>
    )
}
