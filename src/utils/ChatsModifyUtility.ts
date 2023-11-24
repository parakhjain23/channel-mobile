import { MessageContent } from "../reduxV2/chats/chatsReducer";

export function modifyMessagesUtility(action:{messages:[],parentMessages:[],skip:number}){
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

    return {parentMessages:tempParentMessages,messages:action?.messages}
}

export function addLocalMessagesUtility(state,action:{message:MessageContent}){
  const {data} = action;
  const renderTextWithBreaks = text => {
    const htmlString = text?.replace(/\n/g, '<br/>');
    return htmlString;
  };
  data.content = renderTextWithBreaks(data?.content);
  let parentKey = data?.parentId;
  let parentObj = {};
  if (data?.parentMessage != undefined) {
    for (let i = 0; i < state?.data[data?.teamId]?.messages?.length; i++) {
      if (state?.data[data?.teamId]?.messages[i]?._id == data?.parentId) {
        parentObj[parentKey] = state?.data[data?.teamId]?.messages[i];
        break;
      }
    }
  }
  if (
    action?.message?.senderId !=
    state?.data[action?.message?.teamId]?.messages[0]?.senderId
  ) {
    data['sameSender'] = false;
  } else {
    data['sameSender'] = true;
  }
  data['isSameDate'] = true;
  return {data:data,parentKey:parentKey,parentObj:parentObj}
}

export function addNewMessageUtility(state,action:{messageObject:{},userid:string}){
  console.log("inside utility$$$$$$$$-:",action?.messageObject);
  
  if (
    action?.messageObject?.senderId == action?.userid &&
    state?.randomIdsArr?.length > 0
  ) {
    console.log("inside if condt");
    
    action.messageObject['randomId'] = state?.randomIdsArr[0];
    state?.randomIdsArr?.shift();
    for (
      let i = 0;
      i < state?.data[action?.messageObject?.teamId]?.messages?.length;
      i++
    ) {
      if (
        state?.data[action?.messageObject?.teamId]?.messages[i]?.randomId ==
        action?.messageObject?.randomId
      ) {
        state?.data[action?.messageObject?.teamId]?.messages?.splice(i, 1);
        action.messageObject['randomId'] = null;
        break;
      }
    }
  }
  const currentCreatedAt = new Date(action?.messageObject?.createdAt);
  const prevCreatedAt = new Date(
    state?.data[action?.messageObject?.teamId]?.messages[0]?.createdAt,
  );
  const timeDiff = Math.abs(prevCreatedAt - currentCreatedAt);
  const minutesDiff = Math.floor(timeDiff / (1000 * 60));
  if (
    action?.messageObject?.senderId !=
    state?.data[action?.messageObject?.teamId]?.messages[0]?.senderId
  ) {
    action.messageObject['sameSender'] = false;
  } else if (minutesDiff > 5) {
    action.messageObject['sameSender'] = false;
  } else {
    action.messageObject['sameSender'] = true;
  }
  const date = new Date(action?.messageObject?.updatedAt);
  const prevsDate = new Date(
    state?.data[action?.messageObject?.teamId]?.messages[0]?.updatedAt,
  );
  const isSameDate = prevsDate?.toDateString() === date.toDateString();
  let displayDate = date?.toDateString();
  if (!isSameDate) {
    const prevDateString = date?.toDateString();
    displayDate = `${prevDateString}`;
    if (state.data[action?.messageObject?.teamId])
      state.data[action?.messageObject?.teamId].messages[0].isSameDate = false;
    if (state.data[action?.messageObject?.teamId])
      state.data[action?.messageObject?.teamId].messages[0].timeToShow =
        displayDate;
    action.messageObject['isSameDate'] = true;
    action.messageObject['timeToShow'] = '';
  } else {
    action.messageObject['isSameDate'] = true;
    action.messageObject['timeToShow'] = '';
  }
  var tempParentMessage = {};
  var parentId = null;
  parentId = action?.messageObject?.parentMessage?._id;
  tempParentMessage[parentId] = action?.messageObject?.parentMessage;
  
  return {tempParentMessage:tempParentMessage,parentId:parentId}

}