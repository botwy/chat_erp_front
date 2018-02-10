import React from 'react';
import style from "./Style";
import PropTypes from 'prop-types';
import HeaderWidget from "./HeaderWidget";

const ExitWidget =({senderName, handleReturnChat})=>(
    <div style={style.column}>
        <p style={style.headerName}>Ваше имя: {senderName}</p>
        <div style={style.row}>
            <button style={style.buttons} onClick={handleReturnChat}>Вернуться в чат</button>
        </div>
    </div>
);

ExitWidget.propTypes = {
    senderName: PropTypes.string.isRequired,
    handleReturnChat: PropTypes.func.isRequired
};

export default ExitWidget;