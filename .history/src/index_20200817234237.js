import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

import { createStore, combineReducers, compose } from "redux";
import { Provider } from "react-redux";
//import rootReducer from './store/reducers/burgerBuiilderR';
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import orderR from "./store/reducers/orderR";
import burgerBuilderR from "./store/reducers/burgerBuiilderR";
import authR from "./store/reducers/authR";
import createSagaMiddleware from "redux-saga";
import { logoutSaga } from "./store/sagas/authSagas";
//Preko ovoga mergamo dva reducera u jedan:
const rootReducer = combineReducers({
  orderR: orderR,
  burgerBuilderR: burgerBuilderR,
  authR: authR,
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //ReduxDevTools -> analiza STORE-a

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk, sagaMiddleware
    ) /*,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/
  )
);

sagaMiddleware.run()

//thunk je middleware koji nam omogucava da koristimo asinq kod u actioncreatorima

//Provider je helper component koja nam omogucava da injectamo nas store u React componente
//Sa providerom konektujemo store koji je kreiran od REACT-a sa sa nasom react aplikacijom.
//Da bismo povezali nasu Provider komponentu sa nasim storom ovdje,
//Moramo mu dodati special property store

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
//ReactDOM.render(<p>Hello</p>, document.getElementById('root'));

serviceWorker.unregister();
