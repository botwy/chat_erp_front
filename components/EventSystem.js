import axios from "axios";
import {loginAction, getChatsAction, didSendMsgAction, didExitFromChatAction, didReturnChatAction, didTabCloseAction} from './actions';

class EventSystem {


   static getChats() {
        axios.get('http://localhost:8080/chat/allchats')
            .then((response) => {
                const newMessages = response.data.reverse();
                if (newMessages.length>EventSystem.prevMsgsLength) EventSystem.store.dispatch(getChatsAction(newMessages));
                EventSystem.prevMsgsLength=newMessages.length;
            } )
            .catch((errror) => console.error(errror))
    }

    static loginTryEvent(loginName) {
            //? так плохо?
            //const name = document.getElementById("login_input").value;
        //    alert("try request to server");
            axios.get('http://localhost:8080/chat/login?name='+loginName)
                .then((response) => {
                    if (response.data===false) {
                        alert("Введите другое имя!");
                    }
                    if (response.data===true) {
                       // alert("O.K.");
                        // this.props.loginToChat();
                        EventSystem.intervalId = setInterval(()=>EventSystem.getChats(),3000);
                        window.addEventListener("beforeunload", EventSystem.events.tabClose);
                        EventSystem.store.dispatch(loginAction(loginName));
                        EventSystem.getChats();
                    }

                })
                .catch((errror) => console.error(errror));

    }

    static sendMsgEvent(senderName,msgText) {
        const msg = {senderName, msgText};
        axios.post('http://localhost:8080/chat/new_msg', msg)
            .then((response) => {
                if (response.data===true) {
                    EventSystem.getChats();
                    EventSystem.store.dispatch(didSendMsgAction()) ;
                }

            })
            .catch((errror) => console.error(errror))
    }

    static exitChatEvent(senderName) {
        axios.get('http://localhost:8080/chat/exit?name='+senderName)
            .then((response) => {
                if (response.data===true) {
                    clearInterval(EventSystem.intervalId);
                    EventSystem.store.dispatch(didExitFromChatAction()) ;
                }

            })
            .catch((errror) => console.error(errror))
    }

    static returnChatEvent(senderName) {
        axios.get('http://localhost:8080/chat/return?name='+senderName)
            .then((response) => {
                if (response.data===true) {
                    EventSystem.intervalId = setInterval(()=>EventSystem.getChats(),3000);
                    EventSystem.getChats();
                    EventSystem.store.dispatch(didReturnChatAction()) ;
                }

            })
            .catch((errror) => console.error(errror))
    }

    static tabCloseEvent(e, senderName) {
        axios.get('http://localhost:8080/chat/close?name=' + senderName)
            .then().catch((errror) => console.error(errror));
        clearInterval(EventSystem.intervalId);
        EventSystem.store.dispatch(didTabCloseAction()) ;
        e.preventDefault();
        return e.returnValue = 'Вы уверены, что хотите покинуть чат?';
    }
}
EventSystem.store = null;
EventSystem.intervalId = null;
EventSystem.prevMsgsLength = 0;
EventSystem.events={
    loginTry:()=> EventSystem.loginTryEvent( EventSystem.store.getState().loginName),
    sendMsg: ()=>{
        let state = EventSystem.store.getState();
        EventSystem.sendMsgEvent(state.senderName, state.msgForSend);
    },
    exitChat: ()=>EventSystem.exitChatEvent(EventSystem.store.getState().senderName),
    returnChat:()=>{
        let state = EventSystem.store.getState();
        EventSystem.returnChatEvent(state.senderName);
        },
    tabClose: (e)=>{
        let state = EventSystem.store.getState();
        EventSystem.tabCloseEvent(e,state.senderName);
    }

}


export default EventSystem;
