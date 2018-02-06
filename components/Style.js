import React from 'react';

const style = {
    column: {
        display: 'flex',
        flexDirection: 'column'
    },
    row: {
        margin: 5,
        height: 30,
        display: 'flex',
        justifyContent: 'left',
        flexDirection: 'row'
    },
    formSendMsg:{
        position: 'fixed',
        display: 'flex',
        flexDirection: 'row'
    },
    messagesArea: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 70
    },
    sender: {
        color: 'blue',
        fontStyle: 'italic'
    },
    headerName: {
        color: 'red',
        fontStyle: 'italic'
    },
    message: {
        color: 'grey',
        marginLeft: 10,
    },
    inputMessage: {
        width: 300,
        color: 'grey'
    },
    buttons:{
        width: 160,
        marginLeft: 5,
        justifyContent: 'left',
    }

};

export default style;