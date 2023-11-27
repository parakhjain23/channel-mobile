import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { actionType } from '../../types/actionDataType'
import { $ChatsReducerType, messagesType } from '../../types/ChatsReducerType'
import { addLocalMessagesUtility, addNewMessageUtility, modifyMessagesUtility } from '../../utils/ChatsModifyUtility'
import uuid from 'react-native-uuid';
export const initialState: $ChatsReducerType = {
    data: {},
    // randomIdsArr: [],
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
    setlocalMsgActionV2(state, action: actionType<messagesType>) {
        // const randomId = uuid.v4();
        // const { data, parentKey, parentObj } = addLocalMessagesUtility(state, action?.payload)
        // data['requestId']=randomId;
        
        // return {
        //   ...state,
        //   data: {
        //     ...state?.data,
        //     [data?.teamId]: {
        //       ...state?.data[data?.teamId],
        //       messages: state?.data[data?.teamId]?.messages
        //         ? [data, ...state?.data[data?.teamId]?.messages]
        //         : [data],
        //       parentMessages:
        //         parentKey != undefined
        //           ? state?.data[data?.teamId]?.parentMessages
        //             ? { ...parentObj, ...state?.data[data?.teamId]?.parentMessages }
        //             : parentObj
        //           : state?.data[data?.teamId]?.parentMessages,
        //     },
        //   }
        // };
    },
    sendMessageStartV2(state, action: actionType<messagesType>) {
      const randomId = uuid.v4();
      const { data, parentKey, parentObj } = addLocalMessagesUtility(state, action?.payload)
      data['requestId']=randomId;

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
        }
      };
    },
    
    addNewMessageV2(state, action: actionType<{ messageObject: messagesType, userId: string }>) {
      const { tempParentMessage, parentId, message } = addNewMessageUtility(state, action?.payload);
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
    resetChatState(){
        return initialState
    }
}