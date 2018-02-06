import React from 'react';
import style from "./Style";
import PropTypes from 'prop-types';

const HeaderWidget = ({senderName,msgForSend,handleChangeMsg, handleSendMsg})=>
    (<div style={style.formSendMsg}>
            <p style={style.headerName}>Ваше имя: {senderName}</p>
            <div style={style.row}>
                <input style={style.inputMessage} value={msgForSend} onChange={handleChangeMsg}></input>
                <button style={style.buttons} onClick={handleSendMsg}>Отправить сообщение</button>
            </div>

        </div>
    );

HeaderWidget.propTypes = {
    senderName: PropTypes.string.isRequired,
    msgForSend: PropTypes.string.isRequired,
    handleChangeMsg: PropTypes.func.isRequired,
    handleSendMsg: PropTypes.func.isRequired
};

export default HeaderWidget;

