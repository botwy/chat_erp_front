import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import EventSystem from "./components/EventSystem";
import reducer from "./components/reducer";
import {logger} from "./components/logger";


const createStoreWithDevTools = compose(
    global.devToolsExtension ? global.devToolsExtension() : f => f,
)(createStore);

const store = createStoreWithDevTools(reducer
    , {login:false, loginName: '', senderName: '', msgForSend:'', messages: null, exitFromChat: false}
    ,applyMiddleware(logger, thunk)
);

//const store = createStore(reducer, {login:false, loginName: '', senderName: '', msgForSend:'', messages: null, exitFromChat: false});
EventSystem.store = store;

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);