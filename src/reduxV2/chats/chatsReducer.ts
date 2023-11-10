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
    sendMessageStartV2(state,action:actionType<messagesType>){
        // const {data}=addLocalMessagesUtility(state,action?.payload);
        // state.data[data?.teamId] = {
        //     ...state.data[action.payload.teamId],
        //     messages : state?.data[data?.teamId]?.messages ? [data, ...state?.data[data?.teamId]?.messages] : [data],
        //     parentMessages : data?.parentKey != undefined ? state?.data[data?.teamId]?.parentMessages ? {...data?.parentObj, ...state?.data[data?.teamId]?.parentMessages}
        //             : data?.parentObj
        //         : state?.data[data?.teamId]?.parentMessages,
        // }
        // state.randomIdsArr = state?.randomIdsArr?.length > 0 ? [...state?.randomIdsArr, data?.randomId] : [data?.randomId],
        console.log("inside message send1",action.payload.accessToken);
        console.log("inside message send2",action.payload.teamId);
        console.log("inside message send3",action.payload.message);
        console.log("inside message send4",action.payload.orgId);
        console.log("inside message send5",action.payload.senderId);
        console.log("inside message send6",action.payload.parentId);
        console.log("inside message send7",action.payload.attachment);
        console.log("inside message send8",action.payload.mentionsArr);
        console.log("inside message send9",action.payload.content);

        const {data} = action.payload;
      const renderTextWithBreaks = (text:string) => {
        const htmlString = text?.replace(/\n/g, '<br/>');
        return htmlString;
      };
    //   data.content = renderTextWithBreaks(data?.content ?? '');
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
        action?.payload?.message?.senderId !=
        state?.data[action?.payload?.message?.teamId]?.messages[0]?.senderId
      ) {
        // data['sameSender'] = false;
      } else {
        // data['sameSender'] = true;
      }
    //   data['isSameDate'] = true;
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
    resetChatState(){
        return initialState
    }
}