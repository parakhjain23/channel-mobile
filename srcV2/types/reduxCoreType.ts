import { $AppInfoReducerType } from "./appInfoReducerType";
import { $ChannelsByQueryReducerType } from "./channelReducerByQueryType";
import { $ChannelsReduxType } from "./channelsReducerType";
import { $ChatReducerType } from "./chatReducerType";
import { $NetworkReducerType } from "./networkReducerType";
import { $OrgsReducerType } from "./orgsReducerType";
import { $SearchedUserReducerType } from "./searchedUserReducerType";
import { $SocketReducerType } from "./socketReducerType";
import { $UserInfoReducerType } from "./userInfoReducerType";

export interface $ReduxCoreType{
    user: $UserInfoReducerType,
    orgs: $OrgsReducerType,
    channels: $ChannelsReduxType,
    chat: $ChatReducerType,
    socket: $SocketReducerType,
    channelsByQuery: $ChannelsByQueryReducerType,
    network: $NetworkReducerType,
    appInfo: $AppInfoReducerType,
    searchedUser: $SearchedUserReducerType,
}