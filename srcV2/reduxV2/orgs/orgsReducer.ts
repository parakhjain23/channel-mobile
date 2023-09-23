import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { actionType } from '../../types/actionDataType'
import { $OrgsReducerType } from '../../types/orgsReducerType'
export const initialState: $OrgsReducerType = {
    isLoading: false,
    orgs: [],
    orgIdAndNameMapping: {},
    orgsWithNewMessages: {},
    unreadCountForDrawerIcon: 0,
    noOrgsFound : false,
}

export const reducers: ValidateSliceCaseReducers<$OrgsReducerType, SliceCaseReducers<$OrgsReducerType>>  = {
    updateOrgsState(state,action: actionType<any>){
        
    }
}