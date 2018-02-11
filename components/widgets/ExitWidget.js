import React from 'react';
import style from "../Style";
import PropTypes from 'prop-types';
import HeaderWidget from "./HeaderWidget";
import {connect} from "react-redux";
import EventSystem from "../EventSystem";

const ExitWidget =(props)=>(
    <div style={style.column}>
        <p style={style.headerName}>Ваше имя: {props.senderName}</p>
        <div style={style.row}>
            <button style={style.buttons} onClick={EventSystem.events.returnChat}>Вернуться в чат</button>
        </div>
    </div>
);

ExitWidget.propTypes = {
    senderName: PropTypes.string.isRequired,
};

export default connect(
    store => ({senderName: store.senderName})
)(ExitWidget);