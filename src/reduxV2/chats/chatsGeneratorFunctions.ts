import { call, put } from "redux-saga/effects";
import { getMessagesOfTeamApi } from "../../api/messages/getMessagesOfTeamApi";
import { fetchMessagesSuccessV2 } from "./chatsSlice";
import { actionType } from "../../types/actionDataType";
import { SendMassagePayload } from "./chatsReducer";

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

export function* sendMessages(action:actionType<{accessToken:string,teamId:string,message:string,orgId:string,senderId:string,parentId:string,attachment:any[],mentionsArr:any[]}>){
  try{
    console.log("send meedage api call");
  // var response = yield call()
  }
  catch(error){
    console.warn(error);
  }

} 