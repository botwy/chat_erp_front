import React, {Component} from 'react';
import style from "../Style";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

class MsgAreaWidget extends Component {
    render() {
        console.log(this.props.messages);
        if (!this.props.messages)
            return (
                <div style={style.messagesArea}>
                    <div>Loading...</div>
                </div>);

        return (
            <div style={style.messagesArea}>
                {this.props.messages.map(({id, senderName, msgText}) => (
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

    }
}

MsgAreaWidget.propTypes = {
    messages: PropTypes.array
};
export default connect(
    store => ({messages: store.messages})
)(MsgAreaWidget);