import React, { Component } from 'react';
import style from './Style';
import PropTypes from 'prop-types';

const LoginWidget=({loginName,handleChangeMsg,handleClickLoginButton})=>(
    <div style={style.column}>
        <p style={style.row}>Введите ваше имя: </p>
        <div style={style.row}>
            <input style={style.inputMessage} value={loginName} onChange={handleChangeMsg}></input>
            <button style={style.buttons} onClick={handleClickLoginButton}>Войти в чат</button>
        </div>
    </div>
);

LoginWidget.propTypes = {
    loginName: PropTypes.string.isRequired,
    handleChangeMsg: PropTypes.func.isRequired,
    handleClickLoginButton: PropTypes.func.isRequired
};

export default LoginWidget;