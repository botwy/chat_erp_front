import React from 'react';
import style from "./Style";
import PropTypes from 'prop-types';

const MsgAreaWidget =({messages})=>(
    <div style={style.messagesArea}>
        {messages.map(({id, senderName, msgText}) => (
            <div key={id} style={style.row}>
                <div>
                    <div style={style.sender}>{senderName}</div>
                </div>
                <div>
                    <div style={style.message}>{msgText}</div>
                </div>
            </div>
        ))}
    </div>
);

MsgAreaWidget.propTypes = {
    messages: PropTypes.array.isRequired
};
export default MsgAreaWidget;