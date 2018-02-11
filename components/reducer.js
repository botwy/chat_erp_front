import {LOGIN,GETCHATS, DIDSENDMSG, DIDEXITFROMCHAT, DIDRETURNCHAT, DIDTABCLOSE, CHANGEMSG, CHANGELOGINNAME} from './actions'

const reducerMap = {
    [LOGIN]: (state, action) => Object.assign({}, state, {login: true, senderName: action.loginName, msgForSend: ''}),
    [GETCHATS]: (state, action) => Object.assign({}, state, {messages: action.messages}),
    [DIDSENDMSG]: (state) => Object.assign({}, state, {msgForSend: ''}),
    [DIDEXITFROMCHAT]: (state) => Object.assign({}, state, {exitFromChat: true}),
    [DIDRETURNCHAT]: (state) => Object.assign({}, state, {exitFromChat: false}),
    [DIDTABCLOSE]: (state) => Object.assign({}, state, {
        login: false,
        loginName: '',
        senderName: '',
        msgForSend: '',
        messages: null,
        exitFromChat: false
    }),
    [CHANGEMSG]: (state, action) => Object.assign({}, state, {msgForSend: action.msgForSend}),
    [CHANGELOGINNAME]: (state, action) => Object.assign({}, state, {loginName: action.loginName}),
};

export default (state, action) => {
    if (!action.type || !reducerMap[action.type]){
        return state;
    }
    return reducerMap[action.type](state, action);
};