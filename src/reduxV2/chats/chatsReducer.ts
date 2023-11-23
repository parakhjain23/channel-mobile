import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { actionType } from '../../types/actionDataType'
import { $ChatsReducerType, messagesType } from '../../types/ChatsReducerType'
import { addLocalMessagesUtility, modifyMessagesUtility } from '../../utils/ChatsModifyUtility'
export const initialState: $ChatsReducerType = {
    data: {},
    randomIdsArr: [],
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
      setlocalMsgActionV2(state,action:actionType<messagesType>){
        // console.log("set local msg reducer called---->  \n ",action?.payload)
        const {data,parentKey,parentObj}=addLocalMessagesUtility(state,action?.payload)
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
    sendMessageStartV2(state,action:actionType<messagesType>){
      // console.log("send msg start reducer called----;;;;;\n",action?.payload);

      console.log("inside reducer------>55",action.payload);
      
      // return initialState
    },
    resetChatState(){
        return initialState
    }
}