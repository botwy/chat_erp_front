import React, {Component} from 'react';
import style from '../Style';
import PropTypes from 'prop-types';
import axios from "axios";
import {connect} from 'react-redux';
import EventSystem from '../EventSystem';
import {changeLoginNameAction, getChatsAction} from '../actions';

const LoginWidget = (props) => (
    <div style={style.column}>
        <p style={style.row}>Введите ваше имя: </p>
        <div style={style.row}>
            <input style={style.inputMessage} value={props.loginName} onChange={props.onchangeLoginName}></input>
            <button style={style.buttons} onClick={EventSystem.events.loginTry}>Войти в чат</button>
            <button style={style.buttons} onClick={props.onGetMessages}>Get messages</button>
        </div>
    </div>
);

LoginWidget.propTypes = {
    loginName: PropTypes.string.isRequired,
    onchangeLoginName: PropTypes.func.isRequired,
};

export default connect(
    store => ({loginName: store.loginName}),
    (dispatch, props) => ({
        onchangeLoginName: event => dispatch(changeLoginNameAction(event.target.value)),
        onGetMessages: () =>
            dispatch(
                dispatch => axios.get('http://localhost:8080/chat/allchats')
                    .then((response) => {
                        const newMessages = response.data.reverse();
                        dispatch(getChatsAction(newMessages));
                        console.log(newMessages);
                    })
                    .catch((errror) => console.error(errror))
            )

    })
)(LoginWidget);
