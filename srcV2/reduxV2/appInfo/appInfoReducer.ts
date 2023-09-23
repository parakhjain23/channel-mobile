import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { $AppInfoReducerType } from '../../types/appInfoReducerType'
import { actionType } from '../../types/actionDataType'
export const initialState: $AppInfoReducerType = {
    appVersion:'',
    isAuthenticated:false,
    isInternetConnected:false,
    isSocketConnected:false,
    signinMethod:'',
    currentOrgId:'',
    currentChannelId:'',
}

export const reducers: ValidateSliceCaseReducers<$AppInfoReducerType, SliceCaseReducers<$AppInfoReducerType>>  = {
    updateAppInfoState(state,action: actionType<any>){
        
    }
}
