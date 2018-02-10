/**
 * Created by botwy 03.01.18
 */
import React, { Component } from 'react';
import axios from 'axios';

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

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: null,
            login: false,
            senderName: "",
            msgForSend: "",
            intervalId: null,
            exitFromChat: false
        };
        this.handleClickLoginButton=this.handleClickLoginButton.bind(this);
        this.handleChangeMsg=this.handleChangeMsg.bind(this);
        this.handleSendMsg=this.handleSendMsg.bind(this);
        this.handleExitChat=this.handleExitChat.bind(this);
        this.handleReturnChat=this.handleReturnChat.bind(this);
        this.tabCloseHandler =  this.tabCloseHandler.bind(this);
    }

    handleChangeMsg(e) {
        //? не обновлялся state
       // this.state.msgForSend=e.target.value;
        this.setState({msgForSend:e.target.value});
    }

    getChats() {
        axios.get('http://localhost:8080/chat/allchats')
            .then((response) => {this.setState({messages: response.data.reverse()});})
            .catch((errror) => console.error(errror))
    }

    handleClickLoginButton() {
        //? так плохо?
        //const name = document.getElementById("login_input").value;
        axios.get('http://localhost:8080/chat/login?name='+this.state.msgForSend)
            .then((response) => {
                if (response.data===false) {
                    this.setState({msgForSend:""});
                    alert("Введите другое имя!");
                }
                if (response.data===true) {
                    this.setState({login: true, senderName: this.state.msgForSend});
                    this.getChats();
                    this.setState({msgForSend:""});

                    let intervalId = setInterval(()=>this.getChats(),5000);
                    this.setState({intervalId});

                    window.addEventListener("beforeunload", this.tabCloseHandler);
                }

            })
            .catch((errror) => console.error(errror))
    }

    handleExitChat() {
        axios.get('http://localhost:8080/chat/exit?name='+this.state.senderName)
            .then((response) => {
                if (response.data===true) {
                    this.setState({exitFromChat: true});
                }

            })
            .catch((errror) => console.error(errror))
    }

    handleReturnChat() {
        axios.get('http://localhost:8080/chat/return?name='+this.state.senderName)
            .then((response) => {
                if (response.data===true) {
                    this.setState({exitFromChat: false});
                    this.getChats();
                }

            })
            .catch((errror) => console.error(errror))
    }

    tabCloseHandler(e) {
        axios.get('http://localhost:8080/chat/close?name='+this.state.senderName)
            .then().catch((errror) => console.error(errror));
        e.preventDefault();
       return e.returnValue = 'Вы уверены, что хотите покинуть чат?';
    }

    handleSendMsg(e) {
        const senderName = this.state.senderName;
        const msgText = this.state.msgForSend;
        const msg = {senderName, msgText};
        axios.post('http://localhost:8080/chat/new_msg', msg)
            .then((response) => {
                if (response.data===true) {
                    this.getChats();
                    this.setState({msgForSend:""});
                }

            })
            .catch((errror) => console.error(errror))
    }

   /* componentDidMount() {
        let intervalId = setInterval(()=>this.getChats(),3000);
        this.setState({intervalId});
        window.addEventListener("beforeunload", this.tabCloseHandler);
    }*/

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
        window.removeEventListener("beforeunload",this.tabCloseHandler);
    }

    render() {
        console.log(this.state.messages);
        if (!this.state.login) {
            return (
                <div style={style.column}>
                    <p style={style.row}>Введите ваше имя: </p>
                    <div style={style.row}>
                    <input style={style.inputMessage} value={this.state.msgForSend} onChange={this.handleChangeMsg}></input>
                    <button style={style.buttons} onClick={this.handleClickLoginButton}>Войти в чат</button>
                    </div>
                </div>
            );
        }

        if (this.state.exitFromChat) {
            return (
                <div style={style.column}>
                    <p style={style.headerName}>Ваше имя: {this.state.senderName}</p>
                    <div style={style.row}>
                        <button style={style.buttons} onClick={this.handleReturnChat}>Вернуться в чат</button>
                    </div>
                </div>
            );
        }
        if (!this.state.messages){
            return (
                <div>
                    Loading...
                </div>
            )
        }
        return (
            <div style={style.column}>
                <div style={style.formSendMsg}>
                    <p style={style.headerName}>Ваше имя: {this.state.senderName}</p>
                <div style={style.row}>
                    <input style={style.inputMessage} value={this.state.msgForSend} onChange={this.handleChangeMsg}></input>
                    <button style={style.buttons} onClick={this.handleSendMsg}>Отправить сообщение</button>
                    <button style={style.buttons} onClick={this.handleExitChat}>Покинуть чат</button>
                </div>
                </div>
                <div style={style.messagesArea}>
                {this.state.messages.map(({id, senderName, msgText}) => (
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
            </div>
        )
    }
}

export default App;