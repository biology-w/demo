import React, {Component} from 'react';
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'

import routes from './routes'
import store from './store/store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {renderRoutes(routes)}
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
