import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { $AllUserInfoReducerType, UserDetailsType } from '../../types/allUserInfoReducerType'
import {actionType} from '../../types/actionDataType'
import { userIdAndDataMappingUtility } from '../../utils/mappingUtility'
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
    getAllUsersSuccessV2(state,action: actionType<UserDetailsType[]>){
        const mapping = userIdAndDataMappingUtility(action.payload)
        state.allUsers = action.payload
        state.userIdAndDataMapping = mapping
    }
}
