import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { actionType } from '../../types/actionDataType'
import { $ChatsReducerType } from '../../types/ChatsReducerType'
export const initialState: $ChatsReducerType = {
    data: {},
    randomIdsArr: [],
}

export const reducers: ValidateSliceCaseReducers<$ChatsReducerType, SliceCaseReducers<$ChatsReducerType>>  = {
    updateChatState(state,action: actionType<any>){
        
    },
    resetChatState(){
        return initialState
    }
}