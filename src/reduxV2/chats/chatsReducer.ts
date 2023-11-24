import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { actionType } from '../../types/actionDataType'
import { $ChatsReducerType, messagesType } from '../../types/ChatsReducerType'
import { addLocalMessagesUtility, addNewMessageUtility, modifyMessagesUtility } from '../../utils/ChatsModifyUtility'
export const initialState: $ChatsReducerType = {
  data: {},
  randomIdsArr: [],
}
interface MessageContent {
  randomId: string,
  content: string,
  createdAt: string,
  isLink: boolean,
  mentions: any[],
  orgId: string,
  parentId: string,
  senderId: string,
  senderType: string,
  teamId: string,
  updatedAt: string,
  attachment: any[],
  mentionsArr: any[],
  parentMessage: string,
  accessToken: string
}
export const reducers: ValidateSliceCaseReducers<$ChatsReducerType, SliceCaseReducers<$ChatsReducerType>> = {
  updateChatState(state, action: actionType<any>) {

  },
  fetchMessagesStartV2(state, action: actionType<{ teamId: string, accessToken: string, skip: number }>) {
    state.data[action.payload.teamId] = { ...state.data[action.payload.teamId], isLoading: true, parentMessages: {} }
  },
  fetchMessagesSuccessV2(state, action: actionType<{ messages: [], parentMessages: [], skip: number, teamId: string }>) {
    const { messages, parentMessages } = modifyMessagesUtility(action?.payload)
    state.data[action.payload.teamId] = {
      ...state.data[action.payload.teamId],
      isLoading: false,
      messages: action?.payload?.skip > 0 ? [...state.data[action.payload.teamId].messages, ...messages] : messages,
      parentMessages: { ...state.data[action.payload.teamId].parentMessages, ...parentMessages }
    }
  },
  setlocalMsgActionV2(state, action: actionType<MessageContent>) {
    const { data, parentKey, parentObj } = addLocalMessagesUtility(state, action?.payload)

    return {
      ...state,
      data: {
        ...state?.data,
        [data?.teamId]: {
          ...state?.data[data?.teamId],
          messages: state?.data[data?.teamId]?.messages
            ? [data, ...state?.data[data?.teamId]?.messages]
            : [data],
          parentMessages:
            parentKey != undefined
              ? state?.data[data?.teamId]?.parentMessages
                ? { ...parentObj, ...state?.data[data?.teamId]?.parentMessages }
                : parentObj
              : state?.data[data?.teamId]?.parentMessages,
        },
      },
      randomIdsArr:
        state?.randomIdsArr?.length > 0
          ? [...state?.randomIdsArr, data?.randomId]
          : [data?.randomId],
    };
  },
  sendMessageStartV2(state, action: actionType<{ message: string, teamId: string, orgId: string, senderId: string, token: string, parentId: string, attachment: any[], mentionsArr: any[] }>) {
    // console.log("send msg start reducer called----;;;;;\n",action?.payload);

    console.log("inside reducer------>", action.payload);

    // return initialState
  },

  addNewMessageV2(state, action: actionType<{ messageObject: messagesType, userId: string }>) {
    const { tempParentMessage, parentId, message } = addNewMessageUtility(state, action?.payload);
    console.log("updated message", message, "-00-0-0-0-0");

    const teamId = message?.teamId
    return {
      ...state,
      data: {
        ...state?.data,
        [teamId]: {
          ...state?.data[teamId],
          messages: state?.data[teamId]?.messages
            ? [message, ...state?.data[teamId]?.messages]
            : [message],
          parentMessages:
            state?.data[teamId]?.parentMessages == undefined
              ? tempParentMessage
              : {
                ...state.data[teamId]?.parentMessages,
                [parentId]: tempParentMessage[parentId],
              },
        },
      },
    };
  },

  resetChatState() {
    return initialState
  }
}