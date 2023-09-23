import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { $AllUserInfoReducerType } from '../../types/allUserInfoReducerType'
import {actionType} from '../../types/actionDataType'
export const initialState: $AllUserInfoReducerType = {
    currentUser:{},
    allUsers: [],
    userIdAndDataMapping:{},
    isLoading: false,
}

export const reducers: ValidateSliceCaseReducers<$AllUserInfoReducerType, SliceCaseReducers<$AllUserInfoReducerType>>  = {
    updateAllUsersState(state,action: actionType<any>){
        return {...state,...action.payload}
    },
    
}
