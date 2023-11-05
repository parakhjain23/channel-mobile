import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { $AppInfoReducerType } from '../../types/appInfoReducerType'
import { actionType } from '../../types/actionDataType'
export const initialState: $AppInfoReducerType = {
    appVersion: '',
    accessToken: '',
    isAuthenticated: false,
    isInternetConnected: false,
    isSocketConnected: false,
    signinMethod: '',
    activeChannelId: '',
    deviceType: 'Mobile'
}

export const reducers: ValidateSliceCaseReducers<$AppInfoReducerType, SliceCaseReducers<$AppInfoReducerType>> = {
    updateAppInfoState(state, action: actionType<{ [key: string]: string | boolean }>) {
        return { ...state, ...action.payload }
    },
    getSpaceTokenStartV2(state, action: actionType<{ signinMethod: string, firebaseToken: string }>) {
        state.signinMethod = action.payload.signinMethod
    },
    getSpaceTokenSuccessV2(state, action: actionType<{ accessToken: string }>) {
        state.accessToken = action.payload.accessToken
        state.isAuthenticated = true
    },
    resetAppInfoState() {
        return initialState
    }
}
