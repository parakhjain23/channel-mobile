import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { actionType } from '../../types/actionDataType'
import { $ChannelsReduxType, channelDetailType } from '../../types/channelsReducerType'
import { channelDataMappingUtility } from '../../utils/mappingUtility'
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
        
    },
    getAllChannelsSuccessV2(state,action:actionType<{channels: channelDetailType[] , userId:string,userName:string}>){
        const {userIdAndTeamIdMapping , teamIdAndDataMapping} = channelDataMappingUtility(action.payload)
        state.channels = action?.payload?.channels
        state.userIdAndTeamIdMapping = userIdAndTeamIdMapping
        state.teamIdAndDataMapping = teamIdAndDataMapping
    }
}
