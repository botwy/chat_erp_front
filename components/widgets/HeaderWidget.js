import React from 'react';
import style from "../Style";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import EventSystem from "../EventSystem";
import {changeMsgAction} from '../actions';

const HeaderWidget = (props)=>
    (<div style={style.formSendMsg}>
            <p style={style.headerName}>Ваше имя: {props.senderName}</p>
            <div style={style.row}>
                <input style={style.inputMessage} value={props.msgForSend} onChange={props.onchangeMsg}></input>
                <button style={style.buttons} onClick={EventSystem.events.sendMsg}>Отправить сообщение</button>
                <button style={style.buttons} onClick={EventSystem.events.exitChat}>Покинуть чат</button>
            </div>

        </div>
    );

HeaderWidget.propTypes = {
    senderName: PropTypes.string.isRequired,
    msgForSend: PropTypes.string.isRequired,
    onchangeMsg: PropTypes.func.isRequired
};

export default connect(
    store => ({senderName: store.senderName, msgForSend: store.msgForSend}),
    (dispatch, props) => ({
        onchangeMsg: event => dispatch(changeMsgAction(event.target.value)),

    })
)(HeaderWidget);

