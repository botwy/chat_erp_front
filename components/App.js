/**
 * Created by botwy 03.01.18
 */
import React, {Component} from 'react';
import LoginWidget from './widgets/LoginWidget';
import HeaderWidget from './widgets/HeaderWidget';
import MsgAreaWidget from './widgets/MsgAreaWidget';
import ExitWidget from './widgets/ExitWidget';
import style from './Style';
import PropTypes from 'prop-types';
import {connect} from "react-redux";


class App extends Component {

      componentWillUnmount() {
        //clearInterval(this.state.intervalId);
        window.removeEventListener("beforeunload", this.tabCloseHandler);
    }

    render() {
        if (!this.props.login) return <LoginWidget/>;

        if (this.props.exitFromChat) return <ExitWidget/>;

        return (
            <div style={style.column}>
                <HeaderWidget/>
                <MsgAreaWidget/>
            </div>
        );
    }
}

export default connect(
    store => ({login: store.login, exitFromChat: store.exitFromChat})
)(App);