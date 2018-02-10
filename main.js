import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import axios from "axios";


const reducer = (state, action) => {
    if (action.type == 'LOGIN'){
            //? так плохо?
            //const name = document.getElementById("login_input").value;
        alert("try request to server");
            axios.get('http://localhost:8080/chat/login?name='+action.senderName)
                .then((response) => {
                    if (response.data===false) {
                        alert("Введите другое имя!");
                        return Object.assign({}, state, {msgForSend: ''});
                    }
                    if (response.data===true) {
                        alert("O.K.");
                        return Object.assign({}, state, {login: true, senderName: action.senderName, msgForSend: ''});
                    }

                })
                .catch((errror) => console.error(errror));
        return Object.assign({}, state, {senderName: action.senderName});
    }

    if (action.type == 'CHANGEMSG'){
        return Object.assign({}, state, {msgForSend: action.msgForSend});
    }
    return state;
};

const store = createStore(reducer, {login:false, msgForSend:'', senderName: ''});

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);