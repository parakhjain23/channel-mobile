import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit';
import { actionType } from '../../types/actionDataType';
import { $SearchedDataReducerType } from '../../types/searchedDataType';
export const initialState: $SearchedDataReducerType = {
    isLoading: false,
    searchedChannels: [],
    searchedUserProfile: {},
};

export const reducers: ValidateSliceCaseReducers<
    $SearchedDataReducerType,
    SliceCaseReducers<$SearchedDataReducerType>
> = {
    updateSearchedDataState(state, action: actionType<any>) { },
    getChannelsByQueryStartV2(state, action: actionType<{ query: string; accessToken: string; orgId: string }>) {
        state.isLoading = true
    },
    getChannelsByQuerySuccessV2(state, action: actionType<any>) {
        state.isLoading = false
        state.searchedChannels = action?.payload
    }
};
