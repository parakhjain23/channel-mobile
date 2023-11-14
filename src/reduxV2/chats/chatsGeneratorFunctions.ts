import { call, put } from "redux-saga/effects";
import { getMessagesOfTeamApi } from "../../api/messages/getMessagesOfTeamApi";
import { fetchMessagesSuccessV2 } from "./chatsSlice";
import { actionType } from "../../types/actionDataType";
import { SendMassagePayload } from "./chatsReducer";
import { sendMessageApi } from "../../api/messages/sendMessageApi";

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
  
  export function* sendMessages(action:actionType<{message:string,teamId:string,orgId:string,senderId:string,accessToken:string,parentId:string,attachment:any[],mentionsArr:any[]}>){
    try {
      console.log("send message start v2 api call  %%%",action.payload.message);
      var response = yield call(sendMessageApi,action?.payload?.message,action?.payload?.teamId,action?.payload?.orgId,action?.payload?.senderId,action?.payload?.accessToken,action?.payload?.parentId,action?.payload?.attachment,action?.payload?.mentionsArr);
    
    // yield call(
    //   sendMessageApi,
    //   action.payload.message,
    //   action.payload.teamId,
    //   action.payload.orgId,
    //   action.payload.senderId,
    //   action.payload.accessToken,
    //   action.payload.parentId,
    //   action.payload.attachment,
    //   action.payload.mentionsArr,
    // );
  } catch (error) {
    console.warn(error);
  }

} 