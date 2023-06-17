import {put, call} from 'redux-saga/effects';
import {getMessagesOfTeamApi} from '../../../api/messages/getMessagesOfTeamApi';
import {sendMessageApi} from '../../../api/messages/sendMessageApi';
import * as Actions from '../../Enums';
import {moveChannelToTop} from '../channels/ChannelsAction';

export function* getChats({teamId, token, skip, lastMessageId}) {
  try {
    var response = yield call(getMessagesOfTeamApi, teamId, token, skip);
    if (
      lastMessageId == undefined ||
      lastMessageId !== response?.messages[0]?.['_id']
    ) {
      yield put(getChatsSuccess(response, teamId, skip));
    }
  } catch (error) {
    console.warn(error);
  }
}

export function getChatsStart(teamId, token, skip, lastMessageId) {
  return {
    type: Actions.FETCH_CHAT_START,
    teamId,
    token,
    skip,
    lastMessageId,
  };
}
export function getChatsSuccess(data, teamId, skip) {
  return {
    type: Actions.FETCH_CHAT_SUCCESS,
    teamId: teamId,
    messages: data.messages,
    parentMessages: data.parentMessages,
    skip: skip,
  };
}
export function getChatsReset() {
  return {
    type: Actions.FETCH_CHAT_RESET,
  };
}
export function getChatsError() {
  return {
    type: Actions.FETCH_CHAT_ERROR,
  };
}

export function* sendMessage({
  message,
  teamId,
  orgId,
  senderId,
  token,
  parentId,
  attachment,
  mentionsArr,
}) {
  try {
    yield call(
      sendMessageApi,
      message,
      teamId,
      orgId,
      senderId,
      token,
      parentId,
      attachment,
      mentionsArr,
    );
  } catch (error) {
    console.warn(error);
  }
}
export function sendMessageStart(
  message,
  teamId,
  orgId,
  senderId,
  token,
  parentId,
  attachment,
  mentionsArr,
) {
  return {
    type: Actions.SEND_MESSAGE_START,
    message,
    teamId,
    orgId,
    senderId,
    token,
    parentId,
    attachment,
    mentionsArr,
  };
}

export function setGlobalMessageToSend(messageObj) {
  return {
    type: Actions.SET_GLOBAL_MESSAGE_TO_SEND,
    messageObj,
  };
}

export function addNewMessage(message, userid) {
  return {
    type: Actions.ADD_NEW_MESSAGE,
    teamId: message?.teamId,
    message: message,
    parentMessage: message?.parentMessage,
    userid,
  };
}
