import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./routes/react-virtualized/Loader";
import * as serviceWorker from "./serviceWorker";
// import store from './store/store'
import store from "./store/sagaStore";
import "./App.css";
// 直接使用redux的时候，要监听；才能更新
// store.subscribe(() => {
//     ReactDOM.render(<App />, document.getElementById('root'))
// })

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
