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
