import { call, put, select } from "redux-saga/effects";
import { getMessagesOfTeamApi } from "../../api/messages/getMessagesOfTeamApi";
import { fetchMessagesSuccessV2 } from "./chatsSlice";
import { actionType } from "../../types/actionDataType";
import { messagesType } from "../../types/ChatsReducerType";
import { sendMessageApiV2 } from "../../api/messages/sendMessageApiV2";
import { $ReduxCoreType } from "../../types/reduxCoreType";

export function* getMessages(action: actionType<{ teamId: string, accessToken: string, skip: number }>) {
  try {
    var response = yield call(getMessagesOfTeamApi, action?.payload?.teamId, action?.payload?.accessToken, action?.payload?.skip);
    yield put(fetchMessagesSuccessV2({
      messages: response?.messages,
      parentMessages: response?.parentMessages,
      teamId: action?.payload?.teamId,
      skip: action?.payload?.skip
    }));
  } catch (error) {
    console.warn(error);
  }
}

export function* sendMessage(action: actionType<messagesType>) {
  try {
    const { isInternetConnected } = yield select((state: $ReduxCoreType) => ({
      isInternetConnected: state?.appInfo?.isInternetConnected
    }));
    if (isInternetConnected) {
      yield call(sendMessageApiV2, action?.payload?.data);
    } else {

    }
  }
  catch (error) {
    console.warn(error);
  }
}
