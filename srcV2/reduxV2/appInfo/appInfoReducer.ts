import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { $AppInfoReducerType } from '../../types/appInfoReducerType'
import { actionType } from '../../types/actionDataType'
export const initialState: $AppInfoReducerType = {
    appVersion:'',
    accessToken:'',
    isAuthenticated:false,
    isInternetConnected:false,
    isSocketConnected:false,
    signinMethod:'',
    currentOrgId:'',
    currentChannelId:'',
    deviceType:''
}

export const reducers: ValidateSliceCaseReducers<$AppInfoReducerType, SliceCaseReducers<$AppInfoReducerType>>  = {
    updateAppInfoState(state,action: actionType<{[key:string]:string | boolean}>){
        return {...state,...action.payload}
    },
    resetAppInfoState(){
        return initialState
    }
}
