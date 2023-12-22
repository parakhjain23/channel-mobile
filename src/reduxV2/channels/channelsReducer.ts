import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit'
import { actionType } from '../../types/actionDataType'
import { $ChannelsReduxType, channelDetailType, recentChannelDetailType } from '../../types/channelsReducerType'
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
    },
    getAllRecentChannelSuccessV2(state,action:actionType<{recentChannels: recentChannelDetailType[] , userId:string,userName:string}>){
        // const { unReadAndBadgeCountMapping } = unReadAndBadgeCountMappingUtility(action?.payload)
        var unReadAndBadgeCountMap:any = {};
        var tempRecentChannels = [];
        var key = null;
        var channel = null;
        for (let i = 0; i < action?.payload?.recentChannels?.length; i++) {
          key = action?.payload?.recentChannels[i]?.teamId;
          channel = action?.payload?.recentChannels[i];
          tempRecentChannels.push(state?.teamIdAndDataMapping[key]);
          unReadAndBadgeCountMap[key]={
            badgeCount : channel?.badgeCount,
            unreadCount : channel?.unreadCount
            }
        }
        return {...state, recentChannels: tempRecentChannels, unReadAndBadgeCountMapping: unReadAndBadgeCountMap};
    },
    incremenetUnreadCountV2(state, action:actionType<{channelId:[]}>){
        var tempunReadAndBadgeCountMap:any = {};
        var tempHighlightChannels:any = {};
        action?.payload?.channelId?.forEach(teamId => {
            // tempHighlightChannels[teamId] = true;
            tempunReadAndBadgeCountMap[teamId] = {
                unreadCount: state?.unReadAndBadgeCountMapping?.[teamId]?.unreadCount != undefined 
                ? state?.unReadAndBadgeCountMapping?.[teamId]?.unreadCount + 1 
                : 1,
                badgeCount : 0 
            }
        });
        // state.unReadAndBadgeCountMapping = [tempHighlightChannels]
        state.unReadAndBadgeCountMapping = {
            ...state?.unReadAndBadgeCountMapping,
            ...tempunReadAndBadgeCountMap
        }
    },
    resetUnreadCountStartV2(state, action:actionType<{orgId:string, userId:string, teamId:string, badgeCount:number, unreadCount: number}>){

    },
    resetUnreadCountSuccessV2(state,action:actionType<{response:{},teamId:string}>){
        state.unReadAndBadgeCountMapping = {
            ...state?.unReadAndBadgeCountMapping,
            [action?.payload?.teamId] : 
            {
                unreadCount: action?.payload?.response?.unreadCount,
                badgeCount : action?.payload?.response?.badgeCount
            }
        }
    }
}

