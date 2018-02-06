import React, { Component } from 'react';
import style from './Style';
import PropTypes from 'prop-types';

const LoginWidget=({handleChangeMsg,handleClickLoginButton})=>(
    <div style={style.column}>
        <p style={style.row}>Введите ваше имя: </p>
        <div style={style.row}>
            <input style={style.inputMessage} onChange={handleChangeMsg}></input>
            <button style={style.buttons} onClick={handleClickLoginButton}>Войти в чат</button>
        </div>
    </div>
);

LoginWidget.propTypes = {
    handleChangeMsg: PropTypes.func.isRequired,
    handleClickLoginButton: PropTypes.func.isRequired
};

export default LoginWidget;