import { channelDetailType } from "./channelsReducerType";

export interface $SearchedDataReducerType{
    isLoading: boolean,
    searchedUserProfile: any,
    searchedChannels: channelDetailType[]
}