import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import axios from "axios";
import EventSystem from "./components/EventSystem";
import reducer from "./components/reducer";

const createStoreWithDevTools = compose(
    global.devToolsExtension ? global.devToolsExtension() : f => f,
)(createStore);

const store = createStoreWithDevTools(reducer, {login:false, loginName: '', senderName: '', msgForSend:'', messages: null, exitFromChat: false});

//const store = createStore(reducer, {login:false, loginName: '', senderName: '', msgForSend:'', messages: null, exitFromChat: false});
EventSystem.store = store;

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);