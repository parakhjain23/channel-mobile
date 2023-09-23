import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { actionType } from '../../types/actionDataType'
import { $ChannelsReduxType } from '../../types/channelsReducerType'
export const initialState: $ChannelsReduxType = {
    isLoading: false,
    channels: [], 
    recentChannels: [], 
    highlightChannel:{} ,
    userIdAndTeamIdMapping:{} ,
    teamIdAndDataMapping:{} ,
    unReadAndBadgeCountMapping:{}
}

export const reducers: ValidateSliceCaseReducers<$ChannelsReduxType, SliceCaseReducers<$ChannelsReduxType>>  = {
    updateChannelState(state,action: actionType<any>){
        
    }
}
