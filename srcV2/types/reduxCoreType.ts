import { $AppInfoReducerType } from "./appInfoReducerType";
import { $ChannelsReduxType } from "./channelsReducerType";
import { $ChatsReducerType } from "./chatsReducerType";
import { $NetworkReducerType } from "./networkReducerType";
import { $OrgsReducerType } from "./orgsReducerType";
import { $SearchedDataReducerType } from "./searchedDataType";
import { $SocketReducerType } from "./socketReducerType";
import { $AllUserInfoReducerType } from "./allUserInfoReducerType";

export interface $ReduxCoreType{
    allUsers: $AllUserInfoReducerType,
    appInfo: $AppInfoReducerType,
    orgs: $OrgsReducerType,
    channels: $ChannelsReduxType,
    chats: $ChatsReducerType,
    socket: $SocketReducerType,
    network: $NetworkReducerType,
    searchedData: $SearchedDataReducerType
}