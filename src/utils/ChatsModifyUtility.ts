import { messagesType } from "../types/ChatsReducerType";
import uuid from 'react-native-uuid';
export function modifyMessagesUtility(action: { messages: [], parentMessages: [], skip: number }) {
  var tempParentMessages = {};
  var parentId = null;
  let prevDate = null;
  for (let i = 0; i < action?.parentMessages?.length; i++) {
    parentId = action?.parentMessages[i]?._id;
    tempParentMessages[parentId] = action?.parentMessages[i];
  }
  for (let i = 0; i < action?.messages?.length; i++) {
    const date = new Date(action?.messages[i]?.updatedAt);
    const currentCreatedAt = new Date(action?.messages[i]?.createdAt);
    const prevCreatedAt = new Date(action?.messages[i + 1]?.createdAt);
    const timeDiff = Math.abs(prevCreatedAt - currentCreatedAt);
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    const isSameDate = prevDate?.toDateString() === date.toDateString();
    let displayDate = date?.toDateString();
    if (!isSameDate && i > 0) {
      const prevDateString = prevDate?.toDateString();
      displayDate = `${prevDateString}`;
      action.messages[i]['isSameDate'] = false;
      action.messages[i]['timeToShow'] = displayDate;
    } else {
      action.messages[i]['isSameDate'] = true;
      action.messages[i]['timeToShow'] = '';
    }
    prevDate = date;
    if (
      action?.messages[i]?.senderId != action?.messages[i + 1]?.senderId
    ) {
      action.messages[i]['sameSender'] = false;
    } else if (action?.messages[i + 1]?.isActivity) {
      action.messages[i]['sameSender'] = false;
    } else if (minutesDiff > 5) {
      action.messages[i]['sameSender'] = false;
    } else {
      action.messages[i]['sameSender'] = true;
    }
    if (
      action.messages[i].attachment?.length > 0 &&
      action.messages[i].attachment[0].contentType?.includes('audio') &&
      action.messages[i].attachment[0].transcription != undefined
    ) {
      action.messages[i].content =
        action.messages[i].attachment[0].transcription;
    }
  }
  return { parentMessages: tempParentMessages, messages: action?.messages }
}
export function addLocalMessagesUtility(state, messageObj: messagesType) {
  const renderTextWithBreaks = text => {
    const htmlString = text?.replace(/\n/g, '<br/>');
    return htmlString;
  };
  messageObj.content = renderTextWithBreaks(messageObj?.content);
  let parentKey = messageObj?.parentId;
  let parentObj = {};
  if (messageObj?.parentMessage != undefined) {
    for (let i = 0; i < state?.data[messageObj?.teamId]?.messages?.length; i++) {
      if (state?.data[messageObj?.teamId]?.messages[i]?._id == messageObj?.parentId) {
        parentObj[parentKey] = state?.data[messageObj?.teamId]?.messages[i];
        break;
      }
    }
  }
  if (
    messageObj?.senderId !=
    state?.data[messageObj?.teamId]?.messages[0]?.senderId
  ) {
    messageObj['sameSender'] = false;
  } else {
    messageObj['sameSender'] = true;
  }
  messageObj['isSameDate'] = true;
  messageObj['showClock'] = true;
  messageObj.requestId = uuid.v4();
  return { data: messageObj, parentKey: parentKey, parentObj: parentObj }
}
export function modifyEventMessageUtility(state, payload: { messageObject: messagesType, userId: string }) {
  const { senderId, teamId } = payload?.messageObject
  const currentCreatedAt = new Date(payload?.messageObject?.createdAt);
  const prevCreatedAt = new Date(
    state?.data[teamId]?.messages[0]?.createdAt,
  );
  const timeDiff = Math.abs(prevCreatedAt - currentCreatedAt);
  const minutesDiff = Math.floor(timeDiff / (1000 * 60));
  if (
    senderId !=
    state?.data[teamId]?.messages[0]?.senderId
  ) {
    payload.messageObject['sameSender'] = false;
  } else if (minutesDiff > 5) {
    payload.messageObject['sameSender'] = false;
  } else {
    payload.messageObject['sameSender'] = true;
  }
  const date = new Date(payload?.messageObject?.updatedAt);
  const prevsDate = new Date(
    state?.data[teamId]?.messages[0]?.updatedAt,
  );
  const isSameDate = prevsDate?.toDateString() === date.toDateString();
  let displayDate = date?.toDateString();
  if (!isSameDate) {
    const prevDateString = date?.toDateString();
    displayDate = `${prevDateString}`;
    if (state.data[teamId]) {
      state.data[teamId].messages[0].isSameDate = false;
    }
    if (state.data[teamId]) {
      state.data[teamId].messages[0].timeToShow =
        displayDate;
    }
    payload.messageObject['isSameDate'] = true;
    payload.messageObject['timeToShow'] = '';
  } else {
    payload.messageObject['isSameDate'] = true;
    payload.messageObject['timeToShow'] = '';
  }
  var tempParentMessage = {};
  var parentId = payload?.messageObject?.parentMessage?._id;
  tempParentMessage[parentId] = payload?.messageObject?.parentMessage;


  return { parentMessage: tempParentMessage, message: payload?.messageObject }
}