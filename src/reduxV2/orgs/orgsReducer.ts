import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { data } from 'cheerio/lib/api/attributes'
import { actionType } from '../../types/actionDataType'
import { $OrgsReducerType, orgDetailType } from '../../types/orgsReducerType'
import { orgIdAndDataMappingUtility } from '../../utils/mappingUtility'
export const initialState: $OrgsReducerType = {
    isLoading: false,
    currentOrgId: null,
    orgs: [],
    orgIdAndDataMapping: {},
    orgsWithNewMessages: {},
    unreadCountForDrawerIcon: 0,
    noOrgsFound: false,
}

export const reducers: ValidateSliceCaseReducers<$OrgsReducerType, SliceCaseReducers<$OrgsReducerType>> = {
    updateOrgsState(state, action: actionType<any>) {
        return { ...state, ...action.payload }
    },
    setCurrentOrgIdV2(state, action: actionType<{ [key: string]: string }>) {
        state.isLoading = false
        state.currentOrgId = action.payload.orgId
    },
    getAllOrgsSuccessV2(state, action: actionType<orgDetailType[]>) {
        const mapping = orgIdAndDataMappingUtility(action?.payload)
        state.orgs = action.payload
        state.orgIdAndDataMapping = mapping
    },
    increaseCountOnOrgCardV2(state, action:actionType<{orgId:string}>){
        const {orgId} = action?.payload
        var tempObj:any = {};
        tempObj = {
            ...state.orgsWithNewMessages,
            [orgId] : state.orgsWithNewMessages?.[orgId] + 1
        }
        state.orgsWithNewMessages = tempObj
    },
    getAllOrgsUnreadCountSuccessV2(state,action:actionType<[]>){
        const data = action?.payload;
        var tempObj:any = {};
        for(let i=0;i<data.length;i++){
            tempObj = {
                [data[i]?.orgId]: data[i]?.count
            }
        }
        state.orgsWithNewMessages = tempObj
    }
}