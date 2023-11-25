import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
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
    }
}