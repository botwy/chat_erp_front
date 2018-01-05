/**
 * Created by botwy 03.01.18
 */
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: null
        };
    }

    componentWillMount() {
        axios.get('http://localhost:8080/allchats')
            .then((response) => {this.setState({messages: response.data});})
            .catch((errror) => console.error(errror))
    }

    render() {
        console.log(this.state.messages);
        if (!this.state.messages){
            return (
                <div>
                    Loading...
                </div>
            )
        }
        return (
            <div>
                {this.state.messages.map(({id, senderName, msgText}) => (
                    <div key={id}>
                        <div>
                            <div>имя отправителя:</div>
                            <div>{senderName}</div>
                        </div>
                        <div>
                            <div>сообщение:</div>
                            <div>{msgText}</div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default App;