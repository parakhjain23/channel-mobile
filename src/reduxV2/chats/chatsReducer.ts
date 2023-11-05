import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { actionType } from '../../types/actionDataType'
import { $ChatsReducerType } from '../../types/ChatsReducerType'
import { modifyMessagesUtility } from '../../utils/ChatsModifyUtility'
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
    resetChatState(){
        return initialState
    }
}