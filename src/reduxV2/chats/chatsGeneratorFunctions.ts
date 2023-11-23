import { call, put } from "redux-saga/effects";
import { getMessagesOfTeamApi } from "../../api/messages/getMessagesOfTeamApi";
import { fetchMessagesSuccessV2 } from "./chatsSlice";
import { actionType } from "../../types/actionDataType";
// import { SendMassagePayload } from "./chatsReducer";
// import { sendMessageApi } from "../../api/messages/sendMessageApi";
import { messagesType } from "../../types/ChatsReducerType";
import { sendMessageApiV2 } from "../../api/messages/sendMessageApiV2";

export function* getMessages(action:actionType<{teamId:string,accessToken:string,skip:number}>) {
    try {
      var response = yield call(getMessagesOfTeamApi,action?.payload?.teamId,action?.payload?.accessToken,action?.payload?.skip);
      yield put(fetchMessagesSuccessV2({
        messages:response?.messages ,
        parentMessages:response?.parentMessages , 
        teamId:action?.payload?.teamId,
        skip:action?.payload?.skip
      }));
    } catch (error) {
      console.warn(error);
    }
  }
  
  export function* sendMessage(action:actionType<messagesType>){
    try {
      // console.log("inside saga called--------)))\n" ,action?.payload);
      
      var response = yield call(sendMessageApiV2,action?.payload);
      
  } catch (error) {
    console.warn(error);
  }

} 