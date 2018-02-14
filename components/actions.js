import axios from "axios";
import EventSystem from "./EventSystem";

export const LOGIN = 'LOGIN';
export const GETCHATS = 'GETCHATS';
export const DIDSENDMSG = 'DIDSENDMSG';
export const DIDEXITFROMCHAT = 'DIDEXITFROMCHAT';
export const DIDRETURNCHAT = 'DIDRETURNCHAT';
export const DIDTABCLOSE = 'DIDTABCLOSE';
export const CHANGEMSG = 'CHANGEMSG';
export const CHANGELOGINNAME = 'CHANGELOGINNAME';

export const loginAction = loginName => ({ type: LOGIN, loginName });
export const getChatsAction = messages => ({ type: GETCHATS, messages });
export const didSendMsgAction = () => ({ type: DIDSENDMSG});
export const didExitFromChatAction = () => ({ type: DIDEXITFROMCHAT});
export const didReturnChatAction = () => ({ type: DIDRETURNCHAT});
export const didTabCloseAction = () => ({ type: DIDTABCLOSE});
export const changeMsgAction = (msgForSend) => ({ type: CHANGEMSG, msgForSend});
export const changeLoginNameAction = (loginName) => ({ type: CHANGELOGINNAME, loginName});

export const chatsActionFunction = () => dispatch => {
    axios.get('http://localhost:8080/chat/allchats')
        .then((response) => {
            const newMessages = response.data.reverse();
            dispatch({ type: GETCHATS, messages:newMessages });
            console.log(newMessages);
        })
        .catch((errror) => console.error(errror))
};