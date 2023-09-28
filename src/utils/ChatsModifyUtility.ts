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