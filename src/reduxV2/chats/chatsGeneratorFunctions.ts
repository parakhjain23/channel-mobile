import { call, put } from "redux-saga/effects";
import { getMessagesOfTeamApi } from "../../api/messages/getMessagesOfTeamApi";
import { fetchMessagesSuccessV2 } from "./chatsSlice";
import { actionType } from "../../types/actionDataType";

export function* getMessages(action:actionType<{teamId:string,accessToken:string,skip:number}>) {
    try {
      var response = yield call(getMessagesOfTeamApi,action?.payload?.teamId,action?.payload?.accessToken,action?.payload?.skip);
      console.log(response,"chats-0-0-0");
        
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