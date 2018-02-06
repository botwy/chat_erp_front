/**
 * Created by botwy 03.01.18
 */
import React, { Component } from 'react';
import axios from 'axios';
import LoginWidget from './LoginWidget';
import HeaderWidget from './HeaderWidget';
import MsgAreaWidget from './MsgAreaWidget';
import style from './Style';
import PropTypes from 'prop-types';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: null,
            login: false,
            senderName: "",
            msgForSend: "",
            intervalId: null
        };
        this.handleClickLoginButton=this.handleClickLoginButton.bind(this);
        this.handleChangeMsg=this.handleChangeMsg.bind(this);
        this.handleSendMsg=this.handleSendMsg.bind(this);
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
                if (response.data===true) {
                    this.setState({login: true, senderName: this.state.msgForSend});
                    this.getChats();
                    this.setState({msgForSend:""});

                    let intervalId = setInterval(()=>this.getChats(),5000);
                    this.setState({intervalId});
                }

            })
            .catch((errror) => console.error(errror))
    }

    handleSendMsg(e) {

        axios.get('http://localhost:8080/chat/new_msg?name='+this.state.senderName+'&'+'msg='+this.state.msgForSend)
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
    }*/

    componentWillUnMount() {
        clearInterval(this.state.intervalId);
    }

    render() {
        console.log(this.state.messages);
        if (!this.state.login) {
            return (
                <LoginWidget handleChangeMsg={this.handleChangeMsg}
                             handleClickLoginButton={this.handleClickLoginButton}/>
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
          <HeaderWidget senderName={this.state.senderName} msgForSend={this.state.msgForSend}
                        handleChangeMsg={this.handleChangeMsg} handleSendMsg={this.handleSendMsg}/>
           <MsgAreaWidget messages={this.state.messages}/>
            </div>
        )
    }
}

export default App;