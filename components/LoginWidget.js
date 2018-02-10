import React, { Component } from 'react';
import style from './Style';
import PropTypes from 'prop-types';
import axios from "axios";
import {connect} from 'react-redux';

//const LoginWidget=({loginName,handleChangeMsg,handleClickLoginButton})=>(
const LoginWidget=(props)=>(
    <div style={style.column}>
        <p style={style.row}>Введите ваше имя: </p>
        <div style={style.row}>
            <input style={style.inputMessage} value={props.msgForSend} onChange={props.handleChangeMsg}></input>
            <button style={style.buttons} onClick={props.handleClickLoginButton}>Войти в чат</button>
        </div>
    </div>
);

LoginWidget.propTypes = {
    loginName: PropTypes.string.isRequired,
    handleChangeMsg: PropTypes.func.isRequired,
    handleClickLoginButton: PropTypes.func.isRequired
};

//export default LoginWidget;

export default connect(
    store => ({msgForSend: store.msgForSend}),
    (dispatch,props) => ({ handleChangeMsg: (event) => dispatch({type:'CHANGEMSG', msgForSend:event.target.value}),
        handleClickLoginButton:() => dispatch({type:'LOGIN', senderName:props.msgForSend}) })
)(LoginWidget);
