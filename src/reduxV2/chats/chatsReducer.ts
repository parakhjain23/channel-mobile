import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { actionType } from '../../types/actionDataType'
import { $ChatsReducerType, messagesType } from '../../types/ChatsReducerType'
import { addLocalMessagesUtility, modifyMessagesUtility } from '../../utils/ChatsModifyUtility'
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
  accessToken:string
}
export const reducers: ValidateSliceCaseReducers<$ChatsReducerType, SliceCaseReducers<$ChatsReducerType>>  = {
    updateChatState(state,action: actionType<any>){
        
    },
    fetchMessagesStartV2(state,action:actionType<{teamId:string,accessToken:string,skip:number}>){
        state.data[action.payload.teamId] = {...state.data[action.payload.teamId],isLoading:true,parentMessages:{}}
    },
    fetchMessagesSuccessV2(state,action:actionType<{messages:[],parentMessages:[],skip:number,teamId:string}>){
        console.log("inside fetch message success");
        const {messages,parentMessages}=modifyMessagesUtility(action?.payload)
        state.data[action.payload.teamId] = {
          ...state.data[action.payload.teamId],
          isLoading:false,
          messages: action?.payload?.skip > 0 ? [...state.data[action.payload.teamId].messages,...messages] : messages,
          parentMessages:{...state.data[action.payload.teamId].parentMessages,...parentMessages}
        }
    },
    setlocalMsgActionV2(state,action:actionType<{data:MessageContent}>){
      const {data} = action.payload;
      console.log("diwali--------->",action.payload)
      
      const renderTextWithBreaks = text => {
        const htmlString = text?.replace(/\n/g, '<br/>');
        return htmlString;
      };
      // data.content = renderTextWithBreaks(data?.content);
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
      // if (
      //   action?.message?.senderId !=
      //   state?.data[action?.message?.teamId]?.messages[0]?.senderId
      // ) {
      //   data['sameSender'] = false;
      // } else {
      //   data['sameSender'] = true;
      // }
      // data['isSameDate'] = true;
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
                  ? {...parentObj, ...state?.data[data?.teamId]?.parentMessages}
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
    sendMessageStartV2(state,action:actionType<{message:string,teamId:string,currentOrgId:string,currentUserId:string,accessToken:string,parentId:string,attachment:any[],mentionsArr:any[],skip:number}>){
      console.log("happy!!!@@@",action.payload.message)
      
      return initialState
    },
    resetChatState(){
        return initialState
    }
}